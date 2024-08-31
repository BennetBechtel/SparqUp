import React from "react";

const Account = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-full grow flex-col justify-center">
      <div className="flex justify-center">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex w-full max-w-xl flex-col gap-5"
        >
          <h1 className="mb-5 text-center text-2xl font-bold">
            UPDATE YOUR ACCOUNT
          </h1>

          <section className="grid grid-cols-2 gap-4">
            <span className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">First Name</h2>
              <input className="w-full rounded-lg border-none px-3 py-2 focus:outline-none" />
            </span>

            <span className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">Last Name</h2>
              <input className="w-full rounded-lg border-none px-3 py-2 focus:outline-none" />
            </span>
          </section>

          <section className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Birthday</h2>
            <span className="flex flex-row justify-start gap-3">
              <input
                placeholder="DD"
                className="h-10 w-20 rounded-lg text-center text-lg"
              />
              <input
                placeholder="MM"
                className="h-10 w-20 rounded-lg text-center text-lg"
              />
              <input
                placeholder="YYYY"
                className="h-10 w-20 rounded-lg text-center text-lg"
              />
            </span>
          </section>

          <section className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Gender</h2>
            <span className="flex flex-row justify-start gap-3">
              <button
                type="button"
                className="rounded-lg bg-white px-4 py-2 text-lg font-semibold"
              >
                Male
              </button>
              <button
                type="button"
                className="rounded-lg bg-white px-3 py-2 text-lg font-semibold"
              >
                Female
              </button>
              <button
                type="button"
                className="rounded-lg bg-white px-3 py-2 text-lg font-semibold"
              >
                Diverse
              </button>
            </span>
          </section>

          <section className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Interested In</h2>
            <span className="flex flex-row justify-start gap-3">
              <button
                type="button"
                className="rounded-lg bg-white px-4 py-2 text-lg font-semibold"
              >
                Male
              </button>
              <button
                type="button"
                className="rounded-lg bg-white px-3 py-2 text-lg font-semibold"
              >
                Female
              </button>
              <button
                type="button"
                className="rounded-lg bg-white px-3 py-2 text-lg font-semibold"
              >
                Everyone
              </button>
            </span>
          </section>

          <section className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">About me</h2>
            <textarea
              placeholder="I like running and going to the gym"
              className="min-h-24 w-full rounded-lg border-none px-3 py-2 focus:outline-none"
            />
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
