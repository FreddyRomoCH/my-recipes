export function SingleInstructions({ instructions }) {
  const listOfInstructions =
    instructions &&
    instructions.map((instruction, index) => {
      return (
        <li
          key={`intruction-${index}`}
          className="flex flex-col justify-start gap-4 items-center"
        >
          <span className="text-lg font-semibold flex-shrink">{`Step ${
            index + 1
          }:`}</span>
          <p className="flex-1">{instruction}</p>
        </li>
      );
    });

  return (
    <ul className="grow flex flex-col gap-4 box-border rounded font-thin">
      <li>
        <span className="font-semibold text-lg">Instructions:</span>
      </li>
      {listOfInstructions ? (
        listOfInstructions
      ) : (
        <li>No instructions added yet</li>
      )}
    </ul>
  );
}
