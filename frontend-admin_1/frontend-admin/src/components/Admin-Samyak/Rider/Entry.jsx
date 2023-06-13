import React from "react";
import ButtonT from "./ButtonToggle";
import axios from "axios";

function Entry(props) {

    function delRider(id) {
        axios
            .delete(`/deleteRider/:${id}`)
            .catch(err => console.log(err.message));
    }

    function handleEdit(id) {
        props.setId(id);
        props.toggleEdit();
    }

    return (
        <tbody>
            <tr>
                <td><img src={props.image} alt="" height={"100px"} width={"100px"} /></td>
                <td>{props.uname}</td>
                <td>{props.contact}</td>
                <td>{props.address}</td>
                <td>{props.email}</td>
                <td className="editBtn"><button onClick={() => handleEdit(props.id)}>Edit</button></td>
                <td className="delBtn" onClick={() => delRider(props.id)}><button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path stroke="#FF3434" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" /></svg></button></td>
            </tr>
        </tbody>
    );
}

export default Entry;