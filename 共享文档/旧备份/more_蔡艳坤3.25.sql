-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 2018-03-24 14:18:05
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `chartadd` (IN `uid` INT, IN `pid` INT, IN `qty` INT)  NO SQL
BEGIN

/*规定一个人的购物车中相同的产品只占用一行*/
SELECT COUNT(*) INTO @num FROM more.chart 
WHERE chart.uid=uid AND chart.pid=pid;


IF @num>0 THEN
	SELECT chart.qty INTO @q FROM more.chart 
	WHERE chart.uid=uid AND chart.pid=pid;
	CALL more.chartupd(uid,pid,qty+@q);

ELSE
	CALL more.discountget(pid,@discount);

    INSERT INTO more.chart (
        chart.uid,
        chart.pid,
        chart.qty,
        chart.ctime,
        chart.otime,
        chart.unitprice,
        chart.saleprice,
        chart.discount,
        chart.totalprice
    ) SELECT
        uid,
        pid,
        qty,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP,
        goods.uniprice,
        goods.saleprice,
        @discount,
        (goods.saleprice+@discount)*qty
    FROM
        more.goods LEFT JOIN more.discount 
        ON goods.pid=discount.pid
    WHERE
        goods.pid=pid
    ;

END IF;
	
END$$

DROP PROCEDURE IF EXISTS `chartclear`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `chartclear` (IN `uid` INT)  NO SQL
BEGIN

DELETE FROM more.chart
WHERE chart.uid=uid;


END$$

DROP PROCEDURE IF EXISTS `chartdel`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `chartdel` (IN `uid` INT, IN `pid` INT)  NO SQL
BEGIN

	DELETE FROM more.chart WHERE chart.uid=uid and chart.pid=pid;
    
END$$

DROP PROCEDURE IF EXISTS `chartquery`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `chartquery` (IN `uid` INT)  NO SQL
BEGIN

	SELECT * from more.chart WHERE chart.uid=uid;
	SELECT SUM(chart.totalprice) FROM more.chart WHERE chart.uid=uid;

END$$

DROP PROCEDURE IF EXISTS `chartupd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `chartupd` (IN `uid` INT, IN `pid` INT, IN `qty` INT)  NO SQL
BEGIN

UPDATE more.chart SET
	chart.qty=qty,
    chart.totalprice=(chart.saleprice+chart.discount)*qty
WHERE 
	chart.uid=uid AND chart.pid=pid
;

END$$

DROP PROCEDURE IF EXISTS `commentsadd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `commentsadd` (IN `uid` INT, IN `target` TEXT, IN `targetid` INT, IN `contents` TEXT)  NO SQL
BEGIN

INSERT INTO comments set  
	comments.uid=uid,
	comments.target=target,
    comments.targetid=targetid,
    comments.content=contents,
    comments.ctime=CURRENT_TIMESTAMP
; 
    
END$$

DROP PROCEDURE IF EXISTS `commentsquerybytarget`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `commentsquerybytarget` (IN `target` TEXT, IN `targetid` INT)  NO SQL
BEGIN

	SELECT * FROM comments WHERE comments.target=target and comments.targetid=targetid;
	
END$$

DROP PROCEDURE IF EXISTS `commentsquerybyuser`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `commentsquerybyuser` (IN `uid` INT)  NO SQL
BEGIN

	SELECT * FROM comments WHERE comments.uid=uid;
    
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `designercreatework` (IN `uid` INT, IN `contents` TEXT)  NO SQL
BEGIN

CALL productadd(CONCAT(contents,",brand='设计师'"),@pid);
	/*set @p_pid = @@IDENTITY;*/
INSERT INTO designer_info (
    designer_info.uid,
   designer_info.action,
    designer_info.pid,
    designer_info.ctime
) VALUES(
    uid,
    '作品',
    @pid,
    CURRENT_TIMESTAMP
);

END$$

DROP PROCEDURE IF EXISTS `designerdelwork`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `designerdelwork` (IN `uid` INT, IN `pid` INT)  NO SQL
BEGIN

/*检查该pid是否是该uid的作品*/
SELECT COUNT(*) INTO @q FROM designer_info
WHERE designer_info.uid=uid AND designer_info.pid=pid;

IF @q<1 THEN
	SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT='该设计师没有发布该作品！';
END IF;

