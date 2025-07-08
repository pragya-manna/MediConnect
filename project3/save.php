<?php
$server = "localhost";
$username = "root";
$password = "";
$dbname = "MediConnect";

$con = mysqli_connect($server, $username, $password, $dbname);

if (!$con) {
    echo "Not connected";
    exit;
}

// Get text inputs
$name = $_POST['name'];
$birth = $_POST['birth'];
$gender = $_POST['gender'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$date = $_POST['date'];
$time = $_POST['time'];
$reason = $_POST['reason'];

// Handle file upload
$upload_folder = "uploads/";
$filename = basename($_FILES["upload"]["name"]);
$target_path = $upload_folder . $filename;

if (move_uploaded_file($_FILES["upload"]["tmp_name"], $target_path)) {
    // File uploaded successfully
    $sql = "INSERT INTO Appointment 
    (name, Birth, gender, phone, email, Date, Time, Reason, Upload) 
    VALUES 
    ('$name', '$birth', '$gender', '$phone', '$email', '$date', '$time', '$reason', '$target_path')";

    $result = mysqli_query($con, $sql);

    if ($result) {
        echo "Data submitted successfully";
    } else {
        echo "Error: " . mysqli_error($con);
    }
} else {
    echo "Failed to upload file.";
}
?>