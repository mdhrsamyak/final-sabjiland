import React, { useState, useEffect } from "react";
import Entry from "./Entry";
// import data from "./riderData";
import axios from "../Axios";

function Table(props) {
  const [data, setData] = useState([]);

  const getApiData = async () => {
    axios
      .get("http://localhost:4000/api/v1/getAllRider")
      // .then(res => JSON.parse(res))
      // .then(res => setData(res.data))
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getApiData();
  }, [props.refresh]);

  function deleteRider() {
    axios
      .delete("")
      .then(res => {
        console.log(res);
        props.RefreshC();
      })
      .catch((err) => console.log(err.message));
  }

  function createEntry(empTerm, index) {
    return (
      <Entry
        key={index}
        id={empTerm._id}
        uname={empTerm.riderName}
        contact={empTerm.contact}
        address={empTerm.address}
        email={empTerm.email}
        setId={props.setId}
        toggleEdit={props.ToggleEdit}
      />
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>E.Name</th>
            <th>Contact No.</th>
            <th>Address</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        {data.map(createEntry)}
      </table>
    </div>
  );
}

export default Table;