DELETE FROM designer_info 
WHERE designer_info.uid=uid and designer_info.pid=pid;

CALL productdel(pid); 


END$$

DROP PROCEDURE IF EXISTS `designerquerywork`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `designerquerywork` (IN `uid` INT)  NO SQL
BEGIN

SELECT
    designer_info.uid,
    designer_info.action,
    goods.pid,
    goods.name,
    designer_info.ctime
FROM
	designer_info LEFT join goods on designer_info.pid=goods.pid
WHERE
	designer_info.uid=uid and designer_info.action='作品'
;

END$$

DROP PROCEDURE IF EXISTS `designerupdwork`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `designerupdwork` (IN `uid` INT, IN `pid` INT, IN `contents` TEXT)  NO SQL
BEGIN
/*检查该pid是否是该uid的作品*/
SELECT COUNT(*) INTO @q FROM designer_info
WHERE designer_info.uid=uid AND designer_info.pid=pid;

IF @q<1 THEN
	SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT='该设计师没有发布该作品！';
END IF;

CALL productupd(pid,contents);

END$$

DROP PROCEDURE IF EXISTS `dicdelitem`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `dicdelitem` (IN `pkey` TEXT)  NO SQL
BEGIN

DELETE FROM more.dictionary 
WHERE dictionary.key=pkey;


END$$

DROP PROCEDURE IF EXISTS `dicgetalias`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `dicgetalias` (IN `p_key` TEXT)  NO SQL
BEGIN

	SELECT cnnick,ennick  FROM dictionary where dictionary.key=p_key;
   

END$$

DROP PROCEDURE IF EXISTS `dicgetkey`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `dicgetkey` (IN `p_nick` TEXT)  NO SQL
BEGIN

SELECT dictionary.key FROM dictionary 
where cnnick=p_nick or ennick=p_nick;

END$$

DROP PROCEDURE IF EXISTS `dicquery`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `dicquery` (IN `pkey` TEXT)  NO SQL
BEGIN

	SELECT * from more.dictionary where dictionary.key=pkey;

END$$

DROP PROCEDURE IF EXISTS `dicupditem`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `dicupditem` (IN `pkey` TEXT, IN `cnnick` TEXT, IN `ennick` TEXT, IN `pvalue` TEXT)  NO SQL
BEGIN

SELECT COUNT(*) INTO @p FROM more.dictionary WHERE dictionary.key=pkey;
IF @p>0 THEN
	UPDATE more.dictionary SET
	    dictionary.cnnick=cnnick,
	    dictionary.ennick=ennick,
	    dictionary.pvalue=pvalue
	WHERE dictionary.key=pkey;
ELSE
	INSERT INTO more.dictionary SET
    	dictionary.key=pkey,
    	dictionary.cnnick=cnnick,
	    dictionary.ennick=ennick,
	    dictionary.pvalue=pvalue
   ;
END IF;





END$$

DROP PROCEDURE IF EXISTS `discountdel`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `discountdel` (IN `p_pid` INT)  NO SQL
BEGIN

	DELETE FROM discount WHERE pid=p_pid;

END$$

DROP PROCEDURE IF EXISTS `discountget`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `discountget` (IN `pid` INT, OUT `discount` INT)  NO SQL
BEGIN
SET discount=0;
SELECT SUM(discount.discount) INTO discount FROM more.discount
WHERE discount.pid=pid ;

IF isnull(discount) THEN
	SET discount=0;
END IF;
SELECT discount;
END$$

