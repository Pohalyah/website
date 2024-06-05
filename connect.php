<?php

/*
$host="localhost";
$user="root";
$pass="";
$db="databasewebsite";
$conn=new mysqli($host,$user,$pass,$db);
if($conn->connect_error){
    die('Connection échouée : '.$connect->connect_error);
}
*/


$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

//database connection
$conn = new mysqli ('localhost','root','','test');
if($conn->connect_error){
    die('Connection échouée : '.$connect->connect_error);
}else{
    $stmt = $conn->prepare("insert into enregistrement(username, email, password)
        value(?, ?, ?)");
    $stmt->bind_param("sss",$username, $email, $password);
    $stmt->execute();
    echo "test";
    $stmt->close();
    $conn->close();
}

?>