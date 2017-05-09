"use strict";

/*var mouseLeaveCounter = 0;*/
function initApp() {
  var App = this;
  this.time;
  this.oldSubscriber;
  this.twoHour = 1000*36;
  this.storData = JSON.parse(localStorage.getItem('subscribers'));
  this.time = (this.storData)? Date.now() - this.storData.expireDuration : Date.now();
  this.oldSubscriber = (this.storData)?  this.storData.subscriber : false;

    if( this.oldSubscriber /*|| window.location.href != "http://parthkapadia.com/"*/){ console.log('reject');
      return;
    /*}else if( jQuery('#quoteWindow').css('display') != 'none' ){
      setTimeout(initApp, 15000); console.log('loop');
      return;*/
    }else if( this.time < this.twoHour ){ console.log('timing', Math.round((this.twoHour - this.time)/1000), this.time < this.twoHour);
      setTimeout(initApp, this.twoHour - this.time);
    }else if(document.querySelector('.subscriber')){
      setTimeout(initApp, this.twoHour );
      return;
    }else{ console.log('init');
      this.model = new AppModel();
      this.view = new AppView(this.model);
      this.controller = new AppCtrl(this.model, this.view);
      setTimeout(initApp, this.twoHour);
    }

};
var counterClose = 0;

document.addEventListener("DOMContentLoaded", ()=>{setTimeout(initApp, 2000);} );
// BEGIN MODEL
function AppModel (){
  let model = this;
  this.init = ()=>{
  };

this.checkEmail = val=>{
 return /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i.test(val);
};

this.sendEmail = msg=> {
    var data = {
      'action': 'get_email',
      'subscr_data': msg
    };
    jQuery.post(myajax.url, data, function(response) {
      alert('thank you ' + response + ' was added');
    });
};

this.storeMarker = (arg)=>{
  let value = {"subscriber": arg, "expireDuration": Date.now()};
  localStorage.setItem('subscribers', JSON.stringify(value));
};

this.init();
};
// BEGIN VIEW
function AppView(model) {
  // if(model.getMarker)
  //   return;
  let view = this;
  this.model = model;
  this.popUp = document.createElement('div');
  this.popUp.className = "subscriber";
  this.html = `<div class="subscriber_overlay">
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
  this.popUp.innerHTML = this.html;
  document.querySelector('html').appendChild(this.popUp);

}
// BEGIN CONTROLLER
function AppCtrl(model, view) {
  let ctrl = this;
  this.model = model;
  this.view = view;
  this.closeSubscr =  document.querySelectorAll('.subscriber_close, #subscriberSubmit');
  this.subscriber = document.getElementsByClassName('subscriber')[0];
  this.subscriber.style.display = 'block';

  this.init = ()=>{
    this.listeners();
    this.model.storeMarker(false);
  };


  this.listeners = ()=>{
      for(let i=0, size = this.closeSubscr.length; i<size; i++ ){
        this.closeSubscr[i].addEventListener("click", (e)=>{
          if ( e.currentTarget.getAttribute('id') === 'subscriberSubmit') {
            let inputEmail = document.querySelector('#subscr_email').value;
            if(this.model.checkEmail(inputEmail)){
              this.model.sendEmail(inputEmail);
              this.model.storeMarker(true);
              this.subscriber.parentNode.removeChild(this.subscriber);
              document.querySelector('body').style.display = 'block';
            }else{
              alert('sorry email incorrect');
              return;
            };
          }else{
            this.subscriber.parentNode.removeChild(this.subscriber);
            document.querySelector('body').style.display = 'block';
          }
        }, false);
      }/*
      document.addEventListener("mouseleave", (e)=>{
        let move = e;
        if(move.clientY < 0 && mouseLeaveCounter < 1){
          initApp();
          mouseLeaveCounter++;
        }
      });*/
}


this.init();
}
