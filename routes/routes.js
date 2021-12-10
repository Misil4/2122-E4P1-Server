import  Express  from "express";

const router = Express.Router();
import { getAllUsers, getUserById, insertUserData, updateUserData, deleteUserData, updateUserStatus} from "../controllers/UserController.js";
import { getAllGarbages, getGarbageById, insertGarbageData, updateGarbageData, deleteGarbageData, updateGarbageStatus } from "../controllers/GarbageController.js";
import { createJWT,createNewJWT } from "../services/jwt.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

{/* JWT */}
router.post('/token/',createJWT)
router.post('/refresh/',createNewJWT)

{/* USERS */}
router.get('/users/',verifyJWT,getAllUsers);
router.get('/users/:id',verifyJWT,getUserById);
router.post('/users/',insertUserData)
router.put('/users/:id',verifyJWT,updateUserData);
router.put('/users/',verifyJWT,updateUserStatus);
router.delete('/users/:id',verifyJWT,deleteUserData);

{/* GARBAGES */}
router.get('/garbages/',verifyJWT,getAllGarbages);
router.get('/garbages/:id',verifyJWT,getGarbageById);
router.post('/garbages/',verifyJWT,insertGarbageData);
router.put('/garbages/:id',verifyJWT,updateGarbageData);
router.put('/garbages/',verifyJWT,updateGarbageStatus);
router.delete('/garbages/:id',verifyJWT,deleteGarbageData);


export default router;
