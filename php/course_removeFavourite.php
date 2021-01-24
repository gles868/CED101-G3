<?php
    session_start();
    try {
        require_once("connect_ced101g3.php");
        $sql = "DELETE FROM course_list where courseNo = ? and memberNo = ?";   
        $lovedCourse = $pdo->prepare($sql);
        $lovedCourse->bindValue(1, $_GET["courseNo"]);
        $lovedCourse->bindValue(2, $_SESSION["memberNo"]);
        $lovedCourse->execute();

    } catch (PDOException $e) {
        // $pdo->rollBack();
        $errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
        $errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";	
        echo $errMsg;
    }

?>