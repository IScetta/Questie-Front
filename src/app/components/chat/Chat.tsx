"use client";

import { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import OpenAI from "openai";
import { GoPaperAirplane } from "react-icons/go";
import { Spinner } from "flowbite-react";
import { IoChatbox } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";

export default function Chat() {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMessages, setResponseMessages] = useState<any[]>([]);
  const [thread, setThread] = useState<any>(null);
  const [chatIsLoading, setChatIsLoading] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    const createThread = async () => {
      try {
        const newThread = await openai.beta.threads.create();
        setThread(newThread);
        setChatIsLoading(false);
      } catch (error: any) {
        if (error.status === 429) {
          console.error("Rate limit exceeded. Retrying in 1 minute...");
          setTimeout(createThread, 60000);
        } else {
          console.error("Failed to create thread:", error);
        }
      }
    };

    if (isChatOpen && thread === null) {
      setChatIsLoading(true);
      createThread();
    }
  }, [isChatOpen, openai.beta.threads, thread]);

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const userMessage = {
      role: "user",
      content: [{ type: "text", text: { value: prompt } }],
    };
    setResponseMessages([...responseMessages, userMessage]);

    const auxiliarPrompt = prompt;
    setPrompt("");

    try {
      await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: auxiliarPrompt,
      });

      let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID!,
      });

      if (run.status === "completed") {
        const messages = await openai.beta.threads.messages.list(run.thread_id);
        setResponseMessages(messages.data.reverse());
      } else {
        console.log(run.status);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
      await scrollToBottom();
    }
  };

  const scrollToBottom = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const lastMessage = document.getElementById("last-message");
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (chatIsLoading) {
    return (
      <div className="fixed bottom-6 right-6 z-50 cursor-pointer">
        <div className="rounded-full w-20 h-20 bg-white border border-purpleMain flex justify-center items-center">
          <Spinner aria-label="Loading" size="xl" color="purple" />
        </div>
      </div>
    );
  }

  const deleteChat = () => {
    setIsChatOpen(false);
    setResponseMessages([]);
    setThread(null);
  };

  return (
    <div className="fixed bottom-6 z-40 w-full">
      {isChatOpen ? (
        <div className="w-1/4 p-5 space-y-4 bg-white rounded-lg border border-purpleMain bottom-0 right-6 absolute">
          <div className="flex justify-between items-center">
            <p className="text-2xl text-purpleMain font-bold ">Questie Chat</p>
            <FaTimes
              className="text-purpleMain cursor-pointer"
              onClick={() => deleteChat()}
            />
          </div>
          {loading ? (
            <div className="border border-gray-700 w-full p-4 rounded-lg space-y-4 overflow-y-scroll max-h-60">
              {responseMessages.map((message, index) => (
                <div
                  key={index}
                  className={
                    `w-full flex` +
                    (message.role === "assistant"
                      ? " justify-start"
                      : " justify-end")
                  }
                >
                  <div
                    className={
                      `w-1/2 border border-gray-700 p-2 rounded-lg space-y-2` +
                      (message.role === "user"
                        ? " bg-purpleMainLighter"
                        : " bg-white")
                    }
                  >
                    <p className="text-sm text-gray-600">
                      {message.content[0].text.value}
                    </p>
                  </div>
                </div>
              ))}
              <div className="w-full flex justify-start">
                <div className="w-1/2 border border-gray-700 p-2 rounded-lg space-y-2">
                  <p className="text-sm text-gray-600">
                    <Spinner aria-label="Loading" size="xl" color="purple" />
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {responseMessages.length > 0 ? (
                <div className="border border-gray-700 w-full p-4 rounded-lg space-y-4 overflow-y-scroll max-h-60">
                  {responseMessages.map((message, index) => (
                    <div
                      key={index}
                      className={
                        `w-full flex` +
                        (message.role === "assistant"
                          ? " justify-start"
                          : " justify-end")
                      }
                      id={
                        index === responseMessages.length - 1
                          ? "last-message"
                          : ""
                      }
                    >
                      <div
                        className={
                          `w-1/2 border border-gray-700 p-2 rounded-lg space-y-2` +
                          (message.role === "user"
                            ? " bg-purpleMainLighter"
                            : " bg-white")
                        }
                      >
                        <p className="text-sm text-gray-600">
                          {message.content[0].text.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center w-full">
                  <p>Envía un mensaje para comenzar a conversar.</p>
                </div>
              )}
            </>
          )}

          <div className="w-full flex justify-between space-x-2 border items-center border-gray-700 rounded-lg pr-2">
            <textarea
              value={prompt}
              onChange={handlePromptChange}
              rows={2}
              placeholder="Escribe tu mensaje aquí..."
              className="w-full rounded-lg resize-none border-none overflow-y-hidden"
            />
            {loading ? (
              <button
                className="px-2 rounded-full w-10 h-10 text-center"
                type="button"
                disabled
              >
                <GoPaperAirplane className="h-6 mx-auto w-full ml-[0.2rem] opacity-50" />
              </button>
            ) : (
              <button
                className="px-2 rounded-full hover:bg-gray-200 w-10 h-10 text-center"
                type="submit"
                onClick={handleSubmit}
              >
                <GoPaperAirplane className="h-6 mx-auto w-full ml-[0.2rem]" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          className="rounded-full w-20 h-20 bg-purpleMainLight bottom-0 right-6 absolute cursor-pointer flex justify-center items-center drop-shadow-[1px_1px_1px_rgba(0,0,0,1)]"
          onClick={() => setIsChatOpen(true)}
        >
          <IoChatbox className="text-white w-9 h-9" />
        </div>
      )}
    </div>
  );
}
