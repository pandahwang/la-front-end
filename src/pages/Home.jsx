import React from "react";
import { useNavigate } from "react-router-dom";
import AiChatBtn from "../components/AiChatBtn";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center flex-col">
      <div className="rounded-full overflow-hidden h-14 w-14 mb-8">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHzT3JpeP-ow7qoHbyMIJis5e8besJMHaeYQ&s" />
      </div>
      <div className="w-[450px] h-72 bg-gray-900 border border-gray-400 mb-4 flex justify-center items-center flex-col p-4 text-[#F9DA9B]">
        <p className="text-[#956C3B] font-bold text-3xl mb-4">
          성향 테스트 + 직업 선택
        </p>
        <p className="mb-4 text-xl">Big 5 테스트란?</p>
        <p className="text-sm text-center">
          인간의 성격을 5가지 요인들로 설명하는 성격심리 모형. 학계에서 논의된
          5요인 모형을 기반으로 한다. 성격심리학자들에게 신뢰를 받고 있는 검증된
          이론이다.
        </p>
        <div className="text-xs mt-8">
          <a href="https://namu.wiki/w/Big5">자세히</a>
        </div>
      </div>
      <div className="w-[450px] h-auto bg-gray-900 border border-gray-400 flex justify-center items-center flex-col p-4 text-[#F9DA9B]">
        <div className="h-36 mb-2">
          <img
            src="https://mnd-assets.mynewsdesk.com/image/upload/c_fill,dpr_auto,f_auto,g_auto,q_auto:good,w_746/p3eriyzgleytjvpnbtaz"
            className="w-full h-full object-cover"
            alt="Image"
          />
        </div>
        <p>로스트아크 초보자입니까?</p>
        <div>
          {/* 첫 번째 버튼: "예" */}
          <button
            onClick={() => navigate("/test")}
            className="m-2 text-yellow-400 border border-red-700 bg-red-900 hover:bg-red-800 w-40 h-12 mr-4"
          >
            예
          </button>

          {/* 두 번째 버튼: "아니요" */}
          <button
            onClick={() => navigate("/test")}
            className="m-2 text-yellow-400 border border-yellow-700 bg-black hover:bg-gray-800 w-40 h-12"
          >
            아니요
          </button>
        </div>
      </div>
      <div className="w-96 h-11 bg-gray-400 flex justify-center items-center">
        AD
      </div>
      <AiChatBtn />
    </div>
  );
}

export default Home;
