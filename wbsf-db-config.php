<?php

global $collect_db_version;
$collect_db_version = "0.1.1";

function tbl_install() {
   global $wpdb;
   global $collect_db_version;

  $charset_collate = $wpdb->get_charset_collate();
  $table_name = $wpdb->prefix . "subscribers";
  if($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {

  $sql = "CREATE TABLE $table_name (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
    name varchar(35) DEFAULT 'unknow' NOT NULL,
    email varchar(35) NOT NULL,
    UNIQUE KEY id (id)
  ) $charset_collate;";

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );

      add_option("collect_db_version", $collect_db_version);

}
}

function tbl_install_data() {
  global $wpdb;

  $welcome_name = "Test name";
  $welcome_email = "test@email.com";

  $table_name = $wpdb->prefix . "subscribers";

  $wpdb->insert(
    $table_name,
    array(
      "time" => current_time( "mysql" ),
      "name" => $welcome_name,
      "email" => $welcome_email,
    )
  );
}



   ?>