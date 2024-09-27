import { MenuLeft } from "./MenuLeft";
import { MenuRight } from "./MenuRight";
import { RecipesLogo } from "./RecipesLogo";

export function HeaderDesktop({ profileAvatar }) {
  return (
    <header className="flex flex-col justify-center content-center items-center relative w-screen p-4 text-sky-950 text-sm bg-gradient-to-b from-sky-100 to-sky-200">
      <div className="container flex flex-row flex-wrap justify-around items-center content-center max-w-6xl">
        <nav className="flex-1">
          <ul className="relative flex flex-row justify-center gap-5 items-center [&>li]:p-3 [&>li]:rounded hover:[&>li]:bg-sky-950 hover:[&>li]:text-sky-100">
            <MenuLeft />
          </ul>
        </nav>

        <RecipesLogo linkTo="/" widthLogo="w-24" />

        <nav className="flex-1">
          <ul className="relative flex flex-row justify-center gap-5 items-center [&>li]:p-3 [&>li]:rounded hover:[&>li]:bg-sky-950 hover:[&>li]:text-sky-100">
            <MenuRight profileAvatar={profileAvatar} />
          </ul>
        </nav>
      </div>
    </header>
  );
}
