const fs = require('fs');

let content = fs.readFileSync('product-detail.html', 'utf8');

// 1. Add note for Support Wheels
content = content.replace(
    '${(product.features || []).map(f => `<li>${f}</li>`).join(\'\')}',
    '${(product.features || []).map(f => `<li>${f}</li>`).join(\'\')}\n                                </ul>\n                                ${(product.features || []).some(f => f.toLowerCase().includes("support wheel")) ? `<p style="color: #e67e22; font-size: 0.9rem; margin-top: 10px; font-weight: 600;"><i class="fas fa-info-circle"></i> Note: Support Wheels Can Be Changed into a Boot Stand</p>` : ""}'
);
// Remove the extra </ul> that we just duplicated
content = content.replace(
    '</ul>\n                                ${(product.features || []).some(f => f.toLowerCase().includes("support wheel")) ? `<p style="color: #e67e22; font-size: 0.9rem; margin-top: 10px; font-weight: 600;"><i class="fas fa-info-circle"></i> Note: Support Wheels Can Be Changed into a Boot Stand</p>` : ""}\n                                </ul>',
    '</ul>\n                                ${(product.features || []).some(f => f.toLowerCase().includes("support wheel")) ? `<p style="color: #e67e22; font-size: 0.9rem; margin-top: 10px; font-weight: 600;"><i class="fas fa-info-circle"></i> Note: Support Wheels Can Be Changed into a Boot Stand</p>` : ""}'
);

// 2. Fix image slider drag issue (draggable=false and pointer-events=none)
content = content.replace(
    '<img src="${slide}" alt="${product.name}" style="min-width: 100%; object-fit: contain;">',
    '<img src="${slide}" alt="${product.name}" draggable="false" style="min-width: 100%; object-fit: contain; pointer-events: none;">'
);

fs.writeFileSync('product-detail.html', content);
console.log('Fixed product-detail.html');
