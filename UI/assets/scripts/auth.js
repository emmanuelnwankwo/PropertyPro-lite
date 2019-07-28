const accessToken = localStorage.getItem('token');
const tokenUrl = 'https://propertypro-lit.herokuapp.com/api/v1/token';
const isAuthenticated = (token) => {
  if (!token) window.location = 'login.html';
  if (token) {
    const headers = new Headers({
      'Content-type': 'application/json',
    });
    const fetchData = {
      method: 'POST',
      headers,
      body: JSON.stringify({ token }),
    };
    fetch(tokenUrl, fetchData)
      .then(res => res.json())
      .then((res) => {
        if (res.status !== 200) {
          window.location = 'login.html';
        }
        return true;
      })
      .catch((err) => {
        if (err) return false;
      });
  }
};

isAuthenticated(accessToken);
