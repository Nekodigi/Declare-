<?php
if(isset($_POST['title'])){//check existance of message data
    $title = htmlspecialchars($_POST['title']);//XSS attack contermeasures
    $due = htmlspecialchars($_POST['due']);
    $duration = htmlspecialchars($_POST['duration']);
    $details = htmlspecialchars($_POST['details']);
    
    //write to the sql https://www.w3schools.com/php/php_mysql_insert.asp
    $conn = connect_sql();
    $sql = "INSERT INTO savedatas(title, duration, due, details) VALUES('{$title}', '{$duration}', '{$due}', '{$details}')";
    $conn->query($sql);
    load();
}else if(isset($_POST['review'])){
    $id = htmlspecialchars($_POST['id']);
    $review = htmlspecialchars($_POST['review']);
    $conn = connect_sql();
    $sql = "UPDATE savedatas SET review='{$review}' WHERE id={$id}";
    $conn->query($sql);
    load();
}else if($_SERVER['REQUEST_METHOD'] === 'GET'){
    load();
}else{
    echo "writing failed";
}


function load(){
    //get sql data https://www.w3schools.com/php/php_mysql_select.asp
    $conn = connect_sql();
    $sql = "SELECT * FROM savedatas WHERE review='' ORDER BY due DESC";//get not reviewed date
    $datas = $conn->query($sql);
    while($row = $datas->fetch_assoc()) {
        $due = date('Y-m-d H:i:s', strtotime($row['due']));
        echo "<div class='container'><div class='declare-item' ids='{$row['id']}'>";
        echo "<h2 class='declare-item-'>{$row['title']}</h2>";
        echo "<h3 class='time display using' time='{$row['due']}' duration='{$row['duration']}'>{$due}</h3>";
        echo "<div class='progress'><div class='progress child'></div></div>";
        echo "<p class='details display'>{$row['details']}</p>";
        echo '</div></div>';
    }

    $sql = "SELECT * FROM savedatas WHERE review!='' ORDER BY due DESC";//get reviewed date
    $datas = $conn->query($sql);
    while($row = $datas->fetch_assoc()) {
        echo "<div class='container'><div class='declare-item fin'>";
        echo "<h2 class='declare-item-'>{$row['title']}</h2>";
        echo "<h3 class='time display'>{$row['duration']}</h3>";
        echo "<div class='progress'><div class='progress child'></div></div>";
        echo "<p class='details display'>{$row['details']}</p>";
        echo "<p class='review display'>{$row['review']}</p>";
        echo "</div></div>";
    }
}

function connect_sql(){
    $servername = "localhost";#please set any setting
    $username = "root";#
    $password = "";#
    $dbname = "declare!";#

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        echo "failed";
    }
    return $conn;
}
?>
