import React from "react";
import Footer from "../Components/Footer";
import ImageSlider from "../Components/ImageSlider";
import PopularBooks from "../Components/PopularBooks";
import RecentAddedBooks from "../Components/RecentAddedBooks";
import Stats from "../Components/Stats";
import WelcomeBox from "../Components/WelcomeBox";

function Home() {
  return (
    <div id="home">
      <ImageSlider />
      <WelcomeBox />
      <Stats />
      <RecentAddedBooks />
      <PopularBooks />
      <Footer />
    </div>
  );
}

export default Home;
