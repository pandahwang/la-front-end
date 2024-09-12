import React, { useState, useEffect, CSSProperties } from "react";
import RadarChart from "../components/RadarChart";
import { useNavigate } from "react-router-dom";

interface CustomCSSProperties extends CSSProperties {
  "--target-width"?: string;
}

function Results() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const data = [
    { name: "무기", value: 5.76, color: "bg-amber-300", icon: "🔫" },
    { name: "냉기", value: 5.68, color: "bg-red-500", icon: "❄️" },
    { name: "정벌", value: 4.53, color: "bg-pink-400", icon: "🏹" },
    { name: "악마", value: 4.35, color: "bg-purple-400", icon: "😈" },
    { name: "보조", value: 4.16, color: "bg-pink-300", icon: "🛡️" },
  ];

  const commentData = [
    {
      name: "ㅇㅇ",
      result: "홀리나이트",
      createdAt: "2024-09-03 21:58:21",
      content: "댓글 내용입니다.",
    },
    {
      name: "ㅇㅇ",
      result: "홀리나이트",
      createdAt: "2024-09-03 21:58:21",
      content: "댓글 내용입니다.",
    },
    {
      name: "ㅇㅇ",
      result: "홀리나이트",
      createdAt: "2024-09-03 21:58:21",
      content: "댓글 내용입니다.",
    },
    {
      name: "ㅇㅇ",
      result: "홀리나이트",
      createdAt: "2024-09-03 21:58:21",
      content: "댓글 내용입니다.",
    },
    {
      name: "ㅇㅇ",
      result: "홀리나이트",
      createdAt: "2024-09-03 21:58:21",
      content: "댓글 내용입니다.",
    },
    {
      name: "ㅇㅇ",
      result: "홀리나이트",
      createdAt: "2024-09-03 21:58:21",
      content: "댓글 내용입니다.",
    },
    {
      name: "ㅇㅇ",
      result: "홀리나이트",
      createdAt: "2024-09-03 21:58:21",
      content: "댓글 내용입니다.",
    },
    {
      name: "ㅇㅇ",
      result: "홀리나이트",
      createdAt: "2024-09-03 21:58:21",
      content: "댓글 내용입니다.",
    },
    {
      name: "ㅇㅇ",
      result: "홀리나이트",
      createdAt: "2024-09-03 21:58:21",
      content: "댓글 내용입니다.",
    },
  ];

  const navigate = useNavigate();

  const maxValue = Math.max(...data.map((item) => item.value));

  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  // 페이지네이션을 위한 댓글 데이터 계산
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = commentData.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  // 총 페이지 수 계산
  const totalPages = Math.ceil(commentData.length / commentsPerPage);

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="h-auto w-full bg-black flex justify-center items-center flex-row p-16">
      <div className="w-[450px] bg-gray-900 p-4 border border-gray-400">
        <RadarChart />
        <div className="text-white border-t border-yellow-300 mt-4 pt-2 pb-2">
          <p className="mb-2">
            <span className="text-yellow-300 font-bold">우호성: </span>
            대인 관계에서 보이는 질적인 측면을 확인하는 요인.
          </p>
          <p className="mb-2">
            <span className="text-yellow-600 font-bold">성실성: </span>
            개인의 조직화된 정도를 확인하는 요인.
          </p>
          <p className="mb-2">
            <span className="text-green-300 font-bold">외향성: </span>
            개인이 열정적으로 타인을 찾고 환경과 상호작용하는 것을 확인하는
            요인.
          </p>
          <p className="mb-2">
            <span className="text-purple-400 font-bold">개방성: </span>
            광범위한 주제에서 "새로운 것"에 대해 개인이 판단하는 경향을 확인하는
            요인.
          </p>
          <p className="mb-2">
            <span className="text-blue-400 font-bold">신경성: </span>
            개인이 일상 속에서 발생하는 힘든 경험들에 부정적 정서를 얼마나 자주
            경험하는지를 확인하는 요인.
          </p>
        </div>
        <div className="w-full max-w-md mx-auto pt-2 pb-2 bg-none border-t border-yellow-300">
          {data.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                <span className="text-xl">{item.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white font-medium">{item.name}</span>
                  <span className="text-white">{item.value.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      item.color
                    } transition-all duration-1000 ease-out ${
                      animate ? "animate-custom-width" : ""
                    }`}
                    style={
                      {
                        "--target-width": `${(item.value / maxValue) * 100}%`,
                        width: animate ? "var(--target-width)" : "0%",
                      } as CustomCSSProperties
                    }
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full max-w-md mx-auto pt-2 bg-none border-t border-yellow-300 text-white">
          <p>
            개인이 유저들의 재미와 초보자의 직업선택을 돕기위해 만든 앱입니다.
            로스트아크 공식 설문조사가 아닙니다.
          </p>
          <p className="mt-2">성향 테스트에 응해주셔서 감사합니다.</p>
          <div className="w-full justify-center flex flex-col items-center">
            <button
              onClick={() => navigate("/statistics/alluser")}
              className="m-2 text-yellow-400 border border-red-700 bg-red-900 hover:bg-red-800 w-40 h-12 "
            >
              직업 분포도 보기
            </button>
            <button
              onClick={() => navigate("/")}
              className="m-2 text-yellow-400 border border-red-700 bg-red-900 hover:bg-red-800 w-40 h-12 "
            >
              다시하기
            </button>
          </div>
        </div>
      </div>
      <div className="w-[450px] h-[1247px] bg-gray-900 p-4 border border-gray-400">
        <h2 className="text-xl font-bold mb-4 text-start text-[#F9DA9B]">
          사용자 의견
        </h2>
        <div className=" border-t border-yellow-300 mt-4 pt-2 pb-2">
          <form
            // onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-4 bg-none"
          >
            <div className="mb-4">
              <label
                htmlFor="nickname"
                className="block text-sm font-bold text-[#F9DA9B] mb-2"
              >
                닉네임
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                // value={formData.nickname}
                // onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block text-sm font-bold text-[#F9DA9B] mb-2"
              >
                한마디 남기기
              </label>
              <textarea
                id="comment"
                name="comment"
                // value={formData.comment}
                // onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-300 py-2 px-4 text-gray-900 font-bold hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              ✏️ 작성
            </button>
          </form>
        </div>
        <div className="border-t border-yellow-300 mt-4 pt-2 pb-2">
          <div className="h-auto overflow-y-auto">
            {currentComments.map((comment, index) => (
              <div key={index} className="mb-4 bg-gray-800 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-yellow-300 font-bold">
                    {comment.name}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {comment.createdAt}
                  </span>
                </div>
                <p className="text-white mb-2">{comment.content}</p>
                <p className="text-gray-400 text-sm">결과: {comment.result}</p>
              </div>
            ))}
          </div>
          {/* 페이지네이션 UI */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-yellow-300 text-gray-900"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full h-[150px] flex justify-center items-center">
          <div className="w-full h-24 bg-gray-400 flex justify-center items-center">
            AD
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
