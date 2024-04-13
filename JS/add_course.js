const form = document.querySelector('#addCourseForm');
const msg = document.querySelector('#msg');

form.addEventListener('submit', (e) => {
   e.preventDefault();
   const formData = new FormData(form);
   const formData2 = new URLSearchParams(formData).toString()
   console.log(form.body)
   console.log([...formData])
   fetch('http://localhost:3000/courses', {
    method:'POST',
    body: formData2,
    headers: {
        'Content-type': 'application/x-www-form-urlencoded'
    }
   })
   .then((res) => {
    if (res.ok) {
        msg.innerHTML = "Course created successfully";
    }
    else {
        msg.innerHTML = "Something went wrong, the course was not created";
    }
   })
})