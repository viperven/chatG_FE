import { AuthService } from "./AuthService";
import { DomainService } from "./DomainServices";

//GET all message by loggedin user id
const getAllMessageByUserId = async (friendId) => {
  try {
    const res = await fetch(DomainService.GetBaseUrl() + "message/get-all-messages?friendId=" + friendId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: AuthService.getApiAuthorizationConfig(),
      },
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const sendMessage = async (formData) => {
  try {
    const res = await fetch(DomainService.GetBaseUrl() + "message/send-message", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: AuthService.getApiAuthorizationConfig(),
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


const getProfileData = async () => {
  try {
    const res = await fetch(DomainService.GetBaseUrl() + "profile/view", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: AuthService.getApiAuthorizationConfig(),
      },
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};


export const DataService = {
  getAllMessageByUserId,
  sendMessage,
  getProfileData
};
