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
  