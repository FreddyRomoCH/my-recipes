import { lineSpinner } from "ldrs";
lineSpinner.register();

export function Loading() {
  return (
    <l-line-spinner
      size="60"
      stroke="8"
      speed="1.6"
      color="#0c4a6e"
    ></l-line-spinner>
  );
}
