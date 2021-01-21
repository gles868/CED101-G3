<?php  
// 按下submit後將檢舉資料寫進database
    session_start(); 
    try{
        require_once("connect_ced101g3.php");

        // 取得檢舉人會員編號
        $memberNo = $_SESSION['memberNo'];
        // 取得檢舉資料
        $repoReason = $_POST['reportReason'];
        $registNo = $_POST['registNo'];

        // sql新增資料: 會員編號 | 課程報名編號(評論編號) | 檢舉原因 | 檢舉日期
        $sql = "INSERT INTO report (memberNo, registNo, repoReason, repoDate)
                VALUE (:memberNo, :registNo, :repoReason, NOW())";
        $report = $pdo->prepare($sql);
        
        // 綁定: bindValue(命名引數或問號引數, 變數名或具體的值)
        $report->bindValue(':memberNo', $memberNo);
        $report->bindValue(':repoReason', $repoReason);
        $report->bindValue(':registNo', $registNo);
        $report->execute();
        
        $repoNo = $pdo->lastInsertId();
        
        echo '會員編號: '.$memberNo.'<br>';
        echo '課程報名編號: '.$registNo.'<br>';
        echo '檢舉原因: '.$repoReason.'<br>';
        echo '檢舉編號: '.$repoNo.'<br>';

    }catch(PDOException $e){
        echo "錯誤行號 : " . $e->getLine() . "<br>";
	    echo "錯誤原因 : " . $e->getMessage() . "<br>";	
    }
?>