// API Connection to post information from register
export function RegisterApi(payload) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
    const urlencoded = new URLSearchParams();
    urlencoded.append("username", payload.username);
    urlencoded.append("pin", payload.pin);
    urlencoded.append("confirm_pin", payload.confirm_pin);
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
  
    // Make the POST request to the registration endpoint
    return fetch(`${process.env.REACT_APP_BE_URL}/register`, requestOptions)
      .then(response => {
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        console.log('response:', response)
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(error => {
        console.error('Error:', error);
        return { status: 'error', message: 'An error occurred while making the request' };
      });
  }
  