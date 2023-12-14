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

    useEffect(() => {
        getPatient();
    }, [params.id]);

    if (!patient) {
        return <h1>Loading Patient</h1> // add loader here 
    }

    return (
        <div className="form-background">
        <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Patient Details
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
                            Address
                        </Typography>
                        <Typography variant="body2">
                            {patient.birthday}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Address
                        </Typography>
                        <Typography variant="body2">
                            {patient.phone_number}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Address
                        </Typography>
                        <Typography variant="body2">
                            {patient.primary_insurance}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Address
                        </Typography>
                        <Typography variant="body2">
                            {patient.secondary_insurance}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Address
                        </Typography>
                        <Typography variant="body2">
                            {patient.date_of_fitting}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Address
                        </Typography>
                        <Typography variant="body2">
                            {patient.warranty_expiration}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Address
                        </Typography>
                        <Typography variant="body2">
                            {patient.cost_of_reimbursement}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <Button style={{background: "#54B4D3", width: '60px', height: '40px', color: 'white'}} onClick={() => navigate(-1)}>Back</Button>
        </Card>
        </div>
    )
}

export default Patient;