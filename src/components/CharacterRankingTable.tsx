import React, { useState, useEffect, CSSProperties } from "react";
import { fetchAllUser } from "../http";

interface CustomCSSProperties extends CSSProperties {
  "--target-width"?: string;
}

interface RankingItem {
  name: string;
  icon: string;
  percentage: number;
}

const CharacterRankingTable = () => {
  const [animate, setAnimate] = useState(false);

const [data, setData] = useState<RankingItem[]>([]);

  useEffect(() => {
    setAnimate(true);
  }, []);
  
  useEffect(() => {
    fetchAllUser().then((resData) => {
      
      setData(resData);
  });
  }, []);


  // const data = [
  //   { name: "도깨비", percentage: 7.72, icon: "🎭" },
  //   { name: "기상술사", percentage: 6.48, icon: "🌪️" },
  //   { name: "워로드", percentage: 5.94, icon: "⚔️" },
  //   { name: "소서리스", percentage: 5.79, icon: "🔮" },
  //   { name: "홀리나이트", percentage: 5.4, icon: "🛡️" },
  //   { name: "스카우터", percentage: 4.94, icon: "🔍" },
  //   { name: "건슬링어", percentage: 4.84, icon: "🔫" },
  //   { name: "바드", percentage: 4.64, icon: "🎵" },
  //   { name: "블레이드", percentage: 4.59, icon: "🗡️" },
  //   { name: "아르카나", percentage: 4.51, icon: "🃏" },
  //   { name: "데빌헌터", percentage: 4.38, icon: "😈" },
  //   { name: "창술사", percentage: 4.22, icon: "🔱" },
  //   { name: "인파이터", percentage: 3.97, icon: "👊" },
  //   { name: "배틀마스터", percentage: 3.8, icon: "🥋" },
  //   { name: "데모닉", percentage: 3.6, icon: "👿" },
  //   { name: "스트라이커", percentage: 3.41, icon: "🥊" },
  //   { name: "버서커", percentage: 3.09, icon: "💢" },
  //   { name: "소울이터", percentage: 2.99, icon: "👻" },
  //   { name: "디스트로이어", percentage: 2.87, icon: "🔨" },
  //   { name: "리퍼", percentage: 2.7, icon: "💀" },
  //   { name: "블래스터", percentage: 2.64, icon: "💣" },
  //   { name: "슬레이어", percentage: 1.71, icon: "🗡️" },
  //   { name: "기공사", percentage: 0.59, icon: "🧘" },
  // ];

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-900 text-white p-4 ">
      <h2 className="text-xl font-bold mb-4">Lost Ark 직업 분포도</h2>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="w-6 text-center mr-2"><img src={item.icon} alt="classIcon" /></span>
            <span className="w-24 mr-2">{item.name}</span>
            <div className="flex-grow bg-gray-700 h-5 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-gray-500 to-gray-600 transition-all duration-1000 ease-out ${
                  animate ? "animate-custom-width" : ""
                }`}
                style={
                  {
                    "--target-width": `${
                      item.percentage
                    }%`,
                    width: animate ? "var(--target-width)" : "0%",
                  } as CustomCSSProperties
                }
              ></div>
            </div>
            <span className="ml-2 w-12 text-right">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterRankingTable;
