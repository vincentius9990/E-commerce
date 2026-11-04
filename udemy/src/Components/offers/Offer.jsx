import "./offer.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Timer from "./Timer";

const Offer = () => {
  const [open, setOpen] = useState(false);

  const toggleClosebutton = () => {
    setOpen(!open);
  };

  return (
    <section
      className="offer_container"
      style={{ display: open ? "none" : "flex" }}
    >
      <div className="offer_text">
        <span className="offer-tag">Limited time</span>
        <p>
          <b>Weekend drop:</b> up to 30% off smart watches &amp; accessories.
        </p>
        <Timer />
      </div>
      <IconButton
        className="offer_close"
        onClick={toggleClosebutton}
        aria-label="Close offer"
      >
        <CloseIcon className="close_icon" />
      </IconButton>
    </section>
  );
};

export default Offer;
