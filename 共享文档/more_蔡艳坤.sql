-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 2018-03-23 00:02:46
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
-- Database: `more`
--

DELIMITER $$
--
-- 存储过程
--
DROP PROCEDURE IF EXISTS `chartadd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `chartadd` (IN `p_uid` INT, IN `p_pid` INT, IN `p_qty` INT)  NO SQL
BEGIN
INSERT INTO chart set chart.uid=p_uid,chart.pid=p_pid,chart.qty=p_qty;

	
END$$

DROP PROCEDURE IF EXISTS `chartdel`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `chartdel` (IN `p_uid` INT, IN `p_pid` INT)  NO SQL
BEGIN

	DELETE FROM chart WHERE uid=p_uid and pid=p_pid;

END$$

DROP PROCEDURE IF EXISTS `chartquery`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `chartquery` (IN `p_uid` INT)  NO SQL
BEGIN

	SELECT * from chart WHERE uid=p_uid;

END$$

DROP PROCEDURE IF EXISTS `chartupd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `chartupd` (IN `p_uid` INT, IN `p_pid` INT, IN `p_qty` INT)  NO SQL
BEGIN

	set @sqlstr=CONCAT("update chart SET qty=qty+",p_qty," where chart.uid=",p_uid," and pid=",p_pid);
    PREPARE stmt_name FROM @sqlstr;
    EXECUTE stmt_name;
    DEALLOCATE PREPARE stmt_name;

END$$

DROP PROCEDURE IF EXISTS `commentsadd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `commentsadd` (IN `p_uid` INT, IN `p_target` TEXT, IN `p_targetid` INT, IN `contents` TEXT)  NO SQL
BEGIN

	INSERT INTO comments set  uid=p_uid,target=p_target,targetid=p_targetid,content=contents,ctime=CURRENT_TIMESTAMP; 
    
END$$

DROP PROCEDURE IF EXISTS `commentsquerybytarget`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `commentsquerybytarget` (IN `p_target` TEXT, IN `p_targetid` INT)  NO SQL
BEGIN

	SELECT * FROM comments WHERE comments.target=p_target and comments.targetid=p_targetid;
	
END$$

DROP PROCEDURE IF EXISTS `commentsquerybyuser`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `commentsquerybyuser` (IN `p_uid` INT)  NO SQL
BEGIN

	SELECT * FROM comments WHERE comments.uid=p_uid;
    
END$$

DROP PROCEDURE IF EXISTS `create`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `create` (IN `fields` TEXT, IN `vals` TEXT)  NO SQL
BEGIN
	set @sqlstr=CONCAT("INSERT INTO user_info (",fields,") VALUES (",vals,");");
	PREPARE stmt_name FROM @sqlstr;
	EXECUTE stmt_name;
   
	DEALLOCATE PREPARE stmt_name;
END$$

DROP PROCEDURE IF EXISTS `designercreatework`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `designercreatework` (IN `p_uid` INT, IN `contents` TEXT)  NO SQL
BEGIN
	CALL productadd(contents);
	set @p_pid = @@IDENTITY;
	INSERT INTO designer_info (uid,action,pid,ctime) VALUES(p_uid,'作品',@p_pid,CURRENT_TIMESTAMP);

END$$

DROP PROCEDURE IF EXISTS `designerdelwork`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `designerdelwork` (IN `p_uid` INT, IN `p_pid` INT)  NO SQL
BEGIN
	DELETE FROM designer_info WHERE uid=p_uid and pid=p_pid;
   CALL productdel(p_pid); 
END$$

DROP PROCEDURE IF EXISTS `designerquerywork`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `designerquerywork` (IN `p_uid` INT)  NO SQL
BEGIN

	 select 
        uid,action,p.* 
    from 
        designer_info as d
        LEFT join goods as p on d.pid=p.pid
    WHERE
        uid=p_uid and d.action='作品';

END$$

DROP PROCEDURE IF EXISTS `designerupdwork`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `designerupdwork` (IN `p_uid` INT, IN `p_pid` INT, IN `contents` TEXT)  NO SQL
BEGIN
	CALL productupd(p_pid,contents);
END$$

DROP PROCEDURE IF EXISTS `dicgetalias`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `dicgetalias` (IN `p_key` TEXT)  NO SQL
BEGIN

	SELECT cnnick,ennick FROM dictionary where dictionary.key=p_key;

END$$

DROP PROCEDURE IF EXISTS `dicgetkey`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `dicgetkey` (IN `p_nick` TEXT)  NO SQL
BEGIN

	SELECT dictionary.key FROM dictionary where cnnick=p_nick or ennick=p_nick;

END$$

DROP PROCEDURE IF EXISTS `dicquery`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `dicquery` (IN `p_key` TEXT)  NO SQL
BEGIN

	SELECT * from dictionary where dictionary.key=p_key;

END$$

DROP PROCEDURE IF EXISTS `dicupditem`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `dicupditem` (IN `p_key` TEXT, IN `contents` TEXT)  NO SQL
BEGIN
set @sqlstr=CONCAT("update dictionary SET ",contents," where dictionary.key=",p_key);
    PREPARE stmt_name FROM @sqlstr;
    EXECUTE stmt_name;
    DEALLOCATE PREPARE stmt_name;
END$$

DROP PROCEDURE IF EXISTS `discountdel`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `discountdel` (IN `p_pid` INT)  NO SQL
BEGIN

	DELETE FROM discount WHERE pid=p_pid;

END$$

DROP PROCEDURE IF EXISTS `discountupd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `discountupd` (IN `p_pid` INT, IN `p_value` DOUBLE)  NO SQL
BEGIN
	
    INSERT INTO discount SET pid=p_pid,discount=p_value;

