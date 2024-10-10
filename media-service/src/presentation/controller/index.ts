import { IDependencies } from "../../application/interface/IDependencies";
import { searchUsersController } from "./chatControllers/searchUser";
import { createAChatController} from "./chatControllers/createAChat";
import { createAGroupChatController } from "./chatControllers/createAGroupChat";
import { fetchAllChatsController } from "./chatControllers/fetchAllChats";
import { sendChatMessageController } from "./chatControllers/sendChatMessage";
import { fetchAllChatMessagesController } from "./chatControllers/fetchAllChatMessages";



export const controllers = (dependencies: IDependencies)=>{
    
    return{
        searchUser: searchUsersController(dependencies),
        createAChat: createAChatController(dependencies),
        createAGroupChat: createAGroupChatController(dependencies),
        fetchAllChats: fetchAllChatsController(dependencies),
        sendChatMessage: sendChatMessageController(dependencies),
        fetchAllChatMessages: fetchAllChatMessagesController(dependencies),


    }
}