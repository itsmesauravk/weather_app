<?php
$con = mysqli_connect("localhost", "root", "", "weatheR");

if ($con) {
    if (isset($_POST['city'])) {
        $cityName = $_POST['city'];
        $sel = "SELECT * FROM store_weather WHERE city='$cityName'";
    } else {
        $sel = "SELECT * FROM store_weather"; // Fetch all data
    }

    $selected = $con->query($sel);

    $data = array(); // Create an array to store data

    if ($selected) {
        while ($row = $selected->fetch_assoc()) {
            $data[] = array(
                'city' => $row['city'],
                'date' => $row['date'],
                'temperature' => $row['temperature'],
                'humidity' => $row['humidity'],
                'pressure' => $row['pressure'],
                'wind' => $row['wind'],
                'description' => $row['description']
            );
        }

        // Convert the data to JSON and send it as the response
        echo json_encode($data);
    } else {
        echo "Data selection failed: " . mysqli_error($con);
    }
} else {
    echo "Connection failed: " . mysqli_connect_error();
}
?>
