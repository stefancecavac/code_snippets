import { Request, Response } from "express";
import client from "../db/prismaClient";
import { CodeSnippetAnswer } from "@prisma/client";

const getAllSnippetAnswers = async (req: Request, res: Response) => {
  const { codeSnippetId } = req.params;

  try {
    const codeSnippetAnswers = await client.codeSnippetAnswer.findMany({
      where: { codeSnippetId },
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
    });

    if (codeSnippetAnswers.length === 0) {
      return res.status(404).json({ message: "No Answers found" });
    }
    res.status(200).json(codeSnippetAnswers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const createNewSnippetAnswer = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { codeSnippetId } = req.params;
  const { answerCode, answer } = req.body as CodeSnippetAnswer;

  if (!answerCode || !answer) {
    return res.status(404).json({ message: "All fields are required" });
  }

  try {
    const codeSnippetQuestionId = await client.codeSnippetQuestion.findUnique({
      where: {
        id: codeSnippetId,
      },
    });

    if (!codeSnippetQuestionId) {
      return res.status(404).json({ message: "No code snippet with that id" });
    }

    await client.codeSnippetAnswer.create({
      data: {
        answer: answer,
        answerCode: answerCode,
        userId: id,
        codeSnippetId: codeSnippetId,
      },
    });

    res.status(201).json({ message: "Snippet created successfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { getAllSnippetAnswers, createNewSnippetAnswer };
