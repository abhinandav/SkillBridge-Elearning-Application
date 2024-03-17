import React from 'react';
import { toast } from 'react-toastify';

const SuccessToast = ({ message }) => {
  return (
    <div>
      {toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })}
    </div>
  );
};

export default SuccessToast;
