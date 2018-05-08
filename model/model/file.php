<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace model;

/**
 * Description of file
 *
 * @author Kevin
 */
class file {
    public function glob($path="",$filefilter="*",$folderfilter="*") {
        $entrypath=ENTRY_PATH;
        $fpath=ENTRY_PATH;
        empty($path)||($fpath=$fpath.$path);
        //ob_start();
        //$cmdstr="cd ".$wp.";".$cmd.";";
        $rs=[];
        if($folderfilter){
            $all=glob($fpath.$folderfilter,GLOB_ONLYDIR);
            (!$all)&&($all=[]);
            foreach ($all as $item) {  
                array_push($rs, ["folder",str_replace($fpath,"",$item),str_replace($entrypath,"",$item)]);
            }
        }
        $all=glob($fpath.$filefilter,GLOB_NOESCAPE);
        (!$all)&&($all=[]);
        foreach ($all as $item) {  
            if(is_dir($item)){
                //array_push($rs, ["folder",str_replace($fpath,"",$item),str_replace($entrypath,"",$item)]);
            } else {
                array_push($rs, ["file",str_replace($fpath,"",$item),str_replace($entrypath,"",$item)]);
            }
        } 
        //system("dir");
        //$rs= ob_get_clean();
        //var_dump($rs);
        \Response::returntaskok($rs);
    }
    public function cmd($cmd,$path="") {
        $fpath=ENTRY_PATH;
        empty($path)||($fpath=$fpath.$path);
        //ob_start();
        //$cmdstr="cd ".$wp.";".$cmd.";";
        var_dump(glob($fpath."*"));
        //system("dir");
        //$rs= ob_get_clean();
       // \Response::returntaskok($rs);
    }
}