END$$

DROP PROCEDURE IF EXISTS `getuserinfo`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getuserinfo` (IN `uid` INT)  NO SQL
BEGIN
	DECLARE matchnum INT default 0;
  	SELECT COUNT(*) INTO matchnum FROM user_info WHERE user_info.uid=uid;
   if matchnum <1 then
     INSERT INTO user_info (uid) VALUES(uid);
   end if;
   	  SELECT * FROM user_info WHERE user_info.uid=uid;
  
END$$

DROP PROCEDURE IF EXISTS `membercreate`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `membercreate` (IN `p_uid` INT, IN `p_membertype` INT)  NO SQL
BEGIN
	set @sqlstr=CONCAT("UPDATE member_info SET  membertype=",p_membertype," WHERE member_info.uid=",p_uid);
	PREPARE stmt_name FROM @sqlstr;
	EXECUTE stmt_name;
	DEALLOCATE PREPARE stmt_name;
	CALL updmemberinfo(p_uid);
   SELECT * FROM member_info where member_info.uid=p_uid;
END$$

DROP PROCEDURE IF EXISTS `memberdeposit`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `memberdeposit` (IN `p_uid` INT, IN `p_value` INT)  NO SQL
BEGIN
	set @sqlstr=CONCAT("UPDATE member_info SET deposit=deposit+",p_value," WHERE member_info.uid=",p_uid);
	PREPARE stmt_name FROM @sqlstr;
	EXECUTE stmt_name;
	DEALLOCATE PREPARE stmt_name;
   SELECT deposit FROM member_info where member_info.uid=p_uid;
END$$

DROP PROCEDURE IF EXISTS `memberdereload`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `memberdereload` (IN `p_uid` INT, IN `p_value` INT)  NO SQL
BEGIN
	set @sqlstr=CONCAT("UPDATE member_info SET balance=balance+",p_value," WHERE member_info.uid=",p_uid);
	PREPARE stmt_name FROM @sqlstr;
	EXECUTE stmt_name;
	DEALLOCATE PREPARE stmt_name;
   SELECT balance FROM member_info where member_info.uid=p_uid;
END$$

DROP PROCEDURE IF EXISTS `memberquery`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `memberquery` (IN `uid` INT)  NO SQL
BEGIN
	DECLARE matchnum INT default 0;
  	SELECT COUNT(*) INTO matchnum FROM member_info WHERE member_info.uid=uid;
   if matchnum <1 then
     INSERT INTO member_info set member_info.uid=uid,member_info.membertype=0,member_info.ctime=CURRENT_TIMESTAMP;
   else
   	  SELECT * FROM member_info WHERE member_info.uid=uid;
   end if;  
END$$

DROP PROCEDURE IF EXISTS `ordercancel`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ordercancel` (IN `uid` INT, IN `oid` TEXT, IN `reason` TEXT)  NO SQL
BEGIN

