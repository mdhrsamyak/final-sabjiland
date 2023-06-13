import React, { useState, useEffect } from "react";
// import adminData from "./data.json";
import axios from "../Axios";

function Table(props) {
  const [adminData, setAdminData] = useState([]);

  const getApiData = async () => {
    axios
      .get("http://localhost:4000/api/v1/getAllUser", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        const filteredData = res.data.data.filter((item) => item.role === "admin");
        setAdminData(filteredData);
        console.log(`filtered data = ${filteredData}`);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getApiData();
  }, [props.refresh]);



  function deleteAdmin(id) {
    axios
      .delete(`http://localhost:4000/api/v1/deleteUser/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);
        props.RefreshC();
      })
      .catch((err) => console.log(err.message));
  }

  function handleEdit(id) {
    console.log(id);
    props.setId(id);
    props.showEdit();
  }

  return (
    <div className="table-container" style={{ marginTop: "24px" }}>
      <table>
        <thead>
          <tr className="head-row">
            <th>
              Name
              <button>
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
              Contact No.
              <button>
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
              Address
              <button>
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
              Email
              <button>
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
              Action
              <button>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {adminData
            .map((col) => {
              const { _id, name, contactNo1, address, email } = col;

              return (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>{contactNo1}</td>
                  <td>{address}</td>
                  <td>{email}</td>
                  <td className="editBtn">
                    <button onClick={() => handleEdit(_id)}>Edit</button>
                  </td>
                  <td className="delBtn">
                    <button onClick={() => deleteAdmin(_id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                      >
                        <path
                          stroke="#FF3434"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
