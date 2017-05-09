
(function InputManager() {
  let popUp = document.createElement('div');
  this.init = ()=>{
    this.listeners();
    // this.mat = document.getElementsByClassName('welcome_mat')[0];
    // this.marginWelcome = this.mat.offsetTop;
    // this.scrollVal = 0;
    // this.close = document.body.querySelectorAll("[data-close='welcome']");

  };

  popUp.className = "subscriber";
  let html = `<div class="subscriber_overlay">
                    <div class="subscriber_box">
                      <span class="subscriber_close">
                        <i class="fa fa-times" aria-hidden="true"></i>
                      </span>
                      <p class="subscriber_heading">Join my IoT newsletter</p>
                      <p class="subscriber_sentence">Stay up to date with the latest tech trends!</p>
                      <form>
                      <div class="subscriber_email">
                        <input type="email" title="Email" id="subscr_email" value="" maxlength="30" required placeholder="Enter your email">
                      </div>
                      <div >
                        <input id="subscriberSubmit" class="subscriber_btn" type="submit" value="Subscribe Now">
                      </div>
                      </form>
                    </div>
                  </div>`;
  popUp.innerHTML = html;
  document.querySelector('html').appendChild(popUp);

  this.listeners = ()=>{
    let closeSubscr =  document.querySelectorAll('.subscriber_close, #subscriberSubmit');
    let subscriber = document.getElementsByClassName('subscriber')[0];
      subscriber.style.display = 'block';
      for(let i=0, size = closeSubscr.length; i<size; i++ ){
        closeSubscr[i].addEventListener("click", (e)=>{
          if ( e.currentTarget.getAttribute('id') === 'subscriberSubmit') {
            let inputEmail = document.querySelector('#subscr_email').value;
            if(checkEmail(inputEmail)){
              sendEmail(inputEmail);
              localStorage.setItem('subscriber', 'true');
              subscriber.parentNode.removeChild(subscriber);
              document.querySelector('body').style.display = 'block';
            }else{
              alert('sorry email incorrect');
              return;
            };
          }else{
            subscriber.parentNode.removeChild(subscriber);
            document.querySelector('body').style.display = 'block';
          }
        }, false);
      }
}


  document.addEventListener("DOMContentLoaded", ()=>{
    this.init();
    document.querySelector('body').style.display = 'none';
  });


// document.addEventListener("scroll", (e)=>{
//     if(window.pageYOffset > 0 && window.pageYOffset < window.innerHeight){
//       if (this.scrollVal < window.pageYOffset){
//         this.marginWelcome -= 7;
//       }else if(window.pageYOffset < 5){
//         this.marginWelcome = window.innerHeight;
//       }else{
//         this.marginWelcome += 7;
//       }
//       this.scrollVal = window.pageYOffset;
//       this.mat.style.marginTop = this.marginWelcome +'px';
//     }
//   });

// function listeners() {
//   for(let i = 0; i < 2; i++){
//     this.close[i].addEventListener('click', ()=>{
//       this.mat.parentNode.removeChild(this.mat);
//     });
//   }
// }

})();

function checkEmail(val) {
 return /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i.test(val);
}

function sendEmail(msg) {
    var data = {
      'action': 'get_email',
      'subscr_data': msg
    };
      jQuery.post(myajax.url, data, function(response) {
        alert('thank you' + response + ' was added');
      });
}

  // jQuery("#subscriberSubmit").submit(function(e) {
  //   var getValue = jQuery('input[name="subscr_email"]').val();

  //   var data = {
  //     'action': 'get_email',
  //     'subscr_data': jQuery('input[name="subscr_email"]').val()
  //   };

  // jQuery.post(myajax.url, data, function(response) {
  //   alert('thank you' + response);
  // });

// });
// });

// jQuery("#subscriberSubmit").click(function() {
//                 var formData= jQuery(this).serialize();
//                 jQuery.ajax({
//                 type: 'POST',
//                 url: 'save-subscriber.php',
//                 data: formData,
//                success: function(data){
//                     if (data['error']) {
//                         console.log(data['error']);
//                     } else {
//                         console.log('Письмo oтврaвлeнo! =)');
//                     }
//                  },
//                error: function (xhr, ajaxOptions, thrownError) {
//                     console.log(xhr.status);
//                     console.log(thrownError);
//                  }
//             });
//         });




function StorageManager() {
  this._subscriber = "subscriber";
  this.storage = window.localStorage;
};
StorageManager.prototype = {
  constructor : StorageManager
};
StorageManager.prototype.setData = function (id) {
  this.storage.setItem(this._subscriber, id);
};
StorageManager.prototype.getData = function () {
  return this.storage.getItem(this._subscriber);
};
StorageManager.prototype.removeData = function () {
  this.storage.removeItem(this._subscriber);
};