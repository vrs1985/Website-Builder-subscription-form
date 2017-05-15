<?php
/*
Plugin Name: Website Builder subscription form (wbsf)
Description: plugin include pop up window and welcome mat wchil hepls collect email subscribers
Version: 0.1.0
Author: Vladimir Komisarenko
Licence: GPL-2.0+
*/

if(!defined( 'WPINC' )){
    die;
}

require_once( plugin_dir_path( __FILE__ ) . 'wbsf-tune_plugin.php');
require_once( plugin_dir_path( __FILE__ ) . 'wbsf-save-subscriber.php' );
require_once( plugin_dir_path( __FILE__ ) . 'wbsf-db-config.php');
require_once( plugin_dir_path( __FILE__ ) . 'wbsf-enqueue-Class.php' );
require_once( plugin_dir_path( __FILE__ ) . 'wbsf-delete-subscriber.php' );
register_activation_hook(__FILE__, 'tbl_install');
register_activation_hook(__FILE__, 'tbl_install_data' );


require_once( plugin_dir_path( __FILE__ ) . 'wbsf-admin-page.php');

function collect_email_start(){
    $collection_email = new mainClass_collect_email();
    $collection_email -> initialize();
}

collect_email_start();
?>