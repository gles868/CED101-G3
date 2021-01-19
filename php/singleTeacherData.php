<?php
    try{
        require_once("connect_ced101g3.php");

        // 取得教師資料
        $sql = "SELECT teachNo, teachName, teachImg, teachDescription, ROUND(commStarTotal/commNum, 1) 'commStarAvg' 
                    FROM `teacher` WHERE teachNo = :teachNo";
        $teachNo = $_GET['teachNo'];
        $singleTeacher = $pdo->prepare($sql);
        $singleTeacher->bindValue(':teachNo', $teachNo);
        $singleTeacher->execute();
        $singleTeacherRows = $singleTeacher->fetch(PDO::FETCH_ASSOC);

        // 取得課程資料
        $sql = "SELECT DISTINCT cour.courseNo, cour.courseName, cour.coursePrice, courtype.courTypeName
                    FROM `course` cour JOIN `coursetype` courtype ON (cour.courTypeNo = courtype.courTypeNo)
                                       JOIN `class` class ON (cour.courseNo = class.courseNo)
                                       JOIN `teacher` teach ON (class.teachNo = teach.teachNo)
                    WHERE teach.teachNo = :teachNo";
        $teachNo = $_GET['teachNo'];
        $course = $pdo->prepare($sql);
        $course->bindValue(':teachNo', $teachNo);
        $course->execute();
        $courseRows = $course->fetchAll(PDO::FETCH_ASSOC);

        // 取得評論資料
        $sql = "SELECT DISTINCT m.memName, reg.commStar, reg.commContent, m.memAvatar, reg.registNo
                    FROM `registration` reg JOIN `member` m ON (reg.memberNo = m.memberNo)
                                            JOIN `report` rep ON (reg.registNo = rep.registNo)
                                            JOIN `class` c ON (reg.classNo = c.classNo)
                                            JOIN `teacher` t ON (c.teachNo = t.teachNo)            
                    WHERE commStar IS NOT NULL AND commContent IS NOT NULL AND 
                          rep.repoStatus != 1 AND t.teachNo = :teachNo";
        $teachNo = $_GET['teachNo'];
        $comment = $pdo->prepare($sql);
        $comment->bindValue(':teachNo', $teachNo);
        $comment->execute();
        $comments = $comment->fetchAll(PDO::FETCH_ASSOC);

        // 將資料塞進陣列並轉為json
        $dataRows = [$singleTeacherRows, $courseRows, $comments];
        echo json_encode($dataRows);

    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>