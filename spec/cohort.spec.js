import Cohort from '../src/cohort.js'
import Student from '../src/student.js'
import { Organization } from '../src/organization.js'

// students @Object[] | | | | ❌
// | | | getStudentbyName() | fullName()@String | @Object{} | ❌
// | | | addStudent() | @Object{} | @Object{} | ❌
// | | | removeStudent() | @Object{} | @Object{} | ❌
// | | | setName() | cohortName@String | @Object{} | ❌
// | | | isFull() | | @Boolean | ❌

describe('cohort', () => {
  describe('creation', () => {
    it('is possible with valid name input', () => {
      const myCohort = new Cohort('#11')
      expect(myCohort.name).toEqual('#11')
      expect(myCohort.students).toEqual([])
    })

    it('creation fails when name is not a string', () => {
      expect(() => new Cohort('')).toThrowError('invalid input')
    })
  })

  describe('capacity', () => {
    it('after creation isFull is false', () => {
      const myCohort = new Cohort('#11')
      expect(myCohort.isFull()).toBeFalse()
    })

    it('after addition of 24 students isFull is true', () => {
      const myCohort = new Cohort('#11')
      for (let i = 0; i < 24; i++) {
        myCohort.students.push({ id: i })
      }
      expect(myCohort.isFull()).toBeTrue()
      expect(myCohort.students.length).toEqual(24)
    })

    it('at max lets adding students fail', () => {
      const myCohort = new Cohort('#11')
      for (let i = 0; i < 24; i++) {
        myCohort.students.push({ id: i })
      }

      expect(() => myCohort.addStudent({ id: 25 })).toThrowError(
        'Cohort is at maximum capacity'
      )
    })
  })

  describe('get students by name', () => {
    let myOrg
    let myCohort
    beforeAll(() => {
      myOrg = new Organization('Somewhere')
      myCohort = new Cohort('#11')
      for (let i = 0; i < 3; i++) {
        myCohort.addStudent(
          new Student('FirstName ' + i, 'LastName ' + i, '', '', myOrg)
        )
      }
    })

    it('works if student exists', () => {
      const result = myCohort.getStudentByName('FirstName 2 LastName 2')
      expect(typeof result).toEqual('object')
      expect(result.firstName).toEqual('FirstName 2')
      expect(result.lastName).toEqual('LastName 2')
    })

    it('does not work if student does not exist', () => {
      const result = myCohort.getStudentByName('FirstName 20 LastName 20')
      expect(result).toBeUndefined()
    })
  })
})
