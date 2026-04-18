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

  const captionStyle = {
    backdropFilter: 'blur(4px)'
  }

  return (
    <Container style={{maxWidth: 1025, letterSpacing: "8px"}}>
      <Carousel activeIndex={index} onSelect={handleSelect} className="rounded border" >
        <Carousel.Item>
          <Image className="carouselImg" src ={require("./../MiscImages/carousel-typing.jpg")} rounded/>
          <Carousel.Caption style={captionStyle}>
            <h3 style={{textDecorationColor: "blue"}}>Add New Music!</h3>
            <p style={{fontSize: 20}}>Users can add new Artists and Albums!</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <Image className="carouselImg" src ={require("./../MiscImages/carousel-people.jpg")} rounded/>
          <Carousel.Caption style={captionStyle}>
            <h3>Add New Friends!</h3>
            <p style={{fontSize: 20}}>Users can interact with friends via posts!</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <Image className="carouselImg" src ={require("./../MiscImages/stock-beach.jpg")} rounded/>
          <Carousel.Caption style={captionStyle}>
            <h3>Track Your Albums!</h3>
            <p style={{fontSize: 20}}>Users can track and rate albums they have listened to!</p>
          </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
  </Container>
  );
}

export default HomeCarousel;