import { useGetAllAnswers } from "../api/CodeSnippetAnswerApi";
import { useGetSingleSnippetQuestions } from "../api/CodeSnippetQuestionApi";
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
    <div className="m-5  ">
      <SnippetDetailQuestion codeSnippetQuestion={codeSnippetQuestion}></SnippetDetailQuestion>
      <AnswerComponent></AnswerComponent>

      {codeSnippetAnswers?.map((answer) => (
        <SnippetDetailAnswer key={answer.id} answer={answer}></SnippetDetailAnswer>
      ))}
    </div>
  ) : (
    <p>No snippet found</p>
  );
};

export default SnippetDetailPage;
