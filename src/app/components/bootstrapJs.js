"use client";

import { useEffect } from "react";

const BootstrapJs = () => {
    useEffect(()=>{
        require("bootstrap/dist/js/bootstrap.min.js");
    },[])
    return(
    <>
    </>
    )
}

export default BootstrapJs