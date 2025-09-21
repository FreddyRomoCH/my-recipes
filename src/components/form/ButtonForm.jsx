import { forwardRef } from "react";

const ButtonForm = forwardRef(
  ({ error, btnText, lastChild, ...props }, ref) => {
    const lastChildCss = lastChild ? "col-span-2" : "";

    return (
      <div
        className={`flex flex-col gap-2 col-span-2 justify-self-center ${lastChildCss}`}
      >
        <button ref={ref} {...props}>
          {btnText}
        </button>
        {error && (
          <span className="text-sm font-thin text-red-500">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

export default ButtonForm;
