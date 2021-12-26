import "dotenv/config";
import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import diaryRouter from './routers/diaryRouter';
import "./db";
import "./models/User";


const PORT = 8800;

const app = express();
app.use(morgan("dev"));

app.use("/",rootRouter);
app.use("/user",userRouter);
app.use("/diary",diaryRouter);
const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);


app.listen(PORT, handleListening);

export default app;