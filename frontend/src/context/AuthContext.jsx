import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

// Giải mã token và tạo user object
const decodeTokenToUser = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    // Token hết hạn (milisecond)
    if (decoded.exp * 1000 < Date.now()) {
      return null;
    }

    const rolesString = decoded.role;
    // Lấy phần tử role đầu tiên
    const rawRole = rolesString ? rolesString.split(",")[0] : "GUEST";
    const userRoleName = rawRole.startsWith("ROLE_")
      ? rawRole.substring(5)
      : rawRole;

    return {
      username: decoded.sub,
      role: { name: userRoleName.toUpperCase() },
    };
  } catch (error) {
    console.error("Lỗi giải mã token: ", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Giữ trạng thái đăng nhập khi reload page
  useEffect(() => {
    const initializeAuth = () => {
      const tokenFromStorage = sessionStorage.getItem("token");

      if (tokenFromStorage) {
        const userObject = decodeTokenToUser(tokenFromStorage);

        if (userObject) {
          setToken(tokenFromStorage);
          setUser(userObject);
        } else {
          // Token hết hạn hoặc không hợp lệ
          sessionStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const responseData = await authService.login(username, password);
      console.log("Đăng nhập:", responseData);

      const accessToken = responseData?.accessToken;

      if (!accessToken) {
        throw new Error("Đăng nhập không hợp lệ hoặc thiếu token.");
      }

      const userObject = decodeTokenToUser(accessToken);

      if (!userObject) {
        throw new Error("Thông tin xác thực không thể giải mã.");
      }

      sessionStorage.setItem("token", accessToken);
      setToken(accessToken);
      setUser(userObject);
      setLoading(false);

      return userObject;
    } catch (error) {
      console.error("Lỗi đăng nhập:", error.response?.data || error.message);

      sessionStorage.removeItem("token");
      setToken(null);
      setUser(null);
      setLoading(false);

      const errorMessage =
        error.response?.data?.message || "Sai tên đăng nhập hoặc mật khẩu.";
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  const register = async (name, email, username, password) => {
    setLoading(true);
    try {
      await authService.register(name, email, username, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const isAuthenticated = !!user && !!token;
  const role = user ? user.role : { name: "GUEST" };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    role,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
