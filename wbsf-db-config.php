<?php

global $collect_db_version;
$collect_db_version = "0.1.2";

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

$installed_ver = get_option( "collect_db_version" );

   if( $installed_ver != $collect_db_version ) {

    $sql = "CREATE TABLE $table_name (
      id mediumint(9) NOT NULL AUTO_INCREMENT,
      time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
      name varchar(35) DEFAULT 'unknow' NOT NULL,
      email varchar(35) NOT NULL,
      event varchar(35) DEFAULT 'Welcome Mat' NOT NULL,
      IP varchar(11),
      UNIQUE KEY id (id)
    ) $charset_collate;";

      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
      dbDelta($sql);

      update_option( "jal_db_version", $jal_db_version );
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

add_option("activateWM", "true");
add_option("mainHeadingWM", "Stay on top of the latest in IoT");
add_option("subHeadingWM", "Don't fall behind...");
add_option("eventWM", "Welcome Mat");
add_option("BackgroundWM", "#ccc");
add_option("activateLB", "true");
add_option("timingLB", "7200000");
add_option("delayLB", "2000");

   ?>