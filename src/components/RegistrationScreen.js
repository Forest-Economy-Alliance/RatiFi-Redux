import React, { useState, useEffect } from "react";
import { Button, ProgressBar } from "react-onsenui";
import Select from "react-select";
import axios from "axios";
import Cookies from 'js-cookie';
import HomeScreen from "./HomeScreen";
import { BASE_URL } from "../apiService";

// Custom Input Component for User Name
const CustomInput = ({ label, placeholder, value, onChange }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ display: "block", marginBottom: 4, fontSize: 14, color: "black" }}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "8px 10px",
          border: "1px solid gray",
          borderRadius: 5,
        }}
        required
      />
    </div>
  );
};

const CustomSelect = ({ label, options, value, onChange, showMessage }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ display: "block", marginBottom: 4, fontSize: 14, color: "black" }}>
        {label}
      </label>
      {options.length > 0 ? (
        <Select options={options} value={value} onChange={onChange} />
      ) : (
        showMessage && (
          <div style={{ color: "red", fontSize: 12 }}>
            No Data found, Please contact the Administrator
          </div>
        )
      )}
    </div>
  );
};

const RegistrationScreen = ({ navigator }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationDetails, setRegistrationDetails] = useState({
    userName: "",
    district: null,
    subdivision: null,
    block: null,
    panchayat: null,
    village: null,
  });
  const [locationData, setLocationData] = useState({
    districts: [],
    districtToSubdivisions: {},
    subdivisionToBlocks: {},
    blockToPanchayats: {},
    panchayatToVillages: {},
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get("/jsons/location.json");
        const data = response.data;
        setLocationData({
          districts: data.Districts,
          districtToSubdivisions: data,
          subdivisionToBlocks: data,
          blockToPanchayats: data,
          panchayatToVillages: data,
        });
      } catch (error) {
        console.error("Failed to load location data", error);
      }
    };
    fetchLocationData();
  }, []);

  const handleChange = (field, value) => {
    setRegistrationDetails((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "district" && {
        subdivision: null,
        block: null,
        panchayat: null,
        village: null,
      }),
      ...(field === "subdivision" && { block: null, panchayat: null, village: null }),
      ...(field === "block" && { panchayat: null, village: null }),
      ...(field === "panchayat" && { village: null }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!registrationDetails.userName.trim()) {
      setError("Name is required.");
      return;
    }
    if (
      !registrationDetails.district ||
      !registrationDetails.subdivision ||
      !registrationDetails.block ||
      !registrationDetails.panchayat ||
      !registrationDetails.village
    ) {
      setError("All location fields are required.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      const token=Cookies.get('RATIFI_REDUX_TOKEN');

      const payload = { ...registrationDetails };
      await axios.patch(`${BASE_URL}/update-user`, payload,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      alert("Registration successful");
      navigator.pushPage({ title: "Home Screen", component: HomeScreen });
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getOptions = (level) => {
    switch (level) {
      case "district":
        return locationData.districts.map((dist) => ({ value: dist, label: dist }));
      case "subdivision":
        return registrationDetails.district
          ? locationData.districtToSubdivisions[`DistrictToSubdivison-${registrationDetails.district}`]?.map((sub) => ({
              value: sub,
              label: sub,
            }))
          : [];
      case "block":
        return registrationDetails.subdivision
          ? locationData.subdivisionToBlocks[`SubdivisonToBlock-${registrationDetails.subdivision}`]?.map((block) => ({
              value: block,
              label: block,
            }))
          : [];
      case "panchayat":
        return registrationDetails.block
          ? locationData.blockToPanchayats[`BlockToPanchayat-${registrationDetails.block}`]?.map((pan) => ({
              value: pan,
              label: pan,
            }))
          : [];
      case "village":
        return registrationDetails.panchayat
          ? locationData.panchayatToVillages[`PanchayatToVillage-${registrationDetails.panchayat}`]?.map((vil) => ({
              value: vil,
              label: vil,
            }))
          : [];
      default:
        return [];
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}

      <div style={{ padding: 10, paddingBottom: 60, overflowY: "auto", maxHeight: "calc(100vh - 60px)" }}>
        {/* User Name Field */}
        <CustomInput
          label="Name"
          placeholder="Enter your name"
          value={registrationDetails.userName}
          onChange={(e) => handleChange("userName", e.target.value)}
        />

        <CustomSelect
          label="District"
          options={getOptions("district")}
          value={getOptions("district").find((opt) => opt.value === registrationDetails.district)}
          onChange={(option) => handleChange("district", option.value)}
        />

        {registrationDetails.district && (
          <CustomSelect
            label="Subdivision"
            options={getOptions("subdivision")}
            value={getOptions("subdivision").find((opt) => opt.value === registrationDetails.subdivision)}
            onChange={(option) => handleChange("subdivision", option.value)}
            showMessage={true}
          />
        )}

        {registrationDetails.subdivision && (
          <CustomSelect
            label="Block"
            options={getOptions("block")}
            value={getOptions("block").find((opt) => opt.value === registrationDetails.block)}
            onChange={(option) => handleChange("block", option.value)}
            showMessage={true}
          />
        )}

        {registrationDetails.block && (
          <CustomSelect
            label="Panchayat"
            options={getOptions("panchayat")}
            value={getOptions("panchayat").find((opt) => opt.value === registrationDetails.panchayat)}
            onChange={(option) => handleChange("panchayat", option.value)}
            showMessage={true}
          />
        )}

        {registrationDetails.panchayat && (
          <CustomSelect
            label="Village"
            options={getOptions("village")}
            value={getOptions("village").find((opt) => opt.value === registrationDetails.village)}
            onChange={(option) => handleChange("village", option.value)}
            showMessage={true}
          />
        )}

        {isSubmitting && (
          <div style={{ marginBottom: 10 }}>
            <ProgressBar indeterminate />
          </div>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%", backgroundColor: "#fff", padding: 10 }}>
        <Button
          onClick={handleSubmit}
          style={{
            width: "100%",
            backgroundColor: "#5C7232",
            color: "white",
          }}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default RegistrationScreen;
