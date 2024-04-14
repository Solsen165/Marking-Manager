const url = 'https://marking-manager-api.vercel.app';
const teacher = JSON.parse(sessionStorage.getItem('teacher'));
let students = [];

const teacherNameLabel = document.querySelector('#teacherName');
const subjectSelect = document.querySelector('#subjectSelect');
const tableDiv = document.querySelector('#tableDiv');
const msg = document.querySelector('#msg');

teacherNameLabel.innerHTML = 'Teacher ' + teacher.name;
fillCourseList();



subjectSelect.addEventListener('change', fillStudentTable);

function fillCourseList() {
  for (let i in teacher.courses) {
    const currCourse = teacher.courses[i];
    const newOption = document.createElement('option');
    newOption.innerHTML = currCourse.name;
    newOption.value = currCourse.id;
    subjectSelect.appendChild(newOption);
  }
}

async function getAllStudents() {
  const response = await fetch(url + '/students');
  const data = await response.json();
  for (let i in data) {
    const curr = data[i];
    students.push(curr);
  }
}

async function getStudentsWithCourse(courseId) {
  if (students.length < 1) {
    await getAllStudents();
  }
  let output = [];
  for (let i in students) {
    const curr = students[i];
    for (let j in curr.courses) {
      if (curr.courses[j].id == courseId) {
        output.push(curr);
        break;
      }
    }
  }
  return output;
}

async function fillStudentTable() {
  //const selectedCourse = teacher.courses.find(c => c.id == subjectSelect.value);
  const selectedStudents = await getStudentsWithCourse(subjectSelect.value);

  if (tableDiv.hasChildNodes()) {
    tableDiv.removeChild(tableDiv.firstElementChild)
    tableDiv.removeChild(tableDiv.firstElementChild);
  }
  const studentTable = document.createElement('table');
  let row = document.createElement('tr');

  let header = document.createElement('th');
  header.innerHTML = 'Student roll number';
  row.appendChild(header);

  header = document.createElement('th');
  header.innerHTML = 'Student name';
  row.appendChild(header);

  header = document.createElement('th');
  header.innerHTML = 'Grade';
  row.appendChild(header);

  studentTable.append(row);

  for (let i in selectedStudents) {
    const currStudent = selectedStudents[i];
    row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.innerHTML = currStudent.id;

    const nameCell = document.createElement('td');
    nameCell.innerHTML = currStudent.name;

    const gradeCell = document.createElement('td');
    const gradeInput = document.createElement('input');
    let markIndex = 0;
    for (let j in currStudent.courses) {
      if (currStudent.courses[j].id == subjectSelect.value) {
        gradeInput.value = currStudent.marks[j];
        markIndex = j;
        break;
      }
    }

    gradeInput.id = `${currStudent.id}-grade`;
    gradeInput.oninput = () => {
      currStudent.marks[markIndex] = gradeInput.value;
      console.log(currStudent);
    };
    gradeCell.append(gradeInput);

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(gradeCell);

    studentTable.appendChild(row);
  }


  const submitBtn = document.createElement('button');
  submitBtn.value = 'Save Marks';
  submitBtn.innerHTML = 'Save Marks';
  submitBtn.addEventListener('click', saveMarks);

  tableDiv.append(studentTable);
  tableDiv.append(submitBtn);
}

function saveMarks() {

  fetch(url + '/students/all', {
    method: 'POST',
    body: JSON.stringify(students),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((res) => {
      if (res.ok) {
        msg.innerHTML = "Marks saved successfully";
      }
      else {
        msg.innerHTML = "Something went wrong, the marks were not saved";
      }
    })
}



/*
document.addEventListener("DOMContentLoaded", function() {
    const teacherSelect = document.getElementById("teacherSelect");
    const subjectSelect = document.getElementById("subjectSelect");
    const markInput = document.getElementById("markInput");
    const addMarkBtn = document.getElementById("addMarkBtn");
  
    let teachers = JSON.parse(localStorage.getItem('teachers')) || [];
  
    let subjects = JSON.parse(localStorage.getItem('subjects')) || [];
  
    function populateTeacherSelect() {
      teachers.forEach(teacher => {
        const option = document.createElement("option");
        option.value = teacher.name;
        option.textContent = teacher.name;
        teacherSelect.appendChild(option);
      });
    }
  
    function populateSubjectSelect() {
      subjects.forEach(subject => {
        const option = document.createElement("option");
        option.value = subject.name;
        option.textContent = subject.name;
        subjectSelect.appendChild(option);
      });
    }
  
    function addMark() {
      const teacherName = teacherSelect.value;
      const subjectName = subjectSelect.value;
      const mark = parseFloat(markInput.value);
      const teacher = teachers.find(teacher => teacher.name === teacherName);
      const subject = subjects.find(subject => subject.name === subjectName);
      if (teacher && subject && !isNaN(mark)) {
        console.log(`Adding mark for ${subjectName} by ${teacherName}: ${mark}`);
      } else {
        alert("Please select a teacher, subject, and enter a valid mark.");
      }
    }
  
    addMarkBtn.addEventListener("click", addMark);
  
    populateTeacherSelect();
    populateSubjectSelect();
  });
  
  */