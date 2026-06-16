const fs = require('fs');
const path = require('path');

const cssPath = 'c:/Users/nihal/OneDrive/Desktop/City Cycle Mart/styles/style.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// The previous block we added was:
/*
@media (max-width: 768px) {
    .search-bar {
        position: absolute;
        bottom: 0;
...
*/

// Let's remove the block I added previously
const splitString = '@media (max-width: 768px) {\n    .search-bar {\n        position: absolute;';
if (cssContent.includes(splitString)) {
    cssContent = cssContent.substring(0, cssContent.indexOf(splitString)).trim();
}

// Add the new cleanly structured mobile CSS
const newMobileCss = `
@media (max-width: 768px) {
    nav {
        flex-wrap: wrap;
        height: auto;
        padding: 15px 0;
    }
    
    .nav-actions {
        display: contents; /* Break the children out so they become flex items of nav */
    }
    
    .cart-icon {
        order: 3;
        margin-left: auto;
    }
    
    .search-bar {
        position: relative !important;
        order: 4;
        width: 100% !important;
        margin: 15px 0 0 0 !important; /* Space between header row and search bar */
        border-radius: 20px !important;
        box-sizing: border-box;
    }
    
    .search-bar input {
        width: 100% !important;
    }
    
    header {
        padding-bottom: 0 !important; /* Remove any previously added padding */
    }
    
    .nav-links {
        top: 135px !important; /* Push menu down below expanded header */
        height: calc(100vh - 135px) !important;
    }
}
`;

fs.writeFileSync(cssPath, cssContent + '\n' + newMobileCss, 'utf8');
console.log("Updated CSS for better search bar layout.");
