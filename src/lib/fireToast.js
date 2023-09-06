import { toast } from "react-toastify";

export const FireToast = (type, msg) => {
  toast[type](msg, {
    position: toast.POSITION.TOP_RIGHT,
    theme: "dark",
    autoClose: 2000,
    draggable: true,
    closeOnClick: true,
    pauseOnHover: true,
  });
};
