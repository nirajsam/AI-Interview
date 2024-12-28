// Import necessary modules and components
"use client";
import React, { useState, useEffect } from 'react';
import './page.css'; // Ensure this file is created and styled as per BEM
// import StartButton from '@/components/startPage/StartButton';
import SpeechToTextComponent from '@/components/speechAndText/speechToText';
import TextToSpeechComponent from '@/components/speechAndText/textToSpeech';
import { getAiQuestions } from '@/utils/getAiQuestions';
import useQAStore from '@/statemaagement/quesAnsDataSore';
import StartPage from '@/components/intervieweeDetails/intervieweeDetails';
import ErrorBoundary from '@/components/errorBoundry/errorBoundry';

// Define the Home component
const Home: React.FC = () => {
  const { qaList, addQA, currentQuestionIndex, setCurrentQuestionIndex, intervieweeDetails } = useQAStore();
  const [quesData, setQuesData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);

  const fetchQuestionsFromAI = async () => {
    try {
      setLoading(true);
      const quesdat: any = await getAiQuestions(intervieweeDetails);
      if(quesdat){
        console.log(quesdat);
        setQuesData(quesdat);
        setLoading(false);
      }else{
        throw new Error('Failed to fetch questions');
      }
      
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!(intervieweeDetails.name==='' && intervieweeDetails.technology==='' && intervieweeDetails.experience==='')){
      fetchQuestionsFromAI();
    }
    
  }, [intervieweeDetails]);
  console.log(intervieweeDetails)
  if (!start) {
    return (
      <div className="main-start-page">
        <h1 className='main-start-page__title'>Interview Buddy</h1>
        <StartPage/>
        <button className='main-start-page__button' disabled={intervieweeDetails.name==='' && intervieweeDetails.technology==='' && intervieweeDetails.experience===''} onClick={()=>{setStart(true)}}>Start your Interview</button>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="home-page">
        <h1 className="home-page__loading">Loading...</h1>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<h1>something went wrong</h1>}>
    <div className="home-page">
      {/* Uncomment the StartButton component if needed */}
      {/* <StartButton /> */}
      <div className='home-page__speechcomponent'>
        {currentQuestionIndex !== 404?
        <TextToSpeechComponent
          quest={quesData}
          currentQuestionAnswerList={qaList}
          addTOCurrentQA={addQA}
          setCurQuesIndex={setCurrentQuestionIndex}
        />:''}
        <SpeechToTextComponent
          quest={quesData}
          currentQuestionAnswerList={qaList}
          addTOCurrentQA={addQA}
          currQuesIndex={currentQuestionIndex}
        />
      </div>
    </div>
    </ErrorBoundary>
  );
};

export default Home;
