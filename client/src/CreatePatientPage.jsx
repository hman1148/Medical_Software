import { Button, Stack, TextField } from "@mui/material";
import React, { useState, createPortal, useEffect } from "react"
import makeRequest from "./Utils/make_request";
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { parseCookie } from "./Utils/parseCookie";

let CreatePatientPage = () => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [primaryInsurance, setPrimaryInsurance] = useState('');
    const [secondaryInsurance, setSecondaryInsurance] = useState('');
    const [dateOfFitting, setDateOfFitting] = useState('');
    const [warrantyExpiration, setWarrantyExpiration] = useState('');
    const [costOfReimbursement, setConstOfReimbursement] = useState('');
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = {
            name,
            address,
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
                "X-CSRFToken": parseCookie()
            },
            body: JSON.stringify(requestBody),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP Error. Response: ${response.status}`);
        }
        let responseData = await response.json();

        if (responseData.message === "success") {
            toast.success("Added Patient!")
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
        <h2>Add a new Patient</h2>
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
            <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
                <Stack spacing={2} direction="row">
                    <TextField
                        variant="outlined"
                        name="name"
                        color="secondary"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        inputProps={{ maxLength: 100 }}
                    />
                    <TextField
                        label="Address"
                        name="address"
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        multiline
                    />
                </Stack>

                <Stack spacing={2} direction="row">
                    <TextField
                        label="Phone Number"
                        name="phone_number"
                        variant="outlined"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        inputProps={{ maxLength: 10 }}
                    />
                    <TextField
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
                        label="Primary Insurance"
                        name="primary_insurance"
                        variant="outlined"
                        value={primaryInsurance}
                        onChange={(e) => setPrimaryInsurance(e.target.value)}
                    />
                    <TextField
                        label="Secondary Insurance"
                        name="secondary_insurance"
                        variant="outlined"
                        value={secondaryInsurance}
                        onChange={(e) => setSecondaryInsurance(e.target.value)}
                    />
                </Stack>
                <Stack spacing={2} direction="row">
                    <TextField
                        label="Date of Fitting"
                        name="date_of_fitting"
                        type="datetime-local"
                        variant="outlined"
                        value={dateOfFitting}
                        onChange={(e) => setDateOfFitting(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
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
                        label="Cost of Reimbursement"
                        name="cost_of_reimbursement"
                        type="number"
                        variant="outlined"
                        value={costOfReimbursement}
                        onChange={(e) => setConstOfReimbursement(e.target.value)}
                    />
                </Stack>

                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Stack>
        </form>
    </React.Fragment>
    )
}

export default CreatePatientPage;