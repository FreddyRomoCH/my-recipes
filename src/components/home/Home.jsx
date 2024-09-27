import { CategoriesSlider } from "../slider/CategoriesSlider.jsx";
import { LastestRecipes } from "../recipes/lastestRecipes.jsx";
import { useGetRecipes } from "../../hooks/useGetRecipes.js";
import { Loading } from "../Loading.jsx";

export function Home() {
  const { loading } = useGetRecipes();

  if (loading) {
    return (
      <h2 className="text-sky-950 font-medium text-3xl my-6 text-center">
        <Loading />
      </h2>
    );
  }

  return (
    <main className="flex flex-col w-full max-w-6xl mx-auto my-3">
      <CategoriesSlider />
      <LastestRecipes />
    </main>
  );
}