UPDATE more.order SET 
	order.status =	"已撤销-未支付订单撤销",
    order.option=reason
WHERE	 
	order.oid=oid AND order.uid=uid AND order.type="info"
;




END$$

DROP PROCEDURE IF EXISTS `ordercreate`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ordercreate` (IN `uid` INT, IN `oid` TEXT, IN `receiver` TEXT, IN `contact` TEXT, IN `address` TEXT)  NO SQL
BEGIN
/*先创建一个订单信息*/
INSERT INTO more.order SET 
    order.oid=oid,
    order.type="info",
    order.uid=uid,
    order.ctime=CURRENT_TIMESTAMP,
    order.receiver=receiver,
    order.contact=contact,
    order.address=address,
    order.status="待支付"
;
/*导入购物车信息*/
INSERT INTO more.order (
    order.oid,
    order.type,
    order.uid,
    order.ctime,
    order.pid,
    order.qty,
    order.unitprice,
    order.saleprice,
    order.discount,
    order.totalprice
) SELECT
	oid,
   "product",
   uid,
   CURRENT_TIMESTAMP,
   chart.pid,
   chart.qty,
   chart.unitprice,
   chart.saleprice,
   chart.discount,
   chart.totalprice
FROM more.chart WHERE chart.uid=uid;

/*导入优惠信息*/

/*导入运费*/

/*清空购物车信息*/
DELETE FROM more.chart WHERE chart.uid=uid;

CALL more.orderquery(uid,oid);

END$$

DROP PROCEDURE IF EXISTS `orderdelivered`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `orderdelivered` (IN `uid` INT, IN `oid` TEXT)  NO SQL
BEGIN

UPDATE more.order SET 
	order.status =	"已完成" 
WHERE	 
	order.oid=oid AND order.uid=uid AND order.type="info"
;


END$$

DROP PROCEDURE IF EXISTS `orderdeliveredcancel`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `orderdeliveredcancel` (IN `uid` INT, IN `oid` TEXT)  NO SQL
BEGIN

UPDATE more.order SET 
	order.status =	"已撤销"
WHERE	 
	order.oid=oid AND order.uid=uid AND order.type="info"
;




END$$

DROP PROCEDURE IF EXISTS `orderdeliveredcancelapply`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `orderdeliveredcancelapply` (IN `uid` INT, IN `oid` TEXT, IN `reason` TEXT)  NO SQL
BEGIN

UPDATE more.order SET 
	order.status =	"待处理-已支付订单申请撤销",
    order.option=reason
WHERE	 
	order.oid=oid AND order.uid=uid AND order.type="info"
;




END$$

DROP PROCEDURE IF EXISTS `orderlist`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `orderlist` (IN `uid` INT, IN `filter` TEXT)  NO SQL
BEGIN

SELECT 
	order.oid,
   order.ctime,
   order.receiver,
   order.contact,
   order.address,
   SUM(order.totalprice) AS totalprice,
   order.status
FROM more.order WHERE
	order.uid=uid
GROUP BY order.oid;


END$$

DROP PROCEDURE IF EXISTS `orderpay`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `orderpay` (IN `uid` INT, IN `oid` TEXT)  NO SQL
BEGIN

UPDATE more.order SET 
	order.status =	"待发货" 
WHERE	 
	order.oid=oid AND order.uid=uid AND order.type="info"
;


END$$

DROP PROCEDURE IF EXISTS `orderpayedcancel`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `orderpayedcancel` (IN `uid` INT, IN `oid` INT)  NO SQL
BEGIN
/*更改订单状态为已撤销*/
UPDATE more.order SET 
	order.status =	"已撤销"
WHERE	 
	order.oid=oid AND order.uid=uid AND order.type="info"
;
/*将相应金额退回到客户余额*/


/*扣除相应手续费*/


END$$

DROP PROCEDURE IF EXISTS `orderquery`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `orderquery` (IN `uid` INT, IN `oid` TEXT)  NO SQL
BEGIN

/*产品信息*/
SELECT 
	 order.pid,
    order.qty,
    order.unitprice,
    order.saleprice,
    order.discount,
    order.totalprice
FROM more.order WHERE
	order.uid=uid AND order.oid=oid AND order.type="product"
;

/*折扣信息*/
SELECT 
	 order.pid,
    order.discount,
    order.totalprice
FROM more.order WHERE
	order.uid=uid AND order.oid=oid AND order.type="discount"
;
/*额外信息*/
SELECT 
	 order.pid,
    order.discount,
    order.totalprice
FROM more.order WHERE
	order.uid=uid AND order.oid=oid AND order.type="extra"
;

/*订单信息*/
SELECT 
   order.ctime,
   order.receiver,
   order.contact,
   order.address,
   SUM(order.totalprice) AS totalprice,
   order.status
FROM more.order WHERE
	order.uid=uid AND order.oid=oid
GROUP BY order.oid;


END$$

DROP PROCEDURE IF EXISTS `orderstat`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `orderstat` (IN `uid` INT)  NO SQL
BEGIN

SELECT 
	order.status,
   COUNT(*) 
FROM more.order WHERE
	order.uid=uid AND order.type="info"
GROUP BY order.status;

END$$

DROP PROCEDURE IF EXISTS `orderupd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `orderupd` (IN `uid` INT, IN `oid` TEXT, IN `receiver` TEXT, IN `contact` TEXT, IN `address` TEXT)  NO SQL
BEGIN

