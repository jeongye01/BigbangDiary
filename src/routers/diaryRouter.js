import express from "express";
import {uploadDiary,readDiary,editDiary,deleteDiary} from "../controllers/diaryController";

const diaryRouter=express.Router();

diaryRouter.route("/upload").get(uploadDiary).post(uploadDiary);
diaryRouter.get("/:id",readDiary);
diaryRouter.route("/:id/edit").get(editDiary).post(editDiary);
diaryRouter.get("/:id/delete",deleteDiary);



export default diaryRouter;