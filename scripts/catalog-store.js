/* Remote catalog loader for GitHub Pages. Falls back to data/products.js when not configured/offline. */
(function () {
    const configured = window.CITY_CYCLE_SUPABASE_URL && window.CITY_CYCLE_SUPABASE_ANON_KEY &&
        !window.CITY_CYCLE_SUPABASE_URL.includes('YOUR-PROJECT') && !window.CITY_CYCLE_SUPABASE_ANON_KEY.includes('YOUR_');
    const timeout = (promise, ms) => Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('Catalog request timed out')), ms))]);
    window.catalogReady = (async () => {
        if (!configured || !window.supabase?.createClient) return window.allProducts || [];
        try {
            const client = window.supabase.createClient(window.CITY_CYCLE_SUPABASE_URL, window.CITY_CYCLE_SUPABASE_ANON_KEY);
            const { data, error } = await timeout(client.from('products').select('data').order('id'), 7000);
            if (error) throw error;
            if (!data?.length) {
                products.splice(0, products.length);
                window.allProducts = products;
                return products;
            }
            const remote = data.map(row => row.data).filter(p => p && Number.isFinite(Number(p.id)));
            if (!remote.length) return window.allProducts || [];
            products.splice(0, products.length, ...remote);
            window.allProducts = products;
            return products;
        } catch (error) {
            console.warn('Could not load the hosted catalog; showing the bundled catalog.', error.message);
            return window.allProducts || [];
        }
    })();
})();
