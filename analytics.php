<?php
header('Content-Type: application/json');
include 'db.php'; // assumes db.php connects to your database

$query = "SELECT country, COUNT(*) as total FROM users GROUP BY country ORDER BY total DESC";
$result = $conn->query($query);

$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = [
            'country' => $row['country'],
            'count' => (int)$row['total']
        ];
    }
}

echo json_encode($data);
?>
