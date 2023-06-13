import Table from "../../table/Table";
import AddProducts from "../addProducts";
import { useEffect, useState, useLayoutEffect, useMemo } from "react";
import AddBestSellers from "../update/addBestSellers";
import { IoAddCircleOutline } from "react-icons/io5";
import axios from "axios";
import TableHead from "../../table/TableHead";
import TableBody from "../../table/TableBody";

export default function BestSellers() {
  // const [datas, setData] = useState([]);
  const columns = [
    { label: "", accessor: "image", sortable: false },
    { label: "Product", accessor: "productName", sortable: true },
    { label: "Rate", accessor: "rate", sortable: true },
    { label: "Discount", accessor: "discount", sortable: true },
    { label: "Stock", accessor: "stock", sortable: true },
    { label: "Unit", accessor: "unitType", sortable: false },
    { label: "Created Date", accessor: "createdAt", sortable: true },
  ];
  const [urlData, setUrlData] = useState("getAllBestSeller");
  const [nepaliName, setNepaliName] = useState("");
  const [img, setImg] = useState("");
  const [id, setId] = useState();
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState();
  const [rate, setRate] = useState();
  const [family, setFamily] = useState("");
  const [category, setCategory] = useState("");
  const [packages, setPackages] = useState("");
  const [type, setType] = useState("");
  const [organic, setOrganic] = useState("");
  const [edible, setEdible] = useState("");
  const [desc, setDesc] = useState();

  const url = `http://localhost:4000/api/v1/${urlData}`;
  const [refresh, setRefresh] = useState(false);
  const [productId, setProductId] = useState();
  const [products, setProducts] = useState([]);

  const toggleRefresh = () => {
    setRefresh(!refresh);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setProductId(json.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/getProducts`
      );
      setProducts(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  // useEffect(() => {}, [refresh]);

  useEffect(() => {
    fetchData();
    fetchProducts();
  }, [refresh]);

  const data = products?.filter((product) =>
    productId?.some((entity) => entity._id === product._id)
  );

  useEffect(() => {
    preFilled(id);
    console.log(id);
  }, [id]);

  const preFilled = (sno) => {
    setId(sno);
    console.log(data);
    let item = data?.find((entry) => entry._id === sno);
    console.log(item?.crossedPrice);
    setImg(item?.image);
    setName(item?.productName);
    setNepaliName(item?.nepaliName);
    setUnit(item?.unit);
    setDiscount(item?.crossedPrice);
    setStock(item?.stock);
    setRate(item?.rate);
    setFamily(item?.family);
    setPackages(item?.package);
    setType(item?.type);
    setOrganic(item?.organic);
    console.log("o", item?.organic);
    setEdible(item?.edibleType);
    setCategory(item?.category);
    setDesc(item?.productDescription);
  };

  const toggleAdd = () => {
    setAdd(true);
  };
  const toggleUpdate = () => {
    setUpdate(true);
  };

  const close = (e) => {
    setUpdate(e);
  };

  return (
    <div>
      <div className={add || update ? "dim-bg" : ""}></div>
      <h2 className="admin-title">Best Sellers</h2>
      {/* <Table /> */}

      <div className="bestseller-btn-container">
        <button onClick={toggleAdd} className={`btns-add-bestseller btns-add`}>
          Add Products{" "}
          <span className="btns-add-icon">
            <IoAddCircleOutline />
          </span>
        </button>
      </div>

      {add ? (
        <>
          <AddBestSellers
            totalData={data}
            col={columns}
            close={() => {
              setAdd(false);
            }}
            toggleRefresh={toggleRefresh}
          />
        </>
      ) : (
        ""
      )}
      {update ? (
        <div>
          <AddProducts
            name={name}
            nepaliName={nepaliName}
            unit={unit}
            image={img}
            discount={discount}
            stock={stock}
            price={rate}
            family={family}
            category={category}
            packages={packages}
            organic={organic}
            edible={edible}
            type={type}
            id={id}
            desc={desc}
            call="PUT"
            close={close}
            url={url}
            toggleRefresh={toggleRefresh}
          />
        </div>
      ) : (
        ""
      )}

      <div className="table-container">
        <table className="react-table">
          <TableHead columns={columns} />
          <TableBody
            tableData={data}
            update={toggleUpdate}
            delUrl="deleteBestSeller"
            preFilled={preFilled}
            columns={columns}
            toggleRefresh={toggleRefresh}
          />
        </table>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";

// function TableHead({ headers }) {
//   return (
//     <thead>
//       <tr>
//         {headers?.map((header) => (
//           <th key={header}>{header}</th>
//         ))}
//       </tr>
//     </thead>
//   );
// }

// function TableBody({ data, start, end }) {
//   const slicedData = data.slice(start, end);
//   console.log(end);
//   return (
//     <tbody>
//       {slicedData.map((item) => (
//         <tr key={item.id}>
//           <td>{item.id}</td>
//           <td>{item.name}</td>
//           <td>{item.age}</td>
//           <td>{item.email}</td>
//         </tr>
//       ))}
//     </tbody>
//   );
// }

// export default function BestSellers({
//   headers,
//   rowsPerPage,
//   defaultRowsPerPage,
// }) {
//   const rows = 50;
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [numRows, setNumRows] = useState(rows);
//   console.log(parseInt(numRows));
//   const handleNumRowsChange = (event) => {
//     setNumRows(event.target.value);
//     setCurrentPage(1);
//     console.log(numRows);
//   };

//   const handlePrevPageClick = () => {
//     setCurrentPage((prevPage) => prevPage - 1);
//   };

//   const handleNextPageClick = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   const totalPages = Math.ceil(data.length / numRows);
//   const startIndex = (currentPage - 1) * numRows;
//   const endIndex = startIndex + parseInt(numRows);
//   console.log(endIndex);

//   useEffect(() => {
//     fetch("http://localhost:4004/bestseller")
//       .then((response) => response.json())
//       .then((jsonData) => setData(jsonData));
//   }, []);

//   useEffect(() => {
//     if (numRows > data.length) {
//       setNumRows(data.length);
//     }
//   }, [numRows, data]);

//   return (
//     <div>
//       <label htmlFor="rowsPerPage">Rows per page:</label>
//       <select id="rowsPerPage" onChange={handleNumRowsChange} value={numRows}>
//         {rowsPerPage?.map((num) => (
//           <option key={num} value={num}>
//             {num}
//           </option>
//         ))}
//       </select>
//       <table>
//         <TableHead headers={headers} />
//         <TableBody data={data} start={startIndex} end={endIndex} />
//       </table>
//       <div>
//         <button disabled={currentPage === 1} onClick={handlePrevPageClick}>
//           Previous
//         </button>
//         <span>{currentPage}</span>
//         <button
//           disabled={currentPage === totalPages}
//           onClick={handleNextPageClick}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
