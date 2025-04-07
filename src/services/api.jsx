import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// API 요청을 위한 axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 요청 인터셉터 - 토큰이 있으면 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API 함수들
const api = {
  // 로그인
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },
  
  // 직원 목록 조회
  getPersons: async () => {
    const response = await axiosInstance.get('/person');
    return response.data;
  },
  
  // 직원 추가
  addPerson: async (personData) => {
    const response = await axiosInstance.post('/person', personData);
    return response.data;
  },
  
  // 직원 삭제
  deletePerson: async (personName) => {
    const response = await axiosInstance.delete(`/person/${personName}`);
    return response.data;
  },
  
  // 출퇴근 기록 조회
  getAttendance: async (personName) => {
    const response = await axiosInstance.get(`/attendance/${personName}`);
    return response.data;
  },
  
  // 요일별 출퇴근 현황
  getWeeklyAttendance: async (personName) => {
    const response = await axiosInstance.get(`/attendance/weekly/${personName}`);
    return response.data;
  },
  
  // 24시간 타임라인 데이터
  getTimeline: async (personName, date) => {
    const response = await axiosInstance.get(`/attendance/timeline/${personName}`, {
      params: { date }
    });
    return response.data;
  },
  
  // 출퇴근 기록하기
  recordAttendance: async (recordData) => {
    const response = await axiosInstance.post('/attendance/record', recordData);
    return response.data;
  }
};

export default api;
