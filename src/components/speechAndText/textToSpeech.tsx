"use client"
import React, { useState } from 'react';
import './textToSpeech.css'

// Define the component using TypeScript's React.FC (Function Component) type
let quesLen = 0;
const TextToSpeechComponent: React.FC<any>  = ({quest,currentQuestionAnswerList,addTOCurrentQA, setCurQuesIndex}) => {
  const [text, setText] = useState('');
  const [quesNo, setQuesNo] = useState(0);
 

  React.useEffect(() => {
    if(quest && quest.data && quest?.data[0]?.questions[quesNo]?.question.length){
      quesLen = quest?.data[0]?.questions.length;
    }
  },[quest])
  const speak = () => {
    if ('speechSynthesis' in window  && quest?.data[0]?.questions[quesNo]?.question) {
      const utterance = new SpeechSynthesisUtterance(quest?.data[0]?.questions[quesNo]?.question);
      window.speechSynthesis.speak(utterance);
      // Check if the question already exists in the currentQuestionAnswerList
      const existingQA = currentQuestionAnswerList.find((qa: { question: any; }) => qa.question === quest?.data[0]?.questions[quesNo]?.question);
      if (!existingQA) {
        addTOCurrentQA({ question: quest?.data[0]?.questions[quesNo]?.question, answer: '' });
        setCurQuesIndex(quesNo);
      } else {
        alert("This question is already asked you want to change you answer now then proceed else move to next  ");
      }

    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  };
  return (
    <div className="interviewer">
      <h2 className="interviewer__title">Interviewer</h2>
      <img
        className="interviewer__image"
        src="https://media.istockphoto.com/id/955158514/photo/confident-ceo-talking-about-company-success-strategy.jpg?s=612x612&w=0&k=20&c=V5uNpcECrfY8jazEaelq6DVHPoRx4M67-tYbiV-RKK8="
        alt="Interviewer"
      />
      <p className="interviewer__question-number">Question number: {quesNo + 1}</p>
      <div className="interviewer__controls">
        <button className="interviewer__button" disabled={quesNo === 0} onClick={() => setQuesNo((prevQuesNo) => prevQuesNo - 1)}>Prev</button>
        <button className="interviewer__button" onClick={speak}>Speak</button>
        <button className="interviewer__button" disabled={quesNo === quesLen - 1} onClick={() => setQuesNo((prevQuesNo) => prevQuesNo + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TextToSpeechComponent;
