import { DomainService } from "./DomainServices";
const baseUrl = DomainService.GetBaseUrl() + "auth";
import CookieService from "./CookieServices";
import { jwtDecode } from "jwt-decode";

const loginUser = async (formData) => {
  try {
    const res = await fetch(baseUrl + "/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const sendOtp = async (formData) => {
  try {
    if (!formData?.emailID) {
      return "email id required"
    }
    const res = await fetch(baseUrl + "/sendOtp", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const register = async (formData) => {
  try {
    const res = await fetch(baseUrl + "/signup", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const validateToken = () => {
  try {
    const token = CookieService.getCookie("token");

    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp > currentTime) {
        return true;
      } else {
        CookieService.clearCookie("token");
      }
      return false;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e.message);
  }
};

const isAuthenticatedUser = () => {
  try {
    if (validateToken()) {
      return true;
    }
    CookieService.clearCookie();
    return false;
  } catch (error) {
    console.error("Error:", error);
  }
};

const logout = () => {
  CookieService.clearCookie("token");
};

const getApiAuthorizationConfig = () => {
  let config = "";
  if (CookieService.getCookie("token")) {
    config = "Bearer " + CookieService.getCookie("token");
  }
  return config;
};

export const AuthService = {
  sendOtp,
  loginUser,
  validateToken,
  isAuthenticatedUser,
  logout,
  register,
  getApiAuthorizationConfig,
};
