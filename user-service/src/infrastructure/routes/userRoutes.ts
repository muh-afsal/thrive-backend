import { Router } from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import { controllers } from "../../presentation/controller";

export const userRoutes = (dependencies: IDependencies) => {
  const { completeProfile, fetchUser } = controllers(dependencies);

  console.log('reached teh user route ----');
  

  const router = Router();


 router.route("/completeprofile").post(completeProfile);
 router.route("/getuserdata/:userId").get(fetchUser);
 router.route("/editProfile").post(completeProfile);


//  router.route("/getuserdata").post((req, res) => {
//   console.log(req.body,'dfgasdgaergaerg');
//   res.json({success:'this is okey'})
 
// });


  return router;

};

