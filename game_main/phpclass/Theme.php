<?php
class Theme extends Base
{
    // JSONディレクトリ
    private $json_dir = "./json/theme/";
    // テーマ
    public $theme;
    // 答え
    public $answers;

    // コンストラクタ
    public function __construct()
    {
        $this->classname = get_class($this);
    }

    // JSONファイルからテーマ・答えを取得
    public function getThemeAnsers() 
    {
        $this->methodname = __FUNCTION__;
        // デバッグ情報
        $this->debug_log("session_id()", session_id());
        //JSONファイル一覧を取得
        $json_files = glob($this->json_dir . "*.json");
        // JSONファイル読込
        $json_file = $json_files[ array_rand($json_files) ] ;
        if (file_exists($json_file) && filesize($json_file) > 0) {
            $json_buf = json_decode(file_get_contents($json_file), true);
        }
        // デバッグ情報
        $this->debug_log("$json_file", $json_buf);
        $this->debug_log("basename", basename($json_file));
        // テーマを設定
        setlocale(LC_ALL, 'ja_JP.UTF-8');
        $this->theme = basename($json_file, ".json");
        // 答えを設定
        foreach ($json_buf as $value) {
            $this->answers[] = $value;
        }   
        // デバッグ情報
        $this->debug_log("this->theme", $this->theme);
        $this->debug_log("this->answers", $this->answers);
    }
}
?>