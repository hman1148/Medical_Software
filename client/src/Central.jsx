import { useState, createPortal, useEffect } from "react"
import TableRowComponent from "./TableRowComponent";
import ModalComponent from "./ModalComponent";
import { Container, Grid, TextField, Typography, TableContainer, Paper, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import { DatePicker } from "@mui/lab";
import makeRequest from "./Utils/make_request";

let Central = () => {
    const [results, setResults] = useState([]);
    const[selectedRow, setSelectedRow] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const [patients, setPatients] = useState([]);
    const [patientData, setPatientData] = useState({
        name: '',
        address: '',
        email: '',
        birthday: null,
        phone_number: '',
        primary_insurance: '',
        secondary_insurance: '',
        date_of_fitting: '',
        warrenty_expiration: '',
        cost_of_reimbursement: 0
    });


    const createPatientHandler = (event) => {
        const {name, value} = event.target;
        setPatientData({...patientData, [name]: value});
    }

    const createDateHandler = (date, dateField) => {
        const formattedDate = date ? format(date, 'yyyy-MM-dd'): '';
        setPatientData({...patientData, [dateField]: formattedDate});
    }  

// GRab all the patients on initial load
    useEffect(async () => {
         setPatients(await makeRequest("/all_patients", "get"));
    }, [])

    return (
        <>
            <button>Add Patient</button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Patient ID</TableCell>
                                <TableCell>Patient Name</TableCell>
                                <TableCell>Patient Email</TableCell>
                                <TableCell>Patient Address</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {patients.map((patient) => {
                            <TableRow key={patient.id}>
                                <TableCell>{patient.name}</TableCell>
                                <TableCell>{patient.email}</TableCell>
                                <TableCell>{patient.address}</TableCell>
                                <button>Edit Patient</button>
                                <button>Delete Patient</button>
                            </TableRow>
                        })};
                        </TableBody>
                    </Table>
                </TableContainer>    
        </>
    )
}

export default Central;