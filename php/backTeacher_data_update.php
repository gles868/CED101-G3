<?php
    session_start();
    try {
        require_once "connect_ced101g3.php";

        // $content = trim(file_get_contents("php://input"));
        // $decoded = json_decode($content, true);
        // $teachNo = $decoded["teachNo"];
        // $teachName = $decoded["teachName"];
        $teachNo = $_SESSION["teachNo"]
        $teachName = $_SESSION["teachName"]

        $sql = "UPDATE teacher 
                    SET teachName = :teachName               
                    WHERE teachNo = :teachNo";

        $updateTeacher = $pdo->prepare($sql);
        $updateTeacher->bindValue(":teachNo", $teachNo);
        $updateTeacher->bindValue(":teachName", $teachName);
        $updateTeacher->execute();

        echo "修改成功";

    } catch (PDOException $e) {
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
?>