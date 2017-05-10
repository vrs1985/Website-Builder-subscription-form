<?php

class mainClass_collect_email {
  public function initialize()
  {
    add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_styles') );
    add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles') );
  }

  public function admin_enqueue_styles() {
    wp_enqueue_style(
        'wbsf-admin-style',
        plugins_url( 'wbsf/assets/css/admin.css' ),
        array(),
        '0.1.1'
      );
  }
  public function enqueue_styles() {
    wp_enqueue_style(
        'wbsf-user-style',
        plugins_url( 'wbsf/assets/css/public.css' ),
        array(),
        '0.1.1'
      );
  }

}

?>