const fs = require('fs');

const dataFile = 'data/products.js';
let content = fs.readFileSync(dataFile, 'utf8');

// Parse the JS array
let jsonStr = content.replace('const products = ', '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let productsArray = new Function('return ' + jsonStr)();

// 1. In Product Code - CM114, Change the name with each other
let cm114 = productsArray.find(p => p.code === 'CM114');
if (cm114 && cm114.variants && cm114.variants.length >= 2) {
    cm114.variants[0].colorName = "Yellowish Orange";
    cm114.variants[1].colorName = "Yellowish Blue";
}

// 2. Add CM147 into Ladies Category
let cm147 = productsArray.find(p => p.code === 'CM147');
if (cm147 && !cm147.category.includes("Ladies")) {
    cm147.category += ", Ladies";
}

// 3. Add new products
const newProducts = [
    {
        name: "Alpha Tokyo 24",
        code: "CM142",
        brand: "Alpha",
        category: "Adult, Single Speed, Sports",
        price: 6299,
        mrp: 8299,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7524.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7524.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7523.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7525.jpg"
        ],
        description: "The Alpha Tokyo 24 is designed for thrill-seekers and daily commuters alike, boasting a sturdy build with power brakes, reliable rigid suspension, and striking 24*2.40\" Alpha Nylon wide tires for superior traction. \n\n**Price Comparison:**\n- Market MRP: ₹8,299\n- Typical Retail Price: ₹7,000 - ₹7,500\n- **City Cycle Mart Price: ₹6,299**",
        features: ["Power Brake", "Rigid Suspension", "24*2.40\" Alpha Nylon tyre", "Mudguard", "Water Bottle", "Reflector", "Air Pumb", "Mirror And Bell"],
        specs: { "Wheel Size": "24 Inches", "Suspension": "Rigid", "Braking": "Power Brake" }
    },
    {
        name: "Alpha Bucky 20",
        code: "CM143",
        brand: "Alpha",
        category: "Teen",
        price: 5599,
        mrp: 7599,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7539.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7539.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7540.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7541.jpg"
        ],
        description: "The Alpha Bucky 20 offers an exciting ride for teens. Featuring a robust build, comfortable rigid suspension, and wide 24*2.40\" tires, it's perfect for neighborhood adventures and park trails. Support wheels are included for added stability.\n\n**Price Comparison:**\n- Market MRP: ₹7,599\n- Typical Retail Price: ₹6,200 - ₹6,800\n- **City Cycle Mart Price: ₹5,599**",
        features: ["Caliper Brake", "Rigid Suspension", "24*2.40\" Wide Tyre", "Support Wheel", "Mudguard", "Mirror And Bell"],
        specs: { "Wheel Size": "20 Inches", "Suspension": "Rigid", "Braking": "Caliper Brake" }
    },
    {
        name: "Alpha Candy Floss 20",
        code: "CM144",
        brand: "Alpha",
        category: "Teen, Ladies, IBC",
        price: 5299,
        mrp: 7299,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7542.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7542.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7543.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7544.jpg"
        ],
        description: "The Alpha Candy Floss 20 is a stylish and functional bicycle for teens and ladies. It features an integrated carrier, a handy front basket, and a comfortable ride with rigid suspension and caliper brakes.\n\n**Price Comparison:**\n- Market MRP: ₹7,299\n- Typical Retail Price: ₹6,000 - ₹6,500\n- **City Cycle Mart Price: ₹5,299**",
        features: ["Caliper Brake", "Rigid Suspension", "Integrated Carrier", "Front Basket", "Support Wheel", "Mudguard", "Mirror And Bell"],
        specs: { "Wheel Size": "20 Inches", "Suspension": "Rigid", "Braking": "Caliper Brake" }
    },
    {
        name: "Avrox Eagle Pro 20",
        code: "CM145",
        brand: "Avrox",
        category: "Teen",
        price: 4799,
        mrp: 6599,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7546.jpg",
        description: "The Avrox Eagle Pro 20 is a sleek, reliable teen bike with solid 20*2.40\" wide tires, caliper brakes, and a durable rigid suspension frame. Built for both style and safety, perfect for everyday rides.\n\n**Price Comparison:**\n- Market MRP: ₹6,599\n- Typical Retail Price: ₹5,500 - ₹6,000\n- **City Cycle Mart Price: ₹4,799**",
        features: ["Caliper Brake", "Rigid Suspension", "20*2.40 Wide Tyre", "Support Wheel", "Mudguard", "Mirror And Bell"],
        specs: { "Wheel Size": "20 Inches", "Suspension": "Rigid", "Braking": "Caliper Brake" },
        variants: [
            {
                colorName: "Orenge Blue",
                image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7546.jpg",
                slides: [
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7546.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7547.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7545.jpg"
                ]
            },
            {
                colorName: "Redish Blue",
                image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7550.jpg",
                slides: [
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7550.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7549.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7548.jpg"
                ]
            }
        ]
    },
    {
        name: "Avrox Eagle Pro 16",
        code: "CM146",
        brand: "Avrox",
        category: "Junior",
        price: 4499,
        mrp: 6299,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7551.jpg",
        description: "The Avrox Eagle Pro 16 brings robust performance to junior riders. With sturdy 16*2.40\" wide tires and essential safety features like caliper brakes and support wheels, this bike makes learning fun and safe.\n\n**Price Comparison:**\n- Market MRP: ₹6,299\n- Typical Retail Price: ₹5,000 - ₹5,600\n- **City Cycle Mart Price: ₹4,499**",
        features: ["Caliper Brake", "Rigid Suspension", "16*2.40 Wide Tyre", "Support Wheel", "Mudguard", "Mirror And Bell"],
        specs: { "Wheel Size": "16 Inches", "Suspension": "Rigid", "Braking": "Caliper Brake" },
        variants: [
            {
                colorName: "Orenge Silver",
                image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7551.jpg",
                slides: [
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7551.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7552.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7553.jpg"
                ]
            },
            {
                colorName: "Redish Blue",
                image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7556.jpg",
                slides: [
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7556.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7555.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7554.jpg"
                ]
            },
            {
                colorName: "Blueish Yellow",
                image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7559.jpg",
                slides: [
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7559.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7558.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7557.jpg"
                ]
            }
        ]
    },
    {
        name: "Alpha Hop & Dab 16",
        code: "CM148",
        brand: "Alpha",
        category: "Junior",
        price: 5499,
        mrp: 7499,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7561.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7561.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7562.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7560.jpg"
        ],
        description: "The Alpha Hop & Dab 16 is an energetic and reliable companion for junior riders. Complete with a front basket, a supportive back rest, and robust support wheels, it's the ideal choice for early cycling adventures.\n\n**Price Comparison:**\n- Market MRP: ₹7,499\n- Typical Retail Price: ₹6,200 - ₹6,800\n- **City Cycle Mart Price: ₹5,499**",
        features: ["Caliper Brake", "Rigid Suspension", "Front Basket", "Back Rest", "Support Wheel", "Mudguard", "Bell And Mirror"],
        specs: { "Wheel Size": "16 Inches", "Suspension": "Rigid", "Braking": "Caliper Brake" }
    },
    {
        name: "Bruce Bla 14",
        code: "CM150",
        brand: "Bruce",
        category: "Kids, IBC",
        price: 4399,
        mrp: 5999,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7564.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7564.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7563.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7565.jpg"
        ],
        description: "The Bruce Bla 14 is a highly equipped kids bicycle built for comfort and utility. Featuring an integrated carrier, front basket, water bottle, and a comfortable back rest, making it perfect for your little one.\n\n**Price Comparison:**\n- Market MRP: ₹5,999\n- Typical Retail Price: ₹5,000 - ₹5,400\n- **City Cycle Mart Price: ₹4,399**",
        features: ["Caliper Brake", "Rigid Suspension", "Integrated Carrier", "Front Basket", "Back Rest", "Support Wheel", "Mudguard", "Water Bottle", "Bell And Mirror"],
        specs: { "Wheel Size": "14 Inches", "Suspension": "Rigid", "Braking": "Caliper Brake" }
    },
    {
        name: "Tass Coco 12",
        code: "CM151",
        brand: "Coco",
        category: "Kids",
        price: 3699,
        mrp: 5199,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7570.jpg",
        description: "The Tass Coco 12 is a vibrant kids bike perfectly sized for early riders. With a front basket, a back rest, and a water bottle included, it ensures maximum comfort and enjoyment for every ride.\n\n**Price Comparison:**\n- Market MRP: ₹5,199\n- Typical Retail Price: ₹4,200 - ₹4,800\n- **City Cycle Mart Price: ₹3,699**",
        features: ["Caliper Brake", "Rigid Suspension", "Front Basket", "Back Rest", "Support Wheel", "Mudguard", "Water Bottle", "Bell And Mirror"],
        specs: { "Wheel Size": "12 Inches", "Suspension": "Rigid", "Braking": "Caliper Brake" },
        variants: [
            {
                colorName: "Blue",
                image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7570.jpg",
                slides: [
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7570.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7569.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7571.jpg"
                ]
            },
            {
                colorName: "Red",
                image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7568.jpg",
                slides: [
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7568.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7566.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7567.jpg"
                ]
            },
            {
                colorName: "Green",
                image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7574.jpg",
                slides: [
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7574.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7572.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7573.jpg"
                ]
            }
        ]
    },
    {
        name: "Caya Gold D/Crown 24",
        code: "CM152",
        brand: "Caya",
        category: "Adult, Single Speed, IBC",
        price: 10599,
        mrp: 14599,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7575.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7575.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7578.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7576.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7579.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7577.jpg"
        ],
        description: "The Caya Gold D/Crown 24 is a premium, heavy-duty bicycle with top-tier features including dual disk brakes, double front suspension, and robust 24*2.40\" Hartex tires for unparalleled control and comfort on any terrain.\n\n**Price Comparison:**\n- Market MRP: ₹14,599\n- Typical Retail Price: ₹12,000 - ₹13,000\n- **City Cycle Mart Price: ₹10,599**",
        features: ["Dual Disk Brake", "Double Front Suspension", "24*2.40\" Hartex Tyre", "Reflector", "Air Pump", "Mirror And Bell"],
        specs: { "Wheel Size": "24 Inches", "Suspension": "Double Front Suspension", "Braking": "Dual Disk Brake" }
    },
    {
        name: "Bruce Bla 14",
        code: "CM154",
        brand: "Bruce",
        category: "Kids",
        price: 4199,
        mrp: 5899,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7582.jpg",
        description: "The Bruce Bla 14 CM154 provides a superb riding experience for kids with a sleek design. It includes a front basket, a back rest, and water bottle making it a fully equipped companion for outdoor play.\n\n**Price Comparison:**\n- Market MRP: ₹5,899\n- Typical Retail Price: ₹4,800 - ₹5,200\n- **City Cycle Mart Price: ₹4,199**",
        features: ["Caliper Brake", "Rigid Suspension", "Front Basket", "Back Rest", "Support Wheel", "Mudguard", "Water Bottle", "Bell And Mirror"],
        specs: { "Wheel Size": "14 Inches", "Suspension": "Rigid", "Braking": "Caliper Brake" },
        variants: [
            {
                colorName: "Blue",
                image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7582.jpg",
                slides: [
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7582.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7580.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7581.jpg"
                ]
            },
            {
                colorName: "Red",
                image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7585.jpg",
                slides: [
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7585.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7584.jpg",
                    "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7583.jpg"
                ]
            }
        ]
    },
    {
        name: "Hero Galaxy 14",
        code: "CM431",
        brand: "Hero",
        category: "Kids",
        price: 4299,
        mrp: 5999,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7588.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7588.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7587.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7586.jpg"
        ],
        description: "The Hero Galaxy 14 is a sturdy and visually appealing kids bike from India's trusted brand, Hero. It features an integrated carrier, front basket, and back rest to make learning to ride an absolute joy.\n\n**Price Comparison:**\n- Market MRP: ₹5,999\n- Typical Retail Price: ₹4,800 - ₹5,200\n- **City Cycle Mart Price: ₹4,299**",
        features: ["Caliper Brake", "Rigid Suspension", "Integrated Carrier", "Front Basket", "Back Rest", "Support Wheel", "Mudguard", "Bell And Mirror"],
        specs: { "Wheel Size": "14 Inches", "Suspension": "Rigid", "Braking": "Caliper Brake" }
    },
    {
        name: "BSA Ampush 14",
        code: "CM432",
        brand: "BSA",
        category: "Kids",
        price: 4599,
        mrp: 6399,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7591.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7591.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7590.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7589.jpg"
        ],
        description: "The BSA Ampush 14 delivers exceptional build quality from the legendary BSA brand. With an integrated carrier, back rest, and water bottle, it provides premium comfort and utility for kids.\n\n**Price Comparison:**\n- Market MRP: ₹6,399\n- Typical Retail Price: ₹5,200 - ₹5,800\n- **City Cycle Mart Price: ₹4,599**",
        features: ["Caliper Brake", "Rigid Suspension", "Integrated Carrier", "Front Basket", "Back Rest", "Support Wheel", "Mudguard", "Water Bottle", "Bell And Mirror"],
        specs: { "Wheel Size": "14 Inches", "Suspension": "Rigid", "Braking": "Caliper Brake" }
    },
    {
        name: "Hero Pistal 16",
        code: "CM433",
        brand: "Hero",
        category: "Junior",
        price: 4999,
        mrp: 6899,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7594.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7594.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7592.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7593.jpg"
        ],
        description: "The Hero Pistal 16 is a dynamic and sporty junior bike engineered for performance and safety. It features reliable caliper brakes and comes with a water bottle and mudguards for all-weather riding.\n\n**Price Comparison:**\n- Market MRP: ₹6,899\n- Typical Retail Price: ₹5,600 - ₹6,200\n- **City Cycle Mart Price: ₹4,999**",
        features: ["Caliper Brake", "Rigid Suspension", "Support Wheel", "Mudguard", "Water Bottle", "Bell And Mirror"],
        specs: { "Wheel Size": "16 Inches", "Suspension": "Rigid", "Braking": "Caliper Brake" }
    },
    {
        name: "Hero Galaxy 20",
        code: "CM435",
        brand: "Hero",
        category: "Teen",
        price: 4899,
        mrp: 6699,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7595.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7595.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7597.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7596.jpg"
        ],
        description: "The Hero Galaxy 20 is an upgraded teen bicycle featuring an integrated carrier, a front basket, and a comfortable back rest. Built by Hero for durability and a super smooth ride.\n\n**Price Comparison:**\n- Market MRP: ₹6,699\n- Typical Retail Price: ₹5,500 - ₹6,000\n- **City Cycle Mart Price: ₹4,899**",
        features: ["Caliper Brake", "Rigid Suspension", "Integrated Carrier", "Front Basket", "Back Rest", "Support Wheel", "Mudguard", "Bell And Mirror"],
        specs: { "Wheel Size": "20 Inches", "Suspension": "Rigid", "Braking": "Caliper Brake" }
    },
    {
        name: "Hero Tango 12",
        code: "CM438",
        brand: "Hero",
        category: "Kids, IBC",
        price: 3899,
        mrp: 5399,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7600.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7600.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7599.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7598.jpg"
        ],
        description: "The Hero Tango 12 is a wonderfully designed starter bike for kids. Featuring safety support wheels, an integrated carrier, and a sturdy frame, it is built to help young riders balance with ease.\n\n**Price Comparison:**\n- Market MRP: ₹5,399\n- Typical Retail Price: ₹4,500 - ₹4,800\n- **City Cycle Mart Price: ₹3,899**",
        features: ["Caliper Brake", "Rigid Suspension", "Integrated Carrier", "Front Basket", "Back Rest", "Support Wheel", "Mudguard", "Bell And Mirror"],
        specs: { "Wheel Size": "12 Inches", "Suspension": "Rigid", "Braking": "Caliper Brake" }
    },
    {
        name: "Alpha Serinity 24",
        code: "CM503",
        brand: "Alpha",
        category: "Adult, Ladies, IBC",
        price: 7199,
        mrp: 9599,
        image: "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7603.jpg",
        slides: [
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7603.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7601.jpg",
            "https://citycyclemart.wordpress.com/wp-content/uploads/2026/06/img_7602.jpg"
        ],
        description: "The Alpha Serinity 24 is a beautiful, elegantly designed ladies bicycle. Featuring a convenient front basket, an integrated carrier, and a sturdy frame, it combines utility with a timeless aesthetic perfect for city commuting.\n\n**Price Comparison:**\n- Market MRP: ₹9,599\n- Typical Retail Price: ₹8,000 - ₹8,500\n- **City Cycle Mart Price: ₹7,199**",
        features: ["Caliper Brake", "Rigid Suspension", "Integrated Carrier", "Front Basket", "Support Wheel", "Mudguard", "Bell And Mirror"],
        specs: { "Wheel Size": "24 Inches", "Suspension": "Rigid", "Braking": "Caliper Brake" }
    }
];

let maxId = Math.max(...productsArray.map(p => p.id));
for (let p of newProducts) {
    p.id = ++maxId;
    p.catalogLink = "https://wa.me/p/24692556573780654/917511103323";
    productsArray.push(p);
}

const finalCode = 'const products = ' + JSON.stringify(productsArray, null, 4) + ';\n';
fs.writeFileSync(dataFile, finalCode);
console.log('Done modifying products.js');
