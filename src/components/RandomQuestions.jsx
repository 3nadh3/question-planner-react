import "../css/table.css";

const RandomQuestion = ({
  startNumber,
  endNumber,
  totalQuestions,
  eachQuestion,
  examRequired,
  examQuestions,
  goBackToForm
}) => {
  const generateRandomQuestions = (count, availableQuestions, exclude = []) => {
    const questions = [];
    while (questions.length < count && availableQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const randomQuestion = availableQuestions.splice(randomIndex, 1)[0];
      if (!exclude.includes(randomQuestion)) {
        questions.push(randomQuestion);
        exclude.push(randomQuestion);
      }
    }
    return questions;
  };

  const randomizer = (s, e, N, n, want, num_exam_questions) => {
    const allQuestions = Array.from({ length: N }, (_, index) => index + 1);
    const results = [];

    if (want.toLowerCase() === 'yes') {
      const q = parseInt(num_exam_questions, 10);
      if (n > Math.floor(N / 2)) {
        console.log("Error: eachQuestion should be less than or equal to half of totalQuestions for a better plan.");
        return results;
      }

      for (let i = s; i <= e; i++) {
        const studentQuestions = generateRandomQuestions(n, [...allQuestions]);
        
        const examQuestionCount = Math.min(q, n); // Ensure that exam questions <= student questions
        const examQuestions = generateRandomQuestions(examQuestionCount, [...studentQuestions]);

        results.push({ student: i, studentQuestions, examQuestions });
      }
    } else if (want.toLowerCase() === 'no') {
      for (let i = s; i <= e; i++) {
        const studentQuestions = generateRandomQuestions(n, [...allQuestions]);
        results.push({ student: i, studentQuestions });
      }
    } else {
      console.log("Invalid input for 'want' parameter.");
    }
    return results;
  };

  const results = randomizer(
    startNumber,
    endNumber,
    totalQuestions,
    eachQuestion,
    examRequired,
    examQuestions
  );

  function printQuestionsTable() {
    var table = document.querySelector('.printQuestions table');
    var win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head><title>Questions Table</title>');
    win.document.write('<style>table { border-collapse: collapse; } th, td { border: 1px solid black; padding: 5px; }</style>');
    win.document.write('</head><body>');
    win.document.write(table.outerHTML);
    win.document.write('</body></html>');
    win.print();
    win.close();
  }
  
  function printExamQuestionsTable() {
    var table = document.querySelector('.printExamQuestions table');
    var win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head><title>Exam Questions Table</title>');
    win.document.write('<style>table { border-collapse: collapse; } th, td { border: 1px solid black; padding: 5px; }</style>');
    win.document.write('</head><body>');
    win.document.write(table.outerHTML);
    win.document.write('</body></html>');
    win.print();
    win.close();
  }
  
  return (
    <div className="questions">
      <button onClick={goBackToForm}>Back to Form</button>
      <div className="container">
        <div className="table-container printStudentQuestions">
          <h2>Student Questions</h2>
          <button onClick={printQuestionsTable} className="printQuestionsTableButton btn btn-primary btn-sm">Print Student Questions</button>
          <div className="printQuestions">
            <table className="questions-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Student Questions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{result.student}</td>
                    <td>{result.studentQuestions.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {examRequired === 'yes' && (
          <div className="table-container printExamQuestions">
            <h2>Exam Questions</h2>
            <button onClick={printExamQuestionsTable} className="printExamQuestionsTableButton btn btn-primary btn-sm">Print Exam Questions</button>
            <div className="printExamQuestions content-to-hide-when-printing">
              <table className="questions-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Exam Questions</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index}>
                      <td>{result.student}</td>
                      <td>{result.examQuestions.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RandomQuestion;
