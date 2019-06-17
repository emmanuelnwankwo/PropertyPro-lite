const toggle = document.querySelector('#myonoffswitch');

const show = () => {
    if (toggle.checked == true) {
        console.log('Toggle Checked');
    }
    if (toggle.checked == false) {
        console.log('Toggle Unchecked');
    }
}
toggle.addEventListener('change', show);