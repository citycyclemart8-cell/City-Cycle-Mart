const fs = require('fs');
const path = require('path');

const files = [
    'about.html',
    'accessories.html',
    'brand.html',
    'cart.html',
    'checkout.html',
    'index.html',
    'product-detail.html',
    'products.html'
];

const basePath = 'c:/Users/nihal/OneDrive/Desktop/City Cycle Mart/';

const searchHtml = `
                <div class="search-bar" style="display: flex; align-items: center; background: #f0f0f0; border-radius: 20px; padding: 5px 15px; margin-right: 15px;">
                    <input type="text" id="global-search-input" placeholder="Search products..." style="border: none; background: transparent; outline: none; padding: 5px; width: 150px;">
                    <i class="fas fa-search" onclick="executeSearch()" style="cursor: pointer; color: #555;"></i>
                </div>`;

files.forEach(file => {
    let filePath = path.join(basePath, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add search bar if not already added
        if (!content.includes('id="global-search-input"')) {
            // Find `<div class="nav-actions">`
            let navActionsIndex = content.indexOf('<div class="nav-actions">');
            if (navActionsIndex !== -1) {
                // Insert right after `<div class="nav-actions">`
                let insertPos = navActionsIndex + '<div class="nav-actions">'.length;
                content = content.substring(0, insertPos) + searchHtml + content.substring(insertPos);
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Added search to ' + file);
            }
        }
    }
});

// Update scripts/script.js
let scriptPath = path.join(basePath, 'scripts', 'script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');
if (!scriptContent.includes('executeSearch')) {
    const searchScript = `
// Global Search Logic
window.executeSearch = function() {
    const query = document.getElementById('global-search-input').value;
    if (query) {
        window.location.href = \`products.html?search=\${encodeURIComponent(query)}\`;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                executeSearch();
            }
        });
        
        // Populate search if on products page
        if (window.location.pathname.includes('products.html')) {
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('search');
            if (searchQuery) {
                searchInput.value = searchQuery;
            }
        }
    }
});
`;
    scriptContent += searchScript;
    fs.writeFileSync(scriptPath, scriptContent, 'utf8');
    console.log('Updated script.js');
}

// Update products.html to filter by search query
let productsHtmlPath = path.join(basePath, 'products.html');
let productsHtmlContent = fs.readFileSync(productsHtmlPath, 'utf8');
if (!productsHtmlContent.includes('// 6.5 Filter by Search Query')) {
    let sortFilterCode = `
                // 6.5 Filter by Search Query
                const urlParams = new URLSearchParams(window.location.search);
                const searchQuery = urlParams.get('search');
                if (searchQuery) {
                    const query = searchQuery.toLowerCase();
                    filtered = filtered.filter(p => 
                        p.name.toLowerCase().includes(query) || 
                        p.category.toLowerCase().includes(query) ||
                        p.brand.toLowerCase().includes(query) ||
                        (p.code && p.code.toLowerCase().includes(query))
                    );
                }

                // 7. Apply Sorting`;
    
    productsHtmlContent = productsHtmlContent.replace('// 7. Apply Sorting', sortFilterCode);
    fs.writeFileSync(productsHtmlPath, productsHtmlContent, 'utf8');
    console.log('Updated products.html for search filtering');
}
