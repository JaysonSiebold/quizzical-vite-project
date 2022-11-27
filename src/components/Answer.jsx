import React from "react"
import '../style.css';

export default function Answer(props) {
    
    let backgroundColor = 'white'
    let borderColor = '#293264'
    
    if(props.showScore) {
        if(props.isCorrect){
            backgroundColor = '#94D7A2'
            borderColor = '#94D7A2'
        } else if(props.selected){
            backgroundColor = '#F8BCBC'
            borderColor = '#F8BCBC'
        }
    } else if(props.selected){
        backgroundColor = '#D6DBF5'
        borderColor = '#D6DBF5'
    }
    
    return (
        <button 
            disabled={props.showScore} 
            style={{backgroundColor, borderColor}} 
            className="answer" 
            onClick={props.selectAnswer}>
            {props.value}
        </button>

    )
}


// const styles = (() => {
//         if(props.showScore){
//             if(props.isCorrect){
//                 return {
//                 backgroundColor: "#59E391"
//                 }
//             }
//             if(props.selected){
//                  return {
//                     backgroundColor: "pink"
//                 }
//             }
//         }
//         return {
//             backgroundColor: props.selected ? "#D6DBF5" : "white",
//             borderColor: props.selected ? "#D6DBF5" : "#293264"}
//     })()