import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import {Card, CardContent, Typography, Grid, Button} from "@mui/material";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


let Patient = () => {
    const [patient, setPatient] = useState(null);

    const params = useParams();
    const navigate = useNavigate();

    let getPatient = async () => {
        try {
            const response = await fetch(`/patient/${params.id}`, {
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error("Network response was bad");
            }

            const data = await response.json();

            if (data.patient) {
                setPatient(data.patient);
            } else {
                throw new Error("Patient not found");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleFormat = (oldFormat) => {
        const date = new Date(oldFormat);
        const options = {year: 'numeric', month: 'long', day: 'numeric'}
        return date.toLocaleDateString('en-US', options);
    }

    const printReport = async () => {
        try {
            const response = await fetch(`/print_log/${patient.id}`, {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error("Network response was bad");
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `${patient.name}_report.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
            a.remove();
            
            toast.success(`Successfully downloaded ${patient.name}'s report`);
        } catch (error) {
            toast.error(`Couldn't download ${patient.name}'s report`)
            console.log(error);
        }
    }


    useEffect(() => {
        getPatient();
    }, [params.id]);

    if (!patient) {
        return <span className="loader"></span> // add loader here 
    }

    return (
        <>
        <ToastContainer position="top-right" autoClose={2000} style={""} />
        <div className="form-background">
        <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {patient.name}'s Information
                </Typography>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Name
                        </Typography>
                        <Typography variant="body2">
                            {patient.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Address
                        </Typography>
                        <Typography variant="body2">
                            {patient.address}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Email
                        </Typography>
                        <Typography variant="body2">
                            {patient.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Birthday
                        </Typography>
                        <Typography variant="body2">
                            {handleFormat(patient.birthday)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Phone Number
                        </Typography>
                        <Typography variant="body2">
                            {patient.phone_number}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Primary Insurance 
                        </Typography>
                        <Typography variant="body2">
                            {patient.primary_insurance}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Secondary Insurance
                        </Typography>
                        <Typography variant="body2">
                            {patient.secondary_insurance}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Date of Fitting
                        </Typography>
                        <Typography variant="body2">
                            {handleFormat(patient.date_of_fitting)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Warranty Expiration
                        </Typography>
                        <Typography variant="body2">
                            {handleFormat(patient.warranty_expiration)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Cost of Hearing Aid
                        </Typography>
                        <Typography variant="body2">
                            ${patient.cost_of_hearing_aid}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <div className="button-container">
                <Button style={{
                        background: "#54B4D3",
                        minWidth: '150px', 
                        padding: '10px 20px', 
                        height: '60px',
                        color: 'white',
                        marginLeft: "15px",
                        marginRight: "150px"}}
                         onClick={() => navigate(-1)}
                         >Back
                </Button>
                <Button style={{
                        background: "#54B4D3",
                        minWidth: '150px', 
                        padding: '10px 20px', 
                        height: '60px',
                        color: 'white',
                        marginRight: "15px"}} 
                        onClick={printReport}
                        >Download {patient.name}'s Report
                </Button>
            </div>
        </Card>
        </div>
        </>
    )
}

export default Patient;