<?php
    try{
        require_once "connect_ced101g3.php";
    
        $content = trim(file_get_contents("php://input"));
        $decoded = json_decode($content, true);
    
        $teachNo = $decoded["teachNo"];
        $classData = array();
    
        $sql = "SELECT co.courseName, c.courseStartDate, co.courseNo
                    FROM class c JOIN teacher t ON (c.teachNo = t.teachNo)
                                JOIN course co ON (c.courseNo = co.courseNo)
                    WHERE t.teachNo = :teachNo";
    
        $teacherClass = $pdo->prepare($sql);
        $teacherClass->bindValue(":teachNo",$teachNo);
        $teacherClass->execute();
        $teacherClassRows = $teacherClass->fetchAll(PDO::FETCH_ASSOC);

        for($i = 0; $i < count($teacherClassRows); $i++){ 
            $classData[$i]["title"] = $teacherClassRows[$i]["courseName"];
            $classData[$i]["start"] = $teacherClassRows[$i]["courseStartDate"];
            $classData[$i]["url"] = "singleCourse.php?courseNo={$teacherClassRows[$i]["courseNo"]}";
        };
    
        echo json_encode($classData);

    } catch (PDOException $e) {
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }

?>