UPDATE more.order SET
	order.receiver=receiver,
    order.contact=contact,
    order.address=address
WHERE order.uid=uid AND order.oid=oid AND order.type="info";



END$$

DROP PROCEDURE IF EXISTS `productadd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `productadd` (IN `contents` TEXT)  NO SQL
BEGIN
    set @sqlstr=CONCAT("INSERT into goods SET ",contents);
    PREPARE stmt_name FROM @sqlstr;
    EXECUTE stmt_name;
    DEALLOCATE PREPARE stmt_name;
    
END$$

DROP PROCEDURE IF EXISTS `productdel`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `productdel` (IN `p_pid` INT)  NO SQL
BEGIN

	DELETE FROM goods WHERE pid=p_pid;

END$$

DROP PROCEDURE IF EXISTS `productqty`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `productqty` (IN `contents` TEXT)  NO SQL
BEGIN

	set @sqlstr=CONCAT("select count(*) from goods where ",contents);
	PREPARE stmt_name FROM @sqlstr;
	EXECUTE stmt_name;
	DEALLOCATE PREPARE stmt_name;

END$$

DROP PROCEDURE IF EXISTS `productquery`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `productquery` (IN `filterinfo` TEXT, IN `orderinfo` TEXT, IN `page` INT, IN `length` INT)  NO SQL
BEGIN
   set @sqlqty=CONCAT("select count(*) from goods where ",filterinfo,orderinfo," limit ",(page-1)*length,",",length);
	set @sqlstr=CONCAT("select * from goods where ",filterinfo,orderinfo," limit ",(page-1)*length,",",length );

    PREPARE stmt_name FROM @sqlstr;
    EXECUTE stmt_name;
    DEALLOCATE PREPARE stmt_name;
    PREPARE stmt_qty FROM @sqlqty;
    EXECUTE stmt_qty;
    DEALLOCATE PREPARE stmt_qty;

END$$

DROP PROCEDURE IF EXISTS `productstat`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `productstat` (IN `filter` TEXT)  NO SQL
BEGIN
	SELECT goods_static.status,SUM(goods_static.qty) FROM goods_static GROUP BY goods_static.status;
END$$

DROP PROCEDURE IF EXISTS `productstatupd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `productstatupd` (IN `pid` INT, IN `oldstat` TEXT, IN `newstat` TEXT, IN `qty` INT, IN `uid` INT)  NO SQL
BEGIN

INSERT INTO goods_static (goods_static.pid,goods_static.status,goods_static.qty,goods_static.operationtime,goods_static.operator) VALUES(pid,oldstat,0-qty,CURRENT_TIMESTAMP,uid);
if row_count()<1 THEN
       		SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'Insert failed! Affected row is 0';
       end if;
INSERT INTO goods_static (goods_static.pid,goods_static.status,goods_static.qty,goods_static.operationtime,goods_static.operator) VALUES(pid,newstat,qty,CURRENT_TIMESTAMP,uid);
if row_count()<1 THEN
       		SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'Insert failed! Affected row is 0';
       end if;


END$$

