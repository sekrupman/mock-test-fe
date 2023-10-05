import React, { useState } from "react";
import { Label, FormGroup, Input, Button, Spinner } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { LoginApi } from "../api/login";

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const [inputs, setInputs] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!inputs.username || !inputs.pin) {
        setShowAlert(true);
        setAlertMessage('PLEASE ENTER YOUR USERNAME AND PIN !');
        return;
      }
      setLoading(true); 
  
      const result = await LoginApi(inputs);
      console.log('API Response:', result);
  
      if (!result) {
        setAlertMessage('INTERNAL SERVER ERROR !!!');
        setShowAlert(true);
      } else if (result.status === 'success') {
        console.log('Login successful:', result);
        localStorage.setItem('userId', result.data.id);
        localStorage.setItem('tokenId', result.data.id);
        localStorage.setItem('tokenUsername', result.data.username);
        window.location.replace(`/api/tasks/${result.data.id}`);
      } else {
        console.log('Login failed:', result.message);
        if (result.message === 'Incorrect username or password') {
          setAlertMessage('Incorrect username or password');
          setShowAlert(true);
        } else {
          setAlertMessage('Invalid username or PIN. Please try again.');
          setShowAlert(true);
        }
      }
    } catch (error) {
      console.error('API Request Error:', error);
      setAlertMessage('Incorrect username or pin');
      setShowAlert(true);
    }
    finally {
      setLoading(false); 
  };
};
  return (
    <div className="App">
      <header className="App-header">
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Username"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="pin">
              Kode PIN<div style={{ fontSize: '10px' }}>Masukkan 6 angka</div>
            </Label>
            <Input
              id="pin"
              name="pin"
              placeholder="Kode Pin"
              type="password"
              inputMode="numeric"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
                if (e.target.value.length > 6) {
                  e.target.value = e.target.value.slice(0, 6);
                }
              }}
              onChange={handleChange}
            />
          </FormGroup>
          <span>
            <Link to="/">
              <Button style={{ backgroundColor: '#62b0f2' }}>Back</Button>
            </Link>
            <Button
              type="submit"
              style={{ backgroundColor: '#62b0f2', marginLeft: '1rem' }}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" color="light" /> : 'Login'}
            </Button>
          </span>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {showAlert && <p style={{ color: 'red' }}>{alertMessage}</p>}
      </header>
    </div>
  );
}

export default Login;
