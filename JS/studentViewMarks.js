const student = JSON.parse(sessionStorage.getItem('student'));
const nameLabel = document.querySelector('#nameLabel');
const marksTable = document.querySelector('#marksTable')
const url = 'https://marking-manager-api.vercel.app'

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
    gradeCell.innerHTML = student.finalMarks[i];

    const creditsCell = document.createElement('td');
    creditsCell.innerHTML = currCourse.credits

    newRow.appendChild(idCell);
    newRow.appendChild(nameCell);
    newRow.appendChild(gradeCell);
    newRow.appendChild(creditsCell);

    if (student.finalMarks[i] != null) {
        console.log(student);
        const recheckingBtnCell = document.createElement('td');
        const recheckingBtn = document.createElement('button');

        if (student.requests[i] == 0) {
            recheckingBtn.innerHTML = "Send rechecking request";
        }
        else {
            if (student.requests[i] == 1) {
                recheckingBtn.innerHTML = "Pending request";
            }
            else {
                recheckingBtn.innerHTML = "Request received";
            }
            recheckingBtn.disabled = true;
        }

        recheckingBtn.addEventListener('click', () => {
            student.requests[i] = true;
            fetch(url + '/students/' + student.id, {
                method: 'PUT',
                body: JSON.stringify(student),
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then((res) => {
                    if (res.ok) {
                        console.log('Sent request');
                        recheckingBtn.innerHTML = "Pending request";
                        recheckingBtn.disabled = true;
                    }
                })

        })

        recheckingBtnCell.appendChild(recheckingBtn);
        newRow.appendChild(recheckingBtnCell);
    }

    marksTable.appendChild(newRow)
}
