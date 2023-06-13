import React, { useEffect } from "react";
import ButtonT from "../ButtonToggle";
import { useState } from "react";
import axios from "axios";
import { orderBy } from "lodash";

function Entry(props) {

  const [pColor, setPColor] = useState(props.pStatus);
  const [oColor, setOColor] = useState(props.oStatus);
  const [rColor, setRColor] = useState(props.aRider);
  const [riders, setRiders] = useState();

  const changeClassP = (e) => {
    let val = e.target.value;
    setPColor(val);
    // console.log(`id from dd: ${props.id}`);
    handleChange(e, props.id, props.oStatus);
  };

  const changeClassO = (e) => {
    let val = e.target.value;
    setOColor(val);
    // console.log(`id from dd: ${props.id}`);
    handleChange(e, props.id, props.pStatus);
  };

  // const changeClassR = (e) => {
  //   let val = e.target.value;
  //   setRColor(val);
  //   handleChange(props.id, props.);;
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:4000/api/v1/getAllRider`
  //       );
  //       const json = await response.json();
  //       setRiders(json.data);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  //Dropdown onchange
  const [dropId, setDropId] = useState("");
  const [oData, setOData] = useState({
    orderStatus: "",
    paymentStatus: ""
  })

  function handleChange(event, id, alt) {

    const { name, value } = event.target;

    setDropId(id);
    console.log(id, name, value);

    setOData((prevV) => {
      if (name === "paymentStatus") {
        return {
          ...prevV,
          paymentStatus: value,
          orderStatus: alt
        }
      }
      else {
        return {
          ...prevV,
          paymentStatus: alt,
          orderStatus: value
        }
      }
    })


    axios
      .patch(`http://localhost:4000/api/v1/updateOrder/${dropId}`, oData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    console.log(dropId);
    console.log(oData);
  }, [handleChange])

  return (
    <tr key={props.id}>
      <td>{props.id}</td>
      <td>{props.uname}</td>
      <td>{props.date}</td>
      <td>
        {props.amount.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        )}
      </td>
      <td>
        <select
          onChange={changeClassP}
          name="paymentStatus"
          value={pColor}
          className={
            pColor === "Paid"
              ? "Paid"
              : pColor === "Unpaid"
                ? "Unpaid"
                : "Refunded"
          }
          id="paymentS"
        >
          <option value={"Paid"}>Paid</option>
          <option value={"Unpaid"}>Unpaid</option>
          <option value={"Refunded"}>Refunded</option>
        </select>
      </td>
      <td>
        <select
          onChange={changeClassO}
          value={oColor}
          name="orderStatus"
          className={
            oColor === "Completed"
              ? "Completed"
              : oColor === "InProcess"
                ? "In Process"
                : oColor === "Being Delivered"
                  ? "Being Delivered"
                  : oColor === "Pending"
                    ? "Pending"
                    : "Cancelled"
          }
          id="orderS"
        >
          <option value={"Completed"}>Completed</option>
          <option value={"In Process"}>In Progress</option>
          <option value={"Being Delivered"}>Being Delivered</option>
          <option value={"Pending"}>Pending</option>
          <option value={"Cancelled"}>Cancelled</option>
        </select>
      </td>
      {/* <td>
        <select
          onChange={changeClassR}
          value={rColor}
          name=""
          className={rColor === "" ? "Unassigned" : "Paid"}
          id="riderA"
        >
          <option value="">Assign</option>
          {riders?.map((e) => {
            return <option value={e._id}>{e.riderName}</option>;
          })}
        </select>
      </td> */}
      <ButtonT
        delOrder={props.delOrder}
        showView={props.showView}
        setId={props.setId}
        id={props.id}
        showEdit={props.showEdit}
      />
    </tr>
  );
}

export default Entry;
