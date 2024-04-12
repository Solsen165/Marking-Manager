const student = JSON.parse(sessionStorage.getItem('student'));
const nameLabel = document.querySelector('#nameLabel');
const marksTable = document.querySelector('#marksTable')

nameLabel.innerHTML = student.name;

// CourseId - CourseTitle - Grade - Credits
for (let i in student.courses) {
    const currCourse = student.courses[i];
    const newRow = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.innerHTML = currCourse.id

    const nameCell = document.createElement('td');
    nameCell.innerHTML = currCourse.name

    const gradeCell = document.createElement('td');
    gradeCell.innerHTML = student.marks[i];

    const creditsCell = document.createElement('td');
    creditsCell.innerHTML = currCourse.credits

    newRow.appendChild(idCell);
    newRow.appendChild(nameCell);
    newRow.appendChild(gradeCell);
    newRow.appendChild(creditsCell);
    marksTable.appendChild(newRow)
}
