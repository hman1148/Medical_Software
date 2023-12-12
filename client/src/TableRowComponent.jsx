import React from "react";
import { TableRow, TableCell } from "@mui/material";

let style = ""; // add row style property here


const TableRowComponent = ({row, onRowClick}) => {
    return (
        <>
        <TableRow onClick={() => onRowClick(row)}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.address}</TableCell>
        </TableRow>
        {createPortal(
        <Modal> {/* Infor */}
            {/* Modal syntax */}

        </Modal>
        , document.body)}

        <button>Edit</button>
        {createPortal(
        <Modal>

        </Modal>
        , document.body)}
        </>    
    )
}

export default TableRowComponent;