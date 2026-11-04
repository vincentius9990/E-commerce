import React from "react";
import "./pagenotfound.css";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Pagenotfound = () => {
  const navigate = useNavigate();

  return (
    <main className="pagenotfound">
      <img
        src="/IMAGES/undraw_Page_not_found_re_e9o6.png"
        alt="Page not found illustration"
      />
      <div className="pagenotfound-copy">
        <span className="pagenotfound-code">404</span>
        <h1>We couldn&apos;t find that page</h1>
        <p>
          The page you&apos;re looking for may have moved, or the link might be
          broken. Let&apos;s get you back on track.
        </p>
        <div className="pagenotfound-actions">
          <Button
            variant="contained"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
          >
            Back to homepage
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/shop")}
          >
            Browse the shop
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Pagenotfound;
