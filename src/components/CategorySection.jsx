import React, { useContext } from "react";
import { FilterContext } from "../context/FilterContext";

const CategorySection = ({ categories }) => {
  const { selectedCategories, toggleCategory } = useContext(FilterContext);
  return (
    <section className="py-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Категории</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`relative rounded-lg bg-[#ebeae8] flex flex-row-reverse cursor-pointer ${
                selectedCategories.includes(category.name)
                  ? "bg-[#e9d7b3]"
                  : "bg-[#ebeae8]"
              }`}
              onClick={() => toggleCategory(category.name)}>
              <img
                src={category.image}
                alt={category.name}
                className="w-36 h-full object-cover"
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
