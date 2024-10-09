import React, { useState } from 'react';
import './SlideShow.css';

import img1 from '../../public/img/img1.avif';
import img2 from '../../public/img/img2.avif';
import img3 from '../../public/img/img3.avif';


const images = [
  { 
    src: img1,
  },
  { 
    src: img2,  
  },
  { 
    src: img3,   
  }
];

const SlideShow = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const plusSlides = (n) => {
    let newIndex = slideIndex + n;
    if (newIndex >= images.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = images.length - 1;
    }
    setSlideIndex(newIndex);
  };

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`mySlides fade ${slideIndex === index ? "active" : ""}`}
          style={{ display: slideIndex === index ? "block" : "none" }}
        >
          <img src={image.src} alt={`Slide ${index + 1}`} />
          
        </div>
      ))}
      <a className="prev" onClick={() => plusSlides(-1)}>
        &#10094;
      </a>
      <a className="next" onClick={() => plusSlides(1)}>
        &#10095;
      </a>
    </div>
  );
};

export default SlideShow;
