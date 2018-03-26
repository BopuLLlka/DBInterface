<?php
//Connection
$servername = "localhost";
$username = "root";
$password = "";
// Create connection

$sql="SHOW DATABASES";

$link = new mysqli($servername, $username, $password);
// Check connection
if ($link->connect_error) {
    die("Connection failed: " . $link->connect_error);
}

$array = array();

if (!($result=mysqli_query($link,$sql))) {
        printf("Error: %s\n", mysqli_error($link));
    }
while( $row = mysqli_fetch_row( $result ) ){
if (($row[0]!="information_schema") && ($row[0]!="mysql")) {
    array_push($array, $row[0]);
}
}

echo json_encode($array);
$link->close();
?>