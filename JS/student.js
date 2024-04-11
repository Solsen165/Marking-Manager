document.addEventListener("DOMContentLoaded", function() {
    const rollNumberInput = document.getElementById("rollNumberInput");
    const viewMarksBtn = document.getElementById("viewMarksBtn");
    const studentMarks = document.getElementById("studentMarks");
  
    // Load student data from local storage
    let students = JSON.parse(localStorage.getItem('students')) || [];
  
    // Function to handle viewing marks
    function viewMarks() {
      const rollNumber = rollNumberInput.value;
      const student = students.find(student => student.rollNumber === rollNumber);
      if (student) {
        studentMarks.innerHTML = "";
        for (const subject in student.subjects) {
          const listItem = document.createElement("li");
          listItem.textContent = `${subject}: ${student.subjects[subject]}`;
          studentMarks.appendChild(listItem);
        }
      } else {
        studentMarks.innerHTML = "<li>Student not found. Please enter a valid roll number.</li>";
      }
    }
  
    viewMarksBtn.addEventListener("click", viewMarks);
  });
  