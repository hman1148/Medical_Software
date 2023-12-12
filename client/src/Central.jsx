import { useState, createPortal, useEffect } from "react"
import {TableContainer, Paper, TableHead, TableCell, TableBody, TableRow, Button, Table } from "@mui/material";
import makeRequest from "./Utils/make_request";

let Central = () => {
    const [patients, setPatients] = useState([]);
    const [patientData, setPatientData] = useState([]);

// Grab all the patients on initial load
    useEffect(() => {
        const fetchPatients = async () => {
           const data = await makeRequest("/all_patients", "get");
            setPatients(data);
        }
        fetchPatients();

    }, [])

    return (
        <>
        <Button>Add Patient</Button>
        <TableContainer component={Paper}>
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
                    {patients.map((patient) => (
                        <TableRow key={patient.id}>
                            <TableCell>{patient.name}</TableCell>
                            <TableCell>{patient.email}</TableCell>
                            <TableCell>{patient.address}</TableCell>
                            <TableCell>
                                <Button>Edit Patient</Button>
                                <Button>Delete Patient</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
    )
}

export default Central;