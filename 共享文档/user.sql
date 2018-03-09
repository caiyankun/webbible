-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 2018-03-08 23:29:42
-- 服务器版本： 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user`
--

DELIMITER $$
--
-- 存储过程
--
DROP PROCEDURE IF EXISTS `changepass`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `changepass` (IN `uid` INT, IN `p_uname` VARCHAR(100), IN `p_upass` VARCHAR(100), IN `newpass` VARCHAR(100))  NO SQL
BEGIN
   DECLARE matchnum INT default 0;
   call username_check(p_uname,matchnum);
   if matchnum <1 then
       SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No such user!';
   else
       select count(*) into matchnum from user_basic where uname=p_uname and upass=p_upass and user_basic.uid=uid;
       if matchnum>0 then
         UPDATE user_basic SET upass=newpass , lastlogintime=CURRENT_TIMESTAMP where uname=p_uname and upass=p_upass and user_basic.uid=uid;
       else
         SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'Password incorrect or mismatch!';
       end if;
   end if;
END$$

DROP PROCEDURE IF EXISTS `changeulevel`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `changeulevel` (IN `uid` INT, IN `p_uname` VARCHAR(100), IN `ulevel` INT)  NO SQL
BEGIN
   DECLARE matchnum INT default 0;
   call username_check(p_uname,matchnum);
   if matchnum <1 then
       SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No such user!';
   else
       select count(*) into matchnum from user_basic where uname=p_uname and user_basic.uid=uid;
       if matchnum>0 then
         UPDATE user_basic SET user_basic.ulevel=ulevel, lastlogintime=CURRENT_TIMESTAMP where uname=p_uname and user_basic.uid=uid;
       else
         SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'id & name mismatch!';
       end if;
   end if;
END$$

DROP PROCEDURE IF EXISTS `login`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `p_uname` VARCHAR(100), IN `p_upass` VARCHAR(100))  READS SQL DATA
BEGIN
   DECLARE matchnum INT default 0;
   call username_check(p_uname,matchnum);
   if matchnum <1 then
       SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No such user!';
   else
       select count(*) into matchnum from user_basic where uname=p_uname and upass=p_upass;
       if matchnum>0 then
         select uid,uname,ulevel,uoption from user_basic where uname=p_uname and upass=p_upass;
       else
         SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'Password incorrect!';
       end if;
   end if;
END$$

DROP PROCEDURE IF EXISTS `register`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `register` (IN `p_uname` VARCHAR(100), IN `p_upass` VARCHAR(100))  NO SQL
BEGIN
  declare userexist int default 0;
  call username_check(p_uname,userexist);
  if userexist>0 then
       SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User already exist!';
  else
       insert into user_basic set uname=p_uname,upass=p_upass,user_basic.ulevel=101,lastlogintime=CURRENT_TIMESTAMP;
       if row_count()<1 THEN
       		SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'Insert failed! Affected row is 0';
       end if;
  end if;
END$$

DROP PROCEDURE IF EXISTS `register_special`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `register_special` (IN `p_uname` VARCHAR(100), IN `p_upass` VARCHAR(100), IN `ulevel` INT)  BEGIN
  declare userexist int default 0;
  call username_check(p_uname,userexist);
  if userexist>0 then
       SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User already exist!';
  else
       insert into user_basic set uname=p_uname,upass=p_upass,user_basic.ulevel=ulevel,lastlogintime=CURRENT_TIMESTAMP;
       if row_count()<1 THEN
       		SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'Insert failed! Affected row is 0';
       end if;
  end if;
END$$

DROP PROCEDURE IF EXISTS `showall`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `showall` ()  BEGIN
  select * from user_basic;
END$$

DROP PROCEDURE IF EXISTS `testerror`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `testerror` ()  NO SQL
BEGIN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An error occurred';
END$$

DROP PROCEDURE IF EXISTS `username_check`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `username_check` (IN `p_uname` VARCHAR(100), OUT `cnt` INT)  BEGIN
   select count(*) into cnt from user_basic where uname=p_uname;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- 表的结构 `user_basic`
--

DROP TABLE IF EXISTS `user_basic`;
CREATE TABLE IF NOT EXISTS `user_basic` (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `uname` varchar(32) NOT NULL,
  `upass` varchar(32) NOT NULL,
  `ulevel` int(10) NOT NULL DEFAULT '1',
  `registertime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastlogintime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastloginip` text,
  `lastloginstatus` text,
  `loginlogs` text,
  `uoption` text,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user_basic`
--

INSERT INTO `user_basic` (`uid`, `uname`, `upass`, `ulevel`, `registertime`, `lastlogintime`, `lastloginip`, `lastloginstatus`, `loginlogs`, `uoption`) VALUES
(39, 'a@a.com', '25d55ad283aa400af464c76d713c07ad', 1, '2018-03-08 14:50:49', '2018-03-08 14:53:30', NULL, NULL, NULL, NULL),
(37, 'cai_yankun@test.com', '25d55ad283aa400af464c76d713c07ad', 1, '2018-03-08 14:50:49', '2018-03-08 14:53:30', NULL, NULL, NULL, NULL),
(38, 'cai_yankun@qq.com', '2c5354c37359ddea251ed23a032a10ee', 1, '2018-03-08 14:50:49', '2018-03-08 14:53:30', NULL, NULL, NULL, NULL),
(40, 'b@b.com', '25d55ad283aa400af464c76d713c07ad', 1, '2018-03-08 14:50:49', '2018-03-08 14:53:30', NULL, NULL, NULL, NULL),
(41, 'c@c.com', '25d55ad283aa400af464c76d713c07ad', 1, '2018-03-08 14:50:49', '2018-03-08 14:53:30', NULL, NULL, NULL, NULL),
(36, 'test@test.com', '25d55ad283aa400af464c76d713c07ad', 1, '2018-03-08 14:50:49', '2018-03-08 14:53:30', NULL, NULL, NULL, NULL),
(42, '11', '22', 101, '2018-03-08 15:44:44', '2018-03-08 21:54:42', NULL, NULL, NULL, NULL),
(43, 'bb', 'bb', 101, '2018-03-08 21:49:02', '2018-03-08 21:49:02', NULL, NULL, NULL, NULL),
(44, 'cc', '41fcba09f2bdcdf315ba4119dc7978dd', 102, '2018-03-08 22:53:21', '2018-03-08 23:28:14', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `user_info`
--

DROP TABLE IF EXISTS `user_info`;
CREATE TABLE IF NOT EXISTS `user_info` (
  `iid` int(10) NOT NULL AUTO_INCREMENT,
  `uid` int(10) NOT NULL,
  `igroup` varchar(32) NOT NULL,
  `ititle` varchar(32) NOT NULL,
  `icontent` text NOT NULL,
  `iverify` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`iid`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user_info`
--

INSERT INTO `user_info` (`iid`, `uid`, `igroup`, `ititle`, `icontent`, `iverify`) VALUES
(1, 1, '1', '1', '1', '1'),
(2, 2, '2', '2', '2', '2');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