DROP PROCEDURE IF EXISTS `discountupd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `discountupd` (IN `pid` INT, IN `value` DOUBLE)  NO SQL
BEGIN

DELETE FROM discount WHERE discount.pid=pid;
INSERT INTO discount SET discount.pid=pid,discount.discount=value;

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
CREATE DEFINER=`root`@`localhost` PROCEDURE `membercreate` (IN `uid` INT, IN `membertype` INT, IN `validuntil` DATETIME, IN `quota` INT)  NO SQL
BEGIN

UPDATE more.member_info SET
	member_info.membertype=membertype,
    member_info.memberruntil=validuntil,
    member_info.quota=quota
WHERE
	member_info.uid=uid
;
SELECT * FROM member_info where member_info.uid=uid;

END$$

DROP PROCEDURE IF EXISTS `memberdeposit`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `memberdeposit` (IN `p_uid` INT, IN `p_value` INT)  NO SQL
BEGIN

UPDATE more.member_info SET
	member_info.deposit=member_info.deposit+p_value
WHERE
	member_info.uid=p_uid
;
    
END$$

DROP PROCEDURE IF EXISTS `memberquery`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `memberquery` (IN `uid` INT)  NO SQL
BEGIN

DECLARE matchnum INT default 0;
SELECT COUNT(*) INTO matchnum FROM member_info WHERE member_info.uid=uid;

if matchnum <1 then
   	INSERT INTO member_info set 
      member_info.uid=uid,
      member_info.membertype=0,
      member_info.ctime=CURRENT_TIMESTAMP,
      member_info.deposit=0,
      member_info.balance=0,
      member_info.quota=0,
      member_info.memberruntil=CURRENT_DATE,
      member_info.invoice=0
    ;
end if;  
   SELECT * FROM more.member_info WHERE member_info.uid=uid;
END$$

DROP PROCEDURE IF EXISTS `memberquota`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `memberquota` (IN `uid` INT, OUT `quota` INT)  NO SQL
BEGIN

SELECT member_info.quota into quota FROM more.member_info 
WHERE member_info.uid=uid;


IF quota>0 THEN
    /*检查会员是否过期*/
    SELECT member_info.memberruntil INTO @validuntil 
    FROM more.member_info
    WHERE member_info.uid=uid;

    IF @validuntil<CURRENT_DATE THEN
        SET quota=0;
        UPDATE member_info SET member_info.quota=0 
        WHERE member_info.uid=uid;
    END IF;

END IF;





END$$

DROP PROCEDURE IF EXISTS `memberreload`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `memberreload` (IN `p_uid` INT, IN `p_value` INT)  NO SQL
BEGIN

UPDATE more.member_info SET
	member_info.balance=member_info.balance+p_value
WHERE
	member_info.uid=p_uid
;
    
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

DROP PROCEDURE IF EXISTS `pocketadd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pocketadd` (IN `uid` INT, IN `pid` INT, IN `qty` INT)  NO SQL
BEGIN

/*先检测是否符合添加的条件*/
SELECT goods.quota*qty into @new FROM more.goods WHERE goods.pid=pid;
SELECT SUM(pocket.quota*pocket.qty) INTO @old FROM more.pocket WHERE pocket.uid=uid AND pocket.type="预约" GROUP BY pocket.uid;
SELECT member_info.quota INTO @edu FROM more.member_info WHERE member_info.uid=uid;

IF (@new+@old)>@edu THEN
   SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'Quota Not Enough!';
END IF;

/*执行添加*/
INSERT INTO more.pocket (
	pocket.uid,
    pocket.type,
    pocket.pid,
    pocket.qty,
    pocket.quota,
    pocket.ctime,
    pocket.otime,
    pocket.status
) SELECT 
	uid,
    "预约",
    pid,
    qty,
    goods.quota,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    "预约"
FROM more.goods WHERE goods.pid=pid;



END$$

DROP PROCEDURE IF EXISTS `pocketborrow`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pocketborrow` (IN `uid` INT, IN `receiver` TEXT, IN `contact` TEXT, IN `address` TEXT, IN `btime` TIMESTAMP, IN `rtime` TIMESTAMP)  NO SQL
BEGIN

/*先检测是否符合出借条件*/
SELECT SUM(pocket.quota*pocket.qty) INTO @old FROM more.pocket WHERE pocket.uid=uid AND pocket.type IN ("预约","待发货") GROUP BY pocket.uid;
SELECT member_info.quota INTO @edu FROM more.member_info WHERE member_info.uid=uid;

IF @old>@edu THEN
   SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'Quota Not Enough!You must first return the borrowed clothes first!';
END IF;

/*检查是否有足够的库存，这个不会编*/


/*更改衣物统计状态*/
INSERT INTO goods_static (
  	goods_static.pid,
    goods_static.status,
    goods_static.qty,
    goods_static.operationtime,
    goods_static.operator
) SELECT 
    pid,
    "上架",
    0-SUM(pocket.qty),
    CURRENT_TIMESTAMP,
    uid
FROM more.pocket WHERE 
	pocket.uid=uid AND pocket.type="预约" 
GROUP BY pocket.pid;

