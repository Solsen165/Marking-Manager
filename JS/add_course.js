const form = document.querySelector('#addCourseForm');
const msg = document.querySelector('#msg');
const url = 'http://localhost:3000';

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
        msg.innerHTML = "Course added successfully: ";
        res.json().then((data) => {msg.innerHTML += `Id: ${data.id}, Title: ${data.name}, Credits: ${data.credits}`})
    }
    else {
        msg.innerHTML = "Something went wrong, the course was not added";
    }
   })
})