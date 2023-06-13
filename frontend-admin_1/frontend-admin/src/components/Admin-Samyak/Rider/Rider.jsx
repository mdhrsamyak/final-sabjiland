import React, { useEffect, useState } from "react";
import Top from "../Rider/Top";
import Table from "./Table";
import RiderAdd from "./RiderAdd";
import RiderEdit from "./RiderEdit";
import axios from "axios";

function Rider() {

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [editId, setEditId] = useState("");
    const [refresh, setRefersh] = useState(false);

    function ToggleShow() {
        setShowAdd((prevValue) => !prevValue);
    }
    function ToggleEdit() {
        setShowEdit((prevValue) => !prevValue);
    }
    function RefreshC() {
        setRefersh((prevV) => !prevV)
    }

    return (
        <div className="main-container">
            <div className="order-content">
                <Top
                    title="Rider Details"
                    ToggleShow={ToggleShow}
                />
                <Table ToggleEdit={ToggleEdit} setId={setEditId} refresh={refresh} RefreshC={RefreshC} />
            </div>
            <RiderAdd showAdd={showAdd} ToggleShow={ToggleShow} RefreshC={RefreshC} />
            <RiderEdit showEdit={showEdit} ToggleEdit={ToggleEdit} id={editId} RefreshC={RefreshC} />
        </div>
    );
}

export default Rider;