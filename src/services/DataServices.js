
import { AuthService } from "./AuthService";
import { DomainService } from "./DomianService";


//GET all message by user id
const getAllMessageByUserId = async (receiverId) => {
  try {
    const res = await fetch(
      DomainService.GetBaseUrl() +
      "message/messageById?receiverId=" +
      receiverId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: AuthService.getApiAuthorizationConfig(),
        },
        credentials: "include",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const DataService = {
  getAllMessageByUserId
}