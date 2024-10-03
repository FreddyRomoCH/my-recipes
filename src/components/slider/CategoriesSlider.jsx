// import { useRef } from "react";
import { CardSlider } from "./CardSlider.jsx";
// import { LeftArrow, RightArrow } from "./Arrows.jsx";
import { useCategories } from "../../hooks/useCategories.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export function CategoriesSlider() {
  // const scrollRef = useRef();
  const { getCategories } = useCategories();
  const categories = getCategories();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipe: false,
    swipeToSlide: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          swipe: false,
          swipeToSlide: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipe: true,
          swipeToSlide: true,
        },
      },
    ],
  };

  return (
    <div className="relative w-screen lg:w-full mb-3">
      {categories.length > 0 && (
        <Slider {...settings}>
          {categories &&
            categories.map(({ id, name, image }) => (
              <CardSlider key={id} title={name} image={image} />
            ))}
        </Slider>
      )}
    </div>
  );

  // return (
  //   <div className="relative flex items-center justify-center w-screen lg:w-full mb-3">
  //     {categories.length > 0 && (
  //       <>
  //         <LeftArrow ref={scrollRef} />

  //         <div
  //           ref={scrollRef}
  //           className="flex overflow-x-hidden animate-carousel"
  //         >
  //           <ul className="relative flex flex-row gap-3 [&>li]:min-h-80 [&>li]:w-64">
  //             {categories &&
  //               categories.map(({ id, name, image }) => (
  //                 <CardSlider
  //                   key={id}
  //                   title={name}
  //                   image={image}
  //                 />
  //               ))}
  //           </ul>
  //         </div>

  //         <RightArrow ref={scrollRef} />
  //       </>
  //     )}
  //   </div>
  // );
}
