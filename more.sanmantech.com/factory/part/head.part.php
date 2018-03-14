
			<nav class="navbar navbar-default " role="navigation" >
				<div class="navbar-header">
					 
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						 <span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
					</button> <a class="navbar-brand" href="#">全务通</a>
				</div>
				
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav" style="display:none">
						<li class="dropdown">
							 <a href="#" class="dropdown-toggle" data-toggle="dropdown">快捷键<strong class="caret"></strong></a>
							<ul class="dropdown-menu">
								<li>
									<a href="#">Action</a>
								</li>
								<li>
									<a href="#">Another action</a>
								</li>
								<li>
									<a href="#">Something else here</a>
								</li>
								<li class="divider">
								</li>
								<li>
									<a href="#">Separated link</a>
								</li>
								<li class="divider">
								</li>
								<li>
									<a href="#">One more separated link</a>
								</li>
							</ul>
						</li>
					</ul>
					
					<form class="navbar-form navbar-left" role="search" style="display:none">
						<div class="form-group">
							<input type="text" class="form-control" />
						</div> 
						<button type="submit" class="btn btn-default">
							搜索
						</button>
					</form>

					<ul class="nav navbar-nav navbar-right">
						
						<li class="dropdown">
							 <a href="#" class="dropdown-toggle" data-toggle="dropdown" varname="h_userlogin" varvalue="text">请登录<strong class="caret"></strong></a>
							<ul class="dropdown-menu" id="h_userdropdown">
								<li>
									<a href="#" varname="h_userinfo" varvalue="text">用户信息</a>
								</li>
								<li>
									<a href="#" varname="h_userreg" varvalue="text">新用户注册</a>
								</li>
								<li class="divider">
								</li>
								<li>
									<a href="#" varname="h_userlogout" varvalue="text">退出登录</a>
								</li>
							</ul>
						</li>
                                                <li>
							<a href="#" id="h_navbtn"><span class="glyphicon glyphicon-th" aria-hidden="true"></span></a>
						</li>
					</ul>
				</div>
				
			</nav>


<script language="javascript" type="text/javascript">
(typeof sm!=="undefined")&&sm.autoinit("headerinit",function(){


//alert(JSON.stringify(sm.datasource));
if(typeof sm.datasource.user!=="undefined"){
	$('#header [varname="h_userlogin"]').text(sm.datasource.user.uname);
}


sm.event.map("#header *","click.headerinit",{
	'text:退出登录':function(){
		sm.ajax.silence().url("/user/logout.func").post().taskok(function(d){
			sm.page.reload();
		}).taskfail(function(d){
			alert("退出登录失败:"+d);
		});
	},
	'text:用户信息':function(){
		sm.page.open("/user/info.php");
	},
	'text:新用户注册':function(){
		sm.page.open("/user/register.php");
	},
	'[varname="h_userlogin"]':function(){
		if(sm.datasource.role==0){
			//alert("你需要登录");
			sm.page.reload("/user/login.php");
			$('#h_userdropdown li').hide();
		} else {
			$('#h_userdropdown li').show();
		}
	},
	'#h_navbtn':function(){
		sm.page.open("/bible.php");
	},
});

});

</script>