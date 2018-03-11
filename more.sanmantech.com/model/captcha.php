<?php

namespace model;

class captcha
{
    protected $config = [
        'seKey'    => 'quanwutong.com',
        // 验证码加密密钥
        'codeSet'  => '2345678abcdefhijkmnpqrstuvwxyzABCDEFGHJKLMNPQRTUVWXY',
        // 验证码字符集合
        'expire'   => 1800,
        // 验证码过期时间（s）
        'useZh'    => false,
        // 使用中文验证码
        'zhSet'    => '们以我到他会作休借',
        // 中文验证码字符串
        'useImgBg' => false,
        // 使用背景图片
        'fontSize' => 12,
        // 验证码字体大小(px)
        'useCurve' => false,
        // 是否画混淆曲线
        'useNoise' => false,
        // 是否添加杂点
        'imageH'   => 30,
        // 验证码图片高度
        'imageW'   => 90,
        // 验证码图片宽度
        'length'   => 4,
        // 验证码位数
        'fontttf'  => '',
        // 验证码字体，不设置随机获取
        'bg'       => [243, 251, 254],
        // 背景颜色
        'reset'    => true,
        // 验证成功后是否重置
    ];

    private $_image = null; // 验证码图片实例
    private $_color = null; // 验证码字体颜色

    /**
     * 架构方法 设置参数
     * @access public
     * @param  array $config 配置参数
     */
    public function __construct($config = [])
    {
        $this->config = array_merge($this->config, $config);
    }

    /**
     * 使用 $this->name 获取配置
     * @access public
     * @param  string $name 配置名称
     * @return mixed    配置值
     */
    public function __get($name)
    {
        return $this->config[$name];
    }

    /**
     * 设置验证码配置
     * @access public
     * @param  string $name  配置名称
     * @param  string $value 配置值
     * @return void
     */
    public function __set($name, $value)
    {
        if (isset($this->config[$name])) {
            $this->config[$name] = $value;
        }
    }

    /**
     * 检查配置
     * @access public
     * @param  string $name 配置名称
     * @return bool
     */
    public function __isset($name)
    {
        return isset($this->config[$name]);
    }
    public static function staticcheck($code, $id = ''){
    	$aa=new \model\captcha();
    	return $aa->check($code, $id);
    }
    /**
     * 验证验证码是否正确
     * @access public
     * @param string $code 用户验证码
     * @param string $id   验证码标识
     * @return bool 用户验证码是否正确
     */
    public function check($code, $id = '')
    {
    	
    	if(empty($id) || is_null($id)) {$id="code1";}
        $key = "_varicode_" . $id;
        // 验证码不能为空
        $secode = \Session::get($key, '');
        if (empty($code) || empty($secode)) {
            return false;
        }
              
        
        // session 过期
        if (time() - $secode['verify_time'] > $this->expire) {
            \Session::delete($key, '');
            return false;
        }

        if ($this->authcode(strtoupper($code)) == $secode['verify_code']) {
            $this->reset && \Session::delete($key, '');
            //echo "ok";
            return true;
        }

        return false;
    }



    public function entry($id = '')
    {
    	if($id=="" || is_null($id)) {$id="code1";}
        // 图片宽(px)
        $this->imageW || $this->imageW = $this->length * $this->fontSize * 1.5 + $this->length * $this->fontSize / 2;
        // 图片高(px)
        $this->imageH || $this->imageH = $this->fontSize * 2.5;
        // 建立一幅 $this->imageW x $this->imageH 的图像
        $this->_image = imagecreate($this->imageW, $this->imageH);
        // 设置背景
        imagecolorallocate($this->_image, $this->bg[0], $this->bg[1], $this->bg[2]);

        // 验证码字体随机颜色
        $this->_color = imagecolorallocate($this->_image, mt_rand(1, 150), mt_rand(1, 150), mt_rand(1, 150));
        // 验证码使用随机字体
        $ttfPath = __DIR__ . '/captcha/assets/' . ($this->useZh ? 'zhttfs' : 'ttfs') . '/';
	
	
        if (empty($this->fontttf)) {
            $dir  = dir($ttfPath);
            $ttfs = [];
            while (false !== ($file = $dir->read())) {
                if ('.' != $file[0] && substr($file, -4) == '.ttf') {
                    $ttfs[] = $file;
                }
            }
            $dir->close();
            $this->fontttf = $ttfs[array_rand($ttfs)];
        }
        $this->fontttf = $ttfPath . $this->fontttf;
        if ($this->useImgBg) {
            $this->_background();
        }

        if ($this->useNoise) {
            // 绘杂点
            $this->_writeNoise();
        }
        if ($this->useCurve) {
            // 绘干扰线
            $this->_writeCurve();
        }

        // 绘验证码
        $code   = []; // 验证码
        $codeNX = 0; // 验证码第N个字符的左边距
        if ($this->useZh) {
            // 中文验证码
            for ($i = 0; $i < $this->length; $i++) {
                $code[$i] = iconv_substr($this->zhSet, floor(mt_rand(0, mb_strlen($this->zhSet, 'utf-8') - 1)), 1, 'utf-8');
                imagettftext($this->_image, $this->fontSize, mt_rand(-40, 40), $this->fontSize * ($i + 1) * 1.5, $this->fontSize + mt_rand(10, 20), $this->_color, $this->fontttf, $code[$i]);
            }
        } else {
            for ($i = 0; $i < $this->length; $i++) {
                $code[$i] = $this->codeSet[mt_rand(0, strlen($this->codeSet) - 1)];
                $codeNX += mt_rand($this->fontSize * 1.2, $this->fontSize * 1.6);
                imagettftext($this->_image, $this->fontSize, mt_rand(-40, 40), $codeNX, $this->fontSize * 1.6, $this->_color, $this->fontttf, $code[$i]);
            }
        }
	$strcode=implode('', $code);
        // 保存验证码
        $key                   = "_varicode_" . $id;
        $code                  = $this->authcode(strtoupper(implode('', $code)));
        $secode                = [];
        $secode['verify_code'] = $code; // 把校验码保存到session
        $secode['verify_time'] = time(); // 验证码创建时间
        \Session::set($key, $secode, '');
        //echo json_encode($_SESSION);
        //ob_start();
        // 输出图像
        header("Content-type: image/png");
        imagepng($this->_image);
        //$content = ob_get_clean();
        imagedestroy($this->_image);
	//if ($this->check($strcode)) {echo "校验正确！";} else {echo "教研不正确！";};
        //return response($content, 200, ['Content-Length' => strlen($content)])->contentType('image/png');
    }

