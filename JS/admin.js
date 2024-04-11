// Department class
class Department {
    constructor(name) {
        this.name = name;
        this.majors = [];
    }

    addMajor(major) {
        this.majors.push(major);
    }
}

// Major class
class Major {
    constructor(name, department) {
        this.name = name;
        this.department = department;
        this.subjects = [];
        department.addMajor(this);
    }

    addSubject(subject) {
        this.subjects.push(subject);
    }
}

// Subject class
class Subject {
    constructor(name, credits) {
        this.name = name;
        this.credits = credits;
    }
}

// Teacher class
class Teacher {
    constructor(name, department, subjects) {
        this.name = name;
        this.department = department;
        this.subjects = subjects;
    }
}

// Student class
class Student {
    constructor(name, rollNumber, major) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.major = major;
        this.subjects = {};
    }

    addMark(subject, mark) {
        this.subjects[subject.name] = mark;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Event listener for adding a student
    document.getElementById("addStudentBtn").addEventListener("click", function() {
        const studentName = document.getElementById("studentName").value;
        const studentMajor = document.getElementById("studentMajor").value;

        // Validate input
        if (studentName && studentMajor) {
            // Create a new student object
            const student = new Student(studentName, studentMajor);
            console.log("New student added:", student);

            // Clear input fields
            document.getElementById("studentName").value = "";
            document.getElementById("studentMajor").value = "";
        } else {
            alert("Please enter student name and major.");
        }
    });

    // setting event listener to add the teacher
    document.getElementById("addTeacherBtn").addEventListener("click", function() {
        const teacherName = document.getElementById("teacherName").value;
        const teacherDepartment = document.getElementById("teacherDepartment").value;

        // validate input
        if (teacherName && teacherDepartment) {
            // create a new teacher object
            const teacher = new Teacher(teacherName, teacherDepartment, []);
            console.log("New teacher added:", teacher);

            // clear input fields
            document.getElementById("teacherName").value = "";
            document.getElementById("teacherDepartment").value = "";
        } else {
            alert("Please enter teacher name and department.");
        }
    });
});
