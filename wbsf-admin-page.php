<?php

add_action( 'admin_menu', 'collect_email_settings');

   function collect_email_settings(){
       if (function_exists('add_options_page')) {
        add_menu_page (
          'wbsf' ,
          'wbsf' ,
          8 ,
          'wbsf_admin-settings.php' ,
          'wbsf' );
  }
}

  function wbsf()
  {
    include 'wbsf_get-user-list.php';
  }


?>