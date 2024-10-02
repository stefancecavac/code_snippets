import express from "express";

const router = express.Router();

import { getAllCodeSnippetQuestions, getSingleCodeSnippetQuestion, createNewCodeSnippetQuestion } from "../controllers/codeSnippetQuestionController";
import authenticate from "../middleware/authentiaction";

router.use(authenticate);
router.get("/", getAllCodeSnippetQuestions);
router.get("/:id", getSingleCodeSnippetQuestion);
router.post("/", createNewCodeSnippetQuestion);

export default router;
