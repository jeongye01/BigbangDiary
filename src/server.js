import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import diaryRouter from './routers/diaryRouter';
import MongoStore from 'connect-mongo';
import session from "express-session";
import { localsMiddleware } from "./middlewares";
const app = express();
app.set("view engine","pug");
app.set("views",process.cwd()+"/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));

app.use(session({
  secret:process.env.COOKIE_SECRET,
  resave:false,
  saveUninitialized:false,
  store:MongoStore.create({mongoUrl:process.env.DB_URL})
}));
app.use(localsMiddleware);
app.use("/",rootRouter);
app.use("/user",userRouter);
app.use("/diary",diaryRouter);


export default app;