const availableCourseList = document.querySelector('#availableCourseDropdown');
const selectedCourseList = document.querySelector('#selectedCourseList');
const addCourseBtn = document.querySelector('#addCourseBtn');
const form = document.querySelector('#addStudentForm')
const url = 'https://marking-manager-api.vercel.app';

let availableCourses = [];
let selectedCourses = [];

wireUpAvailableList();


addCourseBtn.addEventListener('click', selectCourse);

async function wireUpAvailableList() {
    const response = await fetch(url + '/courses')
    const data = await response.json();

    for (i in data) {
        const curr = data[i];
        availableCourses.push(curr);
        const newOption = document.createElement('option');
        newOption.innerHTML = curr.name;
        newOption.value = curr.id;
        availableCourseList.appendChild(newOption);
    }
    console.log(availableCourses);
}

function selectCourse() {
    const selected = availableCourseList.selectedIndex
    const id = availableCourseList.value

    const selectedCourse = availableCourses.find(c => c.id == id);

    selectedCourses.push(selectedCourse);
    const newItem = document.createElement('li');
    newItem.innerHTML = selectedCourse.name;
    selectedCourseList.appendChild(newItem);

    availableCourseList.remove(availableCourseList.selectedIndex);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    //const formData = new FormData(form);
    //const encoded = new URLSearchParams(formData).toString()
    const encoded = grabStudentInfo();
        fetch(url + '/students', {
            method: 'POST',
            body: encoded,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
            .then((res) => {
                if (res.ok) {
                    msg.innerHTML = "Student inserted successfully: ";
                    res.json().then ((data) => msg.innerHTML += `Id: ${data.id}, Name: ${data.name}`)
                }
                else {
                    msg.innerHTML = "Something went wrong, the student was not inserted";
                }
            })
})

function grabStudentInfo() {
    const name = document.querySelector('#studentName').value
    let courses = '';
    for (i in selectedCourses) {
        courses += `${selectedCourses[i].id}|`;
    }
    courses = courses.substring(0,courses.length-1);
    return `studentName=${name}&studentCourses=${courses}`;
}