import React from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/routes/ProtectedRoute";

// Pages
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import Devices from "./pages/Devices";
import DeviceDetail from "./pages/DeviceDetail";
import Feedbacks from "./pages/Feedbacks";
import BookingForm from "./pages/BookingForm";
import Bookings from "./pages/Bookings";
import Payment from "./pages/Payment";

// Admin Pages
import DashBoard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import GameManagement from "./pages/admin/GameManagement";
import RoomManagement from "./pages/admin/RoomManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import FeedbackManagement from "./pages/admin/FeedbackManagement";
import DeviceManagement from "./pages/admin/DeviceManagement";
import UserFeedbacks from "./pages/UserFeedbacks";
import UserFeedbackForm from "./pages/UserFeedbackForm";
import NotFound from "./pages/NotFound";

const App = () => (
  <div className="min-h-screen bg-vr-bg font-body">
    <Navbar />
    <main className="container py-8">
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:id" element={<GameDetail />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/devices/:id" element={<DeviceDetail />} />
          <Route path="/feedbacks" element={<Feedbacks />} />

          {/* Customer Routes */}
          <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
            <Route path="/booking/:gameId" element={<BookingForm />} />
            <Route path="/booking/:roomId" element={<BookingForm />} />
            <Route path="/booking/new" element={<BookingForm />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/booking/edit/:bookingId" element={<BookingForm />} />
            <Route path="/user-feedbacks" element={<UserFeedbacks />} />
            <Route path="/user-feedbacks/new" element={<UserFeedbackForm />} />
            <Route
              path="/user-feedbacks/edit/:feedbackId"
              element={<UserFeedbackForm />}
            />
          </Route>

          {/* Staff/Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["STAFF", "ADMIN"]} />}>
            <Route path="/payment" element={<Payment />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/dashboard" element={<DashBoard />}>
              <Route path="users" element={<UserManagement />} />
              <Route path="games" element={<GameManagement />} />
              <Route path="rooms" element={<RoomManagement />} />
              <Route path="bookings" element={<BookingManagement />} />
              <Route path="feedbacks" element={<FeedbackManagement />} />
              <Route path="devices" element={<DeviceManagement />} />
            </Route>
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </main>
    <Footer />
  </div>
);

export default App;
