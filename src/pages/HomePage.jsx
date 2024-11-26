import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FilterProvider } from "../context/FilterContext";
import CategorySection from "../components/CategorySection";
import ListingSection from "../components/ListingSection";
import axiosInstance from "../axios/axiosInstance";
import { Skeleton, Grid } from "@mui/material"; // Добавлено

// Define categories (предположим, они статичны)
import servicesImage from "../assets/services.png";
import kidsGoodsImage from "../assets/kids-goods.png";
import carGoodsImage from "../assets/carGoods.png";
import beautyImage from "../assets/beauty.png";
import sportsImage from "../assets/sports.png";
import electronicsImage from "../assets/electronics.png";
import clothesImage from "../assets/clothes.png";
import homeGoodsImage from "../assets/home-goods.png";
import petsImage from "../assets/pets.png";
import anotherThingsImage from "../assets/anotherThings.png";

const categories = [
  { name: "Одежда и аксессуары", image: clothesImage, checked: false },
  { name: "Косметика и здоровье", image: beautyImage, checked: false },
  { name: "Товары для животных", image: petsImage, checked: false },
  { name: "Услуги", image: servicesImage, checked: false },
  { name: "Автотовары", image: carGoodsImage, checked: false },
  { name: "Электроника", image: electronicsImage, checked: false },
  { name: "Товары для детей", image: kidsGoodsImage, checked: false },
  { name: "Товары для дома", image: homeGoodsImage, checked: false },
  { name: "Спорт и отдых", image: sportsImage, checked: false },
  { name: "Другое", image: anotherThingsImage, checked: false },
];

const priceRanges = [
  { range: "до 1 000 ₽", values: [0, 1000] },
  { range: "1 001 - 5 000 ₽", values: [1001, 5000] },
  { range: "5 001 - 10 000 ₽", values: [5001, 10000] },
  { range: "10 001 - 20 000 ₽", values: [10001, 20000] },
  { range: "20 001 - 50 000 ₽", values: [20001, 50000] },
  { range: "более 50 000 ₽", values: [50001, Infinity] },
];

const HomePage = () => {
  const [listings, setListings] = useState([]); // Состояние для данных с бэкенда
  const [loading, setLoading] = useState(true); // Состояние для загрузки
  const [allProducts, setAllProducts] = useState([]); // Full list of products
  const [displayedProducts, setDisplayedProducts] = useState([]); // Products currently shown
  const [productLimit, setProductLimit] = useState(12);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        const all = response.data.products; // Assume this returns all products
        setAllProducts(all); // Save all products in state
        setDisplayedProducts(all.slice(0, productLimit)); // Show only the first 12
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productLimit]);

  const handleShowMore = () => {
    setProductLimit((prevLimit) => prevLimit + 10); // Add 10 more products to the limit
  };

  return (
    <FilterProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="pt-20">
          <CategorySection categories={categories} />
          {/* Отображаем Skeleton или ListingSection */}
          <ListingSection
            listings={displayedProducts}
            categories={categories}
            loading={loading}
            handleShowMore={handleShowMore} // Pass the handler for the Show More button
            hasMore={displayedProducts.length < allProducts.length} // Check if there are more products to load
            priceRanges={priceRanges}
          />
        </main>
        <Footer />
      </div>
    </FilterProvider>
  );
};

export default HomePage;
