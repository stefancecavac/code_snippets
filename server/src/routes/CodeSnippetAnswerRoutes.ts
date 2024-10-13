import express from "express";

const router = express.Router();

import { getAllSnippetAnswers, createNewSnippetAnswer, rateNegative, ratePositive } from "../controllers/CodeSnippetAnswerController";
import authenticate from "../middleware/authentiaction";

router.use(authenticate);
router.get("/:codeSnippetId", getAllSnippetAnswers);
router.post("/:codeSnippetId", createNewSnippetAnswer);
router.patch("/rate-up", ratePositive);
router.patch("/rate-down", rateNegative);

export default router;
