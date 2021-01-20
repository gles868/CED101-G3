<?php
    session_start();
    try{
        require_once("connect_ced101g3.php");
        
        unset($_SESSION["memberNo"]); 
        unset($_SESSION["memId"]); 
        unset($_SESSION["memName"]);
        unset($_SESSION["memAvatar"]);

        echo '登出成功';

    }catch(PDOException $e){
        echo $e->getMessage();
        echo $e->getLine();
    }
?>