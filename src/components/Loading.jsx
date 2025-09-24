import { lineSpinner } from "ldrs";
import { useTranslation } from "react-i18next";
lineSpinner.register();

export function Loading({ title }) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-button"></div>
      <p className="ml-4 text-lg text-button font-inter">
        {title ? title : t("Loading...")}
      </p>
    </div>
  );
}
