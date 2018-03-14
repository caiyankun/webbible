<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Jquery UI Test!!!</title>
</head>
<?php 
\View::dynamicjsref();
\View::dynamiccssref();

?>

	<style>
	.ui-menu { position: absolute; width: 100px; z-index:100;}
	</style>

<body>

	<div id="header">
<div id="toolbar" class="ui-widget-header ui-corner-all">
	<div id="playgroup">
  <button id="beginning">开头开头</button>
  <button id="rewind">快退</button>
  <button id="play">播放</button>
  <button id="stop">停止</button>
  <button id="forward">快进</button>
  <button id="end">结尾</button>
  </div>
 <div id="combgroup">
  <button>会计师大哥</button>
  <button class="triangle">▽</button>
  </div>
<ul style="width:100px;" id="menu">
	<li><div>Item 1</div></li>
	<li><div>Item 2</div></li>
	<li><div>Item 3</div>
		<ul>
			<li><div>Item 3-1</div></li>
			<li><div>Item 3-2</div></li>
			<li><div>Item 3-3</div></li>
			<li><div>Item 3-4</div></li>
			<li><div>Item 3-5</div></li>
		</ul>
	</li>
	<li><div>Item 4</div></li>
	<li><div>Item 5</div></li>
</ul>
 
 
  <input type="checkbox" id="shuffle"><label for="shuffle">Shuffle</label>
 
  <span id="repeat">
    <input type="radio" id="repeat0" name="repeat" ><label for="repeat0">No Repeat</label>
    <input type="radio" id="repeat1" name="repeat"><label for="repeat1">Once</label>
    <input type="radio" id="repeatall" name="repeat"><label for="repeatall">All</label>
  </span>
</div>
	</div>
	<div id="mainbody">
	    <div id="page">
                <?php \View::dynamicparts("/\.page\.part$/");?>
                
                <div id="tabs">
		  <ul>
		    <li><a href="#tabs-1">Nunc tincidunt</a></li>
		    <li><a href="#tabs-2">Proin dolor</a></li>
		    <li><a href="#tabs-3">Aenean lacinia</a></li>
		  </ul>
		  <div id="tabs-1">
		    <p>Proin elit arcu, rutrum commodo, vehicula tempus, commodo a, risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris. Nam elementum quam ullamcorper ante. Etiam aliquet massa et lorem. Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique tempus lectus.</p>
		  </div>
		  <div id="tabs-2">
		    <p>Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor. Aenean aliquet fringilla sem. Suspendisse sed ligula in ligula suscipit aliquam. Praesent in eros vestibulum mi adipiscing adipiscing. Morbi facilisis. Curabitur ornare consequat nunc. Aenean vel metus. Ut posuere viverra nulla. Aliquam erat volutpat. Pellentesque convallis. Maecenas feugiat, tellus pellentesque pretium posuere, felis lorem euismod felis, eu ornare leo nisi vel felis. Mauris consectetur tortor et purus.</p>
		  </div>
		  <div id="tabs-3">
		    <p>Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem enim, pretium nec, feugiat nec, luctus a, lacus.</p>
		    <p>Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam ac lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing velit. Suspendisse potenti. Donec mattis, pede vel pharetra blandit, magna ligula faucibus eros, id euismod lacus dolor eget odio. Nam scelerisque. Donec non libero sed nulla mattis commodo. Ut sagittis. Donec nisi lectus, feugiat porttitor, tempor ac, tempor vitae, pede. Aenean vehicula velit eu tellus interdum rutrum. Maecenas commodo. Pellentesque nec elit. Fusce in lacus. Vivamus a libero vitae lectus hendrerit hendrerit.</p>
		  </div>
		</div>
                
                
	    </div>
	</div>
	<div id="footer">

	</div>
	<?php \View::warehouse();?>
        <?php \View::cacheidmark();?>
</body>
</html>

