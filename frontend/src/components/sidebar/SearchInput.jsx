import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useGetConversations from "../../hooks/useGetConversations.js";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation.js";

const SearchInput = () => {
  const [search, setsearch] = useState("");
  const { conversations } = useGetConversations();
  const { setSelectedConversation } = useConversation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3)
      return toast.error("Search term must be at least 3 characters long");
    console.log(conversations);

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    console.log(conversation);

    if (conversation) {
      setSelectedConversation(conversation);
      setsearch("");
    } else {
      toast.error("No such user found");
    }
  }
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
