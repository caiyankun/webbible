/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : user

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-05-15 07:43:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user_basic
-- ----------------------------
DROP TABLE IF EXISTS `user_basic`;
CREATE TABLE `user_basic` (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `uname` varchar(32) NOT NULL,
  `mobile` varchar(32) DEFAULT NULL,
  `upass` varchar(32) DEFAULT NULL,
  `smspass` varchar(6) DEFAULT NULL,
  `smspassexpire` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `ulevel` int(10) NOT NULL DEFAULT '1',
  `registertime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastlogintime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastloginip` text,
  `lastloginstatus` text,
  `loginlogs` text,
  `uoption` text,
  `mobilecountry` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_basic
-- ----------------------------
INSERT INTO `user_basic` VALUES ('39', 'a@a.com', null, '25d55ad283aa400af464c76d713c07ad', '', null, '1', '2018-03-08 22:50:49', '2018-03-08 22:53:30', null, null, null, null, null);
INSERT INTO `user_basic` VALUES ('37', 'cai_yankun@test.com', null, '25d55ad283aa400af464c76d713c07ad', '', null, '1', '2018-03-08 22:50:49', '2018-03-08 22:53:30', null, null, null, null, null);
INSERT INTO `user_basic` VALUES ('38', 'cai_yankun@qq.com', null, '2c5354c37359ddea251ed23a032a10ee', '', null, '1', '2018-03-08 22:50:49', '2018-03-08 22:53:30', null, null, null, null, null);
INSERT INTO `user_basic` VALUES ('40', 'b@b.com', null, '25d55ad283aa400af464c76d713c07ad', '', null, '1', '2018-03-08 22:50:49', '2018-03-08 22:53:30', null, null, null, null, null);
INSERT INTO `user_basic` VALUES ('41', 'c@c.com', null, '25d55ad283aa400af464c76d713c07ad', '', null, '1', '2018-03-08 22:50:49', '2018-03-08 22:53:30', null, null, null, null, null);
INSERT INTO `user_basic` VALUES ('46', 'test@test.com', null, '12345678', '', null, '101', '2018-03-19 08:52:19', '2018-03-19 08:52:46', null, null, null, null, null);
INSERT INTO `user_basic` VALUES ('42', '11', null, 'b6d767d2f8ed5d21a44b0e5886680cb9', '', null, '101', '2018-03-08 23:44:44', '2018-03-09 05:54:42', null, null, null, null, null);
INSERT INTO `user_basic` VALUES ('43', 'bb', null, '21ad0bd836b90d08f4cf640b4c298e7c', '', null, '101', '2018-03-09 05:49:02', '2018-03-09 05:49:02', null, null, null, null, null);
INSERT INTO `user_basic` VALUES ('44', 'cc', null, '41fcba09f2bdcdf315ba4119dc7978dd', '', null, '102', '2018-03-09 06:53:21', '2018-03-09 07:28:14', null, null, null, null, null);
INSERT INTO `user_basic` VALUES ('45', 'aa@aa.com', null, '25d55ad283aa400af464c76d713c07ad', '', null, '101', '2018-03-17 18:20:24', '2018-03-24 06:16:05', null, null, null, null, null);
INSERT INTO `user_basic` VALUES ('47', 'eolinker@1', null, '25d55ad283aa400af464c76d713c07ad', '', null, '101', '2018-03-24 08:37:47', '2018-03-24 08:37:47', null, null, null, null, null);
INSERT INTO `user_basic` VALUES ('48', 'eolinker@2', null, '25d55ad283aa400af464c76d713c07ad', '', null, '101', '2018-03-24 08:37:54', '2018-03-24 08:40:07', null, null, null, null, null);
INSERT INTO `user_basic` VALUES ('49', 'eolinker@', null, '25d55ad283aa400af464c76d713c07ad', '', '2018-05-06 18:46:03', '801', '2018-03-24 15:43:17', '2018-05-06 18:46:03', null, null, null, null, null);
INSERT INTO `user_basic` VALUES ('56', '+60126074183', '+60126074183', null, '234994', '2018-04-22 18:22:49', '101', '2018-04-22 18:24:49', '2018-04-22 18:24:49', null, null, null, null, '+60');
INSERT INTO `user_basic` VALUES ('51', '18053366567', '18053366567', null, '237438', '2018-04-22 18:18:29', '101', '2018-04-22 16:48:08', '2018-04-22 16:48:08', null, null, null, null, '+86');
INSERT INTO `user_basic` VALUES ('55', '13602603604', '13602603604', null, '745144', '2018-04-22 18:18:12', '101', '2018-04-22 18:20:32', '2018-04-22 18:20:32', null, null, null, null, '+86');

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `iid` int(10) NOT NULL AUTO_INCREMENT,
  `uid` int(10) NOT NULL,
  `igroup` varchar(32) NOT NULL,
  `ititle` varchar(32) NOT NULL,
  `icontent` text NOT NULL,
  `iverify` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`iid`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', '1', '1', '1', '1', '1');
INSERT INTO `user_info` VALUES ('2', '2', '2', '2', '2', '2');

-- ----------------------------
-- Procedure structure for changepass
-- ----------------------------
DROP PROCEDURE IF EXISTS `changepass`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `changepass`(IN `uid` INT, IN `p_uname` VARCHAR(100), IN `p_upass` VARCHAR(100), IN `newpass` VARCHAR(100))
    NO SQL
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
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for changeulevel
-- ----------------------------
DROP PROCEDURE IF EXISTS `changeulevel`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `changeulevel`(IN `uid` INT, IN `p_uname` VARCHAR(100), IN `ulevel` INT)
    NO SQL
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
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for checksmspass
-- ----------------------------
DROP PROCEDURE IF EXISTS `checksmspass`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `checksmspass`(IN `mobile` varchar(32),IN `code` varchar(6))
BEGIN
	#Routine body goes here...
	SELECT COUNT(*) INTO @ok from user_basic where user_basic.mobile=mobile AND user_basic.smspass=CODE AND user_basic.smspassexpire>NOW();
	IF @ok<1 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '验证码失败,SMS code verify failed!';
	ELSE
			UPDATE user_basic SET user_basic.smspassexpire=date_sub(NOW(), interval 3 minute) where user_basic.mobile=mobile AND user_basic.smspass=CODE;
			select uid,uname,ulevel,uoption from user_basic where user_basic.mobile=mobile AND user_basic.smspass=CODE;
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for createsmspass
-- ----------------------------
DROP PROCEDURE IF EXISTS `createsmspass`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `createsmspass`(IN `mobile` varchar(32),IN `smscode` varchar(6),IN `expiretime`  INT,IN `country` varchar(32))
BEGIN
	SELECT COUNT(*) into @exist from user_basic WHERE user_basic.mobile=mobile;
	if @exist<1 THEN
		INSERT INTO user_basic SET user_basic.mobilecountry=country,user_basic.mobile=mobile,user_basic.uname=mobile,user_basic.smspass=smscode,user_basic.smspassexpire=date_add(NOW(), interval expiretime minute),user_basic.ulevel=101,lastlogintime=CURRENT_TIMESTAMP;
	ELSE
		UPDATE user_basic SET user_basic.smspass=smscode,user_basic.smspassexpire=date_add(NOW(), interval expiretime minute),user_basic.mobilecountry=country where user_basic.mobile=mobile;
		
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for login
-- ----------------------------
DROP PROCEDURE IF EXISTS `login`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `login`(IN `p_uname` VARCHAR(100), IN `p_upass` VARCHAR(100))
    READS SQL DATA
BEGIN
   DECLARE matchnum INT default 0;
   call username_check(p_uname,matchnum);
   if matchnum <1 then
       SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No such user!';
   else
       select count(*) into matchnum from user_basic where uname=p_uname and upass=p_upass;
       if matchnum>0 then
        UPDATE user_basic SET lastlogintime=CURRENT_TIMESTAMP where uname=p_uname and user_basic.uid=uid;
         select uid,uname,ulevel,uoption from user_basic where uname=p_uname and upass=p_upass;
       else
         SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'Password incorrect!';
       end if;
   end if;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for register
-- ----------------------------
DROP PROCEDURE IF EXISTS `register`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `register`(IN `p_uname` VARCHAR(100), IN `p_upass` VARCHAR(100))
    NO SQL
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
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for register_special
-- ----------------------------
DROP PROCEDURE IF EXISTS `register_special`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `register_special`(IN `p_uname` VARCHAR(100), IN `p_upass` VARCHAR(100), IN `ulevel` INT)
BEGIN
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
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for showall
-- ----------------------------
DROP PROCEDURE IF EXISTS `showall`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `showall`()
BEGIN
  select * from user_basic;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for testerror
-- ----------------------------
DROP PROCEDURE IF EXISTS `testerror`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `testerror`()
    NO SQL
BEGIN
		set @m=3;
		SELECT date_add(NOW(), interval @m minute);
		
    #SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An error occurred';
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for username_check
-- ----------------------------
DROP PROCEDURE IF EXISTS `username_check`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `username_check`(IN `p_uname` VARCHAR(100), OUT `cnt` INT)
BEGIN
   select count(*) into cnt from user_basic where uname=p_uname;
END
;;
DELIMITER ;
