import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import cookieparser from "cookie-parser";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieparser());

import authRouter from "./routes/authRoutes";
import codeSnippetRouter from "./routes/codeSnippetRoutes";
import codeSnippetAnswerRouter from "./routes/CodeSnippetAnswerRoutes";

app.use("/api/auth", authRouter);
app.use("/api/snippets", codeSnippetRouter);
app.use("/api/snippet/answers", codeSnippetAnswerRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});