DROP PROCEDURE IF EXISTS `productupd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `productupd` (IN `p_pid` INT, IN `contents` TEXT)  NO SQL
BEGIN

	set @sqlstr=CONCAT("update goods SET ",contents," where pid=",p_pid );
    PREPARE stmt_name FROM @sqlstr;
    EXECUTE stmt_name;
    DEALLOCATE PREPARE stmt_name;

END$$

DROP PROCEDURE IF EXISTS `shopdelinfo`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `shopdelinfo` (IN `p_key` TEXT)  NO SQL
BEGIN

	 declare cnt text default null;
    select COUNT(*) into cnt from shop_info WHERE shop_info.key=p_key;
    if cnt > 0 THEN
    	DELETE FROM shop_info WHERE shop_info.key=p_key;
    end if;

END$$

DROP PROCEDURE IF EXISTS `shopreadinfo`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `shopreadinfo` (IN `p_key` TEXT)  NO SQL
BEGIN
	SELECT value from shop_info WHERE shop_info.key = p_key;
END$$

DROP PROCEDURE IF EXISTS `shopwriteinfo`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `shopwriteinfo` (IN `p_key` TEXT, IN `p_value` TEXT)  NO SQL
BEGIN
    declare cnt text default null;
    select COUNT(*) into cnt from shop_info WHERE shop_info.key=p_key;
    if cnt > 0 THEN
    	UPDATE shop_info SET shop_info.value=p_value WHERE shop_info.key=p_key;
    ELSE
		INSERT INTO shop_info (shop_info.key,shop_info.value,ctime) VALUES(p_key,p_value,CURRENT_TIMESTAMP);
    end if;
END$$

DROP PROCEDURE IF EXISTS `test`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `test` ()  NO SQL
BEGIN

SELECT
	1,
   "product",
   "uid",
   CURRENT_TIMESTAMP,
   chart.pid,
   chart.qty,
   chart.unitprice,
   chart.saleprice,
   chart.discount,
   chart.totalprice
FROM more.chart;


END$$

DROP PROCEDURE IF EXISTS `updmemberinfo`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updmemberinfo` (IN `p_uid` INT)  NO SQL
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
    
END$$

DROP PROCEDURE IF EXISTS `upduserinfo`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `upduserinfo` (IN `uid` INT, IN `contents` TEXT)  NO SQL
BEGIN
	set @sqlstr=CONCAT("UPDATE user_info SET ",contents," WHERE user_info.uid=",uid);
	PREPARE stmt_name FROM @sqlstr;
	EXECUTE stmt_name;
	DEALLOCATE PREPARE stmt_name;
   SELECT * FROM user_info WHERE user_info.uid = uid;
END$$

