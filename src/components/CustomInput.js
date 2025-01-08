import React from "react";
import { Button, Input } from "react-onsenui";
import LoginScreen from "./LoginScreen";

const CustomInput = ({ navigator, setIsLoggedIn ,placeholder,label,type,onCha}) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigator.pushPage({
      title: "Login",
      component: LoginScreen,
    }); 
  };

  return (
    <div>
      <div style={{ marginBottom: 5 }}>{label}</div>
      <Input
        type={type}
        modifier="transparent"
        placeholder={placeholder}
        style={{
          marginBottom: 20,
          width: "100%",
          border: "solid 1px gray",
          borderRadius: 5,
          padding: "5px 10px",
        }}
      />
    </div>
  );
};

export default CustomInput;
