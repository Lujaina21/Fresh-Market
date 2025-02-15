import React from "react";
import "./ProtectedAuth.module.css";
import { Navigate } from "react-router-dom";

export default function ProtectedAuth(props) {
  //lw already 3ndy token ywadeny 3la elhome, else ywadeny 3la elchildren bto3 elprotectedAuth
  if (localStorage.getItem("userToken")) {
    // navigate component not a path
    return <Navigate to="/"></Navigate>;
  } else {
    return props.children;
  }
}
