<?php

class mainClass_collect_email {
  public function initialize()
  {
    add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_styles') );
    add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles') );
  }

  public function admin_enqueue_styles() {
    wp_enqueue_style(
        'collect-email-options-admin',
        plugins_url( 'collect-email/assets/css/admin.css' ),
        array(),
        '0.1.0'
      );
  }
  public function enqueue_styles() {
    wp_enqueue_style(
        'collect-email-options',
        plugins_url( 'collect-email/assets/css/public.css' ),
        array(),
        '0.1.0'
      );
  }

}

?>