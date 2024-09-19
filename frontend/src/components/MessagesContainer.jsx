import React, { useRef, useEffect } from "react";

const MessagesContainer = ({ messages, currentChat, user }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="scrollbar-hide h-[calc(100vh - 322px)] flex min-h-max grow flex-col overflow-y-scroll"
      style={{
        height: "calc(100vh - 332px)",
      }}
    >
      <section>
        {currentChat._id &&
          messages.messages.length < 1 &&
          "No messages yet..."}
      </section>
      <section className="flex grow flex-col justify-end">
        {messages?.messages.map((message, index) => (
          <div
            key={index + message._id}
            className={`mx-2 my-3 text-xl font-bold ${
              message.from === user._id
                ? "text-right text-orange-900"
                : "text-left text-pink-900"
            }`}
          >
            {message.text}
          </div>
        ))}
      </section>
    </div>
  );
};

export default MessagesContainer;
