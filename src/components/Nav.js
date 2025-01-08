import React from "react";
import { BackButton } from "react-onsenui";

export default function Nav(props) {
  const { title } = props;



  return (
    <div className="center">
      &nbsp; <img src="/ratifi.png" height={25} alt="logo" /> &nbsp; RatiFi Redux -{" "}
      {title}
      &nbsp;
    </div>
  );
}
