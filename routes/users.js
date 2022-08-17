import express from "express"
import {deleteUser, dislike, getUser, like, subscribe, unsubscribe, update} from "../controllers/user.js"
import {verifyToken} from "../verifyToken.js"

const router = express.Router()

router.put("/:id", verifyToken, update)

router.delete("/:id", verifyToken, deleteUser)

router.get("/find/:id", getUser)

router.put("/sub/:id", subscribe)

router.put("/unsub/:id", unsubscribe)

router.put("/like/:videoId", like)

router.put("/dislike/:videoId", dislike)

export default router