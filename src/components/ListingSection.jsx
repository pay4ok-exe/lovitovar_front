import React, { useState } from "react";

const ListingSection = ({ listings }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const toggleFilter = () => setIsFilterVisible(!isFilterVisible);

  return (
    <section className="py-10">
      <div className="max-w-screen-xl mx-auto sm:px-6 lg:px-8 flex bg-white">
        {/* Toggle filter button */}
        <button
          className=" text-blue-500 hover:text-blue-700"
          onClick={toggleFilter}>
          {isFilterVisible ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Filter Section */}
        {isFilterVisible && (
          <aside className="hidden md:block w-1/4 bg-white p-4 shadow-md">
            {/* Add your filter options here */}
            <div>
              <h3 className="font-bold text-lg mb-4">Фильтры</h3>
              <label className="block text-gray-700 text-sm mb-2">Цена</label>
              <input
                type="number"
                placeholder="От"
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="number"
                placeholder="До"
                className="mb-4 p-2 border rounded w-full"
              />
              {/* Add more filters as needed */}
            </div>
          </aside>
        )}

        {/* Listings */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((listing, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-lg font-bold mt-2">{listing.title}</h3>
                <p className="text-gray-600">{listing.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xl font-semibold">{listing.price}</span>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Позвонить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingSection;
