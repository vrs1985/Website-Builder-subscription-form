<?php

add_action( 'admin_menu', 'wbsf_menu');

   function wbsf_menu(){
       if (function_exists('add_options_page')) {
        add_menu_page (
          'wbsf' ,
          'wbsf' ,
          8 ,
          'wbsf_admin-settings.php' ,
          'wbsf_user_list' );
  }
}

  function wbsf_user_list()
  {
    include 'wbsf_get-user-list.php';
  }


add_action( 'admin_menu', 'wbsf_submenu_page');

function wbsf_submenu_page(){
  add_submenu_page( 'wbsf_admin-settings.php', 'Settings', 'list builder opt', 8, 'wbsf list builder settings', 'list_builder_page');
  add_submenu_page( 'wbsf_admin-settings.php', 'Settings', 'welcome mat opt', 8, 'wbsf welcome mat settings', 'welcome_mat_page');
}

function list_builder_page() {
  include 'wbsf-list_builer_settings.php';
}
function welcome_mat_page()
{
  include 'wbsf-welcome_mat_settings.php';
}

?>