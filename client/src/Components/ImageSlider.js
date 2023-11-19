import React from "react";
import "./ImageSlider.css";
import { Carousel } from "react-bootstrap";

function ImageSlider() {
  return (
    <div className="slider">
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://wallpapers.com/images/hd/brown-aesthetic-library-9fnm849mq5he1vq9.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src="https://e0.pxfuel.com/wallpapers/575/224/desktop-wallpaper-library-%E2%80%A2-trump-library-aesthetic-laptop.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://wallpapers.com/images/hd/dark-library-aesthetic-book-desktop-ynuwrezn6ntptm8p.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ImageSlider;
