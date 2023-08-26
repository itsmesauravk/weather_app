<?php

$con = mysqli_connect("localhost","root");
if ($con) {
    $selection = $con->select_db('weatheR');
    if ($selection) {
        $sel = "SELECT * FROM store_weather where city='New Forest'";
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

            // Convert the data to JSON
            echo json_encode($data);
        } else {
            echo "Data selection failed";
        }
    } else {
        echo "Database not selected";
    }
} else {
    echo "Connection failed";
}
?>
