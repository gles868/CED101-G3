<?php
    try{
        require_once("connect_ced101g3.php");

        // 取得課程資料
        $sql = "SELECT cl.registNum, cl.courseStartDate, co.courseNo, co.courseName, co.courTypeNo, co.courseImg, co.courseDescription, co.coursePrice
                    FROM class cl JOIN course co ON (cl.courseNo = co.courseNo)
                    GROUP BY co.courseName
                    ORDER BY cl.registNum DESC
                    LIMIT 3";
        $course = $pdo->prepare($sql);
        $course->execute();
        $courseRows = $course->fetchAll(PDO::FETCH_ASSOC);

        // 取得教師資料 - 差顯示每位教師的所有課
        $sql = "SELECT t.teachNo, t.teachName, t.teachImg, t.teachDescription, ROUND(t.commStarTotal/t.commNum, 1) 'commAvg', t.commNum, co.courseName
                    FROM teacher t JOIN class cl ON (t.teachNo = cl.teachNo)
                                JOIN course co ON (cl.courseNo = co.courseNo)
                    -- GROUP BY co.courseName
                    GROUP BY t.teachName
                    ORDER BY commAvg DESC
                    LIMIT 3;";
        $teacher = $pdo->prepare($sql);
        $teacher->execute();
        $teacherRows = $teacher->fetchAll(PDO::FETCH_ASSOC);

        // 取得報名人數總數 
        $sql = "SELECT SUM(registNum) 'registSum' FROM class;";
        $registSum = $pdo->prepare($sql);
        $registSum->execute();
        $registSumRow = $registSum->fetch(PDO::FETCH_ASSOC);

        // 取得道具資料 - 攻擊
        $sql = "SELECT proType, proName, proPrice, proImg, proDescription
                    FROM product
                    WHERE proType = '攻擊型'
                    ORDER BY RAND()
                    LIMIT 3;";
        $prodAtt = $pdo->prepare($sql);
        $prodAtt->execute();
        $prodAttRows = $prodAtt->fetchAll(PDO::FETCH_ASSOC);

        // 取得道具資料 - 防禦
        $sql = "SELECT proType, proName, proPrice, proImg, proDescription
                    FROM product
                    WHERE proType = '防禦型'
                    ORDER BY RAND()
                    LIMIT 2;";
        $prodDef = $pdo->prepare($sql);
        $prodDef->execute();
        $prodDefRows = $prodDef->fetchAll(PDO::FETCH_ASSOC);

        // 取得道具資料 - 輔助
        $sql = "SELECT proType, proName, proPrice, proImg, proDescription
                    FROM product
                    WHERE proType = '輔助型'
                    ORDER BY RAND()
                    LIMIT 1;";
        $prodSup = $pdo->prepare($sql);
        $prodSup->execute();
        $prodSupRows = $prodSup->fetchAll(PDO::FETCH_ASSOC);

        // 將資料塞進陣列並轉為json
        $dataRows = [$courseRows, $teacherRows, $registSumRow, 
                     $prodAttRows, $prodDefRows, $prodSupRows];
        echo json_encode($dataRows);

    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>