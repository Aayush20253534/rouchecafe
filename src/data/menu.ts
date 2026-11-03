import { PHOTOS } from "@/lib/photos";

/**
 * TEMPORARY SAMPLE DATA. The café has not yet provided its final menu.
 * Never treat the prices or dishes below as verified. Until approved,
 * CAFE.demoMenu must remain true to prevent sending food orders.
 */
export type MenuItem = {
  id: string; name: string; description: string; price: number;
  category: string; image: string; veg: boolean; bestseller?: boolean;
};
export const categories = [
  "Coffee & Beverages", "Breakfast & Brunch", "Snacks & Starters",
  "Pasta & Italian", "Main Course", "Burgers & Sandwiches",
  "Desserts & Bakery", "Chef's Special", "Combos & Offers"
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
  { id:"combo",name:"Coffee & Croissant Combo",description:"A comforting café classic, perfectly paired.",price:399,category:categories[8],image:PHOTOS.croissant,veg:true }
];
