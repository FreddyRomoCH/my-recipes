export function SingleIngredients({ ingredients }) {
  const listOfIngredients =
    ingredients &&
    ingredients.map((ingredient, index) => {
      return <li key={`ingredient-${index}`}>- {ingredient}</li>;
    });

  return (
    <ul className="shrink flex flex-col gap-4 bg-sky-950 text-sky-100 p-4 box-border rounded font-thin">
      <li>
        <span className="font-semibold text-lg">Ingredients:</span>
      </li>
      {listOfIngredients ? (
        listOfIngredients
      ) : (
        <li>No ingredients added yet</li>
      )}
    </ul>
  );
}
