<?php

add_action( 'wp_enqueue_scripts', 'my_enqueue', 99);

function my_enqueue($hook) {
  wp_enqueue_script( 'ajax-script', plugins_url( '/assets/js/cubic.js', __FILE__ ), array('jquery') );
  wp_localize_script( 'ajax-script', 'myajax',
            array( 'url' => admin_url( 'admin-ajax.php' ) ) );
}

add_action('wp_ajax_get_wbsf_options', 'wbsf_options');
add_action('wp_ajax_nopriv_get_wbsf_options', 'wbsf_options');

function wbsf_options(){
  $wbsf_affiliate = $_POST['affiliate'];
  if($wbsf_affiliate === 'welcomeMat'){
    $activateWM = get_option("activateWM");
    $mainHeadingWM = get_option("mainHeadingWM");
    $subHeadingWM = get_option("subHeadingWM");
    $eventWM = get_option("eventWM");
    $BackgroundWM = get_option("BackgroundWM");
    echo json_encode(array("1"=> $activateWM, "2"=>$mainHeadingWM, "3"=>$subHeadingWM, "4"=>$eventWM, "5"=>$BackgroundWM)) ;
  }elseif($wbsf_affiliate === 'listBuilder'){
    $activateLB = get_option("activateLB");
    $timingLB = get_option("timingLB");
    $delayLB = get_option("delayLB");
    echo json_encode(array("1"=> $activateLB, "2"=>$timingLB, "3"=>$delayLB)) ;
  }


  wp_die();
}


?>