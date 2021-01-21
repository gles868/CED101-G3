<?php
session_start();

if (!isset($_SESSION["memberNo"]) || ($_SESSION["memberNo"] == "")) {
    echo '{}';
} else {
    //判斷 登入時間 超過5分鐘  需要重登新入
    // if ((time() - $_SESSION["mar_login_time"]) > 300) {
    //     echo '{}';
    // } else {
    //     echo json_encode($_SESSION);
    // }
    // ;
    echo json_encode($_SESSION);

}