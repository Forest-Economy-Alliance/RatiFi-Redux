import axios from "axios";

export const BASE_URL = 'https://4kmtkz4pcv.us-east-1.awsapprunner.com';

export const generateOTP = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/send-otp`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error generating OTP";
  }
};




export const verifyOTP = async (contact, code) => {
    try {
      const response = await axios.post(`${BASE_URL}/verify-otp`, {
       mobile:contact,
        otp:code,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Error verifying OTP";
    }
  };


export const registerAdministrator = async (payload) => {
  const response = await axios.post(`${BASE_URL}/admins`, payload);
  return response.data;
};


export const registerOrganization = async (payload) => {
  const response = await axios.post(`${BASE_URL}/organizations`, payload);
  return response.data;
};