<?php
    try{
        require_once "./connect_ced101g3.php";

        $content = trim(file_get_contents("php://input"));
        $decoded = json_decode($content, true);
    
        $mem_no = $decoded["memberno"];

        $sql = "select *
                from product_order
                where memberno= :memberno";

        $menu = $pdo->prepare($sql);
        $menu->bindValue(":memberno", $mem_no);
        $menu->execute();

        if ($menu->rowCount() == 0){
            //傳回空的JSON字串
            echo "{}";
        }else{ //找得到
            //取回一筆資料
            $menuRow = $menu->fetchAll(PDO::FETCH_ASSOC);
            

            for($i=0; $i<count($menuRow); $i++){
                $sql1 = "select *
                        from order_details od join product p on od.proNo = p.proNo
                        where proOrder=:proOrder
                        ";

                $menu1 = $pdo->prepare($sql1);
                $menu1->bindValue(':proOrder',$menuRow[$i]["proOrder"]);
                $menu1->execute();
                $menu1Row = $menu1->fetchAll(PDO::FETCH_ASSOC);
                $menuRow[$i]["itemList"] = $menu1Row;


                if($menuRow[$i]["paymentMethod"] == 0){
                    $menuRow[$i]["pay"] = "信用卡付款";
                }else if($menuRow[$i]["paymentMethod"] == 1){
                    $menuRow[$i]["pay"] = "轉帳付款";
                };
            }
            //送出json字串
            echo json_encode($menuRow);
            // print_r($menuRow);

        }	
    }
    catch (PDOException $e) {
        //echo "系統錯誤, 請通知系維護人員~<br>";
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
    
?>