INSERT INTO goods_static (
  	goods_static.pid,
    goods_static.status,
    goods_static.qty,
    goods_static.operationtime,
    goods_static.operator
) SELECT 
    pid,
    "出借",
    SUM(pocket.qty),
    CURRENT_TIMESTAMP,
    uid
FROM more.pocket WHERE 
	pocket.uid=uid AND pocket.type="预约" 
GROUP BY pocket.pid;


/*更改衣袋中的预约状态*/
UPDATE more.pocket SET 
	pocket.type="出借",
    pocket.status="待发货",
    pocket.contact=contact,
    pocket.address=address,
    pocket.receiver=receiver,
    pocket.btime=btime,
    pocket.rtime=rtime
WHERE pocket.uid=uid AND pocket.type="预约";


END$$

DROP PROCEDURE IF EXISTS `pocketdel`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pocketdel` (IN `uid` INT, IN `rid` INT)  NO SQL
BEGIN
/*先看衣袋中是否有符合条件的衣服*/
SELECT COUNT(*) INTO @q FROM more.pocket WHERE pocket.rid=rid AND pocket.uid=uid AND pocket.type="预约";

IF @q<1 THEN
	SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = '只能删除衣袋中预约状态的衣服！';
END IF;

/*执行删除动作*/

DELETE FROM more.pocket WHERE pocket.rid=rid AND pocket.uid=uid AND pocket.type="预约";

END$$

DROP PROCEDURE IF EXISTS `pocketdelivered`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pocketdelivered` (IN `uid` INT, IN `rid` INT)  NO SQL
BEGIN

/*检查是否可交付*/

SELECT SUM(pocket.quota*pocket.qty) INTO @old FROM more.pocket WHERE pocket.uid=uid AND pocket.type IN ("待发货","待归还") GROUP BY pocket.uid;
SELECT member_info.quota INTO @edu FROM more.member_info WHERE member_info.uid=uid;

IF @old>@edu THEN
   SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'Quota Not Enough!You must first return the borrowed clothes first!';
END IF;

/*更改衣袋中的状态:类型，状态，实际出借时间*/
UPDATE more.pocket SET 
	pocket.type="出借",
    pocket.status="待归还",
	pocket.rbtime=CURRENT_TIMESTAMP
WHERE pocket.uid=uid AND pocket.status="待发货" AND pocket.rid=rid;


END$$

DROP PROCEDURE IF EXISTS `pocketlist`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pocketlist` (IN `uid` INT, IN `filterinfo` TEXT, IN `page` INT, IN `length` INT)  NO SQL
BEGIN
	set @sqlstr=CONCAT("SELECT * FROM more.pocket WHERE pocket.uid=",uid,filterinfo," limit ",(page-1)*length,",",length );

    PREPARE stmt_name FROM @sqlstr;
    EXECUTE stmt_name;
    DEALLOCATE PREPARE stmt_name;



END$$

DROP PROCEDURE IF EXISTS `pocketquery`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pocketquery` (IN `uid` INT, IN `rid` INT)  NO SQL
BEGIN

SELECT * FROM more.pocket WHERE pocket.uid=uid AND pocket.rid=rid;


END$$

DROP PROCEDURE IF EXISTS `pocketreturn`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pocketreturn` (IN `uid` INT, IN `rid` INT)  NO SQL
BEGIN

/*更改衣物统计状态：减少出借数量，增加清洗中数量*/
INSERT INTO goods_static (
  	goods_static.pid,
    goods_static.status,
    goods_static.qty,
    goods_static.operationtime,
    goods_static.operator
) SELECT 
    pocket.pid,
    "出借中",
    0-SUM(pocket.qty),
    CURRENT_TIMESTAMP,
    uid
FROM more.pocket WHERE 
	pocket.uid=uid AND pocket.rid=rid AND pocket.status="待归还"
GROUP BY pocket.pid;

INSERT INTO goods_static (
  	goods_static.pid,
    goods_static.status,
    goods_static.qty,
    goods_static.operationtime,
    goods_static.operator
) SELECT 
    pocket.pid,
    "清洗中",
    SUM(pocket.qty),
    CURRENT_TIMESTAMP,
    uid
FROM more.pocket WHERE 
	pocket.uid=uid AND pocket.status="待归还" AND pocket.rid=rid 
GROUP BY pocket.pid;



/*更改衣袋中的状态:类型，状态，实际出借时间*/
UPDATE more.pocket SET 
	pocket.type="归还",
    pocket.status="已完成",
	pocket.rrtime=CURRENT_TIMESTAMP
WHERE pocket.uid=uid AND pocket.status="待归还" AND pocket.rid=rid;


END$$

DROP PROCEDURE IF EXISTS `pocketstat`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pocketstat` (IN `uid` INT)  NO SQL
BEGIN