DROP PROCEDURE IF EXISTS `useractionadd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `useractionadd` (IN `p_uid` INT, IN `p_action` VARCHAR(100), IN `p_target` VARCHAR(100))  NO SQL
BEGIN
	DECLARE matchnum INT default 0;
  	SELECT COUNT(*) INTO matchnum FROM user_action WHERE user_action.uid=p_uid and user_action.action=p_action and target=p_target;
   if matchnum <1 then
     INSERT INTO user_action set uid=p_uid,action=p_action,target=p_target,ctime=CURRENT_TIMESTAMP; 
     
   end if;  
   SELECT * FROM user_action WHERE user_action.uid=p_uid;
END$$

DROP PROCEDURE IF EXISTS `useractiondel`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `useractiondel` (IN `p_uid` INT, IN `p_action` VARCHAR(100), IN `p_target` VARCHAR(100))  NO SQL
BEGIN
	DECLARE matchnum INT default 0;
  	SELECT COUNT(*) INTO matchnum FROM user_action WHERE user_action.uid=p_uid and user_action.action=p_action and target=p_target;
     if matchnum >0 then
    DELETE FROM user_action where user_action.uid=p_uid and user_action.action=p_action and user_action.target=p_target;
     
   end if;  

END$$

DROP PROCEDURE IF EXISTS `useractionquery`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `useractionquery` (IN `p_uid` INT, IN `p_action` VARCHAR(100))  NO SQL
BEGIN

	SELECT * FROM user_action where user_action.uid=p_uid and  user_action.action=p_action;
    
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `aid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `aname` text COMMENT '用户名',
  `email` text COMMENT '邮箱',
  `mobile` char(13) NOT NULL COMMENT '联系电话',
  `apassword` char(64) DEFAULT NULL COMMENT '密码',
  `createtime` date DEFAULT NULL COMMENT '创建时间',
  `updatetime` date DEFAULT NULL COMMENT '更新时间',
  `log` text COMMENT '日志',
  `lastlogin` date DEFAULT NULL COMMENT '最后登录时间',
  PRIMARY KEY (`aid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='管理员表';

-- --------------------------------------------------------

--
-- 表的结构 `chart`
--

DROP TABLE IF EXISTS `chart`;
CREATE TABLE IF NOT EXISTS `chart` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL,
  `type` varchar(20) DEFAULT 'product' COMMENT '类型',
  `pid` int(11) DEFAULT NULL COMMENT '商品ID',
  `qty` int(11) DEFAULT NULL COMMENT '数量',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `otime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '当前时间',
  `unitprice` int(11) DEFAULT NULL COMMENT '单价',
  `saleprice` int(11) DEFAULT NULL COMMENT '出售价',
  `discount` int(11) DEFAULT NULL COMMENT '折扣',
  `totalprice` int(11) NOT NULL,
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='购物车表';

-- --------------------------------------------------------

--
-- 表的结构 `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `cid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `target` text COMMENT '目标',
  `targetid` int(11) DEFAULT NULL COMMENT '目标ID',
  `content` text COMMENT '内容',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `option` text COMMENT '选项',
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='评论表';

--
-- 转存表中的数据 `comments`
--

INSERT INTO `comments` (`cid`, `uid`, `target`, `targetid`, `content`, `ctime`, `option`) VALUES
(1, 42, '1', 2, '1111', '2018-03-19 12:51:50', NULL),
(2, 42, '78', 1, 'brand=\'马云飞\',name=\'大衣\'', '2018-03-19 13:07:06', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `designer_info`
--

DROP TABLE IF EXISTS `designer_info`;
CREATE TABLE IF NOT EXISTS `designer_info` (
  `did` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `action` varchar(255) DEFAULT 'info' COMMENT '行为',
  `pid` int(11) DEFAULT NULL COMMENT '商品ID',
  `option` text COMMENT '选项',
  PRIMARY KEY (`did`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `designer_info`
--

INSERT INTO `designer_info` (`did`, `uid`, `ctime`, `action`, `pid`, `option`) VALUES
(4, 42, '2018-03-17 07:23:19', '作品', 2, NULL),
(3, 42, '2018-03-17 07:22:39', '作品', 1, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `dictionary`
--

DROP TABLE IF EXISTS `dictionary`;
CREATE TABLE IF NOT EXISTS `dictionary` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `key` text COMMENT '变量名',
  `cnnick` text COMMENT '中文显示',
  `ennick` text COMMENT '英文显示',
  `pvalue` text COMMENT '值',
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='数据定义表';

--
-- 转存表中的数据 `dictionary`
--

INSERT INTO `dictionary` (`id`, `key`, `cnnick`, `ennick`, `pvalue`, `option`) VALUES
(1, 'info', '22222', 'english', NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `discount`
--

DROP TABLE IF EXISTS `discount`;
CREATE TABLE IF NOT EXISTS `discount` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `dtype` varchar(100) DEFAULT '单价优惠-百分比' COMMENT '折扣类型',
  `target` text COMMENT '目标',
  `pid` int(11) DEFAULT NULL COMMENT '商品ID',
  `discount` int(2) UNSIGNED DEFAULT '0' COMMENT '折扣',
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='折扣表';

-- --------------------------------------------------------

--
-- 表的结构 `goods`
--

DROP TABLE IF EXISTS `goods`;
CREATE TABLE IF NOT EXISTS `goods` (
  `pid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品ID',
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

--
-- 转存表中的数据 `goods`
--

INSERT INTO `goods` (`pid`, `brand`, `name`, `businesstype`, `categry`, `size`, `onboard`, `material`, `uniprice`, `saleprice`, `tag`, `quota`, `occasion`, `color`, `additional`, `smallpic`, `midpic`, `largepic`, `option`) VALUES
(1, '马云飞', '大衣', NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, '飞红', '长裙', NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, '马云飞', '大衣', NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `goods_static`
--

DROP TABLE IF EXISTS `goods_static`;
CREATE TABLE IF NOT EXISTS `goods_static` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `pid` int(11) DEFAULT NULL COMMENT '商品ID',
  `dpid` char(32) DEFAULT NULL COMMENT '具体的某个衣服',
  `status` text COMMENT '状态',
  `qty` int(11) DEFAULT NULL,
  `operationtime` date DEFAULT NULL COMMENT '操作时间',
  `operator` int(11) DEFAULT NULL COMMENT '操作符',
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `goods_static`
--

INSERT INTO `goods_static` (`id`, `pid`, `dpid`, `status`, `qty`, `operationtime`, `operator`, `option`) VALUES
(1, 1, '100001', '入库', 100, '2018-03-22', 1, NULL),
(2, 2, '200001', '上架', 1000, '2018-03-22', 1, NULL),
(3, 2, '200001', '出借', 600, '2018-03-22', 1, NULL),
(4, 3, '', '清洗', 34, '2018-03-22', 1, NULL),
(5, 3, '', '清洗', 34, '2018-03-22', 1, NULL),
(6, 2, '200001', '出借', 600, '2018-03-22', 1, NULL),
(7, 1, '100001', '入库', 100, '2018-03-22', 1, NULL),
(8, 2, '200001', '上架', 1000, '2018-03-22', 1, NULL),
(9, 2, '200001', '出售', 1000, '2018-03-22', 1, NULL),
(10, 2, '200001', '损坏', 20, '2018-03-22', 1, NULL),
(11, 2, '200001', '损坏', 20, '2018-03-22', 1, NULL),
(12, 6, NULL, '供应商', -36, '2018-03-22', 1, NULL),
(13, 6, NULL, '库房', 36, '2018-03-22', 1, NULL),
(14, 6, NULL, '库房', -3, '2018-03-22', 3, NULL),
(15, 6, NULL, '出借', 3, '2018-03-22', 3, NULL),
(16, 5, NULL, '测试哈', -888, '2018-03-22', 0, NULL),
(17, 5, NULL, '新状态', 888, '2018-03-22', 0, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `member_info`
--

DROP TABLE IF EXISTS `member_info`;
CREATE TABLE IF NOT EXISTS `member_info` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `uid` int(10) UNSIGNED DEFAULT NULL COMMENT '用户ID',
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

-- --------------------------------------------------------

--
-- 表的结构 `order`
--

DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `oid` text COMMENT '订单ID',
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
  `totalprice` int(11) DEFAULT NULL,
  `status` text COMMENT '支付状态',
  `log` text COMMENT '日志',
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `order`
--

INSERT INTO `order` (`id`, `oid`, `type`, `uid`, `ctime`, `pid`, `qty`, `receiver`, `contact`, `address`, `unitprice`, `saleprice`, `discount`, `totalprice`, `status`, `log`, `option`) VALUES
(1, '111', 'info', 423, '2018-03-22 14:23:58', NULL, NULL, 'aa', NULL, 'cc', NULL, NULL, NULL, 0, '待支付', NULL, NULL),
(2, '1111', 'info', 423, '2018-03-22 14:26:52', NULL, NULL, 'aa', NULL, 'cc', NULL, NULL, NULL, NULL, '待支付', NULL, NULL),
(3, '1111', 'info', 423, '2018-03-22 14:27:16', NULL, NULL, 'aa', NULL, 'cc', NULL, NULL, NULL, NULL, '待支付', NULL, NULL),
(4, '1111', 'info', 4, '2018-03-22 14:27:52', NULL, NULL, 'aa', NULL, 'cc', NULL, NULL, NULL, NULL, '待支付', NULL, NULL),
(5, '1111', 'info', 423, '2018-03-22 14:29:16', NULL, NULL, '1', NULL, '1', NULL, NULL, NULL, NULL, '待支付', NULL, NULL),
(6, '12345', 'info', 11, '2018-03-22 14:30:43', NULL, NULL, 'q', NULL, 'q', NULL, NULL, NULL, NULL, '待支付', NULL, NULL),
(7, '22', 'info', 11, '2018-03-22 14:32:55', NULL, NULL, 'w', NULL, 'w', NULL, NULL, NULL, NULL, '待支付', NULL, NULL),
(8, '12343', 'info', 11, '2018-03-22 14:35:43', NULL, NULL, 'q', NULL, 'q', NULL, NULL, NULL, NULL, '待支付', NULL, NULL),
(9, '12343', 'product', 11, '2018-03-22 14:35:43', 1, 3, NULL, NULL, NULL, 1, 1, 1, 0, NULL, NULL, NULL),
(10, '12343', 'product', 11, '2018-03-22 14:35:43', 1, 3, NULL, NULL, NULL, 11, 22, 22, 33, NULL, NULL, NULL),
(11, 'eeeee', 'info', 11, '2018-03-22 14:37:25', NULL, NULL, 'e', 'ee', 'cc', NULL, NULL, NULL, 66, '待处理', NULL, '我不想要了！！'),
(12, 'eeeee', 'product', 11, '2018-03-22 14:37:25', 1, 3, NULL, 'ff', NULL, 1, 1, 1, 44, NULL, NULL, NULL),
(13, 'eeeee', 'product', 11, '2018-03-22 14:37:25', 1, 3, NULL, NULL, NULL, 11, 22, 22, 33, NULL, NULL, NULL),
(14, 'ffffffff', 'info', 11, '2018-03-22 14:42:54', NULL, NULL, 'f', 'ff', 'fff', NULL, NULL, NULL, NULL, '待支付', NULL, NULL),
(15, 'ffffffff', 'product', 11, '2018-03-22 14:42:54', 1, 3, NULL, NULL, NULL, 1, 1, 1, 0, NULL, NULL, NULL),
(16, 'ffffffff', 'product', 11, '2018-03-22 14:42:54', 1, 3, NULL, NULL, NULL, 11, 22, 22, 33, NULL, NULL, NULL),
(17, '1521761283', 'info', 0, '2018-03-22 23:28:03', NULL, NULL, '我是收获人呢', '我是联系方式', '我是地址', NULL, NULL, NULL, NULL, '已撤销', NULL, NULL),
(18, '0|1521761340', 'info', 0, '2018-03-22 23:29:00', NULL, NULL, 'ggg', 'ttt', 'yyy', NULL, NULL, NULL, NULL, '已撤销', NULL, '我不想要了'),
(19, '0|1521761473', 'info', 0, '2018-03-22 23:31:13', NULL, NULL, '11', '2222', '333', NULL, NULL, NULL, NULL, '待支付', NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `pocket`
--

DROP TABLE IF EXISTS `pocket`;
CREATE TABLE IF NOT EXISTS `pocket` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `type` varchar(20) DEFAULT '预约' COMMENT '类型',
  `pid` int(11) DEFAULT NULL COMMENT '商品ID',
  `qty` int(11) DEFAULT '1',
  `quota` int(11) DEFAULT NULL COMMENT '定额',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `otime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '上一次操作时间',
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

-- --------------------------------------------------------

--
-- 表的结构 `sharepic`
--

DROP TABLE IF EXISTS `sharepic`;
CREATE TABLE IF NOT EXISTS `sharepic` (
  `sid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `type` text COMMENT '类型',
  `attaches` text COMMENT '附件',
  `content` text COMMENT '内容',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `option` text COMMENT '选项',
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='晒图表';

-- --------------------------------------------------------

--
-- 表的结构 `shop_info`
--

DROP TABLE IF EXISTS `shop_info`;
CREATE TABLE IF NOT EXISTS `shop_info` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `key` text COMMENT '关键词',
  `value` text COMMENT '值',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `shop_info`
--

INSERT INTO `shop_info` (`id`, `key`, `value`, `ctime`, `option`) VALUES
(2, 'index', '100', '2018-03-17 08:06:54', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `user_action`
--

DROP TABLE IF EXISTS `user_action`;
CREATE TABLE IF NOT EXISTS `user_action` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `action` text COMMENT '行为',
  `target` text COMMENT '标签',
  `content` text COMMENT '内容',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `user_info`
--

DROP TABLE IF EXISTS `user_info`;
CREATE TABLE IF NOT EXISTS `user_info` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增id',
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

--
-- 转存表中的数据 `user_info`
--

INSERT INTO `user_info` (`id`, `uid`, `nick`, `realname`, `shenfenzheng`, `verified`, `invitationcode`, `sex`, `age`, `mobile`, `morecontact`, `address`, `moraddress`, `additional`) VALUES
(1, 42, NULL, NULL, NULL, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
