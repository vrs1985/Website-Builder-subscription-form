<?php

echo '<div class="wrapper">
        <h2 class="collect-top-heading">List Builder Settings</h2>';
echo '
        <form class="collect-form" method="post" action="options.php">';
        wp_nonce_field("update-options");
        ?>
        <?php echo
          ' <table class="form-table">
              <tr valign="top">
                <th scope="row">Activate</th>
                <td>
                <input type="checkbox" name="activateLB" value="true" checked /></td>
              </tr>
              <tr valign="top">
                <th scope="row">Delay
                </th>
                <td>
                <select name="delayLB">
                <option value="60000">1min</option>
                <option value="120000" selected>2min</option>
                <option value="300000">5min</option>
                <option value="600000">10min</option>
                </select> - last value:
                '; echo get_option('delayLB') / (1000*60) . ' min';  echo '
              </tr>
              <tr valign="top">
                <th scope="row">Timing
                </th>
                <td>
                <select name="timingLB">
                <option value="60000"> 1 min </option>
                <option value="900000"> 15 min </option>
                <option value="1800000"> 30 min </option>
                <option value="3600000"> 1h </option>
                <option value="5400000"> 1h30min </option>
                <option value="7200000" selected> 2h </option>
                <option value="86400000"> 1day </option>
                </select> - last value: '; echo get_option('timingLB') / (1000*60) . ' min';  echo '
                </td>
              </tr>
            </table>
            <input type="hidden" name="action" value="update" />
            <input type="hidden" name="page_options" value="activateLB, delayLB, timingLB" />
            <p class="submit"> <input type="submit" class="button-primary" value="'?><?php _e('Save Changes') ?><?php echo'" /> </p>
          </form>
          </div>';

?>