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
  this.twoHour = 7200000;
  this.delay = 20000;
  this.mat = 0;
  this.marginWelcome = 0;
  this.scrollVal = 0;
  this.storData = getSorage('subscribers');
  this.time = (this.storData)? Date.now() - this.storData.expireDuration : Date.now();
  this.oldSubscriber = (this.storData)?  this.storData.subscriber : false;
  this.LBOptions;
  this.WMOptions;
  this.emailRegex = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/i;
  this.linkRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
  this.colorRegex = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i;
  this.ipRegex = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/i;


  this.init = ()=>{
    this.LBOptions = this.getAjax('listBuilder');
    this.WMOptions = this.getAjax('welcomeMat');
    this.twoHour = this.LBOptions[2];
    this.delay = this.LBOptions[3];
  };

  function getSorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  this.checkLB = ()=>{
    if( this.oldSubscriber || window.location.href != "http://parthkapadia.com/"){
      return 'reject';
    }else if( jQuery('#quoteWindow').css('display') != 'none' ){
      return 'loop';
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
      case 'timing': // when refresh and time into storage less than set variable twoHour
        time = model.twoHour - model.time;
        break;
      case 'init': // first start plugin or if timing bigger than set variable twoHour
        time = model.delay;
        break;
      case 'loop': // when need delay launch app
        time = model.delay;
        break;
      default: // default time when all check aborted
        time = model.twoHour;
    }
    return time;
  };

  this.getAjax = (opt)=>{
    var answer;
    let data = {
      'action': 'get_wbsf_options',
      'affiliate': opt
    };

    jQuery.ajax({
      type: 'POST',
      url: myajax.url,
      async: false,
      data: data,
      dataType: 'json',
      success: function(data) {
      answer = data;
      }
    });
    return answer;
  };

  this.checkString = (val, regexp)=>{
   return regexp.test(val);
  };

  this.findElement = (elem)=>{
    let answer;
    if(model.checkString(elem, model.linkRegex)){
        answer = 'span';
     }else if(elem === 'video'){
      answer =  'video';
     }else if(model.checkString(elem, model.colorRegex)){
      answer = 'div';
     }
    return answer;
  };

  this.removeNode = node=>{
    node.parentNode.removeChild(node);
  };

  this.getParentElement = (nodes, attr, target)=>{
    let elems = nodes.parentNode.parentNode.children;
    let input;
    elems = Array.prototype.slice.call(elems);
    elems.forEach( elem=> {
      if(elem.hasAttribute(attr) && elem.getAttribute(attr) === target){
        input = elem;
      }
    });
    return input;
  };

  this.targetNodes = (collect, attr, target)=>{
    for (let key of collect){
      if(key.getAttribute(attr) === target){
        return key;
      }
    }
  };

  this.getValue = (node, val)=>{
    let element = model.getParentElement(node, 'data-event', val);
    return element.value;
  };

  this.sendEmail = (msg, event)=> {
    let data = {
      'action': 'get_email',
      'subscr_data': msg,
      'event': event
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

  this.disabledButton = (btn, value)=>{
      if(this.checkString(value, emailRegex)){
        btn.removeAttribute('disabled');
      }else{
        if(!btn.hasAttribute('disabled'))
          btn.setAttribute('disabled', '');
      }
  };

  this.smoothScroll = ()=>{
    model.mat = document.querySelector('.welcome_mat');
    model.marginWelcome = window.innerHeight;
    document.addEventListener("scroll", (e)=>{
      if(window.pageYOffset > 0 && window.pageYOffset < window.innerHeight){
        if (model.scrollVal < window.pageYOffset){
          model.marginWelcome -= 7;
        }else if(window.pageYOffset < 5){
          model.marginWelcome = window.innerHeight;
        }else{
          model.marginWelcome += 7;
        }
        model.scrollVal = window.pageYOffset;
        model.mat.style.marginTop = model.marginWelcome +'px';
      } });
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

  this.createParentElement = (className, context, media)=>{
    let element = document.createElement('div');
    element.className = className;
    element.innerHTML = context;
    (media) ? element.appendChild(media) : '';
    document.querySelector('body').appendChild(element);
  };

  this.makeElement = (tag, resource)=>{
    let backgroundElem = document.createElement(tag);
      backgroundElem.className = 'welcome_bg';
      if(tag === "video"){
        backgroundElem.type = "video/mp4";
        backgroundElem.loop = 'loop';
        backgroundElem.setAttribute("autoplay", '');
        backgroundElem.setAttribute("type", 'video/mp4');
        backgroundElem.src = "http://parthkapadia.com/wp-content/uploads/2016/05/movie.mp4";
      }else if(tag === 'div'){
        backgroundElem.style.backgroundColor = resource;
      }else if(tag === 'span'){
        backgroundElem.style.backgroundImage = 'url(' + resource + ')';
        backgroundElem.style.backgroundSize = '100% 100%';
        backgroundElem.style.backgroundRepeat = 'no-repeat';
      }
      return backgroundElem;
  };

  this.listBuilder = ()=>{
    if(!view.model.LBOptions[1])
      return;
    let html = `<div class="subscriber_overlay"><div class="subscriber_box">
                      <span class="subscriber_close" data-event='close'><i class="fa fa-times" aria-hidden="true"></i></span>
                      <p class="subscriber_heading">Join my IoT newsletter</p>
                      <p class="subscriber_sentence">Stay up to date with the latest tech trends!</p>
                        <input type="email" class='subscriber_email' title="Email" id="subscr_email" data-event='input' value="" maxlength="30" required placeholder="Enter your email">
                        <input type="hidden" data-event="event" value="listBuilder">
                        <div>
                        <input id="subscriberSubmit" disabled class="subscriber_btn" type="submit" data-event='submit' value="Subscribe Now">
                      </div></div></div>`;
    view.createParentElement("subscriber", html, false);
  };

  this.welcomeMat = ()=>{
    if(!view.model.WMOptions[1])
      return;
    let mediaElem;
    let tag = view.model.findElement(view.model.WMOptions[5]);
      mediaElem = view.makeElement(tag, view.model.WMOptions[5]);
    let html =  `<div class="welcome_box">
        <span class="welcome_heading">`+view.model.WMOptions[2]+`</span>
        <span class="welcome_sentence"><i>`+view.model.WMOptions[3]+`</i></span>
        <input class="welcome_input" type="email" data-event='input' name="" value='' required placeholder="Your email address">
        <input type="hidden" data-event="event" value="`+view.model.WMOptions[4]+`">
        <div class="btn_group">
          <span id="welcomeSubmit" class="welcome_btn" data-event='submit'>Submit</span>
          <span id="welcomeClose" class="welcome_btn" data-event='close'>No Thank's</span></div>
        <div class="welcome_arrow" data-event='close'>
          <i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>`;
      view.createParentElement("welcome_mat", html, mediaElem);
      view.model.smoothScroll();
  };


  this.init();
}


function AppCtrl(model, view) {
  let ctrl = this;
  this.model = model;
  this.view = view;

  this.init = ()=>{
    this.launcher();
  };

  this.getSubscribeButton =()=>{
    let subscrBtn =  document.querySelectorAll('.subscriber, .subscriber [data-event]');
    this.checkInput(subscrBtn);
    this.listeners(subscrBtn);
  };

  this.getMatButton =()=>{
    let matBtn = document.querySelectorAll('.welcome_mat, .welcome_mat [data-event]');
    this.listeners(matBtn);
  };

  this.checkInput = (val)=>{
    let input = ctrl.model.targetNodes(val, 'data-event', 'input');
    let submit = ctrl.model.targetNodes(val, 'data-event', 'submit');
    input.addEventListener('keyup', (e)=>{
      let inputVal = e.target.value;
      this.model.disabledButton(submit, inputVal);
    });
  };

  this.listeners = (data)=>{
    let aim = data;
    for(let i=1, size = aim.length; i<size; i++ ){
        aim[i].addEventListener("click", (e)=>{
          if ( e.currentTarget.getAttribute('data-event') === 'submit') {
            let inputVaue = ctrl.model.getValue(e.currentTarget, 'input');
            if(ctrl.model.checkString(inputVaue, ctrl.model.emailRegex)){
              let event = ctrl.model.getValue(e.currentTarget, 'event');
              ctrl.model.sendEmail(inputVaue, event);
              ctrl.model.storeMarker(true);
              ctrl.model.removeNode(aim[0]);
                if( (JSON.parse(localStorage.getItem('subscribers'))).subscriber &&
                 e.currentTarget.getAttribute('id') != 'welcomeSubmit' ){
                  ctrl.model.removeNode(document.querySelector('.welcome_mat'));
                }
            }
          }else if( e.currentTarget.getAttribute('data-event') === 'close'){
            ctrl.model.removeNode(aim[0]);
          }
        });
      }
  };

  this.launcher = ()=>{
    if(ctrl.model.checkLB() === 'reject'){
      return;
    }
    if(ctrl.model.checkLB() === 'loop'){
      setTimeout( ctrl.launcher, ctrl.model.timing(ctrl.model.checkLB()));
      return;
    }else if(ctrl.model.checkLB() === 'timing'){
      setTimeout( ctrl.launchLB, ctrl.model.timing(ctrl.model.checkLB()));
    }else{
      setTimeout( ctrl.launchLB, ctrl.model.timing('init'));
    }

    ctrl.view.welcomeMat();
    ctrl.getMatButton();
  };

  this.launchLB = ()=>{
    if(ctrl.model.checkLB() === 'timeout'){
      setTimeout( ctrl.launchLB, ctrl.model.twoHour);
      return;
    }

    ctrl.model.storeMarker(false);
    ctrl.view.listBuilder();
    ctrl.getSubscribeButton();
    setTimeout( ctrl.launchLB, ctrl.model.twoHour);
    };

  this.init();
}


document.addEventListener("DOMContentLoaded", initApp );