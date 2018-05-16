<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace model;

/**
 * Description of img
 *
 * @author Kevin
 */
class img {
    public $logfile=ENTRY_PATH."img.log";
    public function uploadimg($cat,$folder,$name=""){
        $log="enter uploading";
        $base=ENTRY_PATH."res/imgs/";
        $targetpath=$base.$cat."/";
        if($folder!==""){$targetpath=$targetpath.$folder."/";}
        \File::mkdir($targetpath);
        
        $this->saveuploadfilesas($targetpath,$name);
        
    }
    public function testupload($name,$folder,$cat="product"){
        $base=ENTRY_PATH."res/imgs/";
        $targetpath=$base.$cat."/";
        if($folder!==""){$targetpath=$targetpath.$folder."/";}
        \File::mkdir($targetpath);
        echo $targetpath;
    }
    public function test(){
        //var_dump($_FILES);
        echo json_encode($_FILES);
    }
    public function saveuploadfilesas($targetpath,$namesuffix="") {
        
        foreach ($_FILES as $file => $fileinfo) {
            $time=time();
            $i= rand(1, 10000);
            $targetname=$namesuffix.date("y-m-d", $time)."_".$time."_".$i;
            //ob_start();
            //echo $targetname;
            //echo $name;
            //var_dump($_FILES);
            $originfile=$this->saveuploadfileas($file,$targetpath,$targetname);
            if(!empty($originfile)){
                $this->resize($originfile, 450,750,true);
            }
            //\Response::returntaskok([$file,$targetpath,$targetname]);
            //$log=$log.ob_get_clean();    
            //file_put_contents($this->logfile,$log );
        }   
    }
    public function saveuploadfileas($file,$newloc,$newname=""){
        echo "enter saveas";
        // 允许上传的图片后缀
        
        $allowedExts = array("gif", "jpeg", "jpg", "png");
        $temp = explode(".", $_FILES[$file]["name"]);
        $extension = end($temp);     // 获取文件后缀名
        if ((($_FILES[$file]["type"] == "image/gif")
        || ($_FILES[$file]["type"] == "image/jpeg")
        || ($_FILES[$file]["type"] == "image/jpg")
        || ($_FILES[$file]["type"] == "image/pjpeg")
        || ($_FILES[$file]["type"] == "image/x-png")
        || ($_FILES[$file]["type"] == "image/png"))
        && ($_FILES[$file]["size"] < 204800)   // 小于 200 kb
        && in_array($extension, $allowedExts))
        {
            if ($_FILES[$file]["error"] <1)
            {
                if(empty($newname)){
                    $newname=$_FILES[$file]["name"];
                } else {
                    $type=$_FILES[$file]["type"];
                    $type= array_pop(explode("/", $type)) ;
                    ($type=="pjpeg")&&($type="jpg");
                    ($type=="x-png")&&($type="png");
                    $newname=$newname.".".$type;
                }
                    if(move_uploaded_file($_FILES[$file]["tmp_name"], $newloc .$newname)){
                        echo "文件存储在: " . $newloc .$newname;
                        return $newloc.$newname;
                    } else {
                        echo "移动文件失败: ". $newloc .$newname;
                        return "";
                    }
            }
        }

    }
    /**
     * 等比例生成缩略图
     * @param $imgSrc
     * @param $resize_width
     * @param $resize_height
     * @param $isCut
     * @author james.ou 2011-11-1
     */
    public function resize($imgSrc, $resize_width, $resize_height, $isCut = false) {
        echo "entered resize------------------".$imgSrc;
        //图片的类型
        $type = substr(strrchr($imgSrc, "."), 1);
        //初始化图象
        if ($type == "jpg"||$type == "jpeg") {
            $im = imagecreatefromjpeg($imgSrc);
        }
        if ($type == "gif") {
            $im = imagecreatefromgif($imgSrc);
        }
        if ($type == "png") {
            $im = imagecreatefrompng($imgSrc);
        }
        //目标图象地址
        $full_length = strlen($imgSrc);
        $type_length = strlen($type);
        $name_length = $full_length - $type_length;
        $name = substr($imgSrc, 0, $name_length - 1);
        $dstimg = $name . "_s." . $type;
 
        $width = imagesx($im);
        $height = imagesy($im);
 
        //生成图象
        //改变后的图象的比例
        $resize_ratio = ($resize_width) / ($resize_height);
        //实际图象的比例
        $ratio = ($width) / ($height);
        if (($isCut) == 1) { //裁图
            if ($ratio >= $resize_ratio) { //高度优先
                $newimg = imagecreatetruecolor($resize_width, $resize_height);
                imagecopyresampled($newimg, $im, 0, 0, 0, 0, $resize_width, $resize_height, (($height) * $resize_ratio), $height);
                ImageJpeg($newimg, $dstimg);
            }
            if ($ratio < $resize_ratio) { //宽度优先
                $newimg = imagecreatetruecolor($resize_width, $resize_height);
                imagecopyresampled($newimg, $im, 0, 0, 0, 0, $resize_width, $resize_height, $width, (($width) / $resize_ratio));
                ImageJpeg($newimg, $dstimg);
            }
        } else { //不裁图
            if ($ratio >= $resize_ratio) {
                $newimg = imagecreatetruecolor($resize_width, ($resize_width) / $ratio);
                imagecopyresampled($newimg, $im, 0, 0, 0, 0, $resize_width, ($resize_width) / $ratio, $width, $height);
                ImageJpeg($newimg, $dstimg);
            }
            if ($ratio < $resize_ratio) {
                $newimg = imagecreatetruecolor(($resize_height) * $ratio, $resize_height);
                imagecopyresampled($newimg, $im, 0, 0, 0, 0, ($resize_height) * $ratio, $resize_height, $width, $height);
                ImageJpeg($newimg, $dstimg);
            }
        }
        ImageDestroy($im);
    }
}
