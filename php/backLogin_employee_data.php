<?php
    session_start();
    try {
        require_once("connect_ced101g3.php");
        $empNo = $_SESSION['empNo'];

        $sql = "SELECT * 
                    FROM `employee` e LEFT OUTER JOIN `teacher` t ON (e.empNo = t.empNo)
                    WHERE e.empNo = :empNo";

        $empData = $pdo->prepare($sql);
        $empData->bindValue(":empNo", $empNo);
        $empData->execute();
        $empDataRows = $empData->fetch(PDO::FETCH_ASSOC);
        echo json_encode($empDataRows);

    } catch (PDOException $e) {
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
?>