    /**
     * 画一条由两条连在一起构成的随机正弦函数曲线作干扰线(你可以改成更帅的曲线函数)
     *

     */
    private function _writeCurve()
    {
        $px = $py = 0;

        // 曲线前部分
        $A = mt_rand(1, $this->imageH / 2); // 振幅
        $b = mt_rand(-$this->imageH / 4, $this->imageH / 4); // Y轴方向偏移量
        $f = mt_rand(-$this->imageH / 4, $this->imageH / 4); // X轴方向偏移量
        $T = mt_rand($this->imageH, $this->imageW * 2); // 周期
        $w = (2 * M_PI) / $T;

        $px1 = 0; // 曲线横坐标起始位置
        $px2 = mt_rand($this->imageW / 2, $this->imageW * 0.8); // 曲线横坐标结束位置

        for ($px = $px1; $px <= $px2; $px = $px + 1) {
            if (0 != $w) {
                $py = $A * sin($w * $px + $f) + $b + $this->imageH / 2; // y = Asin(ωx+φ) + b
                $i  = (int)($this->fontSize / 5);
                while ($i > 0) {
                    imagesetpixel($this->_image, $px + $i, $py + $i, $this->_color); // 这里(while)循环画像素点比imagettftext和imagestring用字体大小一次画出（不用这while循环）性能要好很多
                    $i--;
                }
            }
        }

        // 曲线后部分
        $A   = mt_rand(1, $this->imageH / 2); // 振幅
        $f   = mt_rand(-$this->imageH / 4, $this->imageH / 4); // X轴方向偏移量
        $T   = mt_rand($this->imageH, $this->imageW * 2); // 周期
        $w   = (2 * M_PI) / $T;
        $b   = $py - $A * sin($w * $px + $f) - $this->imageH / 2;
        $px1 = $px2;
        $px2 = $this->imageW;

        for ($px = $px1; $px <= $px2; $px = $px + 1) {
            if (0 != $w) {
                $py = $A * sin($w * $px + $f) + $b + $this->imageH / 2; // y = Asin(ωx+φ) + b
                $i  = (int)($this->fontSize / 5);
                while ($i > 0) {
                    imagesetpixel($this->_image, $px + $i, $py + $i, $this->_color);
                    $i--;
                }
            }
        }
    }

    /**
     * 画杂点
     * 往图片上写不同颜色的字母或数字
     */
    private function _writeNoise()
    {
        $codeSet = '2345678abcdefhijkmnpqrstuvwxyz';
        for ($i = 0; $i < 10; $i++) {
            //杂点颜色
            $noiseColor = imagecolorallocate($this->_image, mt_rand(150, 225), mt_rand(150, 225), mt_rand(150, 225));
            for ($j = 0; $j < 5; $j++) {
                // 绘杂点
                imagestring($this->_image, 5, mt_rand(-10, $this->imageW), mt_rand(-10, $this->imageH), $codeSet[mt_rand(0, 29)], $noiseColor);
            }
        }
    }

    /**
     * 绘制背景图片
     * 注：如果验证码输出图片比较大，将占用比较多的系统资源
     */
    private function _background()
    {
        $path = dirname(__FILE__) . '/captcha/assets/bgs/';
        $dir  = dir($path);

        $bgs = [];
        while (false !== ($file = $dir->read())) {
            if ('.' != $file[0] && substr($file, -4) == '.jpg') {
                $bgs[] = $path . $file;
            }
        }
        $dir->close();

        $gb = $bgs[array_rand($bgs)];

        list($width, $height) = @getimagesize($gb);
        // Resample
        $bgImage = @imagecreatefromjpeg($gb);
        @imagecopyresampled($this->_image, $bgImage, 0, 0, 0, 0, $this->imageW, $this->imageH, $width, $height);
        @imagedestroy($bgImage);
    }

    /* 加密验证码 */
    private function authcode($str)
    {
        $key = substr(md5($this->seKey), 5, 8);
        $str = substr(md5($str), 8, 10);
        return md5($key . $str);
    }
}