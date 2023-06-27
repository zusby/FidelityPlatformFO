import React from 'react';
import { useState } from 'react';
import './userTable.css';
import {auth} from '../FireBase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import RegistrationForm from './Registration';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";


export default function LoginPage() {

  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[showModal, setShowModal] = useState(false);
  const[userProfile, setUserProfile] = useState({
    "name": "string",
    "surname": "string",
    "telephoneNumber": "string",
    "email": "string",
    "address": {
      "street": "string",
      "zipCode": "string",
      "city": "string",
      "province": "string"
    },
    "birthDate": "",
    "rank": "CUSTOMER",
  })
  
  const handleRegisterClick = () => {
    setShowModal(true);
    console.log(showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
  };

  const SignIn= ()=>{
    signInWithEmailAndPassword(auth,email,password).then((userCredencial)=>{
      const user = userCredencial.user;
      console.log(user);
    }).catch((error)=>{
      console.log(error);
    })
  }




  return (
    
       <Container component="main" maxWidth="xs">
        <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <RegistrationForm/>
        </Box>
      </Modal>
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={SignIn} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              
              <Link href="#" variant="body2" onClick={handleRegisterClick}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        
      </Box>

      
    </Container>
  );
}
  