<?php
include "conn.php";


//检测用户名是否重名
// echo 'aa';
// echo $_POST['username'];
if (isset($_POST['username'])) {
    $user = $_POST['username'];
    $result = $conn->query("select * from register where username='$user'");
    // echo $result;
    if ($result->fetch_assoc()) { //存在
        echo true; //1
    } else {
        echo false; //空
    }
}


//接收前端表单提交的数据
if (isset($_POST['username1'])) {
    $username = $_POST['username1'];
    echo $username;
    // $password = sha1($_POST['password']);
    $password = $_POST['password'];
    $email = $_POST['email'];
    $conn->query("insert register values(null,'$username','$password','$email',NOW())");
}
