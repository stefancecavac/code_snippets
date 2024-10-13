import { Request, Response } from "express";
import client from "../db/prismaClient";
import { CodeSnippetQuestion } from "@prisma/client";

type Filter = {
  OR?: Array<{ question?: { contains: string; mode: "insensitive" } } | { language?: { contains: string; mode: "insensitive" } }>;
};

const getAllCodeSnippetQuestions = async (req: Request, res: Response) => {
  const q = req.query.q as string;

  const filter: Filter = {};

  if (q) {
    const search = q.split(",").map((term) => term.trim());

    filter.OR = search.flatMap((term) => [
      { question: { contains: term, mode: "insensitive" } },
      { language: { contains: term, mode: "insensitive" } },
    ]);
  }

  try {
    const codeSnippets = await client.codeSnippetQuestion.findMany({
      where: { ...filter },

      include: {
        User: {
          select: {
            username: true,
            reputation: true,
          },
        },
        _count: {
          select: {
            answers: true,
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
  const { Questiondetail, questionCode, question, language, tags } = req.body as CodeSnippetQuestion;

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
        tags: tags,
      },
    });

    await client.user.update({
      where: {
        id: id,
      },
      data: {
        reputation: {
          increment: 10,
        },
      },
    });

    res.status(201).json({ message: "Question created successfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { getAllCodeSnippetQuestions, getSingleCodeSnippetQuestion, createNewCodeSnippetQuestion };
