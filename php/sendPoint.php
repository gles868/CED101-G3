
<?php
$content = trim(file_get_contents("php://input"));
// $decoded = json_decode($content, true);
// var_dump($decoded);die;
$errMsg = "";
session_start();
try {
	require_once("./connect_ced101g3.php");
    // $content = trim(file_get_contents("php//input"));
    $data = json_decode($content, true);
	//.......確定是否上傳成功

            $memGamePoint = $data['sendP'];
			// $sql = "INSERT INTO `member` (`memberNo`, `memGamePoint`) 
            //                         values('55', :memGamePoint)";
            $sql = "update `member` set memGamePoint = :memGamePoint
                                    where memberNo = :memberNo";

            
			$products = $pdo->prepare( $sql );
			$products -> bindValue(":memberNo", $_SESSION["memberNo"]);
			$products -> bindValue(":memGamePoint", $memGamePoint);
			$products -> execute();			
			// echo "新增成功~";
			echo json_encode($memGamePoint);
	


} catch (PDOException $e) {
	// $pdo->rollBack();
	$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
	$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";	
	echo $errMsg;
}


?>    
