import React, { useCallback, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { QUESTIONS } from "../data/questions";
import { postData } from "../http";

function Test() {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [question, setQuestion] = useState(QUESTIONS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showResultButton, setShowResultButton] = useState(false);
  const answersRef = useRef({});
  const [ID, setID] = useState("");

  const completeTest = useCallback(async () => {
    try {
      const finalAnswers = answersRef.current;

      const userData = {
        question1: finalAnswers[1] || 0,
        question2: finalAnswers[2] || 0,
        question3: finalAnswers[3] || 0,
        question4: finalAnswers[4] || 0,
        question5: finalAnswers[5] || 0,
        question6: finalAnswers[6] || 0,
        question7: finalAnswers[7] || 0,
        question8: finalAnswers[8] || 0,
        question9: finalAnswers[9] || 0,
        question10: finalAnswers[10] || 0,
      };

      const response = await postData("/users", userData);
      const ID = await response.json();
      setID(ID);

      await postData(`/results/${ID}`, { ID });
      setShowResultButton(true);
    } catch (error) {
      console.error("Error in completeTest:", error);
    }
  }, []);

  const handleClick = useCallback((questionId, answerValue) => {
    if (isSubmitting) return;

    answersRef.current = {
      ...answersRef.current,
      [questionId]: answerValue
    };

    setQuestion((prev) => {
      const nextQuestion = QUESTIONS.find((q) => q.id === prev.id + 1);
      return nextQuestion || prev;
    });

    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 10) {
        setIsSubmitting(true);
        setIsModalOpen(true);
        setTimeout(() => {
          completeTest();
        }, 1000); // 1초 대기
      }
      return newCount;
    });
  }, [completeTest, isSubmitting]);

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
    <div className="container h-screen w-screen bg-black flex justify-center items-center flex-col">
      <div className="w-[450px] h-auto bg-gray-900 border border-gray-400 flex justify-center items-start flex-col p-8 text-[#F9DA9B]">
        <p className="text-2xl mb-4">성향 테스트</p>
        <div className="mb-2 rounded-md" style={dynamicStyle}></div>
        <div className="border border-gray-500 w-full h-auto rounded-md">
          <div className="h-14 border-b border-gray-500 bg-gray-500 text-white flex items-center p-4 font-bold">
            {question.question}
          </div>
          {isSubmitting ? (
            <div className="h-14 flex items-center p-4">
              테스트 결과를 등록중입니다.
            </div>
          ) : (
            options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleClick(question.id, option.value)}
                className="h-14 cursor-pointer border-b border-gray-500 hover:bg-gray-500 hover:opacity-85 transition-all duration-200 ease-in-out flex items-center p-4"
              >
                {option.text}
              </div>
            ))
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-400 p-8 rounded-md border-gray-500">
            {showResultButton ? (
              <button onClick={() => navigate(`/results/${ID}`)}>
                결과 보러 가기
              </button>
            ) : (
              <p>테스트 결과를 등록중입니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Test;