import React, { useState } from "react";
import Top from "../Review/Top";
import Table from "./Table";

function Reviews() {
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [resultPerPage, setResultPerPage] = useState(5);
  const [prevPage, setPrevPage] = useState(currentPage);

  function pageChange(e) {
    setCurrentPage(e);
  }

  const dataCount = (e) => {
    console.log(e.count);
    setCount(e.count);
    setResultPerPage(e.resultPerPage);
  };
  console.log(search);
  return (
    <div className="main-container">
      <div className="order-content">
        <Top
          title="Reviews"
          setSearch={setSearch}
          pageChange={pageChange}
          currentPage={currentPage}
          count={count}
          resultPerPage={resultPerPage}
          prevPage={prevPage}
          setCurrentPage={(e) => setCurrentPage(e)}
          setPrevPage={(e) => setPrevPage(e)}
        />
        <Table
          search={search}
          dataCount={dataCount}
          page={currentPage}
          resultPerPage={resultPerPage}
        />
      </div>
    </div>
  );
}

export default Reviews;
