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

const HomePage = () => {
  const [listings, setListings] = useState([]); // Состояние для данных с бэкенда
  const [loading, setLoading] = useState(true); // Состояние для загрузки

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        const arr = response.data.products; // Убедитесь, что здесь правильное поле с данными

        // Дублируем данные, объединяя массив с самим собой
        setListings(arr);
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <FilterProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="pt-20">
          <CategorySection categories={categories} />
          {/* Отображаем Skeleton или ListingSection */}
          <ListingSection
            listings={listings}
            categories={categories}
            loading={loading}
          />
        </main>
        <Footer />
      </div>
    </FilterProvider>
  );
};

export default HomePage;
