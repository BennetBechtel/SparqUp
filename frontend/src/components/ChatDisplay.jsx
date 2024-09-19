import React, { useState } from "react";
import * as apiClient from "../apiClient.js";
import { useQuery, useQueryClient, useMutation } from "react-query";
import MessagesContainer from "./MessagesContainer.jsx";
import ImageWithFallback from "./ImageWithFallback.jsx";

const ChatDisplay = ({ user, currentChat }) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");

  const { data: messages, isLoading } = useQuery(
    ["messages", currentChat._id],
    () => apiClient.fetchMessages(currentChat._id),
    {
      enabled: !!currentChat._id,
    },
  );

  const sendMessageMutation = useMutation(apiClient.sendMessage, {
    onSuccess: (newMessage) => {
      queryClient.setQueryData(["messages", currentChat._id], (oldData) => ({
        ...oldData,
        messages: [...oldData.messages, newMessage],
      }));
      queryClient.invalidateQueries(["messages", currentChat._id]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const formData = {
      from: user._id.toString(),
      to: currentChat._id.toString(),
      text: message.trim(),
      createdAt: new Date(),
    };

    sendMessageMutation.mutate(formData);
    setMessage("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid w-full grid-rows-[auto_auto_auto]">
      <section className="flex h-9 flex-row items-center gap-3">
        {currentChat._id && (
          <>
            <ImageWithFallback
              src={currentChat.profilePictureUrl}
              fallbackSrc={
                "https://ih1.redbubble.net/image.1046392292.3346/tst,medium,507x507-pad,600x600,f8f8f8.jpg"
              }
              alt={"Profile Picture"}
              className="size-8 rounded-full bg-white object-cover"
            />
            <p className="text-2xl font-bold text-white">
              {currentChat.firstName}
            </p>
          </>
        )}
      </section>
      <MessagesContainer
        messages={messages}
        currentChat={currentChat}
        user={user}
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <input
          type="text"
          name="message"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!currentChat._id}
          className="mx-auto w-full rounded-lg border border-none px-3 py-[6px] text-lg"
        />
        <label htmlFor="message" className="hidden">
          Message Input
        </label>
        <button disabled={!currentChat._id} className="primary-button w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChatDisplay;
