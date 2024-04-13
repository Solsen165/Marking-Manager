const form = document.querySelector('#addCourseForm');
const msg = document.querySelector('#msg');
const url = 'https://marking-manager-api.vercel.app';

form.addEventListener('submit', (e) => {
   e.preventDefault();
   const formData = new FormData(form);
   const encoded = new URLSearchParams(formData).toString()
   fetch(url + '/courses', {
    method:'POST',
    body: encoded,
    headers: {
        'Content-type': 'application/x-www-form-urlencoded'
    }
   })
   .then((res) => {
    if (res.ok) {
        msg.innerHTML = "Course created successfully: ";
        res.json().then((data) => {msg.innerHTML += `Id: ${data.id}, Title: ${data.name}, Credits: ${data.credits}`})
    }
    else {
        msg.innerHTML = "Something went wrong, the course was not created";
    }
   })
})