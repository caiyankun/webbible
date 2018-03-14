
<html>
<head>
<?php 
\View::dynamicjsref();
\View::dynamiccssref();

?>
</head>



<body>

<div data-role="page" id="pageone">
  <div data-role="header">
    <h1>欢迎来到我的主页</h1>
    <div data-role="navbar">
      <ul>
        <li><a href="#" data-icon="home">首页</a></li>
        <li><a href="#" data-icon="arrow-r">页面二</a></li>
        <li><a href="#" data-icon="search">搜索</a></li>
      </ul>
    </div>
  </div>

  <div data-role="content">
    <p>我的内容..</p>
  </div>

  <div data-role="footer">
    <h1>我的页脚</h1>
  </div>
</div> 
</body>
</html>

