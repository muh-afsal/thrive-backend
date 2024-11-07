
import { ISearchUserUseCase } from "../../domain/useCaseInterface/ISearchUserUseCase ";
import { ICreateAChatUseCase } from "../../domain/useCaseInterface/ICreateAChatUseCase";
import { IDependencies } from "./IDependencies.js";
import { IFetchAllChatsUseCase } from "../../domain/useCaseInterface/IFetchAllChatsUseCase";
import { ISendChatMessageUseCase } from "../../domain/useCaseInterface/ISendChatMessageUseCase";
import { IFetchAllChatMessageUseCase } from "../../domain/useCaseInterface/IFetchAllChatMessagesUseCase"; 
import { IAddBlogUseCase } from "../../domain/useCaseInterface/IAddBlogUseCase"; 
import { IFetchAllBlogsUseCase } from "../../domain/useCaseInterface/IFetchAllBlogsUseCase";
import { IAddEventUseCase } from "../../domain/useCaseInterface/IAddEventUseCase";
import { IEditEventUseCase } from "../../domain/useCaseInterface/IEditEventUseCase";
import { IDeleteEventUseCase } from "../../domain/useCaseInterface/IDeleteEventUseCase";

export interface IUseCases {
    searchUserUseCase: (dependencies: IDependencies) => ISearchUserUseCase;
    createAChatUseCase: (dependencies: IDependencies) => ICreateAChatUseCase;
    sendChatMessageUseCase: (dependencies:IDependencies) => ISendChatMessageUseCase;
    fetchAllChatsUseCase: (dependencies:IDependencies) => IFetchAllChatsUseCase;
    fetchAllChatMessagesUseCase: (dependencies:IDependencies) => IFetchAllChatMessageUseCase;
    addBlogUseCase: (dependencies:IDependencies) => IAddBlogUseCase;
    fetchAllBlogUseCase: (dependencies:IDependencies) => IFetchAllBlogsUseCase;
    addEventUseCase: (dependencies:IDependencies) => IAddEventUseCase;
    editEventUseCase: (dependencies:IDependencies) => IEditEventUseCase;
    deleteEventUseCase: (dependencies:IDependencies) => IDeleteEventUseCase;
    
}
