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
exports.searchUserUseCase = void 0;
const searchUserUseCase = (dependencies) => {
    const { repositories: { searchUsers } } = dependencies;
    return {
        execute: (query) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const users = yield searchUsers(query);
                return users;
            }
            catch (error) {
                throw new Error((error === null || error === void 0 ? void 0 : error.message) || "Error searching users");
            }
        })
    };
};
exports.searchUserUseCase = searchUserUseCase;