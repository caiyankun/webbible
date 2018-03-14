<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Loading...</title>



  </head>
  	<?php 
		\View::dynamicjsref();
		\View::dynamiccssref();
	?>
  <body>
<?php \View::parts("head.part.php");?>
<!--内容加在这里-->
<?php \View::pages();?>
<!--内容加在这里-->
<?php \View::parts("foot.part.php");?>
  </body>

</html>

