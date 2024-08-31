import React from "react";

const ChatDisplay = () => {
  let messages = [
    {
      _id: "asudh2iuuasd342udihui2",
      userId: "asdiuh23asduiads",
      photoURL: null,
      createdAt: new Date().toISOString(),
      text: "Message 1",
    },
    {
      _id: "asudh2iuuas4234dnhudihui2",
      userId: "askjas81jashduhj",
      photoURL: null,
      createdAt: new Date().toISOString(),
      text: "Message 2",
    },
    {
      _id: "asudh2iu23423uasdnhudihui2",
      userId: "asdiu23423hasduiads",
      photoURL: null,
      createdAt: new Date().toISOString(),
      text: "Message 3",
    },
    {
      _id: "asudh2iu234234uasdnhudihui2",
      userId: "askjas81jashduhj",
      photoURL: null,
      createdAt: new Date().toISOString(),
      text: "Message 4",
    },
  ];

  messages = messages.reverse();

  const currentUserId = "askjas81jashduhj";

  return (
    <div className="flex min-h-max grow flex-col justify-end">
      <section>
        {messages.map((message, index) => {
          return (
            <div
              key={index + message._id}
              className={`mx-2 my-3 text-xl font-bold ${message.userId === currentUserId ? "text-right text-orange-900" : "text-left text-pink-900"}`}
            >
              {message.text}
            </div>
          );
        })}
      </section>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-1"
      >
        <input
          type="text"
          name="message"
          placeholder="Message"
          className="mx-auto w-full rounded-lg border border-none px-3 py-[6px] text-lg"
        />
        <label htmlFor="message" className="hidden">
          Message Input
        </label>
        <button className="primary-button w-full">Submit</button>
      </form>
    </div>
  );
};

export default ChatDisplay;
