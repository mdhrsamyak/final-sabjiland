import React, { useEffect, useState } from "react";
import Input from "./Input";
import oData from "./addOrderData";
import "./addOrder.css";
// import datas from "./pdata";
// import riders from "./dummyrider";
import axios from "axios";

function AddOrder(props) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [pid, setPid] = useState([]);
  const [qty, setQty] = useState([""]);
  const [rider, setRider] = useState([]);
  const [userData, setUserData] = useState([]);
  const customerData = userData.filter((user) => {
    return user.role === "customer";
  });
  const [uinfo, setUinfo] = useState({
    uid: "",
    address: "",
  });

  const [addOrder, setAddOrder] = useState({
    uName: "",
    gName: "",
    gContact: "",
    payM: "",
    orderS: "",
    payS: "",
    rider: "",
    product: [""],
  });

  const [filteredData, setFilteredData] = useState([]);

  function handleSubmit(event) {
    console.log(addOrder);
    event.preventDefault();
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString(); // Format: "2023-05-23T09:03:35.702Z"
    const formattedDateTime = formattedDate.replace("Z", "+00:00"); // Format: "2023-05-23T09:03:35.702+00:00"
    // console.log(data);
    // console.log(formattedDate);

    axios
      .post(
        "http://localhost:4000/api/v1/postOrder",
        {
          userId: uinfo.uid,
          guestName: addOrder.gName,
          guestContact: addOrder.gContact,
          riderId: addOrder.rider,
          productId: pid,
          quantity: qty,
          orderStatus: addOrder.orderS,
          paymentStatus: addOrder.payS,
          paymentMethod: addOrder.payM,
          orderAddress: uinfo.address,
          orderDate: formattedDateTime,
          reviewId: "646a554bdedfd78be7a59680",
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        props.showAdd();
        props.RefreshC();
      })
      .catch((err) => console.log(err));
  }

  //Fetch data for product dropdown
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/getProducts`, {
        params: {
          keyword: search,
        },
        withCredentials: true,
      })
      .then((res) =>
        setData(res.data.data.map((item) => ({ ...item, quantity: 0 })))
      )
      .catch((err) => console.log(err.message));
  }, [search]);
  console.log(data);
  // Fetch data for rider
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/getAllRider?keyword=`)
      .then((res) => setRider(res.data.data))
      .catch((err) => console.log(err.message));
  }, []);

  //Fetch data for customer
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/getAllUser?keyword=`, {
        withCredentials: true,
      })
      .then((res) => setUserData(res.data.data))
      .catch((err) => console.log(err.message));
  }, []);
  console.log(filteredData);
  useEffect(() => {
    const quantitiesAsString = filteredData.map((data) =>
      data.quantity.toString()
    );
    setQty(quantitiesAsString);
  }, [filteredData]);

  function handleInput(event) {
    const { name, value } = event.target;
    setAddOrder((prevV) => {
      return {
        ...prevV,
        [name]: value,
      };
    });

    if (name === "uName") {
      const selectedUser = userData.find((user) => {
        return user.name === value;
      });
      console.log(selectedUser);
      if (selectedUser) {
        console.log(`id: ${selectedUser._id}, add: ${selectedUser.address}`);
        setUinfo((prevV) => {
          return {
            ...prevV,
            uid: selectedUser._id,
            address: selectedUser.address,
          };
        });
      }
    }

    if (name === "rider") {
      const selectedrider = rider.find((rider) => {
        return rider.riderName === value;
      });
      console.log(selectedrider);
      if (selectedrider) {
        console.log(`id: ${selectedrider._id}`);
        setAddOrder((prevV) => ({
          ...prevV,
          rider: selectedrider._id,
        }));
      }
    }
  }

  function addProduct(id) {
    setPid((prevV) => [...prevV, id]);

    setSearch("");

    // Check if the product already exists in filteredData
    const existingProduct = filteredData.find((item) => item._id === id);

    if (existingProduct) {
      // If the product already exists, increase its quantity by 1
      setFilteredData((prevData) => {
        return prevData.map((item) => {
          if (item._id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      });
    } else {
      // If the product doesn't exist, add it with a quantity of 1
      const newProduct = data.find((item) => item._id === id);
      if (newProduct) {
        setFilteredData((prevData) => [
          ...prevData,
          { ...newProduct, quantity: 1 },
        ]);
      }
    }
  }

  function DeleteId(event, id) {
    event.preventDefault();
    setPid((prevV) => prevV.filter((item) => item !== id));
    setFilteredData((prevData) => prevData.filter((item) => item._id !== id));
  }

  function PlusQty(e, id) {
    e.preventDefault();
    setFilteredData((prevD) => {
      return prevD.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    });
  }

  function MinusQty(e, id) {
    e.preventDefault();
    setFilteredData((prevD) => {
      return prevD.map((item) => {
        if (item._id === id && item.quantity > 0) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
    });
  }

  return (
    <div
      className="pop-container"
      style={props.pop ? { display: "block" } : { display: "none" }}
    >
      <div className="product-item">
        {/* <div className="product-top"> */}
        <div className="heading">Add Order</div>
        <div className="close-btn">
          <button onClick={props.showAdd}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
            >
              <path
                fill="#777"
                d="M11 .5C5.15.5.5 5.15.5 11S5.15 21.5 11 21.5 21.5 16.85 21.5 11 16.85.5 11 .5Zm4.05 15.75L11 12.2l-4.05 4.05-1.2-1.2L9.8 11 5.75 6.95l1.2-1.2L11 9.8l4.05-4.05 1.2 1.2L12.2 11l4.05 4.05-1.2 1.2Z"
              />
            </svg>
          </button>
        </div>
        {/* </div> */}

        <div className="product-content">
          <form onSubmit={handleSubmit}>
            <div className="left">
              <label>Username</label>
              <select
                value={addOrder.uName}
                onChange={handleInput}
                name="uName"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {customerData.map((odata) => {
                  return (
                    <option key={odata._id} value={odata.name}>
                      {odata.name}
                    </option>
                  );
                })}
              </select>
              <label>Guest Name</label>
              <input
                type="text"
                onChange={handleInput}
                name="gName"
                value={addOrder.gName}
              ></input>
              <label>Guest Contact</label>
              <input
                type="text"
                onChange={handleInput}
                name="gContact"
                value={addOrder.gContact}
              ></input>
              <label>Payment Method</label>
              <select onChange={handleInput} value={addOrder.payM} name="payM">
                <option value="" disabled>
                  Select an option
                </option>
                <option>COD</option>
                <option>Esewa</option>
                <option>Khalti</option>
                <option>Phone Pay</option>
              </select>
              <label>Order Status</label>
              <select
                onChange={handleInput}
                value={addOrder.orderS}
                name="orderS"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option>Completed</option>
                <option>Being Delieverd</option>
                <option>In Process</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
              <label>Payment Status</label>
              <select onChange={handleInput} value={addOrder.payS} name="payS">
                {/* <option value="" disabled>
                  Select an option
                </option> */}
                <option value="none" selected disabled>
                  Select an Option
                </option>
                <option>Paid</option>
                <option>Unpaid</option>

                {/* <option>Refunded</option>
                <option>Cancelled</option> */}
              </select>
              <label>Rider</label>
              <select
                onChange={handleInput}
                value={addOrder.rider}
                name="rider"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {rider.map((name) => {
                  console.log(name._id);
                  return (
                    <option key={name._id} value={name.riderName}>
                      {name.riderName}
                    </option>
                  );
                })}
              </select>

              <div className="save-button">
                <button onClick={handleSubmit}>Save</button>
              </div>
            </div>
            <div className="right">
              <label>Product</label>
              <div className="search-add">
                <div className="search-product">
                  <Input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Product"
                  />
                </div>
                <div
                  className="search-drop"
                  style={search ? { display: "block" } : { display: "none" }}
                >
                  {data.map((dataT) => {
                    return (
                      <div
                        key={dataT._id}
                        className="droprow"
                        onClick={() => addProduct(dataT._id)}
                      >
                        {dataT.productName}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="product-table">
                <table>
                  <thead>
                    <tr>
                      <th>Items</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Sub total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((dataT) => {
                      return (
                        <>
                          <tr key={dataT._id}>
                            <td>
                              <img
                                src="{dataT.image}"
                                alt=""
                                height="100px"
                                width="100px"
                              />
                            </td>
                            <td>
                              <div className="desc-col">
                                <div>{dataT.productName}</div>
                                <div>{dataT.stock}</div>
                              </div>
                            </td>
                            <td>Rs. {dataT.rate}</td>
                            <td>
                              <div className="qty-col">
                                <button
                                  className="mbtn"
                                  onClick={(e) => MinusQty(e, dataT._id)}
                                >
                                  -
                                </button>
                                <span>{dataT.quantity}</span>
                                <button
                                  className="pbtn"
                                  onClick={(e) => PlusQty(e, dataT._id)}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td>Rs. {dataT.rate * dataT.quantity}</td>
                            <td className="trashcan">
                              <button onClick={(e) => DeleteId(e, dataT._id)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  fill="none"
                                >
                                  <path
                                    stroke="#FF3434"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3.984 6.133h18M19.984 6.133v14a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-14m3 0v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10.984 11.133v6M14.984 11.133v6"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddOrder;
