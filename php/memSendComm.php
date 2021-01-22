<?php
    session_start();
    try{
        require_once("connect_ced101g3.php");
        
        // 取得會員編號
        $memberNo = $_SESSION['memberNo'];
        // 取得該筆檢舉資料
        $commStar = $_POST['commStar'];
        $commContent = $_POST['commContent'];
        $registNo = $_POST['registNo'];

        // 更新 - registration 評價星數 | 評論內容 
        $sql = "UPDATE `registration` 
                    SET commStar    = :commStar, 
                        commContent = :commContent
                WHERE registNo = :registNo";
        $report = $pdo->prepare($sql);
        
        // 綁定: bindValue(命名引數或問號引數, 變數名或具體的值)
        $report->bindValue(':commStar', $commStar);
        $report->bindValue(':commContent', $commContent);
        $report->bindValue(':registNo', $registNo);
        $report->execute();
        echo '您已評分';

        
        // 更新 - teacher 總評星數 | 評分次數
        $sql = "UPDATE `teacher` t
                    JOIN `class` c ON (c.teachNo = t.teachNo)
                    JOIN `registration` r ON (c.classNo = r.classNo)
                    SET commStarTotal = commStarTotal + :commStar,
                        commNum = commNum + 1
                    WHERE r.registNo = :registNo";
        $total = $pdo->prepare($sql);
        $total->bindValue(':commStar', $commStar);
        $total->bindValue(':registNo', $registNo);
        $total->execute();

    }catch(PDOException $e){
        echo "錯誤行號 : " . $e->getLine() . "<br>";
	    echo "錯誤原因 : " . $e->getMessage() . "<br>";	
    }
?>