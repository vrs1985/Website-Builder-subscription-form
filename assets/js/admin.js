(function($){
  'use strict';
  $(function(){
    $('.remove-subscriber').click(function(event){
      var id = $(this).attr('data-user');
      var removeSubscriber = confirm("Are you sure to remove user " + id + " ?");
      if(removeSubscriber){
        removeUser(id);
        $(this).parents('tr').css({'background-color': '#ccc', 'color': '#aaa'});
        $(this).html('removed').removeClass('remove-subscriber');
      }
      event.stopPropagation();
    } );
    function removeUser(id) {
         var data = {
      'action': 'rmv_user',
      'user_id': id
    };
    jQuery.post(adminAjax.url, data, function(response) {
      alert('client ' + response + ' was removed');
    });
    }
  });

})(jQuery);