SELECT pocket.status,COUNT(*) FROM more.pocket WHERE pocket.uid=uid
GROUP BY pocket.status;




END$$

DROP PROCEDURE IF EXISTS `productadd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `productadd` (IN `contents` TEXT, OUT `pid` INT)  NO SQL
BEGIN

set @sqlstr=CONCAT("INSERT into more.goods SET ",contents);
PREPARE stmt_name FROM @sqlstr;
EXECUTE stmt_name;
DEALLOCATE PREPARE stmt_name;
SELECT LAST_INSERT_ID() INTO pid;
    
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `productupd` (IN `pid` INT, IN `contents` TEXT)  NO SQL
BEGIN

set @sqlstr=CONCAT("update goods SET ",contents," where pid=",pid );
PREPARE stmt_name FROM @sqlstr;
EXECUTE stmt_name;
DEALLOCATE PREPARE stmt_name;

END$$

DROP PROCEDURE IF EXISTS `sharepicadd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sharepicadd` (IN `p_uid` INT, IN `p_type` TEXT, IN `p_attach` TEXT, IN `contents` TEXT)  NO SQL
BEGIN

INSERT INTO sharepic (
    uid,
    type,
    attaches,
    content,
    ctime
) VALUES(
    p_uid,
    p_type,
    p_attach,
    contents,
    CURRENT_TIMESTAMP
);

END$$

DROP PROCEDURE IF EXISTS `sharepicdel`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sharepicdel` (IN `p_uid` INT, IN `p_sid` INT)  NO SQL
BEGIN

	DELETE FROM sharepic where uid=p_uid and sid=p_sid;

END$$

DROP PROCEDURE IF EXISTS `sharepiclist`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sharepiclist` (IN `p_uid` INT, IN `page` INT, IN `length` INT)  NO SQL
BEGIN

IF p_uid=0 THEN
	set @sqlstr=CONCAT("select * from sharepic "," order by ctime asc limit ",(page-1)*length,",",length);
ELSE
	set @sqlstr=CONCAT("select * from sharepic where sharepic.uid=",p_uid," order by ctime asc limit ",(page-1)*length,",",length);
END IF;



PREPARE stmt_name FROM @sqlstr;
EXECUTE stmt_name;
DEALLOCATE PREPARE stmt_name;   

END$$

DROP PROCEDURE IF EXISTS `sharepicquery`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sharepicquery` (IN `p_sid` INT)  NO SQL
BEGIN

	SELECT * FROM sharepic WHERE sid=p_sid;

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
CREATE DEFINER=`root`@`localhost` PROCEDURE `test` (IN `uid` INT, IN `pid` INT, IN `qty` INT)  NO SQL
BEGIN

/*先检测是否符合添加的条件*/
SELECT goods.quota*qty into @new FROM more.goods WHERE goods.pid=pid;
SELECT SUM(pocket.quota*pocket.qty) INTO @old FROM more.pocket WHERE pocket.uid=uid AND pocket.type="预约" GROUP BY pocket.uid;
SELECT member_info.quota INTO @edu FROM more.member_info WHERE member_info.uid=uid;

SELECT @old,@new,@edu;

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

DROP PROCEDURE IF EXISTS `useractionstat`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `useractionstat` (IN `uid` INT)  NO SQL
BEGIN

SELECT user_action.action,COUNT(*) FROM more.user_action where user_action.uid=uid GROUP BY user_action.action;
    
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
  `totalprice` int(11) DEFAULT NULL,
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COMMENT='购物车表';

--
-- 转存表中的数据 `chart`
--

INSERT INTO `chart` (`id`, `uid`, `type`, `pid`, `qty`, `ctime`, `otime`, `unitprice`, `saleprice`, `discount`, `totalprice`, `option`) VALUES
(22, 48, 'product', 1, 3, '2018-03-24 03:56:22', '2018-03-24 03:56:22', 10, 9, -3, 18, NULL),
(21, 48, 'product', 11, 6, '2018-03-24 03:55:54', '2018-03-24 03:55:54', 29, 3, 0, 18, NULL),
(20, 4, 'product', 1, 10, '2018-03-24 03:55:23', '2018-03-24 03:55:23', 10, 9, -3, 60, NULL);

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
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='评论表';

