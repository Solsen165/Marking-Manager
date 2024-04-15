const url = 'https://marking-manager-api.vercel.app';
const teacher = JSON.parse(sessionStorage.getItem('teacher'));
let students = [];

const teacherNameLabel = document.querySelector('#teacherName');
const subjectSelect = document.querySelector('#subjectSelect');
const tableDiv = document.querySelector('#tableDiv');
const percentsDiv = document.querySelector('#percentsDiv');
const msg = document.querySelector('#msg');
let selectedCourseIndex = 0;

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

function addPercentInputs() {
  for (let i in teacher.courses) {
    if (teacher.courses[i].id == subjectSelect.value) {
      selectedCourseIndex = i;
      break;
    }
  }
  if (percentsDiv.hasChildNodes()) {
    percentsDiv.removeChild(percentsDiv.firstElementChild)
  }
  const percentTable = document.createElement('table');
  let row = document.createElement('tr');

  let header = document.createElement('th');
  header.innerHTML = 'Assignments';
  row.appendChild(header);

  header = document.createElement('th');
  header.innerHTML = 'Practical';
  row.appendChild(header);

  header = document.createElement('th');
  header.innerHTML = 'Examination';
  row.appendChild(header);

  percentTable.appendChild(row);

  row = document.createElement('tr');
  for (let i = 0; i < 3; i++) {
    const inputCell = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'number';
    input.max = 100;
    input.min = 0;
    input.value = teacher.percents[selectedCourseIndex][i];
    input.id = `percent_${i}`;
    inputCell.append(input);
    row.appendChild(inputCell)
  }
  percentTable.appendChild(row);
  percentsDiv.appendChild(percentTable);
}

async function fillStudentTable() {
  //const selectedCourse = teacher.courses.find(c => c.id == subjectSelect.value);
  addPercentInputs();
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
  header.innerHTML = 'Assignments';
  row.appendChild(header);

  header = document.createElement('th');
  header.innerHTML = 'Practical';
  row.appendChild(header);

  header = document.createElement('th');
  header.innerHTML = 'Examination';
  row.appendChild(header);

  header = document.createElement('th');
  header.innerHTML = 'Total Grade';
  row.appendChild(header);

  studentTable.append(row);

  for (let i in selectedStudents) {
    const currStudent = selectedStudents[i];
    row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.innerHTML = currStudent.id;

    const nameCell = document.createElement('td');
    nameCell.innerHTML = currStudent.name;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    let markIndex = 0;

    for (let k = 0; k < 3; k++) {
      const gradeCell = document.createElement('td');
      const gradeInput = document.createElement('input');
      for (let j in currStudent.courses) {
        if (currStudent.courses[j].id == subjectSelect.value) {
          gradeInput.value = currStudent.marks[j][k];
          markIndex = j;
          break;
        }
      }

      gradeInput.id = `grade_${currStudent.id}_${k}`;
      gradeInput.type = 'number';
      gradeInput.max = 100;
      gradeInput.min = 0;
      gradeInput.oninput = () => {calculateFinalGrade(currStudent,markIndex)};
      /*
      gradeInput.oninput = () => {
        currStudent.marks[markIndex] = gradeInput.value;
        console.log(currStudent);
      };
      */
      gradeCell.append(gradeInput);

      row.appendChild(gradeCell);

    }

    const finalGradeCell = document.createElement('td');
    finalGradeCell.id = `finalGrade_${currStudent.id}`;
    row.appendChild(finalGradeCell);

    if (currStudent.requests[markIndex] == 1) {
      const requestCell = document.createElement('td');
      const textNode = document.createTextNode("This student has requested this grade to be rechecked");
      requestCell.appendChild(textNode);
      /*
      const acceptBtn = document.createElement('button');
      acceptBtn.innerHTML = 'Accept';
      const rejectBtn = document.createElement('button');
      rejectBtn.innerHTML = 'Reject';
      requestCell.appendChild(acceptBtn);
      requestCell.appendChild(rejectBtn);
      */
      const dismissBtn = document.createElement('button');
      dismissBtn.innerHTML = 'Dismiss';
      requestCell.appendChild(dismissBtn);
      row.appendChild(requestCell);
      dismissBtn.addEventListener('click', () => {
        row.removeChild(row.lastChild);
        currStudent.requests[markIndex] = 2;
      })
    } 

    studentTable.appendChild(row);
  }


  const submitBtn = document.createElement('button');
  submitBtn.value = 'Save Marks';
  submitBtn.innerHTML = 'Save Marks';
  submitBtn.id = 'submitBtn';
  submitBtn.addEventListener('click', saveMarks);

  tableDiv.append(studentTable);
  tableDiv.append(submitBtn);

}

function calculateFinalGrade(student, markIndex) {
  // Validate
  if (tableDiv.hasChildNodes() == false) {
    return;
  }
  let invalid = false;
  for (let i = 0; i < 3; i++) {
    const percentInput = document.querySelector(`#percent_${i}`);
    teacher.percents[selectedCourseIndex][i] = percentInput.value;
    console.log(teacher.percents[selectedCourseIndex]);
    const gradeInput = document.querySelector(`#grade_${student.id}_${i}`);
    if (percentInput.value == 0 || gradeInput.value == 0) {
      invalid = true;
    }
  }
  if (invalid) {
    return;
  }

  console.log('Calculating..');
  // Calculate  
  const finalGradeCell = document.querySelector(`#finalGrade_${student.id}`);
  let finalGrade = 0;
  for (let i = 0; i < 3; i++) {
    const gradeInput = document.querySelector(`#grade_${student.id}_${i}`);
    student.marks[markIndex][i] = gradeInput.value;
    const percentInput = document.querySelector(`#percent_${i}`);
    finalGrade += percentInput.value * student.marks[markIndex][i];
  }
  finalGrade /= 100;

  console.log(finalGrade);
  finalGradeCell.innerHTML = finalGrade;
  student.finalMarks[markIndex] = finalGrade;
  console.log(student);
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