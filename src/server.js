import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import diaryRouter from './routers/diaryRouter';



const app = express();
app.set("view engine","pug");
app.set("views",process.cwd()+"/src/views");
app.use(morgan("dev"));

app.use("/",rootRouter);
app.use("/user",userRouter);
app.use("/diary",diaryRouter);


export default app;