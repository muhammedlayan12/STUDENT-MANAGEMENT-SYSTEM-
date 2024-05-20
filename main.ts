import inquirer from 'inquirer';

class Student {
  id: number;
  name: string;
  age: number;

  constructor(id: number, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }

  displayDetails(): void {
    console.log(`ID: ${this.id}, Name: ${this.name}, Age: ${this.age}`);
  }
}

class StudentManagementSystem {
  students: Student[];

  constructor() {
    this.students = [];
  }

  addStudent(student: Student): void {
    this.students.push(student);
    console.log(`Student ${student.name} added successfully!`);
  }

  displayAllStudents(): void {
    console.log("List of all students:");
    this.students.forEach(student => {
      student.displayDetails();
    });
  }

  searchStudentById(id: number): void {
    const student = this.students.find(student => student.id === id);
    if (student) {
      console.log("Student found:");
      student.displayDetails();
    } else {
      console.log("Student not found with ID:", id);
    }
  }
}

async function promptAddStudent(): Promise<Student> {
  const questions = [
    {
      type: 'input',
      name: 'id',
      message: 'Enter student ID:'
    },
    {
      type: 'input',
      name: 'name',
      message: 'Enter student name:'
    },
    {
      type: 'input',
      name: 'age',
      message: 'Enter student age:'
    }
  ];

  const answers = await inquirer.prompt(questions) as { id: string, name: string, age: string };
  return new Student(parseInt(answers.id), answers.name, parseInt(answers.age));
}

async function promptSearchStudent(): Promise<number> {
  const answer = await inquirer.prompt({
    type: 'input',
    name: 'id',
    message: 'Enter student ID to search:'
  }) as { id: string };
  return parseInt(answer.id);
}

async function main(): Promise<void> {
  const studentSystem = new StudentManagementSystem();

  const newStudent = await promptAddStudent();
  studentSystem.addStudent(newStudent);

  studentSystem.displayAllStudents();

  const searchId
