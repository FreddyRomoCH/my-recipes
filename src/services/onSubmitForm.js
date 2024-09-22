 export const onSubmitForm = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (
          key === "profile_picture" &&
          data[key].length > 0
        ) {
          formData.append(key, data[key][0]); // We add the file to the form data
        } else {
          formData.append(key, data[key]);
        }
      }
    }

    try {
        return { data: formData}
    } catch (error) {
        return { error: "Invalid details" }
    }
  };