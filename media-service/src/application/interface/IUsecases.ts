
import { ISearchUserUseCase } from "../../domain/useCaseInterface/ISearchUserUseCase ";
import { ICreateAChatUseCase } from "../../domain/useCaseInterface/ICreateAChatUseCase";
import { IDependencies } from "./IDependencies.js";
import { IFetchAllChatsUseCase } from "../../domain/useCaseInterface/IFetchAllChatsUseCase";
import { ISendChatMessageUseCase } from "../../domain/useCaseInterface/ISendChatMessageUseCase";
import { IFetchAllChatMessageUseCase } from "../../domain/useCaseInterface/IFetchAllChatMessagesUseCase";

export interface IUseCases {
    searchUserUseCase: (dependencies: IDependencies) => ISearchUserUseCase;
    createAChatUseCase: (dependencies: IDependencies) => ICreateAChatUseCase;
    sendChatMessageUseCase: (dependencies:IDependencies) => ISendChatMessageUseCase;
    fetchAllChatsUseCase: (dependencies:IDependencies) => IFetchAllChatsUseCase;
    fetchAllChatMessagesUseCase: (dependencies:IDependencies) => IFetchAllChatMessageUseCase;
}
