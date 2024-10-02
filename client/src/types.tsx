import { z } from "zod";

export const userShema = z.object({
  userId: z.string().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string().optional(),
});

export type userData = z.infer<typeof userShema>;

export const loginSchema = z.object({
  id: z.string().optional(),
  email: z.string(),
  password: z.string().optional(),
});

export type loginData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  id: z.string().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string().optional(),
});

export type registerData = z.infer<typeof registerSchema>;

export const codeSnippetQuestionSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1, { message: "This field must not be empty" }),
  Questiondetail: z.string().min(1, { message: "This field must not be empty" }),
  language: z.string().min(1, { message: "This field must not be empty" }),
  questionCode: z.string().min(1, { message: "This field must not be empty" }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),

  userId: z.string().optional(),
  User: userShema.optional(),
});

export type codeSnippetQuestionData = z.infer<typeof codeSnippetQuestionSchema>;

export const codeSnippetAnswerSchema = z.object({
  id: z.string().optional(),
  answer: z.string().min(1, { message: "This field must not be empty" }),
  answerCode: z.string().min(1, { message: "This field must not be empty" }),
  correct: z.boolean().default(false),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),

  userId: z.string().optional(),
  User: userShema.optional(),
});

export type codeSnippetAnswerData = z.infer<typeof codeSnippetAnswerSchema>;
