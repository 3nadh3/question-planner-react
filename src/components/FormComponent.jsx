import React, { useState } from 'react';
import "../css/formcss.css"; 
import RandomQuestion from './RandomQuestions';


function Form() {
  const [startNumber, setStartNumber] = useState('');
  const [endNumber, setEndNumber] = useState('');
  const [totalQuestions, setTotalQuestions] = useState('');
  const [eachQuestion, setEachQuestion] = useState('');
  const [examRequired, setExamRequired] = useState('');
  const [examQuestions, setExamQuestions] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);


  function goBackToForm() {
    setIsFormSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    if (!startNumber || !endNumber || !totalQuestions || !eachQuestion || !examRequired || (examRequired === "yes" && !examQuestions)) {
      alert("Fields shouldn't be empty");
      return;
    }
  
    if (eachQuestion > Math.ceil(totalQuestions / 2)) {
      alert("Questions cannot be greater than half of total questions for a better plan.");
      return;
    }
    
    if (examRequired === "yes" && examQuestions > eachQuestion) {
      alert("Number of exam questions cannot be greater than each question.");
      return;
    }
    if (startNumber === endNumber) {
      alert("Starting number and ending number shouldn't be equal.");
      return;
    }
    if (examRequired === "yes" && examQuestions === eachQuestion) {
      alert("Number of exam questions cannot be equal to questions.");
      return;
    }
    if (examRequired === "yes" && examQuestions === totalQuestions) {
      alert("Number of exam questions cannot be equal to total questions.");
      return;
    }
    if (examRequired === 'no' && eachQuestion > Math.ceil(totalQuestions / 2)) {
      alert("Error: eachQuestion should be less than or equal to half of totalQuestions for a better plan.");
      return;
    }
  
    setIsFormSubmitted(true);
  }
  
  return (
    <>
      {isFormSubmitted ? (
        <RandomQuestion  
          startNumber={startNumber}
          endNumber={endNumber}
          totalQuestions={totalQuestions}
          eachQuestion={eachQuestion}
          examRequired={examRequired}
          examQuestions={examQuestions}
          goBackToForm={goBackToForm} />
      ) : (
        <div className='centered-div'>
          <div className='form'>
            <form onSubmit={handleSubmit}>
              <label htmlFor="startNumber">Starting Roll Number:</label>
              <input type="number" id="startNumber" name="startNumber" min="1" value={startNumber} onChange={e => setStartNumber(e.target.value)} />
              <br /><br />

              <label htmlFor="endNumber">Ending Roll Number:</label>
              <input type="number" id="endNumber" name="endNumber" min="1" value={endNumber} onChange={e => setEndNumber(e.target.value)} />
              <br /><br />

              <label htmlFor="totalQuestions">Total Number Questions:</label>
              <input type="number" id="totalQuestions" name="totalQuestions" min="1" value={totalQuestions} onChange={e => setTotalQuestions(e.target.value)} />
              <br /><br />

              <label htmlFor="eachQuestion">No. of Questions For Student:</label>
              <input type="number" id="eachQuestion" name="eachQuestion" min="1" value={eachQuestion} onChange={e => setEachQuestion(e.target.value)} />
              <br /><br />

              <label htmlFor="examRequired">Do you require exam questions?</label>
              <div className="radio-group">
                <input type="radio" id="yes" name="examRequired" value="yes" onChange={e => setExamRequired(e.target.value)} />
                <label htmlFor="yes">Yes</label>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input type="radio" id="no" name="examRequired" value="no" onChange={e => setExamRequired(e.target.value)} />
                <label htmlFor="no">No</label>
              </div>

              {examRequired === 'yes' && (
                <div>
                  <label htmlFor="examQuestions">No. of questions for exam:</label>
                  <input type="number" id="examQuestions" name="examQuestions" min="1" value={examQuestions} onChange={e => setExamQuestions(e.target.value)} />
                  <br /><br />
                </div>
              )}

              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Form;