import React, { useState } from "react";
import { AlertDialog } from "react-onsenui";

export default function Dialog(props) {
  const { visible, setVisible ,title,desc} = props;

  return (
    <AlertDialog isOpen={visible} isCancelable={false}>
      <div className="alert-dialog-title">{title || "TITLE"}</div>
      <div className="alert-dialog-content">{desc || "DESC"}</div>
      <div className="alert-dialog-footer">
        <button
          onClick={() => setVisible(false)}
          className="alert-dialog-button"
        >
          Cancel
        </button>
        <button
          onClick={() => setVisible(false)}
          className="alert-dialog-button"
        >
          Ok
        </button>
      </div>
    </AlertDialog>
  );
}
