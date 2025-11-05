-- Clear existing data
-- TRUNCATE TABLE feedbacks, payments, bookings, room_games, devices, games, rooms, users, roles;

-- Insert Roles
INSERT INTO roles (id, name) VALUES
(1, 'ADMIN'),
(2, 'STAFF'),
(3, 'CUSTOMER');

-- Insert Users (BCrypt encoded password)
INSERT INTO users (id, name, email, username, password, role_id) VALUES
(1, 'Admin', 'admin@vrgame.com', 'admin', '$2a$10$R7gzoTI72JpmhVsp2WZZZO3vlPSj/Tju/TwQQl7XL8vTQt8yk7DAa', 1),
(2, 'Staff', 'staff@vrgame.com', 'staff', '$2a$10$FXG963Jyz9nwCr5WxoRsgOSZP4PXwFTys.uN45X/w27PtLDvlUfL.', 2),
(3, 'Customer', 'customer@vrgame.com', 'customer', '$2a$10$7Iiw5zPyxep7Q63lXmvF5eC7ALQb9ZfgREZB81uRMAzGPcu7dDCdu', 3),
(4, 'Diana Pham', 'diana.admin@vrgame.com', 'diana_pham', '$2a$10$QdSIktrKpnBVlWAe4KFUkedIjKCopNNQvs2ITOu7UxdrzbI44rIXi', 1),
(5, 'Ethan Vu', 'ethan.staff@vrgame.com', 'ethan_vu', '$2a$10$h3iH4PE47i3l3Mz0nm/tJ.09J3/a.0gIdhx3mm5OFF.3FT5den2PK', 2),
(6, 'Fiona Hoang', 'fiona.customer@vrgame.com', 'fiona_hoang', '$2a$10$jZK7mDKSRyCs8XueB8d0.O2h9RwMA9KUDwbZWJELIAClRExGGbGbm', 3),
(7, 'George Ngo', 'george.admin@vrgame.com', 'george_ngo', '$2a$10$ti3SlJpAJWftzHwZp/WaEuBHx4PtF2jxnIXqbwQvw7fZ0vykd3wSa', 1),
(8, 'Hannah Dao', 'hannah.staff@vrgame.com', 'hannah_dao', '$2a$10$PYXtRxP3xQ3iAyQI74At/u0SPZZi9SoSkhkBrenvw4nL8W8zNiZXS', 2),
(9, 'Ian Bui', 'ian.customer@vrgame.com', 'ian_bui', '$2a$10$frQ0hpQp9D5Rn88u2bKBq.aemkHGYuOfwOQ3w98uXp4Qk51WYbX36', 3),
(10, 'Julia Tran', 'julia.customer@vrgame.com', 'julia_tran', '$2a$10$AEk44axOCDg14bdpeajf.u2B8BMhB0CjWp.HTeVELmBN2hLPW4QyS', 3),
(11, 'Kevin Le', 'kevin.le@vrgame.com', 'kevin_le', '$2a$10$dMn3lCfXSscr7Vb1xc03W.ZHR1nQSCb6XfuvCliua09lM/UuF6CGu', 3),
(12, 'Luna Nguyen', 'luna.nguyen@vrgame.com', 'luna_nguyen', '$2a$10$9yqG1Rrkj/ZjGavWNTgv.eehJxGuyvzpi0xUb2IRGbbbwXjCniNQy', 3),
(13, 'Minh Tran', 'minh.tran@vrgame.com', 'minh_tran', '$2a$10$ifKqUat0h.cRTk3l62Ki..XduoCH.rKLJJKkl1W8zJM4tW0qfbv4q', 3),
(14, 'Nina Vo', 'nina.vo@vrgame.com', 'nina_vo', '$2a$10$65.VO02OkQU66XAGhbtJVOD74hmtaYWYuLt.vG2iw/ZfrxwZqtG/.', 3),
(15, 'Oscar Pham', 'oscar.pham@vrgame.com', 'oscar_pham', '$2a$10$kdjAWyDnH1q03SDYwbisAuqcUo.T3wvb/jSxfdh649bfGeeR6yP0W', 3),
(16, 'Phuong Do', 'phuong.do@vrgame.com', 'phuong_do', '$2a$10$7eFTmWr00zJo95vomfzq0u.doOZYpFedE0.8ESeb9niDfVjkWROnu', 3),
(17, 'Quang Truong', 'quang.truong@vrgame.com', 'quang_truong', '$2a$10$ZmUg.8tMEYWSyLb7vvOPo.afF0bvSew82tOJ8i65Ussnn/RnFYoBi', 3),
(18, 'Rita Dang', 'rita.dang@vrgame.com', 'rita_dang', '$2a$10$.lk4aeKEXIV.ddMDirB7cu0RMJXBCHhMxqSj0NnrCk8hELDg4v63O', 3),
(19, 'Sam Vo', 'sam.vo@vrgame.com', 'sam_vo', '$2a$10$gZYRhW4JPb8OBjq4INsnN.smw/xTgwPDe0s9/FXEQCEK1GQiJVV.O', 3),
(20, 'Tina Ha', 'tina.ha@vrgame.com', 'tina_ha', '$2a$10$qijcxYnODfX6jfl5x2eCYeb0gLzTHyKFD3o45UgUfyiGKPYA1TiIG', 3);

