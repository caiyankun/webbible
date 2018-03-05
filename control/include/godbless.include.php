<?php
echo '<script language="javascript" type="text/javascript">';
echo 'window.onerror=function(m,u,l){alert ("【JS加载出错】:\r\n【文件】:"+u+"\r\n【行】:"+l+"\r\n【信息】:"+m);};';
echo '</script>';
\View::jsref(["jquery/jquery-1.12.4.js","json/json2.js","sm.god.js"],2);
//\View::cssref(["sm.smtlayout.css"]);