/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : caiyankun

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-09-23 07:24:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for diary
-- ----------------------------
DROP TABLE IF EXISTS `diary`;
CREATE TABLE `diary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `editdate` date DEFAULT NULL,
  `targetdate` date DEFAULT NULL,
  `tags` text,
  `content` text,
  `attachments` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of diary
-- ----------------------------
INSERT INTO `diary` VALUES ('1', '2018-09-22', '2018-09-21', null, '11111111111', '');
INSERT INTO `diary` VALUES ('2', '2018-09-22', '2018-08-21', null, '22222222', null);
INSERT INTO `diary` VALUES ('3', '2018-09-22', '2018-09-20', null, '埃菲尔去玩儿去去去来去自如呦', null);
INSERT INTO `diary` VALUES ('4', '2018-09-22', '2018-09-22', null, '鞋垫神门呢，哈哈哈哈\ndafasdf啊\n\n\nasdfasdfasdf\n\nasdfasdf\n\n\nafssdasdfasdf\n\n\nasf\nsf\nsdfasdfasdf\n\n\n', null);

-- ----------------------------
-- Table structure for ebox
-- ----------------------------
DROP TABLE IF EXISTS `ebox`;
CREATE TABLE `ebox` (
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ebox
-- ----------------------------

-- ----------------------------
-- Procedure structure for diary_detail
-- ----------------------------
DROP PROCEDURE IF EXISTS `diary_detail`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `diary_detail`(IN `id` INT,IN `witch` TEXT, IN `puid` TEXT, IN `poption` TEXT)
BEGIN
	#Routine body goes here...
SELECT
	* 
FROM
	diary
WHERE
	witch=diary.targetdate
;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for diary_update
-- ----------------------------
DROP PROCEDURE IF EXISTS `diary_update`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `diary_update`(IN `id` INT, IN `contents` TEXT,IN `witch` TEXT, IN `puid` TEXT, IN `poption` TEXT)
BEGIN
	#Routine body goes here...

SELECT COUNT(*) into @cnt FROM caiyankun.diary WHERE targetdate=witch;

IF @cnt=1 THEN

	set @sqlstr=CONCAT(
		"UPDATE caiyankun.diary SET 
				editdate=date_format(now(),'%y-%m-%d'),
				content='",contents,"'",
		" WHERE
				targetdate='",witch,"'"
	);

ELSE
	set @sqlstr=CONCAT(
		"INSERT INTO caiyankun.diary SET 
				editdate=date_format(now(),'%y-%m-%d'),
				content='",contents,"',",
				"targetdate='",witch,"'"
	);
#SELECT @sqlstr;
END IF;

#SELECT @sqlstr;

PREPARE stmt_name FROM @sqlstr;
EXECUTE stmt_name;
DEALLOCATE PREPARE stmt_name;

END
;;
DELIMITER ;
