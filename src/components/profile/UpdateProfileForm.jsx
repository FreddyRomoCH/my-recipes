import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateSchema } from "../../schema/users";
import { onSubmitForm } from "../../services/onSubmitForm";
import { toast } from "sonner";
import Input from "../form/Input";
import ButtonForm from "../form/ButtonForm";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

export function UpdateProfileForm({
  setAppStatus,
  APP_STATUS,
  setPreviewImage,
  appStatus,
}) {
  const { updateUser, userDetails, setUserDetails } = useAuth();
  const [dataToUpdate, setDataToUpdate] = useState(userDetails);

  const handleChangeUserFirstName = (e) => {
    setDataToUpdate((prevState) => {
      return {
        ...prevState,
        first_name: e.target.value,
      };
    });
  };

  const handleChangeUserLastName = (e) => {
    setDataToUpdate((prevState) => {
      return {
        ...prevState,
        last_name: e.target.value,
      };
    });
  };

  const handleChangeUserUserName = (e) => {
    setDataToUpdate((prevState) => {
      return {
        ...prevState,
        username: e.target.value,
      };
    });
  };

  const handleChangeUserCountry = (e) => {
    setDataToUpdate((prevState) => {
      return {
        ...prevState,
        country: e.target.value,
      };
    });
  };

  const handleChangeUserProfilePicture = (e) => {
    const file = e.target.files[0];

    if (file) {
      setDataToUpdate((prevState) => {
        return {
          ...prevState,
          profile_picture: file.name,
        };
      });

      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const inputCss =
    "flex-1 border-2 focus:ring-0 focus:outline-none rounded-md p-2 w-52";
  const inputError = "border-red-500 hover:border-red-500 focus:border-red-500";
  const inputSuccess =
    "border-sky-900 hover:border-sky-500 focus:border-sky-500";

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateSchema),
  });

  const onSubmit = async (data) => {
    setAppStatus(APP_STATUS.PENDING);

    if (dataToUpdate === userDetails) {
      toast.message("Update the form to save changes");
      setAppStatus(APP_STATUS.EDITING);
      return;
    }

    if (data.profile_picture.length === 0 || !data.profile_picture) {
      data.profile_picture = userDetails.profile_picture;
    }

    const updateData = { ...data, userId: userDetails.id };

    const result = await onSubmitForm(updateData); // Add image to form data in case it exists

    if (result.error) {
      setAppStatus(APP_STATUS.ERROR);

      toast.error(result.error);
      setError("root", {
        message: result.error,
      });
      return;
    }

    const resultUpdate = await updateUser(result.data); // we send the form data to the backend

    if (resultUpdate.error) {
      setAppStatus(APP_STATUS.ERROR);
      toast.error(resultUpdate.error);
      return;
    }

    // TODO: Update Email and Password in the future by email verification

    setAppStatus(APP_STATUS.SUCCESS);
    toast.success(resultUpdate.success);
    setUserDetails(resultUpdate.data);
    return;
  };

  return (
    <main className="relative flex flex-col justify-center items-center">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2 [&>div]:col-span-2 sm:[&>div:not(:first-child)]:col-span-1"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <ButtonForm
          btnText={
            appStatus === APP_STATUS.EDITING ? "Save Changes" : "Loading..."
          }
          error={errors.root}
          disabled={appStatus === APP_STATUS.PENDING}
          type="submit"
          className="rounded-md bg-sky-950 px-5 py-2 text-sky-200 text-md"
        />

        <Input
          label="Update Photo"
          error={errors.profile_picture}
          className={`${inputCss}
            ${errors.profile_picture ? `${inputError}` : `${inputSuccess}`}`}
          {...register("profile_picture")}
          onChange={handleChangeUserProfilePicture}
          type="file"
          name="profile_picture"
          accept="image/jpeg, image/jpg, image/png, image/webp"
        />

        <Input
          label="First Name"
          error={errors.first_name}
          className={`${inputCss}
            ${errors.first_name ? `${inputError}` : `${inputSuccess}`}`}
          {...register("first_name")}
          value={dataToUpdate.first_name}
          onChange={handleChangeUserFirstName}
          type="first_name"
          autoComplete="first_name"
        />

        <Input
          label="Last Name"
          error={errors.last_name}
          className={`${inputCss}
            ${errors.last_name ? `${inputError}` : `${inputSuccess}`}`}
          {...register("last_name")}
          value={dataToUpdate.last_name}
          onChange={handleChangeUserLastName}
          type="last_name"
          autoComplete="last_name"
        />

        <Input
          label="Username"
          error={errors.username}
          className={`${inputCss}
            ${errors.username ? `${inputError}` : `${inputSuccess}`}`}
          {...register("username")}
          value={dataToUpdate.username}
          onChange={handleChangeUserUserName}
          type="username"
          autoComplete="username"
        />

        <Input
          label="Country"
          error={errors.country}
          className={`${inputCss}
            ${errors.country ? `${inputError}` : `${inputSuccess}`}`}
          {...register("country")}
          value={dataToUpdate.country}
          onChange={handleChangeUserCountry}
          type="country"
          autoComplete="country"
        />

        <Input
          label="Password"
          error={errors.password}
          className={`${inputCss}
            ${errors.password ? `${inputError}` : `${inputSuccess}`}`}
          {...register("password")}
          lastChild="true"
          type="password"
          autoComplete="password"
        />
      </form>
    </main>
  );
}
