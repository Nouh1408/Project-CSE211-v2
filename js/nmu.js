class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.counter = 1;
    }

    addStudent(student) {
        student.serial = this.counter++;
        const newNode = new Node(student);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    deleteStudent(index) {
        if (this.head === null) {
            return;
        }

        if (index === 0) {
            this.head = this.head.next;
        } else {
            let current = this.head;
            let count = 0;
            let prev = null;
            while (count < index) {
                prev = current;
                current = current.next;
                count++;
            }

            if (current === null) {
                return;
            }

            prev.next = current.next;
        }
    }

    filter(filterFunction) {
        let current = this.head;
        const result = new LinkedList();

        while (current !== null) {
            if (filterFunction(current.data)) {
                result.addStudent(current.data);
            }

            current = current.next;
        }

        return result;
    }

    search(searchTerm, selectedFaculty) {
        return this.filter(function (student) {
            return (
                (student.name.toLowerCase().includes(searchTerm) || student.studentId.includes(searchTerm)) &&
                (selectedFaculty === "all" || student.faculty === selectedFaculty)
            );
        });
    }
}

let studentList = new LinkedList();
let isStudentListVisible = false;

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let faculty = document.getElementById("faculty").value;
    let studentId = document.getElementById("studentId").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let picture = document.getElementById("picture").files[0];

    let student = {
        name: name,
        faculty: faculty,
        studentId: studentId,
        phoneNumber: phoneNumber,
        picture: picture
    };

    studentList.addStudent(student);
    displayStudentList();

    document.getElementById("name").value = "";
    document.getElementById("faculty").value = "";
    document.getElementById("studentId").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("picture").value = "";
});

function displayStudentList() {
    let tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = "";

    let current = studentList.head;
    let index = 1;
    while (current !== null) {
        let student = current.data;

        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);

        cell1.innerHTML = index++;
        cell2.innerHTML = student.name;
        cell3.innerHTML = student.studentId;
        cell4.innerHTML = student.phoneNumber;
        cell5.innerHTML = student.faculty;
        cell6.innerHTML = `<img src="${URL.createObjectURL(student.picture)}" alt="" style="width:50px; height:auto;" onclick="showFullImage('${URL.createObjectURL(student.picture)}')">`;
        cell7.innerHTML = new Date().toLocaleString();

        cell8.innerHTML = `<button class="deleteButton" onclick="deleteStudent(${index - 2})">Delete</button>`;

        current = current.next;
    }
}

function deleteStudent(index) {
    studentList.deleteStudent(index);
    displayStudentList();
}

function showFullImage(imageUrl) {
    let fullscreenImage = document.getElementById("fullscreenImage");
    let fullscreenImg = document.getElementById("fullscreenImg");

    fullscreenImg.src = imageUrl;
    fullscreenImage.style.display = "block";
}

function closeFullscreen() {
    let fullscreenImage = document.getElementById("fullscreenImage");
    fullscreenImage.style.display = "none";
}

function showStudentList() {
    let studentListContainer = document.getElementById("studentList");
    studentListContainer.style.display = "block";
    displayStudentList();
    isStudentListVisible = true;
}

function closeStudentList() {
    let studentListContainer = document.getElementById("studentList");
    studentListContainer.style.display = "none";
    isStudentListVisible = false;
}

function showPasswordBox() {
    let passwordBox = document.getElementById("passwordBox");

    if (isStudentListVisible) {
        closeStudentList();
    } else {
        passwordBox.style.display = "block";
    }
}

function closePasswordBox() {
    let passwordBox = document.getElementById("passwordBox");
    passwordBox.style.display = "none";
}

function checkPassword() {
    let password = document.getElementById("password").value;

    if (password === "00000") {
        closePasswordBox();
        isStudentListVisible ? closeStudentList() : showStudentList();
    } else {
        alert("Incorrect password. Please try again.");
    }
}

function filterStudents() {
    let selectedFaculty = document.getElementById("collegeFilter").value;
    let filteredStudents;

    if (selectedFaculty !== "all") {
        filteredStudents = studentList.filter(function (student) {
            return student.faculty === selectedFaculty;
        });
    } else {
        filteredStudents = studentList;
    }

    displayFilteredStudents(filteredStudents);
}

function displayFilteredStudents(filteredStudents) {
    let tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = "";

    let index = 1;
    let current = filteredStudents.head;
    while (current !== null) {
        let student = current.data;

        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);

        cell1.innerHTML = index++;
        cell2.innerHTML = student.name;
        cell3.innerHTML = student.studentId;
        cell4.innerHTML = student.phoneNumber;
        cell5.innerHTML = student.faculty;
        cell6.innerHTML = `<img src="${URL.createObjectURL(student.picture)}" alt="" style="width:50px; height:auto;" onclick="showFullImage('${URL.createObjectURL(student.picture)}')">`;
        cell7.innerHTML = new Date().toLocaleString();
        cell8.innerHTML = `<button class="deleteButton" onclick="deleteStudent(${index - 2})">Delete</button>`;

        current = current.next;
    }
}

function searchStudents() {
    let searchTerm = document.getElementById("searchBar").value.toLowerCase();
    let selectedFaculty = document.getElementById("collegeFilter").value;

    let filteredStudents = studentList.search(searchTerm, selectedFaculty);
    displayFilteredStudents(filteredStudents);
}