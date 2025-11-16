import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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

          <div className="hidden md:flex items-center space-x-8">
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
        </div>

        {/* Log / Reg / Account */}
        <div className="hidden md:flex items-center space-x-4">
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

        <button className="md:hidden text-white" onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>
      </nav>

      {open && (
        <div className="w-full py-2 px-4 fixed top-0 right-0 w-3/4 h-full bg-gray-900/95 backdrop-blur-xl p-6 z-[999] md:hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-vr-blue">Menu</h2>
            <button onClick={() => setOpen(false)}>
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col space-y-6 text-lg bg-gray-900/95 backdrop-blur">
            {/* Public */}
            <Link to="/games" onClick={() => setOpen(false)}>
              Trò Chơi
            </Link>
            <Link to="/rooms" onClick={() => setOpen(false)}>
              Phòng
            </Link>
            <Link to="/devices" onClick={() => setOpen(false)}>
              Thiết bị VR
            </Link>

            {/* CUSTOMER */}
            {isCustomer && (
              <>
                <Link
                  to="/bookings"
                  className="text-blue-400"
                  onClick={() => setOpen(false)}
                >
                  Đặt Phòng
                </Link>
                <Link
                  to="/user-feedbacks"
                  className="text-blue-400"
                  onClick={() => setOpen(false)}
                >
                  Phản Hồi
                </Link>
              </>
            )}

            {/* ADMIN */}
            {isAdmin && (
              <Link
                to="/dashboard"
                className="text-red-400"
                onClick={() => setOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}

            {/* STAFF */}
            {(isStaff || isAdmin) && (
              <Link
                to="/payment"
                className="text-yellow-400"
                onClick={() => setOpen(false)}
              >
                Xác Nhận Thanh Toán
              </Link>
            )}

            {/* Auth on Mobile */}
            <div className="mt-4 flex flex-col space-y-2">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="btn-ghost"
                    onClick={() => setOpen(false)}
                  >
                    Đăng Nhập
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary mt-4"
                    onClick={() => setOpen(false)}
                  >
                    Đăng Ký
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="btn-primary mt-4"
                >
                  Đăng Xuất
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
