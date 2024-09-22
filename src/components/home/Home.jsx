import { CategoriesSlider } from "../slider/CategoriesSlider.jsx";
import { LastestRecipes } from "../recipes/lastestRecipes.jsx";

export function Home() {
  return (
    <main className="flex flex-col w-full max-w-6xl mx-auto my-3">
      <CategoriesSlider />
      <LastestRecipes />
    </main>
  );
}
