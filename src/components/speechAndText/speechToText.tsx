"use client";

import React, { use, useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { getFeedBackFromAI } from '@/utils/getFeedBackFromAI';
import Feedback from '../feedback/feedback';
import './speechToText.css';
import useQAStore from '@/statemaagement/quesAnsDataSore';
import textConversion from '@/utils/textConversion';
import ListeningAnimation from '../micListenAnime/listeningAnimation';
import { FaMicrophoneLines, FaMicrophoneLinesSlash } from "react-icons/fa6";
import TipsModal from '../modalComp/tipsModal';
import { relative } from 'path';

// Define the structure of the props using TypeScript interfaces
interface Question {
  question: string;
}

interface QuestData {
  data: Array<{
    questions: Question[];
  }>;
}

interface SpeechToTextProps {
  quest: QuestData;
  currentQuestionAnswerList: {
    question: string;
    answer: string;
  }[];
  addTOCurrentQA: (qa: { question: string; answer: string }) => void;
  currQuesIndex: number;
}

const SpeechToTextComponent: React.FC<SpeechToTextProps> = ({ quest, currentQuestionAnswerList, addTOCurrentQA, currQuesIndex }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const {setCurrentQuestionIndex,intervieweeDetails } = useQAStore();
  const [isClient, setIsClient] = useState(false);
  const [text, setText] = useState('');
  const [feedbackData, setFeedbackData] = useState<String>('');
  const [feedbackDataLoading, setFeedbackDataLoading] = useState<String>('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    const currentQues = quest?.data[0]?.questions[currQuesIndex]?.question;
    const existingQa = currentQuestionAnswerList.find((qa: { question: string; }) => qa.question === currentQues);
    console.log(existingQa)
      if (existingQa) {
        // Update the existing answer
        setText(existingQa.answer);
      }
  }, [currQuesIndex]);
  const handleTextReset = () => {
    resetTranscript();
    setText('');
  };
  
  useEffect(() => {
    if (transcript) {
      const updatedText = textConversion(transcript);
      setText(updatedText);
    }
  }, [transcript]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <span>Loading...</span>;
  }
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  const handleAddAnswerTOCurrentQA = (data: string) => {
    const currentQuestion = quest?.data[0]?.questions[currQuesIndex]?.question;
    if (currentQuestion) {
      // Check if the current question exists in the currentQuestionAnswerList
      const existingQA = currentQuestionAnswerList.find((qa: { question: string; }) => qa.question === currentQuestion);
      if (existingQA) {
        // Update the existing answer
        existingQA.answer = data;
      } else {
        // Add a new entry if it doesn't exist
        addTOCurrentQA({
          question: currentQuestion,
          answer: data
        });
      }
    }
    handleTextReset();
  };
  const getYourFeedBack = async() => {
    setFeedbackDataLoading('loading feedback...')
    const feedBack = await getFeedBackFromAI(JSON.stringify(currentQuestionAnswerList), intervieweeDetails.token)
    setFeedbackData(feedBack)
    setCurrentQuestionIndex(404)
    setFeedbackDataLoading('feedback loaded')
  }
  if(feedbackData && feedbackDataLoading =='feedback loaded'){
    console.log(feedbackData)
    return <Feedback feedBackData={feedbackData}/>
  }
  
  return (
    <div className="speech-to-text">
      {/* Modal Button */}
      <button className="info-button" onClick={() => setModalIsOpen(true)} style={{position:'absolute', display:'flex', right:'5px', top:'5px', cursor:'help'}}>💡</button>
      
      {/* Modal Component */}
      <TipsModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <h3>Instructions for using mic to speak specific words</h3>
        <p>'next line': '\n'</p>
        <p>'comma': ','</p>
        <p>'full stop': '.'</p>
        <p>'period': '.'</p>
        <p>'question mark': '?'</p>
        <p>'exclamation mark': '!'</p>
        <p>'semicolon': ';'</p>
        <p>'colon': ':'</p>
        <p>'start bracket': '('</p>
        <p>'end bracket': ')'</p>
        <p>'open bracket': '('</p>
        <p>'close bracket': ')'</p>
      </TipsModal>
      <p className="speech-to-text__status" style={{ color: listening ? 'green' : 'red' , fontWeight: 'bold', fontSize: '2rem'}}>{listening ? <FaMicrophoneLines />: <FaMicrophoneLinesSlash />
      }</p>
      {listening && <ListeningAnimation/>}
      <div className='speech-to-text__group-button'>
      <button className="speech-to-text__button" onClick={() => SpeechRecognition.startListening({ continuous: true })} disabled={listening}>Speak</button>
      <button className="speech-to-text__button" onClick={SpeechRecognition.stopListening} disabled={!listening}>Stop</button>
      <button className="speech-to-text__button" onClick={handleTextReset} disabled={!text}>Reset</button>
      </div>
      <br />
      <textarea
        className="speech-to-text__textarea"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter your answer here or speak directly into the microphone and then you can edit here if required"
        rows={5}
        cols={50}
      />
      <div className='speech-to-text__group-button'>
      <button className="speech-to-text__button" onClick={() => handleAddAnswerTOCurrentQA(text)} disabled={!text}>Add Response</button>
      <button className="speech-to-text__button" onClick={() => getYourFeedBack()} disabled={currQuesIndex<quest?.data[0]?.questions.length-1}>Get Feedback</button>
      </div>
      <div>{feedbackDataLoading==='loading feedback...'?feedbackDataLoading:''}</div>
      
    </div>
  );
};

export default SpeechToTextComponent;
