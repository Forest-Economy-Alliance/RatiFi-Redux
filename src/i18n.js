import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Enter Mobile Number": "Enter Mobile Number",
      "Please Enter Mobile Number": "Please Enter Mobile Number",
      "We will send you an OTP on this mobile number, if not registered you can start the fresh registration": 
        "We will send you an OTP on this mobile number, if not registered you can start the fresh registration",
      "SEND OTP": "SEND OTP",
      "Sending...": "Sending...",
      "Enter OTP": "Enter OTP",
      "An OTP has been sent to": "An OTP has been sent to",
      "Enter 6 digit OTP": "Enter 6 digit OTP",
      "Didn't receive?": "Didn't receive?",
      "Resend OTP": "Resend OTP",
      "Verifying...": "Verifying...",
      "Continue": "Continue",
      "Error": "Error",
      "OK": "OK",
      "Failed to verify OTP": "Failed to verify OTP",
      "Please enter a valid 6-digit OTP.": "Please enter a valid 6-digit OTP.",
      "video_tutorials": "Video Tutorials",
      "upload_stepwise_images": "Upload Stepwise Images",
      "role_and_location_selection": "Role and Location Selection"
    }
  },
  hi: {
    translation: {
      "Enter Mobile Number": "मोबाइल नंबर दर्ज करें",
      "Please Enter Mobile Number": "कृपया मोबाइल नंबर दर्ज करें",
      "We will send you an OTP on this mobile number, if not registered you can start the fresh registration": 
        "हम आपको इस मोबाइल नंबर पर एक ओटीपी भेजेंगे, यदि पंजीकृत नहीं है तो आप नया पंजीकरण शुरू कर सकते हैं",
      "SEND OTP": "ओटीपी भेजें",
      "Sending...": "भेजा जा रहा है...",
      "Enter OTP": "ओटीपी दर्ज करें",
      "An OTP has been sent to": "एक ओटीपी भेजा गया है",
      "Enter 6 digit OTP": "6 अंकों का ओटीपी दर्ज करें",
      "Didn't receive?": "नहीं मिला?",
      "Resend OTP": "ओटीपी पुनः भेजें",
      "Verifying...": "सत्यापन हो रहा है...",
      "Continue": "जारी रखें",
      "Error": "त्रुट्टि",
      "OK": "ठीक",
      "Failed to verify OTP": "ओटीपी सत्यापित करने में विफल",
      "Please enter a valid 6-digit OTP.": "कृपया एक मान्य 6 अंकों का ओटीपी दर्ज करें।",
      "video_tutorials": "वीडियो ट्यूटोरियल्स",
      "upload_stepwise_images": "चरणवार छवियों को अपलोड करें",
      "role_and_location_selection": "भूमिका और स्थान चयन प्रक्रिया"
    }
  },
  or: {
    translation: {
      "Enter Mobile Number": "ମୋବାଇଲ୍ ନମ୍ବର ଦାଖଲ କରନ୍ତୁ",
      "Please Enter Mobile Number": "ଦଯାକରି ମୋବାଇଲ୍ ନମ୍ବର ଦାଖଲ କରନ୍ତୁ",
      "We will send you an OTP on this mobile number, if not registered you can start the fresh registration": 
        "ଆମେ ଏହି ମୋବାଇଲ୍ ନମ୍ବରରେ ଆପଣଂକୁ ଏକ ଓଟିପି ପଟାଇବୁ, ଜଦି ପଞ୍ଜୀକୃତ ନୁହେଁ, ତେବେ ନୂତନ ପଞ୍ଜିକରଣ ଆରମ୍ଭ କରିପାରିବେ",
      "SEND OTP": "ଓଟିପି ପଟାନ୍ତୁ",
      "Sending...": "ପଟାଜାଉଛି...",
      "Enter OTP": "ଓଟିପି ପ୍ରବେଶ କରାନ୍ତୁ",
      "An OTP has been sent to": "ଏକ ଓଟିପି ପଟାଜାଇଚି",
      "Enter 6 digit OTP": "6 ଅଙ୍କରର ଓଟିପି ପ୍ରବେଶ କରାନ୍ତୁ",
      "Didn't receive?": "ପ୍ରାପ୍ତ ହୋଇନାହି?",
      "Resend OTP": "ଓଟିପି ପୁନାା ପଟାନ୍ତୁ",
      "Verifying...": "ସତ୍ୟାପନ ହୋଉଛି...",
      "Continue": "ଚାଲାନୁ",
      "Error": "ଭୁଲି",
      "OK": "ପ୍ରାପ୍ତ",
      "Failed to verify OTP": "ଓଟିପି ସତ୍ୟାପନ ବିଫଲ",
      "Please enter a valid 6-digit OTP.": "ଦଯାକରି ଏକ ବୈଧ 6 ଅଙ୍କରର ଓଟିପି ପ୍ରବେଶ କରାନ୍ତୁ।",
      "video_tutorials": "ଭିଡିଓ ଟୁଟୋରିଆଲ୍ସ",
      "upload_stepwise_images": "ଚରଣବାର୍ଟୀକ ଫୋଟୋଗୁଚି ପଡାଁତୁ",
      "role_and_location_selection": "ଭୂମିକା ଏବଂ ସ୍ଥାନ ଚୟନ ପ୍ରକ୍ରିୟା"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;