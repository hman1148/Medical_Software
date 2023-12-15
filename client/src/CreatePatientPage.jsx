import { Button, Stack, TextField } from "@mui/material";
import React, { useState, createPortal, useEffect } from "react"
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import cookie from "cookie";
import { useNavigate } from "react-router";

let CreatePatientPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [primaryInsurance, setPrimaryInsurance] = useState('');
    const [secondaryInsurance, setSecondaryInsurance] = useState('');
    const [dateOfFitting, setDateOfFitting] = useState('');
    const [warrantyExpiration, setWarrantyExpiration] = useState('');
    const [costOfReimbursement, setCostOfReimbursement] = useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = {
            name,
            address,
            email: email,
            birthday,
            phone_number: phoneNumber,
            primary_insurance: primaryInsurance,
            secondary_insurance: secondaryInsurance,
            date_of_fitting: dateOfFitting,
            warranty_expiration: warrantyExpiration,
            cost_of_reimbursement: costOfReimbursement
        }
        
        try {
            for (let key in requestBody) {
                if (requestBody[key] == '') {
                    toast.error(`Didn't add ${key}`);
                    break;
                }
            }
    
            const response = await fetch("/create_patient", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-CSRFToken": cookie.parse(document.cookie).csrftoken
                },
                body: JSON.stringify(requestBody),
                credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP Error. Response: ${response.status}`); // modify this for the future
        }
        let responseData = await response.json();

        if (responseData.message === "success") {
            toast.success("Added Patient!");
            setTimeout(() => navigate(-1), 3000);
            
        } else {
            toast.error("Failed to Add Patient")
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
    }

    return (
        <React.Fragment>

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
                    <h2>Add a new Patient</h2>

            <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
                <Stack spacing={2} direction="row">
                    <TextField
                        className="textfield-size"
                        variant="outlined"
                        name="name"
                        color="secondary"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        inputProps={{ maxLength: 100 }}
                    />
                    <TextField
                        className="textfield-size"
                        label="Address"
                        name="address"
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        multiline
                    />
                     <TextField
                        className="textfield-size"
                        label="Email"
                        name="email"
                        variant="outlined"
                        value={email}
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
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        inputProps={{ maxLength: 10 }}
                    />
                    <TextField
                        className="textfield-size"
                        label="Birthday"
                        name="birthday"
                        type="datetime-local"
                        variant="outlined"
                        value={birthday}
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
                        value={primaryInsurance}
                        onChange={(e) => setPrimaryInsurance(e.target.value)}
                    />
                    <TextField
                       className="textfield-size"
                        label="Secondary Insurance"
                        name="secondary_insurance"
                        variant="outlined"
                        value={secondaryInsurance}
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
                        value={dateOfFitting}
                        onChange={(e) => setDateOfFitting(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        className="textfield-size"
                        label="Warranty Expiration"
                        name="warranty_expiration"
                        type="datetime-local"
                        variant="outlined"
                        value={warrantyExpiration}
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
                        value={costOfReimbursement}
                        onChange={(e) => setCostOfReimbursement(e.target.value)}
                    />
                </Stack>

                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
                <Button style={{background: "#54B4D3", width: '60px', height: '40px', color: 'white'}} onClick={() => navigate(-1)}>Back</Button>
            </Stack>
        </form>
        </div>
    </React.Fragment>
    )
}

export default CreatePatientPage;