import React from "react";
import {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';


function HomeCarousel(){
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
  };

  return (
    <Container style={{maxWidth: 1025}}>
      <Carousel activeIndex={index} onSelect={handleSelect} className="rounded border" >
        <Carousel.Item>
          <Image className="carouselImg" src ={require("./../MiscImages/stock-beach.jpg")} rounded/>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Updates maybe</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <Image className="carouselImg" src ={require("./../MiscImages/stock-beach.jpg")} rounded/>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Maybe link to new music</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <Image className="carouselImg" src ={require("./../MiscImages/stock-beach.jpg")} rounded/>
          <Carousel.Caption>
            <h3>third slide label</h3>
            <p>something else</p>
          </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
  </Container>
  );
}

export default HomeCarousel;