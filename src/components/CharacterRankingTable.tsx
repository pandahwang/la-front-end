import React, { useState, useEffect, CSSProperties } from "react";

interface CustomCSSProperties extends CSSProperties {
  "--target-width"?: string;
}

interface RankingItem {
  name: string;
  icon: string;
  value: number;
}

interface CharacterRankingTableProps {
  fnc : () => Promise<RankingItem[]>;
}

const CharacterRankingTable: React.FC<CharacterRankingTableProps> = ({fnc}) => {
  const [animate, setAnimate] = useState(false);
  const [data, setData] = useState<RankingItem[]>([]);

  useEffect(() => {
    setAnimate(true);
  }, []);
  
  useEffect(() => {
    fnc().then((resData) => {
      
      setData(resData);
  });
  }, [fnc]);

  const MAXVALUE = Math.max(...data.map((item) => item.value));

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
                      item.value === 0 ? 0 : (item.value / MAXVALUE) * 100
                    }%`,
                    width: animate ? "var(--target-width)" : "0%",
                  } as CustomCSSProperties
                }
              ></div>
            </div>
            <span className="ml-2 w-12 text-right">
              {((item.value / MAXVALUE) * 100).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterRankingTable;
