import { useState, useEffect } from "react";
import {TableContainer, Pagination, Paper, TableHead, TableCell, TableBody, TableRow, Button, Table, Container} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./public/central.css";
import "react-toastify/dist/ReactToastify.css";
import {toast, ToastContainer} from "react-toastify";
import Nav from "./Nav";

const Logs = () => {

    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuerry, setSearchQuery] = useState('');

    const navigate = useNavigate();

useEffect(() => {
    const fetchLogs = async () => {
        const searchParam = searchQuerry ? `search=${searchQuerry}`: ``;
        const pageParam = `page=${currentPage}`;

        try {
            const response = await fetch(`/all_logs?${searchParam}&${pageParam}`, {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error("Network Error");
            }

            const data = await response.json();

            if (data.logs) {
                setLogs(data.logs);
                setTotalPages(data.total_pages);
            } else {
                throw new Error("Logs not found");
            }
        } catch (error) {
            console.log(error.message);
        }

    }
    fetchLogs();
}, [searchQuerry, currentPage]);

return (
    <>
        <ToastContainer position="top-right" autoClose={2000} style={""}/>
        <div className="nav">
            <Nav  />
        </div>

        <div className="main-content">
        <Container maxWidth="md">

        <div className="button-container">
            <Button 
            className="button"
            onClick={() => navigate(-1)}
             style={{backgroundColor: "whitesmoke", border: "0.5px solid grey", boxShadow: ""}}>
                Back to Home
            </Button>
            <input 
            className="material-ui-search-bar 
            " type="text"
             value={searchQuerry} onChange={(e) => setSearchQuery(e.target.value)} 
             placeholder="Search Logs..." 
             />
             <Button>Print Report Of All Patients</Button>

        </div>

        <TableContainer component={Paper} className="tableContainer">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Log ID</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell>Patient</TableCell>
                        <TableCell>Date Of Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logs.length > 0 ? (logs.map((log) => (
                        <TableRow className="row-size" key={log.id}>
                            <TableCell>{log.id}</TableCell>
                            <TableCell>{log.user}</TableCell>
                            <TableCell>{log.action_type}</TableCell>
                            <TableCell>{log.patient}</TableCell>
                            <TableCell>{log.date}</TableCell>
                        </TableRow>
                    ))): (
                    <TableRow>
                        <TableCell colSpan={4}>No Logs Available</TableCell>
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

export default Logs;