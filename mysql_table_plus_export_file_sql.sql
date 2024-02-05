-- -------------------------------------------------------------
-- TablePlus 5.8.4(532)
--
-- https://tableplus.com/
--
-- Database: movie
-- Generation Time: 2024-02-05 22:16:28.3530
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `Banner` (
  `maBanner` int NOT NULL AUTO_INCREMENT,
  `maPhim` int DEFAULT NULL,
  `hinhAnh` varchar(255) NOT NULL,
  PRIMARY KEY (`maBanner`),
  KEY `maPhim` (`maPhim`),
  CONSTRAINT `Banner_ibfk_1` FOREIGN KEY (`maPhim`) REFERENCES `Phim` (`maPhim`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `CumRap` (
  `maCumRap` int NOT NULL AUTO_INCREMENT,
  `tenCumRap` varchar(255) NOT NULL,
  `diaChi` varchar(255) NOT NULL,
  `maHeThongRap` int DEFAULT NULL,
  PRIMARY KEY (`maCumRap`),
  KEY `maHeThongRap` (`maHeThongRap`),
  CONSTRAINT `CumRap_ibfk_1` FOREIGN KEY (`maHeThongRap`) REFERENCES `HeThongRap` (`maHeThongRap`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DatVe` (
  `taiKhoan` varchar(255) NOT NULL,
  `maLichChieu` int NOT NULL,
  `maGhe` int NOT NULL,
  PRIMARY KEY (`taiKhoan`,`maLichChieu`,`maGhe`),
  KEY `maLichChieu` (`maLichChieu`),
  KEY `maGhe` (`maGhe`),
  CONSTRAINT `DatVe_ibfk_1` FOREIGN KEY (`taiKhoan`) REFERENCES `NguoiDung` (`taiKhoan`),
  CONSTRAINT `DatVe_ibfk_2` FOREIGN KEY (`maLichChieu`) REFERENCES `LichChieu` (`maLichChieu`),
  CONSTRAINT `DatVe_ibfk_3` FOREIGN KEY (`maGhe`) REFERENCES `Ghe` (`maGhe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Ghe` (
  `maGhe` int NOT NULL AUTO_INCREMENT,
  `tenGhe` varchar(255) NOT NULL,
  `loaiGhe` varchar(255) NOT NULL,
  `maRap` int DEFAULT NULL,
  PRIMARY KEY (`maGhe`),
  KEY `maRap` (`maRap`),
  CONSTRAINT `Ghe_ibfk_1` FOREIGN KEY (`maRap`) REFERENCES `RapPhim` (`maRap`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `HeThongRap` (
  `maHeThongRap` int NOT NULL AUTO_INCREMENT,
  `tenHeThongRap` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  PRIMARY KEY (`maHeThongRap`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LichChieu` (
  `maLichChieu` int NOT NULL AUTO_INCREMENT,
  `maRap` int DEFAULT NULL,
  `maPhim` int DEFAULT NULL,
  `ngayGioChieu` datetime NOT NULL,
  `giaVe` double NOT NULL,
  PRIMARY KEY (`maLichChieu`),
  UNIQUE KEY `unique_constraint` (`maRap`,`maPhim`,`ngayGioChieu`),
  KEY `maPhim` (`maPhim`),
  CONSTRAINT `LichChieu_ibfk_1` FOREIGN KEY (`maRap`) REFERENCES `RapPhim` (`maRap`),
  CONSTRAINT `LichChieu_ibfk_2` FOREIGN KEY (`maPhim`) REFERENCES `Phim` (`maPhim`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LoaiNguoiDung` (
  `maLoaiNguoiDung` varchar(255) NOT NULL,
  `tenLoai` varchar(255) NOT NULL,
  PRIMARY KEY (`maLoaiNguoiDung`),
  CONSTRAINT `LoaiNguoiDung_chk_1` CHECK ((`maLoaiNguoiDung` in (_utf8mb4'QuanTri',_utf8mb4'KhachHang'))),
  CONSTRAINT `LoaiNguoiDung_chk_2` CHECK ((`tenLoai` in (_utf8mb4'Quản trị',_utf8mb4'Khách hàng')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `taiKhoan` varchar(255) NOT NULL,
  `hoTen` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `soDt` varchar(255) NOT NULL,
  `matKhau` varchar(255) NOT NULL,
  `maLoaiNguoiDung` varchar(255) NOT NULL,
  PRIMARY KEY (`taiKhoan`),
  UNIQUE KEY `email` (`email`),
  KEY `maLoaiNguoiDung` (`maLoaiNguoiDung`),
  CONSTRAINT `NguoiDung_ibfk_1` FOREIGN KEY (`maLoaiNguoiDung`) REFERENCES `LoaiNguoiDung` (`maLoaiNguoiDung`),
  CONSTRAINT `NguoiDung_chk_1` CHECK ((`maLoaiNguoiDung` in (_utf8mb4'QuanTri',_utf8mb4'KhachHang')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Phim` (
  `maPhim` int NOT NULL AUTO_INCREMENT,
  `tenPhim` varchar(255) NOT NULL,
  `trailer` varchar(255) NOT NULL,
  `hinhAnh` varchar(255) NOT NULL,
  `moTa` varchar(255) NOT NULL,
  `ngayKhoiChieu` date NOT NULL,
  `danhGia` int NOT NULL,
  `hot` tinyint(1) DEFAULT '0',
  `dangChieu` tinyint(1) DEFAULT '0',
  `sapChieu` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`maPhim`),
  CONSTRAINT `Phim_chk_1` CHECK (((`danhGia` >= 0) and (`danhGia` <= 10)))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `RapPhim` (
  `maRap` int NOT NULL AUTO_INCREMENT,
  `tenRap` varchar(255) NOT NULL,
  `maCumRap` int DEFAULT NULL,
  PRIMARY KEY (`maRap`),
  KEY `maCumRap` (`maCumRap`),
  CONSTRAINT `RapPhim_ibfk_1` FOREIGN KEY (`maCumRap`) REFERENCES `CumRap` (`maCumRap`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Banner` (`maBanner`, `maPhim`, `hinhAnh`) VALUES
(1, 1, 'banner1.jpg'),
(2, 2, 'banner2.jpg');

INSERT INTO `CumRap` (`maCumRap`, `tenCumRap`, `diaChi`, `maHeThongRap`) VALUES
(1, 'Cum Rap 1', 'Dia chi 1', 1),
(2, 'Cum Rap 2', 'Dia chi 2', 2);

INSERT INTO `DatVe` (`taiKhoan`, `maLichChieu`, `maGhe`) VALUES
('user1', 1, 1),
('user1', 1, 2),
('user1', 1, 3),
('user1', 1, 4),
('user1', 1, 10),
('user1', 2, 1),
('user1', 2, 2),
('user1', 2, 5),
('user1', 2, 6),
('user2', 2, 2);

INSERT INTO `Ghe` (`maGhe`, `tenGhe`, `loaiGhe`, `maRap`) VALUES
(1, 'Ghe 1', 'Thuong', 1),
(2, 'Ghe 2', 'VIP', 2),
(3, 'Ghe 2', 'Thuong', 1),
(4, 'Ghe 3', 'Thuong', 1),
(5, 'Ghe 4', 'Thuong', 1),
(6, 'Ghe 5', 'Thuong', 1),
(7, 'Ghe 6', 'Thuong', 1),
(8, 'Ghe 7', 'Thuong', 1),
(9, 'Ghe 8', 'Thuong', 1),
(10, 'Ghe 9', 'VIP', 1),
(11, 'Ghe 10', 'VIP', 1),
(12, 'Ghe 11', 'VIP', 1),
(13, 'Ghe 12', 'VIP', 1),
(14, 'Ghe 1', 'Thuong', 2),
(15, 'Ghe 3', 'Thuong', 2),
(16, 'Ghe 4', 'Thuong', 2),
(17, 'Ghe 5', 'Thuong', 2),
(18, 'Ghe 6', 'Thuong', 2),
(19, 'Ghe 7', 'Thuong', 2),
(20, 'Ghe 8', 'Thuong', 2),
(21, 'Ghe 9', 'VIP', 2),
(22, 'Ghe 10', 'VIP', 2),
(23, 'Ghe 11', 'VIP', 2),
(24, 'Ghe 12', 'VIP', 2);

INSERT INTO `HeThongRap` (`maHeThongRap`, `tenHeThongRap`, `logo`) VALUES
(1, 'BHD', 'logo1.jpg'),
(2, 'CGV', 'logo2.jpg');

INSERT INTO `LichChieu` (`maLichChieu`, `maRap`, `maPhim`, `ngayGioChieu`, `giaVe`) VALUES
(1, 1, 1, '2024-01-01 12:00:00', 100000),
(2, 2, 2, '2024-02-01 15:00:00', 120000),
(5, 1, 1, '2024-11-05 01:15:31', 100000),
(6, 1, 2, '2024-11-05 01:15:31', 100000),
(7, 1, 2, '1994-11-05 13:15:30', 100000),
(67, 1, 1, '2024-11-05 01:15:30', 100000),
(68, 1, 2, '2024-02-04 10:13:00', 100000),
(71, 1, 2, '1994-11-05 01:15:30', 100000),
(72, 2, 2, '1994-11-05 01:15:30', 100000),
(73, 2, 2, '1994-11-05 01:15:31', 100000),
(74, 2, 2, '2024-11-05 01:15:31', 100000);

INSERT INTO `LoaiNguoiDung` (`maLoaiNguoiDung`, `tenLoai`) VALUES
('KhachHang', 'Khách hàng'),
('QuanTri', 'Quản trị');

INSERT INTO `NguoiDung` (`taiKhoan`, `hoTen`, `email`, `soDt`, `matKhau`, `maLoaiNguoiDung`) VALUES
('12345', 'string5', '12345', '123456', '12345ff', 'KhachHang'),
('12345ff', 'string5', '12345ff', '123456', '12345ff', 'KhachHang'),
('12345ffa', 'string5', '12345ffa', '123456', '12345ff', 'KhachHang'),
('12345ffaq', 'string5', '12345ffaq', '123456', '12345ff', 'KhachHang'),
('123zxcv12345678912345678', 'thu', '123zxcv12345678912345678@gmail.com', '123445676', '123zxcv12345678912345678', 'KhachHang'),
('123zxcv12345678912345678u', 'string', '123zxcv12345678912345678i@gmail.com', '123445676', '123zxcv12345678912345678', 'KhachHang'),
('12zxcv12345678912345678', 'hà', '12zxcv12345678912345678@gmail.com', '123445676', '12zxcv12345678912345678', 'KhachHang'),
('1zxcv12345678912345678', 'quang', '1zxcv12345678912345678@gmail.com', '123445676', '1zxcv12345678912345678', 'KhachHang'),
('hailua', 'nguyen hai lua', 'hailua@gmail.com', '123445676', 'matKhau', 'KhachHang'),
('hailua2', 'nguyen hai lua', 'hailua2@gmail.com', '123445676', 'matKhau', 'KhachHang'),
('hailua23', 'nguyen hai lua', 'hailua23@gmail.com', '123445676', 'matKhau', 'KhachHang'),
('string', 'string', 'string', 'string', 'string', 'KhachHang'),
('testthem', 'test name', '12345@gmail.com', '123456', '12345ff', 'KhachHang'),
('testthem2', 'test name', '123452@gmail.com', '123456', '12345ff', 'KhachHang'),
('user1', 'linh', 'user1@gmail.com', '123456789', 'matkhau', 'QuanTri'),
('user2', 'string5', 'newem', '123456', 'matkhau', 'KhachHang'),
('zxcv1', 'cường', 'zxcv1@gmail.com', '123445676', 'zxcv1', 'KhachHang'),
('zxcv12', 'đoàn thị tú', 'zxcv12@gmail.com', '123445676', 'zxcv12', 'KhachHang'),
('zxcv123', 'trần thị hoàng', 'zxcv123@gmail.com', '123445676', 'zxcv123', 'KhachHang'),
('zxcv1234', 'nguyễn tuấn nguyên', 'zxcv1234@gmail.com', '123445676', 'zxcv1234', 'KhachHang'),
('zxcv12345', 'lê văn cẩm', 'zxcv12345@gmail.com', '123445676', 'zxcv12345', 'KhachHang'),
('zxcv123456', 'phạm thị hường', 'zxcv123456@gmail.com', '123445676', 'zxcv123456', 'KhachHang'),
('zxcv1234567', 'vũ thị thơ', 'zxcv1234567@gmail.com', '123445676', 'zxcv1234567', 'KhachHang'),
('zxcv12345678', 'đặng văn lâm', 'zxcv12345678@gmail.com', '123445676', 'zxcv12345678', 'KhachHang'),
('zxcv123456789', 'bùi thị chiến', 'zxcv123456789@gmail.com', '123445676', 'zxcv123456789', 'KhachHang'),
('zxcv1234567891', 'đỗ văn Tỉnh', 'zxcv1234567891@gmail.com', '123445676', 'zxcv1234567891', 'KhachHang'),
('zxcv12345678912', 'hoàng văn táo', 'zxcv12345678912@gmail.com', '123445676', 'zxcv12345678912', 'KhachHang'),
('zxcv123456789123', 'lê văn bắc', 'zxcv123456789123@gmail.com', '123445676', 'zxcv123456789123', 'KhachHang'),
('zxcv1234567891234', 'nguyễn tuấn khanh', 'zxcv1234567891234@gmail.com', '123445676', 'zxcv1234567891234', 'KhachHang'),
('zxcv12345678912345', 'Đoàn Văn Bơ', 'zxcv12345678912345@gmail.com', '123445676', 'zxcv12345678912345', 'KhachHang'),
('zxcv123456789123456', 'Lê khả giáp', 'zxcv123456789123456@gmail.com', '123445676', 'zxcv123456789123456', 'KhachHang'),
('zxcv1234567891234567', 'Lại ngứa chân', 'zxcv1234567891234567@gmail.com', '123445676', 'zxcv1234567891234567', 'KhachHang'),
('zxcv12345678912345678', 'Đồ thị hường', 'zxcv12345678912345678@gmail.com', '123445676', 'zxcv12345678912345678', 'KhachHang');

INSERT INTO `Phim` (`maPhim`, `tenPhim`, `trailer`, `hinhAnh`, `moTa`, `ngayKhoiChieu`, `danhGia`, `hot`, `dangChieu`, `sapChieu`) VALUES
(1, 'Phim 1', 'trailer1.mp4', 'hinh1.jpg', 'Mô tả phim 1', '2024-01-01', 8, 1, 1, 0),
(2, 'Phim 2', 'trailer2.mp4', 'hinh2.jpg', 'Mô tả phim 2', '2024-02-01', 9, 0, 1, 0),
(4, 'cuộc chiến 2 3', 'https://www.youtube.com/embed/BRXHdMcU_co?autoplay=1', '1707144391124_images.jpeg', 'bộ phim mỹ', '2024-02-01', 5, 1, 0, 0),
(5, 'cuộc chiến', 'https://www.youtube.com/embed/BRXHdMcU_co?autoplay=1', '1706947139379_images.jpeg', 'bộ phim mỹ', '2024-02-01', 5, 1, 0, 0),
(6, 'cuộc chiến', 'https://www.youtube.com/embed/BRXHdMcU_co?autoplay=1', '1706947157610_images.jpeg', 'bộ phim mỹ', '2024-02-01', 5, 1, 0, 0),
(7, 'cuộc chiến', 'https://www.youtube.com/embed/BRXHdMcU_co?autoplay=1', '1707144343031_nguoi-vo-cuoi-cung.jpeg', 'phim viet', '2024-02-01', 5, 1, 0, 0);

INSERT INTO `RapPhim` (`maRap`, `tenRap`, `maCumRap`) VALUES
(1, 'Rap 1', 1),
(2, 'Rap 2', 2);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;