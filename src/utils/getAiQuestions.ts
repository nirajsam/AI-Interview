import ExtractQuestions from './fetchAllQuestions';
import { generateData } from './gemini';

interface Question {
  question: string;
}

interface QuizObject {
  data: Array<{
    _id: string;
    interviewName: string;
    level: string;
    __v: { $numberInt: string };
    questions: Question[];
    testTime: number;
  }>;
}

const getAiQuestions = async (intervieweeDetails: { name: string, technology: string, experience: string, time: string, token: string }): Promise<QuizObject | undefined> => {
  const interviewTopic = intervieweeDetails.technology;
  const experienceLevel = intervieweeDetails.experience;
  const requiredTime = `${intervieweeDetails.time} questions`;
// suppose you are interviewer , interviewing candidate with skill {React} having experience of {5 years}, so now provide questions related to to these skill in just json format nothing else and also consider you need to complete this interview withing an hour
  const AiInput = `suppose you are interviewer , interviewing candidate with skill ${interviewTopic} having experience of ${experienceLevel} years, so now provide questions related to to these skill in just json format with key name like question1, question2 nothing else and also consider you need to ask  ${requiredTime}`;
  const AIOutput = await generateData(AiInput, intervieweeDetails.token);
  if (AIOutput === undefined) {
    console.error("Failed to generate data");
    return;
  }
  // Clean AIOutput to remove unwanted prefix/suffix if present
  const cleanedOutput = AIOutput.replace(/^[^{]*{|}[^}]*$/g, '');


  let parsedData;
  try {
    // Ensure JSON format by parsing
    parsedData = JSON.parse(`{${cleanedOutput}}`);
  } catch (error) {
    console.error("Failed to parse AIOutput as JSON:", error);
    return;
  }

//   const processQuestions = (data: any): Question[] => {
//     return data.questions.map((item: any) => {
//       const questionKey = Object.keys(item)[0];

//       return {
//         question: item[questionKey]
//       };
//     });
//   };

const formattedQuestions = ExtractQuestions(parsedData).map((question: string) => {
    return { question };
  });

  const QuesObject: QuizObject| undefined = {
    data: [{
      _id: "662c1016183253fbfd20dd4a",
      interviewName: interviewTopic,
      level: experienceLevel,
      __v: { $numberInt: "0" },
      questions: formattedQuestions,
      testTime: Number(requiredTime)*60,
    }]
  };

  return QuesObject;
};

export { getAiQuestions };
