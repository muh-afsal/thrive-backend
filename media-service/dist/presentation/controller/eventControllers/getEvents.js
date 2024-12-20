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
exports.fetchAllEventsController = void 0;
const eventSchema_1 = require("../../../infrastructure/database/mongodb/models/eventSchema");
const fetchAllEventsController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const events = yield eventSchema_1.Event.find({ adminId: userId });
            res.status(200).json({
                message: "Events fetched successfully",
                events,
                success: true,
            });
        }
        catch (error) {
            console.error("Error fetching events:", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    });
};
exports.fetchAllEventsController = fetchAllEventsController;
