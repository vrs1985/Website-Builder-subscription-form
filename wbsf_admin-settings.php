<?php

echo '<div class="wrapper">
        <h2 class="collect-top-heading">Main Settings</h2>';
echo '
        <div class="collect-btn-group">
          <button class="collect-toogle-options">options</button>
          <button class="collect-toogle-options">subscribers</button>
        </div>
        <form class="collect-form" method="post" action="wbsf-options.php">'
        ?>
        <?php
        wp_nonce_field("update-options");
        ?>
        <?php echo
          ' <table class="form-table">
              <tr valign="top">
                <th scope="row">New Option Name</th>
                <td>
                <input type="text" name="new_option_name" value=" '?><?php echo get_option('new_option_name'); ?><?php echo '"/></td>
              </tr>
              <tr valign="top">
                <th scope="row">New Option 2</th>
                <td>
                <input type="text" name="new_option 2" value=" '?><?php echo get_option('new_option 2'); ?><?php echo '"/></td>
              </tr>
              <tr valign="top">
                <th scope="row">New Option 3</th>
                <td>
                <input type="text" name="new_option 3" value=" '?><?php echo get_option('new_option 3'); ?><?php echo '"/></td>
              </tr>
              <tr valign="top">
                <th scope="row">New Option 4</th>
                <td>
                <input type="text" name="new_option 4" value=" '?><?php echo get_option('new_option 4'); ?><?php echo '"/></td>
              </tr>
              <tr valign="top">
                <th scope="row">New Option 5</th>
                <td>
                <input type="text" name="new_option 5" value=" '?><?php echo get_option('new_option 5'); ?><?php echo '"/></td>
              </tr>
            </table>
            <input type="hidden" name="action" value="update" />
            <input type="hidden" name="collectSettings" value="new_option_name,some_other_option,option_etc" />
            <p class="submit"> <input type="submit" class="button-primary" value="'?><?php _e('Save Changes') ?><?php echo'" /> </p>
          </form>
          </div>';

?>