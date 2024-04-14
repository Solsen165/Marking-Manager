const url = 'http://localhost:3000'

const rollNumberInput = document.getElementById("rollNumberInput");
const viewMarksBtn = document.getElementById("viewMarksBtn");
const studentMarks = document.getElementById("studentMarks");
const errmsg = document.querySelector('#msg');

// Function to handle viewing marks
async function viewMarks() {
  const rollNumber = rollNumberInput.value;
  const student = await getStudent(rollNumber);

  if (student == null) {
    errmsg.innerHTML = 'Student not found';
  }
  else {
    errmsg.innerHTML = '';
    sessionStorage.setItem('student', JSON.stringify(student));
    window.location.replace('studentViewMarks.html')
  }
}

async function getStudent(id) {
  try {
    const student = await fetch(url + '/students/' + id);
    const data = await student.json();
    return data;
  } catch (error) {
    return null;
  }
}

viewMarksBtn.addEventListener("click", viewMarks);
