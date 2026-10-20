(() => {
  const $ = (selector) => document.querySelector(selector);
  if (typeof products !== 'undefined' && Array.isArray(products)) window.allProducts = products;
  const notice = $('#notice');
  const loginPanel = $('#login-panel');
  const manager = $('#manager');
  const form = $('#product-form');
  let client;
  let catalog = [];
  let editing = null;
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const say = (message, error = false) => { notice.textContent = message; notice.classList.toggle('error', error); notice.hidden = false; };
  const errorText = (error) => error?.message || 'Something went wrong. Please try again.';

  if (!window.supabase?.createClient || !window.CITY_CYCLE_SUPABASE_URL || window.CITY_CYCLE_SUPABASE_URL.includes('YOUR-PROJECT') || !window.CITY_CYCLE_SUPABASE_ANON_KEY || window.CITY_CYCLE_SUPABASE_ANON_KEY.includes('YOUR_')) {
    say('Add your Supabase Project URL and anon/publishable key to scripts/supabase-config.js, then reload this page.', true);
    return;
  }
  client = window.supabase.createClient(window.CITY_CYCLE_SUPABASE_URL, window.CITY_CYCLE_SUPABASE_ANON_KEY);

  async function currentSession() {
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    setSignedIn(Boolean(data.session), data.session?.user?.email);
    if (data.session) await loadCatalog();
  }
  function setSignedIn(signedIn, email = '') {
    loginPanel.hidden = signedIn;
    manager.hidden = !signedIn;
    $('#signed-user').textContent = email ? `Signed in as ${email}` : '';
  }
  async function loadCatalog() {
    say('Loading products…');
    const { data, error } = await client.from('products').select('id,data').order('id');
    if (error) throw error;
    catalog = (data || []).map((row) => row.data).filter(Boolean);
    renderList();
    notice.hidden = true;
  }
  function renderList() {
    const query = $('#product-search').value.trim().toLowerCase();
    const shown = catalog.filter(p => `${p.name || ''} ${p.brand || ''} ${p.category || ''}`.toLowerCase().includes(query));
    $('#product-count').textContent = `${catalog.length} ${catalog.length === 1 ? 'product' : 'products'}`;
    $('#product-list').innerHTML = shown.length ? shown.map(p => `<button type="button" class="product-row ${editing?.id === p.id ? 'active' : ''}" data-id="${Number(p.id)}"><strong>${escapeHtml(p.name || 'Unnamed product')}</strong><small>${escapeHtml(p.brand || 'No brand')} · ₹${Number(p.price || 0).toLocaleString('en-IN')}</small></button>`).join('') : '<div class="empty">No products found.</div>';
    $('#product-list').querySelectorAll('.product-row').forEach(button => button.addEventListener('click', () => choose(Number(button.dataset.id))));
  }
  function clearForm() {
    editing = null;
    form.reset();
    form.elements.id.value = '';
    form.elements.extra.value = '';
    $('#form-title').textContent = 'Add a product';
    $('#delete-button').hidden = true;
    renderList();
  }
  function choose(id) {
    editing = catalog.find(p => Number(p.id) === id) || null;
    if (!editing) return;
    form.elements.id.value = editing.id;
    form.elements.name.value = editing.name || '';
    form.elements.brand.value = editing.brand || '';
    form.elements.category.value = editing.category || '';
    form.elements.price.value = editing.price ?? '';
    form.elements.mrp.value = editing.mrp ?? '';
    form.elements.image.value = /^https?:\/\//i.test(editing.image || '') ? editing.image : '';
    form.elements.description.value = editing.description || '';
    form.elements.features.value = Array.isArray(editing.features) ? editing.features.join('\n') : '';
    form.elements.specs.value = JSON.stringify(editing.specs || {}, null, 2);
    const known = new Set(['id','name','brand','category','price','mrp','image','description','features','specs']);
    form.elements.extra.value = JSON.stringify(Object.fromEntries(Object.entries(editing).filter(([key]) => !known.has(key))), null, 2);
    $('#form-title').textContent = `Edit: ${editing.name || 'product'}`;
    $('#delete-button').hidden = false;
    renderList();
    if (window.innerWidth < 850) $('.editor').scrollIntoView({behavior:'smooth', block:'start'});
  }
  $('#login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = event.submitter;
    button.disabled = true;
    try {
      const values = new FormData(event.currentTarget);
      const { error } = await client.auth.signInWithPassword({email: values.get('email'), password: values.get('password')});
      if (error) throw error;
      await currentSession();
      say('Signed in.');
      notice.hidden = true;
    } catch (error) { say(errorText(error), true); }
    finally { button.disabled = false; }
  });
  $('#signout-button').addEventListener('click', async () => { const { error } = await client.auth.signOut(); if (error) say(errorText(error), true); else { setSignedIn(false); clearForm(); say('Signed out.'); } });
  $('#new-button').addEventListener('click', clearForm);
  $('#cancel-button').addEventListener('click', clearForm);
  $('#product-search').addEventListener('input', renderList);

  $('#photo').addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!/^image\/(jpeg|png|webp|avif)$/.test(file.type) || file.size > 6 * 1024 * 1024) { say('Choose a JPG, PNG, WebP or AVIF image under 6 MB.', true); event.target.value = ''; return; }
    const ext = ({'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/avif':'avif'})[file.type];
    const path = `${crypto.randomUUID()}.${ext}`;
    try {
      say('Uploading photo…');
      const { error } = await client.storage.from('product-images').upload(path, file, {contentType:file.type, upsert:false});
      if (error) throw error;
      const { data } = client.storage.from('product-images').getPublicUrl(path);
      form.elements.image.value = data.publicUrl;
      say('Photo uploaded. Save the product to publish it.');
    } catch (error) { say(errorText(error), true); }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = event.submitter;
    button.disabled = true;
    try {
      const values = new FormData(form);
      const extrasText = String(values.get('extra') || '').trim();
      const specsText = String(values.get('specs') || '').trim();
      const extras = extrasText ? JSON.parse(extrasText) : {};
      const specs = specsText ? JSON.parse(specsText) : {};
      if (!extras || Array.isArray(extras) || typeof extras !== 'object') throw new Error('Other product data must be a JSON object.');
      if (!specs || Array.isArray(specs) || typeof specs !== 'object') throw new Error('Specifications must be a JSON object.');
      const id = editing ? Number(editing.id) : (Math.max(0, ...catalog.map(p => Number(p.id) || 0)) + 1);
      const product = {...(editing || {}), ...extras, id,
        name:String(values.get('name')).trim(), brand:String(values.get('brand')).trim(), category:String(values.get('category')).trim(),
        price:Number(values.get('price')), mrp:values.get('mrp') === '' ? Number(values.get('price')) : Number(values.get('mrp')),
        image:String(values.get('image')).trim(), description:String(values.get('description')).trim(),
        features:String(values.get('features')).split('\n').map(s => s.trim()).filter(Boolean), specs};
      if (!product.image) throw new Error('Add a photo URL or upload a product photo.');
      if (editing && !form.elements.image.value && editing.image) product.image = editing.image;
      if (!editing) product.slides = [product.image];
      else if (product.image !== editing.image) product.slides = [product.image];
      const { error } = await client.from('products').upsert({id, data:product, updated_at:new Date().toISOString()});
      if (error) throw error;
      await loadCatalog();
      choose(id);
      say('Product saved. It is now available on the storefront.');
    } catch (error) { say(errorText(error), true); }
    finally { button.disabled = false; }
  });
  $('#delete-button').addEventListener('click', async () => {
    if (!editing || !window.confirm(`Delete “${editing.name}” from the live catalog?`)) return;
    try {
      const { error } = await client.from('products').delete().eq('id', Number(editing.id));
      if (error) throw error;
      catalog = catalog.filter(p => Number(p.id) !== Number(editing.id));
      clearForm();
      say('Product deleted from the live catalog.');
    } catch (error) { say(errorText(error), true); }
  });
  $('#import-button').addEventListener('click', async () => {
    const bundled = window.allProducts || [];
    if (!bundled.length) { say('The bundled catalog is unavailable.', true); return; }
    if (!window.confirm(`Add any missing products from the bundled catalog (${bundled.length} items)? Existing database entries will be kept.`)) return;
    try {
      const { error } = await client.from('products').upsert(bundled.map(product => ({id:Number(product.id), data:product})), {onConflict:'id', ignoreDuplicates:true});
      if (error) throw error;
      await loadCatalog();
      say('Bundled catalog imported. Existing database products were kept.');
    } catch (error) { say(errorText(error), true); }
  });
  client.auth.onAuthStateChange((_event, session) => { setSignedIn(Boolean(session), session?.user?.email); if (!session) catalog = []; });
  currentSession().catch(error => say(errorText(error), true));
})();
