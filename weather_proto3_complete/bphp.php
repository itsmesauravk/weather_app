<?php

$server = "localhost";
$user = "root";
$pass = "";
$database = "weather";

// Create a new mysqli connection
$con = new mysqli($server, $user, $pass, $database);

if ($con->connect_error) {
  die("Connection failed: " . $con->connect_error);
}

if (isset($_POST['cityName'])) {
  $cityName = $_POST['cityName'];

  // SQL query to retrieve weather data for a specific city and order by date in descending order
  $select = "SELECT * FROM weather_data WHERE city='$cityName' ORDER BY date DESC LIMIT 7";
  $selected = $con->query($select);

  $data = array(); // Create an array to store data

  if ($selected) {
    // Fetch and store the data in the array
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

    // Convert the data to JSON and print it
    echo json_encode($data);
  } else {
    echo json_encode(array('error' => 'Data selection failed'));
  }
} else {
  echo json_encode(array('error' => 'City name not received.'));
}

$con->close();
?><?php

$server = "localhost";
$user = "root";
$pass = "";
$database = "weather";

// Create a new mysqli connection
$con = new mysqli($server, $user, $pass, $database);

if ($con->connect_error) {
  die("Connection failed: " . $con->connect_error);
}

if (isset($_POST['cityName'])) {
  $cityName = $_POST['cityName'];

  // SQL query to retrieve weather data for a specific city and order by date in descending order
  $select = "SELECT * FROM weather_data WHERE city='$cityName' ORDER BY date DESC LIMIT 7";
  $selected = $con->query($select);

  $data = array(); // Create an array to store data

  if ($selected) {
    // Fetch and store the data in the array
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

    // Convert the data to JSON and print it
    echo json_encode($data);
  } else {
    echo json_encode(array('error' => 'Data selection failed'));
  }
} else {
  echo json_encode(array('error' => 'City name not received.'));
}

$con->close();
?>