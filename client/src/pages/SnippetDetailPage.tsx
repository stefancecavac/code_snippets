import { useGetAllAnswers } from "../api/CodeSnippetAnswerApi";
import { useGetSingleSnippetQuestions } from "../api/CodeSnippetQuestionApi";
import AnswerNotFound from "../components/AnswerNotFound";
import LoaderComponent from "../components/LoaderComponent";
import AnswerComponent from "../components/SnippetDetail/AnswerComponent";
import SnippetDetailAnswer from "../components/SnippetDetail/SnippetDetailAnswer";
import SnippetDetailQuestion from "../components/SnippetDetail/SnippetDetailQuestion";

const SnippetDetailPage = () => {
  const { codeSnippetQuestion, codeSnippetQuestionLoading } = useGetSingleSnippetQuestions();
  const { codeSnippetAnswers } = useGetAllAnswers();

  if (codeSnippetQuestionLoading) {
    return <LoaderComponent></LoaderComponent>;
  }

  return codeSnippetQuestion ? (
    <>
      <SnippetDetailQuestion codeSnippetQuestion={codeSnippetQuestion}></SnippetDetailQuestion>
      <AnswerComponent></AnswerComponent>

      {codeSnippetAnswers ? (
        codeSnippetAnswers?.map((answer) => <SnippetDetailAnswer key={answer.id} answer={answer}></SnippetDetailAnswer>)
      ) : (
        <AnswerNotFound></AnswerNotFound>
      )}
    </>
  ) : (
    <p>No snippet found</p>
  );
};

export default SnippetDetailPage;
