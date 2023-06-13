import React, { useEffect, useState } from "react";
import Top from "./Top";
import Table from "./Table";
import AddPopUp from "./AddPopUp";
import "./admin.css";
import EditPopUp from "./EditPopUp";

function Admin() {

    const [adminAdd, setAdminAdd] = useState(false);
    const [adminEdit, setAdminEdit] = useState(false);
    const [editId, setEditId] = useState("");
    const [refresh, setRefersh] = useState(false);

    useEffect(() => console.log(editId), [editId])

    function showAdd() {
        setAdminAdd((prevValue) => !prevValue);
    }

    function showEdit() {
        setAdminEdit((prevValue) => !prevValue);
    }

    function RefreshC() {
        setRefersh((prevV) => !prevV)
    }

    return (
        <>
            <div className="main-container">
                <div className="order-content">
                    <Top title="Admin" showAdd={showAdd} />
                    <Table
                        showEdit={showEdit}
                        setId={setEditId}
                        RefreshC={RefreshC}
                        refresh={refresh}
                    />
                </div>
                <AddPopUp pop={adminAdd} showAdd={showAdd} RefreshC={RefreshC} />
                <EditPopUp pop={adminEdit} showEdit={showEdit} id={editId} RefreshC={RefreshC} />
            </div>
        </>
    );

}

export default Admin;