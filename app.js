/**
 * app.js - Student Records Data Processor
 * Pure JavaScript implementation with immutable array operations.
 */

// 1. Hardcoded dataset of 30+ students
const students = [
  { id: 1, name: "Alice Adams", year: 1, course: "Computer Science", grades: [88, 92, 85], enrolled: true },
  { id: 2, name: "Bob Baker", year: 2, course: "Engineering", grades: [75, 80, 78], enrolled: true },
  { id: 3, name: "Charlie Cox", year: 3, course: "Business", grades: [90, 85, 92], enrolled: false },
  { id: 4, name: "Diana Prince", year: 4, course: "Arts", grades: [95, 98, 96], enrolled: true },
  { id: 5, name: "Evan Ellis", year: 1, course: "Computer Science", grades: [60, 65, 70], enrolled: true },
  { id: 6, name: "Fiona Fox", year: 2, course: "Engineering", grades: [88, 89, 90], enrolled: true },
  { id: 7, name: "George Gomez", year: 3, course: "Business", grades: [72, 75, 70], enrolled: true },
  { id: 8, name: "Hannah Hill", year: 4, course: "Arts", grades: [85, 87, 86], enrolled: false },
  { id: 9, name: "Ian Ives", year: 1, course: "Computer Science", grades: [90, 95, 92], enrolled: true },
  { id: 10, name: "Julia Jones", year: 2, course: "Engineering", grades: [82, 80, 85], enrolled: true },
  { id: 11, name: "Kevin King", year: 3, course: "Business", grades: [78, 82, 80], enrolled: true },
  { id: 12, name: "Laura Lee", year: 4, course: "Arts", grades: [92, 90, 94], enrolled: true },
  { id: 13, name: "Mike Miller", year: 1, course: "Computer Science", grades: [50, 55, 60], enrolled: false },
  { id: 14, name: "Nina Novak", year: 2, course: "Engineering", grades: [95, 96, 98], enrolled: true },
  { id: 15, name: "Oscar Ortiz", year: 3, course: "Business", grades: [88, 85, 84], enrolled: true },
  { id: 16, name: "Paula Penn", year: 4, course: "Arts", grades: [91, 93, 90], enrolled: true },
  { id: 17, name: "Quinn Quirk", year: 1, course: "Computer Science", grades: [80, 85, 88], enrolled: true },
  { id: 18, name: "Rachel Roth", year: 2, course: "Engineering", grades: [70, 72, 75], enrolled: false },
  { id: 19, name: "Sam Smith", year: 3, course: "Business", grades: [85, 88, 90], enrolled: true },
  { id: 20, name: "Tina Turner", year: 4, course: "Arts", grades: [98, 99, 97], enrolled: true },
  { id: 21, name: "Uma Upton", year: 1, course: "Computer Science", grades: [75, 78, 80], enrolled: true },
  { id: 22, name: "Victor Vance", year: 2, course: "Engineering", grades: [89, 91, 92], enrolled: true },
  { id: 23, name: "Wendy West", year: 3, course: "Business", grades: [82, 84, 86], enrolled: true },
  { id: 24, name: "Xander Xi", year: 4, course: "Arts", grades: [], enrolled: false }, // Edge case: no grades
  { id: 25, name: "Yara Young", year: 1, course: "Computer Science", grades: [92, 94, 96], enrolled: true },
  { id: 26, name: "Zack Zane", year: 2, course: "Engineering", grades: [65, 68, 70], enrolled: true },
  { id: 27, name: "Adam Ant", year: 3, course: "Business", grades: [77, 80, 82], enrolled: true },
  { id: 28, name: "Bella Blue", year: 4, course: "Arts", grades: [88, 90, 85], enrolled: true },
  { id: 29, name: "Caleb Cook", year: 1, course: "Computer Science", grades: [84, 86, 88], enrolled: true },
  { id: 30, name: "Daisy Duck", year: 2, course: "Engineering", grades: [93, 95, 97], enrolled: true }
];

// 2. Core Functions

function getAverageGrade(student) {
  if (!student || !student.grades || student.grades.length === 0) return 0;
  // Using REDUCE
  const sum = student.grades.reduce((total, grade) => total + grade, 0);
  return Number((sum / student.grades.length).toFixed(2));
}

