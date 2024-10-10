"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllChatsController = void 0;
const fetchAllChatsController = (dependencies) => {
    const { useCases: { fetchAllChatsUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chats = yield fetchAllChatsUseCase(dependencies).execute();
            // const users=chats?.map((user)=>{
            //   //  console.log(user);
            //    console.log(user,'999999999999999999999999999999999999999999');
            // })
            res.status(200).json({
                success: true,
                message: "Chats fetched successfully",
                chats,
            });
        }
        catch (error) {
            console.error("Error fetching chats:", error);
            res.status(400).json({ message: "Server error", error: error.message });
        }
    });
};
exports.fetchAllChatsController = fetchAllChatsController;