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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeProfileController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const completeProfileController = (dependencies) => {
    const { useCases: { completeProfileUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken } = req.cookies;
            const userData = req.body;
            console.log(userData, 'thisis the new data of user ____________');
            if (!accessToken) {
                res.status(400).json({ message: "Access token is missing." });
                return;
            }
            const decodedAccessToken = jsonwebtoken_1.default.decode(accessToken);
            const { userId } = decodedAccessToken;
            const _id = userId;
            const completeData = Object.assign(Object.assign({}, userData), { _id });
            const updatedUser = yield completeProfileUseCase(dependencies).execute(completeData);
            // console.log(updatedUser,'update user from cp controller666666666666');
            res.status(200).json({
                message: "Profile completed successfully!",
                _id,
            });
        }
        catch (error) {
            console.error("Error in completeProfileController:", error);
            res.status(500).json({ message: "Internal server error." });
        }
    });
};
exports.completeProfileController = completeProfileController;
