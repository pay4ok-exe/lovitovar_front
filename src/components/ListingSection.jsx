import React, { useContext } from "react";
import { FilterContext } from "../context/FilterContext";
import Pagination from "./Pagination";

const ListingSection = ({ listings, categories }) => {
  const { selectedCategories, toggleCategory } = useContext(FilterContext);

  // Filter listings based on selected categories
  const filteredListings =
    selectedCategories.length === 0
      ? listings
      : listings.filter((listing) =>
          selectedCategories.includes(listing.category)
        );

  // Sample price ranges for filtering
  const priceRanges = [
    { range: "до 2 000 ₽", count: 252265 },
    { range: "2 000 - 9 999 ₽", count: 12031 },
    { range: "10 000 - 19 999 ₽", count: 1719 },
    { range: "20 000 - 29 999 ₽", count: 812 },
    { range: "30 000 - 39 999 ₽", count: 549 },
    { range: "40 000 - 49 999 ₽", count: 1382 },
    { range: "более 50 000 ₽", count: 737 },
  ];

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 flex">
        {/* Filter Sidebar */}
        <aside className="sticky top-20 bg-white p-4 w-1/4 shadow-lg">
          <h3 className="font-bold text-lg mb-4">Фильтры</h3>
          <div>
            <h4 className="font-semibold mb-2">Категории</h4>
            {categories.map((category, index) => (
              <div key={index} className="mb-1">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)} // Corrected to use category.name
                    onChange={() => toggleCategory(category.name)} // Corrected to pass category.name
                    className="form-checkbox text-indigo-600"
                  />
                  <span className="ml-2">{category.name}</span>
                </label>
              </div>
            ))}

            <h4 className="font-semibold mt-4 mb-2">Цена</h4>
            {priceRanges.map((price, index) => (
              <div key={index} className="mb-1">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-indigo-600"
                  />
                  <span className="ml-2">
                    {price.range} ({price.count})
                  </span>
                </label>
              </div>
            ))}
          </div>
        </aside>

        {/* Listings Grid */}
        <div className="flex-1 ml-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
            {filteredListings.map((listing, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="h-48 object-cover rounded-lg"
                />
                <div className="p-2">
                  <h3 className="text-lg font-bold">{listing.title}</h3>
                  <p className="text-gray-600">{listing.description}</p>
                  <div className="flex justify-between items-center mt-2 gap-2">
                    <span className="text-xl font-semibold">
                      {listing.price}
                    </span>
                    <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                      Подробнее
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination />
        </div>
      </div>
    </section>
  );
};

export default ListingSection;
