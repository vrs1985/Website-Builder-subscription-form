<?php

echo '<div class="wrapper">
        <h2 class="collect-top-heading">List Builder Settings</h2>';
echo '
        <form class="collect-form" method="post" action="wbsf-options.php">'
        ?>
        <?php
        wp_nonce_field("update-options");
        ?>
        <?php echo
          ' <table class="form-table">
              <tr valign="top">
                <th scope="row">Activate</th>
                <td>
                <input type="checkbox" name="activateListBuilder" value=" '?><?php echo get_option('new_option_name'); ?><?php echo '"/></td>
              </tr>
              <tr valign="top">
                <th scope="row">Timeout</th>
                <td>
                <input type="text" name="new_option_name" value=" '?><?php echo get_option('new_option_name'); ?><?php echo '"/></td>
              </tr>
              <tr valign="top">
                <th scope="row">Timing</th>
                <td>
                <input type="text" name="new_option 2" value=" '?><?php echo get_option('new_option 2'); ?><?php echo '"/></td>
              </tr>
            </table>
            <input type="hidden" name="action" value="update" />
            <input type="hidden" name="collectSettings" value="new_option_name,some_other_option,option_etc" />
            <p class="submit"> <input type="submit" class="button-primary" value="'?><?php _e('Save Changes') ?><?php echo'" /> </p>
          </form>
          </div>';

?>