import express from "express";

const router = express.Router();

import { getAllSnippetAnswers, createNewSnippetAnswer } from "../controllers/CodeSnippetAnswerController";
import authenticate from "../middleware/authentiaction";

router.use(authenticate);
router.get("/:codeSnippetId", getAllSnippetAnswers);
router.post("/:codeSnippetId", createNewSnippetAnswer);

export default router;
