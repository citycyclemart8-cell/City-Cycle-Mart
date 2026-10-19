const fs = require('fs');
const path = require('path');

const basePath = 'c:/Users/nihal/OneDrive/Desktop/City Cycle Mart/';

// 1. Append CSS
const cssPath = path.join(basePath, 'styles/style.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const mobileCss = `
@media (max-width: 768px) {
    .search-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        margin: 0 !important;
        border-radius: 0 !important;
        background: var(--white) !important;
        border-top: 1px solid #eee;
        padding: 8px 15px !important;
    }
    .search-bar input {
        width: 100% !important;
    }
    header {
        padding-bottom: 45px;
    }
    .nav-links {
        top: 115px !important;
        height: calc(100vh - 115px) !important;
    }
}
`;

if (!cssContent.includes('.search-bar input {')) {
    fs.appendFileSync(cssPath, mobileCss, 'utf8');
}

// 2. Modify script.js
const scriptPath = path.join(basePath, 'scripts/script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');

const newSearchLogic = `
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
        const searchBar = searchInput.parentElement;
        searchBar.style.position = 'relative';
        
        // Create suggestion box
        const suggestionBox = document.createElement('div');
        suggestionBox.id = 'search-suggestions';
        suggestionBox.style.position = 'absolute';
        suggestionBox.style.top = '100%';
        suggestionBox.style.left = '0';
        suggestionBox.style.width = '100%';
        suggestionBox.style.backgroundColor = 'white';
        suggestionBox.style.border = '1px solid #ddd';
        suggestionBox.style.borderTop = 'none';
        suggestionBox.style.borderRadius = '0 0 10px 10px';
        suggestionBox.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        suggestionBox.style.display = 'none';
        suggestionBox.style.zIndex = '1000';
        suggestionBox.style.maxHeight = '300px';
        suggestionBox.style.overflowY = 'auto';
        
        searchBar.appendChild(suggestionBox);

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            suggestionBox.innerHTML = '';
            
            if (query.length > 0 && typeof products !== 'undefined') {
                const matches = products.filter(p => 
                    p.name.toLowerCase().includes(query) || 
                    p.category.toLowerCase().includes(query) ||
                    p.brand.toLowerCase().includes(query) ||
                    (p.code && p.code.toLowerCase().includes(query))
                ).slice(0, 5); // limit to 5
                
                if (matches.length > 0) {
                    matches.forEach(p => {
                        const item = document.createElement('div');
                        item.style.padding = '10px 15px';
                        item.style.cursor = 'pointer';
                        item.style.borderBottom = '1px solid #eee';
                        item.style.display = 'flex';
                        item.style.alignItems = 'center';
                        item.style.gap = '10px';
                        item.style.transition = 'background-color 0.2s';
                        
                        item.innerHTML = \`
                            <img src="\${p.image}" style="width: 40px; height: 40px; object-fit: contain; border-radius: 5px;">
                            <div>
                                <div style="font-weight: 600; font-size: 0.9rem; color: #333;">\${p.name}</div>
                                <div style="font-size: 0.8rem; color: #777;">₹\${p.price}</div>
                            </div>
                        \`;
                        
                        item.addEventListener('mouseenter', () => item.style.backgroundColor = '#f9f9f9');
                        item.addEventListener('mouseleave', () => item.style.backgroundColor = 'transparent');
                        
                        item.addEventListener('mousedown', (e) => {
                            // prevent blur from hiding it before click registers
                            e.preventDefault(); 
                            window.location.href = \`product-detail.html?id=\${p.id}\`;
                        });
                        
                        suggestionBox.appendChild(item);
                    });
                    suggestionBox.style.display = 'block';
                } else {
                    suggestionBox.style.display = 'none';
                }
            } else {
                suggestionBox.style.display = 'none';
            }
        });
        
        // Hide when losing focus
        searchInput.addEventListener('blur', () => {
            suggestionBox.style.display = 'none';
        });
        // Show when focusing if there's text
        searchInput.addEventListener('focus', () => {
            if (suggestionBox.innerHTML !== '') {
                suggestionBox.style.display = 'block';
            }
        });

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

const oldLogicStart = scriptContent.indexOf('// Global Search Logic');
if (oldLogicStart !== -1) {
    scriptContent = scriptContent.substring(0, oldLogicStart) + newSearchLogic;
    fs.writeFileSync(scriptPath, scriptContent, 'utf8');
}

console.log("Applied changes!");
