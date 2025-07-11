import React from "react";

const SearchInput = React.memo(function SearchInput({ value, onChange }) {
  return (
    <input
      type="text"
      className="w-full sm:w-96 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition shadow-md mb-6"
      placeholder="Enter GitHub username..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
});

export default function SearchForm(props) {
  return <SearchInput {...props} />;
}
