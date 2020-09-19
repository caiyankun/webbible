/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : caiyankun

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-09-23 22:41:04
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
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `time` text,
  `place` text,
  `people` text,
  `domain` text,
  `keywords` text,
  `title` text NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=222 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ebox
-- ----------------------------
INSERT INTO `ebox` VALUES ('218', '2018-02-28 21:08:32', null, null, '通讯录', null, '【通讯录】网站开发', '毛铣峰，白芳：马来西亚世纪大学，就读林国荣大学管理学博士 领导 喜好：喝酒  <div>徐刚：中港交集团领导，负责ampang line地铁 喜好：拱猪，高尔夫，椰子冰激凌，吃辣</div><div>      生在齐齐哈尔？长在四川眉山人，大儿子在美国就业，二儿子 martin/多多 4岁</div><div>      硕士文凭，非洲常驻5年，衣服环境有洁癖</div><div>朱紫：传媒大学校花，央视农经频道主持人，就读林国荣大学 管理博士，目前有开办杂志，想做共享衣橱；</div><div>张玮：中国食品安全报副社长，老婆：清华同方？紫光？ 销售主管 销售安检设备</div><div><br></div>\n');
INSERT INTO `ebox` VALUES ('216', '2018-02-21 07:49:45', null, null, '记事本', null, '【总是忘】装机列表', '驱动精灵；<div>火绒；</div><div>QQ输入法，启动截屏；</div><div>打印机驱动；</div><div>chrome，qq浏览器；</div><div>everthing；</div><div>射手影音；</div><div>mindjet；</div><div>百度云+google同步</div><div>机械开发：</div><div>Solidworks</div><div>数字开发：</div><div>Keil uVision5 + 串口驱动 + Xcom</div><div>Web开发：</div><div>Netbeans</div><div>App开发：</div><div>API Studio+ 海马玩 + APP loader</div><div>办公：</div><div>WPS + Adobe Acrobat DC</div>');
INSERT INTO `ebox` VALUES ('217', '2018-02-25 22:27:08', null, null, '深圳市三满科技有限公司', null, '【重要信息】招聘', '<div>zhaopin.com</div><div>cai_yankun 长复杂</div>');
INSERT INTO `ebox` VALUES ('215', '2018-02-20 23:45:47', null, null, '通讯录', null, '【通讯录】网站开发', '<div>郑万盛：甘肃省天祝藏族，622326199210125855  电话18899739245 zws18353617330</div><div>孙正茂：湖南省祁阳县，  431121198806128738  电话</div><div><br></div>\n');
INSERT INTO `ebox` VALUES ('205', '2018-01-21 20:22:21', null, null, '记事本', null, '【生活】马来租车保险驾证', '<div><pre itemid=\"190\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\">马来西亚车辆马来驾证:G26134498CHN 车牌：WC7348B \n保险：2016-7-20 马来西亚车辆 Toyota Avanza 1.5G AT\n马来驾证:G26134498CHN 车牌：WC7348B 保险：2016-7-20  </pre><div>\n马来西亚租车，马来租车//Josephine Lim </div><div>| Head, Sales &amp; Marketing | Avis Malaysia DRB-HICOM EZ-Drive Sdn Bhd (12799-K )  \n(Formerly known as Sistem Sewa Kereta Malaysia Sdn Bhd) </div><div>EON Head Office Complex, No.2, Persiaran Kerjaya, </div><div>Taman Perindustrian Glenmarie, Seksyen U1, 40150 Shah Alam, Selangor Darul Ehsan.\n Tel: +603-7803 7555 (Ext: 2432) | Fax: +603-7880 0678 </div><div>| Mobile: +6017 338 2478 | Website: www.avis.com.my \n价格: Group Make &amp; Model Daily Rate Per day (RM) Weekly Rate Per day (RM) &gt;7days </div><div>1 Month (30 days) (RM) 1 Proton Saga 1.3 Auto RM150 RM130 RM1,600 \n\n澳大利亚地址 HUAWEI,level 5，tower B, 799 pacific hwy,chatswood,NSW 2067，chatswood</div></div><div><pre itemid=\"190\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\"><br></pre>发票报销抬头，马来西亚：</div><div>Huawei Technologies（Malaysia）Sdn Bhd</div><div>马来西亚华为技术有限公司</div><div>华为技术（马来西亚）有限公司</div>\n\n\n\n');
INSERT INTO `ebox` VALUES ('212', '2018-01-24 19:08:15', null, null, '记事本', null, '【重要信息】银行卡恢复版本', '<div><pre itemid=\"1\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\">电话号码：\n马来西亚：Maxis:0060126074183;（马来手机卡套餐办理：*100*1#）; maxis pay登陆：kevin.caiyankun.cn@gmail.com 常人；后付费账号：2070600669 信用卡自动扣款的。 \n					手机App； my maxis 官网登陆：cai_yankun@qq.com 往常，账单发往这个账号；Maxis:0060123401334（马来手机卡套餐办理：*100*1#）; \n中国移动手机号：008613602603604 手机密码SIM卡密码 太长吧 中国移动彩铃DIY，设置中心:http://gd.10086.cn/cl/rbt/ringdiy/index.screen\n\n马来西亚工商银行，存折号：01 29000100000566741卡号：6217 6420 0006 5289 @02/19 \n客服：1800185688;网站：www.icbcmy.com; Union Pay （跨行不要写01，行内要写01） \n马来西亚HSBC,Visa 卡号：4766 7100 0099 0564 @10/19 108 ;\n账号：305-022-022-108;网址:www.HSBC.com.my;电话：1300881388/060383215400;马来客户经 理：Oliva +60166848053电话常人，网：1长2长8；Security:常人 89-3770224-0；\nPosmalaysia: www.posonline.com.my  cai_yankun 往常\nunify 账号:kevincai 往常 occ.unifi.my 无线wifi密码0126074183cyk\n马来HSBC 信用卡:4386 7590 0501 4698 @04/23 238RHB 银行往常无暇密往常caonima(卡)4677 8535 0325 9752 (账号)2141 2900 2789 62\nRHB 住房贷款：RHB MY1 Full Flexi Home Loan 7-12116-0005708-3  \n深圳 招商银行 4682037557154852 金卡Visa 每月19日管理费10元(存款5万以上免)(关联证券，免) \n深圳 招商银行 5187180802935910 @06/19 630 Security常 \n招商银行信用卡金卡 Union Pay,Master刷卡6次以上免年费;客服:4008205555 50000 15 3 \n深圳 招商银行 5124256552151159 金卡Master(卡丢已换卡)6214 8575 5337 5876 金卡Union Pay Only 每月管理费10元（关联信用卡还款免?） \n深圳 中国工商银行深圳市分行 4270203000100540 工行信用卡号 无年费 26000 1 15 \n深圳 中国工商银行南山支行 6222004000112655956 我的工行卡 年费10元(5月27日) 常人\n深圳 中国银行南头支行 6013 8220 0065 7457 134 工资卡中行贷款还款帐号 -2元短信通知费 \n深圳 中国银行南头支行 6259 0648 5717 5146 阳光信用卡 无年费 \n深圳 中国银行南头支行 6259074889194957 @1017 228 白金信用卡 Union Pay无年费，取现手续费低，\n深圳中行无手续费，日万分之五 50000 6 26 \n深圳 光大银行深圳华侨城支行 6226620406543355 百合星城供楼帐号 每月20日 扣除5891.24 0.0365 U盾常人 失效\n光大银行龙华民塘支行 6226 6304 0104 1750 福田海滨广场供楼账号 U盾常人小米账号MIU 手长又长华为账号：kevin.caiyankun@huawei.com 长复杂 \n深圳 中信银行 6226890012253910 中信信用卡 未激活，激活后终身免年费 25000 5 24 \n深圳 广发银行 6225 5612 7087 9338 广发粤通信用卡 刷卡5次免年费,自然季消3x200非加油费，节假日免15%通行费 50000 7 27 \n深圳 宁波银行 622281 0700420491 宁波银行储蓄卡 无年费，无管理费，无短信费（300元以上提醒），取现不收手续费 收音长人 \n汇通尊尚卡：6227 7810 5171 4102 02/21 @077 40万额度，5年有效，单次贷款最长1年，单笔最多30万。常人常人。 \n深圳 建设银行 6227 0072 0007 1597 985 建设银行 无年费，无管理费，公积金卡 \n深圳 民生银行 6226 2206 1471 9275 民生银行储蓄卡 无年费，无管理费，深圳取现不收手续费，6月份之前，其他区域每个月前三次手取款无手续费 U网长 \n深圳 民生银行 6226 0204 5011 9030 民生银行白领通信用卡 只能用于贷款。年费600。首年免年费，贷款一次免次年年费。一次最低贷3000元（分三期，手续费180元） 250000。贷款的话，打电话给0086755 95568.常人。 \n江苏银行 6221731909000033995 U常人 邮政储蓄银行邮储银行：6221881210025434635 （网上银行常常）; \n中国人民银行征信查询系统网上查询系统密码长复杂无叹\n\n美亚保险（人身险）： 		\n用户名00107340密码长.网址：hw.ins24.com， 		\n索赔邮寄地址：中国广东省广州市 越秀区东风中路515号东照大厦18楼5-12单元 收件人：冯秋梦 Qiumeng Feng  		\n电话：（+86）020 2882 5331  		\n疾病险（商业旅行险）： （1）投保业务：美亚保险公司 王忠运 ，座机：0755-36856062，手机：13828847835 E-mail：Jacky-ZY.Wang@aig.com  			\n\n\n银联,Visa,Master，境外取款规定：银联:每天1万，每6个月5万，每年10万。<div>超过后要到下一年才能再取。刷卡无 限制；\nVisa Master：每天1000刀，每个月5000刀，6个月10000刀，1年20000刀。超出后要到下一年才可取。 </div><div><br></div></pre></div>\n\n');
INSERT INTO `ebox` VALUES ('193', '2017-08-07 07:34:42', null, null, '通讯录', null, '【通讯录】亲人', '冯中宇-护照:E38492646 08 FEB 1955,31 OCT 2014;31 OCT 2024;HENAN;  <div>       411328195502080411 广东省深圳市福田区福强路1014号恒福花园恒华阁10B房间\n曾宪莲-护照：E38491643 15 JUL 1953,31 OCT 2014,31 OCT 2024;HENAN; <div>       412929195307150023 广东省深圳市福田区福强路1014号恒福花园恒华阁10B房间\n李爱平 13052919790716462X 河北省形态市桥西区钢铁北路552号 桥西分局 2009.01.21-2029.01.21 \n冯佳佳 411325198305010048 深圳市罗湖区宝安北路人才大市场 桥西分局 2018.12.16 \n牛小鹏15003194276河北省邢台市桥西区钢铁北路邢台医专家属院38号高层西单元。邮编：054035 \n冯佳佳13828710680广东省深圳市福田区海滨广场恒福花园，恒华阁 10B邮编 518000 \n李爱平 13932931966河北省邢台市桥西区钢铁北路552号 邢台职业技术学院家属区 甲9号楼  邮编 054000<div>蔡小群 130123195209185715 河北省石家庄市正定县北早现乡上水屯村文明街36号</div><div>蔡艳辉 130123197904085715</div><div>戎瑞兰 130123195205175720 河北省石家庄市正定县北早现乡上水屯村文明街36号</div><div>蔡雨衡 13012320160315451x</div><div>父母打钱，爸爸卡号：河北省农村信用社 6210 2100 3080 1237 613 蔡小群<br></div>妈妈卡号（蔡艳坤卡号）：邮政储蓄银行邮储银行：6221881210025434635 （网上银行常常）;\n\n\n\n</div></div>');
INSERT INTO `ebox` VALUES ('199', '2017-08-11 09:51:08', null, null, '深圳市三满科技有限公司', null, '供应商收藏夹', '<div>太阳能相关:\n\n深圳晶昶能家用太阳能板并网，控制器，逆变器等：http://www.jcnsolar.com/?show-90-1.html\n佛山天风能能源有限公司，逆变器：https://detail.1688.com/offer/1230366789.html [工厂，定制贴牌]\n广州科士达太阳能并网逆变器3/4/5kw https://detail.1688.com/offer/524574013771.html\n深圳市晶硕电气科技，太阳能离网并网逆变器 ：https://jingshuosolar.1688.com/page/offerlist_82984062_67585899.htm?spm=a2615.7691456.0.0.1b0938d15Y0XUf[规模大，大功率]\n深圳市合和晋太阳能并网逆变器：https://detail.1688.com/offer/45661856669.html\n江苏弘德科技太阳能板，光伏组件：http://www.jshongde.com/[规模大]\n无锡尚德家用光伏并网2kw3kw5kw，高效太阳能板：http://cn.suntech-power.com/joinus.html\n\n\n广州映阳太阳能空调：https://detail.1688.com/offer/553617248036.html[规模大，种类全，太阳能控制器MPPT，逆控一体小控制器，小型蓄电池]\n广州森德太阳能：https://detail.1688.com/offer/555560774720.html[卖整套的方案，应该是集成的别人的]\n浙江金顺泰太阳能空调：https://detail.1688.com/offer/525452042311.html [20年，与名牌空调厂家合作，2年质保，太阳能空调大功率]\n浙江顶峰太阳能离网空调：https://detail.1688.com/offer/554582730172.html?spm=a2615.7691456.0.0.2e49d576RCKaDq[似乎有工厂，但产品杂，太阳能产品少，参数比较详细]\n浙江台州市meilile太阳能空调冰箱:http://www.meilile.com/ [太阳能冰箱，空调1P，2P，1.5P，风扇]F[14年阿里]\n浙江通博太阳能制冷有限公司：https://detail.1688.com/offer/548646263556.html[工厂，]\n浙江宁波Mr Cool太阳能空调：13816337660  \nhttps://www.alibaba.com/product-detail/100-Solar-Powered-Air-Conditioner-9000btu_60678083475.html?spm=a2700.7735675.30.1.64bf1d21h98b5m&amp;s=p\n\n\nFCS，热交换系列：\n华瑞：http://www.huaruicooling.com/yyal1.aspx?Guid=59768E4D-0131-410D-85A7-45DB6168156B&amp;type=yyal1\n\n太阳能控制器：\n广州的姆达MPPT控制器：https://detail.1688.com/offer/555273381656.html?tracelog=p4p[便宜，有工厂，功能实用，类型多，可OEM]\n深圳斯耐特：https://detail.1688.com/offer/546054413104.html [类型多，有工厂，可OEM]\n深圳市绿源兴：https://detail.1688.com/offer/538497787902.html[高端，贵，类型齐全]\n深圳市爱庞德有限公司：https://detail.1688.com/offer/541814343221.html\nhttps://detail.1688.com/offer/45556925480.html\n广州市天源太阳能：https://detail.1688.com/offer/541394095640.html[工厂]\n温州尚高：https://detail.1688.com/offer/544266457967.html\n\n深圳格尔法通讯电源：https://detail.1688.com/offer/1001915807.html?spm=a2615.7691456.0.0.6a2c73e4qwglXn [24-48,48-24,220-48,48-220 机架，塔式，壁挂]\n\n太阳能板：\nyangtze\nhttps://www.alibaba.com/product-detail/cheap-310w-solar-panel-for-air_60495399302.html?spm=a2700.7735675.30.268.2f898c122qyj3Q&amp;s=p\nBlue sun:https://www.alibaba.com/product-detail/Bluesun-high-efficent-345w-330w-320w_60586713452.html?spm=a2700.7724838.2017115.1.3c93b095OzB3tp [alibaba第一名，高效率]\n\n\n\n</div>\n');
INSERT INTO `ebox` VALUES ('192', '2017-08-07 07:34:15', null, null, '通讯录', null, '【重要信息】蔡丰收', '蔡丰收QQ:1409291155; \n蔡丰收邮 箱:cai_fengshou@qq.com;风常（生缩）。 \n蔡丰收—身份证：440304201409290010; \n蔡丰收-护照:E39293165; \n蔡丰收-港澳通行证：C10929994; \n蔡丰收-社保号:身份证号; \n蔡丰收-招商银行卡:6214 8375 5593 3955 Unionpay 常人； \n蔡丰收- 微信：cai_fengshou 未绑定QQ；绑定了QQ邮箱；绑定了银行卡，绑定了Facebook（蔡丰收）；\n蔡丰收 - 支付宝：不满16岁不让申请；\n蔡丰收-face book:蔡丰收 风常.');
INSERT INTO `ebox` VALUES ('200', '2017-08-11 21:08:28', null, null, '教程', null, '空调指标制冷量【教程】', 'COP=制冷量/压缩机电功率\n\nEER=制冷量/空调系统总电功率（EER值越高，表示空调中蒸发吸收较多的热量或压缩机所耗的电较少）\n\nCOP值在ARI标准中，关于冬夏季循环效率提出了以下定义：\n\n在冬季供热时，制热量（W）与输入功率（W）的比率定义为热泵的循环性能系数COP（coefficient of performance，W/W）；\n\n在夏季制冷时，制冷量（W或Btu/h）与输入功率（W）的比率定义为热泵的能效比EER（energy efficiency ratio，W/W 或Btu/W.h）\n\n为不引起歧义，我们将冬季热泵循环性能系数和夏季热泵的能效比表达形式均采用COP（能效比）表示。\n\nSEER\n\n季节能效比SEER\n\n定义：在正常的供冷期间，空调器在特定地区的总制冷量与总耗电量之比。考虑了稳态效率，也考虑了变化的环境和开关损失因素，是一个较为合理的评价指标。\n\n\n');
INSERT INTO `ebox` VALUES ('190', '2017-08-07 07:33:14', null, null, '记事本', null, '【重要信息】过敏药物', '过敏:磺胺类药物 sulfa drug胃复安 metoclopramide   \n');
INSERT INTO `ebox` VALUES ('191', '2017-08-07 07:33:44', null, null, '通讯录', null, '【重要信息】冯源', '冯源QQ:416235754 (二生) \n冯源邮箱：feng_yuan2012@qq.com;(二生) \n冯源—身份 证：410703198908124020; \n冯源-护照:E11494413; \n冯源-社保号:6034241432, 社保电脑号:624407860(社保局网站身份证feng_yuan菜常有大 最爱老公); \n公积金 20364783372 身后六; 冯源-微信（绑定手机绑定QQ号）(独立密码忘记)支付风常 \n冯源银行卡： 中国工商银行(U盾)621226 4000013561739:(每月扣社保卡密U密疯人常，u查手机太长，网别feng_yuan 总是不起作用);  \n中国工商银行（海滨月供还款卡）6212 26 40 0005 6569 136中国建设银行(U盾):6259653502375976(信用卡查询疯二常,网银feng_yuan2012太长不能关联跨行自动还款);  \n招商银行VISA(U盾) 银联储蓄:4682037803106789（密常人冯）; \n招商银行6226097558376977（已经销户）;  \n招商银行银联卡6226 0975 5505 4023 (公积金20364783372身后六)公积金卡（疯常）； \n招商银行信用卡 4392 2683 2555 4161 01/17 830(查询疯常，取款不同不知道); \n专业网织(三卡)菜长人；冯源招行一网通手缝常人 \n民生银行(U盾)：6226 2206 2734 7395 疯长，网别feng_yuan2012，网手机可登陆，网登太常人（支付？尝试去瞎话） \n光大银行(U盾)：6226 6304 0104 1743 风太长？ 网别feng_yuan2012，网灯太往常,（支付？尝试去瞎话） \n冯源—金融账号：支付宝feng_yuan2012@qq.com 登陆二年支付疯常(密保问题答案忘记显示状态异常)；淘宝feng_yuan2012二年\n');
INSERT INTO `ebox` VALUES ('211', '2018-01-24 15:42:52', null, null, '记事本', null, '【重要信息】投资理财', '<pre itemid=\"1\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\">1，星火理财服务 APP： P2P 年化 7%~10% 左右，时期较长；星火钱包转出单笔限额50万，日最高150万；不支持大额转入；</pre><pre itemid=\"1\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\">宜人贷：p2p一样的。</pre><pre itemid=\"1\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\">2，汇通易贷V3： P2P 年化11%左右，时期较短；</pre><pre itemid=\"1\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\">3，支付宝余额转账到银行卡，余额宝转账到银行卡:</pre><pre itemid=\"1\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\">      支付宝余额转入：转入支持大额转入；</pre><pre itemid=\"1\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\">      支付宝余额转出：快速5万每笔，单日15万；次日到账，无限额；有手续费，普通账户2万，钻石会员100万免费；</pre><pre itemid=\"1\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\">      超过收费0.1%</pre><pre itemid=\"1\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\">      余额宝转入：每天2万，总数不超过10万；不收费,限制大额购买是为了集中中小客户，防止资金的大额流动；</pre><pre itemid=\"1\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\">      余额宝转出：单笔5万，单日20万，单月20万；转出到余额和银行卡均不收费；转出的只能是银行卡转入的钱；</pre><pre itemid=\"1\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\">4，腾讯理财通：快速取出每天限6万，普通取出2工作日到账100万；<br></pre><pre itemid=\"1\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\"><br></pre><pre itemid=\"1\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\">【资产分布表格】</pre><pre itemid=\"1\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\">【支付宝-余额宝】 【10万】，用于消费和基金</pre><pre itemid=\"1\" style=\"line-height: 1.42857; border-width: initial; border-style: none; border-color: initial;\">【腾讯理财通】【】</pre> 【星火钱包】【5万】优质债权月盈宝12期，2018-1-24 ~ 2019-1-23 每个月返回回报300元，到期返回本金，约 7.5%<div> 【宜钱包】【10万】<br><div>\n\n\n</div></div>');
INSERT INTO `ebox` VALUES ('189', '2017-08-07 07:32:31', null, null, '深圳市三满科技有限公司', null, '【重要信息】三满科技', '<div>深圳市三满科技有限公司\n注册日期：\n    2014-7-31\n企业统一社会信用代码：\n    91440300311715572G\n注册资本：\n    50万  实缴x\n注册地址：\n    深圳市福田区福田街道彩田路彩天名苑金兰轩30L 518000\n    Futian District, Shenzhen, Futian Tin Choi Tin Road Caitian Mingyuan 30L 51800\n注册电话：\n    0755-33023366</div><div>企业网址：</div><div>    www.sanmantech.com\n前台地址（邮寄非发票物品用）：\n    深圳市福田区深南路与彩田路交汇处东方新天地广场C座2006  518000\n    C-2006,2007，Dongfang xintiandi Square(Great china IFC),Crossing of Shennan Rd. and Caitian Rd., Futian District,Shenzhen  518000\n    传真（前台电话）：83046668  前台QQ：1805131927\n发票地址（邮寄发票用）：\n    深圳市龙岗区布吉中心广场写字楼 B座 B16A  韩琴&lt;收&gt;  13662598390\n经营范围：\n    网络信息技术开发、技术咨询；计算机软硬件、手机软硬件、电子产品的技术开发、技术咨询、销售；经营电子商务；企业管理咨询；市场调研；文化活动策划；装修装饰设计；家居用品、日用品的销售；国内贸易；经营进出口业务；投资兴办实业。 \n企业帐号： \n    692186751 民生银行 深圳福华支行；\n【档案资料】\n    三合一执照正本\n    三合一执照副本\n    机构信用代码证（人行查询密码：098431；密码：096069）\n    进出口许可证？ \n 【关键资产】\n     主机+域名：</div><div>         www.net.cn  cai_yankun@qq.com 淘宝密码 手机绑</div><div>         sanmantech.com;quanwutong.com</div><div>     HOBO测试仪器：</div><div>         温度测试仪；\n \n \n ===============================================\n \n国税：http://www.szgs.gov.cn/col/col5/index.html；（三满生）\n地税：http: //dzswj.szds.gov.cn/dzswj/；（三满生）\n企业网银蔡艳坤(2200300285001 蔡艳坤)，ukey操密都是常人[ukey 插入后自动识别操作员 人名]; \n企业网银冯源(2200300285002 冯源)，ukey操密都是常人[ukey 插入后自动识别操作员 人名];\n \n支付宝 sanmantech@qqcom 三满长，三满长钱富 \n蔡艳坤个人数字证书太长人！去创业印章办理点办理的。\n \n企业年报公示：账号为营业执照号码，密码为身份证号码.\nhttp://app03.szaic.gov.cn/annual/nb/logsucess#panelnbgqbg\n \n企业社保：www.szsi.gov.cn 在线办事 企业网上申报 单位编号：1001878 密码太长大戏\n \n三满QQ:2602541166 \n绑定手机：\n邮箱：Sanmantech@qq.com\n密码：三满升;\n三满微信:sanmantech绑定了qq，不能绑定qq对应的邮箱,绑定了 facebook(三满科技qq邮箱)。\n三满长(满身) \n注册固定电话84572612。\nfacebook：sanmantech@qq.com;\n三满长（满身）; \n三满-3000mk-IT-PHP网站设计QQ群:201224692\n \n \n</div><div><br></div>\n网站备案：阿里云-&gt;个人中心-&gt;备案管理备案号:粤ICP备14074926号-1 服务器网站地址IP地址 115.28.244.241 2014-04-29 	\n3000mk.com .com 英文域名 2014-10-11 2017-10-11 正常 管理  	\nsanmantech.com .com 英文域名 2014-09-16 2017-09-16 正常 续费 管理  	\nanyoa.net .net 英文域名 2014-07-09 2017-07-09 正常 续费 管理  	\nanyoa.net 企业邮箱特别10G版 2014-07-09 -- 解析未生效 马上设置 管理  	\nvictorbusi.com .com 英文域名 2014-07-09 2017-07-09 正常 续费 管理  	\nvictorbusi.com 企业邮箱特别10G版 2014-07-09 -- 解析未生效 马上设置 管理  	\nkanglecai.com .com 英文域名 2013-12-19 2017-12-19 正常 续费 管理  	\nquanwutong.com 2015-5-3 2020-5-3  	\nhome2.club 2015-07-17 2016-07-17 企业邮箱 	\nit@sanmantech.com;hr@sanmantech.com; \nftp: sftp,端口22；数据库：复杂规则大喜！\n\n\n');
INSERT INTO `ebox` VALUES ('213', '2018-01-27 20:40:18', null, null, '教程', null, '海运物流的基本流程', '<dt style=\"margin: 0px; padding: 0px; border: 0px; font-size: 16px; color: rgb(35, 68, 139); height: 40px; line-height: 40px; font-family: &quot;Apple LiGothic Medium&quot;, Arial, 宋体, SimSun, SimHei; white-space: normal; background-color: rgb(255, 255, 255); text-size-adjust: auto !important;\">海运出口操作流程</dt><dd style=\"margin-top: 0px; margin-right: 0px; margin-bottom: 0px; padding: 0px 0px 0px 15px; border: 0px; font-size: 14px; color: rgb(62, 62, 62); font-family: &quot;Apple LiGothic Medium&quot;, Arial, 宋体, SimSun, SimHei; white-space: normal; background-color: rgb(255, 255, 255); text-size-adjust: auto !important;\"><p style=\"margin-bottom: 0px; padding: 0px; border: 0px; text-size-adjust: auto !important;\">&nbsp;1、接单</p><p style=\"margin-bottom: 0px; padding: 0px; border: 0px; text-size-adjust: auto !important;\">&nbsp; &nbsp; &nbsp; &nbsp;接受客户委托书后审核委托书内容并确认委托事项。 &nbsp; &nbsp; &nbsp; &nbsp;</p><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">2、订舱</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">&nbsp; &nbsp; &nbsp; &nbsp;缮制委托书向船公司订舱，取得船公司配舱回单。</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">3、 做箱</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">&nbsp; &nbsp; &nbsp; &nbsp; 车队取得设备交接单，并到堆场提取集装箱到客户工厂装货。或客户直接将货物送至指定堆场或仓库。</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">4、 报关</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">&nbsp; &nbsp; &nbsp; &nbsp;备齐完整的报关单据后开始出口海关申报，海关审查合格后放行。</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">5、提单确认</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">&nbsp; &nbsp; &nbsp; &nbsp;根据委托书缮制提单并与客户确认提单，保证提单内容的真实性和准确性。</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">6、付费</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">&nbsp; &nbsp; &nbsp; 与客户确认费用单，并收取相关费用。</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">7、签单</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">&nbsp; &nbsp; &nbsp; 根据客户要求，签发提单并邮寄客户。</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">8、返报关单</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">&nbsp; &nbsp; &nbsp; 出口报关一个月后将报关单返还客户退税核销。</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">9、目的港换提货单</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">&nbsp; &nbsp; &nbsp; 货物到达目的港后，船公司通知收货人换取提货单。</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">10、报关提货</div><div style=\"text-size-adjust: auto !important; margin: 0px; padding: 0px; border: 0px;\">&nbsp; &nbsp; &nbsp; 备齐完整的报关单据后开始进口申报，海关审查放行后提货。</div></dd>\n<div><br></div><div><span style=\"color: rgb(35, 68, 139); font-family: &quot;Apple LiGothic Medium&quot;, Arial, 宋体, SimSun, SimHei; font-size: 16px; font-weight: 700; white-space: normal; background-color: rgb(255, 255, 255);\">海运货代排名</span></div><div><br></div><div><span style=\"color: rgb(62, 62, 62); font-family: &quot;Apple LiGothic Medium&quot;, Arial, 宋体, SimSun, SimHei; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);\">&nbsp;1、锦程物流</span></div><div><font color=\"#3e3e3e\" face=\"Apple LiGothic Medium, Arial, 宋体, SimSun, SimHei\"><span style=\"font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);\">&nbsp;2、深圳市华运国际物流</span></font></div>');
INSERT INTO `ebox` VALUES ('214', '2018-02-04 20:49:09', null, null, '深圳市三满科技有限公司', null, '【重要信息】企业通讯录', '货代公司：深圳市飞通国际物流有限公司 微信：方欢 Alisa（fanghuan987654321）<div>         中远物流有限公司（锦程物流有限公司）李海峰 （wxid_aru566nag4g322）<br><div>钣金加工厂：上海睿天金属制品有限公司</div><div><br></div></div>');
INSERT INTO `ebox` VALUES ('206', '2018-01-21 20:46:35', null, null, '记事本', null, '【重要信息】网络帐号', 'Agoda,雅高达：常常   \nBooking，缤客：常常  \nSkype:kevin.caiyankun长\n火车票12306：常常  \n搜房soufun：常常 \n去哪：长又长   \n赶集网：常常 \n58同城 :常常\n淘宝：DL常常;ZF常负常CNM  \n阿里云：长又长；\n支付宝：常常CNM；\n财付通：独立长，支付二长；\nJD京东：常常复杂\nGoogle：长又常曹操 （CNNN）\nGmail:kevin.caiyankun.cn@gmail.com; 长复杂\nhotmail/outlook:kevin.caiyankun@hotmail.com /@outlook.com 常常\nQQ：48661325长啊\nQQ邮箱:cai_yankun@qq.com;\n网易邮箱cai_yankun@163.com 常 ；\n苹果商场apple id 长复杂 帐号sanmantech@qq.com绑定微信支付,救急邮箱是cai_yankun@qq.com\nFacebook：Kevin.caiyankun.cn@gmail.com,中国号码；中国手机+国家码，48661325@qq.com已绑定;\n微信:cai_yankun 同qq,微信钱包:二长遛；绑定qq，绑定手机，绑定邮箱，绑定facebook。\n微博:cai_yankun@qq.com 唱大戏；\nPaypal：长又长！ \nsougou：长又长\n深圳社保网址：http://www.szsi.gov.cn/； \n蔡艳坤社保号电脑号： 612080240；登录：身份证,cai_yankun，唱大戏；\n社保网站改版网址:http://e.szsi.gov.cn/siservice /login.jsp \n社保用户名注册网址：http://suum.szsi.gov.cn/suum/goLogin.do\n个人征信查询系统//https://ipcrs.pbccrc.org.cn/ cai_yankun 往常，feng_yuan2012 太长\n蔡艳坤公积金号： 20006342502\n华为Vmall 华为商城：复杂规则大喜！\nCebupacific air Getgo Card Number宿务航空 Getgo 卡号：1001451382 常常\n法航 1792017650  \n南航 CZ430003345743/新：680009952224  \n国航 CA725212924  \n尊鹏，携程，深圳航空 098524646 CA001324119202  \n亚洲航空亚航（7310061121） cai_yankun@qq.com 唱大戏 可订儿童票  680009952224 \n南航明珠 手机 常数；\n春秋航空 手往常\n\n\n');
INSERT INTO `ebox` VALUES ('221', null, null, null, '测试一下吧', null, '是不是', 'afasdfasdfasdf');

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

