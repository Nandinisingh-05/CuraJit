import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center 
                      bg-white/20 
                      backdrop-blur-xl 
                      border border-white/30 
                      rounded-2xl 
                      shadow-2xl 
                      overflow-hidden">

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by specialization..."
          className="px-8 py-3 w-80 
                     bg-transparent 
                     text-white 
                     placeholder-white/70 
                     outline-none"
        />

        <button onClick={handleSearch}className="px-6 py-3  bg-blue-600/80  hover:bg-blue-600  text-white font-semibold transition-all duration-300">
          Search
        </button>
      </div>
    </div>
  );
}
