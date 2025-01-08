import React, { useState } from "react";
import { Page, Button, Icon, List, ListItem, Modal } from "react-onsenui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPlus, faSync } from "@fortawesome/free-solid-svg-icons";

const Stage1Content = ({ claim, setUploadType, setDocName, setCameraModalVis, handleDocPreview }) => {
  const [focusedExtraImageID, setFocusedExtraImageID] = useState(null);
  
  return (
    <>
      {/* Header Section */}
      <div style={{ padding: "20px", backgroundColor: "#5C7232", color: "#fff" }}>
        <h2 style={{ fontSize: "26px", fontWeight: "600" }}>
          वन अधिकार समिति का गठन / पुनर्गठन
        </h2>
        <p style={{ fontSize: "18px", fontWeight: "600" }}>
          (कार्यरत वन अधिकार समिति के पहले से उपस्थित होने पर चरण १ को वैकल्पिक माना जाये)
        </p>
      </div>

      {/* Form Section */}
      <div style={{ borderTop: "1px solid #fff", padding: "20px" }}>
        <h4 style={{ fontSize: "18px", fontWeight: "600" }}>
          कार्यवाही रजिस्टर की छाया प्रति (1.1 या 1.2)
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
              if (
                !Boolean(
                  claim?.courtDocuments[0]?.title === "SDM_SUMMON_RESULT_1"
                )
              ) {
                setUploadType("MAIN_DOC");
                setDocName("SDM_SUMMON_RESULT_1");
                setCameraModalVis(true);
              } else {
                handleDocPreview(claim?.courtDocuments[0]?.storageUrl);
              }
            }}
          >
            {!Boolean(
              claim?.courtDocuments[0]?.title === "SDM_SUMMON_RESULT_1"
            ) ? (
              <>
                <Icon icon="md-camera" size={20} />
                {Boolean(
                  claim?.extraImageFormCountForSync &&
                    claim?.extraImageFormCountForSync["SDM_SUMMON_RESULT_1"] !== 0
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
          {Boolean(claim?.courtDocuments[0]?.title === "SDM_SUMMON_RESULT_1") && (
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
                setDocName("SDM_SUMMON_RESULT_1");
                setUploadType("MAIN_DOC");
                setCameraModalVis(true);
              }}
            >
              <FontAwesomeIcon icon={faCamera} size="lg" />
            </Button>
          )}
        </div>

        {/* Extra Images Section */}
        {claim?.courtDocuments[0]?.extraImages?.map((item, indd) => (
          <div
            key={`extra-image-${indd}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
            }}
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
                if (
                  !(
                    claim?.courtDocuments.length &&
                    claim?.courtDocuments[0]?.title === "SDM_SUMMON_RESULT_1"
                  )
                ) {
                  setDocName("SDM_SUMMON_RESULT_1");
                  setCameraModalVis(true);
                } else {
                  handleDocPreview(item?.url);
                }
              }}
            >
              {!Boolean(
                claim?.courtDocuments[0]?.title === "SDM_SUMMON_RESULT_1"
              ) ? (
                <FontAwesomeIcon icon={faCamera} size="lg" />
              ) : (
                "फोटो देखें"
              )}
            </Button>

            {claim?.courtDocuments[0]?.title === "SDM_SUMMON_RESULT_1" && (
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
                  setDocName("SDM_SUMMON_RESULT_1");
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
            claim?.courtDocuments[0]?.title === "SDM_SUMMON_RESULT_1" ||
              Boolean(
                claim?.extraImageFormCountForSync &&
                  claim?.extraImageFormCountForSync["SDM_SUMMON_RESULT_1"] !== 0
              )
          ) && (
            <Button
              modifier="large"
              style={{
                width: "40%",
                backgroundColor: "#5C7232",
                color: "#fff",
                borderRadius:20
              }}
              onClick={() => {
                setDocName("SDM_SUMMON_RESULT_1");
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

export default Stage1Content;