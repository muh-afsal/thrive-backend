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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageEventController = void 0;
const eventSchema_1 = require("../../../infrastructure/database/mongodb/models/eventSchema");
const manageEventController = (dependencies) => {
    const { useCases: { addEventUseCase, editEventUseCase, deleteEventUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const _a = req.body, { action, eventId } = _a, eventData = __rest(_a, ["action", "eventId"]);
        try {
            if (Array.isArray(eventData.members)) {
                eventData.members = eventData.members.map((userId) => ({ userId }));
            }
            let event;
            switch (action) {
                case "add":
                    event = new eventSchema_1.Event(eventData);
                    const addedEvent = yield addEventUseCase(dependencies).execute(event);
                    const populatedEvent = yield eventSchema_1.Event.findById(addedEvent === null || addedEvent === void 0 ? void 0 : addedEvent._id)
                        .populate("adminId", "firstName lastName email");
                    console.log(populatedEvent, 'this is new event ------------------------');
                    // const notificationData = {
                    //   admin: {
                    //     _id: populatedEvent?.adminId._id,
                    //     firstName: populatedEvent?.adminId.firstName,
                    //     lastName: populatedEvent?.adminId.lastName,
                    //     email: populatedEvent?.adminId.email,
                    //   },
                    //   members: populatedEvent?.members.map((member: any) => ({
                    //     userId: member.userId._id,
                    //     email: member.userId.email,
                    //   })) || [], // Provide a default empty array if members are undefined
                    //   eventDetails: {
                    //     title: addedEvent?.title,
                    //     date: addedEvent?.date,
                    //     startTime: addedEvent?.startTime,
                    //     endTime: addedEvent?.endTime,
                    //     description: addedEvent?.description,
                    //   },
                    // };
                    // await publishToQueue("sendEventEmailQueue", notificationData);
                    res.status(201).json({
                        message: "Event added successfully",
                        event: addedEvent,
                        success: true,
                    });
                    break;
                case "edit":
                    if (!eventId) {
                        return res.status(400).json({ message: "Event ID is required for editing." });
                    }
                    event = yield editEventUseCase(dependencies).execute(eventId, eventData);
                    const editedEvent = yield eventSchema_1.Event.findById(eventId)
                        .populate("adminId", "firstName lastName email");
                    // const editNotificationData = {
                    //   admin: {
                    //     _id: editedEvent?.adminId._id,
                    //     firstName: editedEvent?.adminId.firstName,
                    //     lastName: editedEvent?.adminId.lastName,
                    //     email: editedEvent?.adminId.email,
                    //   },
                    //   members: editedEvent?.members.map((member: any) => ({
                    //     userId: member.userId._id,
                    //     email: member.userId.email,
                    //   })) || [],
                    //   eventDetails: {
                    //     title: editedEvent?.title,
                    //     date: editedEvent?.date,
                    //     startTime: editedEvent?.startTime,
                    //     endTime: editedEvent?.endTime,
                    //     description: editedEvent?.description,
                    //   },
                    // };
                    // await publishToQueue("sendEventEmailQueue", editNotificationData);
                    res.status(200).json({
                        message: "Event edited successfully",
                        event,
                        success: true,
                    });
                    break;
                case "delete":
                    if (!eventId) {
                        return res.status(400).json({ message: "Event ID is required for deletion." });
                    }
                    yield deleteEventUseCase(dependencies).execute(eventId);
                    res.status(200).json({
                        message: "Event deleted successfully",
                        success: true,
                    });
                    break;
                default:
                    res.status(400).json({ message: "Invalid action type." });
                    break;
            }
        }
        catch (error) {
            console.error("Error managing event:", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    });
};
exports.manageEventController = manageEventController;
