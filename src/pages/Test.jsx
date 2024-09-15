import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QUESTIONS } from "../data/questions";
import { postData } from "../http";

function Test() {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [question, setQuestion] = useState(QUESTIONS[0]);
  const [answers, setAnswers] = useState([]);

  async function completeTest() {
            // /users POST
            try {
              const ID = await postData("/users", { answers }).then((res) => res.json());
              console.log("uuid: ", ID);
    
              // /results POST
              await postData(`/results/${ID}`, { ID });
            } catch (error) {
              console.error(error);
            }
  } 

  const handleClick = (answerValue) => {

    setAnswers((prevAnswers) => [...prevAnswers, { id: 'question' + question.id, answer: answerValue }]);

    setQuestion((prev) => {
      const nextQuestion = QUESTIONS.find((q) => q.id === prev.id + 1);
      if (nextQuestion) {
        return nextQuestion;
      }
      return prev;
    });

    setClickCount( (prev) => {
      const newCount = prev + 1;
      if (newCount === 10) {
        // console.log를 사용하여 네비게이션 시도를 로그로 남깁니다.
        console.log("Attempting to navigate to /result");

        completeTest();

        navigate("/result");
      }
      return newCount;
    });
  };

  const dynamicStyle = {
    height: "0.5rem",
    backgroundColor: "#fde047",
    width: `${(clickCount / 10) * 100}%`,
    transition: "width 0.3s ease-in-out",
  };

  const options = [
    { text: "전혀 아니다", value: 1 },
    { text: "별로 아니다", value: 2 },
    { text: "보통이다", value: 3 },
    { text: "약간 그렇다", value: 4 },
    { text: "매우 그렇다", value: 5 },
  ];

  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center flex-col">
      <div className="w-[450px] h-auto bg-gray-900 border border-gray-400 flex justify-center items-start flex-col p-8 text-[#F9DA9B]">
        <p className="text-2xl mb-4">성향 테스트</p>
        <div className="mb-2 rounded-md" style={dynamicStyle}></div>
        <div className="border border-gray-500 w-full h-auto rounded-md">
          <div className="h-14 border-b border-gray-500 bg-gray-500 text-white flex items-center p-4 font-bold">
            {question.question}
          </div>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={()=> handleClick(option.value)}
              className="h-14 cursor-pointer border-b border-gray-500 hover:bg-gray-500 hover:opacity-85 transition-all duration-200 ease-in-out flex items-center p-4"
            >
              {option.text}
            </div>
          ))}
        </div>
      </div>
      <div className="w-96 h-11 bg-gray-400 flex justify-center items-center">
        AD
      </div>
    </div>
  );
}

export default Test;
