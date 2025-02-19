import React from "react";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "4vh",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: "auto" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.target.style.textDecoration = "underline";
            e.target.style.color = "black";
          }}
          onMouseLeave={(e) => {
            e.target.style.textDecoration = "none";
            e.target.style.color = "inherit";
          }}
        >
          Hjem
        </Link>
        <Link
          to="/se-alle-hytter"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.target.style.textDecoration = "underline";
            e.target.style.color = "black";
          }}
          onMouseLeave={(e) => {
            e.target.style.textDecoration = "none";
            e.target.style.color = "inherit";
          }}
        >
          Vis Hytter
        </Link>
      </Breadcrumbs>
    </div>
  );
}

export default Header;
