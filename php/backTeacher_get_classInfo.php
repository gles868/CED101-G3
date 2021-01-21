<?php
    session_start();
    try{
        require_once "connect_ced101g3.php";
    
        // $content = trim(file_get_contents("php://input"));
        // $decoded = json_decode($content, true);
    
        // $teachNo = $decoded["teachNo"];
        $teachNo = $_SESSION["teachNo"];
        $classData = array();
    
        $sql = "SELECT co.courseNo, co.courseName, co.courseImg, co.courseDescription, 
                       c.classNo, c.classDescription, c.courseStartDate, c.endDate, c.maxRegistNum, c.RegistNum
                    FROM class c JOIN teacher t ON (c.teachNo = t.teachNo)
                                 JOIN course co ON (c.courseNo = co.courseNo)
                    WHERE t.teachNo = :teachNo";
    
        $teacherClass = $pdo->prepare($sql);
        $teacherClass->bindValue(":teachNo",$teachNo);
        $teacherClass->execute();
        $teacherClassRows = $teacherClass->fetchAll(PDO::FETCH_ASSOC);
    
        echo json_encode($teacherClassRows);

    } catch (PDOException $e) {
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }

?>