import { lineSpinner } from "ldrs";
lineSpinner.register();

export function Loading({ title }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-950"></div>
      <p className="ml-4 text-lg text-blue-950">{title}</p>
    </div>
  );
}
