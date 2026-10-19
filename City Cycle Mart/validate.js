const fs = require('fs');

function checkFile(filename) {
    const html = fs.readFileSync(filename, 'utf8');
    
    // Check if the hamburger div is inside nav-actions
    const navActionsMatch = html.match(/<div class="nav-actions">([\s\S]*?)<\/div>/);
    if (navActionsMatch) {
        if (navActionsMatch[0].includes('hamburger')) {
            console.log(`[FAIL] ${filename} - Hamburger is inside nav-actions`);
        } else {
            console.log(`[PASS] ${filename} - Hamburger is NOT inside nav-actions`);
        }
    } else {
        console.log(`[WARN] ${filename} - Could not find nav-actions block`);
    }

    // Check if hamburger is direct child of nav
    const navMatch = html.match(/<nav>([\s\S]*?)<\/nav>/);
    if (navMatch) {
        // Quick regex to see if hamburger is before nav-actions
        const hamburgerIndex = navMatch[0].indexOf('class="hamburger"');
        const navActionsIndex = navMatch[0].indexOf('class="nav-actions"');
        
        if (hamburgerIndex < navActionsIndex) {
            console.log(`[PASS] ${filename} - Hamburger comes BEFORE nav-actions inside <nav>`);
        } else {
            console.log(`[FAIL] ${filename} - Hamburger comes AFTER nav-actions inside <nav>`);
        }
    }
}

const files = [
    'index.html',
    'about.html',
    'accessories.html',
    'brand.html',
    'cart.html',
    'checkout.html',
    'product-detail.html',
    'products.html'
];

files.forEach(checkFile);
