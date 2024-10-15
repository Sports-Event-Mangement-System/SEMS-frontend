import React, { useState } from "react";
import "./alert.css"; // Ensure to import your CSS file
import { HiLightBulb } from "react-icons/hi"; // Import the icon

export default function Alert({ type, message }) {
  const [isShow, setIsShow] = useState(true);

  const handleClose = () => {
    setIsShow(false);
  };

return (
    isShow && (
        <div className={`alert ${type}`}>
            <span className="closebtn" onClick={handleClose}>
                &times;
            </span>
            <div className="alert-content"> {/* Wrap icon and message in a div */}
                {type === "info" && (
                    <HiLightBulb style={{ marginRight: "8px", verticalAlign: "middle", fontSize: "45px" }} />
                )}
                <p>{message}</p>
            </div>
        </div>
    )
);
}