-- Insert Games
INSERT INTO games (id, name, genre, description, duration, price, max_players) VALUES
(1, 'Zombie Apocalypse VR', 'HORROR', 'Survive waves of zombies', 60, 120.00, 4),
(2, 'Space Adventure VR', 'ADVENTURE', 'Explore distant galaxies', 90, 150.00, 5),
(3, 'VR Racing Challenge', 'RACING', 'High-speed racing simulator', 45, 100.00, 2),
(4, 'Mystery Puzzle VR', 'PUZZLE', 'Solve mind-bending puzzles', 75, 130.00, 3),
(5, 'VR Sports Arena', 'SPORTS', 'Play virtual sports', 60, 110.00, 6),
(6, 'Fantasy Quest VR', 'ADVENTURE', 'Epic RPG quest in VR', 120, 200.00, 4),
(7, 'Action Shooter VR', 'ACTION', 'Multiplayer shooting action', 50, 140.00, 5),
(8, 'Haunted Mansion VR', 'HORROR', 'Explore the haunted house', 60, 120.00, 3),
(9, 'Simulation City VR', 'SIMULATION', 'Build and manage a city', 80, 250.00, 1),
(10, 'Underwater Explorer VR', 'ADVENTURE', 'Dive and discover ocean life', 80, 160.00, 4);

-- Insert Rooms
INSERT INTO rooms (id, name, capacity, status) VALUES
(1, 'Ocean Room', 4, 'AVAILABLE'),
(2, 'Sky Room', 6, 'AVAILABLE'),
(3, 'Dungeon Room', 2, 'IN_USE'),
(4, 'Space Room', 4, 'AVAILABLE'),
(5, 'Racing Room', 6, 'BOOKED'),
(6, 'Haunted Room', 2, 'MAINTENANCE'),
(7, 'Fantasy Room', 4, 'AVAILABLE'),
(8, 'Action Room', 6, 'IN_USE'),
(9, 'Puzzle Room', 4, 'AVAILABLE'),
(10, 'Simulation Room', 5, 'BOOKED');

