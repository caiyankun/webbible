/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : more

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-03-21 21:13:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `chart`
-- ----------------------------
DROP TABLE IF EXISTS `chart`;
CREATE TABLE `chart` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `type` varchar(20) DEFAULT 'product' COMMENT '类型',
  `pid` int(11) DEFAULT NULL COMMENT '商品ID',
  `qty` int(11) DEFAULT NULL COMMENT '数量',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `otime` timestamp NULL COMMENT '当前时间',
  `unitprice` int(11) DEFAULT NULL COMMENT '单价',
  `saleprice` int(11) DEFAULT NULL COMMENT '出售价',
  `discount` int(11) DEFAULT NULL COMMENT '折扣',
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='购物车表';

-- ----------------------------
-- Records of chart
-- ----------------------------
INSERT INTO `chart` VALUES ('2', '42', 'product', '1', '3', '2018-03-20 21:44:50', '2018-03-20 21:44:50', null, null, null, null);

-- ----------------------------
-- Table structure for `comments`
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `cid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `target` text COMMENT '目标',
  `targetid` int(11) DEFAULT NULL COMMENT '目标ID',
  `content` text COMMENT '内容',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `option` text COMMENT '选项',
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='评论表';

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('1', '42', '1', '2', '1111', '2018-03-19 20:51:50', null);
INSERT INTO `comments` VALUES ('2', '42', '78', '1', 'brand=\'马云飞\',name=\'大衣\'', '2018-03-19 21:07:06', null);

-- ----------------------------
-- Table structure for `designer_info`
-- ----------------------------
DROP TABLE IF EXISTS `designer_info`;
CREATE TABLE `designer_info` (
  `did` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `action` varchar(255) DEFAULT 'info' COMMENT '行为',
  `pid` int(11) DEFAULT NULL COMMENT '商品ID',
  `option` text COMMENT '选项',
  PRIMARY KEY (`did`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of designer_info
-- ----------------------------
INSERT INTO `designer_info` VALUES ('4', '42', '2018-03-17 15:23:19', '作品', '2', null);
INSERT INTO `designer_info` VALUES ('3', '42', '2018-03-17 15:22:39', '作品', '1', null);

-- ----------------------------
-- Table structure for `dictionary`
-- ----------------------------
DROP TABLE IF EXISTS `dictionary`;
CREATE TABLE `dictionary` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `key` text COMMENT '变量名',
  `cnnick` text COMMENT '中文显示',
  `ennick` text COMMENT '英文显示',
  `pvalue` text COMMENT '值',
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='数据定义表';

-- ----------------------------
-- Records of dictionary
-- ----------------------------
INSERT INTO `dictionary` VALUES ('1', 'info', '中文2', 'english', null, null);

-- ----------------------------
-- Table structure for `discount`
-- ----------------------------
DROP TABLE IF EXISTS `discount`;
CREATE TABLE `discount` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `dtype` varchar(100) DEFAULT '单价优惠-百分比' COMMENT '折扣类型',
  `target` text COMMENT '目标',
  `pid` int(11) DEFAULT NULL COMMENT '商品ID',
  `discount` int(2) unsigned DEFAULT '0' COMMENT '折扣',
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='折扣表';

-- ----------------------------
-- Records of discount
-- ----------------------------

-- ----------------------------
-- Table structure for `goods`
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `pid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品ID',
  `brand` text COMMENT '设计师',
  `name` text COMMENT '名称',
  `businesstype` text COMMENT '业务类型',
  `categry` text COMMENT '分类',
  `size` text COMMENT '尺寸',
  `onboard` tinyint(1) DEFAULT '0' COMMENT '板型',
  `material` text COMMENT '材质',
  `uniprice` int(11) DEFAULT NULL COMMENT '单价',
  `saleprice` int(11) DEFAULT NULL COMMENT '出售价',
  `tag` text COMMENT '标签',
  `quota` int(11) DEFAULT '1' COMMENT '定额',
  `occasion` text COMMENT '场合',
  `color` text COMMENT '颜色',
  `additional` text COMMENT '额外',
  `smallpic` text COMMENT '小图',
  `midpic` text COMMENT '中图',
  `largepic` text COMMENT '原图',
  `option` text COMMENT '选项',
  PRIMARY KEY (`pid`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '马云飞', '大衣', null, null, null, '0', null, null, null, null, '1', null, null, null, null, null, null, null);
