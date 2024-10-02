import { useGetAllSnippetQuestions } from "../api/CodeSnippetQuestionApi";
import LoaderComponent from "../components/LoaderComponent";
import SnippetCard from "../components/SnippetCard";

const Home = () => {
  const { codeSnippetQuestions, codeSnippetQuestionsLoading } = useGetAllSnippetQuestions();

  if (codeSnippetQuestionsLoading) {
    return <LoaderComponent></LoaderComponent>;
  }

  return (
    <div className="flex flex-col md:mx-5 lg:mx-20  gap-3">
      {codeSnippetQuestions?.map((question) => (
        <SnippetCard key={question.id} question={question}></SnippetCard>
      ))}
    </div>
  );
};

export default Home;
