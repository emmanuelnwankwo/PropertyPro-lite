const select = document.querySelector('#property-state');
const nigeriaState = [
  {
    state: 'Abia',
    value: 'Abia',
  },
  {
    state: 'Adamawa',
    value: 'Adamawa',
  },
  {
    state: 'Anambra',
    value: 'Anambra',
  },
  {
    state: 'Akwa Ibom',
    value: 'Akwa Ibom',
  },
  {
    state: 'Bauchi',
    value: 'Bauchi',
  },
  {
    state: 'Bayelsa',
    value: 'Bayelsa',
  },
  {
    state: 'Benue',
    value: 'Benue',
  },
  {
    state: 'Borno',
    value: 'Borno',
  },
  {
    state: 'Cross River',
    value: 'Cross River',
  },
  {
    state: 'Delta',
    value: 'Delta',
  },
  {
    state: 'Ebonyi',
    value: 'Ebonyi',
  },
  {
    state: 'Enugu',
    value: 'Enugu',
  },
  {
    state: 'Edo',
    value: 'Edo',
  },
  {
    state: 'Ekiti',
    value: 'Ekiti',
  },
  {
    state: 'FCT - Abuja',
    value: 'FCT - Abuja',
  },
  {
    state: 'Gombe',
    value: 'Gombe',
  },
  {
    state: 'Imo',
    value: 'Imo',
  },
  {
    state: 'Jigawa',
    value: 'Jigawa',
  },
  {
    state: 'Kaduna',
    value: 'Kaduna',
  },
  {
    state: 'Kano',
    value: 'Kano',
  },
  {
    state: 'Katsina',
    value: 'Katsina',
  },
  {
    state: 'Kebbi',
    value: 'Kebbi',
  },
  {
    state: 'Kogi',
    value: 'Kogi',
  },
  {
    state: 'Kwara',
    value: 'Kwara',
  },
  {
    state: 'Lagos',
    value: 'Lagos',
  },
  {
    state: 'Nasarawa',
    value: 'Nasarawa',
  },
  {
    state: 'Niger',
    value: 'Niger',
  },
  {
    state: 'Ogun',
    value: 'Ogun',
  },
  {
    state: 'Ondo',
    value: 'Ondo',
  },
  {
    state: 'Osun',
    value: 'Osun',
  },
  {
    state: 'Oyo',
    value: 'Oyo',
  },
  {
    state: 'Plateau',
    value: 'Plateau',
  },
  {
    state: 'Rivers',
    value: 'Rivers',
  },
  {
    state: 'Sokoto',
    value: 'Sokoto',
  },
  {
    state: 'Taraba',
    value: 'Taraba',
  },
  {
    state: 'Yobe',
    value: 'Yobe',
  },
  {
    state: 'Zamfara',
    value: 'Zamfara',
  },
];
const displayState = () => {
  nigeriaState.forEach((state) => {
    const option = document.createElement('option');
    option.value = state.value;
    option.text = state.state;
    select.appendChild(option);
  });
};
displayState();
