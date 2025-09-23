import { CardSlider } from "./CardSlider.jsx";
import { useCategories } from "../../hooks/useCategories.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export function CategoriesSlider() {
  const { getCategories } = useCategories();
  const categories = getCategories();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    swipe: false,
    swipeToSlide: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          swipe: false,
          swipeToSlide: false,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipe: true,
          swipeToSlide: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="relative w-screen lg:w-full">
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
}
