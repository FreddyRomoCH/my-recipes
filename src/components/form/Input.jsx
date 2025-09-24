import { forwardRef, useId } from "react";

const Input = forwardRef(({ label, error, lastChild, ...props }, ref) => {
  const inputId = useId();

  const lastChildCss = lastChild ? "col-span-2" : "";

  return (
    <div
      className={`flex flex-col gap-2 items-center justify-center ${lastChildCss}`}
    >
      {lastChild && (
        <h3 className="mt-3">Enter your password to save changes</h3>
      )}
      <label
        className="flex-1 text-button font-inter text-md font-medium"
        htmlFor={inputId}
      >
        {label}
      </label>

      {props.type === "textarea" ? (
        <textarea
          id={inputId}
          ref={ref}
          style={{
            resize: "vertical",
            minHeight: "135px",
          }}
          {...props}
        />
      ) : (
        <input id={inputId} ref={ref} {...props} />
      )}

      {error && (
        <span className="text-sm font-inter font-thin text-red-700">
          {error.message}
        </span>
      )}
    </div>
  );
});

export default Input;
