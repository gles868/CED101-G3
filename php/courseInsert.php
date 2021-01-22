<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Examples</title>
</head>
<body>
<?php
$errMsg = "";
try {
	require_once("./connect_ced101g3.php");

	//.......確定是否上傳成功

	
			$sql = "INSERT INTO `registration` (`memberNo`, `classNo`) 
                                    values(:memberNo, :classNo)";
			$products = $pdo->prepare( $sql );
			$products -> bindValue(":memberNo", $_POST["memberNo"]);
			$products -> bindValue(":classNo", $_POST["classNo"]);
			$products -> execute();		
			// echo "新增成功~";

			$url = "../registStepDone.html";
			echo "<script type='text/javascript'>";
			echo "window.location.href='$url'";
			echo "</script>";
	


} catch (PDOException $e) {
	// $pdo->rollBack();
	$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
	$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";	
	echo $errMsg;
}


?>    
</body>
</html>
