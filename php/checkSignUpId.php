<?php
    try{
        require_once("connect_ced101g3.php");
        
        if(isset($_GET['memId'])){
            $sql = "SELECT * FROM member WHERE memId=:memId";
            $member = $pdo->prepare($sql);
            $member->bindValue(':memId', $_GET['memId']);
            $member->execute();
            if( $member->rowCount() != 0){ // 已存在此帳號
                echo "已存在這個帳號";
            }else{
                echo "可以使用此帳號";
            } 
        }else if(isset($_GET['memMail'])){
            $sql = "SELECT * FROM member WHERE memMail=:memMail";
            $member = $pdo->prepare($sql);
            $member->bindValue(':memMail', $_GET['memMail']);
            // $member->bindValue(':memMail', 'sara@gmail.com');
            $member->execute();
            $memRow = $member->fetchAll();

            // echo json_encode($memRow).'<br>'; // [{"memberNo":"5","0":"5","gradeNo":"1","1":"1","memId":"sara","2":"sara","memPsw":"111","3":"111","memName":"\u8463\u8463","4":"\u8463\u8463","memMail":"sara@gmail.com","5":"sara@gmail.com","memAvatar":"member03.png","6":"member03.png","memGamePoint":"0","7":"0","memStatus":"1","8":"1","courseTimes":"0","9":"0"}]
            // $memMail = $memRow[0]['memMail'];  // sara@gmail.com
            // $memMailAccount = explode('@', $memMail);  // Array ( [0] => sara [1] => gmail.com ) 
            // $memMailAccount[0];  // sara

            if( $member->rowCount() != 0){
                echo "已存在這個email";
            }else{
                echo "可以使用此email";
            } 
        }     

    }catch(PDOException $e){
        echo $e->getMessage();
        echo $e->getLine();
    }
?>