<?php
// 將會員資料寫進session
    session_start();
    try{
        require_once("connectced101g3.php");
        $sql = "select * from `member` WHERE memName = '董董'";  // 先寫死where條件
        $member = $pdo->query($sql);

        //自資料庫中取回資料
        $memRow = $member->fetch(PDO::FETCH_ASSOC);

        // 將登入者的資料寫進session
        $_SESSION["memberNo"] = $memRow["memberNo"]; 
        $_SESSION["memId"] = $memRow["memId"];
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>

<?php
    try{
        require_once("connectced101g3.php");
        $memberNo = $_SESSION['memberNo'];

        // 取得課程報名編號 | 班級編號 | 會員編號 | 課程編號 | 課程名稱 | 課程圖片 | 課程說明 | 課程狀態
        $sql = "SELECT a.registNo, b.classNo, a.memberNo, c.courseNo, c.courseName, c.courseImg, c.courseDescription, c.courseStatus 
                    FROM registration a JOIN class b ON a.classNo = b.classNo 
                                        JOIN course c ON b.courseNo = c.courseNo 
                    WHERE memberNo = :memNo AND commStar IS NULL";
        $memCourse = $pdo->prepare($sql);
        $memCourse->bindValue(':memNo', $memberNo);
        $memCourse->execute();
        $memCourseRows = $memCourse->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($memCourseRows);

    }catch(PDOException $e){
        echo $e->getMessage();
        echo $e->getLine();
    }
?>