-- ----------------------------
-- Procedure structure for ebox_delete
-- ----------------------------
DROP PROCEDURE IF EXISTS `ebox_delete`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ebox_delete`(IN `id` INT, IN `puid` TEXT, IN `poption` TEXT)
BEGIN
	#Routine body goes here...
DELETE FROM caiyankun.ebox WHERE ebox.id=id;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for ebox_detail
-- ----------------------------
DROP PROCEDURE IF EXISTS `ebox_detail`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ebox_detail`(IN `id` INT,IN `witch` TEXT, IN `puid` TEXT, IN `poption` TEXT)
BEGIN
	#Routine body goes here...
SELECT * FROM ebox WHERE ebox.id=id;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for ebox_list
-- ----------------------------
DROP PROCEDURE IF EXISTS `ebox_list`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ebox_list`(IN `filterinfo` TEXT, IN `orderinfo` TEXT, IN `page` INT, IN `length` INT, IN `puid` TEXT, IN `poption` TEXT)
BEGIN
	#Routine body goes here...


set @sqlstr=CONCAT("
		SELECT 
				ebox.id,ebox.domain,ebox.title
		FROM 
				caiyankun.ebox
		WHERE
				ebox.domain like '%",filterinfo,"%' or
				ebox.keywords like '%",filterinfo,"%' or
				ebox.title like '%",filterinfo,"%' or 
				ebox.content like '%",filterinfo,"%' 
		ORDER BY 
				ebox.domain;"
);

#SELECT @sqlqty,@sqlstr;

PREPARE stmt_name FROM @sqlstr;
EXECUTE stmt_name;
DEALLOCATE PREPARE stmt_name;



END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for ebox_update
-- ----------------------------
DROP PROCEDURE IF EXISTS `ebox_update`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ebox_update`(IN `id` INT, IN `contents` TEXT,IN `witch` TEXT, IN `puid` TEXT, IN `poption` TEXT)
BEGIN
	#Routine body goes here...

SELECT COUNT(*) into @cnt FROM caiyankun.ebox WHERE ebox.id=id;

IF @cnt=1 THEN

	set @sqlstr=CONCAT(
		"UPDATE caiyankun.ebox SET 
				",contents,
		" WHERE
				ebox.id=",id
	);

ELSE
	set @sqlstr=CONCAT(
		"INSERT INTO caiyankun.ebox SET 
				",contents
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
