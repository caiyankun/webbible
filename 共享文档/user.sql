-- phpMyAdmin SQL Dump
-- version 4.6.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 08, 2018 at 09:25 PM
-- Server version: 5.7.12
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `changepass` (IN `p_uname` INT, IN `p_upass` INT, IN `newpass` INT)  NO SQL
BEGIN
   DECLARE matchnum INT default 0;
   call username_check(p_uname,matchnum);
   if matchnum <1 then
       SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No such user!';
   else
       select count(*) into matchnum from user_basic where uname=p_uname and upass=p_upass;
       if matchnum>0 then
         UPDATE user_basic SET upass=newpass , lastlogintime=CURRENT_TIMESTAMP where uname=p_uname and upass=p_upass;
       else
         SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'Password incorrect!';
       end if;
   end if;
END$$

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `register` (IN `p_uname` VARCHAR(100), IN `p_upass` VARCHAR(100))  BEGIN
  declare userexist int default 0;
  call username_check(p_uname,userexist);
  if userexist>0 then
       SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User already exist!';
  else
       insert into user_basic set uname=p_uname,upass=p_upass;
       if row_count()<1 THEN
       		SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'Insert failed! Affected row is 0';
       end if;
  end if;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `showall` ()  BEGIN
  select * from user_basic;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `testerror` ()  NO SQL
BEGIN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An error occurred';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `username_check` (IN `p_uname` VARCHAR(100), OUT `cnt` INT)  BEGIN
   select count(*) into cnt from user_basic where uname=p_uname;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user_basic`
--

CREATE TABLE `user_basic` (
  `uid` int(10) NOT NULL,
  `uname` varchar(32) NOT NULL,
  `upass` varchar(32) NOT NULL,
  `ulevel` int(10) NOT NULL DEFAULT '1',
  `registertime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastlogintime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastloginip` text,
  `lastloginstatus` text,
  `loginlogs` text,
  `uoption` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_basic`
--

INSERT INTO `user_basic` (`uid`, `uname`, `upass`, `ulevel`, `registertime`, `lastlogintime`, `lastloginip`, `lastloginstatus`, `loginlogs`, `uoption`) VALUES
(39, 'a@a.com', '25d55ad283aa400af464c76d713c07ad', 1, '2018-03-08 14:50:49', '2018-03-08 14:53:30', NULL, NULL, NULL, NULL),
(37, 'cai_yankun@test.com', '25d55ad283aa400af464c76d713c07ad', 1, '2018-03-08 14:50:49', '2018-03-08 14:53:30', NULL, NULL, NULL, NULL),
(38, 'cai_yankun@qq.com', '2c5354c37359ddea251ed23a032a10ee', 1, '2018-03-08 14:50:49', '2018-03-08 14:53:30', NULL, NULL, NULL, NULL),
(40, 'b@b.com', '25d55ad283aa400af464c76d713c07ad', 1, '2018-03-08 14:50:49', '2018-03-08 14:53:30', NULL, NULL, NULL, NULL),
(41, 'c@c.com', '25d55ad283aa400af464c76d713c07ad', 1, '2018-03-08 14:50:49', '2018-03-08 14:53:30', NULL, NULL, NULL, NULL),
(36, 'test@test.com', '25d55ad283aa400af464c76d713c07ad', 1, '2018-03-08 14:50:49', '2018-03-08 14:53:30', NULL, NULL, NULL, NULL),
(42, '11', '11', 1, '2018-03-08 15:44:44', '2018-03-08 15:44:44', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `iid` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `igroup` varchar(32) NOT NULL,
  `ititle` varchar(32) NOT NULL,
  `icontent` text NOT NULL,
  `iverify` varchar(32) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`iid`, `uid`, `igroup`, `ititle`, `icontent`, `iverify`) VALUES
(1, 1, '1', '1', '1', '1'),
(2, 2, '2', '2', '2', '2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_basic`
--
ALTER TABLE `user_basic`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`iid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_basic`
--
ALTER TABLE `user_basic`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `iid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
