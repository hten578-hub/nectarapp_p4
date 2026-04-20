// ─── Categories ───────────────────────────────────────────────────────────────
export const categories = [
  { id: '1', name: 'Fresh Fruits\n& Vegetable', color: '#E8F5E9', image: require('../../assets/explore/beef bone.png') },
  { id: '2', name: 'Cooking Oil\n& Ghee', color: '#FFF8E1', image: require('../../assets/explore/beef bone-1.png') },
  { id: '3', name: 'Meat & Fish', color: '#FBE9E7', image: require('../../assets/explore/beef bone-5.png'), extraImage: require('../../assets/explore/pngfuel 9.png') },
  { id: '4', name: 'Bakery & Snacks', color: '#F3E5F5', image: require('../../assets/explore/beef bone-2.png') },
  { id: '5', name: 'Dairy & Eggs', color: '#FFFDE7', image: require('../../assets/explore/beef bone-6.png'), extraImage: require('../../assets/explore/Group 6837.png') },
  { id: '6', name: 'Beverages', color: '#E3F2FD', image: require('../../assets/explore/beef bone-3.png') },
];

// ─── Home screen product lists ─────────────────────────────────────────────────
export const exclusiveOffers = [
  { id: '1', name: 'Organic Bananas', unit: '7pcs', price: 4.99, image: { uri: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300' }, category: 'Fresh Fruits & Vegetable' },
  { id: '2', name: 'Red Apple', unit: '1kg', price: 4.99, image: { uri: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300' }, category: 'Fresh Fruits & Vegetable' },
  { id: '3', name: 'Ginger', unit: '250g', price: 2.99, image: { uri: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=300' }, category: 'Fresh Fruits & Vegetable' },
];

export const bestSelling = [
  { id: '4', name: 'Bell Pepper Red', unit: '1kg', price: 4.99, image: { uri: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300' }, category: 'Fresh Fruits & Vegetable' },
  { id: '5', name: 'Ginger', unit: '250g', price: 4.99, image: { uri: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=300' }, category: 'Fresh Fruits & Vegetable' },
  { id: '6', name: 'Beef Bone', unit: '1kg', price: 4.99, image: { uri: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=300' }, category: 'Meat & Fish' },
];

export const groceries = [
  { id: '7', name: 'Beef Bone', unit: '1kg', price: 4.99, image: { uri: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=300' }, category: 'Meat & Fish' },
  { id: '8', name: 'Broiler Chicken', unit: '1kg', price: 4.99, image: { uri: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300' }, category: 'Meat & Fish' },
];

export const beverages = [
  { id: '9', name: 'Diet Coke', unit: '355ml', price: 1.99, image: require('../../assets/bever/Group 6824.png'), category: 'Beverages' },
  { id: '10', name: 'Sprite Can', unit: '325ml', price: 1.50, image: require('../../assets/bever/Group 6840.png'), extraImage: require('../../assets/bever/pngfuel 12.png'), category: 'Beverages' },
  { id: '11', name: 'Apple & Grape Juice', unit: '2L', price: 15.99, image: require('../../assets/bever/Group 6841.png'), category: 'Beverages' },
  { id: '12', name: 'Orange Juice', unit: '2L', price: 15.99, image: require('../../assets/bever/Group 6845.png'), category: 'Beverages' },
  { id: '13', name: 'Coca Cola Can', unit: '325ml', price: 4.99, image: require('../../assets/bever/Group 6843.png'), category: 'Beverages' },
  { id: '14', name: 'Pepsi Can', unit: '330ml', price: 4.99, image: require('../../assets/bever/Group 6844.png'), category: 'Beverages' },
];

export const allProducts = [...exclusiveOffers, ...bestSelling, ...groceries, ...beverages];

export const getProductsByCategory = (categoryName) => {
  const normalized = categoryName.replace('\n', ' ');
  return allProducts.filter(p => p.category === normalized);
};

// ─── Search screen products ────────────────────────────────────────────────────
const products = [
  // Fresh Fruits & Vegetable
  { id: '1', name: 'Organic Bananas', unit: '7pcs', price: 4.99, image: { uri: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300' }, category: 'Fresh Fruits & Vegetable', brand: 'Kazi Farmas' },
  { id: '2', name: 'Red Apple', unit: '1kg', price: 4.99, image: { uri: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300' }, category: 'Fresh Fruits & Vegetable', brand: 'Kazi Farmas' },
  { id: '3', name: 'Ginger', unit: '250gm', price: 2.99, image: { uri: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=300' }, category: 'Fresh Fruits & Vegetable', brand: 'Individual Collection' },
  { id: '4', name: 'Bell Pepper Red', unit: '1kg', price: 4.99, image: { uri: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300' }, category: 'Fresh Fruits & Vegetable', brand: 'Individual Collection' },

  // Eggs & Noodles
  { id: '5', name: 'Egg Chicken Red', unit: '4pcs', price: 1.99, image: require('../../assets/search/Group 6824.png'), category: 'Eggs', brand: 'Kazi Farmas' },
  { id: '6', name: 'Egg Chicken White', unit: '180g', price: 1.50, image: require('../../assets/search/Group 6840.png'), category: 'Eggs', brand: 'Individual Collection' },
  { id: '7', name: 'Egg Pasta', unit: '30gm', price: 15.99, image: require('../../assets/search/Group 6841.png'), category: 'Noodles & Pasta', brand: 'Ifad' },
  { id: '8', name: 'Mayonnais Eggless', unit: '325ml', price: 4.99, image: require('../../assets/search/Group 6843.png'), category: 'Eggs', brand: 'Individual Collection' },
  { id: '9', name: 'Egg Noodles', unit: '330ml', price: 4.99, image: require('../../assets/search/Group 6844.png'), category: 'Noodles & Pasta', brand: 'Ifad' },
  { id: '10', name: 'Egg Noodles 2', unit: '2L', price: 15.99, image: require('../../assets/search/Group 6845.png'), category: 'Noodles & Pasta', brand: 'Ifad' },

  // Meat & Fish
  { id: '11', name: 'Beef Bone', unit: '1kg', price: 4.99, image: { uri: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=300' }, category: 'Meat & Fish', brand: 'Kazi Farmas' },
  { id: '12', name: 'Broiler Chicken', unit: '1kg', price: 4.99, image: { uri: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300' }, category: 'Meat & Fish', brand: 'Kazi Farmas' },

  // Beverages
  { id: '13', name: 'Diet Coke', unit: '355ml', price: 1.99, image: require('../../assets/search/Group 6824.png'), category: 'Beverages', brand: 'Cocola' },
  { id: '14', name: 'Sprite Can', unit: '325ml', price: 1.50, image: require('../../assets/search/Group 6840.png'), category: 'Beverages', brand: 'Cocola' },
  { id: '15', name: 'Apple & Grape Juice', unit: '2L', price: 15.99, image: require('../../assets/search/Group 6845.png'), category: 'Beverages', brand: 'Individual Collection' },
  { id: '16', name: 'Orange Juice', unit: '2L', price: 15.99, image: require('../../assets/search/Group 6845.png'), category: 'Beverages', brand: 'Individual Collection' },
  { id: '17', name: 'Coca Cola Can', unit: '325ml', price: 4.99, image: require('../../assets/search/Group 6843.png'), category: 'Beverages', brand: 'Cocola' },
  { id: '18', name: 'Pepsi Can', unit: '330ml', price: 4.99, image: require('../../assets/search/Group 6844.png'), category: 'Beverages', brand: 'Ifad' },

  // Chips & Crisps
  { id: '19', name: 'Pringles Original', unit: '165g', price: 3.49, image: { uri: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300' }, category: 'Chips & Crisps', brand: 'Individual Collection' },
  { id: '20', name: 'Lays Classic', unit: '180g', price: 2.99, image: { uri: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=300' }, category: 'Chips & Crisps', brand: 'Ifad' },

  // Fast Food
  { id: '21', name: 'Instant Noodles', unit: '75g', price: 0.99, image: { uri: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300' }, category: 'Fast Food', brand: 'Ifad' },
  { id: '22', name: 'Frozen Pizza', unit: '400g', price: 6.99, image: { uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300' }, category: 'Fast Food', brand: 'Kazi Farmas' },
];

export default products;

export const filterCategories = ['Eggs', 'Noodles & Pasta', 'Chips & Crisps', 'Fast Food'];
export const filterBrands = ['Individual Collection', 'Cocola', 'Ifad', 'Kazi Farmas'];