-- Insert Room_Games
INSERT INTO room_games (room_id, game_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- Insert Devices
INSERT INTO devices (id, room_id, name, type, status, quantity) VALUES
-- Gắn phòng
(1, 1, 'Oculus Quest 2', 'HEADSET', 'AVAILABLE', 5),
(2, 1, 'HTC Controller', 'CONTROLLER', 'IN_USE', 4),
(3, 2, 'Sony VR Headphones', 'HEADPHONE', 'MAINTENANCE', 3),
(4, 2, 'HTC Base Station 2.0', 'SENSOR', 'AVAILABLE', 2),
(5, 3, 'Logitech C920 HD Pro', 'CAMERA', 'IN_USE', 3),
(6, 3, 'Blue Yeti Mic', 'MICROPHONE', 'MAINTENANCE', 2),
(7, 4, 'Oculus Rift S', 'HEADSET', 'AVAILABLE', 4),
(8, 4, 'Valve Controller', 'CONTROLLER', 'AVAILABLE', 3),
(9, 5, 'HyperX Cloud II', 'HEADPHONE', 'MAINTENANCE', 3),
(10, 5, 'Valve Lighthouse', 'SENSOR', 'AVAILABLE', 3),
-- Không gắn phòng(dự phòng)
(11, null, 'Oculus Quest Pro', 'HEADSET', 'IN_USE', 2),
(12, null, 'HTC Controller', 'CONTROLLER', 'MAINTENANCE', 2),
(13, null, 'Razer Kraken 7.1', 'HEADPHONE', 'AVAILABLE', 3),
(14, null, 'Oculus Tracking Sensor', 'SENSOR', 'IN_USE', 2),
(15, null, 'Sony PS Eye Camera', 'CAMERA', 'MAINTENANCE', 1),
(16, null, 'Razer Seiren X', 'MICROPHONE', 'AVAILABLE', 2),
(17, null, 'Valve Index', 'HEADSET', 'IN_USE', 3),
(18, null, 'Valve Controller', 'CONTROLLER', 'MAINTENANCE', 3),
(19, null, 'SteelSeries Arctis Pro', 'HEADPHONE', 'AVAILABLE', 2),
(20, null, 'Pico Eye Tracking Cam', 'CAMERA', 'IN_USE', 1);

-- Insert Bookings
INSERT INTO bookings (id, user_id, game_id, room_id, start_time, end_time, status, number_of_players, total_amount, payment_status) VALUES
(1, 3, 3, 3, NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY + INTERVAL 1 HOUR, 'ACCEPTED', 2, 100.00, 'PAID'),
(2, 6, 6, 6, NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY + INTERVAL 2 HOUR, 'CANCELLED', 4, 800.00, 'UNPAID'),
(3, 9, 9, 9, NOW() - INTERVAL 8 DAY, NOW() - INTERVAL 8 DAY + INTERVAL 3 HOUR, 'CANCELLED', 1, 250.00, 'UNPAID'),
(4, 10, 10, 10, NOW() - INTERVAL 9 DAY, NOW() - INTERVAL 9 DAY + INTERVAL 1.5 HOUR, 'PENDING', 4, 640.00, 'UNPAID'),
(5, 11, 1, 1, NOW(), NOW() + INTERVAL 1 HOUR, 'PENDING', 3, 360.00, 'UNPAID'),
(6, 12, 2, 2, NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY + INTERVAL 2 HOUR, 'ACCEPTED', 4, 600.00, 'PAID'),
(7, 13, 4, 4, NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY + INTERVAL 1.5 HOUR, 'PENDING', 3, 195.00, 'UNPAID'),
(8, 14, 5, 5, NOW() - INTERVAL 4 DAY, NOW() - INTERVAL 4 DAY + INTERVAL 1 HOUR, 'ACCEPTED', 5, 550.00, 'PAID'),
(9, 15, 7, 7, NOW() - INTERVAL 6 DAY, NOW() - INTERVAL 6 DAY + INTERVAL 1 HOUR, 'PENDING', 5, 700.00, 'UNPAID'),
(10, 16, 8, 8, NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY + INTERVAL 1 HOUR, 'ACCEPTED', 3, 360.00, 'PAID');

-- Insert Feedbacks
INSERT INTO feedbacks (id, user_id, booking_id, rating, comment, feedback_date) VALUES
(1, 3, 1, 2, 'Too short and not realistic', NOW() - INTERVAL 2 DAY),
(2, 6, 2, 5, 'Fantasy world is immersive', NOW() - INTERVAL 5 DAY),
(3, 9, 3, 3, 'City simulation was interesting', NOW() - INTERVAL 8 DAY),
(4, 10, 4, 5, 'Underwater exploration was breathtaking', NOW() - INTERVAL 9 DAY),
(5, 11, 5, 4, 'Good experience but could be longer', NOW() - INTERVAL 1 DAY),
(6, 12, 6, 5, 'Incredible graphics and fun gameplay', NOW() - INTERVAL 1 DAY),
(7, 13, 7, 3, 'Average experience, needs improvement', NOW() - INTERVAL 3 DAY),
(8, 14, 8, 5, 'Loved every moment in the sports arena', NOW() - INTERVAL 4 DAY),
(9, 15, 9, 4, 'Nice adventure, headset was smooth', NOW() - INTERVAL 6 DAY),
(10, 16, 10, 5, 'Excellent quality and thrilling session!', NOW() - INTERVAL 7 DAY);

