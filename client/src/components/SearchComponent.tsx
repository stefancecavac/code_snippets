import { useSearch } from "../hooks/useSearch";
import { SearchIcon } from "./IconTypes";

const SearchComponent = () => {
  const { setQueryParam } = useSearch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    const formattedSearch = searchTerm.replace(/ /g, ","); // treba bolji sisttem sta ako korisnik unosi naziv pitanja koji se sastoji od vise rijeci

    console.log(formattedSearch);
    setQueryParam(formattedSearch);
  };

  return (
    <div className="mb-5 flex items-center">
      <input
        onChange={handleSearch}
        className=" rounded-l-lg w-full p-2 border-2 border-slate-100 focus:outline-none"
        placeholder="Search by question , language or tag"
        type="text"
      ></input>
      <button className="bg-emerald-500 rounded-r-lg p-2">
        <SearchIcon></SearchIcon>
      </button>
    </div>
  );
};

export default SearchComponent;
