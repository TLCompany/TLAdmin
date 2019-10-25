import React from "react";
import "./index.scss";

const SearchBar = props => {
  return (
    <form className="searchbar" onSubmit={props.onSubmit}>
      <div className="searchbar_box">
        <img src="/btn_search.png" width="24" height="24" alt="검색" />
        <input
          placeholder="검색어를 입력하세요."
          value={props.value}
          onChange={props.onChange}
        />
      </div>
      <hr className="searchbar_line" />
    </form>
  );
};

export default SearchBar;
