const url = 'https://marking-manager-api.vercel.app'

const idInput = document.getElementById("idInput");
const pass = document.querySelector('#password')
const addMarksBtn = document.getElementById("addMarksBtn");
const errmsg = document.querySelector('#msg');

// Function to handle adding marks
async function addMarks() {

    if (pass.value != 'password') {
        errmsg.innerHTML = "Password is not correct";
        return;
    }
    else {
        errmsg.innerHTML = ""; 
    }

    const teacherId = idInput.value;
    const teacher = await getTeacher(teacherId);

    if (teacher == null) {
        errmsg.innerHTML = 'Teacher not found';
    }
    else {
        errmsg.innerHTML = '';
        sessionStorage.setItem('teacher', JSON.stringify(teacher));
        window.location.replace('teacherAddMarks.html')
    }
}

async function getTeacher(id) {
    try {
        const teacher = await fetch(url + '/teachers/' + id);
        const data = await teacher.json();
        return data;
    } catch (error) {
        return null;
    }
}

addMarksBtn.addEventListener("click", addMarks);
