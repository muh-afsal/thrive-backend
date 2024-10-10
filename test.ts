import React, { useState, useEffect, useRef } from "react";
import ContactSearchBar from "@/components/searchBars/ContactSearchbar";
import UserContact from "@/components/chat/UserContact";
import { useSelector } from "react-redux";
import { IoMdMore } from "react-icons/io";
import { RootState } from "@/redux/store";
import { useParams } from "react-router-dom";
import { GrAttachment } from "react-icons/gr";
import { GrMicrophone } from "react-icons/gr";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { TbSend2 } from "react-icons/tb";
import { FaRegFaceSmile } from "react-icons/fa6";
import { MdPhotoCamera, MdVideoCall, MdAttachFile } from "react-icons/md";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CLIENT_API } from "@/axios";
import { config } from "@/common/configuratoins";
import { FiEdit } from "react-icons/fi";
import AddNewChatModal from "@/components/chat/AddnewChatModal";
import cloudinaryUpload from "@/utils/cloudinary";

const ChatPage: React.FC = () => {
  const { chatType } = useParams<{ chatType: string }>();
  const { data } = useSelector((state: RootState) => state.user);
  const [inputValue, setInputValue] = useState("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageFiles, setMessageFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const isSender = true;
  const currentUser = data;
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAttachmentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() || messageFiles.length > 0 || audioBlob) {
      setInputValue("");
      setMessageFiles([]);
      setAudioBlob(null);
      const currentUserId = currentUser?._id;

      const chatPayload = {
        content: inputValue || "",
        sender: currentUserId,
        attachments: await Promise.all(
          [...messageFiles, audioBlob].map(async (file) => {
            if (file instanceof File) {
              return await cloudinaryUpload(file);
            } else {
              return null;
            }
          })
        ),
        chat: new mongoose.Types.ObjectId(chatId),
      };

      try {
        const response = await CLIENT_API.post("/media/create-chat", chatPayload, {
          withCredentials: true,
        });
        if (response.data.success) {
          setInputValue("");
          setMessageFiles([]);
          setAudioBlob(null);
        }
      } catch (error) {
        console.log(error);
      }

      console.log(inputValue, "--this is chat content");
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setInputValue((prev) => prev + emojiData.emoji);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMessageFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMessageFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMessageFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleAudioRecord = () => {
    setIsRecording((prev) => !prev);

    if (!isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.start();

          const audioChunks: Blob[] = [];
          mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
            audioChunks.push(event.data);
          });

          mediaRecorderRef.current.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            setAudioBlob(audioBlob);
          });
        })
        .catch(error => {
          console.error("Error accessing microphone:", error);
        });
    } else {
      mediaRecorderRef.current?.stop();
      mediaRecorderRef.current = null;
    }
  };

  const renderChatHeader = () => {
    return (
        <div className="h-[9%] bg--400 flex border-b border-gray-200 dark:border-neutral-700">
          <div className="w-[70px] bg--500 h-full flex justify-center items-center">
            <img
              src={data?.profileImage}
              className="rounded-md object-cover bg--400 h-11 w-11"
              alt=""
            />
          </div>
          <div className="w-[100%] bg--300 h-full flex p-2">
            <div className="w-[100%] bg--500 flex flex-col">
              <h1 className="text-base font-semibold text-gray-700 dark:text-white mt-2">Full Name</h1>
              <h4 className="text-sm text-gray-600 dark:text-neutral-400">
                {chatType === "all-inbox" && "Previous message in All Inbox"}
                {chatType === "groups" && "Previous message in Groups"}
                {chatType === "starred" && "Previous message in Starred"}
                {chatType === "archived" && "Previous message in Archived"}
              </h4>
            </div>
            <div className="w-20px bg--400 flex justify-center items-center">
              <IoMdMore
                size={25}
                className="text-gray-500 hover:cursor-pointer"
              />
            </div>
          </div>
        </div>
      );
  };

  const renderContacts = () => {
     // Assuming you have a 'contacts' array that stores the list of contacts
     const contacts = [UserContact,UserContact];
     const contactsAvailable = contacts.length > 0;
 
     if (chatType === "all-inbox" || chatType === "groups") {
       if (contactsAvailable) {
         return (
           <>
             {/* Render the contacts if available */}
             {contacts.map((contact) => (
               <UserContact key={contact.id} />
             ))}
           </>
         );
       } else {
         // If no contacts are available, display the message and button
         return (
           <div className="no-contacts justify-center flex items-center  w-full bg--400 h-full">
             <p className="py-1 bg-slate-200 rounded-lg px-4 dark:bg-neutral-800 dark:text-white  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
               No chat found!{" "}
               <button onClick={handleOpenModal} className="text-thirve-blue dark:text-blue-400">Create a chat</button>{" "}
             </p>
           </div>
         );
       }
     }
     return null;
  };

  return (
    <div className="dark:bg-dark-bg w-full flex h-[100%] relative ">
      <div className="  contacts-listing scrollbar-custom bg--300 w-[35%] mt-4 border-r border-gray-100 dark:border-neutral-700 overflow-y-auto flex flex-col">
        <div className=" border-b border-gray-200 dark:border-neutral-700">
          <ContactSearchBar />
          <div
            onClick={handleOpenModal}
            className="bg--400 flex justify-end items-center px-6 pt-2 pb-2 relative group"
          >
            <FiEdit
              className="cursor-pointer hover:text-thrive-blue dark:text-neutral-500"
              size={20}
            />
            <span className="tooltip opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute bg-gray-500 text-white text-xs rounded py-1 px-2 bottom-full ">
              Add chat
            </span>
          </div>
        </div>

        {renderContacts()}
      </div>

      <div
        className={`fixed inset-0 z-50 ${
          isModalOpen ? "flex" : "hidden"
        } justify-center items-center bg-black bg-opacity-50`}
      >
        <div className="w-[30%] h-auto bg-white rounded-lg ">
        <AddNewChatModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      </div>

      <div className="chat-listing w-[100%] lg:w-[65%] relative">
        {renderChatHeader()}
        <div className="chat-listing bg--400 h-[87%] w-full scrollbar-custom">
          <div className="flex bg--400 flex-col-reverse space-y-3 pb-7 space-y-reverse p-4 overflow-y-auto h-full scrollbar-custom">
            <div
              className={`flex ${
                isSender ? "justify-end" : "justify-start"
              } mb-3`}
            >
              <div
                className={`px-4 py-1 max-w-xs flex justify-between ${
                  isSender
                    ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
                    : "bg-gray-200 text-gray-800 rounded-br-lg rounded-tr-lg rounded-tl-lg"
                }`}
              >
                I'm good, how about you?
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSendMessage}
          className="chat-input bg-white dark:bg-dark-bg h-[7%] w-[100%] bottom-0 absolute flex border-t border-gray-200 dark:border-neutral-700"
        >
          <div className="bg--400 h-full w-[7%] flex justify-center items-center">
            <div
              className="w-9 h-9 hover:bg-slate-100  dark:hover:bg-neutral-700 dark:text-white  hover:cursor-pointer rounded-md flex justify-center items-center"
              onClick={handleAttachmentClick}
            >
              <GrAttachment size={19} />
            </div>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleCloseMenu}
              PaperProps={{
                style: {
                  width: "auto",
                  maxWidth: 200,
                  top: "calc(100% + 5px)",
                  left: "auto",
                  right: 0,
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  const fileInput = document.createElement("input");
                  fileInput.type = "file";
                  fileInput.accept = "image/*";
                  fileInput.onchange = handlePhotoUpload;
                  fileInput.click();
                }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <MdPhotoCamera style={{ marginRight: 8 }} />
                Upload Photo
              </MenuItem>
              <MenuItem
                onClick={() => {
                  const fileInput = document.createElement("input");
                  fileInput.type = "file";
                  fileInput.accept = "video/*";
                  fileInput.onchange = handleVideoUpload;
                  fileInput.click();
                }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <MdVideoCall style={{ marginRight: 8 }} />
                Upload Video
              </MenuItem>
              <MenuItem
                onClick={() => {
                  const fileInput = document.createElement("input");
                  fileInput.type = "file";
                  fileInput.accept = ".pdf,.doc,.docx,.txt";
                  fileInput.onchange = handleDocumentUpload;
                  fileInput.click();
                }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <MdAttachFile style={{ marginRight: 8 }} />
                Upload Document
              </MenuItem>
              <MenuItem
                onClick={handleAudioRecord}
                style={{ display: "flex", alignItems: "center" }}
              >
                <GrMicrophone style={{ marginRight: 8 }} />
                {isRecording ? "Stop Recording" : "Start Recording"}
              </MenuItem>
            </Menu>
          </div>

          <div className="bg-400 h-full w-[82%] flex justify-center items-center p-2">
            <input
              value={inputValue}
              onChange={handleInputChange}
              className="w-full h-full bg--400 dark:bg-dark-bg rounded-md dark:text-white focus:outline-none"
            />
          </div>

          <div className="bg--400 h-full w-[13%] flex items-center justify-around">
            <div
              className="w-9 h-9 dark:hover:bg-neutral-700 dark:text-white hover:bg-slate-100 hover:cursor-pointer rounded-md flex justify-center items-center"
              onClick={() => setShowPicker((prev) => !prev)}
            >
              <FaRegFaceSmile size={19} />
            </div>
            {showPicker && (
              <div
                className="absolute bottom-[7%] mb-14 right-40 z-50 w-[30%]"
                ref={pickerRef}
              >
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
            {inputValue.trim() || messageFiles.length > 0 || audioBlob ? (
              <button
                type="submit"
                className="w-9 h-9  dark:text-white hover:bg-slate-100 dark:hover:bg-neutral-700 hover:cursor-pointer rounded-md flex justify-center items-center"
              >
                <TbSend2 size={23} />
              </button>
            ) : (
              <div className="w-9 h-9 dark:hover:bg-neutral-700 dark:text-white hover:bg-slate-100 hover:cursor-pointer rounded-md flex justify-center items-center">
                <GrMicrophone size={19} />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;