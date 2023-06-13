import React, { useEffect, useState } from "react";
import Entry from "./Entry";
// import data from "./reviewData";
import axios from "../Axios";

function Table(props) {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState([]);
  //
  const getApiData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/getAllReview", {
        params: {
          keyword: props.search,
          page: props.page,
        },
        withCredentials: true,
      });
      const dataProp = {
        data: res.data.data,
        count: res.data.count,
        resultPerPage: res.data.resultPerPage,
      };
      props.dataCount(dataProp);

      setData(dataProp.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  useEffect(() => {
    getApiData();
  }, [props.search, props.page]);

  function createEntry(messageTerm) {
    const dateStr = messageTerm.reviewDate;
    const date = new Date(dateStr);

    const options = {
      timeZone: "Asia/Kathmandu",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    const nepalTime = date.toLocaleString("en-US", options);

    return (
      <Entry
        key={messageTerm.id}
        id={messageTerm._id}
        uname={messageTerm.userName}
        date={nepalTime}
        message={messageTerm.userReview}
      />
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Name</th>
            <th>Date</th>
            <th style={{ width: "35%" }}>Message</th>
          </tr>
        </thead>
        {data.map(createEntry)}
      </table>
    </div>
  );
}

export default Table;
