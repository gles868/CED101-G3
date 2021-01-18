<?php
    // session_start();
    // try{
    //     require_once("connect_ced101g3.php");
    //     $sql = "select * 
    //             from member 
    //             WHERE memberNo = :memberNo"; 

    //     //自資料庫中取回資料
    //     $memRow = $member->fetch(PDO::FETCH_ASSOC);

        // $per_ord_data = $pdo->prepare($sql);
        // $per_ord_data->bindValue(":memberNo", $mem_no);
    
        // $per_ord_data->execute();

    // }catch(PDOException $e){
    //     echo $e->getMessage();
    // }
?>

<?php
    try{
        require_once("connect_ced101g3.php");

        // $mem_no = $decoded["memberno"];


        // 取得課程報名編號 | 班級編號 | 會員編號 | 課程編號 | 課程名稱 | 課程圖片 | 課程說明 | 課程狀態
        $sql = "SELECT a.registNo, b.classNo, a.memberNo, c.courseNo, c.courseName, c.courseImg, c.courseDescription, c.courseStatus 
                    FROM registration a JOIN class b ON a.classNo = b.classNo 
                                        JOIN course c ON b.courseNo = c.courseNo 
                    WHERE memberNo = :memberno AND commStar IS NULL";
        $memCourse = $pdo->prepare($sql);
        $memCourse->bindValue(":memberno", $mem_no);   
        $memCourse->execute();
        $memCourseRows = $memCourse->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($memCourseRows);

    }catch(PDOException $e){
        echo $e->getMessage();
        echo $e->getLine();
    }
?>