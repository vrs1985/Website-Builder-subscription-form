"use strict";

function initApp() {
  var App = this;
      this.model = new AppModel();
      this.view = new AppView(this.model);
      this.controller = new AppCtrl(this.model, this.view);
}

function AppModel (){
  let model = this;
  this.time;
  this.oldSubscriber;
  this.twoHour = 1000*3600*2;
  this.delay = 20000;
  this.storData = JSON.parse(localStorage.getItem('subscribers'));
  this.time = (this.storData)? Date.now() - this.storData.expireDuration : Date.now();
  this.oldSubscriber = (this.storData)?  this.storData.subscriber : false;


  this.init = ()=>{
  };

  this.checkLB = ()=>{
    if( this.oldSubscriber /*|| window.location.href != "http://parthkapadia.com/"*/){
      return 'reject';
    /*}else if( jQuery('#quoteWindow').css('display') != 'none' ){
      return 'loop';*/
    }else if( this.time < this.twoHour ){
      return 'timing';
    }else if(document.querySelector('.subscriber')){
      return 'timeout';
    }else{
      return 'init';
    }
  };

  this.timing = action=>{
    let time;
    switch (action){
      case 'timing':
        time = model.twoHour;
        break;
      case 'init':
        time = model.delay;
        break;
      case 'loop':
        time = model.twoHour - model.time;
        break;
      default:
        time = model.twoHour;
    }
    return time;
  };


  this.checkEmail = val=>{
   return /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i.test(val);
  };

  this.removeNode = node=>{
    node.parentNode.removeChild(node);
  };

  this.getInputValue = selector=>{
    return document.querySelector( selector ).value;
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
    let subscriber = (arg) ? true : (this.oldSubscriber) ? this.oldSubscriber : false;
    let value = {"subscriber": subscriber, "expireDuration": Date.now()};
    localStorage.setItem('subscribers', JSON.stringify(value));
  };


  this.init();
}


function AppView(model) {
  let view = this;
  this.model = model;
  this.closeSubscr;
  this.subscriber;
  this.init = ()=>{
  };

  this.createListBuilder = ()=>{
    let popUp = document.createElement('div');
    popUp.className = "subscriber";
    let html = `<div class="subscriber_overlay"><div class="subscriber_box">
                      <span class="subscriber_close"><i class="fa fa-times" aria-hidden="true"></i></span>
                      <p class="subscriber_heading">Join my IoT newsletter</p>
                      <p class="subscriber_sentence">Stay up to date with the latest tech trends!</p>
                      <form><div class="subscriber_email">
                        <input type="email" title="Email" id="subscr_email" value="" maxlength="30" required placeholder="Enter your email">
                      </div><div>
                        <input id="subscriberSubmit" class="subscriber_btn" type="submit" value="Subscribe Now">
                      </div></form></div></div>`;
    popUp.innerHTML = html;
    document.querySelector('body').appendChild(popUp);
  };

  this.welcomeMat = ()=>{
    console.log('welcome');
  };


  this.init();
}


function AppCtrl(model, view) {
  let ctrl = this;
  this.model = model;
  this.view = view;

  this.init = ()=>{
    this.model.storeMarker(false);
    this.launchListBuilder();
  };

  this.getButton =()=>{
    this.closeSubscr =  document.querySelectorAll('.subscriber_close, #subscriberSubmit');
    this.subscriber = document.getElementsByClassName('subscriber')[0];
    this.listeners();
  };

  this.listeners = ()=>{
    for(let i=0, size = this.closeSubscr.length; i<size; i++ ){
        this.closeSubscr[i].addEventListener("click", (e)=>{
          if ( e.currentTarget.getAttribute('id') === 'subscriberSubmit') {
            let inputEmail = this.model.getInputValue('#subscr_email');
            if(this.model.checkEmail(inputEmail)){
              this.model.sendEmail(inputEmail);
              this.model.storeMarker(true);
              this.model.removeNode(this.subscriber);
            }else{
              alert('sorry email incorrect');
              return;
            };
          }else{
            this.model.removeNode(this.subscriber);
          }
        }, false);
      }
  };

  this.launchListBuilder = ()=>{
    if(this.model.checkLB() === 'reject'){
      return;
    }

    let time = this.model.timing(this.model.checkLB());

    setTimeout( function(){
      ctrl.view.createListBuilder();
      ctrl.getButton();
    }, time);

  };

  this.init();
}


document.addEventListener("DOMContentLoaded", initApp );