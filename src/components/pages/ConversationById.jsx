import React, { useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import Layout from "../layout/Layout";
import { DataService } from "../../services/DataServices";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//called from connection chat button

function ConversationById() {
  console.log("ConversationById component");

  const socket = useSocket();
  const { rid } = useParams();
  const [messageList, setMessageList] = useState([]);
  const loggedInUserId = useSelector((state) => state.user._id);
  const loggedInUser = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [conversationID, setConversationID] = useState("");

  const formatTime = (date) => new Date(date).toLocaleTimeString();

  const getConversationMessage = async () => {
    try {
      const data = await DataService.getAllMessageByUserId(rid);
      if (data?.isSuccess) {
        setMessageList(data?.apiData ? data?.apiData : []);
        console.log(data?.apiData[0]?.conversationID);
        setConversationID(data?.apiData[0]?.conversationID);
      }
    } catch (err) {
      console.log(err?.message);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const payload = {
        receiverID: rid,
        content: message.trim(),
        media: null, // Replace if needed
        mediaType: null, // Replace if needed
      };

      const response = await DataService.sendMessage(payload);
      if (response?.isSuccess) {
        const savedMessage = response.data;

        // Emit the message via Socket.IO
        socket.emit("sendMessage", savedMessage);

        // Add to the local message list
        //setMessageList((prevMessages) => [...prevMessages, savedMessage]);

        // Clear input
        setMessage("");
      }
    } catch (err) {
      console.error("Error sending message:", err.message);
    }
  };

  useEffect(() => {
    if (socket && conversationID) {
      socket.emit("joinRoom", conversationID);
      // console.log("Joined room:", conversationID);
    }
  }, [socket, conversationID]);

  useEffect(() => {
    try {
      if (!socket) return;

      socket.on("receiveMessage", (newMessage) => {
        // console.log("New message received:", newMessage);
        console.log(messageList);

        setMessageList((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off("receiveMessage");
      };
    } catch (err) {
      console.log(err?.message);
    }
  }, [socket]);

  useEffect(() => {
    getConversationMessage();
  }, []);

  return (
    <>
      <Layout>
        <div className="flex justify-center mt-2 mb-2">
          <div className="mockup-phone max-w-xl w-full min-w-52 min-h-28">
            <div className="camera"></div>
            <div className="display p-4">
              {messageList?.length > 0 ? (
                messageList?.map((cur, i) => {
                  const isSender = cur.senderID._id === loggedInUserId;
                  const user = isSender ? cur.receiverID : cur.senderID;
                  const alignment = isSender ? "chat-end" : "chat-start";

                  return (
                    <div key={cur._id} className={`chat ${alignment}`}>
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            alt={`${
                              isSender
                                ? loggedInUser?.firstName
                                : user.firstName
                            } profile image`}
                            src={
                              isSender ? loggedInUser?.photoUrl : user.photoUrl
                            }
                          />
                        </div>
                      </div>
                      <div className="chat-header">
                        {isSender ? loggedInUser?.firstName : user.firstName}
                        <time className="text-xs opacity-50">
                          {formatTime(cur.createdAt)}
                        </time>
                      </div>
                      <div className="chat-bubble  break-words ">
                        {cur.content}
                      </div>
                      <div className="chat-footer opacity-50">
                        {isSender ? "Delivered" : "Seen"}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center min-h-52 text-center">
                  <p className="text-gray-500">No chat found.</p>
                  <p className="text-primary font-semibold">
                    Say hi to start the conversation!
                  </p>
                </div>
              )}

              <div className="flex justify-center gap-1">
                <input
                  value={message}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-primary w-full "
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <kbd
                  type="button"
                  onClick={handleSendMessage}
                  className="kbd cursor-pointer"
                >
                  Send
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ConversationById;
