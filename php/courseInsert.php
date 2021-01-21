
<?php
$errMsg = "";
try {
	require_once("./connectced101g3_test.php");

	//.......確定是否上傳成功

	
			$sql = "INSERT INTO `registration` (`memberNo`, `classNo`) 
                                    values(:memberNo, :classNo)";
			$products = $pdo->prepare( $sql );
			$products -> bindValue(":memberNo", $_POST["memberNo"]);
			$products -> bindValue(":classNo", $_POST["classNo"]);
			$products -> execute();			
			echo "新增成功~";
	


} catch (PDOException $e) {
	// $pdo->rollBack();
	$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
	$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";	
	echo $errMsg;
}


?>    
