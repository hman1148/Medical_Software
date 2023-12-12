import React from "react";
import { Modal } from "@mui/material";
import makeRequest from "./Utils/make_request";


const ModalComponent = ({open, onClose, children}) => {
    return (
        <Modal open={open} onClose={onClose}>
            {children}
        </Modal>
    )
}


export default ModalComponent;