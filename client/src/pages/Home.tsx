import { useGetAllSnippetQuestions } from "../api/CodeSnippetQuestionApi";
import LoaderComponent from "../components/LoaderComponent";
import SearchComponent from "../components/SearchComponent";
import SnippetCard from "../components/SnippetCard";
import { useSearch } from "../hooks/useSearch";

const Home = () => {
  const { q } = useSearch();

  const { codeSnippetQuestions, codeSnippetQuestionsLoading } = useGetAllSnippetQuestions(q);

  return (
    <div className="flex flex-col gap-3">
      <SearchComponent></SearchComponent>

      {codeSnippetQuestionsLoading && <LoaderComponent></LoaderComponent>}
      {codeSnippetQuestions?.map((question) => (
        <SnippetCard key={question.id} question={question}></SnippetCard>
      ))}
    </div>
  );
};

export default Home;
