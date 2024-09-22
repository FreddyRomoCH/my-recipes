export function ButtonForm({ error, btnText, lastChild, ...props }) {
  const lastChildCss = lastChild ? "col-span-2" : "";

  return (
    <div
      className={`flex flex-col gap-2 col-span-2 justify-self-center ${lastChildCss}`}
    >
      <button {...props}>{btnText}</button>
      {error && (
        <span className="text-sm font-thin text-red-500">{error.message}</span>
      )}
    </div>
  );
}
