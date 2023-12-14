import { useState, createPortal, useEffect } from "react"
import {TableContainer, Paper, TableHead, TableCell, TableBody, TableRow, Button, Table, Container} from "@mui/material";
import { Link } from "react-router-dom";
import makeRequest from "./Utils/make_request";
import "./public/central.css";

let Central = () => {
    const [patients, setPatients] = useState([]);
    const [patientData, setPatientData] = useState([]);

    useEffect(() => {
        const fetchPatients = async (e) => {
            e.preventDefault;
           const data = await makeRequest("/all_patients", "get");
            console.log(data);
            setPatients(data);
        }
        fetchPatients();

    }, [])

    return (
        <>
        <div className="container">
        <Container maxWidth="sm">
        <Button className="button"><Link to="/central/create_patient_page">Add Patient</Link></Button>
        <TableContainer component={Paper} className="tableContainer">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Patient ID</TableCell>
                        <TableCell>Patient Name</TableCell>
                        <TableCell>Patient Email</TableCell>
                        <TableCell>Patient Address</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {patients.length > 0 ? (patients.map((patient) => (
                        <Link to={`/edit_patient/${patient.id}`}><TableRow key={patient.id}>
                            <TableCell>{patient.name}</TableCell>
                            <TableCell>{patient.email}</TableCell>
                            <TableCell>{patient.address}</TableCell>
                            <TableCell>
                                <Button>Edit Patient</Button>
                                <Link to={`/delete_patient/${patient.id}`}><Button>Delete Patient</Button></Link>
                            </TableCell>
                        </TableRow>
                        </Link>
                    ))): (
                    <TableRow>
                        <TableCell colSpan={4}>No patients available</TableCell>
                    </TableRow>
                    )
                    }
                </TableBody>
            </Table>
        </TableContainer>
        </Container>
    </div>
    </>
    )
}

export default Central;