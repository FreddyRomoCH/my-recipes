import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export function ModalErrors() {
  const { mainMessage, setMainMessage } = useAuth();
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  useEffect(() => {
    if (mainMessage.error !== "" || mainMessage.message !== "") {
      setIsMessageVisible(true);
    }

    const messageTimer = setTimeout(() => {
      setIsMessageVisible(false);
    }, 1200);

    return () => clearTimeout(messageTimer);
  }, [mainMessage]);

  useEffect(() => {
    if (!isMessageVisible) {
      setMainMessage({
        message: "",
        error: "",
      });
    }
  }, [isMessageVisible]);

  return (
    <div
      className={`absolute top-1/4 left-0 right-0 w-fit place-self-center bg-sky-900 p-4 rounded-lg shadow-lg  
        ${
          isMessageVisible
            ? "opacity-100 translateY(0) animate-fade-out z-50"
            : "opacity-0 translateY(0)"
        }
        `}
    >
      <h2
        className={`text-xl font-bold ${
          mainMessage.error === "" ? "text-green-500" : "text-red-500"
        }`}
      >
        {mainMessage.error || mainMessage.message}
      </h2>
    </div>
  );
}
