import React from "react";
import Header from "../components/Header";
import CategorySection from "../components/CategorySection";
import ListingSection from "../components/ListingSection";

const HomePage = () => {
  const sampleListings = [
    {
      title: "Listing 1",
      description: "Description 1",
      price: "100$",
      image: "/path/to/image1.png",
    },
    {
      title: "Listing 2",
      description: "Description 2",
      price: "200$",
      image: "/path/to/image2.png",
    },
    // Add more sample data here
  ];
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pt-20">
        <CategorySection />
        <ListingSection listings={sampleListings} />
        <ListingSection listings={sampleListings} />
        <ListingSection listings={sampleListings} />
        <ListingSection listings={sampleListings} />
        <ListingSection listings={sampleListings} />
      </main>
    </div>
  );
};

export default HomePage;
