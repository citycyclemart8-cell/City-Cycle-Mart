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
  let gallerySlides = [];
  let variants = [];
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
    gallerySlides = [];
    variants = [];
    form.reset();
    form.elements.id.value = '';
    form.elements.extra.value = '';
    $('#photo').value = '';
    $('#form-title').textContent = 'Add a product';
    $('#delete-button').hidden = true;
    renderGallery();
    renderVariants();
    renderList();
  }
  function renderGallery() {
    const mainUrl = form.elements.image.value.trim();
    const photos = mainUrl ? [mainUrl, ...gallerySlides.filter(url => url !== mainUrl)] : gallerySlides.slice();
    $('#gallery-count').textContent = `${photos.length} ${photos.length === 1 ? 'photo' : 'photos'}`;
    $('#gallery-preview').innerHTML = photos.length ? photos.map((url, index) => `<div class="gallery-photo"><img src="${escapeHtml(url)}" alt="Product photo ${index + 1}" loading="lazy"><span class="main-tag">${index === 0 ? 'Main image' : `Photo ${index + 1}`}</span><button type="button" data-photo-index="${index}" aria-label="Remove photo ${index + 1}">×</button></div>`).join('') : '<div class="gallery-photo empty-preview">No photos added yet</div>';
    $('#gallery-preview').querySelectorAll('button[data-photo-index]').forEach(button => button.addEventListener('click', () => {
      const index = Number(button.dataset.photoIndex);
      const url = photos[index];
      gallerySlides = gallerySlides.filter(item => item !== url);
      if (form.elements.image.value.trim() === url) form.elements.image.value = gallerySlides[0] || '';
      renderGallery();
    }));
  }
  function renderVariants() {
    const host = $('#variants-list');
    if (!host) return;
    host.innerHTML = variants.length ? variants.map((variant, index) => {
      const photos = variant.image ? [variant.image, ...(variant.slides || []).filter(url => url !== variant.image)] : (variant.slides || []);
      return `<article class="variant-card" data-variant-index="${index}">
        <div class="variant-card-head"><label>Colour name<input type="text" data-variant-name value="${escapeHtml(variant.colorName || '')}" placeholder="For example, Matte Red" maxlength="80"></label><button type="button" class="variant-remove" data-remove-variant aria-label="Remove colour option ${index + 1}">Remove colour</button></div>
        <div class="variant-photos"><label>Photos for this colour<input type="file" data-variant-photos accept="image/jpeg,image/png,image/webp,image/avif" multiple><small>Choose one or more photos for this colour. Maximum 6 MB each.</small></label><label>Main photo URL<input type="url" data-variant-image value="${escapeHtml(variant.image || '')}" placeholder="Upload a photo or paste an image URL"></label><div class="variant-gallery">${photos.length ? photos.map((url, photoIndex) => `<div class="gallery-photo"><img src="${escapeHtml(url)}" alt="${escapeHtml(variant.colorName || `Colour ${index + 1}`)} photo ${photoIndex + 1}" loading="lazy"><span class="main-tag">${photoIndex === 0 ? 'Main' : `Photo ${photoIndex + 1}`}</span><button type="button" data-remove-variant-photo="${photoIndex}" aria-label="Remove photo ${photoIndex + 1}">×</button></div>`).join('') : '<span class="variant-empty">No photos added for this colour yet.</span>'}</div></div>
      </article>`;
    }).join('') : '<div class="variant-empty">No colour options added.</div>';
    host.querySelectorAll('.variant-card').forEach(card => {
      const index = Number(card.dataset.variantIndex);
      card.querySelector('[data-variant-name]').addEventListener('input', event => { variants[index].colorName = event.target.value; });
      card.querySelector('[data-variant-image]').addEventListener('change', event => {
        variants[index].image = event.target.value.trim();
        if (variants[index].image && !variants[index].slides.includes(variants[index].image)) variants[index].slides.unshift(variants[index].image);
        renderVariants();
      });
      card.querySelector('[data-remove-variant]').addEventListener('click', () => { variants.splice(index, 1); renderVariants(); });
      card.querySelectorAll('[data-remove-variant-photo]').forEach(button => button.addEventListener('click', () => {
        const photos = variants[index].image ? [variants[index].image, ...variants[index].slides.filter(url => url !== variants[index].image)] : variants[index].slides;
        const removed = photos[Number(button.dataset.removeVariantPhoto)];
        variants[index].slides = variants[index].slides.filter(url => url !== removed);
        if (variants[index].image === removed) variants[index].image = variants[index].slides[0] || '';
        renderVariants();
      }));
      card.querySelector('[data-variant-photos]').addEventListener('change', async event => {
        const files = Array.from(event.target.files || []);
        if (!files.length) return;
        const invalid = files.find(file => !/^image\/(jpeg|png|webp|avif)$/.test(file.type) || file.size > 6 * 1024 * 1024);
        if (invalid) { say(`“${invalid.name}” is not a supported image or is larger than 6 MB.`, true); event.target.value = ''; return; }
        try {
          for (let photoIndex = 0; photoIndex < files.length; photoIndex++) {
            const file = files[photoIndex];
            const ext = ({'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/avif':'avif'})[file.type];
            const path = `variants/${crypto.randomUUID()}.${ext}`;
            say(`Uploading ${variants[index].colorName || `colour ${index + 1}`} photo ${photoIndex + 1} of ${files.length}…`);
            const { error } = await client.storage.from('product-images').upload(path, file, {contentType:file.type, upsert:false});
            if (error) throw error;
            const { data } = client.storage.from('product-images').getPublicUrl(path);
            if (!variants[index].slides.includes(data.publicUrl)) variants[index].slides.push(data.publicUrl);
            if (!variants[index].image) variants[index].image = data.publicUrl;
          }
          renderVariants();
          say(`Uploaded ${files.length} photo${files.length === 1 ? '' : 's'} for ${variants[index].colorName || `colour ${index + 1}`}. Save the product to publish the changes.`);
        } catch (error) { renderVariants(); say(errorText(error), true); }
        finally { event.target.value = ''; }
      });
    });
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
    gallerySlides = Array.isArray(editing.slides) ? editing.slides.filter(url => typeof url === 'string' && url) : [];
    if (editing.image && !gallerySlides.includes(editing.image)) gallerySlides.unshift(editing.image);
    renderGallery();
    variants = Array.isArray(editing.variants) ? editing.variants.map(variant => {
      const slides = Array.isArray(variant.slides) ? variant.slides.filter(url => typeof url === 'string' && url) : [];
      if (variant.image && !slides.includes(variant.image)) slides.unshift(variant.image);
      return {colorName:variant.colorName || '', image:variant.image || slides[0] || '', slides};
    }) : [];
    renderVariants();
    form.elements.description.value = editing.description || '';
    form.elements.features.value = Array.isArray(editing.features) ? editing.features.join('\n') : '';
    form.elements.specs.value = JSON.stringify(editing.specs || {}, null, 2);
    const known = new Set(['id','name','brand','category','price','mrp','image','slides','variants','description','features','specs']);
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
  $('#add-variant-button').addEventListener('click', () => { variants.push({colorName:'', image:'', slides:[]}); renderVariants(); $('#variants-list .variant-card:last-child [data-variant-name]').focus(); });

  $('#photo').addEventListener('change', async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const invalid = files.find(file => !/^image\/(jpeg|png|webp|avif)$/.test(file.type) || file.size > 6 * 1024 * 1024);
    if (invalid) { say(`“${invalid.name}” is not a supported image or is larger than 6 MB.`, true); event.target.value = ''; return; }
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = ({'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/avif':'avif'})[file.type];
        const path = `${crypto.randomUUID()}.${ext}`;
        say(`Uploading photo ${i + 1} of ${files.length}…`);
        const { error } = await client.storage.from('product-images').upload(path, file, {contentType:file.type, upsert:false});
        if (error) throw error;
        const { data } = client.storage.from('product-images').getPublicUrl(path);
        if (!gallerySlides.includes(data.publicUrl)) gallerySlides.push(data.publicUrl);
        if (gallerySlides.length === 1) form.elements.image.value = data.publicUrl;
      }
      renderGallery();
      say(`${files.length} ${files.length === 1 ? 'photo uploaded' : 'photos uploaded'}. Save the product to publish the gallery.`);
    } catch (error) { renderGallery(); say(errorText(error), true); }
    finally { event.target.value = ''; }
  });
  form.elements.image.addEventListener('input', renderGallery);

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
      let slides = gallerySlides.slice();
      const enteredImage = String(values.get('image')).trim();
      if (enteredImage) slides = [enteredImage, ...slides.filter(url => url !== enteredImage)];
      const savedVariants = variants.map(variant => {
        let variantSlides = variant.slides.slice();
        const image = variant.image || variantSlides[0] || '';
        if (image && !variantSlides.includes(image)) variantSlides.unshift(image);
        else if (image && variantSlides[0] !== image) variantSlides = [image, ...variantSlides.filter(url => url !== image)];
        return {colorName:String(variant.colorName || '').trim(), image, slides:variantSlides};
      });
      if (savedVariants.some(variant => !variant.colorName || !variant.image)) throw new Error('Give every colour option a name and at least one photo.');
      const mainImage = enteredImage || slides[0] || editing?.image || savedVariants[0]?.image || '';
      if (mainImage && !slides.includes(mainImage)) slides.unshift(mainImage);
      const product = {...(editing || {}), ...extras, id,
        name:String(values.get('name')).trim(), brand:String(values.get('brand')).trim(), category:String(values.get('category')).trim(),
        price:Number(values.get('price')), mrp:values.get('mrp') === '' ? Number(values.get('price')) : Number(values.get('mrp')),
        image:mainImage, slides, variants:savedVariants, description:String(values.get('description')).trim(),
        features:String(values.get('features')).split('\n').map(s => s.trim()).filter(Boolean), specs};
      if (!product.image) throw new Error('Add a photo URL or upload a product photo.');
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