--
-- 转存表中的数据 `comments`
--

INSERT INTO `comments` (`cid`, `uid`, `target`, `targetid`, `content`, `ctime`, `option`) VALUES
(1, 42, '产品', 2, '1111', '2018-03-19 12:51:50', NULL),
(2, 42, '产品', 1, 'brand=\'马云飞\',name=\'大衣\'', '2018-03-19 13:07:06', NULL),
(3, 48, '产品', 1, '这个衣服不错', '2018-03-24 04:19:46', NULL),
(4, 48, '订单', 2, '这个订单不错', '2018-03-24 04:20:24', NULL),
(5, 48, '用户', 48, '这个用户不错', '2018-03-24 04:20:49', NULL),
(6, 49, '产品', 3, '这衣服不好', '2018-03-24 12:25:51', NULL);

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
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `designer_info`
--

INSERT INTO `designer_info` (`did`, `uid`, `ctime`, `action`, `pid`, `option`) VALUES
(4, 42, '2018-03-17 07:23:19', '作品', 2, NULL),
(3, 42, '2018-03-17 07:22:39', '作品', 1, NULL),
(7, 48, '2018-03-24 02:09:03', '作品', 14, NULL),
(8, 48, '2018-03-24 02:09:40', '作品', 15, NULL),
(11, 49, '2018-03-24 10:21:33', '作品', 18, NULL),
(10, 49, '2018-03-24 10:18:34', '作品', 17, NULL);

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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='数据定义表';

--
-- 转存表中的数据 `dictionary`
--

INSERT INTO `dictionary` (`id`, `key`, `cnnick`, `ennick`, `pvalue`, `option`) VALUES
(4, 'test', '测试', '33333', '[\"1\",\"2\"]', NULL);

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
  `discount` int(2) DEFAULT '0' COMMENT '折扣',
  `option` text COMMENT '选项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='折扣表';

--
-- 转存表中的数据 `discount`
--

INSERT INTO `discount` (`id`, `dtype`, `target`, `pid`, `discount`, `option`) VALUES
(3, '单价优惠-百分比', NULL, 2, -10, NULL),
(4, '单价优惠-百分比', NULL, 11, -100, NULL);

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
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `goods`
--

