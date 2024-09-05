"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const userRoutes = (dependencies) => {
    const { completeProfile, fetchUser } = (0, controller_1.controllers)(dependencies);
    console.log('reached teh user route ----');
    const router = (0, express_1.Router)();
    router.route("/completeprofile").post(completeProfile);
    router.route("/getuserdata/:userId").get(fetchUser);
    router.route("/editProfile").post(completeProfile);
    //  router.route("/getuserdata").post((req, res) => {
    //   console.log(req.body,'dfgasdgaergaerg');
    //   res.json({success:'this is okey'})
    // });
    return router;
};
exports.userRoutes = userRoutes;
