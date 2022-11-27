import React, { useState, useEffect } from "react"
import Question from "./components/Question"
import { v4 as uuidv4 } from 'uuid'
import './style.css';

export default function App() {

  const [loadingData, setLoadingData] = useState(true)
  const [questions, setQuestions] = useState([0])
  const [showQuiz, setShowQuiz] = useState(false)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState([])

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then(resp => resp.json())
      .then(data => {
        const questionData = data.results.map(question => ({...question, correctChoice: false, id: uuidv4()}))

        setQuestions(questionData)
        setLoadingData(false)
      })
  }, [])

  const questionElements = questions.map((question, i) => {
    return <Question
      className="question"
      showScore={showScore}
      key={i}
      index={i}
      data={question}
      handleClick={(id, correctChoice) => gradeAnswer(id, correctChoice)}
    />
  }
  )

  function gradeAnswer(id, correctChoice) {
    setQuestions(prevQuestionData => prevQuestionData.map(questionData => {
      if (id === questionData.id) {
        return correctChoice ?
          { ...questionData, correctChoice: true } :
          { ...questionData, correctChoice: false }
      } else {
        return questionData
      }
    }))
  }

  useEffect(() => {
    setScore(questions.map(question => question.correctChoice)
      .reduce((acc, answer) => { return acc += answer ? 1 : 0 }, 0))
  }, [questions])

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="app">
      {showQuiz ?
        <div>
          {questionElements}
          {showScore ?
            <div>
              <h4>You answered {score} / {questions.length} questions correctly</h4>
              <button className="start-btn" onClick={refreshPage}>Play again</button>
            </div>
            :
            <button className="start-btn" onClick={() => {
              setShowScore(prev => !prev)
            }}>Check answers</button>
          }
        </div> :
        <div className="start-screen" >
          <h1 className="start-title">Quizzical</h1>
          <button className="start-btn" disabled={loadingData} onClick={() => setShowQuiz(prev => !prev)}>
            Start Quiz
          </button>
        </div>
      }
    </div>
  )
}