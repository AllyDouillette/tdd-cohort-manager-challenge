// - Create a cohort with a cohort name
// - Search for a cohort by cohort name
// - Remove a cohort by cohort name
// - Throw errors if student or cohort not found

import { cohortCapacity } from '../src/constants.js'

class Cohort {
  constructor(name) {
    if (!name || typeof name !== 'string') {
      throw new Error('invalid input')
    }

    this.name = name
    this.students = []
  }

  setName(newName) {
    if (!newName || typeof newName !== 'string') {
      throw new Error('invalid input')
    }
    this.name = newName
  }

  isFull() {
    return this.students.length === cohortCapacity
  }

  getStudentByName(fullName) {
    return this.students.find((student) => student.fullName() === fullName)
  }

  getStudentByID(id) {
    return this.students.find((student) => student.studentID === id)
  }

  addStudent(studentObj) {
    if (this.isFull()) {
      throw new Error('Cohort is at maximum capacity')
    }

    if (this.students.filter((student) => student === studentObj).length) {
      throw new Error('Student already present')
    }

    this.students.push(studentObj)
  }

  removeStudent(studentObj) {
    if (!this.students.filter((student) => student === studentObj).length) {
      throw new Error('Student not present')
    }

    this.students = this.students.filter((student) => student !== studentObj)
  }
}

export default Cohort
