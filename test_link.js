const message = `*New Order from City Cycle Mart*\n\n*Order Summary:*\n- Alpha Tokiyo 26 PB (x1): ₹6,999\n  _View in Catalog:_ https://wa.me/p/24692556573780654/917511103323\n\nTOTAL: ₹6,999\n\nPlease confirm my order.`;
const encoded = encodeURIComponent(message);
const finalUrl = `https://wa.me/917511103323?text=${encoded}`;
console.log(finalUrl);
