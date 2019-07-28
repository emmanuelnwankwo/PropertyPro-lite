
const firstName = document.getElementById('first_name');
const profilePic = document.getElementById('profile_photo');
const table = document.getElementById('property_table');
let properties;

const user = JSON.parse(localStorage.getItem('authUser'));
const token = localStorage.getItem('token');
const propertyId = localStorage.getItem('propertyId');
const passportUrl = user.passport_url || './assets/img/avatar.png';
const propertyUrl = `https://propertypro-lit.herokuapp.com/api/v1/property/${propertyId}`;
const getOptions = {
  method: 'GET',
  headers: new Headers({
    'Content-Type': 'application/json',
    authorization: token,
  }),
};

firstName.innerHTML = user.first_name;
profilePic.setAttribute('src', passportUrl);
fetch(propertyUrl, getOptions)
  .then(res => res.json())
  .then((res) => {
    if (res.status === 200) {
      const { data } = res;
      const date = new Date(data.created_on);
          properties = `
          <div class="tab-pane" id="detail">
                        <div class="row">
                            <div class="col-md-12">
                                <h2>${data.property_name}</h2>
                                    <div id="carousel">
                                        <div class="item active visible">
                                            <img src="./assets/img/advert.jpeg" alt="Property">
                                        </div>
                                        <div class="item active" id="hide" style="display: none;">
                                            <img src="./assets/img/property.jpg" alt="property">
                                        </div>
                                    </div>
                                <h3>Interested? call ${data.owner_phone}</h3>
                                <h3>Property Overview</h3>
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <th width="20%"><strong>Property ID</strong></th>
                                            <td>${data.id}</td>
                                        </tr>
                                        <tr>
                                            <th><strong> Sale Price </strong></th>
                                            <td>
                                                ₦${data.price}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><strong>Status</strong></th>
                                            <td>${data.status}</td>
                                        </tr>
                                        <tr>
                                            <th><strong>Purpose</strong></th>
                                            <td>
                                                ${data.purpose}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><strong>Type</strong></th>
                                            <td>${data.type}</td>
                                        </tr>
                                        <tr>
                                            <th><strong>Address</strong></th>
                                            <td>${data.address}</td>
                                        </tr>

                                        <tr>
                                            <th><strong>State</strong></th>
                                            <td>${data.state}</td>
                                        </tr>
                                        <tr>
                                            <th><strong>City</strong></th>
                                            <td>${data.city}</td>
                                        </tr>
                                        <tr>
                                            <th><strong>Posted on</strong></th>
                                            <td>${date.toLocaleString('en-US', {
                                                month: 'long',
                                                day: '2-digit',
                                                year: 'numeric',
                                              })}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h3>Property Description</h3>
                                <p>${data.description}</p>
                                <div id="map"></div>
                            </div>
                        </div>
                        <br>
                    </div>
      `;
          table.insertAdjacentHTML('afterbegin', properties);

    }
  })
  .catch((err) => {
    console.log(err);
  });
 