import React, { useEffect, useState } from "react";
import * as apiClient from "../apiClient.js";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useMutation, useQuery } from "react-query";
import { parseISO, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Account = () => {
  const navigate = useNavigate();

  const [placeholder, setPlaceholder] = useState("DD/MM/YYYY");
  const user_data = fetch("http://localhost:8080/api/user/me", {
    credentials: "include",
  });
  user_data
    .then((res) => res.json())
    .then((data) => {
      if (!data.birthDate.length < 1) {
        setPlaceholder(data.birthDate);
      }
    });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: async () => apiClient.fetchCurrentUser(),
  });

  const [selectedDate, setSelectedDate] = useState(null);

  const { date: userData, isLoading } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser,
  );

  useEffect(() => {
    if (userData?.birthDate) {
      const birthDate = parseISO(userData.birthDate);
      setSelectedDate(birthDate);
      setValue("birthDate", format(birthDate, "yyyy-MM-dd"));
    }
  }, [userData, setValue]);

  const isAtLeast18 = (value) => {
    const today = new Date();
    const birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age >= 18;
  };

  const mutation = useMutation(apiClient.updateUser, {
    onSuccess: () => {
      toast.success("Registration successful", {
        position: "top-right",
      });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("Something went wrong", {
        position: "top-right",
      });
    },
  });

  const onSubmit = handleSubmit((formData) => {
    mutation.mutate(formData);
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full grow flex-col justify-center">
      <div className="flex grow justify-center">
        <form
          onSubmit={(e) => onSubmit(e)}
          className="flex w-full max-w-xl flex-col gap-5"
        >
          <h1 className="mb-5 text-center text-2xl font-bold">
            UPDATE YOUR ACCOUNT
          </h1>

          <section className="grid grid-cols-2 gap-4">
            <span className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">First Name</h2>
              <input
                {...register("firstName", {
                  required: "Enter your first name",
                })}
                className="w-full rounded-lg border-none px-3 py-2 focus:outline-none"
              />
              {errors.firstName && (
                <p className="input-error-message">
                  {errors.firstName.message}
                </p>
              )}
            </span>

            <span className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">Last Name</h2>
              <input
                {...register("lastName", {
                  required: "Enter your last name",
                })}
                className="w-full rounded-lg border-none px-3 py-2 focus:outline-none"
              />
              {errors.lastName && (
                <p className="input-error-message">{errors.lastName.message}</p>
              )}
            </span>
          </section>

          <section className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Birthday</h2>

            <DatePicker
              selected={selectedDate} // Bind to the local state
              onChange={(date) => {
                setSelectedDate(date); // Set local state
                const formattedDate = format(date, "yyyy-MM-dd"); // Store as yyyy-MM-dd in form
                setValue("birthDate", formattedDate); // Set value in useForm
                trigger("birthDate"); // Manually trigger validation for birthDate
              }}
              dateFormat="dd/MM/yyyy" // Display format as DD/MM/YYYY
              placeholderText={placeholder} // Placeholder for DatePicker
              maxDate={new Date()} // Prevent future dates
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100} // Allows scrolling through 100 years
              className={`w-full rounded-lg bg-white px-3 py-2 ${placeholder !== "DD/MM/YYYY" && "placeholder:text-black"}`}
            />

            <input
              type="hidden"
              {...register("birthDate", {
                required: "Enter your date of birth",
                validate: {
                  isAdult: (value) =>
                    isAtLeast18(value) || "You must be at least 18 years old",
                },
              })}
            />
            {errors.birthDate && (
              <p className="input-error-message">{errors.birthDate.message}</p>
            )}
          </section>

          <section className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Gender</h2>
            <Controller
              name="genderIdentity"
              control={control}
              rules={{ required: "Enter your gender" }}
              render={({ field }) => (
                <div className="grid w-fit grid-cols-3 gap-2">
                  <span>
                    <input
                      type="radio"
                      id="genderIdentityMale"
                      value="male"
                      checked={field.value === "male"}
                      onChange={() => field.onChange("male")}
                      className="peer hidden"
                    />
                    <label
                      htmlFor="genderIdentityMale"
                      className="block cursor-pointer select-none rounded-lg bg-white px-4 py-2 text-center text-lg font-semibold peer-checked:bg-gray-300 peer-checked:outline-black"
                    >
                      Male
                    </label>
                  </span>

                  <span>
                    <input
                      type="radio"
                      id="genderIdentityFemale"
                      value="female"
                      checked={field.value === "female"}
                      onChange={() => field.onChange("female")}
                      className="peer hidden"
                    />
                    <label
                      htmlFor="genderIdentityFemale"
                      className="block cursor-pointer select-none rounded-lg bg-white px-4 py-2 text-center text-lg font-semibold peer-checked:bg-gray-300 peer-checked:outline-black"
                    >
                      Female
                    </label>
                  </span>

                  <span>
                    <input
                      type="radio"
                      id="genderIdentityDiverse"
                      value="everyone"
                      checked={field.value === "diverse"}
                      onChange={() => field.onChange("diverse")}
                      className="peer hidden"
                    />
                    <label
                      htmlFor="genderIdentityDiverse"
                      className="block cursor-pointer select-none rounded-lg bg-white px-4 py-2 text-center text-lg font-semibold peer-checked:bg-gray-300 peer-checked:outline-black"
                    >
                      Diverse
                    </label>
                  </span>
                </div>
              )}
            />
            {errors.genderIdentity && (
              <p className="input-error-message">
                {errors.genderInterest.message}
              </p>
            )}
          </section>

          <section className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Interested In</h2>
            <Controller
              name="genderInterest"
              control={control}
              rules={{ required: "Enter your who you're interested in" }}
              render={({ field }) => (
                <div className="grid w-fit grid-cols-3 gap-2">
                  <span>
                    <input
                      type="radio"
                      id="genderInterestMale"
                      value="male"
                      checked={field.value === "male"}
                      onChange={() => field.onChange("male")}
                      className="peer hidden"
                    />
                    <label
                      htmlFor="genderInterestMale"
                      className="block cursor-pointer select-none rounded-lg bg-white px-4 py-2 text-center text-lg font-semibold peer-checked:bg-gray-300 peer-checked:outline-black"
                    >
                      Male
                    </label>
                  </span>

                  <span>
                    <input
                      type="radio"
                      id="genderInterestFemale"
                      value="female"
                      checked={field.value === "female"}
                      onChange={() => field.onChange("female")}
                      className="peer hidden"
                    />
                    <label
                      htmlFor="genderInterestFemale"
                      className="block cursor-pointer select-none rounded-lg bg-white px-4 py-2 text-center text-lg font-semibold peer-checked:bg-gray-300 peer-checked:outline-black"
                    >
                      Female
                    </label>
                  </span>

                  <span>
                    <input
                      type="radio"
                      id="genderInterestEveryone"
                      value="everyone"
                      checked={field.value === "everyone"}
                      onChange={() => field.onChange("everyone")}
                      className="peer hidden"
                    />
                    <label
                      htmlFor="genderInterestEveryone"
                      className="block cursor-pointer select-none rounded-lg bg-white px-4 py-2 text-center text-lg font-semibold peer-checked:bg-gray-300 peer-checked:outline-black"
                    >
                      Everyone
                    </label>
                  </span>
                </div>
              )}
            />
            {errors.genderInterest && (
              <p className="input-error-message">
                {errors.genderInterest.message}
              </p>
            )}
          </section>

          <section className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">About me</h2>
            <textarea
              placeholder="I like running and going to the gym"
              {...register("about", {
                required: "Tell us something about you",
              })}
              className="min-h-24 w-full rounded-lg border-none px-3 py-2 focus:outline-none"
            />
            {errors.about && (
              <p className="input-error-message">{errors.about.message}</p>
            )}
          </section>

          <section className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Profile Picture URL</h2>
            <input
              {...register("profilePictureUrl", {
                required: "Enter an url for a profile pircure",
              })}
              className="w-full rounded-lg border-none px-3 py-2 focus:outline-none"
            />
            {errors.profilePictureUrl && (
              <p className="input-error-message">
                {errors.profilePictureUrl.message}
              </p>
            )}
          </section>

          <button type="submit" className="primary-button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;
