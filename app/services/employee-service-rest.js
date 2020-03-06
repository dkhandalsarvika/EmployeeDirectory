const baseURL = 'https://fir-test-be60a.firebaseapp.com/sarvikaemployees'; //server call
const updateURL = 'https://fir-test-be60a.firebaseapp.com/empdetailsupdate'; //server call
// const baseURL = 'http://localhost:5000/sarvikaemployees'; // localhost call
// const baseURL = 'http://10.0.2.2:5000/sarvikaemployees'; // localhost android emulator call
// const baseURL = 'http://192.168.0.21:5000/sarvikaemployees'; // localhost android emulator call


// const baseURL = 'http://localhost:5001/fir-test-be60a/us-central1/app/sarvikaemployees';

// , { method: 'POST'}


export let findAll = () => fetch(baseURL)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    }); 

export let findByName = (name) => fetch(`${baseURL}?name=${name}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    }); 

export let findById = (id) => fetch(`${baseURL}/${id}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    }); 

export let updateById = (id,empId,firstName,lastName,title,email,phone,mobilePhone) => fetch(`${updateURL}`,{
    		method: 'PUT',
    		headers: {
            'Accept':'application/json',
            'Content-Type':'application/json; charset=UTF-8'
    	  },
        body: JSON.stringify({
          id: id,
          empId: empId,
          firstName: firstName,
          lastName: lastName,
          title: title,
          email: email,
          phone: phone,
          mobilePhone: mobilePhone 
        })
      })
      .then((response) => response.json())
	    .catch((error) => {
	      console.error(error);
	    })
   