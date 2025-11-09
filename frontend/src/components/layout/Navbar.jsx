import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isCustomer = user?.role?.name === "CUSTOMER";
  const isAdmin = user?.role?.name === "ADMIN";
  const isStaff = user?.role?.name === "STAFF";

  const headerVariants = {
    initial: { y: -100 },
    animate: {
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 16 },
    },
  };

  return (
    <motion.header
      initial="initial"
      animate="animate"
      variants={headerVariants}
      className="sticky top-0 z-50 bg-vrbg/95 backdrop-blur-md shadow-lg text-gray-300"
    >
      <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Logo & Trang Chủ */}
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-xl font-display text-vr-blue border border-glass rounded-lg hover:text-white transition duration-300 px-1 py-0.5"
          >
            VREALM GAME ZONE
          </Link>

          {/* Public Link */}
          <Link
            to="/games"
            className="hover:text-vr-blue-2 transition duration-300"
          >
            Trò Chơi
          </Link>
          <Link
            to="/rooms"
            className="hover:text-vr-blue-2 transition duration-300"
          >
            Phòng
          </Link>
          <Link
            to="/devices"
            className="hover:text-vr-blue-2 transition duration-300"
          >
            Thiết bị VR
          </Link>

          {/* CUSTOMER Link */}
          {isCustomer && (
            <>
              <Link
                to="/bookings"
                className="hover:text-vr-blue-2  transition duration-300 font-bold text-blue-400"
              >
                Đặt Phòng
              </Link>
              <Link
                to="/user-feedbacks"
                className="hover:text-vr-blue-2 transition duration-300 font-bold text-blue-400"
              >
                Phản Hồi
              </Link>
            </>
          )}
          {/* ADMIN Link */}
          {isAdmin && (
            <Link
              to="/dashboard"
              className="hover:text-vr-blue-2 transition duration-300 font-bold text-red-400"
            >
              Admin Dashboard
            </Link>
          )}
          {/* Staff Link */}
          {(isStaff || isAdmin) && (
            <Link
              to="/payment"
              className="hover:text-vr-blue-2 transition duration-300 font-bold text-yellow-400"
            >
              Xác Nhận Thanh Toán
            </Link>
          )}
        </div>

        {/* Log / Reg / Account */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              {/* Log / Reg */}
              <Link to="/login" className="btn-ghost">
                Đăng Nhập
              </Link>
              <Link to="/register" className="btn-primary">
                Đăng Ký
              </Link>
            </>
          ) : (
            // Hiển thị Account / Logout
            <>
              <span className="text-gray-300">
                Xin chào,{" "}
                <span className="font-semibold text-vr-blue-2">
                  {user.username}
                </span>
              </span>
              <motion.button
                onClick={handleLogout}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Đăng Xuất
              </motion.button>
            </>
          )}
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
