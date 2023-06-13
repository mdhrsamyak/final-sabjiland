import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

function ButtonT(props) {
  const [drop, setdrop] = useState(false);

  function dropControl() {
    setdrop((prevV) => !prevV);
  }

  function ClickView(id) {
    dropControl();
    props.showView(id);
    console.log(`btn toogle ${id}`);
  }

  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setdrop(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function deleteClick() {
    props.deleteO(props.id);
  }

  return (
    <td className="no-border">
      <button className="drop" ref={buttonRef} onClick={dropControl}>
        <BsThreeDotsVertical />
      </button>
      <div
        className="dropdown"
        style={drop ? { display: "flex" } : { display: "none" }}
      >
        <button
          className="drop-btn"
          onClick={() => {
            props.showEdit(props.id);
          }}
        >
          Edit
        </button>
        <div className="drop-line"></div>
        <button className="drop-btn" onClick={() => ClickView(props.id)}>
          View
        </button>
        <div className="drop-line"></div>
        <button className="drop-btn" onClick={() => props.delOrder(props.id)}>
          Delete
        </button>
      </div>
    </td>
  );
}

export default ButtonT;
