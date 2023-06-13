import React, { useEffect, useState } from "react";
import Entry from "./Entry";
import axios from "../Axios";
// import dataV from "./orderData";

function Table(props) {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [userData, setUserData] = useState([]);
  console.log(props.orderStatus);
  //API

  // const [searchKeyword, setSearchKeyword] = useState(props.search);

  const [filterOptions, setFilterOptions] = useState({});
  //
  const getApiData = async () => {
    try {
      const params = {
        keyword: props.search,
        page: props.page,
        rowsPerPage: props.selected,
      };

      if (props.orderStatus !== "") {
        params.orderStatus = props.orderStatus;
      }
      const res = await axios.get("http://localhost:4000/api/v1/getAllOrder", {
        params,
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
  }, [props.search, props.page, props.orderStatus, props.selected, props.refresh]);


  function deleteOrder(id) {
    axios
      .delete(`http://localhost:4000/api/v1/deleteOrder/${id}`, {
        withCredentials: true,
      })
      .then(res => {
        console.log(res);
        props.RefreshC();
      })
      .catch((err) => console.log(err.message));
  }


  function createEntry(dataTerm) {
    const dateStr = dataTerm.orderDate;
    const date = new Date(dateStr);

    const options = {
      timeZone: "Asia/Kathmandu",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };


    // console.log(dataTerm);
    const nepalTime = date.toLocaleString("en-US", options);
    var name = "";
    if (dataTerm.guestName != "") {
      name = dataTerm.guestName
    }
    else {
      // name = userName;
      // console.log(userName);
    }
    return (
      <Entry
        key={dataTerm._id}
        id={dataTerm._id}

        uname={dataTerm.guestName}
        date={nepalTime}
        amount={dataTerm.quantity}
        pStatus={dataTerm.paymentStatus}
        oStatus={dataTerm.orderStatus}
        aRider={dataTerm.riderId} //needs to be changed
        showView={props.showView}
        setId={props.setId}
        delOrder={deleteOrder}
        showEdit={props.showEdit}
      />
    );
  }

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) => {
        const acol = a[col].toLowerCase();
        const bcol = b[col].toLowerCase();
        return acol > bcol ? 1 : -1;
      });
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) => {
        const acol = a[col].toLowerCase();
        const bcol = b[col].toLowerCase();
        return acol < bcol ? 1 : -1;
      });
      setData(sorted);
      setOrder("ASC");
    }
  };

  const sortingNumb = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) => {
        // const acol = a[col];
        // const bcol = b[col];
        // return acol > bcol ? a - b : b - a;
        return a[col] - b[col];
      });
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) => {
        // const acol = a[col];
        // const bcol = b[col];
        // return acol < bcol ? a - b : b - a;
        return b[col] - a[col];
      });
      setData(sorted);
      setOrder("ASC");
    }
  };

  const sortingDate = (col) => {
    const sorted = [...data].sort((a, b) => {
      const acol = new Date(a[col].date);
      const bcol = new Date(b[col].date);
      return acol - bcol;
    });
    setData(sorted);
  };

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr className="head-row">
              <th>
                #Order ID
                <button onClick={() => sortingNumb("id")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                    fill="none"
                  >
                    <path
                      fill="#737373"
                      d="M8.025 8.936 4.85 12.768V.81a.3.3 0 0 0-.6 0V12.75L1.075 8.936a.3.3 0 0 0-.462.383l3.714 4.463a.301.301 0 0 0 .231.108c.09 0 .174-.04.231-.108l3.699-4.463a.3.3 0 0 0-.463-.383Zm7.362-4.255L11.674.218a.3.3 0 0 0-.462 0L7.514 4.681a.3.3 0 0 0 .462.383l3.175-3.832V13.19a.3.3 0 1 0 .6 0V1.248l3.175 3.816a.297.297 0 0 0 .422.04.3.3 0 0 0 .04-.423Z"
                    />
                  </svg>
                </button>
              </th>
              <th>
                User Name
                <button onClick={() => sorting("username")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                    fill="none"
                  >
                    <path
                      fill="#737373"
                      d="M8.025 8.936 4.85 12.768V.81a.3.3 0 0 0-.6 0V12.75L1.075 8.936a.3.3 0 0 0-.462.383l3.714 4.463a.301.301 0 0 0 .231.108c.09 0 .174-.04.231-.108l3.699-4.463a.3.3 0 0 0-.463-.383Zm7.362-4.255L11.674.218a.3.3 0 0 0-.462 0L7.514 4.681a.3.3 0 0 0 .462.383l3.175-3.832V13.19a.3.3 0 1 0 .6 0V1.248l3.175 3.816a.297.297 0 0 0 .422.04.3.3 0 0 0 .04-.423Z"
                    />
                  </svg>
                </button>
              </th>
              <th>
                Date
                <button onClick={() => sortingDate("date")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                    fill="none"
                  >
                    <path
                      fill="#737373"
                      d="M8.025 8.936 4.85 12.768V.81a.3.3 0 0 0-.6 0V12.75L1.075 8.936a.3.3 0 0 0-.462.383l3.714 4.463a.301.301 0 0 0 .231.108c.09 0 .174-.04.231-.108l3.699-4.463a.3.3 0 0 0-.463-.383Zm7.362-4.255L11.674.218a.3.3 0 0 0-.462 0L7.514 4.681a.3.3 0 0 0 .462.383l3.175-3.832V13.19a.3.3 0 1 0 .6 0V1.248l3.175 3.816a.297.297 0 0 0 .422.04.3.3 0 0 0 .04-.423Z"
                    />
                  </svg>
                </button>
              </th>
              <th>
                Amount
                <button onClick={() => sortingNumb("amount")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                    fill="none"
                  >
                    <path
                      fill="#737373"
                      d="M8.025 8.936 4.85 12.768V.81a.3.3 0 0 0-.6 0V12.75L1.075 8.936a.3.3 0 0 0-.462.383l3.714 4.463a.301.301 0 0 0 .231.108c.09 0 .174-.04.231-.108l3.699-4.463a.3.3 0 0 0-.463-.383Zm7.362-4.255L11.674.218a.3.3 0 0 0-.462 0L7.514 4.681a.3.3 0 0 0 .462.383l3.175-3.832V13.19a.3.3 0 1 0 .6 0V1.248l3.175 3.816a.297.297 0 0 0 .422.04.3.3 0 0 0 .04-.423Z"
                    />
                  </svg>
                </button>
              </th>
              <th>
                Payment Status
                <button onClick={() => sorting("paymentS")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                    fill="none"
                  >
                    <path
                      fill="#737373"
                      d="M8.025 8.936 4.85 12.768V.81a.3.3 0 0 0-.6 0V12.75L1.075 8.936a.3.3 0 0 0-.462.383l3.714 4.463a.301.301 0 0 0 .231.108c.09 0 .174-.04.231-.108l3.699-4.463a.3.3 0 0 0-.463-.383Zm7.362-4.255L11.674.218a.3.3 0 0 0-.462 0L7.514 4.681a.3.3 0 0 0 .462.383l3.175-3.832V13.19a.3.3 0 1 0 .6 0V1.248l3.175 3.816a.297.297 0 0 0 .422.04.3.3 0 0 0 .04-.423Z"
                    />
                  </svg>
                </button>
              </th>
              <th>
                Order Status
                <button onClick={() => sorting("orderS")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                    fill="none"
                  >
                    <path
                      fill="#737373"
                      d="M8.025 8.936 4.85 12.768V.81a.3.3 0 0 0-.6 0V12.75L1.075 8.936a.3.3 0 0 0-.462.383l3.714 4.463a.301.301 0 0 0 .231.108c.09 0 .174-.04.231-.108l3.699-4.463a.3.3 0 0 0-.463-.383Zm7.362-4.255L11.674.218a.3.3 0 0 0-.462 0L7.514 4.681a.3.3 0 0 0 .462.383l3.175-3.832V13.19a.3.3 0 1 0 .6 0V1.248l3.175 3.816a.297.297 0 0 0 .422.04.3.3 0 0 0 .04-.423Z"
                    />
                  </svg>
                </button>
              </th>
              {/* <th>
                Assign Rider
                <button onClick={() => sorting("riderA")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                    fill="none"
                  >
                    <path
                      fill="#737373"
                      d="M8.025 8.936 4.85 12.768V.81a.3.3 0 0 0-.6 0V12.75L1.075 8.936a.3.3 0 0 0-.462.383l3.714 4.463a.301.301 0 0 0 .231.108c.09 0 .174-.04.231-.108l3.699-4.463a.3.3 0 0 0-.463-.383Zm7.362-4.255L11.674.218a.3.3 0 0 0-.462 0L7.514 4.681a.3.3 0 0 0 .462.383l3.175-3.832V13.19a.3.3 0 1 0 .6 0V1.248l3.175 3.816a.297.297 0 0 0 .422.04.3.3 0 0 0 .04-.423Z"
                    />
                  </svg>
                </button>
              </th> */}
              <th> </th>
            </tr>
          </thead>
          <tbody>{data.map((dataTerm) => createEntry(dataTerm))}</tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
