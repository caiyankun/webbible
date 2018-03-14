<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Loading....</title>
</head>
<?php 
\View::dynamicjsref();
\View::dynamiccssref();

?>

<body>
	<div id="header">
		<?php \View::parts("head.part.php");?>
	</div>
	<div id="mainbody" >
                <table class="didatable">
		    <tr >
		        <td class="left didaleft">左</td>
		        <td class="didacenter">

		        <input class="didainput"></input>

		        </td>
		        <td class="right didaright">右</td>
		    </tr>
		</table>
	</div>
	<div id="footer">
		<?php \View::parts("foot.part.php");?>
	</div>
	<?php \View::warehouse();?>
        <?php \View::cacheidmark();?>
</body>
</html>

