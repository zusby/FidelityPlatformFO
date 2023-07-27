import React, { useState } from 'react';

import { Container, CssBaseline, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, Link, Autocomplete, Alert } from '@mui/material';
import './userTable.css'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { auth } from '../FireBase'
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegistrationForm() {
  const mapsAPIkey = "AIzaSyD_GPKVAAKbp1teq9Juu_pWefE7bWcG7Yg";
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    telephoneNumber: '',
    email: '',
    password: '',
    address: {
      street: '',
      zipCode: '',
      city: '',
      province: ''
    },
    birthDate: '',
    rank: 'CUSTOMER'
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };

    // Handle nested properties (address) separately
    if (name.startsWith("address.")) {
      const nestedProp = name.split(".")[1];
      updatedFormData.address[nestedProp] = value;
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
  };
  const handleDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      birthDate: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.address.street = address.value.structured_formatting.main_text;
    formData.birthDate = date;

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredencial) => {
        const user = userCredencial.user;
        if (user !== null) {
          registerUser(formData)
          this.handleCloseModal();
          
        }
      })
      .catch((error) => console.log(error));
    
    console.log(formData)
  };

  function registerUser(user) {
    fetch(`http://localhost:8080/api/v1/customer/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(user),
      }).catch((error) => console.error(error));
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="surname"
                label="Surname"
                name="surname"
                autoComplete="family-name"
                value={formData.surname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="telephoneNumber"
                label="Telephone Number"
                type="tel"
                id="telephoneNumber"
                autoComplete="tel"
                value={formData.telephoneNumber}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth
                required>
                <DatePicker
                  label="Birthday"
                  required
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  slotProps={{
                    textField: { variant: 'outlined', fullWidth: true }
                  }}
                  format="dd/MM/yyyy"
                  autoFocus={true}
                />
              </LocalizationProvider>
            </Grid>


            <Grid item xs={12} sm={6} >
              <GooglePlacesAutocomplete
                selectProps={{
                  className: 'autocomplete',
                  address,
                  onChange: setAddress,
                  styles: {

                    container: (provided) => ({
                      ...provided,
                      flex: 1, // Add this to ensure the autocomplete fills the available space
                    }),
                    input: (provided) => ({
                      ...provided,
                      width: '100%',
                      height: '100%',
                      padding: '10px',
                      fontSize: '16px',
                      zIndex: 9999,
                      color: 'blue',
                      border: 'none', // Remove the border
                      boxShadow: 'none', // Remove the box shadow

                    }),
                    option: (provided) => ({
                      ...provided,
                      color: 'blue',
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: 'blue',
                    }),
                  },
                }}
                apiOptions={{ language: 'it', region: 'it', type: 'address' }}
                apiKey={mapsAPIkey}
              />
            </Grid>
            <Grid item xs={12} sm={6}>

              <TextField
                required
                fullWidth
                id="zipCode"
                label="Zip Code"
                name="address.zipCode"
                autoComplete="postal-code"
                value={formData.address.zipCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="city"
                label="City"
                name="address.city"
                autoComplete="address-level2"
                value={formData.address.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="province"
                label="Province"
                name="address.province"
                autoComplete="address-level1"
                value={formData.address.province}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}