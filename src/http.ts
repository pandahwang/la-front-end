// 로스트아크 전체 직업 통계 데이터 조회
export async function fetchOuterData() {
    const response = await fetch('https://classtest.site/api/statistics/alluser');
    const resData = await response.json();

    if(!response.ok){
        throw new Error('Failed to fetch all user data');
    }

    return resData;
}

// 테스트 대상 전체 직업 통계 데이터 조회
export async function fetchData() {
    const response = await fetch('https://classtest.site/api/statistics/data');
    const resData = await response.json();

    if(!response.ok){
        throw new Error('Failed to fetch all user data');
    }

    return resData;
}

export async function postData(url = "", data = {}) {
    console.log(data);
    const response = await fetch(`https://classtest.site/api${url}`, {
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
    const response = await fetch(`https://classtest.site/api${url}`);
    const resData = await response.json();

    if(!response.ok){
        throw new Error('Failed to fetch all user data');
    }
    console.log(resData);
    return resData;
}

export async function deleteData(url = "", data = {}) {
    const response = await fetch(`https://classtest.site/api${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  }
  
  export async function updateData(url = "", data = {}) {
    const response = await fetch(`https://classtest.site/api${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  }