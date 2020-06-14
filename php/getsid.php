<?php

include "conn.php";

if (isset($_GET['sid'])) {
    $sid = $_GET['sid']; //接收详情页传入的sid
    $result = $conn->query("select * from goods where goods_id=$sid");
    echo json_encode($result->fetch_assoc());
}

if (isset($_GET['loginsid'])) {
    $sid = $_GET['loginsid']; //接收详情页传入的sid
    $result = $conn->query("select * from register where sid=$sid");
    echo json_encode($result->fetch_assoc());
}

