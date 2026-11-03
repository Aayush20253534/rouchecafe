// Homepage hero: supplied artwork stored locally under /public/images.
// Other entries are temporary stock photography to replace with café-approved photos.
const p = (id: string, w=1200) => "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=" + w + "&q=82";
export const PHOTOS = {
  hero: "/images/rouche-cafe-hero.png",
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

