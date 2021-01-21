<?php
    try{
        require_once("connect_ced101g3.php");
        
        // 取得所有教師
        $sql = "SELECT t.teachNo, t.teachName, ROUND(t.commStarTotal/t.commNum, 1) 'commStarAvg', 
                       t.teachImg, t.teachDescription, r.memberNo, r.commStar, r.commContent, 
                       MAX(r.registNo), m.memName, m.memAvatar
                    FROM `teacher` t 
                    LEFT OUTER JOIN `class` c ON (t.teachNo = c.teachNo) 
                    LEFT OUTER JOIN `registration` r ON (c.classNo = r.classNo) 
                    LEFT OUTER JOIN `member` m ON (r.memberNo = m.memberNo)
                    WHERE commStar IS NOT NULL AND commContent IS NOT NULL
                    GROUP BY teachNo
                    ORDER BY teachNo ASC;";
        $teacher = $pdo->query($sql);
        $teacherRows = $teacher->fetchAll(PDO::FETCH_ASSOC);

        // 取得評價星數 | 評論內容資料 | 會員名稱 | 會員頭像 | 課程報名編號
        $sql = "SELECT m.memName, r.commStar, r.commContent, m.memAvatar, r.registNo
                    FROM `registration` r JOIN `member` m ON (r.memberNo = m.memberNo)
                    WHERE commStar IS NOT NULL AND commContent IS NOT NULL";
        $comment = $pdo->prepare($sql);
        $comment->execute();
        $comments = $comment->fetchAll(PDO::FETCH_ASSOC);

        $dataRows = [$teacherRows, $comments];
        echo json_encode($dataRows);

    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>