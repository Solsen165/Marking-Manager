// Subject class
class Course {
    constructor(id, name, credits) {
        this.id = id;
        this.name = name;
        this.credits = credits;
    }
}

// Teacher class
class Teacher {
    constructor(id,name, courses) {
        this.id = id;
        this.name = name;
        this.courses = courses;
    }
}

// Student class
class Student {
    constructor(id, name, courses, marks) {
        this.id = id;
        this.name = name;
        this.courses = courses;
        this.marks = marks;
    }

    addMark(subject, mark) {
        this.subjects[subject.name] = mark;
    }

    getMarkWithCourseId(id) {
        for (let i in this.courses) {
            if (this.courses[i].id == id) {
                return this.marks[i];
            }
        }
    }
}

class Marks {
    constructor(studentcourse,attendance, performance, final_exam) {
        this.student = student;
        this.course = course;
        this.attendance = attendance;
        this.performance = performance;
        this.final_exam = final_exam;
    }

    calculateFinalMark(attendancePercentage, performancePercentage, finalExamPercentage) {
        // const totalPercentage = attendancePercentage + performancePercentage + finalExamPercentage;
        const finalMark = (this.attendance * (attendancePercentage / 100)) +
                         (this.performance * (performancePercentage / 100)) +
                         (this.final_exam * (finalExamPercentage / 100));
        
        return finalMark;
    }
}