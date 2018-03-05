<?php
namespace model;

class file
{
	public function upload(){
		$uploads_dir = ENTRY_PATH.'/uploads/';
		
		if ($_FILES["file"]["error"] > 0)
		  {
		  echo "Error: " . $_FILES["file"]["error"] . "<br />";
		  }
		else
		  {
		  $name=basename($_FILES["file"]["name"]);
		  $tmp_name = $_FILES["file"]["tmp_name"];
		  echo "Upload: " . $_FILES["file"]["name"] . "<br />";
		  echo "Type: " . $_FILES["file"]["type"] . "<br />";
		  echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
		  echo "Stored in: " . $_FILES["file"]["tmp_name"];
		  move_uploaded_file($tmp_name, $uploads_dir.$name);
		  }
		
		
		
		

		echo '<form action="" method="post" enctype="multipart/form-data"><input type="file" name="file" id="file" /> <input type="submit" name="submit" value="Submit" /></form>';
	}
}