function getTopStudents(studentsArray, n) {
  if (n < 0) throw new Error("n must be a non-negative number."); // Stretch Goal: Validation
  if (!studentsArray || studentsArray.length === 0) return [];
  
  // Immutability: Create a shallow copy before sorting
  // Using SORT
  return [...studentsArray]
    .sort((a, b) => getAverageGrade(b) - getAverageGrade(a))
    .slice(0, n);
}

function groupByCourse(studentsArray) {
  if (!studentsArray) return {};
  // Using REDUCE for object construction
  return studentsArray.reduce((grouped, student) => {
    if (!grouped[student.course]) {
      grouped[student.course] = [];
    }
    grouped[student.course].push(student);
    return grouped;
  }, {});
}

function getEnrolledCount(studentsArray) {
  if (!studentsArray) return { enrolled: 0, notEnrolled: 0 };
  
  // Using FILTER 
  const enrolledCount = studentsArray.filter(student => student.enrolled).length;
  const notEnrolledCount = studentsArray.length - enrolledCount;
  
  return {
    enrolled: enrolledCount,
    notEnrolled: notEnrolledCount
  };
}

function findStudent(studentsArray, name) {
  if (!studentsArray || !name) return null;
  const searchName = name.toLowerCase().trim();
  // Edge case: Returns null if not found
  return studentsArray.find(student => student.name.toLowerCase() === searchName) || null;
}

function getCourseAverages(studentsArray) {
  if (!studentsArray || studentsArray.length === 0) return [];
  
  const groupedByCourse = groupByCourse(studentsArray);
  
  // Using MAP
  const courseAverages = Object.keys(groupedByCourse).map(course => {
    const courseStudents = groupedByCourse[course];
    const totalGrades = courseStudents.reduce((sum, student) => sum + getAverageGrade(student), 0);
    const average = courseStudents.length ? (totalGrades / courseStudents.length) : 0;
    
    return {
      course,
      average: Number(average.toFixed(2))
    };
  });
  
  // Sort from highest to lowest
  return courseAverages.sort((a, b) => b.average - a.average);
}

function exportSummary(studentsArray) {
  if (!studentsArray || studentsArray.length === 0) return { error: "Empty dataset" };

  const totalStudents = studentsArray.length;
  const totalGradesSum = studentsArray.reduce((sum, student) => sum + getAverageGrade(student), 0);
  
  return {
    totalStudents,
    overallAverageGrade: Number((totalGradesSum / totalStudents).toFixed(2)),
    topPerformingStudent: getTopStudents(studentsArray, 1)[0],
    courseBreakdown: getCourseAverages(studentsArray)
  };
}

// 3. Stretch Goal Functions

function filterByYear(studentsArray, year) {
  return studentsArray.filter(student => student.year === year);
}

function sortByName(studentsArray) {
  return [...studentsArray].sort((a, b) => a.name.localeCompare(b.name));
}


// 4. Main Execution Function
function main() {
  console.log("==========================================");
  console.log("   STUDENT RECORDS DATA ANALYSIS REPORT   ");
  console.log("==========================================\n");

  // Basic lookups
  console.log("--- Enrolled vs Not Enrolled ---");
  console.log(getEnrolledCount(students));
  
  console.log("\n--- Top 3 Students ---");
  const top3 = getTopStudents(students, 3);
  top3.forEach((s, index) => {
    console.log(`${index + 1}. ${s.name} (${s.course}) - Avg: ${getAverageGrade(s)}`);
  });

  console.log("\n--- Course Average Rankings ---");
  console.log(getCourseAverages(students));

  console.log("\n--- Edge Case Search Results ---");
  console.log("Searching for 'Diana Prince':", findStudent(students, "Diana Prince") ? "Found!" : "Not Found");
  console.log("Searching for 'John Doe':", findStudent(students, "John Doe")); // Should be null
  
  console.log("\n--- Student with no grades (Edge Case) ---");
  const xander = findStudent(students, "Xander Xi");
  console.log(`Xander's average: ${getAverageGrade(xander)}`); // Should gracefully return 0

  console.log("\n--- EXPORT SUMMARY ---");
  console.log(JSON.stringify(exportSummary(students), null, 2));

  console.log("\n==========================================");
  console.log("               END OF REPORT              ");
  console.log("==========================================");
}

// Run the application
main();
