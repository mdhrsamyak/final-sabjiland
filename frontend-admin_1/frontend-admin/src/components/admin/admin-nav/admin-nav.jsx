// import Img from "./components/admin/img";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdSpaceDashboard,
  MdOutlinePayments,
  MdOutlineRateReview,
  MdOutlineDirectionsBike,
} from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaCubes, FaUserAlt, FaUserTie } from "react-icons/fa";
import { AiOutlineFileDone, AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";
import Navitem from "./navitem";
import Img from "../img";

export default function AdminNav(props) {
  const capitalize = (name) => {
    if (name.includes(" ")) {
      // Full name case
      var names = name?.split(" ");
      var capitalizedNames = names.map(function (name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
      });
      return capitalizedNames.join(" ");
    } else {
      // Camel case case
      var words = name.split(/(?=[A-Z])/);
      var capitalizedWords = words.map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
      return capitalizedWords.join(" ");
    }
  };

  console.log(props.username);
  const userName = capitalize(props.username);

  const role = capitalize(props.role);
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();
  const ref = useRef();
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle(!toggle);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setToggle(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div>
      <button className="ham-admin" onClick={() => setToggle(!toggle)}>
        <GiHamburgerMenu />
      </button>
      <nav className={`admin-nav ${toggle ? "nav-toggle" : ""}`} ref={ref}>
        <div className="nav-close">
          <span
            onClick={() => {
              setToggle(false);
            }}
          >
            <AiOutlineClose />
          </span>
        </div>
        <div className="profile-details">
          {/* <Img src="./images/profile.png" class="profile" /> */}
          <Img
            src={process.env.PUBLIC_URL + "/images/profile.png"}
            class="profile"
          />
          <div>
            <h2>{userName}</h2>
            <p>{role}</p>
          </div>
        </div>

        <div className="nav-content">
          <ul>
            <Navitem
              click={() => {
                handleToggle();
              }}
              to="/admin"
            >
              <MdSpaceDashboard /> Dashboard
            </Navitem>
            <Navitem
              click={() => {
                handleToggle();
              }}
              to="/admin/homepage"
            >
              <BiHomeAlt /> Home Page
            </Navitem>
            <Navitem
              click={() => {
                handleToggle();
              }}
              to="/admin/categories"
            >
              <TfiMenuAlt /> Categories
            </Navitem>
            <Navitem
              click={() => {
                handleToggle();
              }}
              to="/admin/products"
            >
              <FaCubes /> Products
            </Navitem>
            <Navitem
              click={() => {
                handleToggle();
              }}
              to="/admin/customerdetails"
            >
              <FaUserAlt /> Customer Details
            </Navitem>
            <Navitem
              click={() => {
                handleToggle();
              }}
              to="/admin/orderdetails"
            >
              <AiOutlineFileDone /> Order Details
            </Navitem>
            {/* <Navitem
              click={() => {
                handleToggle();
              }}
              to="/admin/payment"
            >
              <MdOutlinePayments /> Payment Details
            </Navitem> */}
            <Navitem
              click={() => {
                handleToggle();
              }}
              to="/admin/reviews"
            >
              <MdOutlineRateReview /> Reviews
            </Navitem>
            <Navitem
              click={() => {
                handleToggle();
              }}
              to="/admin/admin2"
            >
              <FaUserTie /> Admin Details
            </Navitem>
            <Navitem
              click={() => {
                handleToggle();
              }}
              to="/admin/riderdetails"
            >
              <MdOutlineDirectionsBike /> Rider Details
            </Navitem>
          </ul>
        </div>
      </nav>
    </div>
  );
}
