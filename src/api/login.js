/// API Connection to post login information
function LoginApi (payload) {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  
    const urlencoded = new URLSearchParams()
    urlencoded.append('id', payload.id)
    urlencoded.append('username', payload.username)
    urlencoded.append('pin', payload.pin)
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    }
    
  // console.log('API Request Options:', requestOptions);
  // console.log('REACT_APP_BE_URL:', process.env.REACT_APP_BE_URL);
  
  return fetch(`${process.env.REACT_APP_BE_URL}/login`, requestOptions)
  .then((response) => {
    console.log('response:', response)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log('API Response:', data);

    // Check if the response contains the expected data structure
    if (data && data.status) {
      return data; // Return the data if it's in the expected format
    } else {
      throw new Error('Unexpected API response format');
    }
  })
  .catch((error) => {
    console.error('API Request Error:', error);
    // Handle the error, e.g., show an error message
    throw error; // Rethrow the error for further handling if needed
  });
}
  /// API Connection to get auth from BE
  function GetLoginAuthFromMainBE () {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
  
    return fetch(`${process.env.REACT_APP_BE_URL}/`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error))
  }
  
  export { LoginApi, GetLoginAuthFromMainBE }
  