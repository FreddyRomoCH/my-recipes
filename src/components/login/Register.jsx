import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../schema/users.js";
import { onSubmitForm } from "../../services/onSubmitForm.js";
import { toast } from "sonner";
import Input from "../form/Input.jsx";
import ButtonForm from "../form/ButtonForm.jsx";
import { useTranslation } from "react-i18next";

export function Register() {
  const { isAuthenticated, registerUser } = useAuth();
  const { t } = useTranslation();

  const inputCss =
    "flex-1 border-2  focus:ring-0 focus:outline-none rounded-md p-2 w-full md:w-52 bg-card";
  const inputError = "border-red-700 hover:border-red-700 focus:border-red-700";
  const inputSuccess = "border-button hover:border-button focus:border-button";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const result = await onSubmitForm(data);

    if (result.error) {
      toast.error(result.error);
      setError("root", {
        message: result.error,
      });

      return;
    }

    return registerUser(result.data);
  };

  return (
    <main className="relative flex flex-col justify-center items-center">
      {isAuthenticated ? (
        <Navigate to="/profile" />
      ) : (
        <h2 className="title-section">{t("Register an account")}</h2>
      )}

      {!isAuthenticated && (
        <>
          <form
            className="grid grid-cols-2 gap-2 mb-2"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <Input
              label="Email"
              error={errors.email}
              className={`${inputCss}
                ${errors.email ? `${inputError}` : `${inputSuccess}`}`}
              {...register("email")}
              type="email"
              autoComplete="email"
            />

            <Input
              label={t("Password")}
              error={errors.password}
              className={`${inputCss}
                ${errors.password ? `${inputError}` : `${inputSuccess}`}`}
              {...register("password")}
              type="password"
              autoComplete="password"
            />

            <Input
              label={t("First Name")}
              error={errors.first_name}
              className={`${inputCss}
                ${errors.first_name ? `${inputError}` : `${inputSuccess}`}`}
              {...register("first_name")}
              type="text"
              autoComplete="first_name"
            />

            <Input
              label={t("Last Name")}
              error={errors.last_name}
              className={`${inputCss}
                ${errors.last_name ? `${inputError}` : `${inputSuccess}`}`}
              {...register("last_name")}
              type="text"
              autoComplete="last_name"
            />

            <Input
              label={t("Username")}
              error={errors.username}
              className={`${inputCss}
                ${errors.username ? `${inputError}` : `${inputSuccess}`}`}
              {...register("username")}
              type="text"
              autoComplete="username"
            />

            <Input
              label={t("Country")}
              error={errors.country}
              className={`${inputCss}
                ${errors.country ? `${inputError}` : `${inputSuccess}`}`}
              {...register("country")}
              type="text"
              autoComplete="country"
            />

            <Input
              label={t("Profile Photo")}
              error={errors.profile_picture}
              className={`${inputCss}
                ${
                  errors.profile_picture ? `${inputError}` : `${inputSuccess}`
                }`}
              {...register("profile_picture")}
              type="file"
              name="profile_picture"
              accept="image/jpeg, image/jpg, image/png, image/webp"
            />

            <ButtonForm
              btnText={isSubmitting ? t("Loading...") : t("Register")}
              error={errors.root}
              disabled={isSubmitting}
              type="submit"
              className="rounded-md bg-button hover:bg-hover px-5 py-2 text-base text-lg font-inter cursor-pointer mt-5"
            />
          </form>

          <p className="text-base font-thin">
            <Link to="/sign-in">
              {t("Log in here if you already have an account")}
            </Link>
          </p>
        </>
      )}
    </main>
  );
}
