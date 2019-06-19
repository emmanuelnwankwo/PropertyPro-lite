const toggle = document.querySelector('#myonoffswitch');

const show = () => {
  if (toggle.checked === true) {
    // Console.log('Toggle Checked');
  }
  if (toggle.checked === false) {
    // Console.log('Toggle Unchecked');
  }
};
toggle.addEventListener('change', show);
