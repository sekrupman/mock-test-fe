import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import '../App.css';

// IMPORT API
import { RegisterApi } from '../api/register'
function Register() {
  const [usernameExists, setUsernameExists] = useState(false);
  const [inputs, setInputs] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      if (!inputs.username || !inputs.pin || !inputs.confirm_pin) {
        setShowAlert(true)
        setAlertMessage('ISI SEMUA DATA!')
      if(inputs.pin!==inputs.confirm_pin){
        setShowAlert(true)
        setAlertMessage('PIN TIDAK SAMA')
      }
        return
      }
      setIsLoading(true);

      const result = await RegisterApi(inputs);
      // console.log('API Response:', result);

          if (result && result.message) {
            setAlertMessage(result.message);
          } else {
            setAlertMessage('Registration failed');
          }

          setShowAlert(true);

      if (result && result.status === 'success') {
        setAlertMessage(result.message || 'Registration success');
        setShowAlert(true);
        window.location.replace('/login');
        setIsLoading(false);
      } else {
        // Registration failed, set an alert message
        setAlertMessage(result.message || 'Registration failed');
        setShowAlert(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setAlertMessage('Internal server error');
      setShowAlert(true);
      setIsLoading(false);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Register Page</h2>
        <div className="form">
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Username"
                type="text"
                value={inputs.username || ''}
                onChange={handleChange}
                required
              />
              {/* {usernameExists && (
                <p style={{ color: 'red' }}>Username already exists. Please choose a different one.</p>
              )} */}
            </FormGroup>
            <FormGroup>
              <Label for="pin">Kode PIN<div style={{ fontSize: '10px' }}>Masukkan 6 angka</div></Label>
              <Input
                id="pin"
                name="pin"
                placeholder="Kode Pin"
                type="password"
                inputMode="numeric"
                value={inputs.pin || ''}
                onChange={handleChange}
                required
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, '');
                  if (e.target.value.length > 6) {
                    e.target.value = e.target.value.slice(0, 6);
                  }
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirm_pin">Konfirmasi Kode PIN<div style={{ fontSize: '10px' }}>Masukkan 6 angka</div></Label>
              <Input
                id="confirm_pin"
                name="confirm_pin"
                placeholder="Kode Pin"
                type="password"
                inputMode="numeric"
                value={inputs.confirm_pin || ''}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, '');
                  if (e.target.value.length > 6) {
                    e.target.value = e.target.value.slice(0, 6);
                  }
                }}
              />
            </FormGroup>
          </Form>
          <span>
            <a href="/">
              <Button style={{ backgroundColor: '#62b0f2' }}>Back</Button>
            </a>
            <Button
              type="submit"
              onClick={handleSubmit}
              style={{ backgroundColor: '#62b0f2', marginLeft: '1rem' }}
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" color="light" /> : 'Sign Up'} {/* Show Spinner when isLoading is true */}
            </Button>
          </span>
          {showAlert && (
            <p style={{ color: 'red' }}>{alertMessage}</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default Register;
