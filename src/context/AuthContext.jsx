import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token') || null,
        isAuthenticated: !!localStorage.getItem('token')
    });

    // 인증 상태 업데이트
    useEffect(() => {
        if (auth.token) {
            localStorage.setItem('token', auth.token);
        } else {
            localStorage.removeItem('token');
        }
    }, [auth.token]);

    // 로그아웃 함수
    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ token: null, isAuthenticated: false });
    };

    // 로컬스토리지 변화를 감지하여 자동 로그아웃 처리
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'token' && !event.newValue) {
                // token이 삭제되었을 때 로그아웃 처리
                logout();
            }
        };

        // storage 이벤트 리스너 등록
        window.addEventListener('storage', handleStorageChange);

        // 컴포넌트 언마운트 시 리스너 제거
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;