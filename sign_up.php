<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $first = $_POST['first-name'];
    $last = $_POST['last-name'];
    $mobile = $_POST['mobile'];
    $email = $_POST['email'];
    $country = $_POST['country'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Handle profile picture
    $profilePicName = null;
    if (isset($_FILES['profile_picture']) && $_FILES['profile_picture']['error'] === 0) {
        $ext = pathinfo($_FILES['profile_picture']['name'], PATHINFO_EXTENSION);
        $profilePicName = uniqid("profile_", true) . "." . $ext;

        if (!is_dir('uploads')) {
            mkdir('uploads', 0777, true);
        }

        move_uploaded_file($_FILES['profile_picture']['tmp_name'], "uploads/" . $profilePicName);
    }

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, mobile_number, email, country, password, profile_picture)
                            VALUES (?, ?, ?, ?, ?, ?, ?)");

    if ($stmt) {
        $stmt->bind_param("sssssss", $first, $last, $mobile, $email, $country, $password, $profilePicName);
        $stmt->execute();
    }

    // ✅ Always return 200 so JS redirects
    http_response_code(200);
}
?>
