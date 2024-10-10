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
exports.searchUsersController = void 0;
const searchUsersController = (dependencies) => {
    const { useCases: { searchUserUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { query } = req.query;
            const users = yield searchUserUseCase(dependencies).execute(query);
            res.status(200).json({ users });
        }
        catch (error) {
            console.error(error, "error in seraching user");
            res.status(500).json({ message: "Server error", error: error });
        }
    });
};
exports.searchUsersController = searchUsersController;
