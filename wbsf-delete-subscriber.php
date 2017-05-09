<?php

add_action( 'admin_enqueue_scripts', 'deleteUser', 99);

function deleteUser($hook) {
  wp_enqueue_script( 'ajax-script', plugins_url( '/assets/js/admin.js', __FILE__ ), array('jquery'), '0.1.0' );
  // in JavaScript, object properties are accessed as ajax_object.ajax_url, ajax_object.we_value
  wp_localize_script( 'ajax-script', 'adminAjax',
            array( 'url' => admin_url( 'admin-ajax.php' ) ) );
}


// Same handler function...
add_action('wp_ajax_rmv_user', 'remove_user_callback');
function remove_user_callback() {
  global $wpdb;
  $user_id = $_POST['user_id'];
  $table_name = $wpdb->prefix . "subscribers";
  echo  $user_id;
  $wpdb->delete( $table_name, array( 'id' => $user_id ));
  wp_die();
}


?>