export const CAFE = {
  name: "The Rouché Café",
  tagline: "Good Coffee, Brighter Days",
  whatsapp: "919935754959",
  displayPhone: "+91 99357 54959",
  mapUrl: "https://maps.app.goo.gl/hFJA5p2F91QixMgQ7",
  location: "Prayagraj, Uttar Pradesh",
  // Set true only after the owner confirms actual dishes, prices, and availability.
  demoMenu: true
} as const;

// Temporary stock photography used for layout previews only.
// Replace these with photos licensed or supplied by the café in /public/images.
const p = (id: string, w=1200) => "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=" + w + "&q=82";
export const PHOTOS = {
  hero: p("photo-1495474472287-4d71bcdd2085",1600),
  interior: p("photo-1517248135467-4c7edcad34c4",1400),
  interior2: p("photo-1554118811-1e0d58224f24",1200),
  cafe: p("photo-1442512595331-e89e73853f31",1400),
  coffee: p("photo-1509042239860-f550ce710b93",1000),
  cappuccino: p("photo-1570968915860-54d5c301fa9f",800),
  icedCoffee: p("photo-1461023058943-07fcbe16d735",800),
  matcha: p("photo-1515823064-d6e0c04616a7",800),
  croissant: p("photo-1555507036-ab1f4038808a",800),
  brownie: p("photo-1606313564200-e75d5e30476c",800),
  cake: p("photo-1578985545062-69928b1d9587",800),
  pancakes: p("photo-1528207776546-365bb710ee93",800),
  pasta: p("photo-1473093295043-cdd812d0e601",800),
  pizza: p("photo-1565299624946-b28f40a0ae38",800),
  burger: p("photo-1568901346375-23c9450c58cd",800),
  salad: p("photo-1512621776951-a57141f2eefd",800),
  fries: p("photo-1573080496219-bb080dd4f877",800),
  group: p("photo-1528605248644-14dd04022da1",1200)
};

export type MenuItem = {
  id: string; name: string; description: string; price: number;
  category: string; image: string; veg: boolean; bestseller?: boolean;
};
export const categories = [
  "Coffee & Beverages", "Breakfast & Brunch", "Snacks & Starters",
  "Pasta & Italian", "Main Course", "Burgers & Sandwiches",
  "Desserts & Bakery", "Combos & Offers"
];
export const menu: MenuItem[] = [
  { id:"cappuccino", name:"Cappuccino", description:"Rich espresso with creamy steamed milk.", price:260, category:categories[0],image:PHOTOS.cappuccino,veg:true,bestseller:true },
  { id:"matcha", name:"Matcha Latte", description:"Smooth, earthy, and perfectly balanced.", price:260,category:categories[0],image:PHOTOS.matcha,veg:true },
  { id:"cold-brew",name:"Cold Brew",description:"Bold, smooth and refreshingly chilled.",price:280,category:categories[0],image:PHOTOS.icedCoffee,veg:true },
  { id:"frappe",name:"Caramel Frappe",description:"Chilled coffee blended with rich caramel.",price:350,category:categories[0],image:PHOTOS.coffee,veg:true },
  { id:"croissant",name:"Butter Croissant",description:"Flaky, golden and perfectly buttery.",price:180,category:categories[1],image:PHOTOS.croissant,veg:true,bestseller:true },
  { id:"toast",name:"Avocado Toast",description:"Toasted bread with fresh avocado and herbs.",price:320,category:categories[1],image:PHOTOS.salad,veg:true },
  { id:"pancakes",name:"Classic Pancakes",description:"Fluffy pancakes served with seasonal fruits.",price:360,category:categories[1],image:PHOTOS.pancakes,veg:true },
  { id:"breakfast",name:"English Breakfast",description:"A hearty and wholesome breakfast platter.",price:499,category:categories[1],image:PHOTOS.croissant,veg:false },
  { id:"fries",name:"Masala Fries",description:"Golden fries tossed in house seasoning.",price:179,category:categories[2],image:PHOTOS.fries,veg:true },
  { id:"truffle-pasta",name:"Truffle Mushroom Pasta",description:"Creamy, aromatic and utterly indulgent.",price:420,category:categories[3],image:PHOTOS.pasta,veg:true,bestseller:true },
  { id:"arrabbiata",name:"Arrabbiata Pasta",description:"Classic Italian pasta with a spicy tomato sauce.",price:380,category:categories[3],image:PHOTOS.pasta,veg:true },
  { id:"pizza",name:"Cheese Burst Pizza",description:"Loaded with cheese and fresh toppings.",price:520,category:categories[3],image:PHOTOS.pizza,veg:true },
  { id:"margherita",name:"Margherita Pizza",description:"Tomato, mozzarella and aromatic basil.",price:480,category:categories[3],image:PHOTOS.pizza,veg:true },
  { id:"burger",name:"Classic Veg Burger",description:"Crisp vegetables and a signature sauce.",price:249,category:categories[5],image:PHOTOS.burger,veg:true },
  { id:"brownie",name:"Chocolate Brownie",description:"Rich, fudgy brownie with a scoop of vanilla.",price:320,category:categories[6],image:PHOTOS.brownie,veg:true,bestseller:true },
  { id:"cheesecake",name:"Berry Cheesecake",description:"Creamy cheesecake with seasonal berries.",price:360,category:categories[6],image:PHOTOS.cake,veg:true },
  { id:"combo",name:"Coffee & Croissant Combo",description:"A comforting café classic, perfectly paired.",price:399,category:categories[7],image:PHOTOS.croissant,veg:true }
];
export const money = (value:number) => "₹" + value.toLocaleString("en-IN");
export const waLink = (text:string) => "https://wa.me/" + CAFE.whatsapp + "?text=" + encodeURIComponent(text);
