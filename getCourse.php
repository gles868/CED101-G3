<?php 
 

	require_once("connectced101g3_test.php");


	// $sql = "SELECT course.courseNo, course.courseName, course.coursePrice, course.courseImg, course.courseDescription, courseType.courTypeName 
	// 		FROM course JOIN courseType ON course.courTypeNo = courseType.courTypeNo";
		
	// $allCourse = $pdo->prepare($sql);
	// $allCourse->execute();
	// $courseRows = $allCourse->fetchAll(PDO::FETCH_ASSOC);
	// echo json_encode($courseRows);


	if($_GET["courTypeName"] != ''){
				$sql = "SELECT course.courseNo, course.courseName, course.coursePrice, course.courseImg, course.courseDescription, courseType.courTypeName 
					FROM course join courseType on course.courTypeNo = courseType.courTypeNo
					where courTypeName = ? ";
				$allCourse = $pdo->prepare($sql);
				$allCourse->bindValue(1, $_GET["courTypeName"]);
				$allCourse->execute();
	}
	else{
		$sql = "SELECT course.courseNo, course.courseName, course.coursePrice, course.courseImg, course.courseDescription, courseType.courTypeName 
			FROM course JOIN courseType ON course.courTypeNo = courseType.courTypeNo";
		
		$allCourse = $pdo->prepare($sql);
		$allCourse->execute();	
				
	}
	
		$courseRows = $allCourse->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($courseRows);
	
	

?>