import React from "react";
import Header from "../components/Header";
import CategorySection from "../components/CategorySection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="py-8">
        <CategorySection />
      </main>
    </div>
  );
};

export default HomePage;
