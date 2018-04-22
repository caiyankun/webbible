<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace model;

/**
 * Description of curl
 *
 * @author Kevin
 */
class curl {
    public function test(){
        echo 123;
    }
    public function request($url,$params=false,$ispost=0) {
        echo \Curl::request($url, $params, $ispost);
    }
}
