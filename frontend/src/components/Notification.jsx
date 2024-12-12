import React, { useState, useEffect } from "react";
import "../css/tailwind.css";
const Notification = ({ noti }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (noti) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // Tự động ẩn sau 3 giây
      return () => clearTimeout(timer); // Dọn dẹp timer
    }
  }, [noti]);

  return (
    <>
      {isVisible && (
        <div
          className={`fixed top-5 right-5 bg-green-500 text-white px-4 py-2 z-[9999] rounded-md shadow-lg transition-transform transform ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
          }`}
        >
          {noti}
        </div>
      )}
    </>
  );
};

export default Notification;
