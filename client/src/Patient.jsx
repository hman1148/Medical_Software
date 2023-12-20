import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import {Card, CardContent, Typography, Grid, Button} from "@mui/material";


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


    useEffect(() => {
        getPatient();
    }, [params.id]);

    if (!patient) {
        return <span className="loader"></span> // add loader here 
    }

    return (
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
                            Cost of Reimbursement
                        </Typography>
                        <Typography variant="body2">
                            {patient.cost_of_reimbursement}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <Button style={{background: "#54B4D3", width: '60px', height: '40px', color: 'white', margin: "15px"}} onClick={() => navigate(-1)}>Back</Button>
        </Card>
        </div>
    )
}

export default Patient;