import { IDependencies } from "../../application/interface/IDependencies";
import { searchUsersController } from "./chatControllers/searchUser";
import { createAChatController} from "./chatControllers/createAChat";
import { createAGroupChatController } from "./chatControllers/createAGroupChat";
import { fetchAllChatsController } from "./chatControllers/fetchAllChats";
import { sendChatMessageController } from "./chatControllers/sendChatMessage";
import { fetchAllChatMessagesController } from "./chatControllers/fetchAllChatMessages";
import { saveCallLogsController } from "./callControllers/SaveCallLogs";
import { fetchCallLogsController } from "./callControllers/fetchCallLogs";
import { addBlogController } from "./blogControllers/addBlog";
import { fetchAllBlogsController } from "./blogControllers/getBlogs";
import { fetchBlogByIdController } from "./blogControllers/getABlog";
import { fetchBlogsByAuthorController } from "./blogControllers/getMyBlogs";
import { removeBlogController } from "./blogControllers/removeBlog";
import { manageEventController } from "./eventControllers/eventAction";
import { fetchAllEventsController } from "./eventControllers/getEvents";



export const controllers = (dependencies: IDependencies)=>{
    
    return{
        searchUser: searchUsersController(dependencies),
        createAChat: createAChatController(dependencies),
        createAGroupChat: createAGroupChatController(dependencies),
        fetchAllChats: fetchAllChatsController(dependencies),
        sendChatMessage: sendChatMessageController(dependencies),
        fetchAllChatMessages: fetchAllChatMessagesController(dependencies),
        saveCallLogs: saveCallLogsController(dependencies),
        fetchCallLogs: fetchCallLogsController(dependencies),
        addBlog: addBlogController(dependencies),
        fetchAllBlogs: fetchAllBlogsController(dependencies),
        fetchABlogs: fetchBlogByIdController(),
        fetchMyBlogs: fetchBlogsByAuthorController(),
        removeBlog: removeBlogController(),
        manageEventActions:manageEventController(dependencies),
        fetchEvents:fetchAllEventsController(dependencies)


    }
}