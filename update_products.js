const fs = require('fs');

const productsJsPath = './data/products.js';
let products = require(productsJsPath);

// Helper to get max ID
let nextId = Math.max(...products.map(x => x.id)) + 1;

// CM107
let cm107 = products.find(x => x.code === 'CM107');
if (cm107) {
    cm107.variants = [
        {
            colorName: "Matte Red",
            image: cm107.slides[0],
            slides: cm107.slides.slice(0, 3)
        },
        {
            colorName: "Matte Sky Blue",
            image: cm107.slides[3],
            slides: cm107.slides.slice(3, 6)
        }
    ];
}

// CM110
let cm110 = products.find(x => x.code === 'CM110');
if (cm110) {
    cm110.slides[0] = "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7045.jpg";
    cm110.image = "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7045.jpg";
}

// CM114
let cm114 = products.find(x => x.code === 'CM114');
if (cm114) {
    cm114.variants = [
        {
            colorName: "Yellowish Blue",
            image: cm114.slides[0],
            slides: cm114.slides.slice(0, 3)
        },
        {
            colorName: "Yellowish Orange",
            image: cm114.slides[3],
            slides: cm114.slides.slice(3, 6)
        }
    ];
}

// CM118
let cm118 = products.find(x => x.code === 'CM118');
if (cm118 && cm118.variants) {
    cm118.variants[0].colorName = "Midnight Black & Gold";
    cm118.variants[1].colorName = "Matte Black";
}

// CM121
let cm121 = products.find(x => x.code === 'CM121');
if (cm121 && cm121.variants) {
    cm121.variants[0].colorName = "Matte Red";
    cm121.variants[1].colorName = "Matte Sky Blue";
}

// CM122
let cm122 = products.find(x => x.code === 'CM122');
if (cm122 && cm122.variants) {
    cm122.variants[0].colorName = "Floro Baby Pink";
    cm122.variants[1].colorName = "Cherry Orange";
}

// CM125
let cm125 = products.find(x => x.code === 'CM125');
if (cm125 && cm125.variants) {
    cm125.variants[0].colorName = "Red";
    cm125.variants[1].colorName = "Blue";
}

// CM127
let cm127 = products.find(x => x.code === 'CM127');
if (cm127 && cm127.variants) {
    cm127.variants[0].colorName = "Light Pink";
    cm127.variants[1].colorName = "Light Green";
}

