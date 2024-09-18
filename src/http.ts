// 로스트아크 전체 직업 통계 데이터 조회
export async function fetchOuterData() {
    const response = await fetch('http://localhost:8080/statistics/alluser');
    const resData = await response.json();

    if(!response.ok){
        throw new Error('Failed to fetch all user data');
    }

    return resData;
}

// 테스트 대상 전체 직업 통계 데이터 조회
export async function fetchData() {
    const response = await fetch('http://localhost:8080/statistics/data');
    const resData = await response.json();

    if(!response.ok){
        throw new Error('Failed to fetch all user data');
    }

    return resData;
}

export async function postData(url = "", data = {}) {
    console.log(data);
    const response = await fetch(`http://localhost:8080${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (response.ok) { console.log("Data posted successfully");
        console.log(response);
    } 
    else { console.log("Failed to post data" + JSON.stringify(data)); }
    return response;
  }

export async function getData(url = "") {
    const response = await fetch(`http://localhost:8080${url}`);
    const resData = await response.json();

    if(!response.ok){
        throw new Error('Failed to fetch all user data');
    }

    return resData;
}