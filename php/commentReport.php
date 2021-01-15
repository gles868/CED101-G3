<?php
// 將會員資料寫進session
    session_start();
    try{
        require_once("connect_ced101g3.php");

        $sql = "select * from `member` WHERE memName = '瓜瓜'";  // 先寫死where條件
        $member = $pdo->query($sql);

        //自資料庫中取回資料
        $memRow = $member->fetch(PDO::FETCH_ASSOC);

        // 將登入者的資料寫進session
        $_SESSION["memberNo"] = $memRow["memberNo"]; 
        $_SESSION["memId"] = $memRow["memId"];

        // echo '會員編號: '.$_SESSION["memberNo"]."<br>";
        // echo '會員帳號: '.$_SESSION["memId"]."<hr>"; 
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>

<?php  
// session_start(); 
// 按下submit後將檢舉資料寫進database
    try{
        require_once("connect_ced101g3.php");

        // 取得檢舉人會員編號
        $memberNo = $_SESSION['memberNo'];  // 會員編號從session抓，***這裡要判斷是否已登入

        // $report = $pdo->prepare($sql);
        // $report->bindValue(':memberNo', $memberNo);
        // $report->execute();

        // 取得該筆檢舉資料
        $repoReason = $_POST['reportReason'];
        $registNo = $_POST['registNo'];

        // sql新增資料: 會員編號 | 課程報名編號(評論編號) | 檢舉原因 | 檢舉日期
        $sql = "INSERT INTO report (memberNo, registNo, repoReason, repoDate)
                VALUE (:memNo, :registNo, :repoReason, NOW())";
        $report = $pdo->prepare($sql);
        
        // 綁定: bindValue(命名引數或問號引數, 變數名或具體的值)
        $report->bindValue(':memNo', $memberNo);
        $report->bindValue(':repoReason', $repoReason);
        $report->bindValue(':registNo', $registNo);
        $report->execute();
        
        echo '會員編號: '.$memberNo.'<br>';
        echo '課程報名編號: '.$registNo.'<br>';
        echo '檢舉原因: '.$repoReason.'<br>';

    }catch(PDOException $e){
        echo "錯誤行號 : " . $e->getLine() . "<br>";
	    echo "錯誤原因 : " . $e->getMessage() . "<br>";	
    }
?>