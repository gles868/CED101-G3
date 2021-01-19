<?php
    require_once("connectced101g3_test.php");
    $sql = "SELECT c.courseNo, p.proImg, p.proName 
            from course c join product p on c.courseNo = p.courseNo
            where c.courseNo = 7";
	$allproduct = $pdo->prepare($sql);
	// $allproduct->bindValue(1, $_GET["courseNo"]);
    $allproduct->execute();
    $productRow = $allproduct->fetchAll(PDO::FETCH_ASSOC);

    // echo json_encode($productRow);

    $data = array();
    foreach ($productRow as $row){
        $data[] = array(
            $row['courseNo'],
            $row['proImg'],
            $row['proName'],
        );
        // echo json_encode($row);
    }
    // echo json_encode($data);

    // $length = count($data);
    // for ($i = 0; $i < $length; $i++){
    //     // echo json_encode($data[$i]);
        
    //     for ($j = 0; $j < 3; $j++){
    //     // echo json_encode($data);  
    //     // echo json_encode($data[$i][$j]);    
    //     }
    // }

  
    // echo json_encode($data);


    // echo json_encode($productRow);
?>

<?php
require_once "connectced101g3_test.php";
$sql = "select * from course where courseNo = 3 ";
$allcourse = $pdo->prepare($sql);
// $allcourse->bindValue(1, $_GET["courseNo"]);
$allcourse->execute();
$courseRow = $allcourse->fetch(PDO::FETCH_ASSOC);

echo json_encode($courseRow);
?>