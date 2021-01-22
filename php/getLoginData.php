<?php
    session_start();
    if(isset($_SESSION['memberNo'])){
        $memData = array('memberNo'=>$_SESSION['memberNo'],  // 關聯陣列: 指定key=>value
                         'gradeNo'=>$_SESSION['gradeNo'],  
                         'memId'=>$_SESSION['memId'],  
                         'memName'=>$_SESSION['memName'],
                         'memMail' =>$_SESSION['memMail'],
                         'memAvatar'=>$_SESSION['memAvatar'],
                         'memGamePoint'=>$_SESSION['memGamePoint'],
                         'memStatus'=>$_SESSION['memStatus'],
                         'courseTimes'=>$_SESSION['courseTimes'],
                        );
        echo json_encode($memData);
    }else{
        echo '{}';
    }
?>