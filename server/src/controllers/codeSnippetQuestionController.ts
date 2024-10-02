import { Request, Response } from "express";
import client from "../db/prismaClient";
import { CodeSnippetQuestion } from "@prisma/client";

const getAllCodeSnippetQuestions = async (req: Request, res: Response) => {
  try {
    const codeSnippets = await client.codeSnippetQuestion.findMany({
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
    });

    if (codeSnippets.length === 0) {
      return res.status(404).json({ message: "No snippets found" });
    }
    res.status(200).json(codeSnippets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getSingleCodeSnippetQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const codeSnippetQuestion = await client.codeSnippetQuestion.findUnique({
      where: {
        id: id,
      },
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!codeSnippetQuestion) {
      return res.status(404).json({ message: "No questions with that id found" });
    }

    res.status(200).json(codeSnippetQuestion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const createNewCodeSnippetQuestion = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { Questiondetail, questionCode, question, language } = req.body as CodeSnippetQuestion;

  if (!Questiondetail || !questionCode || !question || !language) {
    return res.status(404).json({ message: "All fields are required" });
  }

  try {
    await client.codeSnippetQuestion.create({
      data: {
        Questiondetail: Questiondetail,
        language: language,
        question: question,
        questionCode: questionCode,
        userId: id,
      },
    });

    res.status(201).json({ message: "Question created successfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { getAllCodeSnippetQuestions, getSingleCodeSnippetQuestion, createNewCodeSnippetQuestion };
