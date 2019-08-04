/* eslint-disable camelcase */
const accessToken = localStorage.getItem('token');
const urlPath = window.location.pathname.split('/')[2];
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
        const { is_admin, user_type } = res.data;
      console.log(urlPath);
//         if (res.status !== 200) {
//           window.location = 'login.html';
//         }
//         if (is_admin) {
//           if (!(urlPath === 'admin.html')) {
//             window.location.replace('admin.html');
//           }
//         } else if (!is_admin && user_type === 'agent') {
//           if (!(urlPath === 'agent.html' || urlPath === 'post.html' || urlPath === 'update.html')) {
//             window.location.replace('agent.html');
//           }
//         } else if (user_type === 'user') {
//           if (!(urlPath === 'user.html' || urlPath === 'property.html')) {
//             window.location.replace('user.html');
//           }
//         }
      })
      .catch((err) => {
        console.log(err);
        if (err) return false;
      });
  }
};

isAuthenticated(accessToken);
