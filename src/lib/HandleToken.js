import jwtDecode from "jwt-decode";

export const SaveToken = (token) => {
  localStorage.setItem("token", token);
};

export const CheckToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  let decodedToken = jwtDecode(token);
  let currentDate = new Date();

  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    console.log("Token expired.");
    return false;
  } else {
    console.log("Valid token");
    return true;
  }
};
