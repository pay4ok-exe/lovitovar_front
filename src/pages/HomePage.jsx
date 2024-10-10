import React from "react";
import Header from "../components/Header";
import { FilterProvider } from "../context/FilterContext";
import CategorySection from "../components/CategorySection";
import ListingSection from "../components/ListingSection";

import clothesImage from "../assets/clothes.png";
import petsImage from "../assets/pets.png";
import servicesImage from "../assets/services.png";
import electronicsImage from "../assets/electronics.png";
import kidsGoodsImage from "../assets/kids-goods.png";
import homeGoodsImage from "../assets/home-goods.png";
import iphone13Image from "../assets/iphone13.png";
import { FilterContext } from "../context/FilterContext";
// import beautyImage from "../assets/beauty.jpg";

// Define categories with imported images
const categories = [
  { name: "Одежда, обувь, аксессуары", image: clothesImage, checked: false },
  { name: "Животные", image: petsImage, checked: false },
  { name: "Услуги", image: servicesImage, checked: false },
  { name: "Электроника", image: electronicsImage, checked: false },
  { name: "Товары для детей", image: kidsGoodsImage, checked: false },
  { name: "Товары для дома", image: homeGoodsImage, checked: false },
  //   { name: "Красота и здоровье", image: beautyImage },
];

const HomePage = () => {
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
    // Add more sample data here
  ];
  return (
    <FilterProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="pt-20">
          <CategorySection categories={categories} />
          <ListingSection listings={sampleListings} categories={categories} />
        </main>
      </div>
    </FilterProvider>
  );
};

export default HomePage;