// Add New Products
const newProducts = [
    {
        id: nextId++,
        name: "Caya Feuled 24",
        category: "Adult, 21 Speed, Sports",
        brand: "Caya",
        mrp: 17000,
        price: 13600,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7495.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7495.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7494.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7497.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7496.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7493.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7498.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7501.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7499.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7502.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7500.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7504.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7503.jpg"
        ],
        description: "The Caya Feuled 24 is a top-tier multi-speed mountain bike tailored for sports enthusiasts and adventurous adults. With a robust frame, it easily handles trails and rugged urban terrain. \n\n**Price Comparison:**\n- Market MRP: ₹17,000\n- Typical Retail Price: ₹14,500 - ₹15,000\n- **City Cycle Mart Price: ₹13,600** (Great Value!)",
        features: [
            "Dual Disk Brake",
            "Front Suspension",
            "21 Speed Microshift Gear",
            "24*2.40\" Hartex tyre",
            "Reflector",
            "Air Pumb",
            "Mirror And Bell"
        ],
        specs: {
            "Wheel Size": "24 Inches",
            "Braking": "Dual Disk Brake",
            "Tires": "24 x 2.40 Hartex Tires",
            "Suspension": "Front Suspension",
            "Speed": "21 Speed Microshift"
        },
        variants: [
            {
                colorName: "Matte Floro Orange",
                image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7495.jpg",
                slides: [
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7495.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7494.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7497.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7496.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7493.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7498.jpg"
                ]
            },
            {
                colorName: "Matte Floro Yellow",
                image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7501.jpg",
                slides: [
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7501.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7499.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7502.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7500.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7504.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7503.jpg"
                ]
            }
        ],
        catalogLink: "https://wa.me/p/24692556573780654/917511103323",
        code: "CM129",
        featured: true
    },
    {
        id: nextId++,
        name: "Caya Gold 24",
        category: "Adult, 21 Speed, Sports",
        brand: "Caya",
        mrp: 17000,
        price: 13599,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7490.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7490.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7491.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7492.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7489.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7488.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7487.jpg"
        ],
        description: "The Caya Gold 24 is designed to deliver superior multi-speed performance. With reliable dual disc brakes and a front suspension fork, it provides enhanced comfort and high control on challenging trails. \n\n**Price Comparison:**\n- Market MRP: ₹17,000\n- Typical Retail Price: ₹14,500 - ₹15,000\n- **City Cycle Mart Price: ₹13,599**",
        features: [
            "Dual Disk Brake",
            "Front Suspension",
            "21 Speed Microshift Gear",
            "24*2.40\" Hartex tyre",
            "Reflector",
            "Air Pumb",
            "Mirror And Bell"
        ],
        specs: {
            "Wheel Size": "24 Inches",
            "Braking": "Dual Disk Brake",
            "Tires": "24 x 2.40 Hartex Tires",
            "Suspension": "Front Suspension",
            "Speed": "21 Speed Microshift"
        },
        catalogLink: "https://wa.me/p/24692556573780654/917511103323",
        code: "CM130",
        featured: true
    },
    {
        id: nextId++,
        name: "Caya Feuled 26",
        category: "Adult, Single Speed, IBC",
        brand: "Caya",
        mrp: 11000,
        price: 9099,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7484.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7484.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7485.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7486.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7483.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7482.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7480.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7481.jpg"
        ],
        description: "The Caya Feuled 26 single speed bicycle perfectly blends rugged durability with everyday practicality. It features dual disc brakes, an integrated carrier, and thick Hartex tyres for maximum grip and safety.\n\n**Price Comparison:**\n- Market MRP: ₹11,000\n- Typical Retail Price: ₹9,800 - ₹10,200\n- **City Cycle Mart Price: ₹9,099**",
        features: [
            "Dual Disk Brake",
            "Front Suspension",
            "Integrated Carrier",
            "24*2.40\" Hartex tyre",
            "Reflector",
            "Air Pumb",
            "Mirror And Bell"
        ],
        specs: {
            "Wheel Size": "26 Inches",
            "Braking": "Dual Disk Brake",
            "Tires": "24 x 2.40 Hartex Tires",
            "Suspension": "Front Suspension",
            "Speed": "Single Speed"
        },
        variants: [
            {
                colorName: "Royal Matte Black",
                image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7484.jpg",
                slides: [
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7484.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7485.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7486.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7483.jpg"
                ]
            },
            {
                colorName: "Matte Floro Orange",
                image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7482.jpg",
                slides: [
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7482.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7480.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7481.jpg"
                ]
            }
        ],
        catalogLink: "https://wa.me/p/24692556573780654/917511103323",
        code: "CM131",
        featured: true
    },
    {
        id: nextId++,
        name: "Caya Haze 26",
        category: "Adult, 21 Speed, Sports",
        brand: "Caya",
        mrp: 17200,
        price: 13899,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7468.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7468.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7472.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7471.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7470.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7469.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7473.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7474.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7479.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7476.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7478.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7475.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7477.jpg"
        ],
        description: "The Caya Haze 26 delivers ultimate multi-speed action. This sports bicycle offers precision shifting via a 21-speed Microshift gear system, complemented by wide Hartex tyres and reliable dual disc brakes.\n\n**Price Comparison:**\n- Market MRP: ₹17,200\n- Typical Retail Price: ₹14,800 - ₹15,500\n- **City Cycle Mart Price: ₹13,899**",
        features: [
            "Dual Disk Brake",
            "Front Suspension",
            "21 Speed Microshift Gear",
            "24*2.40\" Hartex tyre",
            "Reflector",
            "Air Pumb",
            "Mirror And Bell"
        ],
        specs: {
            "Wheel Size": "26 Inches",
            "Braking": "Dual Disk Brake",
            "Tires": "24 x 2.40 Hartex Tires",
            "Suspension": "Front Suspension",
            "Speed": "21 Speed Microshift"
        },
        variants: [
            {
                colorName: "Royal Matte Black",
                image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7468.jpg",
                slides: [
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7468.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7472.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7471.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7470.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7469.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7473.jpg"
                ]
            },
            {
                colorName: "Greenish Black",
                image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7474.jpg",
                slides: [
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7474.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7479.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7476.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7478.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7475.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7477.jpg"
                ]
            }
        ],
        catalogLink: "https://wa.me/p/24692556573780654/917511103323",
        code: "CM132",
        featured: true
    },
    {
        id: nextId++,
        name: "Caya Haze 26",
        category: "Adult, single speed, Sports",
        brand: "Caya",
        mrp: 12000,
        price: 9499,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7465.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7465.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7463.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7464.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7466.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7467.jpg"
        ],
        description: "The single-speed variant of the Caya Haze 26 is ideal for low-maintenance, everyday sporty rides. Built with front suspension and dual disc brakes to tackle any path with ease.\n\n**Price Comparison:**\n- Market MRP: ₹12,000\n- Typical Retail Price: ₹10,200 - ₹11,000\n- **City Cycle Mart Price: ₹9,499**",
        features: [
            "Dual Disk Brake",
            "Front Suspension",
            "24*2.40\" Hartex tyre",
            "Reflector",
            "Air Pumb",
            "Mirror And Bell"
        ],
        specs: {
            "Wheel Size": "26 Inches",
            "Braking": "Dual Disk Brake",
            "Tires": "24 x 2.40 Hartex Tires",
            "Suspension": "Front Suspension",
            "Speed": "Single Speed"
        },
        catalogLink: "https://wa.me/p/24692556573780654/917511103323",
        code: "CM133",
        featured: true
    },
    {
        id: nextId++,
        name: "Alpha Amsterdam 24",
        category: "Adult, 21 Speed, Sports",
        brand: "Alpha",
        mrp: 15000,
        price: 12299,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7462.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7462.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7459.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7461.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7457.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7460.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7458.jpg"
        ],
        description: "The Alpha Amsterdam 24 is a top-of-the-line 21-speed Shimano-geared bicycle. With sleek sports geometry, front suspension, and mudguards, it ensures a smooth and fully-equipped riding experience.\n\n**Price Comparison:**\n- Market MRP: ₹15,000\n- Typical Retail Price: ₹13,000 - ₹13,500\n- **City Cycle Mart Price: ₹12,299**",
        features: [
            "Dual Disk Brake",
            "Front Suspension",
            "21 Speed Shimano Gear",
            "24*2.40\" Alpha Nylon tyre",
            "Mudguard",
            "Water Bottle",
            "Reflector",
            "Air Pumb",
            "Mirror And Bell"
        ],
        specs: {
            "Wheel Size": "24 Inches",
            "Braking": "Dual Disk Brake",
            "Tires": "24 x 2.40 Alpha Nylon Tires",
            "Suspension": "Front Suspension",
            "Speed": "21 Speed Shimano"
        },
        catalogLink: "https://wa.me/p/24692556573780654/917511103323",
        code: "CM136",
        featured: true
    },
    {
        id: nextId++,
        name: "Alpha Amsterdam 26",
        category: "Adult, 21 Speed, Sports",
        brand: "Alpha",
        mrp: 15200,
        price: 12399,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7456.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7456.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7455.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7451.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7453.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7452.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7454.jpg"
        ],
        description: "The 26-inch variant of the Alpha Amsterdam gives taller riders the same excellent Shimano 21-speed performance. With wide 2.40-inch nylon tyres and dual disc brakes, it provides exceptional grip and control.\n\n**Price Comparison:**\n- Market MRP: ₹15,200\n- Typical Retail Price: ₹13,200 - ₹13,800\n- **City Cycle Mart Price: ₹12,399**",
        features: [
            "Dual Disk Brake",
            "Front Suspension",
            "21 Speed Shimano Gear",
            "24*2.40\" Alpha Nylon tyre",
            "Mudguard",
            "Water Bottle",
            "Reflector",
            "Air Pumb",
            "Mirror And Bell"
        ],
        specs: {
            "Wheel Size": "26 Inches",
            "Braking": "Dual Disk Brake",
            "Tires": "24 x 2.40 Alpha Nylon Tires",
            "Suspension": "Front Suspension",
            "Speed": "21 Speed Shimano"
        },
        catalogLink: "https://wa.me/p/24692556573780654/917511103323",
        code: "CM137",
        featured: true
    },
    {
        id: nextId++,
        name: "Alpha Tokyo 26",
        category: "Adult, Single Speed, Sports",
        brand: "Alpha",
        mrp: 10000,
        price: 7999,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7448.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7448.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7450.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7446.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7449.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7447.jpg"
        ],
        description: "The Alpha Tokyo 26 represents sports simplicity. With a robust single-speed drive and highly capable dual disc brakes, it makes for a fantastic fitness or commute companion.\n\n**Price Comparison:**\n- Market MRP: ₹10,000\n- Typical Retail Price: ₹8,500 - ₹9,000\n- **City Cycle Mart Price: ₹7,999**",
        features: [
            "Dual Disk Brake",
            "Front Suspension",
            "24*2.40\" Alpha Nylon tyre",
            "Mudguard",
            "Water Bottle",
            "Reflector",
            "Air Pumb",
            "Mirror And Bell"
        ],
        specs: {
            "Wheel Size": "26 Inches",
            "Braking": "Dual Disk Brake",
            "Tires": "24 x 2.40 Alpha Nylon Tires",
            "Suspension": "Front Suspension",
            "Speed": "Single Speed"
        },
        catalogLink: "https://wa.me/p/24692556573780654/917511103323",
        code: "CM138",
        featured: true
    },
    {
        id: nextId++,
        name: "Alpha Bombay 24",
        category: "Adult, Single Speed, IBC",
        brand: "Alpha",
        mrp: 10000,
        price: 7999,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7445.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7445.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7444.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7443.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7442.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7441.jpg"
        ],
        description: "The Alpha Bombay 24 provides incredible utility with its integrated carrier and comfortable riding position. Perfect for daily local chores, the bike boasts excellent stopping power and heavy-duty front suspension.\n\n**Price Comparison:**\n- Market MRP: ₹10,000\n- Typical Retail Price: ₹8,500 - ₹9,000\n- **City Cycle Mart Price: ₹7,999**",
        features: [
            "Dual Disk Brake",
            "Front Suspension",
            "Integrated Carrier",
            "24*2.40\" Alpha Nylon tyre",
            "Mudguard",
            "Water Bottle",
            "Reflector",
            "Air Pumb",
            "Mirror And Bell"
        ],
        specs: {
            "Wheel Size": "24 Inches",
            "Braking": "Dual Disk Brake",
            "Tires": "24 x 2.40 Alpha Nylon Tires",
            "Suspension": "Front Suspension",
            "Speed": "Single Speed"
        },
        catalogLink: "https://wa.me/p/24692556573780654/917511103323",
        code: "CM140",
        featured: true
    },
    {
        id: nextId++,
        name: "Alpha Tokyo 24",
        category: "Adult, Single Speed, Sports",
        brand: "Alpha",
        mrp: 9800,
        price: 7849,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7439.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7439.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7437.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7438.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7440.jpg"
        ],
        description: "A compact powerhouse, the Alpha Tokyo 24 is a single-speed sports bike with a lightweight yet sturdy frame. Offering a full range of accessories, including water bottle, bell, and mudguards, it provides a high-value sports riding experience.\n\n**Price Comparison:**\n- Market MRP: ₹9,800\n- Typical Retail Price: ₹8,400 - ₹8,800\n- **City Cycle Mart Price: ₹7,849**",
        features: [
            "Dual Disk Brake",
            "Front Suspension",
            "24*2.40\" Alpha Nylon tyre",
            "Mudguard",
            "Water Bottle",
            "Reflector",
            "Air Pumb",
            "Mirror And Bell"
        ],
        specs: {
            "Wheel Size": "24 Inches",
            "Braking": "Dual Disk Brake",
            "Tires": "24 x 2.40 Alpha Nylon Tires",
            "Suspension": "Front Suspension",
            "Speed": "Single Speed"
        },
        catalogLink: "https://wa.me/p/24692556573780654/917511103323",
        code: "CM141",
        featured: true
    }
];

products.push(...newProducts);

const finalStr = 'const products = ' + JSON.stringify(products, null, 4) + ';\n\nif (typeof module !== \'undefined\') {\n    module.exports = products;\n}\n';

fs.writeFileSync(productsJsPath, finalStr, 'utf8');
console.log('Done updating products.');
