<?php
session_start();

// If no user is logged in, send them to login
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit();
}
?>