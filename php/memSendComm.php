<?php
// 將會員資料寫進session
    // session_start();
    // try{
    //     require_once("connect_ced101g3.php");
    //     $sql = "select * from `member` WHERE memName = '董董'";  // 先寫死where條件
    //     $member = $pdo->query($sql);

    //     //自資料庫中取回資料
    //     $memRow = $member->fetch(PDO::FETCH_ASSOC);

    //     // 將登入者的資料寫進session
    //     $_SESSION["memberNo"] = $memRow["memberNo"]; 
    //     $_SESSION["memId"] = $memRow["memId"];
    // }catch(PDOException $e){
    //     echo $e->getMessage();
    // }
?>
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

        // 更新資料: 評價星數 | 評論內容
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
        
        // echo '評價星數: '.$commStar.'<br>';
        // echo '評論內容: '.$commContent.'<br>';
        // echo '會員編號: '.$memberNo.'<br>';
        // echo '報名課程編號: '.$registNo.'<br>';
        echo '您已評分';

    }catch(PDOException $e){
        echo "錯誤行號 : " . $e->getLine() . "<br>";
	    echo "錯誤原因 : " . $e->getMessage() . "<br>";	
    }
?>