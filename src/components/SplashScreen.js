import React from "react";

const SplashScreen = () => {
  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: 'white',
        position: 'relative'
      }}
    >
      <img
        src="/odisha-logo.png"
        height={100}
        alt="logo"
        style={{
          objectFit: "contain",
          filter: "invert(39%) sepia(41%) saturate(592%) hue-rotate(56deg) brightness(89%) contrast(93%)"
        }}
      />
      {/* <div
        style={{
          position: "absolute",
          bottom: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontWeight: 'bold',color:'#5C7232' }}>Bharti Institute of Public Policy</span>
        <span style={{ marginLeft: 10 }}>
        
        </span>
      </div> */}
    </div>
  );
};

export default SplashScreen;
