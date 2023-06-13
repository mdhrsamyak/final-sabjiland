import React, { useState } from "react";
import Input from "../Order/Input";

function DisImg() {

    const [file, setFile] = useState([]);

    function handleChange(e) {
        let sel = URL.createObjectURL(e.target.files[0]);
        setFile(prevV => [
            ...prevV, sel
        ]);
    }

    return (
        <>
            <Input type="file" onChange={handleChange}>Choose file</Input>
            {/* {
                file.map(() => {
                    return <img src={file} alt="documents" height="50px" width="50px" />
                })
            } */}
            {file.map((url, index) => {
                return <img src={url} key={index} alt="documents" height="50px" width="50px" />
            })
            }
        </>
    );
}

export default DisImg;