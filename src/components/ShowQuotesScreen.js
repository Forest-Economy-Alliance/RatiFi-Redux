import React, { useState } from "react";
import { ThreeCircles } from "react-loader-spinner";

const FullScreenChat = () => {
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Spinner Loader */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#5C7232"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}

      {/* Iframe for chat */}
      <iframe
        src="https://tawk.to/chat/677d62a1af5bfec1dbe7f99e/1ih0sij9h"
        title="Chat Support"
        style={{
          width: "100%",
          height: "100%",
          marginTop:-30,
          border: "none",
        }}
        onLoad={() => setIsLoading(false)} // Hide spinner when iframe loads
      ></iframe>
    </div>
  );
};

export default FullScreenChat;
