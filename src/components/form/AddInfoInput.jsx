import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const handleCancel = (index) => {
    setState((prevState) => {
      const filteredState = prevState.filter((_, i) => i != index);
      return filteredState;
    });
  };

  return (
    <>
      <div className="col-span-full mb-3">
        <label
          className="flex-1 text-button font-inter text-md font-medium"
          htmlFor={inputID}
        >
          {t(`Add the ${title} one by one`)}
        </label>
      </div>
      <div className="flex flex-col justify-around items-center gap-3">
        {/* Ingredients */}
        <div className="flex gap-1 w-full items-start justify-center">
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

          <button
            type="button"
            className="rounded-md bg-button hover:bg-hover cursor-pointer px-5 py-2 text-base text-md"
            onClick={onClick}
          >
            Add
          </button>
        </div>

        <ul className="flex flex-col justify-center items-center gap-2 bg-button p-2 rounded-md w-full">
          {state.length > 0 ? (
            state.map((el, index) => (
              <li
                className="text-base font-thin text-md font-inter flex flex-row justify-around items-center gap-2 mb-3 w-full"
                key={index}
              >
                <p className="flex-1">{el}</p>
                <button
                  type="button"
                  className="text-red-700"
                  onClick={() => handleCancel(index)}
                >
                  <picture>
                    <img
                      src="/images/close.svg"
                      alt="Close"
                      className="w-6 h-6 cursor-pointer"
                    />
                  </picture>
                </button>
              </li>
            ))
          ) : (
            <li className="text-base font-thin text-md font-inter">
              {t(`No ${title} added yet`)}
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
