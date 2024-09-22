import { useAuth } from "../../hooks/useAuth.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { loginSchema } from "../../schema/users.js";
import Input from "../form/Input.jsx";
import { ButtonForm } from "../form/ButtonForm.jsx";

export function Login() {
  const { isAuthenticated, loginUser } = useAuth();
  const location = useLocation();
  const locationState = location.state;
  const [email, setEmail] = useState(locationState?.email || "");
  const [password, setPassword] = useState(locationState?.password || "");

  const inputCss =
    "flex-1 border-2  focus:ring-0 focus:outline-none rounded-md p-2 w-52";
  const inputError = "border-red-500 hover:border-red-500 focus:border-red-500";
  const inputSuccess =
    "border-sky-900 hover:border-sky-500 focus:border-sky-500";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      loginUser({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      setError("root", {
        message: "Invalid email or password",
      });
      toast.error("Invalid email or password");
    }
  };

  const handleChangeValueEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeValuePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <main className="relative flex flex-col justify-center items-center">
      {/* <Toast /> */}
      {isAuthenticated ? (
        <Navigate to="/profile" />
      ) : (
        <h2 className="text-sky-950 font-bold text-3xl mb-10">Log In</h2>
      )}

      {!isAuthenticated && (
        <>
          <form
            className="flex flex-col gap-2 mb-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Email"
              error={errors.email}
              className={`${inputCss}
                ${errors.email ? `${inputError}` : `${inputSuccess}`}`}
              {...register("email")}
              type="email"
              autoComplete="email"
              value={email}
              onChange={handleChangeValueEmail}
            />

            <Input
              label="Password"
              error={errors.password}
              className={`${inputCss}
                ${errors.password ? `${inputError}` : `${inputSuccess}`}`}
              {...register("password")}
              type="password"
              autoComplete="password"
              value={password}
              onChange={handleChangeValuePassword}
            />

            <ButtonForm
              btnText={isSubmitting ? "Loading..." : "Log In"}
              error={errors.root}
              disabled={isSubmitting}
              type="submit"
              className="rounded-md bg-sky-900 px-5 py-2 text-sky-200 text-md"
            />
          </form>

          <p className="text-base font-thin">
            <Link to="/register">
              Register here if you do not have an account yet
            </Link>
          </p>
        </>
      )}
    </main>
  );
}
