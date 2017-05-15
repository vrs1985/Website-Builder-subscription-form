<?php
global $wpdb;

$table_name = $wpdb->prefix . "subscribers";
$subscribers = $wpdb->get_results( "SELECT * FROM $table_name" );

echo "<h2>Subscribers</h2>";
echo "<table class='subscribers-table'> <thead><th>Number</th><th>Registration</th><th>Name</th><th>Email</th><th>Event</th><th>IP</th><th>Action</th> </thead><tbody>";

for($i=0, $size = count($subscribers); $i < $size; $i++){
  echo "<tr>
 <td>" . $subscribers[$i]->id . "</td>
 <td>" . $subscribers[$i]->time . "</td>
 <td>" . $subscribers[$i]->name . "</td>
 <td href='mailto:".$subscribers[$i]->email."'>" . $subscribers[$i]->email . "</td>
 <td>" . $subscribers[$i]->event . "</td>
 <td>" . $subscribers[$i]->IP . "</td>
 <td> <span class='remove-subscriber' data-user='" . $subscribers[$i]->id . "'>remove<span></td>
 </tr>";
}
echo "</tbody></table>";
?>