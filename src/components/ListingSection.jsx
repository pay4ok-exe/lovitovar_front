import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FilterContext } from "../context/FilterContext";
import Pagination from "./Pagination";
import { Skeleton, Grid2 } from "@mui/material";

const ListingSection = ({ listings, categories, loading }) => {
  const { selectedCategories, toggleCategory } = useContext(FilterContext);
  const navigate = useNavigate();

  // Filter listings based on selected categories
  const filteredListings =
    selectedCategories.length === 0
      ? listings
      : listings.filter((listing) =>
          selectedCategories.includes(listing.categoryName)
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
            {!loading
              ? filteredListings.map((listing, index) => (
                  <Grid2
                    item
                    xs={12}
                    sm={6}
                    md={4} // Устанавливаем md=4 для трёх колонок
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
                            {listing.price} ₽
                          </span>
                          <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>
                  </Grid2>
                ))
              : Array.from({ length: 9 }).map((_, index) => (
                  <Grid2
                    item
                    xs={12}
                    sm={6}
                    md={4} // Устанавливаем md=4 для трёх колонок
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
                ))}
          </Grid2>
          <Pagination />
        </div>
      </div>
    </section>
  );
};

export default ListingSection;
