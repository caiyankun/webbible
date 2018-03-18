<?php
    //\View::rolecheck(101,">=","","/user/login.php");
    \View::maxim();
    \View::createview(["empty.layout","godbless","bootstrap3.3.5","jquery.fullpage"]);
?>






<script language="javascript" type="text/javascript">
    $(document).ready(function(){
	alert("进入了controller");
        
        $("#testdiv").html(sm.ui.part("manage.test"));
        
        alert("离开了controller");
    });
</script>