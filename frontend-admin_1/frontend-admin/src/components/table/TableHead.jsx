import { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

export default function TableHead({ columns, handleSorting }) {
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor) => {
    const sortOrder = accessor === sort && order === "asc" ? "desc" : "asc";
    setSort(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };
  console.log(columns);
  return (
    <>
      <thead>
        <tr className="table-rows">
          {columns?.map(({ label, accessor, sortable }) => {
            return (
              <th
                id={accessor}
                key={accessor}
                onClick={sortable ? () => handleSortingChange(accessor) : null}
              >
                {label}
                {sortable ? (
                  <>
                    <span
                      className={`order-up ${order === "asc" ? "dim" : ""}`}
                    >
                      <AiOutlineArrowUp />
                    </span>
                    <span
                      className={`order-down ${order === "desc" ? "dim" : ""}`}
                    >
                      <AiOutlineArrowDown />
                    </span>
                  </>
                ) : (
                  ""
                )}
              </th>
            );
          })}
        </tr>
      </thead>
    </>
  );
}
