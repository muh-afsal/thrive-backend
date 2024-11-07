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
exports.deleteEventRepo = exports.editEventRepo = exports.addEventRepo = void 0;
const eventSchema_1 = require("../../models/eventSchema");
const addEventRepo = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEvent = new eventSchema_1.Event(eventData);
        const response = yield newEvent.save();
        return response;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.addEventRepo = addEventRepo;
const editEventRepo = (eventId, eventData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield eventSchema_1.Event.findByIdAndUpdate(eventId, eventData, { new: true });
        return response;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.editEventRepo = editEventRepo;
const deleteEventRepo = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield eventSchema_1.Event.findByIdAndDelete(eventId);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.deleteEventRepo = deleteEventRepo;
