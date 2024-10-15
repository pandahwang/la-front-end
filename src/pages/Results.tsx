import React, { useState, useEffect, CSSProperties } from "react";
import RadarChart from "../components/RadarChart";
import { useNavigate, useParams } from "react-router-dom";
import { getData, postData, deleteData, updateData } from "../http";

interface CustomCSSProperties extends CSSProperties {
  "--target-width"?: string;
}

interface ResultItem {
  name: string;
  value: number;
  color: string;
  icon: string;
}

interface Comment {
  nickname: string;
  topFactorResult: string;
  createdAt: string;
  content: string;
  userID: string;
  commentID: number;
}

interface Pages {
  startPage: number;
  endPage: number;
  totalPages: number;
  currentPage: number;
}

interface formData {
  userID: string;
  nickname: string;
  content: string;
  password: string;
}

function Results() {
  const { id } = useParams(); 
  const [animate, setAnimate] = useState(false);
  const [data, setData] = useState<ResultItem[]>([]);
  const [commentData, setCommentData] = useState<Comment[]>([]);
  const [pages, setPages] = useState<Pages>({
    startPage: 1,
    endPage: 1,
    totalPages: 1,
    currentPage: 1,
  });
  const [formData, setFormData] = useState<formData>({
    userID: id || "",
    nickname: "",
    content: "",
    password: "",
  });

  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  const maxValue = Math.max(...data.map((item) => item.value));

  useEffect(() => {
    setAnimate(true);
  }, []);


useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await getData(`/results/${id}`);
      setData(result);

 
      await fetchComments(pages.currentPage, searchText);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
  setAnimate(true);
}, [id, pages.currentPage, searchText]);



  const fetchComments = async (pageNumber: number, searchText: string) => {
    try {
      const searchParam = searchText ? `&searchText=${encodeURIComponent(searchText)}` : "";
      const result = await getData(`/comment/${pageNumber}?${searchParam}`);

      const formattedComments = (result?.comments || []).map((comment: any) => ({
        nickname: comment.nickname,
        content: comment.content,
        createdAt: comment.createdAt,
        userID: comment.userID || comment.user?.id,
        commentID: comment.id,
        topFactorResult: comment.topFactorResult,
      }));

      setCommentData(formattedComments);
      setPages({
        startPage: result.startPage,
        endPage: result.endPage,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSearch = () => {
    setPages({ ...pages, currentPage: 1 }); 
    fetchComments(1, searchText);
  };


  const paginate = (pageNumber: number) => {
    setPages({ ...pages, currentPage: pageNumber });
    fetchComments(pageNumber, searchText);
  };

 
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const commentPayload = {
        nickname: formData.nickname,
        password: formData.password,
        content: formData.content,
      };

      let response;
      if (editCommentId !== null) {
        response = await updateData(`/comment/update/${formData.userID}/${editCommentId}`, commentPayload);
        alert("댓글이 성공적으로 수정되었습니다.");
      } else {
        response = await postData(`/comment/${id}`, commentPayload);
        alert("댓글이 성공적으로 작성되었습니다.");
      }

 
      await fetchComments(pages.currentPage, searchText);
      setEditCommentId(null);
      setFormData({
        userID: id || "",
        nickname: "",
        content: "",
        password: "",
      });
    } catch (error) {
      console.error("댓글 작성 또는 수정 중 오류:", error);
      alert("댓글 작성 또는 수정 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  }




  function handleEditClick(comment: Comment) {
    setFormData({
      userID: comment.userID,
      nickname: comment.nickname,
      content: comment.content,
      password: "",
    });
    setEditCommentId(comment.commentID);
    window.scrollTo(0, 0);
  }

  async function handleDelete(userId: string | undefined, commentId: number | undefined) {
    if (!userId || !commentId) {
      alert("올바르지 않은 댓글 ID 또는 사용자 ID입니다.");
      return;
    }

    const password = prompt("댓글 삭제를 위해 비밀번호를 입력하세요:");
    if (!password || password.trim() === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await deleteData(`/comment/delete/${userId}/${commentId}`, { password });
      if (response) {
        setCommentData(commentData.filter((comment) => comment.commentID !== commentId));
        alert("댓글이 성공적으로 삭제되었습니다.");
      } else {
        alert("댓글 삭제에 실패했습니다. 비밀번호를 확인하세요.");
      }
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
      alert("댓글 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  }

  return (
    <div className="container h-[1600px] w-full bg-black flex justify-center items-center flex-row p-16" >
      <div className="result w-[450px] h-full bg-gray-900 p-4 border border-gray-400 min-w-80">
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
                <span className="text-xl">
                  <img src={item.icon} alt="classIcon" />
                </span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white font-medium">{item.name}</span>
                  <span className="text-white">
                    {((item.value / maxValue) * 5).toFixed(2)}
                  </span>
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
              onClick={() => navigate("/statistics/data")}
              className="m-2 text-yellow-400 border border-red-700 bg-red-900 hover:bg-red-800 w-40 h-12 "
            >
              테스트 결과 모아보기
            </button>
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
      <div className="result w-[450px] h-full bg-gray-900 p-4 border border-gray-400 min-w-80" >
        <h2 className="text-xl font-bold mb-4 text-start text-[#F9DA9B]">
          사용자 의견
        </h2>
        <div className="mb-4 flex justify-center items-center">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="검색어를 입력하세요..."
          className="w-3/4 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
        >
          검색
        </button>
      </div>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4 bg-none">
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
              value={formData.nickname}
              onChange={(e) =>
                setFormData({ ...formData, nickname: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-bold text-[#F9DA9B] mb-2"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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
              id="content"
              name="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-300 py-2 px-4 text-gray-900 font-bold hover:bg-yellow-200"
          >
            {editCommentId ? "댓글 수정" : "✏️ 댓글 작성"}
          </button>
        </form>
        <div className="border-t border-yellow-300 mt-4 pt-2 pb-2">
        
          {commentData.map((comment, index) => (
            <div key={index} className="mb-4 bg-gray-800 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-yellow-300 font-bold">
                  {comment.nickname}
                </span>
                <span className="text-gray-400 text-sm">
                  {comment.createdAt}
                </span>
              </div>
              <p className="text-white mb-2">{comment.content}</p>{" "}
              <span className="text-gray-400 text-sm">{comment.topFactorResult}</span>

              <div className="flex justify-end space-x-4 mt-2">
                <button
                  className="text-blue-500 hover:text-blue-300 px-2 py-1 border border-blue-500 rounded"
                  onClick={() => handleEditClick(comment)}
                >
                  수정
                </button>
                <button
                  className="text-red-500 hover:text-red-300 px-2 py-1 border border-red-500 rounded"
                  onClick={() =>
                    handleDelete(comment.userID, comment.commentID)
                  }
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: pages.totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                pages.currentPage === i + 1
                  ? "bg-yellow-300 text-gray-900"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;
