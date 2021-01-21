<?php 
 

	require_once("connect_ced101g3.php");


	$sql = "SELECT *
		FROM course a join courseType b on a.courTypeNo = b.courTypeNo join class c on a.courseNo = c.courseNo join teacher d on c.teachNo = d.teachNo
		order by courseStartDate
		LIMIT 10";
			
	$allCourse = $pdo->prepare($sql);
	$allCourse->execute();
	$courseRows = $allCourse->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($courseRows);


	// if($_GET["courTypeName"] != ''){
	// 			$sql = "SELECT course.courseNo, course.courseName, course.coursePrice, course.courseImg, course.courseDescription, courseType.courTypeName 
	// 				FROM course join courseType on course.courTypeNo = courseType.courTypeNo
	// 				where courTypeName = ? ";
	// 			$allCourse = $pdo->prepare($sql);
	// 			$allCourse->bindValue(1, $_GET["courTypeName"]);
	// 			$allCourse->execute();
	// }
	// else{
	// 	$sql = "SELECT course.courseNo, course.courseName, course.coursePrice, course.courseImg, course.courseDescription, courseType.courTypeName 
	// 		FROM course JOIN courseType ON course.courTypeNo = courseType.courTypeNo";
		
	// 	$allCourse = $pdo->prepare($sql);
	// 	$allCourse->execute();	
				
	// }
	// 	$courseRows = $allCourse->fetchAll(PDO::FETCH_ASSOC);
	// 	echo json_encode($courseRows);
	
	
	
	// if($_GET["coursePrice"] !=0){
	// 			$sql = "SELECT course.courseNo, course.courseName, course.coursePrice, course.courseImg, course.courseDescription, courseType.courTypeName 
	// 				FROM course join courseType on course.courTypeNo = courseType.courTypeNo
	// 				where coursePrice < ? ";
	// 			$allCourse = $pdo->prepare($sql);
	// 			$allCourse->bindValue(1, $_GET["courTypeName"]);
	// 			$allCourse->execute();
	// }
	// else{
	// 	$sql = "SELECT course.courseNo, course.courseName, course.coursePrice, course.courseImg, course.courseDescription, courseType.courTypeName 
	// 		FROM course JOIN courseType ON course.courTypeNo = courseType.courTypeNo";
		
	// 	$allCourse = $pdo->prepare($sql);
	// 	$allCourse->execute();	
				
	// }
	
	

?>