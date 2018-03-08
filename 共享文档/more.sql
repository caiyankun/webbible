-- phpMyAdmin SQL Dump
-- version 4.6.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 08, 2018 at 09:26 PM
-- Server version: 5.7.12
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `more`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `aid` int(10) UNSIGNED NOT NULL COMMENT '自增ID',
  `aname` text COMMENT '用户名',
  `email` text COMMENT '邮箱',
  `mobile` char(13) NOT NULL COMMENT '联系电话',
  `apassword` char(64) DEFAULT NULL COMMENT '密码',
  `createtime` date DEFAULT NULL COMMENT '创建时间',
  `updatetime` date DEFAULT NULL COMMENT '更新时间',
  `log` text COMMENT '日志',
  `lastlogin` date DEFAULT NULL COMMENT '最后登录时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='管理员表';

-- --------------------------------------------------------

--
-- Table structure for table `chart`
--

CREATE TABLE `chart` (
  `id` int(10) UNSIGNED NOT NULL COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `type` text COMMENT '类型',
  `pid` int(11) DEFAULT NULL COMMENT '商品ID',
  `qty` int(11) DEFAULT NULL,
  `ctime` date DEFAULT NULL COMMENT '创建时间',
  `otime` date DEFAULT NULL COMMENT '当前时间',
  `unitprice` int(11) DEFAULT NULL COMMENT '单价',
  `saleprice` int(11) DEFAULT NULL COMMENT '出售价',
  `discount` int(11) DEFAULT NULL COMMENT '折扣',
  `option` text COMMENT '选项'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='购物车表';

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `cid` int(10) UNSIGNED NOT NULL COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `target` text COMMENT '目标',
  `targeid` int(11) DEFAULT NULL COMMENT '目标ID',
  `content` text COMMENT '内容',
  `ctime` date DEFAULT NULL COMMENT '创建时间',
  `option` text COMMENT '选项'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='评论表';

-- --------------------------------------------------------

--
-- Table structure for table `designer_info`
--

CREATE TABLE `designer_info` (
  `did` int(10) UNSIGNED NOT NULL COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `ctime` int(11) DEFAULT NULL COMMENT '创建时间',
  `action` text COMMENT '行为',
  `pid` int(11) DEFAULT NULL COMMENT '商品ID',
  `option` text COMMENT '选项'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `dictionary`
--

CREATE TABLE `dictionary` (
  `id` int(10) UNSIGNED NOT NULL COMMENT '自增ID',
  `key` text COMMENT '变量名',
  `cnnick` text COMMENT '中文显示',
  `ennick` text COMMENT '英文显示',
  `pvalue` text COMMENT '值',
  `option` text COMMENT '选项'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='数据定义表';

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

CREATE TABLE `discount` (
  `id` int(10) UNSIGNED NOT NULL COMMENT '自增ID',
  `dtype` text COMMENT '折扣类型',
  `target` text COMMENT '目标',
  `pid` int(11) DEFAULT NULL COMMENT '商品ID',
  `discount` int(11) DEFAULT NULL COMMENT '折扣',
  `option` text COMMENT '选项'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='折扣表';

-- --------------------------------------------------------

--
-- Table structure for table `goods`
--

CREATE TABLE `goods` (
  `pid` int(10) UNSIGNED NOT NULL COMMENT '商品ID',
  `brand` text COMMENT '品牌',
  `name` text COMMENT '名称',
  `businesstype` text COMMENT '业务类型',
  `categry` text COMMENT '分类',
  `size` text COMMENT '尺寸',
  `onboard` tinyint(1) DEFAULT NULL COMMENT '板型',
  `material` text COMMENT '材质',
  `uniprice` int(11) DEFAULT NULL COMMENT '单价',
  `saleprice` int(11) DEFAULT NULL COMMENT '出售价',
  `tag` text COMMENT '标签',
  `quota` int(11) DEFAULT NULL COMMENT '定额',
  `occasion` text COMMENT '场合',
  `color` text COMMENT '颜色',
  `additional` text COMMENT '额外',
  `smallpic` text COMMENT '小图',
  `midpic` text COMMENT '中图',
  `largepic` text COMMENT '原图',
  `option` text COMMENT '选项'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `goods_static`
--

CREATE TABLE `goods_static` (
  `id` int(10) UNSIGNED NOT NULL COMMENT '自增ID',
  `pid` int(11) DEFAULT NULL COMMENT '商品ID',
  `dpid` char(32) DEFAULT NULL COMMENT '具体的某个衣服',
  `status` text COMMENT '状态',
  `qty` int(11) DEFAULT NULL,
  `operationtime` date DEFAULT NULL COMMENT '操作时间',
  `operator` int(11) DEFAULT NULL COMMENT '操作符',
  `option` text COMMENT '选项'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `member_info`
--

CREATE TABLE `member_info` (
  `id` int(10) UNSIGNED NOT NULL COMMENT '自增ID',
  `uid` int(10) UNSIGNED DEFAULT NULL COMMENT '用户ID',
  `ctime` date DEFAULT NULL COMMENT '创建时间',
  `membertype` int(11) DEFAULT NULL COMMENT '用户类型',
  `memberruntil` date DEFAULT NULL COMMENT '会员期',
  `deposit` int(11) DEFAULT NULL COMMENT '押金',
  `invoice` int(11) DEFAULT NULL COMMENT '发票',
  `balance` int(11) DEFAULT NULL COMMENT '充值余额',
  `quota` int(11) DEFAULT NULL COMMENT '会员额度',
  `option` text COMMENT '选项'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(10) UNSIGNED NOT NULL COMMENT '自增ID',
  `oid` int(11) DEFAULT NULL COMMENT '订单ID',
  `type` text COMMENT '分类',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `ctime` date DEFAULT NULL COMMENT '创建时间',
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
  `option` text COMMENT '选项'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pocket`
--

CREATE TABLE `pocket` (
  `id` int(10) UNSIGNED NOT NULL COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `type` text COMMENT '类型',
  `pid` int(11) DEFAULT NULL COMMENT '商品ID',
  `qty` int(11) DEFAULT NULL,
  `quota` int(11) DEFAULT NULL COMMENT '定额',
  `ctime` date DEFAULT NULL COMMENT '创建时间',
  `otime` date DEFAULT NULL COMMENT '上一次操作时间',
  `log` text COMMENT '日志',
  `btime` date DEFAULT NULL COMMENT '计划出借时间',
  `rtime` date DEFAULT NULL COMMENT '计划归还时间',
  `rbtime` date DEFAULT NULL COMMENT '实际出借时间',
  `rrtime` date DEFAULT NULL COMMENT ' 实际归还时间',
  `receiver` text COMMENT '接收机',
  `contact` text COMMENT '联系方式',
  `address` text COMMENT '详细地址',
  `status` text COMMENT '状态',
  `option` text COMMENT '选项'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='租衣表';

-- --------------------------------------------------------

--
-- Table structure for table `sharepic`
--

CREATE TABLE `sharepic` (
  `sid` int(10) UNSIGNED NOT NULL COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `type` text COMMENT '类型',
  `attaches` text COMMENT '附件',
  `content` text COMMENT '内容',
  `ctime` date DEFAULT NULL COMMENT '创建时间',
  `option` text COMMENT '选项'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='晒图表';

-- --------------------------------------------------------

--
-- Table structure for table `shop_info`
--

CREATE TABLE `shop_info` (
  `id` int(10) UNSIGNED NOT NULL COMMENT '自增ID',
  `key` text COMMENT '关键词',
  `value` text COMMENT '值',
  `ctime` date DEFAULT NULL COMMENT '创建时间',
  `option` text COMMENT '选项'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_action`
--

CREATE TABLE `user_action` (
  `id` int(10) UNSIGNED NOT NULL COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `action` text COMMENT '行为',
  `target` text COMMENT '标签',
  `content` text COMMENT '内容',
  `ctime` date DEFAULT NULL COMMENT '创建时间',
  `option` text COMMENT '选项'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `id` int(10) UNSIGNED NOT NULL COMMENT '自增id',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `nick` text COMMENT '昵称',
  `realname` text COMMENT '真名',
  `shenfenzheng` text COMMENT '身份证',
  `verified` tinyint(1) DEFAULT NULL COMMENT '验证码',
  `invitationcode` text COMMENT '邀请码',
  `sex` tinyint(1) DEFAULT NULL COMMENT '性别',
  `age` tinyint(3) DEFAULT NULL COMMENT '年龄',
  `mobile` text COMMENT '手机',
  `morecontact` text COMMENT '更多联系方式',
  `address` text COMMENT '地址',
  `moraddress` text COMMENT '详细地址',
  `additional` text COMMENT '额外'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `chart`
--
ALTER TABLE `chart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`uid`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`cid`);

--
-- Indexes for table `designer_info`
--
ALTER TABLE `designer_info`
  ADD PRIMARY KEY (`did`);

--
-- Indexes for table `dictionary`
--
ALTER TABLE `dictionary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `goods_static`
--
ALTER TABLE `goods_static`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member_info`
--
ALTER TABLE `member_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pocket`
--
ALTER TABLE `pocket`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sharepic`
--
ALTER TABLE `sharepic`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `shop_info`
--
ALTER TABLE `shop_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_action`
--
ALTER TABLE `user_action`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `aid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID';
--
-- AUTO_INCREMENT for table `chart`
--
ALTER TABLE `chart`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID';
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `cid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID';
--
-- AUTO_INCREMENT for table `designer_info`
--
ALTER TABLE `designer_info`
  MODIFY `did` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID';
--
-- AUTO_INCREMENT for table `dictionary`
--
ALTER TABLE `dictionary`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID';
--
-- AUTO_INCREMENT for table `discount`
--
ALTER TABLE `discount`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID';
--
-- AUTO_INCREMENT for table `goods`
--
ALTER TABLE `goods`
  MODIFY `pid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品ID';
--
-- AUTO_INCREMENT for table `goods_static`
--
ALTER TABLE `goods_static`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID';
--
-- AUTO_INCREMENT for table `member_info`
--
ALTER TABLE `member_info`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID';
--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID';
--
-- AUTO_INCREMENT for table `pocket`
--
ALTER TABLE `pocket`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID';
--
-- AUTO_INCREMENT for table `sharepic`
--
ALTER TABLE `sharepic`
  MODIFY `sid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID';
--
-- AUTO_INCREMENT for table `shop_info`
--
ALTER TABLE `shop_info`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID';
--
-- AUTO_INCREMENT for table `user_action`
--
ALTER TABLE `user_action`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID';
--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增id';
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
