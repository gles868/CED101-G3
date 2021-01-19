<?php
    session_start();
    if(isset($_SESSION['memberNo'])){
        $memData = array('memberNo'=>$_SESSION['memberNo'],  // 關聯陣列: 指定key=>value
                         'memId'=>$_SESSION['memId'],  
                         'memName'=>$_SESSION['memName'],
                         'memAvatar'=>$_SESSION['memAvatar']);
        echo json_encode($memData);
    }else{
        echo '{}';
    }
?>