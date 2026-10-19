const fs = require('fs');

let content = fs.readFileSync('checkout.html', 'utf8');

// 1. Update SHOP location
content = content.replace('const SHOP_LAT = 11.728952;', 'const SHOP_LAT = 11.7324349;');
content = content.replace('const SHOP_LNG = 75.704207;', 'const SHOP_LNG = 75.7065688;');

// 2. Autofill address textarea on search
content = content.replace(
    'searchInput.value = item.display_name;',
    'searchInput.value = item.display_name;\n                                document.getElementById("address").value = item.display_name;'
);

fs.writeFileSync('checkout.html', content);
console.log('Fixed checkout.html');
