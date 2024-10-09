// CategorySection.jsx
import React from "react";
// Import images
import clothesImage from "../assets/clothes.png";
import petsImage from "../assets/pets.png";
import servicesImage from "../assets/services.png";
import electronicsImage from "../assets/electronics.png";
import kidsGoodsImage from "../assets/kids-goods.png";
import homeGoodsImage from "../assets/home-goods.png";
// import beautyImage from "../assets/beauty.jpg";

// Define categories with imported images
const categories = [
  { name: "Одежда, обувь, аксессуары", image: clothesImage },
  { name: "Животные", image: petsImage },
  { name: "Услуги", image: servicesImage },
  { name: "Электроника", image: electronicsImage },
  { name: "Товары для детей", image: kidsGoodsImage },
  { name: "Товары для дома", image: homeGoodsImage },
  //   { name: "Красота и здоровье", image: beautyImage },
];

const CategorySection = () => {
  return (
    <section className="py-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Категории</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative rounded-lg bg-[#ebeae8] flex flex-row-reverse">
              <img
                src={category.image}
                alt={category.name}
                className="w-36 h-full object-cover"
                // style={{ height: "150px" }}
              />
              <div className="absolute bottom-0 left-0 top-0 w-3 py-2 px-3 text-sm text-gray-700 rounded-b-lg">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
