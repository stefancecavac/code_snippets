import { useState } from "react";
import NewSnippetModal from "./newSnippetForm/NewSnippetModal";
import { PostIcon } from "./IconTypes";

const ActionComponent = () => {
  const [createSnippetModal, setCreateSnippetModal] = useState(false);

  return (
    <div className=" border-l-2  w-1/6 flex flex-col items-center border-gray-200 p-5 ">
      <button
        onClick={() => setCreateSnippetModal(true)}
        className="flex items-center justify-center w-fit gap-2 rounded-lg px-1 py-2 bg-emerald-500 border-2 border-emerald-500 text-white hover:bg-emerald-100 hover:text-emerald-500 transition-all "
      >
        <PostIcon></PostIcon>
        <p>Post Snippet</p>
      </button>
      <NewSnippetModal createSnippetModal={createSnippetModal} setCreateSnippetModal={setCreateSnippetModal}></NewSnippetModal>
    </div>
  );
};

export default ActionComponent;
