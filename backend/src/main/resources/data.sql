-- Clear existing data
-- TRUNCATE TABLE feedbacks, payments, bookings, room_games, devices, games, rooms, users, roles;

-- Insert Roles
INSERT INTO roles (id, name) VALUES
(1, 'ADMIN'),
(2, 'STAFF'),
(3, 'CUSTOMER');

-- Insert Users (BCrypt encoded password)
INSERT INTO users (id, name, email, username, password, role_id) VALUES
(1, 'Admin', 'admin@vrgame.com', 'admin', '$2a$10$R7gzoTI72JpmhVsp2WZZZO3vlPSj/Tju/TwQQl7XL8vTQt8yk7DAa', 1), -- password: admin
(2, 'Staff', 'staff@vrgame.com', 'staff', '$2a$10$FXG963Jyz9nwCr5WxoRsgOSZP4PXwFTys.uN45X/w27PtLDvlUfL.', 2), -- password: staff
(3, 'Customer', 'customer@vrgame.com', 'customer', '$2a$10$7Iiw5zPyxep7Q63lXmvF5eC7ALQb9ZfgREZB81uRMAzGPcu7dDCdu', 3), -- password: customer
(4, 'Diana Pham', 'diana.admin@vrgame.com', 'diana_pham', '$2a$10$QdSIktrKpnBVlWAe4KFUkedIjKCopNNQvs2ITOu7UxdrzbI44rIXi', 1), -- password: dianapham
(5, 'Ethan Vu', 'ethan.staff@vrgame.com', 'ethan_vu', '$2a$10$h3iH4PE47i3l3Mz0nm/tJ.09J3/a.0gIdhx3mm5OFF.3FT5den2PK', 2), -- password: ethanvu
(6, 'Fiona Hoang', 'fiona.customer@vrgame.com', 'fiona_hoang', '$2a$10$jZK7mDKSRyCs8XueB8d0.O2h9RwMA9KUDwbZWJELIAClRExGGbGbm', 3), -- password: fionahoang
(7, 'George Ngo', 'george.admin@vrgame.com', 'george_ngo', '$2a$10$ti3SlJpAJWftzHwZp/WaEuBHx4PtF2jxnIXqbwQvw7fZ0vykd3wSa', 1), -- password: georgengo
(8, 'Hannah Dao', 'hannah.staff@vrgame.com', 'hannah_dao', '$2a$10$PYXtRxP3xQ3iAyQI74At/u0SPZZi9SoSkhkBrenvw4nL8W8zNiZXS', 2), -- password: hannahdao
(9, 'Ian Bui', 'ian.customer@vrgame.com', 'ian_bui', '$2a$10$frQ0hpQp9D5Rn88u2bKBq.aemkHGYuOfwOQ3w98uXp4Qk51WYbX36', 3), -- password: ianbui
(10, 'Julia Tran', 'julia.customer@vrgame.com', 'julia_tran', '$2a$10$AEk44axOCDg14bdpeajf.u2B8BMhB0CjWp.HTeVELmBN2hLPW4QyS', 3); -- password: juliatran


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
(9, 'Simulation City VR', 'SIMULATION', 'Build and manage a city', 180, 250.00, 1),
(10, 'Underwater Explorer VR', 'ADVENTURE', 'Dive and discover ocean life', 80, 160.00, 4);

