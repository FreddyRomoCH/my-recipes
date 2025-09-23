import { useTranslation } from "react-i18next";

export function SingleInstructions({ instructions }) {
  const { t } = useTranslation();
  const listOfInstructions =
    instructions &&
    instructions.map((instruction, index) => {
      return (
        <li
          key={`intruction-${index}`}
          className="flex flex-col justify-start gap-4 items-center font-inter"
        >
          <span className="text-lg font-normal flex-shrink">{`${t("Step")} ${
            index + 1
          }:`}</span>
          <p className="flex-1">{instruction}</p>
        </li>
      );
    });

  return (
    <ul className="grow flex flex-col gap-4 box-border rounded font-thin">
      <li>
        <span className="font-medium text-2xl font-lora">
          {t("instructions")}:
        </span>
      </li>
      {listOfInstructions ? (
        listOfInstructions
      ) : (
        <li>{t("No instructions added yet")}</li>
      )}
    </ul>
  );
}
