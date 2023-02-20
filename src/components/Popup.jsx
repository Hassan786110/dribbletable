import React from "react";
import style from "./popup.module.css";

const Popup = ({ heading, click, children, filter }) => {
  return (
    <div className={style.popup}>
      <span>{heading}</span>
      <div>
        <span>Select {heading}</span>
        {children}
        <div>
          <button
            className={style.cancel}
            onClick={() => {
              setTimeout(() => {
                click(false);
              }, 2);
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setTimeout(() => {
                click(false);
                filter(heading)
              }, 2);
            }}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