-- Insert Rooms
INSERT INTO rooms (id, name, capacity, status) VALUES
(1, 'Ocean Room', 4, 'AVAILABLE'),
(2, 'Sky Room', 6, 'MAINTENANCE'),
(3, 'Dungeon Room', 2, 'IN_USE'),
(4, 'Space Room', 4, 'AVAILABLE'),
(5, 'Racing Room', 6, 'IN_USE'),
(6, 'Haunted Room', 2, 'MAINTENANCE'),
(7, 'Fantasy Room', 4, 'AVAILABLE'),
(8, 'Action Room', 6, 'IN_USE'),
(9, 'Puzzle Room', 4, 'AVAILABLE'),
(10, 'Simulation Room', 5, 'IN_USE');

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
(1, 1, 'Oculus Quest 2', 'HEADSET', 'AVAILABLE', 5),
(2, 1, 'HTC Controller', 'CONTROLLER', 'IN_USE', 4),
(3, 2, 'Oculus Rift', 'HEADSET', 'MAINTENANCE', 4),
(4, 2, 'Valve Controller', 'CONTROLLER', 'AVAILABLE', 3),
(5, 3, 'HTC Vive', 'HEADSET', 'IN_USE', 4),
(6, 3, 'HTC Controller', 'CONTROLLER', 'MAINTENANCE', 5),
(7, 4, 'Oculus Quest Pro', 'HEADSET', 'AVAILABLE', 6),
(8, 4, 'HTC Controller', 'CONTROLLER', 'IN_USE', 8),
(9, 5, 'Valve Index', 'HEADSET', 'MAINTENANCE', 3),
(10, 5, 'Valve Controller', 'CONTROLLER', 'AVAILABLE', 6),
(11, null, 'Oculus Quest 2', 'HEADSET', 'AVAILABLE', 2),
(12, null, 'HTC Controller', 'CONTROLLER', 'AVAILABLE', 4),
(13, null, 'Oculus Rift', 'HEADSET', 'MAINTENANCE', 1),
(14, null, 'Valve Controller', 'CONTROLLER', 'AVAILABLE', 2),
(15, null, 'HTC Vive', 'HEADSET', 'IN_USE', 7),
(16, null, 'HTC Controller', 'CONTROLLER', 'AVAILABLE', 3),
(17, null, 'Oculus Quest Pro', 'HEADSET', 'AVAILABLE', 2),
(18, null, 'HTC Controller', 'CONTROLLER', 'IN_USE', 6),
(19, null, 'Valve Index', 'HEADSET', 'MAINTENANCE', 5),
(20, null, 'Valve Controller', 'CONTROLLER', 'AVAILABLE', 3);

-- Insert Bookings
INSERT INTO bookings (id, user_id, game_id, room_id, start_time, end_time, status, number_of_players, total_amount, payment_status) VALUES
(1, 1, 1, 1, NOW(), NOW() + INTERVAL 1 HOUR, 'PENDING', 3, 360.00, 'UNPAID'),
(2, 2, 2, 2, NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY + INTERVAL 2 HOUR, 'ACCEPTED', 4, 600.00, 'UNPAID'),
(3, 3, 3, 3, NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY + INTERVAL 1 HOUR, 'ACCEPTED', 2, 100.00, 'PAID'),
(4, 4, 4, 4, NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY + INTERVAL 1.5 HOUR, 'PENDING', 3, 195.00, 'UNPAID'),
(5, 5, 5, 5, NOW() - INTERVAL 4 DAY, NOW() - INTERVAL 4 DAY + INTERVAL 1 HOUR, 'ACCEPTED', 5, 550.00, 'PAID'),
(6, 6, 6, 6, NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY + INTERVAL 2 HOUR, 'CANCELLED', 4, 800.00, 'UNPAID'),
(7, 7, 7, 7, NOW() - INTERVAL 6 DAY, NOW() - INTERVAL 6 DAY + INTERVAL 1 HOUR, 'PENDING', 5, 700.00, 'UNPAID'),
(8, 8, 8, 8, NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY + INTERVAL 1 HOUR, 'ACCEPTED', 3, 360.00, 'PAID'),
(9, 9, 9, 9, NOW() - INTERVAL 8 DAY, NOW() - INTERVAL 8 DAY + INTERVAL 3 HOUR, 'CANCELLED', 1, 250.00, 'UNPAID'),
(10, 10, 10, 10, NOW() - INTERVAL 9 DAY, NOW() - INTERVAL 9 DAY + INTERVAL 1.5 HOUR, 'PENDING', 4, 640.00, 'UNPAID');

-- Insert Feedbacks
INSERT INTO feedbacks (id, user_id, booking_id, rating, comment, feedback_date) VALUES
(1, 1, 1, 5, 'Amazing VR experience!', NOW()),
(2, 2, 2, 4, 'Fun adventure but headset was laggy', NOW() - INTERVAL 1 DAY),
(3, 3, 3, 2, 'Too short and not realistic', NOW() - INTERVAL 2 DAY),
(4, 4, 4, 5, 'Loved the puzzle challenges', NOW() - INTERVAL 3 DAY),
(5, 5, 5, 3, 'Sports game was okay', NOW() - INTERVAL 4 DAY),
(6, 6, 6, 5, 'Fantasy world is immersive', NOW() - INTERVAL 5 DAY),
(7, 7, 7, 1, 'Controller malfunctioned', NOW() - INTERVAL 6 DAY),
(8, 8, 8, 4, 'Scary but exciting', NOW() - INTERVAL 7 DAY),
(9, 9, 9, 3, 'City simulation was interesting', NOW() - INTERVAL 8 DAY),
(10, 10, 10, 5, 'Underwater exploration was breathtaking', NOW() - INTERVAL 9 DAY);
