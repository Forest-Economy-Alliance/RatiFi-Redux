import React, { useState } from "react";
import { AlertDialog, Button, Input, Segment } from "react-onsenui";
import axios from "axios";
import Nav from "./Nav";
import { AddCircle, DocumentPdf, DownloadOption, FormNextLink } from "grommet-icons";
import { BASE_URL } from "../apiService";
import Cookies from "js-cookie";
import Stage1Content from "./stageContent/Stage1Content";
import Stage2Content from "./stageContent/Stage2Content";

const UploadClaimStatus = ({ navigator }) => {
  const [stage, setStage] = useState(1);

  const [claim, setClaim] = useState({
    courtDocuments: [
      {
        title: "SDM_SUMMON_RESULT_1",
        storageUrl: "https://example.com/document1.pdf",
        extraImages: [
          { url: "https://example.com/image1.jpg" },
          { url: "https://example.com/image2.jpg" },
        ],
      },
      {
        title: "SDM_SUMMON_RESULT_2",
        storageUrl: "https://example.com/document2.pdf",
        extraImages: [
          { url: "https://example.com/image3.jpg" },
          { url: "https://example.com/image4.jpg" },
        ],
      },
    ],
    extraImageFormCountForSync: {
      SDM_SUMMON_RESULT_1: 1,
      SDM_SUMMON_RESULT_2: 0,
    },
  });

  
  const [uploadType, setUploadType] = useState(null);
const [docName, setDocName] = useState(null);
const [cameraModalVis, setCameraModalVis] = useState(false);

const handleDocPreview = (url) => {
  // Function to handle document preview, e.g., open modal with document
  console.log("Previewing document at URL:", url);
};



const renderStageContent = (stage) => {
  switch (stage) {
    case 1:
      return (
        <Stage1Content
          claim={claim}
          setUploadType={setUploadType}
          setDocName={setDocName}
          setCameraModalVis={setCameraModalVis}
          handleDocPreview={handleDocPreview}
        />
      );
    case 2:
      return (
        <Stage2Content
          claim={claim}
          setUploadType={setUploadType}
          setDocName={setDocName}
          setCameraModalVis={setCameraModalVis}
          handleDocPreview={handleDocPreview}
        />
      );
    // Add more cases as needed
    default:
      return null;
  }
};


  return (
    <div style={{ padding: "0px" }}>
       <div className="mt-2 mb-2">
          Claim Number - <b>A2374295</b> (System)
        &nbsp;  <DocumentPdf color="#5C7232"/>
        </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          overflowX: "auto",
          whiteSpace: "nowrap",
          padding: "10px 0",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f0f0f0",
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((item, id) => (
          <div
            key={`segment-${item}`}
            onClick={() => setStage(item)}
            style={{
              flex: 1,
              padding: "10px 8px",
              textAlign: "center",
              border: item === stage ? "none" : "2px solid #5C7232",
              borderRadius: "5px",
              margin: "0 5px",
              backgroundColor: item === stage ? "#5C7232" : "#fff",
              color: item === stage ? "#fff" : "#5C7232",
              fontWeight: "bold", 
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s ease, border 0.3s ease",
              outline: "none", 
              boxShadow: "none", 
            }}
          >
            {id === 5 ? "प्रपत्र" : `चरण ${item}`}
          </div>
        ))}
      </div>
      {/* Content Based on Stage */}
      <div style={{ marginTop: "20px" }}>{renderStageContent(stage)}</div>
    </div>
  );
};

export default UploadClaimStatus;
