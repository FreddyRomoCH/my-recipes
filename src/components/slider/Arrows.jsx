import { forwardRef } from "react";

const LeftArrow = forwardRef((props, ref) => {
  const handleClickLeft = () => {
    if (ref.current) {
      if (ref.current.scrollLeft > 0) {
        ref.current.scrollBy({
          left: -200,
          behavior: "smooth",
        });
      } else {
        ref.current.scrollBy({
          left: ref.current.scrollWidth,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <button onClick={handleClickLeft} className="absolute left-0 z-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-sky-950 bg-sky-200/65 justify-center p-2 rounded-full absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
});

LeftArrow.displayName = "LeftArrow";

// export function RightArrow({ ref }) {
const RightArrow = forwardRef((props, ref) => {
  const handleClickRight = () => {
    const maxScrollLeft = ref.current.scrollWidth - ref.current.clientWidth;

    if (ref.current) {
      if (ref.current.scrollLeft < maxScrollLeft) {
        ref.current.scrollBy({
          left: 200,
          behavior: "smooth",
        });
      } else {
        ref.current.scrollBy({
          left: -maxScrollLeft,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <button onClick={handleClickRight} className="absolute right-0 z-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-sky-950 bg-sky-200/65 justify-center p-2 rounded-full absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
});

RightArrow.displayName = "RightArrow";

export { LeftArrow, RightArrow };
