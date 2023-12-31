import { useState, useEffect } from "react"
import {TableContainer, Pagination, Paper, TableHead, TableCell, TableBody, TableRow, Button, Table, Container} from "@mui/material";
import { Link } from "react-router-dom";
import "./public/central.css";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./Nav";

let Central = () => {
    const [patients, setPatients] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuerry, setSearchQuery] = useState('');


    // make a delete function to call fetch then put the functon in the onclick listener for the delete button
    let deletePatient = async (id) => {
        try {
            setIsDeleted(false);
            const response = await fetch(`/delete_patient/${id}`, {
                credentials: 'include'
            });

            if (!response.ok) {
                toast.error("Error from server " + response.status);
                throw new Error("Network Error");
            }
            const deletedData = await response.json();

            if (deletedData.message == "success") {
                setIsDeleted(true);
                toast.success("Patient was successfully deleted")
            } else {
                toast.error("Patient wasn't deleted")
            }

        } catch (error) {
            toast.error(`Error: ${error}`)
        }
    }

    useEffect(() => {
        const fetchPatients = async () => {
                const searchParam = searchQuerry ? `search=${searchQuerry}` : ``;
                const pageParam = `page=${currentPage}`;

                try {
                    const response = await fetch(`/all_patients?${searchParam}&${pageParam}`, {
                        credentials: 'include'
                    });
                    
                    if (!response.ok) {
                        throw new Error("Network Error");
                    }
                    const data = await response.json();

                    if (data.patients) {
                        setPatients(data.patients);
                        setTotalPages(data.total_pages)
                    } else {
                        throw new Error("Patient not found");
                    }
                } catch (error) {
                    console.log(error.message);
                }
        }
        fetchPatients();
    }, [searchQuerry, currentPage, isDeleted])

    return (
        <>
        <ToastContainer position="top-right" autoClose={2000} style={""}/>
        <div className="nav">
            <Nav  />
        </div>

        <div className="main-content">
        <Container maxWidth="md">

        <div className="button-container">
            <input 
            className="material-ui-search-bar"
             type="text"
             value={searchQuerry} onChange={(e) => setSearchQuery(e.target.value)} 
             placeholder="Search patients..." 
             />
        </div>

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
                        <TableRow className="row-size" key={patient.id}>
                            <TableCell>{patient.id}</TableCell>
                            <TableCell>{patient.name}</TableCell>
                            <TableCell>{patient.email}</TableCell>
                            <TableCell>{patient.address}</TableCell>
                            <TableCell>
                                <div className="button-container">
                                    <Link to={`/patient/${patient.id}`}><Button className="button-size" style={{background: "#14A44D", color: "white"}}>View Info</Button></Link>
                                    <Link to={`/edit_patient/${patient.id}`}><Button className="button-size" style={{background: "#f0ad4e", color: "white"}}>Edit Patient</Button></Link>
                                    <Button onClick={() => deletePatient(patient.id)} className="button-size" style={{background: "#d9534f", color: "white"}}>Delete Patient</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))): (
                    <TableRow>
                        <TableCell colSpan={4}>No Patients Available</TableCell>
                    </TableRow>
                    )
                    }
                </TableBody>
            </Table>
        </TableContainer>
        <Pagination 
        count={totalPages}
         page={currentPage}
         onChange={(event, page) => setCurrentPage(page)}
         color="primary"
         />
        </Container>
    </div>
    </>
    )
}

export default Central;