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
exports.saveCallLogsController = void 0;
const callLogsSchema_1 = require("../../../infrastructure/database/mongodb/models/callLogsSchema");
const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
const saveCallLogsController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { roomId, participants, startTime, endTime, duration, callType } = req.body;
            console.log(req.body, 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
            const convertedDuration = formatDuration(Math.floor(duration)); // Convert duration to HH:MM:SS format
            const callLog = new callLogsSchema_1.CallLogs({
                roomId,
                participants,
                startTime: startTime ? new Date(startTime) : null,
                endTime: endTime ? new Date(endTime) : null,
                duration: convertedDuration, // Save the formatted duration
                callType,
            });
            const savedCallLog = yield callLog.save();
            res.status(201).json({ message: "Call log saved successfully", data: savedCallLog });
        }
        catch (error) {
            console.error("Error saving call log:", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    });
};
exports.saveCallLogsController = saveCallLogsController;
