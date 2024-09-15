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

export async function createResult(){
    const response = await fetch('http://localhost:8080/results')
}