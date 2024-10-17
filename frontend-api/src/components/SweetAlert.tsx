import Swal from "sweetalert2";
import React from "react";

interface SweetAlertProps {
  title: string;
  text: string;
  confirmButtonText: string;
  cancelButtonText?: string;
  onConfirm: () => void;
}

const SweetAlert: React.FC<SweetAlertProps> = ({
  title,
  text,
  confirmButtonText,
  cancelButtonText = "Cancel",
  onConfirm,
}) => {
  const showAlert = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      padding: "2em",
    });

    if (result.isConfirmed) {
      onConfirm();
    }
  };

  return (
    <button
      onClick={showAlert}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      {confirmButtonText}
    </button>
  );
};

export default SweetAlert;
