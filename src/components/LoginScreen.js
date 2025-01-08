import React, { useEffect, useState } from "react";
import { Button, Input } from "react-onsenui";
import OTPScreen from "./OTPScreen.js";
import { generateOTP } from "../apiService.js"; // Import the API service for OTP generation
import { Navbar } from "../index.js";
import { FormNextLink } from "grommet-icons";
import { useTranslation } from "react-i18next";
import "../i18n.js";
import i18n from "../i18n.js";
import Dialog from "./AlertDialog.js"; // Import custom Dialog component

const LoginScreen = (props) => {
  const { navigator, setIsLoggedIn } = props;
  const { t } = useTranslation();
  const [username, setUsername] = useState("1231231231");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const [key, setKey] = useState(0); 
  const [dialogVisible, setDialogVisible] = useState(false); 
  const [dialogMessage, setDialogMessage] = useState(""); 

  useEffect(() => {
    i18n.changeLanguage(language).then(() => {
      setKey((prevKey) => prevKey + 1); // Trigger re-render
    });
  }, [language]);

 
  const handleLogin = async () => {
    if (!username || username.length !== 10 || !/^\d{10}$/.test(username)) {
      setDialogMessage(t("Please enter a valid 10-digit mobile number."));
      setDialogVisible(true); // Show dialog instead of alert
      return;
    }
  
    setLoading(true);
    try {
      const response = await generateOTP({
       mobile: username,
       name:'Dummy-name'
      });
      console.warn(response)
      navigator.pushPage({
        title: "OTPScreen",
        component: OTPScreen,
        data: { contact: username },
      });
    } catch (error) {
      console.warn("error", error);
      navigator.pushPage({
        title: "OTPScreen",
        component: OTPScreen,
        data: { contact: username },
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div
      style={{
        textAlign: "center",
        background: "white",
        paddingBottom: 10,
        padding: 10,
        height:'100vh'
      }}
      key={key} // Use key to force re-render on language change
    >
      <Navbar language={language} setLanguage={setLanguage} />
      <h2>RatiFi Redux</h2>
      <b>
        <p>Simple Client for FRC Community</p>
      </b>
    
      {/* <label>{t("Enter Mocr")}</label> */}
      <div
  style={{
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
    border: "solid 1px gray",
    borderRadius: 5,
    padding: "5px 10px",
  }}
>
  <span style={{ marginRight: 5, fontWeight: "bold" }}>+91</span>
  <Input
    type="tel"
    value={username}
    onKeyPress={(e) => {
      const key = e.key;
      if (!/^\d$/.test(key) || username.length >= 10) {
        e.preventDefault(); // Prevent further input if not a digit or if 10 digits are already entered
      }
    }}
    onChange={(e) => {
      const input = e.target.value;
      if (/^\d*$/.test(input) && input.length <= 10) {
        setUsername(input); // Update state only if input is numeric and within 10 digits
      }
    }}
    placeholder={t("Please Enter Mobile Number")}
    style={{
      width: "100%",
      border: "none",
      outline: "none",
    }}
  />
</div>





      <p>
        {t(
          "We will send you an OTP on this mobile number, if not registered you can start the fresh registration"
        )}
      </p>
      <Button
        onClick={handleLogin}
        style={{ marginTop: "20px", background: "#5C7232" }}
        disabled={loading}
      >
        {loading ? (
          t("Sending...")
        ) : (
          <div>
            {t("SEND OTP")} <FormNextLink color="white" />
          </div>
        )}
      </Button>

      {/* Dialog component */}
      <Dialog
        visible={dialogVisible}
        setVisible={setDialogVisible}
        title={t("Error")}
        desc={dialogMessage}
      />
    </div>
  );
};

export default LoginScreen;
