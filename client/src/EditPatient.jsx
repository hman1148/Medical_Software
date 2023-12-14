import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cookie from "cookie";

let EditPatient = () => {

    const [currentPatient, setCurrentPatient] = useState(null);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [primaryInsurance, setPrimaryInsurance] = useState('');
    const [secondaryInsurance, setSecondaryInsurance] = useState('');
    const [dateOfFitting, setDateOfFitting] = useState('');
    const [warrantyExpiration, setWarrantyExpiration] = useState('');
    const [costOfReimbursement, setConstOfReimbursement] = useState('');

    const params = useParams();
    let getPatient = async () => {
        try {
            const response = await fetch(`/patient/${params.id}`);
            
            if (!Response.ok) {
                throw new Error("Network response was bad");
            }

            const data = await response.json();
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
            toast.success("Added Patient!")
        } else {
            toast.error("Failed to Add Patient")
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
    }


    useEffect(() => {
        getPatient();
    }, [params.id]);

    if (!patient) {
        return <h1>Loading Patient</h1> // add loader here 
    }

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
                    value={currentPatient.name}
                    onChange={(e) => setName(e.target.value)}
                    inputProps={{ maxLength: 100 }}
                />
                <TextField
                    label="Address"
                    name="address"
                    variant="outlined"
                    value={currentPatient.address}
                    onChange={(e) => setAddress(e.target.value)}
                    multiline
                />
            </Stack>

            <Stack spacing={2} direction="row">
                <TextField
                    label="Phone Number"
                    name="phone_number"
                    variant="outlined"
                    value={currentPatient.phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    inputProps={{ maxLength: 10 }}
                />
                <TextField
                    label="Birthday"
                    name="birthday"
                    type="datetime-local"
                    variant="outlined"
                    value={currentPatient.birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </Stack>

            <Stack spacing={2} direction="row">
                <TextField
                    label="Primary Insurance"
                    name="primary_insurance"
                    variant="outlined"
                    value={currentPatient.primaryInsurance}
                    onChange={(e) => setPrimaryInsurance(e.target.value)}
                />
                <TextField
                    label="Secondary Insurance"
                    name="secondary_insurance"
                    variant="outlined"
                    value={currentPatient.secondaryInsurance}
                    onChange={(e) => setSecondaryInsurance(e.target.value)}
                />
            </Stack>
            <Stack spacing={2} direction="row">
                <TextField
                    label="Date of Fitting"
                    name="date_of_fitting"
                    type="datetime-local"
                    variant="outlined"
                    value={currentPatient.dateOfFitting}
                    onChange={(e) => setDateOfFitting(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Warranty Expiration"
                    name="warranty_expiration"
                    type="datetime-local"
                    variant="outlined"
                    value={currentPatient.warrantyExpiration}
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
                    value={currentPatient.costOfReimbursement}
                    onChange={(e) => setConstOfReimbursement(e.target.value)}
                />
            </Stack>

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Stack>
    </form>
</React.Fragment>



}

export default EditPatient;