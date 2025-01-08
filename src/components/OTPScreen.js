import React, { useEffect, useState } from "react";
import { Button, Input, AlertDialog } from "react-onsenui";
import Cookies from "js-cookie";
import HomeScreen from "./HomeScreen";
import RegistrationScreen from "./RegistrationScreen";
import { verifyOTP } from "../apiService";
import { FormNextLink } from "grommet-icons";
import { Navbar } from "..";
import { useTranslation } from 'react-i18next';
import "../i18n";
import i18n from "../i18n";

const OTPScreen = ({ navigator, route }) => {
  const { t } = useTranslation()
  const { data } = route;
  const contact = data?.contact;
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogShown, setDialogShown] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [language, setLanguage] = useState("en");
  const [key, setKey] = useState(0); // Use key to trigger re-render

   useEffect(() => {
    const savedLanguage = Cookies.get('language') || 'en';
    setLanguage(savedLanguage);
    i18n.changeLanguage(savedLanguage).then(() => {
      setKey((prevKey) => prevKey + 1); 
    });
  }, []);

  useEffect(() => {
  
    i18n.changeLanguage(language).then(() => {
      setKey((prevKey) => prevKey + 1);
      Cookies.set('language', language, { expires: 7 }); // Save selected language in cookies
    });
  }, [language]);

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 4) {
      setDialogMessage(t("Please enter a valid 4-digit OTP."));
      setDialogShown(true);
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOTP(contact, otp);
      const token=response.data.token;
        Cookies.set('RATIFI_REDUX_TOKEN',token)
        
    
      if (response.message==="AVAILABLE") {
        if (response.organization) {
          Cookies.set("org_id", response.organization.id, { expires: 7, secure: true, sameSite: "strict" });
          Cookies.set("org_name", response.organization.name, { expires: 7, secure: true, sameSite: "strict" });
        }
        navigator.pushPage({ title: "HomeScreen", component: HomeScreen }, { animation: "slide" });
      } else {
        navigator.pushPage(
          { title: "Registration Screen", component: RegistrationScreen, data: { contact },isRenderToolbar:true },
          { animation: "slide" }
        );
      }
    } catch (error) {
      setDialogMessage(t(`Failed to verify OTP: ${error}`));
      setDialogShown(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }} key={key}>
      <Navbar language={language} setLanguage={setLanguage} />
      <h2>{t('Enter OTP')}</h2>
      <p>{t('An OTP has been sent to')}
        <b> +91{contact || t('your registered mobile number')} </b>
         </p>
      <Input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder={t('Enter 4 digit OTP')}
        style={{
          marginBottom: 20,
          width: "100%",
          border: "solid 1px gray",
          borderRadius: 5,
          padding: "5px 10px",
        }}
      />
      <p>
        {t("Didn't receive?")} <b>&nbsp;{t('Resend OTP')}</b>
      </p>
      <Button
        onClick={handleVerifyOTP}
        disabled={loading}
        style={{ marginTop: "20px", background: '#5C7232' }}
      >
        {loading ? t('Verifying...') : <div>{t('Continue')} <FormNextLink color="white" /></div>}
      </Button>

      <AlertDialog
        isOpen={dialogShown}
        onCancel={() => setDialogShown(false)}
        cancelable
      >
        <div className="alert-dialog-title">{t('Error')}</div>
        <div className="alert-dialog-content">{dialogMessage}</div>
        <div className="alert-dialog-footer">
          <Button onClick={() => setDialogShown(false)} className="alert-dialog-button">
            {t('OK')}
          </Button>
        </div>
      </AlertDialog>
    </div>
  );
};

export default OTPScreen;
