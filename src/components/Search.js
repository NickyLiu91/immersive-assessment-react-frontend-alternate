import React from "react";

const Search = ({ handleSearchTerm, searchTerm }) => {
  return (
    <div className="ui huge fluid icon input">
      <input
        type="text"
        placeholder={"Search your Recent Transactions"}
        onChange={handleSearchTerm}
        value={searchTerm}
      />
      <i className="circular search link icon" />
    </div>
  );
};

export default Search;
