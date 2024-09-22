import { useRef } from "react";
import { CardSlider } from "./CardSlider.jsx";
import { LeftArrow, RightArrow } from "./Arrows.jsx";
import { useCategories } from "../../hooks/useCategories.js";

export function CategoriesSlider() {
  const scrollRef = useRef();
  const { getCategories } = useCategories();
  const categories = getCategories();

  return (
    <div className="relative flex items-center justify-center w-screen lg:w-full mb-3">
      {categories.length > 0 && (
        <>
          <LeftArrow ref={scrollRef} />

          <div
            ref={scrollRef}
            className="flex overflow-x-hidden animate-carousel"
          >
            <ul className="relative flex flex-row gap-3 [&>li]:min-h-80 [&>li]:w-64">
              {categories &&
                categories.map(({ id, name, image }) => (
                  <CardSlider
                    key={id}
                    title={name}
                    image={image}
                    // href={href}
                  />
                ))}
            </ul>
          </div>

          <RightArrow ref={scrollRef} />
        </>
      )}
    </div>
  );
}