INSERT INTO `goods` VALUES ('2', '飞红', '长裙', null, null, null, '0', null, null, null, null, '1', null, null, null, null, null, null, null);
INSERT INTO `goods` VALUES ('3', '马云飞', '大衣', null, null, null, '0', null, null, null, null, '1', null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for `goods_static`
-- ----------------------------
DROP TABLE IF EXISTS `goods_static`;
CREATE TABLE `goods_static` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `pid` int(11) DEFAULT NULL COMMENT '商品ID',
  `dpid` char(32) DEFAULT NULL COMMENT '具体的某个衣服',
  `status` text COMMENT '状态',
  `qty` int(11) DEFAULT NULL,
  `operationtime` date DEFAULT NULL COMMENT '操作时间',
  `operator` int(11) DEFAULT NULL COMMENT '操作符',
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_static
-- ----------------------------

-- ----------------------------
-- Table structure for `member_info`
-- ----------------------------
DROP TABLE IF EXISTS `member_info`;
CREATE TABLE `member_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `uid` int(10) unsigned DEFAULT NULL COMMENT '用户ID',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `membertype` int(11) DEFAULT NULL COMMENT '用户类型',
  `memberruntil` date DEFAULT NULL COMMENT '会员期',
  `deposit` int(11) DEFAULT NULL COMMENT '押金',
  `invoice` int(11) DEFAULT NULL COMMENT '发票',
  `balance` int(11) DEFAULT NULL COMMENT '充值余额',
  `quota` int(11) DEFAULT NULL COMMENT '会员额度',
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of member_info
-- ----------------------------

-- ----------------------------
-- Table structure for `order`
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `oid` int(11) DEFAULT NULL COMMENT '订单ID',
  `type` varchar(20) DEFAULT 'info' COMMENT '分类',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `pid` int(11) DEFAULT NULL COMMENT '商品ID',
  `qty` int(11) DEFAULT NULL,
  `receiver` text COMMENT '接收机',
  `contact` text COMMENT '联系方式',
  `address` text COMMENT '详细地址',
  `unitprice` int(11) DEFAULT NULL COMMENT '单价',
  `saleprice` int(11) DEFAULT NULL COMMENT '出售价',
  `discount` int(11) DEFAULT NULL COMMENT '折扣',
  `status` text COMMENT '支付状态',
  `log` text COMMENT '日志',
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------

-- ----------------------------
-- Table structure for `pocket`
-- ----------------------------
DROP TABLE IF EXISTS `pocket`;
CREATE TABLE `pocket` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `type` varchar(20) DEFAULT '预约' COMMENT '类型',
  `pid` int(11) DEFAULT NULL COMMENT '商品ID',
  `qty` int(11) DEFAULT '1',
  `quota` int(11) DEFAULT NULL COMMENT '定额',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `otime` timestamp NULL COMMENT '上一次操作时间',
  `log` text COMMENT '日志',
  `btime` date DEFAULT NULL COMMENT '计划出借时间',
  `rtime` date DEFAULT NULL COMMENT '计划归还时间',
  `rbtime` date DEFAULT NULL COMMENT '实际出借时间',
  `rrtime` date DEFAULT NULL COMMENT ' 实际归还时间',
  `receiver` text COMMENT '接收机',
  `contact` text COMMENT '联系方式',
  `address` text COMMENT '详细地址',
  `status` text COMMENT '状态',
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='租衣表';

-- ----------------------------
-- Records of pocket
-- ----------------------------

-- ----------------------------
-- Table structure for `sharepic`
-- ----------------------------
DROP TABLE IF EXISTS `sharepic`;
CREATE TABLE `sharepic` (
  `sid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `type` text COMMENT '类型',
  `attaches` text COMMENT '附件',
  `content` text COMMENT '内容',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `option` text COMMENT '选项',
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='晒图表';

-- ----------------------------
-- Records of sharepic
-- ----------------------------
INSERT INTO `sharepic` VALUES ('2', '42', 'info', 'info', 'wwewq', '2018-03-21 20:06:41', null);
INSERT INTO `sharepic` VALUES ('3', '42', 'info1', 'info1', '222e2e', '2018-03-21 20:06:57', null);
INSERT INTO `sharepic` VALUES ('4', '42', 'info3', 'info3', '134554333', '2018-03-21 20:07:12', null);

-- ----------------------------
-- Table structure for `shop_info`
-- ----------------------------
DROP TABLE IF EXISTS `shop_info`;
CREATE TABLE `shop_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `key` text COMMENT '关键词',
  `value` text COMMENT '值',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_info
-- ----------------------------
INSERT INTO `shop_info` VALUES ('2', 'index', '100', '2018-03-17 16:06:54', null);

-- ----------------------------
-- Table structure for `user_action`
-- ----------------------------
DROP TABLE IF EXISTS `user_action`;
CREATE TABLE `user_action` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `action` text COMMENT '行为',
  `target` text COMMENT '标签',
  `content` text COMMENT '内容',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_action
-- ----------------------------

-- ----------------------------
-- Table structure for `user_info`
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `nick` text COMMENT '昵称',
  `realname` text COMMENT '真名',
  `shenfenzheng` text COMMENT '身份证',
  `verified` tinyint(1) DEFAULT '0' COMMENT '验证码',
  `invitationcode` text COMMENT '邀请码',
  `sex` tinyint(1) DEFAULT '1' COMMENT '性别',
  `age` tinyint(3) DEFAULT NULL COMMENT '年龄',
  `mobile` text COMMENT '手机',
  `morecontact` text COMMENT '更多联系方式',
  `address` text COMMENT '地址',
  `moraddress` text COMMENT '详细地址',
  `additional` text COMMENT '额外',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', '42', '李四', '王老五', null, '0', null, '1', null, null, null, null, null, null);

-- ----------------------------
-- Procedure structure for `chartadd`
-- ----------------------------
DROP PROCEDURE IF EXISTS `chartadd`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `chartadd`(IN `p_uid` INT, IN `p_pid` INT, IN `p_qty` INT)
    NO SQL
BEGIN
INSERT INTO chart set chart.uid=p_uid,chart.pid=p_pid,chart.qty=p_qty;

	
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `chartdel`
-- ----------------------------
DROP PROCEDURE IF EXISTS `chartdel`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `chartdel`(IN `p_uid` INT, IN `p_pid` INT)
    NO SQL
BEGIN

	DELETE FROM chart WHERE uid=p_uid and pid=p_pid;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `chartquery`
-- ----------------------------
DROP PROCEDURE IF EXISTS `chartquery`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `chartquery`(IN `p_uid` INT)
    NO SQL
BEGIN

	SELECT * from chart WHERE uid=p_uid;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `chartupd`
-- ----------------------------
DROP PROCEDURE IF EXISTS `chartupd`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `chartupd`(IN `p_uid` INT, IN `p_pid` INT, IN `p_qty` INT)
    NO SQL
BEGIN

	set @sqlstr=CONCAT("update chart SET qty=qty+",p_qty," where chart.uid=",p_uid," and pid=",p_pid);
    PREPARE stmt_name FROM @sqlstr;
    EXECUTE stmt_name;
    DEALLOCATE PREPARE stmt_name;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `commentsadd`
-- ----------------------------
DROP PROCEDURE IF EXISTS `commentsadd`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `commentsadd`(IN `p_uid` INT, IN `p_target` TEXT, IN `p_targetid` INT, IN `contents` TEXT)
    NO SQL
BEGIN

	INSERT INTO comments set  uid=p_uid,target=p_target,targetid=p_targetid,content=contents,ctime=CURRENT_TIMESTAMP; 
    
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `commentsquerybytarget`
-- ----------------------------
DROP PROCEDURE IF EXISTS `commentsquerybytarget`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `commentsquerybytarget`(IN `p_target` TEXT, IN `p_targetid` INT)
    NO SQL
BEGIN

	SELECT * FROM comments WHERE comments.target=p_target and comments.targetid=p_targetid;
	
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `commentsquerybyuser`
-- ----------------------------
DROP PROCEDURE IF EXISTS `commentsquerybyuser`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `commentsquerybyuser`(IN `p_uid` INT)
    NO SQL
BEGIN

	SELECT * FROM comments WHERE comments.uid=p_uid;
    
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `designercreatework`
-- ----------------------------
DROP PROCEDURE IF EXISTS `designercreatework`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `designercreatework`(IN `p_uid` INT, IN `contents` TEXT)
    NO SQL
BEGIN
	CALL productadd(contents);
	set @p_pid = @@IDENTITY;
	INSERT INTO designer_info (uid,action,pid,ctime) VALUES(p_uid,'作品',@p_pid,CURRENT_TIMESTAMP);

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `designerdelwork`
-- ----------------------------
DROP PROCEDURE IF EXISTS `designerdelwork`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `designerdelwork`(IN `p_uid` INT, IN `p_pid` INT)
    NO SQL
BEGIN
	DELETE FROM designer_info WHERE uid=p_uid and pid=p_pid;
   CALL productdel(p_pid); 
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `designerquerywork`
-- ----------------------------
DROP PROCEDURE IF EXISTS `designerquerywork`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `designerquerywork`(IN `p_uid` INT)
    NO SQL
BEGIN

	 select 
        uid,action,p.* 
    from 
        designer_info as d
        LEFT join goods as p on d.pid=p.pid
    WHERE
        uid=p_uid and d.action='作品';

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `designerupdwork`
-- ----------------------------
DROP PROCEDURE IF EXISTS `designerupdwork`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `designerupdwork`(IN `p_uid` INT, IN `p_pid` INT, IN `contents` TEXT)
    NO SQL
BEGIN
	CALL productupd(p_pid,contents);
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `dicgetalias`
-- ----------------------------
DROP PROCEDURE IF EXISTS `dicgetalias`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `dicgetalias`(IN `p_key` TEXT)
    NO SQL
BEGIN

	SELECT cnnick,ennick FROM dictionary where dictionary.key=p_key;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `dicgetkey`
-- ----------------------------
DROP PROCEDURE IF EXISTS `dicgetkey`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `dicgetkey`(IN `p_nick` TEXT)
    NO SQL
BEGIN

	SELECT dictionary.key FROM dictionary where cnnick=p_nick or ennick=p_nick;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `dicquery`
-- ----------------------------
DROP PROCEDURE IF EXISTS `dicquery`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `dicquery`(IN `p_key` TEXT)
    NO SQL
BEGIN

	SELECT * from dictionary where dictionary.key=p_key;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `dicupditem`
-- ----------------------------
DROP PROCEDURE IF EXISTS `dicupditem`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `dicupditem`(IN `p_key` TEXT, IN `contents` TEXT)
    NO SQL
BEGIN

set @sqlstr=CONCAT("update dictionary SET ",contents," where dictionary.key=",p_key);
    PREPARE stmt_name FROM @sqlstr;
    EXECUTE stmt_name;
    DEALLOCATE PREPARE stmt_name;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `discountdel`
-- ----------------------------
DROP PROCEDURE IF EXISTS `discountdel`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `discountdel`(IN `p_pid` INT)
    NO SQL
BEGIN

	DELETE FROM discount WHERE pid=p_pid;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `discountupd`
-- ----------------------------
DROP PROCEDURE IF EXISTS `discountupd`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `discountupd`(IN `p_pid` INT, IN `p_value` DOUBLE)
    NO SQL
BEGIN
	
    INSERT INTO discount SET pid=p_pid,discount=p_value;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `getuserinfo`
-- ----------------------------
DROP PROCEDURE IF EXISTS `getuserinfo`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getuserinfo`(IN `uid` INT)
    NO SQL
BEGIN
	DECLARE matchnum INT default 0;
  	SELECT COUNT(*) INTO matchnum FROM user_info WHERE user_info.uid=uid;
   if matchnum <1 then
     INSERT INTO user_info (uid) VALUES(uid);
   end if;
   	  SELECT * FROM user_info WHERE user_info.uid=uid;
  
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `membercreate`
-- ----------------------------
DROP PROCEDURE IF EXISTS `membercreate`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `membercreate`(IN `p_uid` INT, IN `p_membertype` INT)
    NO SQL
BEGIN
	set @sqlstr=CONCAT("UPDATE member_info SET  membertype=",p_membertype," WHERE member_info.uid=",p_uid);
	PREPARE stmt_name FROM @sqlstr;
	EXECUTE stmt_name;
	DEALLOCATE PREPARE stmt_name;
	CALL updmemberinfo(p_uid);
   SELECT * FROM member_info where member_info.uid=p_uid;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `memberdeposit`
-- ----------------------------
DROP PROCEDURE IF EXISTS `memberdeposit`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `memberdeposit`(IN `p_uid` INT, IN `p_value` INT)
    NO SQL
BEGIN
	set @sqlstr=CONCAT("UPDATE member_info SET deposit=deposit+",p_value," WHERE member_info.uid=",p_uid);
	PREPARE stmt_name FROM @sqlstr;
	EXECUTE stmt_name;
	DEALLOCATE PREPARE stmt_name;
   SELECT deposit FROM member_info where member_info.uid=p_uid;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `memberdereload`
-- ----------------------------
DROP PROCEDURE IF EXISTS `memberdereload`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `memberdereload`(IN `p_uid` INT, IN `p_value` INT)
    NO SQL
BEGIN
	set @sqlstr=CONCAT("UPDATE member_info SET balance=balance+",p_value," WHERE member_info.uid=",p_uid);
	PREPARE stmt_name FROM @sqlstr;
	EXECUTE stmt_name;
	DEALLOCATE PREPARE stmt_name;
   SELECT balance FROM member_info where member_info.uid=p_uid;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `memberquery`
-- ----------------------------
DROP PROCEDURE IF EXISTS `memberquery`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `memberquery`(IN `uid` INT)
    NO SQL
BEGIN
	DECLARE matchnum INT default 0;
  	SELECT COUNT(*) INTO matchnum FROM member_info WHERE member_info.uid=uid;
   if matchnum <1 then
     INSERT INTO member_info set member_info.uid=uid,member_info.membertype=0,member_info.ctime=CURRENT_TIMESTAMP;
   else
   	  SELECT * FROM member_info WHERE member_info.uid=uid;
   end if;  
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `productadd`
-- ----------------------------
DROP PROCEDURE IF EXISTS `productadd`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `productadd`(IN `contents` TEXT)
    NO SQL
BEGIN
    set @sqlstr=CONCAT("INSERT into goods SET ",contents);
    PREPARE stmt_name FROM @sqlstr;
    EXECUTE stmt_name;
    DEALLOCATE PREPARE stmt_name;
    
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `productdel`
-- ----------------------------
DROP PROCEDURE IF EXISTS `productdel`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `productdel`(IN `p_pid` INT)
    NO SQL
BEGIN

	DELETE FROM goods WHERE pid=p_pid;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `productqty`
-- ----------------------------
DROP PROCEDURE IF EXISTS `productqty`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `productqty`(IN `contents` TEXT)
    NO SQL
BEGIN

	set @sqlstr=CONCAT("select count(*) from goods where ",contents);
	PREPARE stmt_name FROM @sqlstr;
	EXECUTE stmt_name;
	DEALLOCATE PREPARE stmt_name;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `productstat`
-- ----------------------------
DROP PROCEDURE IF EXISTS `productstat`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `productstat`()
    NO SQL
BEGIN
	SELECT COUNT(*) FROM goods;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `productupd`
-- ----------------------------
DROP PROCEDURE IF EXISTS `productupd`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `productupd`(IN `p_pid` INT, IN `contents` TEXT)
    NO SQL
BEGIN

	set @sqlstr=CONCAT("update goods SET ",contents," where pid=",p_pid );
    PREPARE stmt_name FROM @sqlstr;
    EXECUTE stmt_name;
    DEALLOCATE PREPARE stmt_name;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `sharepicadd`
-- ----------------------------
DROP PROCEDURE IF EXISTS `sharepicadd`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sharepicadd`(IN `p_uid` INT, IN `p_type` TEXT, IN `p_attach` TEXT, IN `contents` TEXT)
    NO SQL
BEGIN

	INSERT INTO sharepic (uid,type,attaches,content,ctime) VALUES(p_uid,p_type,p_attach,contents,CURRENT_TIMESTAMP);

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `sharepicdel`
-- ----------------------------
DROP PROCEDURE IF EXISTS `sharepicdel`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sharepicdel`(IN `p_uid` INT, IN `p_sid` INT)
    NO SQL
BEGIN

	DELETE FROM sharepic where uid=p_uid and sid=p_sid;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `sharepiclist`
-- ----------------------------
DROP PROCEDURE IF EXISTS `sharepiclist`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sharepiclist`(IN `p_uid` INT, IN `p_start` INT, IN `p_length` INT)
    NO SQL
BEGIN
DECLARE cnt INT DEFAULT 0;
   select count(*) into cnt from sharepic WHERE uid=p_uid;
   if cnt>0 then
   	 set @sqlstr=CONCAT("select * from sharepic where sharepic.uid=",p_uid," order by ctime asc limit ",p_start,p_length);
    PREPARE stmt_name FROM @sqlstr;
    EXECUTE stmt_name;
    DEALLOCATE PREPARE stmt_name;   
   end if;
   if cnt=0 THEN
   	  set @sqlstr=CONCAT("select * from sharepic order by ctime asc limit ",p_start,p_length);
    PREPARE stmt_name FROM @sqlstr;
    EXECUTE stmt_name;
    DEALLOCATE PREPARE stmt_name; 
   end if;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `sharepicquery`
-- ----------------------------
DROP PROCEDURE IF EXISTS `sharepicquery`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sharepicquery`(IN `p_sid` INT)
    NO SQL
BEGIN

	SELECT * FROM sharepic WHERE sid=p_sid;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `shopdelinfo`
-- ----------------------------
DROP PROCEDURE IF EXISTS `shopdelinfo`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `shopdelinfo`(IN `p_key` TEXT)
    NO SQL
BEGIN

	 declare cnt text default null;
    select COUNT(*) into cnt from shop_info WHERE shop_info.key=p_key;
    if cnt > 0 THEN
    	DELETE FROM shop_info WHERE shop_info.key=p_key;
    end if;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `shopreadinfo`
-- ----------------------------
DROP PROCEDURE IF EXISTS `shopreadinfo`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `shopreadinfo`(IN `p_key` TEXT)
    NO SQL
BEGIN
	SELECT value from shop_info WHERE shop_info.key = p_key;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `shopwriteinfo`
-- ----------------------------
DROP PROCEDURE IF EXISTS `shopwriteinfo`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `shopwriteinfo`(IN `p_key` TEXT, IN `p_value` TEXT)
    NO SQL
BEGIN
    declare cnt text default null;
    select COUNT(*) into cnt from shop_info WHERE shop_info.key=p_key;
    if cnt > 0 THEN
    	UPDATE shop_info SET shop_info.value=p_value WHERE shop_info.key=p_key;
    ELSE
		INSERT INTO shop_info (shop_info.key,shop_info.value,ctime) VALUES(p_key,p_value,CURRENT_TIMESTAMP);
    end if;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `updmemberinfo`
-- ----------------------------
DROP PROCEDURE IF EXISTS `updmemberinfo`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updmemberinfo`(IN `p_uid` INT)
    NO SQL
BEGIN
DECLARE cnt INT DEFAULT 0;
    select membertype into cnt from member_info WHERE uid=p_uid;
	if cnt=1 THEN
    	UPDATE member_info SET quota=1000,memberuntil=date_add(now(),INTERVAL 12 month) WHERE uid=p_uid;
   ELSEIF cnt=2 THEN
   		UPDATE member_info SET quota=2000,memberuntil=date_add(now(),INTERVAL 6 month) WHERE uid=p_uid;
   ELSEIF cnt=3 THEN 
   		UPDATE member_info SET quota=3000,memberuntil=date_add(now(),INTERVAL 3 month) WHERE uid=p_uid;
    end if;
    
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `upduserinfo`
-- ----------------------------
DROP PROCEDURE IF EXISTS `upduserinfo`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `upduserinfo`(IN `uid` INT, IN `contents` TEXT)
    NO SQL
BEGIN
	set @sqlstr=CONCAT("UPDATE user_info SET ",contents," WHERE user_info.uid=",uid);
	PREPARE stmt_name FROM @sqlstr;
	EXECUTE stmt_name;
	DEALLOCATE PREPARE stmt_name;
   SELECT * FROM user_info WHERE user_info.uid = uid;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `useractionadd`
-- ----------------------------
DROP PROCEDURE IF EXISTS `useractionadd`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `useractionadd`(IN `p_uid` INT, IN `p_action` VARCHAR(100), IN `p_target` VARCHAR(100))
    NO SQL
BEGIN
	DECLARE matchnum INT default 0;
  	SELECT COUNT(*) INTO matchnum FROM user_action WHERE user_action.uid=p_uid and user_action.action=p_action and target=p_target;
   if matchnum <1 then
     INSERT INTO user_action set uid=p_uid,action=p_action,target=p_target,ctime=CURRENT_TIMESTAMP; 
     
   end if;  
   SELECT * FROM user_action WHERE user_action.uid=p_uid;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `useractiondel`
-- ----------------------------
DROP PROCEDURE IF EXISTS `useractiondel`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `useractiondel`(IN `p_uid` INT, IN `p_action` VARCHAR(100), IN `p_target` VARCHAR(100))
    NO SQL
BEGIN
	DECLARE matchnum INT default 0;
  	SELECT COUNT(*) INTO matchnum FROM user_action WHERE user_action.uid=p_uid and user_action.action=p_action and target=p_target;
     if matchnum >0 then
    DELETE FROM user_action where user_action.uid=p_uid and user_action.action=p_action and user_action.target=p_target;
     
   end if;  

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `useractionquery`
-- ----------------------------
DROP PROCEDURE IF EXISTS `useractionquery`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `useractionquery`(IN `p_uid` INT, IN `p_action` VARCHAR(100))
    NO SQL
BEGIN

	SELECT * FROM user_action where user_action.uid=p_uid and  user_action.action=p_action;
    
END
;;
DELIMITER ;
