import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // 👉 Thư viện để đọc/ghi cookie trong JS
import axios from "axios";

// 👉 Định nghĩa kiểu dữ liệu cho Context
type AuthContextType = {
  isAuthenticated: boolean; // Người dùng đã đăng nhập chưa?
  login: (username: string, password: string) => Promise<void>; // Hàm đăng nhập
  logout: () => void; // Hàm đăng xuất
};


// 👉 Tạo context để chia sẻ trạng thái đăng nhập
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 👉 Provider bao bọc toàn bộ ứng dụng để chia sẻ context
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái đăng nhập

  // 🔄 Kiểm tra khi load trang lần đầu: nếu có token trong cookie => đã đăng nhập
  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token); // ✅ true nếu token tồn tại
  }, []);

  // 🔐 Hàm login: gọi API, nếu thành công thì lưu token vào cookie
  const login = async (username: string, password: string) => {
    const response = await axios.post("http://localhost:8088/login", {
      username,
      password,
    }, {
      withCredentials: true, // 👉 Cho phép gửi & nhận cookie giữa frontend/backend
    });

    Cookies.set("token".trim(), response.data.result.token); // 👉 Ghi cookie nếu server không set tự động
    setIsAuthenticated(true); // ✅ Đánh dấu đã đăng nhập
  };

  // 🚪 Hàm logout: xóa token khỏi cookie
  const logout = () => {
    Cookies.remove("token"); // ❌ Xóa JWT
    setIsAuthenticated(false); // ✅ Cập nhật trạng thái
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🧠 Hook tiện dùng để lấy thông tin auth ở các component khác
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth buộc phải được sử dụng trong AuthProvider");
  return context;
};
