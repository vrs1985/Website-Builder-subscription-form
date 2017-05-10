<?php

echo '<div class="wrapper">
        <h2 class="collect-top-heading">Welcome Mat Settings</h2>';
echo '
        <form class="collect-form" method="post" action="wbsf-options.php">';
        wp_nonce_field("update-options");
echo
          ' <table class="form-table">
              <tr valign="top">
                <th scope="row">Activate</th>
                <td>
                <input type="checkbox" name="activateWM" value=" '; echo get_option('new_option_name');  echo '"/></td>
              </tr>
              <tr valign="top">
                <th scope="row">Main Heading</th>
                <td>
                <input type="text" name="mainHeadingWM" value=" '; echo get_option('new_option 2');  echo '"/></td>
              </tr>
              <tr valign="top">
                <th scope="row">Sub Heading</th>
                <td>
                <input type="text" name="subHeadingWM" value=" '; echo get_option('new_option 3');  echo '"/></td>
              </tr>
              <tr valign="top">
                <th scope="row">Background</th>
                <td>
                <input type="url" name="new_option 4" value=" '; echo get_option('new_option 4');  echo '" placeholder="enter url"/>
                <input type="color" name="new_option 4" value=" '; echo get_option('new_option 4');  echo '"/>
                </td>
              </tr>
              <tr valign="top">
                <th scope="row">Opacity</th>
                <td>
                 0.5 <input type="radio" name="opacityWM" value=" '; echo get_option('0.5'); echo '"/> <br>
                 1.0 <input type="radio" name="opacityWM" value=" '; echo get_option('1'); echo '"/>
                </td>
              </tr>
            </table>
            <input type="hidden" name="action" value="update" />
            <input type="hidden" name="collectSettings" value="new_option_name,some_other_option,option_etc" />
            <p class="submit"> <input type="submit" class="button-primary" value="'; _e('Save Changes');  echo'" /> </p>
          </form>
          </div>';

?>