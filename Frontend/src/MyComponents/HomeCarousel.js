import React from "react";
import {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';


function HomeCarousel(){
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Image className="carouselImg" src ={require("./../MiscImages/stock-beach.jpg")}/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Hey guys</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Image className="carouselImg" src ={require("./../MiscImages/stock-beach.jpg")}/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Slide zwei.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Image className="carouselImg" src ={require("./../MiscImages/stock-beach.jpg")}/>
        <Carousel.Caption>
          <h3>third slide label</h3>
          <p>waddup.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;