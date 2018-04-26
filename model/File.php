<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of File
 *
 * @author Administrator
 */
class File {
    //put your code here
    public static function isdir($path){
        if(file_exists($path)&& is_dir($path)){
            return true;
        } else {
            return false;
        }
    }
    public static function mkdir($path){
        /*
        echo "enter mkdir".$path;
        if(empty($path)) {return "";}
        if(!File::isdir($path)){
            $pa= explode("/", $path) ;
            $cp= array_pop($pa);
            $pp= implode("/", $pa);
            echo $cp;
            echo $pp;
            //File::mkdir(File::mkdir($pp).$cp);
        }
         */
        return mkdir($path,"0777",true);
    }
}