INSERT INTO `goods` (`pid`, `brand`, `name`, `businesstype`, `categry`, `size`, `onboard`, `material`, `uniprice`, `saleprice`, `tag`, `quota`, `occasion`, `color`, `additional`, `smallpic`, `midpic`, `largepic`, `option`) VALUES
(1, '马云飞', '大衣1', NULL, NULL, NULL, 0, NULL, 10, 9, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, '飞红', '长裙', NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, '马云飞', '大衣2', NULL, NULL, 'xl', 0, NULL, 29, 3, '热门', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, '设计师', '短裤', NULL, NULL, 'xl', 0, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, '设计师', '短裤', NULL, NULL, 'xxl', 0, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, '设计师', '韩式衣服', NULL, '上衣', 'xl', 0, '尼龙', 300, 240, '热门,韩流', 1, NULL, '红色', NULL, NULL, NULL, NULL, NULL),
(17, '设计师', '韩式衣服', NULL, '上衣', 'xl', 0, '塑料', 100, 240, '热门,韩流', 1, NULL, '红色', NULL, NULL, NULL, NULL, NULL),
(20, 'lv', '包包', NULL, NULL, 'XXXS', 0, NULL, 666, 444, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

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
(17, 5, NULL, '新状态', 888, '2018-03-22', 0, NULL),
(18, 11, NULL, '上架', -2, '2018-03-24', 11, NULL),
(19, 11, NULL, '出借', 2, '2018-03-24', 11, NULL),
(20, 11, NULL, '出借中', -1, '2018-03-24', 11, NULL),
(21, 11, NULL, '出借中', -1, '2018-03-24', 11, NULL),
(22, 11, NULL, '清洗中', 1, '2018-03-24', 11, NULL),
(23, 11, NULL, '出借中', -1, '2018-03-24', 11, NULL),
(24, 11, NULL, '清洗中', 1, '2018-03-24', 11, NULL),
(25, 44, NULL, '仓库', -3, '2018-03-24', 49, NULL),
(26, 44, NULL, '吃屎', 3, '2018-03-24', 49, NULL),
(27, 17, NULL, '上架', -7, '2018-03-24', 49, NULL),
(28, 18, NULL, '上架', -1, '2018-03-24', 49, NULL),
(29, 17, NULL, '出借', 7, '2018-03-24', 49, NULL),
(30, 18, NULL, '出借', 1, '2018-03-24', 49, NULL),
(31, 17, NULL, '出借中', -1, '2018-03-24', 49, NULL),
(32, 17, NULL, '清洗中', 1, '2018-03-24', 49, NULL);

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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `member_info`
--

INSERT INTO `member_info` (`id`, `uid`, `ctime`, `membertype`, `memberruntil`, `deposit`, `invoice`, `balance`, `quota`, `option`) VALUES
(1, 11, '2018-03-23 05:58:58', 1, '2018-12-30', NULL, NULL, NULL, 10, NULL),
(2, 12, '2018-03-23 05:59:02', 1, '2018-12-30', NULL, NULL, NULL, 10, NULL),
(4, 48, '2018-03-24 00:59:12', 2, '2017-12-31', 280, NULL, 400, 0, NULL),
(5, 49, '2018-03-24 08:26:51', 3, '2019-03-24', 888, 0, 600, 9, NULL);

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
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

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
(19, '0|1521761473', 'info', 0, '2018-03-22 23:31:13', NULL, NULL, '11', '2222', '333', NULL, NULL, NULL, NULL, '待支付', NULL, NULL),
(20, '49|1521897501', 'info', 49, '2018-03-24 13:18:21', NULL, NULL, '蔡艳坤', '123', '北京', NULL, NULL, NULL, NULL, '已撤销-未支付订单撤销', NULL, '不想要了'),
(21, '49|1521897501', 'product', 49, '2018-03-24 13:18:21', 17, 3, NULL, NULL, NULL, 100, 240, 0, 720, NULL, NULL, NULL),
(22, '49|1521897501', 'product', 49, '2018-03-24 13:18:21', 20, 1, NULL, NULL, NULL, 666, 444, 0, 444, NULL, NULL, NULL),
(23, '49|1521898316', 'info', 49, '2018-03-24 13:31:56', NULL, NULL, '1', '1', '1', NULL, NULL, NULL, NULL, '已完成', NULL, NULL),
(24, '49|1521898316', 'product', 49, '2018-03-24 13:31:56', 11, 2, NULL, NULL, NULL, 29, 3, -100, -194, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `pocket`
--

DROP TABLE IF EXISTS `pocket`;
CREATE TABLE IF NOT EXISTS `pocket` (
  `rid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
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
  PRIMARY KEY (`rid`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='租衣表';

--
-- 转存表中的数据 `pocket`
--

INSERT INTO `pocket` (`rid`, `uid`, `type`, `pid`, `qty`, `quota`, `ctime`, `otime`, `log`, `btime`, `rtime`, `rbtime`, `rrtime`, `receiver`, `contact`, `address`, `status`, `option`) VALUES
(6, 11, '出借', 11, 1, 2, '2018-03-23 15:49:51', '2018-03-23 15:49:51', NULL, NULL, NULL, NULL, NULL, '菜', '13602', '上海', '待发货', NULL),
(8, 11, '归还', 11, 1, 2, '2018-03-23 15:52:58', '2018-03-23 15:52:58', NULL, NULL, NULL, '2018-03-24', '2018-03-24', '菜', '13602', '上海', '待归还', NULL),
(7, 11, '出借', 11, 1, 2, '2018-03-23 15:50:50', '2018-03-23 15:50:50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '出借', NULL),
(10, 49, '出借', 17, 1, 1, '2018-03-24 13:53:56', '2018-03-24 13:53:56', NULL, '2018-04-16', '2019-01-01', NULL, NULL, '蔡艳坤', '136', '上海', '待发货', NULL),
(11, 49, '出借', 17, 1, 1, '2018-03-24 13:53:56', '2018-03-24 13:53:56', NULL, '2018-04-16', '2019-01-01', NULL, NULL, '蔡艳坤', '136', '上海', '待发货', NULL),
(12, 49, '出借', 17, 1, 1, '2018-03-24 13:53:56', '2018-03-24 13:53:56', NULL, '2018-04-16', '2019-01-01', NULL, NULL, '蔡艳坤', '136', '上海', '待发货', NULL),
(13, 49, '出借', 17, 1, 1, '2018-03-24 13:53:56', '2018-03-24 13:53:56', NULL, '2018-04-16', '2019-01-01', NULL, NULL, '蔡艳坤', '136', '上海', '待发货', NULL),
(14, 49, '出借', 17, 1, 1, '2018-03-24 13:53:56', '2018-03-24 13:53:56', NULL, '2018-04-16', '2019-01-01', NULL, NULL, '蔡艳坤', '136', '上海', '待发货', NULL),
(15, 49, '出借', 17, 1, 1, '2018-03-24 13:53:56', '2018-03-24 13:53:56', NULL, '2018-04-16', '2019-01-01', '2018-03-24', NULL, '蔡艳坤', '136', '上海', '待归还', NULL),
(16, 49, '归还', 17, 1, 1, '2018-03-24 13:53:56', '2018-03-24 13:53:56', NULL, '2018-04-16', '2019-01-01', '2018-03-24', '2018-03-24', '蔡艳坤', '136', '上海', '已完成', NULL),
(19, 49, '出借', 18, 1, 1, '2018-03-24 13:56:54', '2018-03-24 13:56:54', NULL, '2018-04-16', '2019-01-01', NULL, NULL, '蔡艳坤', '136', '上海', '待发货', NULL);

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
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='晒图表';

--
-- 转存表中的数据 `sharepic`
--

INSERT INTO `sharepic` (`sid`, `uid`, `type`, `attaches`, `content`, `ctime`, `option`) VALUES
(1, 48, '图片', '[\"statid/01.jpg\",\"static/02.jpg\"]', '这是我的第一次晒图', '2018-03-24 02:31:41', NULL),
(4, 49, '图片', '[\"图片1\",\"图片2\"]', '我的晒图1', '2018-03-24 11:34:48', NULL),
(5, 49, '图片', '[\"图片1\",\"图片2\"]', '我的晒图1', '2018-03-24 11:34:59', NULL),
(6, 49, '图片', '[\"图片1\",\"图片2\"]', '我的晒图1', '2018-03-24 11:35:00', NULL),
(7, 49, '图片', '[\"图片1\",\"图片2\"]', '我的晒图1', '2018-03-24 11:35:01', NULL);

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
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `shop_info`
--

INSERT INTO `shop_info` (`id`, `key`, `value`, `ctime`, `option`) VALUES
(2, 'index', '100', '2018-03-17 08:06:54', NULL),
(5, '轮播2', '234', '2018-03-24 02:23:15', NULL);

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
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user_action`
--

INSERT INTO `user_action` (`id`, `uid`, `action`, `target`, `content`, `ctime`, `option`) VALUES
(1, 48, '关注', '1', NULL, '2018-03-24 00:43:49', NULL),
(2, 48, '关注', '2', NULL, '2018-03-24 00:44:07', NULL),
(3, 48, '关注', '3', NULL, '2018-03-24 00:44:15', NULL),
(4, 48, '收藏', '4', NULL, '2018-03-24 00:44:25', NULL),
(5, 48, '收藏', '5', NULL, '2018-03-24 00:44:28', NULL),
(8, 49, '关注', '48', NULL, '2018-03-24 08:19:20', NULL),
(9, 49, '收藏', '11', NULL, '2018-03-24 08:19:25', NULL),
(10, 49, '签到', '', NULL, '2018-03-24 08:19:36', NULL),
(11, 49, '预约', '1', NULL, '2018-03-24 08:19:40', NULL),
(12, 49, '预约', '11', NULL, '2018-03-24 08:20:10', NULL);

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
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user_info`
--

INSERT INTO `user_info` (`id`, `uid`, `nick`, `realname`, `shenfenzheng`, `verified`, `invitationcode`, `sex`, `age`, `mobile`, `morecontact`, `address`, `moraddress`, `additional`) VALUES
(1, 42, NULL, NULL, NULL, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 45, NULL, NULL, NULL, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 49, '翱翔的鱼', '蔡艳坤', '130123198210074333', 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
