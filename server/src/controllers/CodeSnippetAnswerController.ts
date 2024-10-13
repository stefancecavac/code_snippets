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
        rating: {
          select: { ratingType: true, userId: true },
        },
      },
    });

    if (codeSnippetAnswers.length === 0) {
      return res.status(404).json({ message: "No Answers found" });
    }

    const answersWithRating = codeSnippetAnswers.map((answer) => {
      const positiveRatings = answer.rating.filter((r) => r.ratingType === "positive").length;
      const negativeRatings = answer.rating.filter((r) => r.ratingType === "negative").length;
      const totalRating = positiveRatings - negativeRatings;

      return {
        ...answer,
        totalRating,
      };
    });

    res.status(200).json(answersWithRating);
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

const ratePositive = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { answerId } = req.body;

  try {
    const answerExists = await client.codeSnippetAnswer.findFirst({
      where: {
        id: answerId,
      },
    });
    if (!answerExists) {
      return res.status(404).json({ message: "No answer found" });
    }

    const alreadyRated = await client.rating.findFirst({
      where: {
        codeSnippetAnswerId: answerId,
        userId: id,
      },
    });

    if (alreadyRated) {
      await client.rating.deleteMany({
        where: {
          userId: id,
          codeSnippetAnswerId: answerId,
        },
      });
    }

    await client.rating.create({
      data: {
        ratingType: "positive",
        userId: id,
        codeSnippetAnswerId: answerId,
      },
    });

    res.status(200).json({ message: "Added 1 to positive rating" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const rateNegative = async (req: Request, res: Response) => {
  const { answerId } = req.body;
  const { id } = req.user;

  try {
    const answerExists = await client.codeSnippetAnswer.findUnique({
      where: {
        id: answerId,
      },
    });
    if (!answerExists) {
      return res.status(404).json({ message: "No answer found" });
    }

    const alreadyRated = await client.rating.findFirst({
      where: {
        codeSnippetAnswerId: answerId,
        userId: id,
      },
    });

    if (alreadyRated) {
      await client.rating.deleteMany({
        where: {
          userId: id,
          codeSnippetAnswerId: answerId,
        },
      });
    }

    await client.rating.create({
      data: {
        ratingType: "negative",
        userId: id,
        codeSnippetAnswerId: answerId,
      },
    });

    res.status(200).json({ message: "Added 1 to negative rating" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { getAllSnippetAnswers, createNewSnippetAnswer, ratePositive, rateNegative };
