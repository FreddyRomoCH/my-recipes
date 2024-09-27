import { useRef } from "react";

export function AddInfoInput({
  title,
  type,
  inputID,
  valueInput,
  onChange,
  onClick,
  className,
  state,
  setState,
  name,
  error,
  onKeyDown,
}) {
  const handleCancel = (index) => {
    setState((prevState) => {
      const filteredState = prevState.filter((_, i) => i != index);
      return filteredState;
    });
  };

  return (
    <>
      <div className="col-span-full mb-3">
        <label htmlFor={inputID}>Add the {title} one by one</label>
      </div>
      <div className="col-span-full flex flex-row justify-between items-start gap-2">
        {/* Ingredients */}
        <div className="flex flex-col flex-1">
          {type === "textarea" ? (
            <textarea
              value={valueInput}
              onChange={onChange}
              onKeyDown={onKeyDown}
              style={{
                resize: "vertical",
                minHeight: "135px",
              }}
              className={className}
              type={type === "text" ? "text" : null}
              id={inputID}
              name={name}
            />
          ) : (
            <input
              value={valueInput}
              onChange={onChange}
              onKeyDown={onKeyDown}
              className={className}
              type="text"
              id={inputID}
              name={name}
            />
          )}

          {error && error[name] && error[name].message && (
            <span className="text-sm font-thin text-red-500">
              {error[name].message}
            </span>
          )}
        </div>

        <button
          type="button"
          className="rounded-md bg-sky-950 px-5 py-2 text-sky-100 text-md"
          onClick={onClick}
        >
          Add
        </button>

        <ul className="bg-sky-950 p-2 rounded-md flex-1">
          {state.length > 0 ? (
            state.map((el, index) => (
              <li
                className="text-sky-100 font-thin text-base flex flex-row justify-between items-center gap-2 mb-3"
                key={index}
              >
                <p className="flex-1">{el}</p>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleCancel(index)}
                >
                  <picture>
                    <img
                      src="/images/close.svg"
                      alt="Close"
                      className="w-6 h-6"
                    />
                  </picture>
                </button>
              </li>
            ))
          ) : (
            <li className="text-sky-100 font-thin text-base">
              No {title} added yet
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
