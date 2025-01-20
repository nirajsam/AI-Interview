"use client"
import React, { useState, useEffect } from 'react';
import './textToSpeech.css';
import useQAStore from '@/statemaagement/quesAnsDataSore';
import SpeakingAnimation from '../micListenAnime/speakingAnimation';

let quesLen = 0;
let welcomespokenText = false;

const TextToSpeechComponent: React.FC<any> = ({ quest, currentQuestionAnswerList, addTOCurrentQA, setCurQuesIndex }) => {
  const [text, setText] = useState('');
  const [quesNo, setQuesNo] = useState(0);
  const [spokenText, setSpokenText] = useState('');
  const [startDisable, setStartDisable] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const { intervieweeDetails } = useQAStore();

  useEffect(() => {
    setSpokenText('');
    if (quesNo !== 0 || startDisable) {
      speak();
    }
  }, [quesNo]);

  useEffect(() => {
    if (quest && quest.data && quest?.data[0]?.questions[quesNo]?.question.length) {
      quesLen = quest?.data[0]?.questions.length;
    }
  }, [quest]);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      if (!welcomespokenText && quest.data.length > 0) {
        const wecomeText = `Hello ${intervieweeDetails.name} welcome to the interview, your technology is ${intervieweeDetails.technology} and your experience is ${intervieweeDetails.experience} years , you can start your interview by clicking on start button, then move to next after answering`;
        setSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(wecomeText);
        window.speechSynthesis.speak(utterance);
        welcomespokenText = true;
        utterance.onend = () => {
          setSpeaking(false);
        };
      }
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  }, []);

  const speak = () => {
    if ('speechSynthesis' in window && quest?.data[0]?.questions[quesNo]?.question) {
      const currentQuestion = quest?.data[0]?.questions[quesNo]?.question;
      setSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(currentQuestion);
      window.speechSynthesis.speak(utterance);
      setSpokenText(currentQuestion);

      const existingQA = currentQuestionAnswerList.find((qa: { question: any; }) => qa.question === quest?.data[0]?.questions[quesNo]?.question);
      if (!existingQA) {
        addTOCurrentQA({ question: quest?.data[0]?.questions[quesNo]?.question, answer: '' });
        setCurQuesIndex(quesNo);
      } else {
        setCurQuesIndex(quesNo);
        alert("This question is already asked you want to change your answer now then proceed else move to next");
      }
      utterance.onend = () => {
        setSpeaking(false);
      };
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
    setStartDisable(true);
  };

  return (
    <div className="interviewer">
      <h2 className="interviewer__title">Interviewer</h2>
      
      <img
        className="interviewer__image"
        src="https://media.istockphoto.com/id/955158514/photo/confident-ceo-talking-about-company-success-strategy.jpg?s=612x612&w=0&k=20&c=V5uNpcECrfY8jazEaelq6DVHPoRx4M67-tYbiV-RKK8="
        alt="Interviewer"
      />
      {speaking && <SpeakingAnimation />}
      <p className="interviewer__question-number">Question number: {quesNo + 1}</p>
      <div className="interviewer__controls">
        <button className="interviewer__button" disabled={quesNo === 0} onClick={() => setQuesNo((prevQuesNo) => prevQuesNo - 1)}>Prev</button>
        <button className="interviewer__button" onClick={speak} disabled={startDisable}>Start</button>
        <button className="interviewer__button" disabled={quesNo === quesLen - 1 || !startDisable} onClick={() => setQuesNo((prevQuesNo) => prevQuesNo + 1)}>Next</button>
      </div>
      <p className="interviewer__spoken-text">{spokenText}</p>
    </div>
  );
};

export default TextToSpeechComponent;
