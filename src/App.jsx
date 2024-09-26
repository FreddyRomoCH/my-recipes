import { Header } from "./components/header/Header.jsx";
import { Home } from "./components/home/Home.jsx";
import { AllRecipes } from "./components/recipes/AllRecipes.jsx";
import { SingleCategory } from "./components/singlePage/SingleCategory.jsx";
import { SingleRecipe } from "./components/singlePage/SingleRecipe.jsx";
import { Footer } from "./components/footer/Footer.jsx";
import { Login } from "./components/login/Login.jsx";
import { Routes, Route } from "react-router-dom";
import { Profile } from "./components/profile/Profile.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { Register } from "./components/login/Register.jsx";
import { Toaster } from "sonner";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { AddRecipes } from "./components/recipes/AddRecipes.jsx";
import { Countries } from "./components/recipes/Countries.jsx";
import { usePageLoaded } from "./hooks/usePageLoaded.js";
import "./index.css";
import { Loading } from "./components/Loading.jsx";

function App() {
  const { isPageLoaded } = usePageLoaded();

  if (!isPageLoaded) {
    return (
      <main className="flex justify-center items-center h-dvh w-dvw">
        <Loading />
      </main>
    );
  }

  return (
    <>
      <Toaster position="top-center" richColors={true} />

      <div className="grid grid-rows-[auto_1fr_auto] items-center text-center min-h-screen overflow-x-hidden">
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<AllRecipes />} />
            <Route path="/recipes/:id/:name" element={<SingleRecipe />}></Route>
            <Route
              path="/category/:category"
              element={<SingleCategory />}
            ></Route>
            <Route path="/country" element={<Countries />}></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/sign-in" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/add-recipe"
              element={
                <ProtectedRoute>
                  <AddRecipes />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="*" element={<h1>Not Found</h1>}></Route>
          </Routes>
          <Footer />
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
