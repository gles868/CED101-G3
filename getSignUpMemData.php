<?php
    try{
        require_once("connectced101g3.php");

        $memId = $_POST['memId'];
        $memPsw = $_POST['memPsw'];
        $memName = $_POST['memName'];
        $memMail = $_POST['memMail'];

        $sql = "INSERT INTO member (memId, memPsw, memName, memMail)
                VALUE (:memId, :memPsw, :memName, :memMail)";
        $memNewData = $pdo->prepare($sql);
        $memNewData->bindValue(':memId', $memId);
        $memNewData->bindValue(':memPsw', $memPsw);
        $memNewData->bindValue(':memName', $memName);
        $memNewData->bindValue(':memMail', $memMail);
        $memNewData->execute();

        echo '會員帳號: '.$memId.'<br>';
        echo '會員密碼: '.$memPsw.'<br>';
        echo '會員姓名: '.$memName.'<br>';
        echo '會員信箱: '.$memMail.'<br>';

    }catch(PDOException $e){
        echo $e->getMessage();
        echo $e->getLine();
    }
?>