<?php

$optionWM = get_option('wbsfWM');
$optionWM = json_encode ( $optionWM );
echo '<div class="wrapper">
        <h2 class="collect-top-heading">Welcome Mat Settings</h2>
        <form class="collect-form" method="post" action="options.php">';
        wp_nonce_field("update-options");
echo
          ' <table class="form-table">
              <tr valign="top">
                <th scope="row">Activate</th>
                <td>
                <input type="checkbox" name="activateWM" value="true" checked />
                </td>
                <td>
                </td>
              </tr>
              <tr valign="top">
                <th scope="row">Main Heading</th>
                <td>
                <input type="text" name="mainHeadingWM" value="'; echo get_option('mainHeadingWM');  echo '"/>
                </td>
                <td>
                </td>
              </tr>
              <tr valign="top">
                <th scope="row">Sub Heading</th>
                <td>
                <input type="text" name="subHeadingWM" value=" '; echo get_option('subHeadingWM');  echo '"/>
                </td>
                <td>
                </td>
              </tr>
              <tr valign="top">
                <th scope="row">Event <br>
                    *<small><em>default: Welcome Mat</em></small>
                </th>
                <td>
                <input type="text" name="eventWM" value=" '; echo get_option('eventWM');  echo '"/> - enter your event which will save into table
                </td>
                <td>
                </td>
              </tr>
              <tr valign="top">
                <th scope="row">Background <br>
                      *<small><em>choose only one options</em></small>
                </th>
                <td>
                <input type="radio" id="wmbg1" name="BackgroundWM" value="" />
                <input type="url" id="wmpicture" name="pictureWM" onchange="valueWM(\'wmbg1\', \'wmpicture\')" value="" placeholder="enter url"/>
                   - enter link on picture<br>
                <input type="radio" id="wmbg2" name="BackgroundWM" value="video"/>
                   - use video<br>
                <input type="radio" id="wmbg3" name="BackgroundWM" value="#000" checked />
                <input type="color" id="wmcolor" class="colorPicker" name="colorPickerWM" onchange="valueWM(\'wmbg3\', \'wmcolor\')" value=""/>
                </td>
                <td>
                </td>
              </tr>
            </table>
            <input type="hidden" name="action" value="update" />
            <input type="hidden" name="page_options" value="activateWM, mainHeadingWM, subHeadingWM, eventWM, BackgroundWM, opacityWM" />
            <p class="submit"> <input type="submit" class="button-primary" value="'; _e('Save Changes');  echo'" /> </p>
          </form>
          <script>
            function valueWM(a, b){
              console.log(document.getElementById(b).value);
              document.getElementById(a).value = document.getElementById(b).value;
            }
          </script>
          </div>';

?>