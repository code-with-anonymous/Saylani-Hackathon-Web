import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';

const CardImageSlider = () => {
  const images = [
    {
      src: 'http://lenos.mbkip3ms9u-e92498n216kr.p.temp-site.link/wp-content/uploads/2022/03/marek-prygiel-7RLztM4KdcE-unsplash.png',
    },
    {
      src: 'http://lenos.mbkip3ms9u-e92498n216kr.p.temp-site.link/wp-content/uploads/2022/03/brigitte-tohm-j8C66j15nAk-unsplash.png',
    },
    {
      src: 'http://lenos.mbkip3ms9u-e92498n216kr.p.temp-site.link/wp-content/uploads/2022/03/ana-azevedo-XcUJUO2AqVA-unsplash.png',
    },
    {
      src: 'http://lenos.mbkip3ms9u-e92498n216kr.p.temp-site.link/wp-content/uploads/2022/03/timothy-rubby-LGZ1LcBPFs0-unsplash.png',
    },
    {
      src: 'http://lenos.mbkip3ms9u-e92498n216kr.p.temp-site.link/wp-content/uploads/2022/03/jaelynn-castillo-xfNeB1stZ_0-unsplash.png',
    },
    {
      src: 'http://lenos.mbkip3ms9u-e92498n216kr.p.temp-site.link/wp-content/uploads/2022/03/allef-vinicius-DJNoNHpQK_I-unsplash.png',
    },
    {
      src: 'http://lenos.mbkip3ms9u-e92498n216kr.p.temp-site.link/wp-content/uploads/2022/03/1-1-300x300.jpg',
    },
    {
      src: 'http://lenos.mbkip3ms9u-e92498n216kr.p.temp-site.link/wp-content/uploads/2022/03/81lH0FdWVWL.jpg',
    },
  ];

  const [items, setItems] = useState([]);

  const updateItems = () => {
    const isSmallScreen = window.innerWidth <= 576; 
    const imagesPerSlide = isSmallScreen ? 3 : 4; 

    const newItems = [];
    for (let i = 0; i < images.length; i += imagesPerSlide) {
      newItems.push(images.slice(i, i + imagesPerSlide));
    }
    setItems(newItems);
  };

  useEffect(() => {
    updateItems();
    window.addEventListener('resize', updateItems);
    return () => {
      window.removeEventListener('resize', updateItems);
    };
  }, []);

  return (
    <div className="container mt-5 mb-5 imgSlider">
      <h1 className="mb-3">@lenos.store</h1>
      <p className='mb-5'>Follow us on Instagram</p>
      <Carousel controls={false} indicators={false}>
        {items.map((item, index) => (
          <Carousel.Item key={index}>
            <div className="row justify-content-center">
              {item.map((image, imgIndex) => (
                <div className="col-4 col-md-3 col-sm-4" key={imgIndex}>  
                  <img
                    className="img-fluid mb-4"
                    src={image.src}
                    alt={`Slide ${index * 4 + imgIndex + 1}`}
                  />
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CardImageSlider;