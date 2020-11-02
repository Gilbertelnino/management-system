import "@babel/polyfill";
import express from "express";
import dotenv from "dotenv";
import user from "./routers/user";

dotenv.config();
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: "endpoint working successfully",
  });
});
app.use("/user", user);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server running  on port ${PORT}`));
export default server;
