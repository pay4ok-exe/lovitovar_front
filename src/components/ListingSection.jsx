import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterContext } from "../context/FilterContext";
import Pagination from "./Pagination";
import { Skeleton, Grid2 } from "@mui/material";

const ListingSection = ({
  listings,
  categories,
  loading,
  handleShowMore,
  hasMore,
  priceRanges,
}) => {
  const { selectedCategories, toggleCategory } = useContext(FilterContext);
  const navigate = useNavigate();

  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]); // Track selected price ranges

  // Handle toggling of price ranges
  const togglePriceRange = (rangeIndex) => {
    setSelectedPriceRanges(
      (prev) =>
        prev.includes(rangeIndex)
          ? prev.filter((index) => index !== rangeIndex) // Remove if already selected
          : [...prev, rangeIndex] // Add if not selected
    );
  };

  const isPriceInSelectedRanges = (price) => {
    if (selectedPriceRanges.length === 0) return true; // No filter applied, show all

    return selectedPriceRanges.some((rangeIndex) => {
      const range = priceRanges[rangeIndex];
      const [min, max] = range.values;
      return price >= min && price <= max;
    });
  };

  // Filter listings based on selected categories and price ranges
  const filteredListings = listings.filter(
    (listing) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(listing.categoryName)) &&
      isPriceInSelectedRanges(listing.price)
  );

  // Sample price ranges for filtering

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 flex">
        {/* Filter Sidebar */}
        <aside className="bg-white p-4 w-1/4 shadow-lg">
          <div className="sticky top-20">
            <h3 className="font-bold text-lg mb-4">Фильтры</h3>
            <div>
              <h4 className="font-semibold mb-2">Категории</h4>
              {categories.map((category, index) => (
                <div key={index} className="mb-1">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => toggleCategory(category.name)}
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
                      onChange={() => togglePriceRange(index)}
                    />
                    <span className="ml-2">{price.range}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Listings Grid2 */}
        <div className="w-3/4 ml-4">
          <Grid2
            container
            spacing={2}
            justifyContent="start"
            alignItems="center">
            {!loading ? (
              filteredListings.length > 0 ? (
                filteredListings.map((listing, index) => (
                  <Grid2
                    item
                    xs={12}
                    sm={6}
                    md={4} // 3 columns for medium screens
                    key={index}>
                    <div
                      className="bg-white rounded-lg shadow-lg"
                      style={{
                        width: "285px",
                        height: "400px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                      onClick={() => navigate(`/product/${listing._id}`)}>
                      <img
                        src={listing.imagesUrl[0]}
                        alt={listing.productName}
                        className="h-48 object-cover rounded-lg mb-4"
                        style={{ borderRadius: "8px" }}
                      />
                      <div className="p-2">
                        <h3 className="text-lg font-bold text-center">
                          {listing.productName}
                        </h3>
                        <p className="text-gray-600 text-center">
                          {listing.description}
                        </p>
                        <div className="flex justify-between items-center mt-4 gap-2">
                          <span className="text-xl font-semibold">
                            {listing.price} BYN
                          </span>
                          <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>
                  </Grid2>
                ))
              ) : (
                // Show "No Products" when listings are empty
                <div className="w-full text-center text-gray-600">
                  <h3>Нет доступных продуктов.</h3>
                </div>
              )
            ) : (
              // Show Skeleton Loader during loading
              Array.from({ length: 9 }).map((_, index) => (
                <Grid2
                  item
                  xs={12}
                  sm={6}
                  md={4} // 3 columns for medium screens
                  key={index}>
                  <div
                    className="w-full"
                    style={{
                      width: "285px",
                      height: "400px",
                    }}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={180}
                      style={{ borderRadius: "8px", marginBottom: "16px" }}
                    />
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={24}
                      style={{ marginBottom: "8px" }}
                    />
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={24}
                      style={{ marginBottom: "8px" }}
                    />
                  </div>
                </Grid2>
              ))
            )}
          </Grid2>

          {/* <Pagination /> */}
          {hasMore && filteredListings.length > 0 && (
            <div className="flex justify-center items-center mt-8">
              <button
                onClick={handleShowMore}
                className="text-center px-6 py-3 rounded-full text-indigo-700 bg-white border border-indigo-500 hover:bg-indigo-700 hover:text-white transition duration-300">
                Показать больше
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListingSection;
