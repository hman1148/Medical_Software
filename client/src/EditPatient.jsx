import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { Button, Stack, TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import cookie from "cookie";


let EditPatient = () => {

    const [currentPatient, setCurrentPatient] = useState(null);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [primaryInsurance, setPrimaryInsurance] = useState('');
    const [secondaryInsurance, setSecondaryInsurance] = useState('');
    const [dateOfFitting, setDateOfFitting] = useState('');
    const [warrantyExpiration, setWarrantyExpiration] = useState('');
    const [costOfReimbursement, setConstOfReimbursement] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    const getPatient = async () => {
        try {
            const response = await fetch(`/patient/${params.id}`, {
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error("Network response was bad");
            }

            const data = await response.json();
            console.log(data);
            if (data.patient) {
                
                setCurrentPatient(data.patient);
            } else {
                throw new Error("Patient not found");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = {
            name,
            address,
            email: email,
            birthday,
            phoneNumber: phoneNumber,
            primaryInsurance: primaryInsurance,
            secondaryInsurance: secondaryInsurance,
            dateOfFitting: dateOfFitting,
            warrantyExpiration: warrantyExpiration,
            costOfReimbursement: costOfReimbursement
        };
        try {
        const response = await fetch("/create_patient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-CSRFToken": cookie.parse(document.cookie).csrftoken
            },
            body: JSON.stringify(requestBody),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP Error. Response: ${response.status}`);
        }
        let responseData = await response.json();

        if (responseData.message === "success") {
            toast.success("Edited Patient!")
        } else {
            toast.error("Failed to Edit Patient")
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}

    const handleFormat = (oldFormat) => {
        const date = new Date(oldFormat);
        return date.toISOString().slice(0, 16);
    }


    useEffect(() => {
        getPatient();
    }, [params.id]);

    if (!currentPatient) {
        return <span className="loader"></span> // add loader here 
    }

    return (
     <>
    <ToastContainer position="top-right" autoClose={2000} style={""}/>
    <div className="form-background">
    <form 
    style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%'
    }}
    onSubmit={handleSubmit}>
            <h2>Edit {currentPatient.name}'s info</h2>
            
        <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
            <Stack spacing={2} direction="row">
                <TextField
                    className="textfield-size"
                    variant="outlined"
                    name="name"
                    color="secondary"
                    label="Name"
                    value={currentPatient.name}
                    onChange={(e) => setName(e.target.value)}
                    inputProps={{ maxLength: 100 }}
                />
                <TextField
                className="textfield-size"
                    label="Address"
                    name="address"
                    variant="outlined"
                    value={currentPatient.address}
                    onChange={(e) => setAddress(e.target.value)}
                    multiline
                />
                 <TextField
                        className="textfield-size"
                        label="Email"
                        name="email"
                        variant="outlined"
                        value={currentPatient.email}
                        onChange={(e) => setEmail(e.target.value)}
                        multiline
                    />
            </Stack>

            <Stack spacing={2} direction="row">
                <TextField
                className="textfield-size"
                    label="Phone Number"
                    name="phone_number"
                    variant="outlined"
                    value={currentPatient.phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    inputProps={{ maxLength: 10 }}
                />
                <TextField
                className="textfield-size"
                    label="Birthday"
                    name="birthday"
                    type="datetime-local"
                    variant="outlined"
                    value={handleFormat(currentPatient.birthday)}
                    onChange={(e) => setBirthday(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </Stack>

            <Stack spacing={2} direction="row">
                <TextField
                className="textfield-size"
                    label="Primary Insurance"
                    name="primary_insurance"
                    variant="outlined"
                    value={currentPatient.primary_insurance}
                    onChange={(e) => setPrimaryInsurance(e.target.value)}
                />
                <TextField
                className="textfield-size"
                    label="Secondary Insurance"
                    name="secondary_insurance"
                    variant="outlined"
                    value={currentPatient.secondary_insurance}
                    onChange={(e) => setSecondaryInsurance(e.target.value)}
                />
            </Stack>
            <Stack spacing={2} direction="row">
                <TextField
                className="textfield-size"
                    label="Date of Fitting"
                    name="date_of_fitting"
                    type="datetime-local"
                    variant="outlined"
                    value={handleFormat(currentPatient.date_of_fitting)}
                    onChange={(e) => setDateOfFitting(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                className="textfield-size"
                    label="Warranty Expiration"
                    name="warranty_expiration"
                    type="datetime-local"
                    variant="outlined"
                    value={handleFormat(currentPatient.warranty_expiration)}
                    onChange={(e) => setWarrantyExpiration(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </Stack>

            <Stack spacing={2} direction="row">
                <TextField
                className="textfield-size"
                    label="Cost of Reimbursement"
                    name="cost_of_reimbursement"
                    type="number"
                    variant="outlined"
                    value={currentPatient.cost_of_reimbursement}
                    onChange={(e) => setConstOfReimbursement(e.target.value)}
                />
            </Stack>

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
            <Button style={{background: "#54B4D3", width: '60px', height: '40px', color: 'white'}} onClick={() => navigate(-1)}>Back</Button>
        </Stack>
    </form>
    </div>
    </>
);
}

export default EditPatient;