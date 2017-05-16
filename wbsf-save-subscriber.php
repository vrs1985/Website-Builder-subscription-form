<?php


add_action('wp_ajax_get_email', 'my_action_callback');
add_action( 'wp_ajax_nopriv_get_email', 'my_action_callback' );

function my_action_callback() {
  global $wpdb;
  $user_email = $_POST['subscr_data'];
  $user_name = 'Mr. Undefined';
  $event = $_POST['event'];
  $table_name = $wpdb->prefix . "subscribers";
  echo 'Your email ' . $user_email;
  $wpdb->insert(
    $table_name,
    array(
      "time" => current_time( "mysql" ),
      "name" => $user_name,
      "email" => $user_email,
      "event" => $event
    )
  );
  wp_die();
}

?>