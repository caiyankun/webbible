<?php
    //\View::rolecheck(101,">=","","/user/login.php");
    \View::maxim();
    \View::createview(["godbless","bootstrap3.3.5","jquery.fullpage"]);
?>

<script language="javascript" type="text/javascript">
    $(document).ready(function(){
        
        //sm.dialog.countshow(10,'这是测试标题！','这是测试内容！');
        //sm.dialog.countshow(6,'标题','内容');
        alert(0);
	$('#fullpage').fullpage();
        alert(1);
        
    });
</script>