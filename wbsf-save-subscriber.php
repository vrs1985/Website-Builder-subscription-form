<?php

add_action( 'wp_enqueue_scripts', 'my_enqueue', 99);

function my_enqueue($hook) {
  wp_enqueue_script( 'ajax-script', plugins_url( '/assets/js/cubic.js', __FILE__ ), array('jquery') );
  // in JavaScript, object properties are accessed as ajax_object.ajax_url, ajax_object.we_value
  wp_localize_script( 'ajax-script', 'myajax',
            array( 'url' => admin_url( 'admin-ajax.php' ) ) );
}


// Same handler function...
add_action('wp_ajax_get_email', 'my_action_callback');
add_action( 'wp_ajax_nopriv_get_email', 'my_action_callback' );
function my_action_callback() {
  global $wpdb;
  $user_email = $_POST['subscr_data'];
  $user_name = 'Mr. Undefined';
  $table_name = $wpdb->prefix . "subscribers";
  echo 'your email ' . $user_email;
  $wpdb->insert(
    $table_name,
    array(
      "time" => current_time( "mysql" ),
      "name" => $user_name,
      "email" => $user_email,
    )
  );
  wp_die();
}

//   if (empty($_POST['email'])) {
//   echo '<script>alert("Field email incorrect");</script>';
//   } elseif(isset($_POST['email']))  {
//   $user_name = $_POST['name'];
//   $user_email = $_POST['email'];
//   $table_name = $wpdb->prefix . "subscribers";
//   $wpdb->insert(
//     $table_name,
//     array(
//       "time" => current_time( "mysql" ),
//       "name" => $user_name,
//       "email" => $user_email,
//     )
//   );
//   }


?>