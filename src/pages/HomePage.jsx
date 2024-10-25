import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FilterProvider } from "../context/FilterContext";
import CategorySection from "../components/CategorySection";
import ListingSection from "../components/ListingSection";
import axios from "../axios/axios";

import iphone13Image from "../assets/iphone13.png";

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

// import beautyImage from "../assets/beauty.jpg";

// Define categories with imported images
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
const sampleListings = [
  {
    title: "Iphone 13",
    description: "Новый, есть коробка",
    price: "30 000 ₽",
    image: iphone13Image,
  },
  {
    title: "Iphone 13",
    description: "Новый, есть коробка",
    price: "30 000 ₽",
    image: iphone13Image,
  },
  {
    title: "Iphone 13",
    description: "Новый, есть коробка",
    price: "30 000 ₽",
    image: iphone13Image,
  },
  {
    title: "Iphone 13",
    description: "Новый, есть коробка",
    price: "30 000 ₽",
    image: iphone13Image,
  },
  {
    title: "Iphone 13",
    description: "Новый, есть коробка",
    price: "30 000 ₽",
    image: iphone13Image,
  },
  {
    title: "Iphone 13",
    description: "Новый, есть коробка",
    price: "30 000 ₽",
    image: iphone13Image,
  },
  {
    title: "Iphone 13",
    description: "Новый, есть коробка",
    price: "30 000 ₽",
    image: iphone13Image,
  },
  {
    title: "Iphone 13",
    description: "Новый, есть коробка",
    price: "30 000 ₽",
    image: iphone13Image,
  },
  {
    title: "Iphone 13",
    description: "Новый, есть коробка",
    price: "30 000 ₽",
    image: iphone13Image,
  },
];

const HomePage = () => {
  useEffect(() => {
    axios.get("/products");
  }, []);

  return (
    <FilterProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="pt-20">
          <CategorySection categories={categories} />
          <ListingSection listings={sampleListings} categories={categories} />
        </main>
        <Footer />
      </div>
    </FilterProvider>
  );
};

export default HomePage;
