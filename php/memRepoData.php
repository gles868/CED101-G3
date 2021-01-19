<?php
    session_start();
    try{
        require_once("connect_ced101g3.php");
        $sql = "SELECT repoNo, memberNo, registNo 
                    FROM `report` 
                    WHERE memberNo = :memberNo AND registNo = :registNo";

        $memberNo = $_SESSION['memberNo'];
        $registNo = $_GET['registNo'];

        $report = $pdo->prepare($sql);
        $report->bindValue(':memberNo', $memberNo);
        $report->bindValue(':registNo', $registNo);
        $report->execute();
        // $reportRows = $report->fetchAll(PDO::FETCH_ASSOC);

        // echo json_encode($reportRows);

        if($report->rowCount() != 0){
            echo '已檢舉';
        }

    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>