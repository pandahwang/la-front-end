// 전체 직업 통계 데이터 조회
export async function fetchAllUser() {
    const response = await fetch('http://localhost:8080/statistic/alluser');
    const resData = await response.json();

    if(!response.ok){
        throw new Error('Failed to fetch all user data');
    }

    return resData;
}

export async function createResult(){
    const response = await fetch('http://localhost:8080/results')
}