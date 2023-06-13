import React from "react";
import Input from "../Order/Input";
import { FaSearch } from "react-icons/fa";

function Top(props) {
  const handleSearch = (e) => {
    props.setSearch(e);
    if (props.prevPage > 1) {
      if (!e) {
        props.setCurrentPage(props.prevPage);
      } else {
        props.setCurrentPage(1);
      }
    }
  };
  return (
    <>
      <div className="top">
        <div className="title">{props.title}</div>
        <div className="sort">
          <div className="search">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
              >
                <path
                  fill="#ACACAC"
                  d="M10.917 9.667h-.659l-.233-.225a5.392 5.392 0 0 0 1.308-3.525 5.417 5.417 0 1 0-5.416 5.416 5.392 5.392 0 0 0 3.525-1.308l.225.233v.659l4.166 4.158 1.242-1.242-4.158-4.166Zm-5 0a3.745 3.745 0 0 1-3.75-3.75 3.745 3.745 0 0 1 3.75-3.75 3.745 3.745 0 0 1 3.75 3.75 3.745 3.745 0 0 1-3.75 3.75Z"
                />
              </svg>
            </div>
            <div>
              <Input
                type="text"
                placeholder="Search for Review"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="paginate">
          <div>
            <select>
              <option>50</option>
            </select>
            per page |{" "}
          </div>
          1-50 of 100
          <button
            disabled={props.currentPage === 1}
            onClick={() => {
              props.pageChange(props.currentPage - 1);
              props.setPrevPage(props.currentPage - 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="14"
              fill="fill"
            >
              <path
                fill="#000"
                fillOpacity={props.currentPage === 1 ? ".4" : "1"}
                d="M6.667 13.667 0 7 6.667.333 7.85 1.517 2.367 7l5.483 5.483-1.183 1.184Z"
              />
            </svg>
          </button>
          <button
            disabled={props.currentPage * props.resultPerPage >= props.count}
            onClick={() => {
              props.pageChange(props.currentPage + 1);
              props.setPrevPage(props.currentPage + 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="13"
              fill="none"
            >
              <path
                fill="#000"
                fillOpacity={
                  props.currentPage * props.resultPerPage >= props.count
                    ? ".4"
                    : "1"
                }
                d="m2.016 12.75-1.11-1.11 5.14-5.14-5.14-5.14L2.016.25l6.25 6.25-6.25 6.25Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default Top;
