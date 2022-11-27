import React, { useState } from "react"
import Answer from "./Answer"
import { v4 as uuidv4 } from 'uuid'
import '../style.css';

export default function Question(props) {

    const [answers, setAnswers] = useState(generateAnswers())

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }

    function generateAnswers() {
        const correctAnswer = props.data.correct_answer
        const answerOptions = props.data.incorrect_answers.concat([correctAnswer])
        const randomOptions = shuffleArray(answerOptions)
        const answerData = randomOptions.reduce((acc, answer) => {
            return [
                ...acc,
                {
                    value: answer,
                    isCorrect: answer === correctAnswer,
                    id: uuidv4(),
                    selected: false
                }
            ]
        }, [])
        // console.log(answerData)
        return answerData
    }

    function selectAnswer(id, isCorrect) {
        setAnswers(oldAnswerData => oldAnswerData.map(answer => {
            return { ...answer, selected: answer.id === id }
        }))
        props.handleClick(props.data.id, isCorrect)
    }


    const answerElements = answers.map(answer => {
        return <Answer
            isCorrect={answer.isCorrect}
            showScore={props.showScore}
            key={answer.id}
            value={decodeHTMLEntities(answer.value)}
            selected={answer.selected}
            selectAnswer={() => selectAnswer(answer.id, answer.isCorrect)}
        />
    }
    )

    function decodeHTMLEntities(text) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }

    return (
        <div className="question-container" >
            <h3 className="question">{decodeHTMLEntities(props.data.question)}</h3>
            <div className="answer-container" >
                {answerElements}
            </div>
            <hr />
        </div>
    )
}


