import { useState, createPortal, useEffect } from "react"
import {TableContainer, Paper, TableHead, TableCell, TableBody, TableRow, Button, Table, Container} from "@mui/material";
import { Link } from "react-router-dom";
import "./public/central.css";

let Central = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
                try {
                    const response = await fetch(`/all_patients`);
                    
                    if (!Response.ok) {
                        throw new Error("Network response was bad");
                    }
                    const data = await response.json();
                    console.log(data); // this might be wrong 

                    if (data.patients) {
                        setPatients(data.patient);
                    } else {
                        throw new Error("Patient not found");
                    }
                } catch (error) {
                    console.log(error.message);
                }
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
                                <Link to={`/edit_patient/${patient.id}`}><Button style={{background: "#f0ad4e", color: "white"}}>Edit Patient</Button></Link>
                                <Link to={`/delete_patient/${patient.id}`}><Button style={{background: "#d9534f", color: "white"}}>Delete Patient</Button></Link>
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