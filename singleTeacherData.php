<?php
    try{
        require_once("connectced101g3.php");
        // *預計要從網址get到該教師的teachNo ---- 先寫死
        $sql = "select * from `teacher` WHERE teachNo = 4"; 
            // $sql = "select * from `teacher` WHERE teachNo = :teachNo"; 
        $singleTeacher = $pdo->query($sql);
            // $teacher = $pdo->prepare($sql);
            // $teachers = $teacher->bindValue(':teachNo', $_GET['teachNo']);
            // $teacher->execute();
        $singleTeacherRows = $singleTeacher->fetchAll(PDO::FETCH_ASSOC);

        // 取得評價星數 | 評論內容資料 | 會員名稱 | 會員頭像 | 課程報名編號
        $sql = "SELECT m.memName, r.commStar, r.commContent, m.memAvatar, r.registNo
                    FROM `registration` r JOIN `member` m ON (r.memberNo = m.memberNo)
                    WHERE commStar IS NOT NULL AND commContent IS NOT NULL";
        $comment = $pdo->prepare($sql);
        $comment->execute();
        $comments = $comment->fetchAll(PDO::FETCH_ASSOC);

        // 將資料塞進陣列並轉為json
        $dataRows = [$singleTeacherRows, $comments];
        echo json_encode($dataRows);

    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>