import React, { useState } from "react";
import { Button } from "react-onsenui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPlus, faSync } from "@fortawesome/free-solid-svg-icons";

const Stage2Content = ({ claim, setUploadType, setDocName, setCameraModalVis, handleDocPreview }) => {
  const [focusedExtraImageID, setFocusedExtraImageID] = useState(null);

  return (
    <>
      {/* Header Section */}
      <div style={{ padding: "20px", backgroundColor: "#5C7232", color: "#fff" }}>
        <h2 style={{ fontSize: "26px", fontWeight: "600" }}>
          सामुदायिक वन अधिकारों का दावा तैयार करना
        </h2>
      </div>

      {/* Form Section */}
      <div style={{ borderTop: "1px solid #fff", padding: "20px" }}>
        <h4 style={{ fontSize: "18px", fontWeight: "600" }}>
          दावा प्रक्रिया आरम्भ करने और दस्तावेजों की मांग के लिए SDLC को पत्र (2.1)
        </h4>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
          {/* First Button */}
          <Button
            modifier="large"
            style={{
              width: "40%",
              marginLeft: "20px",
              marginTop: "10px",
              backgroundColor: "#5C7232",
              color: "#fff",
              borderRadius:20
            }}
            onClick={() => {
              if (!Boolean(claim?.courtDocuments[1]?.title === "SDM_SUMMON_RESULT_2")) {
                setUploadType("MAIN_DOC");
                setDocName("SDM_SUMMON_RESULT_2");
                setCameraModalVis(true);
              } else {
                handleDocPreview(claim?.courtDocuments[1]?.storageUrl);
              }
            }}
          >
            {!Boolean(claim?.courtDocuments[1]?.title === "SDM_SUMMON_RESULT_2") ? (
              <>
                <FontAwesomeIcon icon={faCamera} size="lg" />
                {Boolean(
                  claim?.extraImageFormCountForSync &&
                    claim?.extraImageFormCountForSync["SDM_SUMMON_RESULT_2"] !== 0
                ) && (
                  <FontAwesomeIcon
                    icon={faSync}
                    size="lg"
                    color="#fff"
                    style={{ marginLeft: "10px" }}
                  />
                )}
              </>
            ) : (
              "फोटो देखें"
            )}
          </Button>

          {/* Second Button */}
          {Boolean(claim?.courtDocuments[1]?.title === "SDM_SUMMON_RESULT_2") && (
            <Button
              modifier="large"
              style={{
                width: "40%",
                marginRight: "20px",
                marginTop: "10px",
                backgroundColor: "#5C7232",
                color: "#fff",
                borderRadius:20
              }}
              onClick={() => {
                setDocName("SDM_SUMMON_RESULT_2");
                setUploadType("MAIN_DOC");
                setCameraModalVis(true);
              }}
            >
              <FontAwesomeIcon icon={faCamera} size="lg" />
            </Button>
          )}
        </div>

        {/* Extra Images Section */}
        {claim?.courtDocuments[1]?.extraImages?.map((item, indd) => (
          <div
            key={`extra-image-${indd}`}
            style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}
          >
            <Button
              modifier="large"
              style={{
                width: "40%",
                marginLeft: "20px",
                marginTop: "10px",
                backgroundColor: "#5C7232",
                color: "#fff",
                borderRadius:20
              }}
              onClick={() => {
                if (!(
                  claim?.courtDocuments.length &&
                  claim?.courtDocuments[1]?.title === "SDM_SUMMON_RESULT_2"
                )) {
                  setDocName("SDM_SUMMON_RESULT_2");
                  setCameraModalVis(true);
                } else {
                  handleDocPreview(item?.url);
                }
              }}
            >
              {!Boolean(claim?.courtDocuments[1]?.title === "SDM_SUMMON_RESULT_2") ? (
                <FontAwesomeIcon icon={faCamera} size="lg" />
              ) : (
                "फोटो देखें"
              )}
            </Button>

            {claim?.courtDocuments[1]?.title === "SDM_SUMMON_RESULT_2" && (
              <Button
                modifier="large"
                style={{
                  width: "40%",
                  marginRight: "20px",
                  marginTop: "10px",
                  backgroundColor: "#5C7232",
                  color: "#fff",
                  borderRadius:20
                }}
                onClick={() => {
                  setDocName("SDM_SUMMON_RESULT_2");
                  setCameraModalVis(true);
                  setFocusedExtraImageID(indd + 1);
                  setUploadType("UPDATE_EXTRA_IMAGE");
                }}
              >
                <FontAwesomeIcon icon={faCamera} size="lg" />
              </Button>
            )}
          </div>
        ))}

        {/* Add New Extra Image Button */}
        <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
          {Boolean(
            claim?.courtDocuments[1]?.title === "SDM_SUMMON_RESULT_2" ||
              Boolean(
                claim?.extraImageFormCountForSync &&
                  claim?.extraImageFormCountForSync["SDM_SUMMON_RESULT_2"] !== 0
              )
          ) && (
            <Button
              modifier="large"
              style={{
                width: "50%",
                backgroundColor: "#5C7232",
                color: "#fff",
                borderRadius:20
              }}
              onClick={() => {
                setDocName("SDM_SUMMON_RESULT_2");
                setCameraModalVis(true);
                setUploadType("NEW_EXTRA_IMAGE");
              }}
            >
              <FontAwesomeIcon icon={faPlus} size="lg" /> Add Image
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Stage2Content;
