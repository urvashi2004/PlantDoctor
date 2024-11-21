import React from 'react';
import './Home.css';
import LogoImage from './LogoImage.png'; // Ensure you have an image for the home page in the same directory

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-image">
        <img src={LogoImage} alt="Plant Doctor" className="home-image-img" />
      </div>
      <div className="home-text">
        <h1>Plant Doctor</h1>
        <p>
          Welcome to Plant Doctor, your go-to solution for plant identification and disease management.
          Our advanced technology helps you easily identify plant species and diagnose potential diseases
          by simply uploading a photo. Whether you're a gardener, farmer, or plant enthusiast, our tool
          provides accurate information and practical advice to keep your plants healthy and thriving.
        </p>
        <p>
          With Plant Doctor, you can ensure that your plants receive the best care and timely intervention,
          leading to a flourishing garden or farm. Start by uploading an image of your plant and let us
          help you with its identification and any potential remedies.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
