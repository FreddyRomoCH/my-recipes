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
      <label className="flex-1" htmlFor={inputId}>
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
        <span className="text-sm font-thin text-red-500">{error.message}</span>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
