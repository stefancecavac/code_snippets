import { useState } from "react";
import NewSnippetModal from "./newSnippetForm/NewSnippetModal";
import { PostIcon } from "./IconTypes";
import UserComponent from "./UserComponent";

const ActionComponent = () => {
  const [createSnippetModal, setCreateSnippetModal] = useState(false);

  console.log(createSnippetModal);
  return (
    <div className="fixed  h-full right-0 flex flex-col pt-5 pr-5 ">
      <UserComponent></UserComponent>
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
