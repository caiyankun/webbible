<?php
namespace model;

class config
{
	public function get($domain){
		\Config::dumpcfg($domain);
	}

}