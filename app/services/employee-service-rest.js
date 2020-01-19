const baseURL = 'https://fir-test-be60a.firebaseapp.com/sarvikaemployees'; //server call
// const baseURL = 'http://localhost:5000/sarvikaemployees'; // localhost call
// const baseURL = 'http://10.0.2.2:5000/sarvikaemployees'; // localhost android emulator call


// const baseURL = 'http://localhost:5001/fir-test-be60a/us-central1/app/sarvikaemployees';


export let findAll = () => fetch(baseURL)
    .then((response) => response.json());

export let findByName = (name) => fetch(`${baseURL}?name=${name}`)
    .then((response) => response.json());

export let findById = (id) => fetch(`${baseURL}/${id}`)
    .then((response) => response.json());