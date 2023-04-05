// 이벤트
var LOCA2_UI = (function (lc, $) {
  lc.init = function () {
      //공통 스크립트
      lc.browersCheck.init();
      lc.header.init();
      lc.inputUnit.init();
      lc.tabs.init();
      lc.anchor.init();
      lc.accordion.init();
      lc.toolTip.init();
      lc.layerPopup.init();
      lc.selectBox.init();
      lc.setARIA.init();
      lc.inputSelector.init();
      lc.gnb.init();
      //lc.numberCounter.init(); //21-08-27 개별 동작하도록 수정
      //lc.evtDetail.init();
      lc.termsTab.init();
      lc.hrFocusHidden.init();//21-08-30 [접급성] 논리적 의미를 갖지 않는 요소 숨김
  }

  // 브라우저 체크
  lc.browersCheck = {
      init: function() {
          this._setBrowersCheck();
          this._setDeviceCheck();
      },
      _setBrowersCheck(compatibilityView, return_text) {
          /*
          var broswer = navigator.userAgent.toLocaleLowerCase();
          if(-1 != broswer.indexOf("chrome")){
              $("body").addClass("chrome");
          }
          */

          'use strict';
          var _ua, trident, rv, css_class, return_text;
          _ua = navigator.userAgent.toLowerCase();
          trident = _ua.match(/trident\/(\d.\d)/i) || _ua.match(/rv:(\d.\d)/i);
          rv = -1;
          css_class = '';
          return_text = '';
      
          if ( compatibilityView === undefined || trident === null ) compatibilityView = false;
          
          
          // Morden Browser
          if (_ua.indexOf("safari") != -1 && _ua.indexOf('version') != -1) css_class = 'safari';
          else if (_ua.indexOf("chrome") != -1 && _ua.indexOf("opr") == -1) css_class = 'chrome';
          else if (_ua.indexOf("opera") != -1 || _ua.indexOf("opr") != -1 || _ua.indexOf("opera") != -1) css_class = 'opera';
          else if (_ua.indexOf("firefox") != -1) css_class = 'firefox';
      
          if ( document.body.className.length >= 1 ) {
              // document.body.className += ' '+ css_class;
              //document.body.className = ' '+ css_class;
              $('body').addClass(css_class); //21-07-16 jquery로 수정
          } else {
              // document.body.className += css_class;
              //document.body.className = css_class;
              $('body').addClass(css_class); //21-07-16 jquery로 수정
          }

      },
      _setDeviceCheck() {
      }
  }

  /*header scroll event */
  lc.header = {
      init: function(){
          this._setScrollEvent();
          this._setScrollPopEvent('.popup-full > .popup-content');
      },
      //21-10-05 상단 타이틀 규칙 변경: 상단 타이틀 선택적 노출에 대한 내용 삭제 [S]
      _setScrollEvent() {
          var elem = $('#sub_header');//21-09-08 id로 수정
          $(window).on('scroll', function(){
              if($(window).scrollTop()>30){
                  if( elem.children('.sub-title').length > 0 ){//21-09-07 헤더 스크롤시 보더노출
                      elem.addClass('fixed');
                  }
              }else{
                  if( elem.children('.sub-title').length > 0 ){//21-09-07 헤더 스크롤시 보더노출
                      elem.removeClass('fixed');
                  }
              }
          });
      },
      _setScrollPopEvent(obj) {
          var elem = $('.popup-full > .popup-header');
          $(obj).on('scroll', function(){
              if($(obj).scrollTop()>30){
                  elem.addClass('fixed');
              }else{
                  elem.removeClass('fixed');
              }
          });
      }  
      //21-10-05 상단 타이틀 규칙 변경: 상단 타이틀 선택적 노출에 대한 내용 삭제 [E]  
  }
  lc.inputSelector = {
      init: function () {
          // 초기 설정
          this._setDefault();
          this._setEvent();
      },  
      _setDefault(){
          $('[data-input-name]').each(function(i){
              var label = $('[data-input-name]').eq(i).data('input-name');               
              if($('[data-input-name]').eq(i).is(":checked") == true){
                  var target = $('[data-input-name]').eq(i).data('input-target');
                  $('[data-input-labelledby=' + label + ']').hide();
                  $('[data-input-section=' + target + ']').show();
              }else{
                  var target = $('[data-input-name]').eq(i).data('input-target');
                  $('[data-input-section=' + target + ']').hide();
              }
          });
      },
      _setEvent(){
          $('body').on('change','[data-input-name]', function(e){
              e.stopImmediatePropagation();
              var $this = $(e.target);
              var label = $this.data('input-name');
              var target = $this.data('input-target');
              var event = $this.data('event');
              if($this.is(':checked')){
                  if(event == 'show'){
                      $('[data-input-labelledby=' + label + ']').hide();
                      $('[data-input-section=' + target + ']').show();
                  }else{
                      $('[data-input-labelledby=' + label + ']').slideUp(200);
                      $('[data-input-section=' + target + ']').slideDown(200);
                  }
              }
          });
      }
  }
  // input
  lc.inputUnit = {
      init: function() {
          // input focus 이펙트
          this._setInputFocusEffect();
          this._setInputClear();
      },
      _setInputFocusEffect() {
          $('.unitform').on('focusin', function(){                
              $(this).parent().addClass('is-active');
              $(this).parent().parent('.unit-mix').addClass('unit-mix-active');
          });
    $('.unitform').on('focusout', function(){
      $(this).parent().removeClass('is-active');
              $(this).parent().parent('.unit-mix').removeClass('unit-mix-active');
    });
      },
      _setInputClear() {
          $('.form-control-clear').each(function(){
              var setDefault = $(this).find('.input-clear');
              var setBtnClear = $(this).find('.btn-input-clear');

      setDefault.on('keyup focus', function(){
        $(this).siblings('.btn-input-clear').addClass('is-active');
        if($(this).val().length == 0){
          $(this).siblings('.btn-input-clear').removeClass('is-active');
        } else {
          $(this).siblings('.btn-input-clear').addClass('is-active');
        }					
      });

      setDefault.on('blur', function(){
        var $this = $(this);                    
                  setTimeout(function(){
                      if($this.siblings('.btn-input-clear').is(':focus')){
                      }else{
                          $this.siblings('.btn-input-clear').removeClass('is-active');
                      }				
                  }, 200);                   					
      });

              setBtnClear.on('blur', function(){
                  var $this = $(this);
                  $this.removeClass('is-active');
              });

      setBtnClear.on('click', function(){
        $(this).closest('.form-control-clear').find('.input-clear').val('').focus();
        $(this).closest('.form-control-clear').find('.btn-input-clear').removeClass('is-active');
        return false;
      });
    });
      }
  }
  lc.tabs = {
      init: function () {
          // 초기탭 설정
          this._setDefaultTab();
          // 버튼 초점 이동
          this._setButtonFocus();
          // 탭 초점 이동
          this._setTabFocus();
          // 마우스 클릭
          this._setMouseClick();

          // 스크롤 방식 탭
          this._typeScrollTab();
      },
      _setDefaultTab() {
          $('.tab-list').each(function (i) {
              var setDefault = $(this).find('.tab-button.is-active');

              if (setDefault.length <= 0) {
                  setDefault = $(this).find('.tab-button')
                      .first()
                      .addClass('is-active');
              }else{/* 21-08-27 추가 PJ11-26578 */
                  var menuScrollElem =  $('.tab-list').eq(i).closest('.overflow-x');
                  var targetLeft = Math.ceil($('.tab-list').eq(i).find('.tab-button.is-active').offset().left);
                  var prevElem = $('.tab-list').eq(i).find('.tab-button.is-active').prev().outerWidth();
                  if(menuScrollElem.length > 0){
                      menuScrollElem.animate({
                          scrollLeft: menuScrollElem.scrollLeft() + targetLeft - prevElem - 48 // 간격
                      }, 200);
                  }
              }

              setDefault.attr('tabindex', '0')
                  .attr('aria-selected', 'true');

              $('#' + setDefault.attr('aria-controls'))
                  .addClass('is-active')
                  .attr('tabindex', '0');
          });
      },
      _setButtonFocus() {
          $('.tab-button').on('keydown', function (event) {
              event = event || window.event;
              event.preventDefault ? event.preventDefault() : event.returnValue = false;
              var keycode = event.keyCode || event.which;

              switch (keycode) {
                  case 37: // Left arrow
                      if (this.previousElementSibling) {
                          $(this).attr('tabindex', '-1')
                              .prev()
                              .attr('tabindex', '0')
                              .focus();
                      } else {
                          $('.tab:last-of-type').attr('tabindex', '0')
                              .focus();
                      }
                      break;
                  case 39: // Right arrow
                      if (this.nextElementSibling) {
                          $(this).attr('tabindex', '-1').next().attr('tabindex', '0').focus();
                      } else {
                          $('.tab:first-of-type').attr('tabindex', '0').focus();
                      }
                      break;
                  case 32: // Space
                  case 13: // Enter
                      $(this).addClass('is-active')
                          .attr('aria-selected', 'true')
                          .siblings()
                          .removeClass('is-active')
                          .attr('aria-selected', 'false');
                      $('#' + $(this).attr('aria-controls'))
                          .attr('tabindex', '0')
                          .addClass('is-active')
                          .siblings('.tab-panel')
                          .attr('tabindex', '-1')
                          .removeClass('is-active');
                      break;
              }
          });
      },
      _setTabFocus() {
          $('.tab-list').on('keydown', '.is-active', function (event) {
              event = event || window.event;
              event.preventDefault ? event.preventDefault() : event.returnValue = false;
              var keycode = event.keyCode || event.which;

              if (!event.shiftKey && keycode === 9) { // Tab
                  event.preventDefault ? event.preventDefault() : event.returnValue = false;
                  $('#' + $(this).attr('aria-controls'))
                      .attr('tabindex', '0')
                      .addClass('is-active')
                      .focus()
                      .siblings('.tab-panel')
                      .attr('tabindex', '-1')
                      .removeClass('is-active');
              }
          });
      },
      _setMouseClick() {
          $('.tab-button').on('mousedown', function () {
              $(this).addClass('is-active')
                  .attr({
                      'tabindex': '0',
                      'aria-selected': 'true'
                  })
                  .focus()
                  .siblings()
                  .removeClass('is-active')
                  .attr({
                      'tabindex': '-1',
                      'aria-selected': 'false'
                  });

              $('#' + $(this).attr('aria-controls'))
                  .attr('tabindex', '0')
                  .addClass('is-active')
                  .siblings('.tab-panel')
                  .attr('tabindex', '-1')
                  .removeClass('is-active');
              /* tab move : 21-08-25 추가 */
              var menuScrollElem =  $(this).closest('.overflow-x');
              var targetLeft = Math.ceil($(this).offset().left);
              var prevElem = $(this).prev().outerWidth();
              if(menuScrollElem.length > 0){//overflow-x가 있을 경우
                  //$(this).closest('.tab-list').css('overflow', 'visible');
                  menuScrollElem.animate({
                      scrollLeft: menuScrollElem.scrollLeft() + targetLeft - prevElem - 48 // 간격
                  }, 200);
              }
          });
      },
      _typeScrollTab() {
          $(document).ready(function() {
              if( $('.tab-list-wrap.type-scroll').length ) {
                  var scrollTab = $('.tab-list-wrap.type-scroll');
                  var scrollTabT = parseInt(scrollTab.offset().top);
                  var mainContArea = $('.main-contents').offset().top + $('.main-contents').height();

                  $(window).scroll(function() {
                      var winT = $(this).scrollTop();

                      if( winT > scrollTabT - 56 ) {
                          scrollTab.addClass('fix');

                          if( winT > mainContArea - 52 ) {
                              scrollTab.removeClass('fix');
                          }
                      } else {
                          scrollTab.removeClass('fix');
                      }
                  });

                  $('.tab-button').on('click', function() {
                      var target = $('#' + $(this).attr('aria-controls'));
                      var targetT = parseInt(target.offset().top);

                      $('.tab-button').removeClass('is-active');
                      $('body, html').animate({scrollTop: targetT - 118}, 300);
                  });
                  
                  $('.tab-panel').each(function() {
                      var thisT = $(this).offset().top;
                      var thisID = $(this).attr('id');

                      $(window).scroll(function() {
                          var winT = $(this).scrollTop();

                          if( winT >= thisT - 124) {
                              $('.tab-button').removeClass('is-active');
                              $('.tab-button[aria-controls="' + thisID + '"]').addClass('is-active');
                          }
                      });
                  });

                  $('.loca-wrapper').css('height', 'auto');
              }
          });
      }
  }

  lc.anchor = {
      init: function() {
          this._setDefaultAnchor();
          this._setButtonFocus();
          this._setTabFocus();
          this._setMouseClick();
          this.anchorScroll();
      },
      _setDefaultAnchor() {
          $('.anchor-list').each(function () {
              var anchorTrr = $('.anchor-trriger');
              var anchorTrg = $('.anchor-target');
              var setDefault = $(this).find('.anchor-trriger.is-active');
              var defaultIndex;

              anchorTrr.attr('tabindex', '-1');
              anchorTrg.attr('tabindex', '-1');
              
              if (setDefault.length <= 0) {
                  setDefault = $(this).find('.anchor-trriger').first().addClass('is-active');
                  defaultIndex = setDefault.index();

                  setDefault.attr('tabindex', '0').attr('aria-selected', 'true');
                  anchorTrg.eq(defaultIndex).addClass('is-active').attr({'tabindex':'0','aria-selected':'true'});
              }
          });
      },
      _setButtonFocus() {
          $('.anchor-trriger').on('keydown', function (event) {
              event = event || window.event;
              event.preventDefault ? event.preventDefault() : event.returnValue = false;
              var keycode = event.keyCode || event.which;
              var index = $(this).index();

              switch (keycode) {
                  case 37: // Left arrow
                      if (this.previousElementSibling) {
                          $(this).attr('tabindex', '-1')
                              .prev()
                              .attr('tabindex', '0')
                              .focus();
                      } else {
                          $('.tab:last-of-type').attr('tabindex', '0')
                              .focus();
                      }
                      break;
                  case 39: // Right arrow
                      if (this.nextElementSibling) {
                          $(this).attr('tabindex', '-1').next().attr('tabindex', '0').focus();
                      } else {
                          $('.tab:first-of-type').attr('tabindex', '0').focus();
                      }
                      break;
                  case 32: // Space
                  case 13: // Enter
                      $(this).addClass('is-active')
                          .attr('aria-selected', 'true')
                          .siblings()
                          .removeClass('is-active')
                          .attr('aria-selected', 'false');
                      $('.anchor-target').eq(index)
                          .attr('tabindex', '0')
                          .addClass('is-active')
                          .siblings('.anchor-target')
                          .attr('tabindex', '-1')
                          .removeClass('is-active');

                      var targetT = $('.anchor-target').eq(index).offset().top;
                      var elementH = ($('.main-header').height() + $('.anchor-list').height());
                      $('html, body').animate({scrollTop: targetT - elementH}, 300);

                      break;
              }
          });
      },
      _setTabFocus() {
          $('.anchor-list').on('keydown', '.is-active', function (event) {
              event = event || window.event;
              event.preventDefault ? event.preventDefault() : event.returnValue = false;
              var keycode = event.keyCode || event.which;
              var index = $(this).index();

              if (!event.shiftKey && keycode === 9) { // Tab
                  event.preventDefault ? event.preventDefault() : event.returnValue = false;
                  $('.anchor-target').eq(index)
                      .attr('tabindex', '0')
                      .addClass('is-active')
                      .focus()
                      .siblings('.anchor-target')
                      .attr('tabindex', '-1')
                      .removeClass('is-active');
              }
          });
      },
      _setMouseClick() {
          $('.anchor-list').on('mousedown', function (event) {
              var index = $(event.target).closest('.anchor-trriger').index();
              $(event.target).closest('.anchor-trriger')
                  .attr({
                      'tabindex': '0',
                      'aria-selected': 'true'
                  })
                  .focus()
                  .siblings()
                  .attr({
                      'tabindex': '-1',
                      'aria-selected': 'false'
                  });

              $('.anchor-target').eq(index)
                  .attr('tabindex', '0')
                  .addClass('is-active')
                  .siblings('.anchor-target')
                  .attr('tabindex', '-1')
                  .removeClass('is-active');  
          });
      },
      anchorScroll: function() {
          $(window).on('load', function() {
              if( $('.anchor-list-wrap.type-scroll').length ) {
                  var anchorList = $('.anchor-list-wrap');
                  var anchorListT = getElOffsetTop(anchorList);
                  var anchorListH = getElHeight(anchorList);

                  var anchorWrap = $('.anchor-wrap');
                  var anchorWrapT = getElOffsetTop(anchorWrap);
                  var anchorWrapH = getElHeight(anchorWrap);

                  var mainHeader = $('.main-header, .sub-header');
                  var mainHeaderT = getElOffsetTop(mainHeader);
                  var mainHeaderH = getElHeight(mainHeader);

                  var anchorTrr = $('.anchor-trriger');
                  var anchorTrg = $('.anchor-target');

                  var setDefaultAttr = {
                      'tabindex':'-1',
                      'aria-selected':'false'
                  }
                  var setSelectedAttr = {
                      'tabindex':'0',
                      'aria-selected':'true'
                  }

                  if($('.main-header').length == 0){
                      anchorTrr.each(function(index) {
                          var index = index;
                          var targetT = parseInt(anchorTrg.eq(index).offset().top);    
                          if(anchorTrr.closest('.overflow-x').length > 0){/* 21-09-09 overflow-x 일 경우 tab move 추가 */
                              anchorTrr.closest('.anchor-list').css('overflow', 'visible');
                          }
                          $(this).on('click', function() {
                              anchorMove('.loca-wrapper', targetT);
                              anchorMove('html, body', targetT);
                              /* 21-09-09 overflow-x 일 경우 tab move 추가 */
                              var menuScrollElem =  $(this).closest('.overflow-x');
                              var targetLeft = Math.ceil($(this).offset().left);
                              var prevElem = $(this).prev().outerWidth();
                              if(menuScrollElem.length > 0){
                                  menuScrollElem.stop().animate({
                                      scrollLeft: menuScrollElem.scrollLeft() + targetLeft - prevElem - 48 // 간격
                                  }, 200);
                              }            
                          });                            
                      });    
                      anchorTrg.each(function(index) {
                          var index = index;
                          var thisT = parseInt($(this).offset().top);
                          var thisH = parseInt($(this).outerHeight());//21-09-24 추가                      
                          $('.loca-wrapper').scroll(function() {
                              var wrapperScrollTop = parseInt($(this).scrollTop());    
                              if( wrapperScrollTop >= thisT - [(mainHeaderT + mainHeaderH) + anchorListH]) {
                                  anchorTrr.removeClass('is-active');
                                  anchorTrr.eq(index).addClass('is-active');
                              }
                          });
                          $(window).scroll(function() {
                              var windowScrollTop = Math.ceil($(this).scrollTop()); // 21-08-10 수정
                              //21-09-24 조건 추가 
                              if( windowScrollTop >= thisT - [(mainHeaderT + mainHeaderH) + anchorListH] && windowScrollTop < thisT - [(mainHeaderT + mainHeaderH) + anchorListH] + thisH) {
                                  anchorTrr.removeClass('is-active').attr(setDefaultAttr);
                                  anchorTrr.eq(index).addClass('is-active').attr(setSelectedAttr);
                                  anchorTrg.removeClass('is-active').attr(setDefaultAttr);
                                  anchorTrg.eq(index).addClass('is-active').attr(setSelectedAttr);
                                  /* 21-09-09 overflow-x 일 경우 tab move 추가 */
                                  var menuScrollElem =  anchorTrr.closest('.overflow-x');
                                  var targetLeft = Math.ceil(anchorTrr.eq(index).offset().left);
                                  var prevElem =  anchorTrr.eq(index).prev().outerWidth();
                                  if(menuScrollElem.length > 0){ 
                                      menuScrollElem.stop().animate({
                                          scrollLeft: menuScrollElem.scrollLeft() + targetLeft - prevElem - 48 // 간격
                                      }, 200);                   
                                  }
                              }
                          });
                      });
                  }else{
                      anchorTrr.each(function(index) {
                          var index = index;
                          var targetT = parseInt(anchorTrg.eq(index).offset().top);
  
                          $(this).on('click', function() {
                              anchorMove('.loca-wrapper', targetT, 10);
                              anchorMove('html, body', targetT, 10);
                          });
                      });
  
                      anchorTrg.each(function(index) {
                          var index = index;
                          var thisT = parseInt($(this).offset().top);                            
                          $('.loca-wrapper').scroll(function() {
                              var wrapperScrollTop = parseInt($(this).scrollTop());
  
                              if( wrapperScrollTop >= thisT - [(mainHeaderT + mainHeaderH) + anchorListH + 20]) {
                                  anchorTrr.removeClass('is-active');
                                  anchorTrr.eq(index).addClass('is-active');
                              }
                          });
                          $(window).scroll(function() {
                              var windowScrollTop = Math.ceil($(this).scrollTop()); // 21-08-10 수정
                            
                              if( windowScrollTop >= thisT - [(mainHeaderT + mainHeaderH) + anchorListH + 20]) {
                                  anchorTrr.removeClass('is-active').attr(setDefaultAttr);
                                  anchorTrr.eq(index).addClass('is-active').attr(setSelectedAttr);
                              }
                          });
                      });
                  }

                  $('.loca-wrapper').scroll(function() {
                      var wrapperScrollTop = parseInt($(this).scrollTop());
                      if( wrapperScrollTop >= anchorListT - (mainHeaderT + mainHeaderH) ) {
                          anchorList.addClass('fix');
                          wrapperScrollTop >= (anchorWrapT + anchorWrapH) - (mainHeaderT + mainHeaderH) ? anchorList.addClass('up') : anchorList.removeClass('up');
                      } else {
                          anchorList.removeClass('fix');
                      }
                  });

                  $(window).scroll(function() {                        
                      var windowScrollTop = Math.ceil($(this).scrollTop()); // 21-08-10 수정  
                      //21-09-09 수정
                      var len = anchorList.closest('.top-tab').length;
                      if(len < 1){
                          mainHeaderT = 0;
                      }               
                      if( windowScrollTop >= anchorListT - (mainHeaderT + mainHeaderH) ) {//21-09-09 수정 mainHeaderT == 0
                          anchorList.addClass('fix');
                          windowScrollTop >= (anchorWrapT + anchorWrapH) - (mainHeaderT + mainHeaderH) ? anchorList.addClass('up') : anchorList.removeClass('up');                           
                      } else{
                          anchorList.removeClass('fix');
                      }
                  });

                  function getElOffsetTop(el) { 
                      return parseInt(el.offset().top);
                  }
                  
                  function getElHeight(el) {
                      return parseInt(el.height());
                  }

                  function anchorMove(el, targetT, safeT = 0) {
                      //21-09-09 수정
                      var len = anchorList.closest('.top-tab').length;
                      if(len < 1){
                          mainHeaderT = 0;
                      }       
                      return $(el).animate({scrollTop: targetT - [(mainHeaderT + mainHeaderH) + anchorListH + safeT]}, 300); //21-09-09 수정 mainHeaderT == 0
                  }
              }
          });
      }
  }

  lc.accordion = {
      init: function () {
          this.$accordion = $('.accordion, .agree-box');/*21-07-16 추가*/
          this._setButtonClick();
      },
      _setDefaultAccordion: function() {
          this.$accordion.each(function() {
              var _this = $(this);
              _this.hasClass('is-active') ? setOpen() : setClose();

              function setOpen() {
                  _this.find('.btn-fold').attr('aria-expanded', 'true');
                  _this.find('.fold-body').slideToggle(200);
              }

              function setClose() {
                  _this.find('.btn-fold').attr('aria-expanded', 'false');
                  _this.find('.fold-body').hide();
              }
          });
      },
      _setButtonClick: function() {
          this.$accordion.each(function() {
              var _this = $(this);
              var $accorWrap = _this.parent();
              var $btnFold = _this.find('.btn-fold');
              var $btnFold2 = _this.find('.agree-box .btn-toggle');/*21-07-16 추가*/
              var $foldBody = _this.find('.fold-body');
              var $btnText = _this.find('.btn-wrap .text');

              $btnFold.on('click', function(e) {
                  e.stopImmediatePropagation();
                  if (_this.hasClass('disabled')) return false;
                  if(_this.hasClass('is-active')){
                      accordionEventHandler();
                      accordionClose()
                  }else{//21-09-10 PJ11-31425
                      accordionEventHandler();
                      if (_this.closest('.accordion-wrap').attr('data-sliblings') == "keep"){
                          accordionOpenKeep();
                      }else{
                          accordionOpen();
                      }
                  }
              });
              $btnFold2.on('click', function(e) {/*21-07-16 추가*/
                  if($(this).text() == "펼치기"){
                      $(this).text('접기').attr('aria-expanded', 'true');
                      $(this).parent('.agree-head').next().addClass('is-active');
                  }else{
                      $(this).text('펼치기').attr('aria-expanded', 'false');
                      $(this).parent('.agree-head').next().removeClass('is-active');
                  }
              });
              function accordionOpen() {
                  /*21-08-26 PJ11-26882 반드시 확인하세요 scroll 추가*/
                  var t = $btnFold.next('span').text()
                  if(t.indexOf('반드시 확인하세요') > -1 || _this.closest('.type-auto-scroll').length){
                      if(_this.closest('.popup-content').length > 0){
                          _this.closest('.popup-content').animate({scrollTop:_this.closest('.popup-content').scrollTop() + _this.closest('.popup-content').outerHeight() -100}, 400);	//21-08-30 선택자 수정
                      }else{
                          $('body, html').animate({scrollTop:  _this.offset().top - 100}, 400);
                      }
                  }
                  _this.addClass('is-active');
                  _this.siblings().removeClass('is-active');
                  $accorWrap.hasClass('type-date-set') ? $btnFold.attr({'aria-label': '접기', 'aria-expanded': 'true'}) : $btnFold.text('접기').attr('aria-expanded', 'true');
                  _this.siblings().find('.btn-fold').text('펼치기').attr('aria-expanded', 'false');
                  $btnText.text('접기');
                  _this.siblings().find('.btn-wrap .text').text('자세히 보기')
              }
              function accordionClose() {
                  _this.removeClass('is-active');
                  $accorWrap.hasClass('type-date-set') ? $btnFold.attr({'aria-label': '펼치기', 'aria-expanded': 'true'}) : $btnFold.text('펼치기').attr('aria-expanded', 'false');
                  $btnText.text('자세히 보기');
              }
              function accordionOpenKeep(){//21-09-10 case 추가
                  _this.addClass('is-active');
                  $btnFold.text('접기').attr('aria-expanded', 'true');
              }
              function accordionEventHandler() {
                  // [BS.6.1_growth] TOUCH 고도화 accordion
                  if (_this.parent().hasClass('type-radius')) {
                      var headEl = _this.find('.fold-head');
                      var textEl = headEl.find('.text .message-text');
                      var imgEl = headEl.find('.img');
                      
                      if(_this.hasClass('is-active')) {
                          textEl.css({ display: 'none' });
                          imgEl.find('img').css({ width: '28px', height: '28px' });
                      } else {
                          textEl.css({ display: 'block' });
                          headH = Math.floor(headEl.height());
                          imgEl.find('img').css({ width: headH, height: headH });
                      }
                  }
              }
          });
      }
  }

  lc.toolTip = {
      init: function() {
          this.curFocus = '';
          this._setElement();
          this._bindEvent();
      },
      _setElement: function() {
          $('.tooltip-wrap').each(function() {
              $(this).find('.tooltip-open, .tooltip-pop').attr('aria-expanded', 'false');
          });
      },
      _bindEvent: function() {
          var oSelf = this;

          $(document).off('click.tooltip');
          $(document).on('click.tooltip', '.tooltip-open', function(e) {
              e.preventDefault();

              if ($(this).attr('aria-expanded') !== "true") {
                  oSelf._showBox(e);
              } else {
                  oSelf._hideBox(e);
              }
          });

          $(document).on('click', '.tooltip-close', function(e) {
              oSelf._hideBox(e);
          });
      },
      _showBox: function(e) {
    $('body').addClass('overflow-hidden');
          this.curFocus = $(e.currentTarget);
          this.curFocus.attr('aria-expanded', 'true');
          this.curFocus.next().addClass('open').attr({'aria-expanded':'true', 'aria-hidden':'false'}); //21-09-16 [접근성] aria-hidden 추가
          //21-09-15 bottomsheet in case
          /*if (this.curFocus.closest('.custom-bottomsheet').length > 0 ){
              var winH = $(window).outerHeight();
              var elemH = this.curFocus.closest('.bottomsheet').outerHeight();    
              this.curFocus.closest('.tooltip-wrap').find('.tooltip-pop').css('height', '100vh');
              this.curFocus.closest('.tooltip-wrap').find('.tooltip-box').css('top', - (winH - elemH));
          }*/
      },
      _hideBox: function(e) {
    $('body').removeClass('overflow-hidden');
          this.curFocus.attr('aria-expanded', 'false').focus();
          this.curFocus.next().removeClass('open').attr({'aria-expanded':'false', 'aria-hidden':'true'}); //21-09-16 [접근성] aria-hidden 추가
          //21-09-15 bottomsheet in case
          /*if (this.curFocus.closest('.custom-bottomsheet').length > 0 ){
              var winH = $(window).outerHeight();
              var elemH = this.curFocus.closest('.bottomsheet').outerHeight();    
              this.curFocus.closest('.tooltip-wrap').find('.tooltip-pop').css('height', '100vh');
              this.curFocus.closest('.tooltip-wrap').find('.tooltip-box').css('top', - (winH - elemH));
          }*/
      }
  }

  lc.setARIA = {
      init: function () {
          $('body').on('keydown', function () {
              $(this).addClass('focus-outline');
          }).on('mousedown', function () {
              $(this).removeClass('focus-outline');
          });
      }
  }

  lc.layerPopup = {
      init: function() {
          this.defaultBody = $('body');
          this.defaultPopWrap = $('#layerPop');

          this.$target = $('[data-path]');
          this.$dimmed = $('.dimmed');
          this.$container = $('#container');
          this.openPopList = [];
          this._setElement();
          this._bindEvent();
      },
      _setElement: function() {
          var oSelf = this;
          //열려 있는 팝업 가운데 정렬
          $('.popup-layer:visible').each(function() {
              oSelf.$curPop = $(this);
              oSelf.centerPop($(this));
          });
          
      },
      _bindEvent: function() {
          var oSelf = this;
          $(document).on('click', '[data-path]', function(e) {
              if ($(e.currentTarget).attr('href') === "#" || $(e.currentTarget).attr('href') === undefined) {
                  e.preventDefault();
                  oSelf.clickEl = $(e.currentTarget);
                  //팝업 위에 팝업 열리는 케이스 추가
                  if ($(this).closest('article').length > 0) {
                      oSelf.loadPopEl(oSelf.clickEl.data('path'), true);
                  } else {
                      oSelf.loadPopEl(oSelf.clickEl.data('path'));
                  }
              }
          });

          
          //팝업 닫기 버튼
          $(document).off('click.popupClose'); //21-07-16 click.popClose를 click.popupClose로 수정
          $(document).on('click.popupClose', '.btn-close', function(e) {
              e.stopImmediatePropagation();//21-10-01
              // 팝업 닫기 여부 정의
              var dataClose = $(this).attr('data-close');
              if(typeof dataClose !== 'undefined' && dataClose !== 'false') return false;

              //팝업일 경우
              var targetId = $(this).closest('article').attr('id');
              if (targetId) {
                  oSelf.closePop('#' + targetId);
              } 
              //21-09-17 PJ11-31413
              if($('.custom-bottomsheet > .dimmed:visible').length > 0 ){
                  $('html').css({'height':'100vh'});
              }else{
                  $('html').css({'height':''});
                  $('body').css({'position':'', 'height':''});
              }              
          });

          //bottom slideUp popup 닫기
          $(document).on('click touchend', '.custom-bottomsheet > .dimmed', function(e) {
              var targetId = $(this).closest('article').attr('id');
              if (targetId) oSelf.closePop('#' + targetId);
              e.stopImmediatePropagation();//21-09-28 PJ11-32018
          });


          this.curClickEl = '';
          $(document).on('focus.lastFocus', 'a, button', function(e) {
              if ($(e.currentTarget).closest('.popup-layer').length > 0 ||
                  $(e.currentTarget).closest('#layerPop').length > 0 ||
                  $(e.currentTarget).closest('article').length > 0 ||
                  $(e.currentTarget).hasClass('inLayer')
              ) {
                  return;
              }
              oSelf.curClickEl = $(e.currentTarget);
          });

          this._tabFocus();

          // 21-08-27 추가
          if($('.scroll-off').length > 0){
              if($('.scroll-off').is(':visible')){
                  $('html').css({'height':'100%'});
                  $('body').css({'position':'fixed', 'height':'100%'});
              }else{
                  $('html').css({'height':''});
                  $('html, body').css({'position':'', 'height':''});
              }
          }
      },
      centerPop: function(el) {
          var target;
          if (el) {
              target = el;
          } else if ((this.$curPop !== undefined) && (this.$curPop.length > 0)) {
              target = this.$curPop;
          } else {
              target = $('#layerPop article:visible');
          }

          // this._setMaxHeightCont();

          if ((target.length > 0) && (target.hasClass('popup-layer') || target.hasClass('alertBox'))) {
//              target.css('marginTop', -parseInt(target.height() / 2));
              // target.attr('tabindex', 0).focus();
          }

      },
      _tabFocus: function() {
          //21-09-09 [접근성] 포커스 대상 수정
          $(document).on('keydown', '.btn-close', function(e) {
              if (e.shiftKey === false && e.keyCode === 9) {
                  if( $(this).closest('article').hasClass('custom-bottmsheet') ){
                      $(this).closest('article').attr('tabindex', 0).focus();
                      return false;
                  }
              }
          });

          $(document).on('keydown', '[tabindex=0]', function(e) {
              if (e.shiftKey === true && e.keyCode === 9 && $(e.target).attr('tabindex') === "0") {
                  $(this).find('.btn-close').focus();
                  return false;
              }
          });
      },
      _appendHtml: function(el) {
          var createEl = $(el);
          this.defaultPopWrap.children().remove();
          this.defaultPopWrap.append(createEl);
          //dimm 사용 하지 않음
          createEl.fadeIn(200);
      },
      openPop: function(el, isParPop) { //isParPop  : true 팝업 위에 팝업 열리는 경우
          var oSelf = this;
          var defPop = this.defaultPopWrap.find('article').filter(function() {
              if ($(this).closest('.popup-content').length === 0) {
                  return $(this);
              }
          });
          this.$curPop = defPop.last();
          if (el !== undefined) {
              this.$curPop = $(el);
          }
          if (this.$curPop.length === 0) {
              return;
          }

          //접근성 포커스 경로 지정
          this._setLastFocus(this.$curPop);

          //팝업 위에 팝업 열릴 경우 이전 팝업 z-index 999 로 지정
          //alertBox 경우 이중 팝업 고려
          if ((isParPop === true || this.$curPop.hasClass('alertBox')) && this.openPopList.length > 0) {
              this.orgPop = this.openPopList[this.openPopList.length - 1]['$target'];
              this.orgPop.css('z-index', '999');

              this.openPopList.push({
                  $target: this.$curPop
              });
          } else {
              this.openPopList = [];
              this.openPopList.push({
                  $target: this.$curPop
              });
          }

          // 앱뷰 일 경우 헤더 없어  tabFixed 맨 상단 고정
          if ((this.$curPop.find('.popup-title').length === 0) &&
              this.$curPop.find('.tabType02.tabFixed').length > 0) {
              this.$curPop.find('.tabType02.tabFixed').css('top', 0);
          }

          //레이어 팝업 show
          // 풀 팝업 일 경우 fade 효과 삭제
          if (this.$curPop.hasClass('popup-layer popup-full')) {
              this.$curPop.show();
          } else if (this.$curPop.hasClass('custom-bottomsheet')) { //하단 slideUp 팝업 show

              this.$curPop.show();
              oSelf.$curPop = this.$curPop.find('.bottomsheet');
              // bottom height
              //android 10 키패드 window height 체크 이슈
              var bottomSheetHeight,
                  maxHeightWin;
              setTimeout(function(){
                  oSelf.bottomFull(oSelf.$curPop);//21-10-06 bottomfull 따로 분류
              }, 200);

              //21-10-06 bottomfull 내용 이동
              
              $("html").css({
                  "height":"100vh"//21-06-30 노치 대응 관련 추가
              });
              $('body').on('touchmove.poplayerscroll', function(e) {
                  // e.preventDefault();
                  // e.stopPropagation();
              });
              /* 2021-06-22 body scroll*/
              var wScroll = $(window).scrollTop();
              $('body').addClass('scrollOff');
              $('.loca-wrapper').addClass('scrollOff').scrollTop(wScroll);
          } else {
              this.$curPop.fadeIn(200);
          }
          this.showDimmed();
          // 레이어 팝업 중앙 정렬/ 하단에서 위로 올라오는 효과
          this._contAni(this.$curPop);
          // 팝업 새로 그릴 경우 함수 재 호출
          this._reInitCont();
          //접근성 포커스 이동
          this.$curPop.attr('tabindex', '0'); // 21.08.04 추가
          //21-09-09 [접근성] 함수추가
          
          this.sendFocus(this.$curPop); //21-09-17 노출 이슈로 주석 처리
      },
      bottomFull: function(el) {//21-10-06 bottomfull 따로 분류
          //21-08-13 bottonsheet에 .agree-box 있을때 [S]
          //bottomsheet-full 붙여주기
          var bSelf = $(el),
              bottomSheetHeight = bSelf.outerHeight(),
              maxHeightWin = $(window).height() - 60; //21-09-14 120에서 60으로 수정

          if (bottomSheetHeight > maxHeightWin) {
              bSelf.parent('.custom-bottomsheet').addClass('bottomsheet-full');
          }else {
              bSelf.parent('.custom-bottomsheet').addClass('auto');
          }
          //agree-box 일때만
          if( bSelf.find('.agree-box').length > 0 ){

              //21-09-13 헤더, 푸터 높이 구하기
              var this_tit = bSelf.find('.popup-header').outerHeight(),
                  this_foot = bSelf.find('.popup-footer').outerHeight();

              if( !bSelf.find('.popup-footer') ){ //푸터가 없을경우
                  this_foot = 0;
              }
              //bottomsheet-full 없을때
              if( bSelf.parent('.custom-bottomsheet.auto').hasClass('bottomsheet-full') == false ){
                  var $cBottom = bSelf.parent('.custom-bottomsheet.auto');
                  var max_bottomCont = maxHeightWin - (this_tit + this_foot);//21-09-13 최대 컨텐츠 높이 계산                        
                  $cBottom.find('.agree-box > .agree-head .btn-toggle').click(function(){
                      var cBottom_h = $(this).closest('.custom-bottomsheet.auto .popup-content').outerHeight(); //21-09-13 컨텐츠 높이 구하기
                      if( $(this).parent().siblings('.agree-body').is('.is-active') ){
                          if (cBottom_h >= max_bottomCont) {//21-09-13 현재 컨텐츠 높이 >= 최대 컨텐츠 높이
                              $(this).closest('.custom-bottomsheet.auto').addClass('bottomsheet-full');
                          }
                      }else{
                          if (cBottom_h >= max_bottomCont == false) {//21-09-13 현재 컨텐츠 높이 >= 최대 컨텐츠 높이가 아닐때
                              if ( $(this).closest('.custom-bottomsheet.auto').hasClass('bottomsheet-full') ) {
                                  $(this).closest('.custom-bottomsheet.auto').removeClass('bottomsheet-full');
                              }
                          }
                      }
                  });
              }
          }
      },
      sendFocus: function(target) {//21-09-09 [접근성] 함수추가
          var $targetP = target,
              $targetP_tit = $targetP.find('.popup-title');
              $targetP_tit.attr('tabindex','0');

              //1. 타이틀이 있다
              if( $targetP_tit.length > 0 ){
                  if($targetP.hasClass('popup-full')){//1-1. .popup-full이다
                      $targetP.prepend('<div class="popup_focus" role="text" tabindex="0">레이어 팝업</div>');
                      $targetP.find('.popup_focus').focus();
                  }else{
                      $targetP_tit.focus();
                  }
          
                  //1-2. .popup-subtitle 이 있다
                  if( $targetP.find('.popup-subtitle').length > 0 ){
                      $targetP_tit.focusout(function(){
                          $(this).next('.popup-subtitle').attr('tabindex', '0').focus();
                      });
                  }
              }else{//1. 타이틀이 없다
                  $targetP.prepend('<div class="popup_focus" role="text" tabindex="0">레이어 팝업</div>');
                  $targetP.find('.popup_focus').focus();
              }

      },
      closePop: function(el) {
          var oSelf = this;
          var defPop = this.defaultPopWrap.find('article').filter(function() {
              if ($(this).closest('.popup-content').length === 0) {
                  return $(this);
              }
          });

          var target = defPop.last();
          var targetHeight = target.outerHeight();
          
          if (el !== undefined) {
              target = $(el);
          }
          // 팝업 삭제 리스트 체크
          if (this.openPopList.length > 0) {
              var isPopList = false;
              var curPopId = target.attr('id');

              $.each(this.openPopList, function(idx, val) {
                  var popId = '#' + val['$target'].attr('id');
                  var isBtmSht = val['$target'].attr('class') === 'bottomsheet'

                  if (popId.indexOf(curPopId) >= 0 || popId === '#layerPop' || isBtmSht) {
                      isPopList = true;
                      return false;
                  }
              });

              if (isPopList === false) {
                  return;
              }
          }

          if (
              target.hasClass('popup-layer popup-full') ||
              target.find('.popup-layer popup-full').length > 0 // 풀 팝업 정의가 target 안 태그에 있을 경우 (카드 상세)
              
          ) {
              // 풀 팝업 일 경우 - 팝업 바로 hide
              if ( (this.openPopList.length > 1) && (target.attr('data-isDel') !== 'false')) {
                  //이중 팝업으로 열면서 isDel 속성이 undefined/true 경우만 팝업 삭제
                  target.remove();
              } else {
                  target.hide(); 
              }
              /* 21-09-30 추가*/
              if($('body').hasClass('scrollOff')){
                  $("html").css({"height":""});
                  var wScrollTop = $('.loca-wrapper.scrollOff').scrollTop();
                  $('body, .loca-wrapper').removeClass('scrollOff');
                  $(window).scrollTop(wScrollTop);
              }          
              //마지막 팝업 에서만 dimmed 숨김 처리
              if (this.openPopList.length <= 1){
                  this.hideDimmed('', 'Y');
              }
          } else if (target.hasClass('popup-layer') || target.hasClass('alertBox') || target.hasClass('shareArea')) {
              //팝업 fadeOut 효과
              if( (this.openPopList.length > 1) && (target.attr('data-isDel') !== 'false')) {
                  target.fadeOut(200, function() {
                      $(this).remove();
                  });
              } else {
                  target.fadeOut(200, function() {
                      $(this).hide();
                  });

                  //마지막 팝업 에서만 dimmed 숨김 처리
                  if (this.openPopList.length <= 1){
                      this.hideDimmed();
                  }
              }

          } else if (target.hasClass('custom-bottomsheet')) {
              // this._setLastFocus($(el).find('.btn-close')); // 21.08.04 추가
              target.find('.bottomsheet').css({
                  'transform': 'translateY(100%)',
                  'transition': '0.3s ease-out' 
              }).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                  function(e) {
                      $("html").css({
                          height: ""
                      });

                      /* 22-04-21
                      // Bottomsheet와 Full popup 같이 뜨는 경우
                      // body에 'scrollOff' 스타일 제거 안 되어서 발생하는 스크롤 이슈 해결
                      */ 
                      var str = $("body").css("marginTop");
                      var strIdx = str.indexOf('px')
                      var bodyT = Math.abs(str.substr(0, strIdx) * 1)
                      if ( bodyT >= 0 ) {
                          $("body").css({
                              overflow: 'auto',
                              position: 'static',
                              left: '0',
                              width: '100%',
                              height: '100%',
                              marginTop: '0',
                          })
                          $(window).scrollTop(bodyT);
                          console.log("scrollTop ::", $(window).scrollTop());
                      }

                      /* 2021-06-22 body scroll*/
                      var wScrollTop = $('.loca-wrapper.scrollOff').scrollTop();
                      $('body, .loca-wrapper').removeClass('scrollOff');
                      $(window).scrollTop(wScrollTop);
                      // 2020-06-21 IOS body scroll issue
                      $('body').off('touchmove.poplayerscroll');
                      $(this).removeAttr('style').closest('.custom-bottomsheet').hide();
                      $(this).siblings('.dimmed').remove();
                      $(this).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
                      if (oSelf.openPopList.length < 1) oSelf.hideDimmed();
                  }
              );

          } else {
              target.css({
                  'transform': 'translateY(100%)',
                  'transition': '0.3s ease-out'
              });
              //endTrans
              target.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
              target.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                  function(e) {
                      $(this).removeAttr('style');
                      $(this).hide();
                      oSelf.hideDimmed('', 'Y');
                  }
              );
          }

          if (this.openPopList.length > 0) {
              // this.openPopList[this.openPopList.length - 1]['$lastFocus'].focus();
              if (target.data('focus') !== undefined) {
                  target.data('focus').focus();
                  target.removeData('focus');
              }
              //이전 팝업 z-index 초기화
              var orgPop = this.openPopList[this.openPopList.length - 2];
              if (orgPop) {
                  orgPop['$target'].css('z-index', '');
              }
              this.openPopList.pop();
          }
      },
      loadPopEl: function(target, isParPop) {
          var oSelf = this,
              popCont,
              popContId = target,
              popContIdIdx;

          if (popContId.match('/')) {
              popContId = popContId.split('/');
              popContId = popContId[popContId.length - 1];
          }
          popContIdIdx = popContId.indexOf('.');
          if (popContIdIdx > 0) {
              popContId = popContId.substring(0, popContIdIdx);
          }
          $.get(target, function(data) {
              if (isParPop !== true) {
                  $('#layerPop').html('');
              }
              popCont = $(data).filter('#' + popContId);
              popCont.appendTo('#layerPop');
              oSelf.openPop('#' + popContId, isParPop);                
              //21-09-09 [접근성] hr aria-hidden="true"
              lc.hrFocusHidden.init();
              //21-09-09 [접근성] 헤더 구분해서 텍스트 넣기
              var getLayerPop_txt;
              if( oSelf.$curPop.find('.popup-title').css('display') == 'none' ){
                  getLayerPop_txt = oSelf.$curPop.find('.popup-title').text();
                  oSelf.$curPop.find('.popup_focus').text(getLayerPop_txt+' 팝업');
              }
          });

      },
      _reInitCont: function(){
          //팝업 내부에 인풋 창 있을 경우
          if (this.$curPop.find('.frmCheck input').length > 0) {
              lc.formEvent.jsCheckbox._setElement();
          }

          //팝업 내부에 tabScript 가 있을 경우
          if (this.$curPop.find('[class*=tabType]').length > 0) {
              $('[class*=tabType]').tabJs();
          }

          //팝업 내부에 card-select 가 있을 경우
          if (this.$curPop.find('div.card-select').length > 0) {
              lc.selectBox._setElement();//21-08-30 함수 오류 수정
          }
          //팝업 내부에  multiSelect 가 있을 경우
          if (this.$curPop.find('div.multiSelect').length > 0) {
              lc.formEvent.selectBox._setElement();
          }

          //팝업 내부에 select 가 있을 경우
          if (this.$curPop.find('div.selectbox select').length > 0) {
              lc.formEvent.selectBox.setEl();
          }

          //팝업 내부에 tabScript 있을 경우
          if (this.$curPop.find('#tabScript').length > 0) {
              lc.layout.scrollTabFixed.init();
          }
          
          //팝업 내부에 터치복사 기능이 있을 경우
          if (this.$curPop.find('.copy-value').length > 0) {
              var clipboard = new ClipboardJS('.copy-value');

              var btns = document.querySelectorAll('.copy-value');

              for(var i=0;i<btlc.length;i++){
                  btns[i].addEventListener('mouseleave',clearTooltip);
              }
              function clearTooltip(e){
                  e.currentTarget.setAttribute('class','copy-value');
              }

              function showTooltip(elem){
                  elem.setAttribute('class','copy-value tooltip');
              }
              clipboard.on('success', function(e) {
                  showTooltip(e.trigger);
              });
          }
      },
      _setMaxHeightCont: function() {
          if (this.$curPop !== undefined && this.$curPop.hasClass('popup-layer')) {
              var maxHeightPop = $(window).height() - this.$curPop.find('.popup-title').outerHeight();
              this.$curPop.find('> .popup-content').css('max-height', maxHeightPop);
          }

      },
      _contAni: function(el) {
          var popCont = el;

          //팝업 열릴 때 포커스 이동
          // popCont.attr('tabindex', -1).focus();


          if (popCont.hasClass('popup-layer popup-full')) {
              //풀 팝업은 제외
          } else if (popCont.hasClass('popup-layer') || popCont.hasClass('alertBox')) {
              this.centerPop();
          } else if (popCont.hasClass('bottomsheet')) {
              popCont.css({
                  'transform': 'translateY(100%)'
              });
              setTimeout(function() {
                  popCont.css({
                      'transform': 'translateY(0%)',
                      'transition': '0.3s ease-out'
                  });
              }, 200);
              this.createDimmed(popCont);
              //21-06-28 아코디언 있을때만 실행
              popCont.each(function(){
                  if( $(this).find('.popup-content > .accordion-wrap').length ){//21-06-30 선택자 수정
                      //2021-06-25 바텀시트 레이아웃 변경에 따라 바텀시트에 아코디언이 추가되는 경우에는 openBottomSheet 함수에 추가
                      var bottomSheet_cont = popCont.find('.popup-content').outerHeight();
                      popCont.find('.popup-content').css('height',bottomSheet_cont);
                  }
              });                
          } else {
              popCont.css({
                  'transform': 'translateY(100%)'
              });

              setTimeout(function() {
                  popCont.css({
                      'transform': 'translateY(0%)',
                      'transition': '0.3s ease-out'
                  });
              }, 200);

              //endTrans
              popCont.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
              popCont.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                  function(e) {
                      $(this).removeAttr('style');
                  }
              );
          }
          //스크롤 맨 위로 지정
          if (popCont.css('overflow') !== 'overflow') {
              popCont.find('.popup-content').scrollTop(0);
          } else {
              popCont.scrollTop(0);
          }
      },
      createDimmed: function(target) {
          target.after('<div class="dimmed" />');

          var curDimmed = target.next('.dimmed');
          curDimmed.css('display', 'block');

      },
      delDimmed: function(target) {
          target.remove();
      },
      showDimmed: function(target) {
          var curDimmed;
          if (target) {
              curDimmed = target.next('.dimmed');
          } else {               
              //curDimmed = this.$dimmed;
              curDimmed = $('.dimmed');  //21-09-06 수정
          }

          // dimmed 가 없으면 리턴
          if (curDimmed.length === 0) {
              return;
          }
          curDimmed.show();
          //인풋 포커스 오류
          if($('body').css('position') !== 'fixed'){               
              this.curScrollTop = $(window).scrollTop();
              $('html').css('height','100vh');//21-06-29 노치 대응
              $('body').css({
                  'position': 'fixed',
                  'width': '100%',
                  'height': '100%',
                  'left': 0,
                  'overflow':'hidden',
                  'marginTop': -this.curScrollTop
              });
          }

          this.scrollBlock();

      },
      scrollBlock: function(target) {
          if (target) {
              this.$blockEl = target;
          } else {
              this.$blockEl = $('.dimmed');
          }
          this.$blockEl.on('touchmove.poplayerscroll', function(e) {
              e.preventDefault();
              e.stopPropagation();
          });
          var lastY;
          var preventScroll = function(e) {
              var deltaY = e.originalEvent.touches ? e.originalEvent.touches[0].clientY : e.clientY;
              var scrollEl = '';
              if ($(e.target).css('overflow') === 'auto') {
                  //현재 객체 스크롤 체크
                  scrollEl = $(e.target);
              } else if ($(e.target).closest('article').css('overflow') === 'auto') {
                  scrollEl = $(e.target).closest('article');
              } else {
                  scrollEl = $(e.target).parents('div').filter(function(e) {
                      if ($(this).css('overflow-y') === 'auto' &&
                          parseInt($(this).css('height')) !== $(this).get(0).scrollHeight
                      ) {
                          return $(this);
                      }
                  });
              }
              if (scrollEl.length > 0) {
                  //컨텐츠에 스크롤 없을 경우
                  if (scrollEl[0].scrollHeight === scrollEl.height()) {
                      e.preventDefault();
                  }

                  // deltaY 값과 lastY 값이 동일 한 경우 예외
                  if (deltaY < lastY) { // downn
                      var end = parseInt(scrollEl.get(0).scrollHeight - scrollEl.outerHeight(true));

                      if (scrollEl[0].scrollTop === end) {
                          e.preventDefault();
                      }
                  } else if (deltaY > lastY) {
                      if (scrollEl[0].scrollTop === 0) {
                          e.preventDefault();
                      }
                  }
                  lastY = deltaY;
              } else {
                  e.preventDefault();
                  e.stopPropagation();
              }
          };
          //팝업 , 카드 셀렉트
          $('article, .overcon').off('touchmove.poplayerscroll').on('touchmove.poplayerscroll', preventScroll);
          $('article, .overcon').off('touchstart.poplayerscroll').on('touchstart.poplayerscroll', function(e) {
              lastY = e.originalEvent.touches[0].clientY;
          });
          $('article, .overcon').off('touchend.poplayerscroll').on('touchend.poplayerscroll', function(e) {
              return true;
          });

          this.$blockEl.off('touchend.poplayerscroll').on('touchend.poplayerscroll', function(e) {
              return true;
          });

      },
      hideDimmed: function(target, isDelFade) {
          var curScroll = -parseInt($('body').css('marginTop'));
          var wScrollTop = $(document).scrollTop(); //21-09-29 수정
          var curDimmed;
          if (target !== undefined && target !== '' && target.hasClass('dimmed')) {
              curDimmed = target;
          } else if (target) {
              curDimmed = target.next('.dimmed');
          } else {
              curDimmed = $('.dimmed'); //21-09-06 수정
              //curDimmed = this.$dimmed;
          }
          // dimmed 가 없으면 리턴
          if (curDimmed.length === 0) {               
              return;
          }
          //isDelFade : fade 효과 제거
          if (isDelFade === 'Y') {
              curDimmed.hide();
              // 팝업 위에 팝업 닫을 경우 뒤에 body 영역 계속 고정
              if ($('#layerPop > article:visible').length === 0 && $('.dimmed:visible').length === 0) {
                  $('html').css('height','');//21-06-29 노치 대응
                  $('body').css({
                      'position': '',
                      'width': '',
                      'height': '',
                      'left': '',
                      'marginTop': '',
                      'overflow': '',
                      'right': '',
                      'top': '',
                      'bottom': ''
                  });                   
                  $(window).scrollTop(curScroll);
              }
          } else {
              curDimmed.fadeOut(200, function() {
                  // 팝업 위에 팝업 닫을 경우 뒤에 body 영역 계속 고정
                  if ($('#layerPop > article:visible').length === 0 && $('.dimmed:visible').length === 0) {
                      $('body').css({
                          'position': '',
                          'width': '',
                          'height': '',
                          'left': '',
                          'marginTop': '',
                          'overflow': '',
                          'right': '',
                          'top': '',
                          'bottom': ''
                      });
                      if(curScroll > 0){
                          $(window).scrollTop(curScroll);
                      }else{//21-09-27 수정 
                          $(window).scrollTop(wScrollTop); 
                      }
                  }
              });
          }
          //팝업 뒤에 스크롤 방지 이벤트 풀기
          $('article, .overcon').off('touchmove.poplayerscroll');
      },
      _setLastFocus: function(target) {
          var oSelf = this;
          var lastFocus;
          setTimeout(function() {
              if (oSelf.curClickEl.length > 0) {
                  lastFocus = oSelf.curClickEl;                    
              }
              if (target.data('focus') === undefined && lastFocus !== '') {
                  target.data('focus', lastFocus);                         
              }     
          }, 300);           
      },
  };

  lc.selectBox = {
      init: function() {
          this.setEl();
          this._setElement();
          this._bindEvent();
      },
      _setElement: function() {
          this.dimmedWrap = $('.dimmed');
          this.$cardSel = $('div.card-select');
          this.$overCon = this.$cardSel.find('.overcon');

          this.$cardSel.find('>a').each(function() {
              if ($(this).attr('aria-disabled') !== 'true') {
                  $(this).attr('aria-expanded', 'false');
              }
          });
          this.$overCon.each(function() {
              $(this).css({
                  'bottom': -parseInt($(this).height())
              });
          });
      },
      setEl: function() {
          $.SelectBoxSet('div.selectbox select', {
              height: 200,
              multiText: '|'
          });
      },
      _bindEvent: function() {
          var oSelf = this;
          var $multi = $('.multiSelect');
          var $multiLi = $multi.find('.frmButton');
          var $btn = $multi.find('.btnL');
          // var arr;
          $multiLi.find('input').on('click',function(){
              arr =[];
              $multiLi.find('input:checked').each(function(){
                  arr.push($(this).find('+label').text());
              });
          });
          $btn.on('click',function(){
              var $target = $(this).parents('.overcon');
              if(arr[0] == undefined || arr[1] == undefined){
                  return false;
              }else if(arr[0] == '성별 전체' && arr[1] == '연령 전체'){
                  $multi.find('>a').text('연령/성별 전체');
              }else{
                  $multi.find('>a').text(arr[1] + ' ' + arr[0]);
              }
              oSelf._hideSelectBox($target);
          });
          $(document).off('click.cardSel');
          $(document).on('click.cardSel', '.card-select >a, .multiSelect > a', function(e) {
              e.preventDefault();
              if (
                  $(this).attr('aria-disabled') === 'true' ||
                  $(this).hasClass('disabled')
              ) {
                  return false;
              }
              oSelf._showSelectBox(e);
          });

          $(document).off('click.selClose');
          $(document).on('click.selClose', '.overcon .closeS', function() {
              var $target = $(this).parent('.overcon');
              oSelf._hideSelectBox($target);
          });

          $(document).off('click.selOpt');
          $(document).on('click.selOpt', '.overcon .con>li>a', function(e) {
              e.preventDefault();
              var $curText = $(this).html(),
                  $target = $(this).closest('.overcon'),
                  selectTit = $target.siblings('a');
              
              selectTit.html($curText);

              // 혜택리포트 관련 on class 추가
              if( $('.typeCalendar').length > 0 ){
                  selectTit.removeClass("on");
                  selectTit.parent().find('a').removeClass("on");
                  // $('.typeCalendar .overcon .con>li>a').removeClass("on");
                  $(this).addClass("on");
              }
              
              // 결제예정금액 
              if( $('.selectbox.card-select.typeHead').length > 0){
                  // selectTit.removeClass("on");
                  // $('.selectbox.card-select.typeHead .overcon .con>li>a').removeClass("on");
                  // $(this).addClass("on");
              }

              // 은행선택, 결제계좌선택
              if( $('.card-select.typeBank').length > 0){
                  // $('.card-select.typeBank .overcon .con>li>a').removeClass("on");
                  // selectTit.removeClass("on");
                  // $(this).addClass("on");
              }
              /* <!-- CSR-13734(김슬기, 2019.02.28) --> */
              if( $(this).parents('.card-select').hasClass('zeroSelect') ){
                  var selectCode = $(this).find('img').data('code');
                  selectTit.find('.txt').text(selectCode);
              }
              /* <!--// CSR-13734(김슬기, 2019.02.28) --> */

              oSelf._hideSelectBox($target);

              //세로 카드 케이스 클릭 할 경우
              if ($(this).closest('li').hasClass('typeH')) {
                  selectTit.addClass('typeH');
              } else {
                  selectTit.removeClass('typeH');
              }
          });

          function selBoxChg(){
              $("#selBox option").each(function(){
                  var selBoxVal = $(this).val();
                  $("."+selBoxVal).css("display","none");
              });
              var selVal = $("#selBox option:selected").val();
              $("."+selVal).css("display","");
              var pnLenght = $("."+selVal).find('.pageNote:eq(0)')
              if(pnLenght){
                  $(pnLenght).find('a.ctrl').attr('aria-expanded', 'true');
                  $(pnLenght).find('.cont').css('display', 'block');
              } else {
                  $(pnLenght).find('a.ctrl').attr('aria-expanded', 'false');
                  $(pnLenght).find('.cont').css('display', 'none');
              }
          }
          selBoxChg();
          $(document).on('click.selBox', '.overcon .con>li>a', function(){
              selBoxChg();
          });
          
          //21-08-30 [접근성] 선택했을때 대체텍스트 추가 [S]
          if( $('.card-select').length > 0 ){
              $('.overcon').each(function(){
                  $(this).find('li>a.on').attr('title', '선택됨');
              });
          }
          $(document).on('click.cardSel', '.card-select .overcon li>a', function(){
              $(this).closest('.overcon').find('li>a').attr('title', '');
              $(this).attr('title', '선택됨');
              $(this).closest('.card-select').find('>a.tit').attr('title', '선택함');
          });
          //21-08-30 [접근성] 선택했을때 대체텍스트 추가 [E]

          // 추가 결제대금
          $(document).off('click.selOpt2');
          $(document).on('click.selOpt2', '.selectbox.card-select.typeHead .overcon .con>li>a', function(e) {
              e.preventDefault();
              var $curText = $(this).html(),
                  $target = $(this).closest('.overcon'),
                  selectTit = $target.siblings('a');

              selectTit.html($curText);

              // 혜택리포트 관련 on class 추가
              if( $('.selectbox.card-select.typeHead').length > 0 ){
                  selectTit.removeClass("on");
                  selectTit.parent().find('a').removeClass("on");
                  $(this).addClass("on");
              }
          });

          //  dimmed 클릭시 팝업 오류 조치
          // $('body').off('click.selDim');
          // $('body').on('click.selDim', '.dimmed', function() {
          //     var $target = $('.overcon:visible');
          //     oSelf._hideSelectBox($target);
          // });

          $(document).off('keydown.selTit');
          $(document).on('keydown.selTit', '.selectbox a.tit', function(e) {
              if (e.keyCode === 13) {
                  $(this).trigger('click');
              }
          });

          this._tabFocus();
      },
      _tabFocus: function() {
          $(document).on('keydown', '.overcon .closeS', function(e) {
              if (e.shiftKey === false && e.keyCode === 9) {
                  $(this).closest('.overcon').find('.con a').eq(0).focus();
                  return false;
              }
          });

          $(document).on('keydown', '.overcon .con a', function(e) {
              if (e.shiftKey === true && e.keyCode === 9 && $(this).parent().index() === 0) {
                  $(this).closest('.overcon').find('.closeS').focus();
                  return false;
              }
          });
      },
      _showSelectBox: function(e) {
          var $target = $(e.currentTarget),
              $selectboxWrap = $target.siblings('.overcon'),
              $curSelBox = $target.closest('.card-select');
              $multiSelBox = $target.closest('.multiSelect');
          lc.layerPopup.createDimmed($curSelBox);
          lc.layerPopup.showDimmed($curSelBox);
          lc.layerPopup.createDimmed($multiSelBox);
          lc.layerPopup.showDimmed($multiSelBox);
          $target.attr('aria-expanded', 'true');
          $selectboxWrap.css('bottom', -$selectboxWrap.outerHeight());
          $multiSelBox.find('>a').addClass('on');
          $selectboxWrap.show();

          $selectboxWrap.animate({
                  'bottom': 0
              },
              200,
              'linear'

          );
          
          //21-09-09 [접근성] 초점 진입
          $selectboxWrap.find('.titSelect').attr('tabindex','0').focus();

      },
      _hideSelectBox: function(target) {
          var $target = target,
              targetHeight = -$target.height(),
              $targetBtn = target.closest('.card-select, .multiSelect').find('>a'),
              oSelf = this;
          $targetBtn.attr('aria-expanded', 'false');
          $targetBtn.removeClass('on');

          $target.animate({
                  'bottom': targetHeight
              },
              200,
              'linear',
              function() {
                  var curDimmed = $(this).closest('.selectbox').next('.dimmed');

                  if (curDimmed.length === 0) {
                      curDimmed = $(this).closest('.card-select,.multiSelect').next('.dimmed');
                  }

                  lc.layerPopup.delDimmed(curDimmed);
                  lc.layerPopup.hideDimmed(curDimmed);

                  $(this).hide();
                  var $target = target;
                  $target.siblings('a').focus();

                  //애니메이션 완료
                  oSelf._emit('closeTransitionEnd');
              }
          );


      },
      closeTransitionEnd: function(runCallbacks) {
          if (runCallbacks) {
              this._emitOn('closeTransitionEnd', runCallbacks);
          }
      },
      _emitOn: function(ev, cb) {   
          this.subscribers = {};
          this.subscribers[ev] = this.subscribers[ev] || [];
          this.subscribers[ev].push({
              callback: cb
          });
      },
      _emit: function(ev) {
          if (this.subscribers === undefined) {
              return;
          }
          var subs = this.subscribers[ev];
          var idx = 0;
          var args = Array.prototype.slice.call(arguments, 1);
          if (subs) {
              while (idx < subs.length) {
                  sub = subs[idx];
                  sub.callback.apply(sub.context || this, args);
                  idx++;
              }
          }
      }
  };

  lc.timeLimitBar = {
      init: function(time, callback) { 
          this.fnCallback = callback;
          this.setTimeId = Number(time) - 1;
          this._createLayout();
          this._startCount(Number(time));
          this._bindEvent();
      },
      _bindEvent: function() {
          $(document).off('click.timeClose');
          $(document).on('click.timeClose', '.extend', function(e) {
              //시간제한 레이어 닫기
              $(this).closest('.loginTime').css('display','none');
              lc.timeLimitBar._stopCount();
          });
      },
      _createLayout: function() {
          var oSelf = this;
          if ($('.loginTime').length === 0) {
              $('.sub-wrapper').prepend('<div class="loginTime" />');
              $('.loginTime').append('<div class="bar"></div><div class="loginTime-info"><div class="count"><span>01:00</span>초 후 로그아웃</div><button type="button" class="extend" title="1분 뒤 로그아웃 됩니다.">로그인 연장</button></div>');//21-10-27 [접근성] title 추가
          }

          setTimeout(function() {
              $('.loginTime').addClass('on');
              $('.loginTime .extend').focus();
              $('.loginTime .bar').css({
                  'transition': 'width ' + oSelf.setTimeId + 's linear',
                  'width': '0'
              });
          }, 1000);
      },
      _startCount: function(time) {
          var oSelf = this;
          if (this.timeId) {
              clearInterval(this.timeId);
          }
          this.setTime = Number(time);
          this.timeId = setInterval($.proxy(oSelf._markTime, this), 1000);
      },
      _markTime: function() {
          var oSelf = this;
          this.setTime--;

          var min = parseInt((this.setTime%3600)/60),
              sec = this.setTime%60;
          if( min < 10 ){
              min = "0"+min;
          }
          if( sec >= 0  && sec < 10 ){
              sec = "0"+sec;
          }else if( sec < 0 ){
              sec = "00";
          }

          if (this.setTime < 0) {
              clearInterval(this.timeId);
              if (this.fnCallback) {
                  setTimeout(function() {
                      oSelf.fnCallback();
                  }, 300);
              }
              oSelf.setTime = 0;
          }
          $('.loginTime .count > span').text(min + ":" + sec);
      },
      _stopCount: function() {
          clearInterval(this.timeId);
      }
  };
  
  lc.gnb ={
      init: function () {
          this._bindEvent();
          this._setDefaultAria();
      },
      _setDefaultAria(){
          $('.menu-list li').each(function(index){
              var setDefault = $(this).find('.is-active');
              $(this).attr('id', 'anchor'+ index).attr('anchor-index', '-1').attr('aria-selected', 'false');
          })
          $('.depth2-section').each(function(index){
              var setDefault = $(this).find('.is-active');
              $(this).attr('aria-labelledby', 'anchor'+ index).attr('anchor-index', '-1');
          })
      },
      _bindEvent: function (){
          if( $('.gnb-layer').hasClass('no-scroll') ){//21-10-25 디지털ARS-빠른카드신청 전체메뉴 제외
              return;
          }
          this._scroll();
      },
      _scroll: function(){ // layer 유형 (popup-content 스크롤)
          var scrollFnc;
          var depth2Section = $('.depth2-section');
          var menuList = $('.menu-list');
          var menuListChildren = $('.menu-list > li');
          var depth2Heights = [];

          $('.gnb-layer:not(.gnb-page) .popup-content').scroll(function(e){/*21-07-16 수정*/
              clearTimeout(scrollFnc);
              scrollFnc = setTimeout(function(){
                  scrollFinish();
              },100);
          })
          
          function setSize() {
              depth2Heights = [];
              depth2Section.each(function(){
                  depth2Heights.push($(this).height() + 32);
              })
          }

          function activeMenu(index){
              var targetTrigger = menuListChildren.eq(index);
              var targetX = -targetTrigger.offset().left + menuList.offset().left;
              
              targetTrigger.addClass('is-active')
                  .attr('anchor-index', '0').attr('aria-selected', 'true')
                  .siblings().removeClass('is-active')
                  .attr('anchor-index', '-1').attr('aria-selected', 'false');
              $('.scroll-x').animate({scrollLeft: -targetX + 'px'})
              $('.menu-sticky').removeClass('fixed')          
              if($('.popup-content').scrollTop() > 100){
                  $('.menu-sticky').addClass('fixed')
              }
              
          }
          function activeSection(index){
              var currentSection = depth2Section.eq(index)
              currentSection.addClass('is-active').attr('anchor-index', '0')
                  .siblings().removeClass('is-active').attr('anchor-index', '-1');
          }

          function scrollFinish() {
              var t = $('.popup-content').scrollTop() - 100;
              var h = 0;
              var index = 0;
              
              for(var i = 0; i< depth2Section.length; i ++){
                  h += depth2Heights[i];
                  if(t < h){
                      index = i;
                      break;
                  }
              }
              activeMenu(index);
              activeSection(index)
          }

          setSize();
          
          // 22-11-28  전체메뉴 개편으로 스크롤 값 구분
          var newScr = 0;
          var newGap = 0;
          if( $(".gnb-layer.type-new:visible").length ){
              newScr = $(".gnb-wrapper .gnb-head:visible").outerHeight() - 35;
              newGap = -31;
          }else{
              newScr = 0;
              newGap = 0;
          }

          $('.menu-list > li').on('click', function() {
              var _this = $(this);
              var index = _this.index();
              activeMenu(index); 
              var top = index ? depth2Heights.slice(0, index).reduce(function(a, b) { 
                  return a + b; 
              }) + 180 : newGap;

              $('.gnb-layer:not(.gnb-page) .popup-content').animate({'scrollTop': top + newScr + 'px'});
          })
      }, 
  }

  lc.numberCounter = {//21-07-30 숫자 카운터 추가
      init: function () {
          this.startAnimation(document);
      },
      startAnimation: function (parent) {
          $(parent).find('span[data-money]').each(function () {
              var $el = $(this)
              if ($el.length) {
                  var DURATION = 1.5
                  var DELAY = 0
                  var value = $el.data('money').toString()

                  if (value == 0) {
                      $el.html('0<em>원</em>')
                  }else {
                      var startValue = Math.pow(10, value.length - 1) || 0
                      var counter = {
                          value: startValue
                      }

                      var tLite = TweenLite.to(counter, DURATION, {
                          value,
                          delay: DELAY,
                          ease: Power3.easeInOut,
                          onUpdate: () => {
                              var value = Math.ceil(counter.value)
                              value = value.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,') + '<em>원</em>'
                              $el.html(value)
                          }
                      })

                      tLite.play()
                  }
              }
          });
      }
  }

  lc.evtDetail = {//21-08-04 혜택/이벤트 상세 헤더
      init: function () {
          this.evtDetailScroll();
      },
      evtDetailScroll: function () {
          var $subHeader = $("#sub_header_evt"),//21-09-08 헤더 아이디 수정
              $fixed_sub_header = $(".sub-header-fixed");
          if( $fixed_sub_header.length > 0 ){
              var subHeader_top = $subHeader.offset().top,
                  subHeader_h = $subHeader.height();
              scrollDetail();
              $(window).on('scroll', function(){
                  scrollDetail();
              });
              function scrollDetail() {
                  if($(window).scrollTop() >= (subHeader_top + subHeader_h)) {
                      $subHeader.attr('aria-hidden','true').addClass('hidden');
                      $fixed_sub_header.attr('aria-hidden','false').addClass('visible');
                  }else {
                      $subHeader.attr('aria-hidden','false').removeClass('hidden');
                      $fixed_sub_header.attr('aria-hidden','true').removeClass('visible');
                  }
              }
          }
      }
  }

  lc.termsTab = {//21-08-09 약관동의 탭
      init: function () {
          this.termsTab();
      },
      termsTab: function () {
          var $termsTab = $('.tabType02.tabToggle');
          if( $termsTab.length > 0 ){
              $termsTab.find('>li>a').on('click', function(){
                  var getIdx = ($(this).parent().index())+1;
                  $(this).closest('.tabType02.tabToggle').find('li').removeClass('on');
                  $(this).parent().addClass('on');
                  $(this).closest('.tabType02.tabToggle').siblings('.tabCont').removeClass('on');
                  $(this).closest('.tabType02.tabToggle').siblings('.tabCont:nth-of-type('+getIdx+')').addClass('on');
                  $(this).closest('.popup-content').scrollTop(0); //21-09-08 PJ11-30929 scrollTop 추가
              });
          }
      }
  }

  lc.hrFocusHidden = {//21-08-30 [접급성] 논리적 의미를 갖지 않는 요소 숨김
      init: function() {
          this.hrFocusHidden();
      },
      hrFocusHidden: function() {
          if( $('hr').length > 0 ){
              $('hr').attr('aria-hidden','true');
          }
      }
  }

  lc.swiperA11y = {//스와이프 접근성 대응
      init: function(el){
          this.swiperEl = el;
          this.setDefault();
      },
      setDefault: function(){
          var getSwiperId,
          this_swiper;
          $(this.swiperEl).each(function(){//스와이프 페이징에 접근성 초기값 설정
              this_swiper = $(this);
              getSwiperId = this_swiper.find('.swiper-wrapper').attr('id'); //slide id
              this_swiper.find('.swiper-slide').attr({'aria-hidden':'true'}).prepend('<span class="sr-only"></span>');
              this_swiper.find('.swiper-slide.swiper-slide-active').attr({'aria-hidden':'false'}).find('.sr-only').text('선택됨');
          });
          if( this_swiper.find('.swiper-pagination-bullets').length > 0 || this_swiper.next('.swiper-pagination-bullets').length > 0 ){
              this._setPaging(this.swiperEl, getSwiperId);
          }
      },
      setSlide: function(t,a){
          var $this = t,
              activeIdx = a;
          $this.attr({'aria-hidden':'true'}).find('.sr-only').text('');
          $this.eq(activeIdx).attr({'aria-hidden':'false'}).find('.sr-only').text('선택됨');
      },
      setNavigation: function(el){
          var swiperWrap = $(el);
          swiperWrap.prepend('<div class="swiper-navigation" tabindex="0"><button class="swiper-button-prev"></button><button class="swiper-button-next"></button></div>');
          swiperWrap.find('.swiper-navigation > button').focusin(function(){//focus in
              $(this).parent().css({'opacity':'1', 'z-index':'auto'});
          });
          swiperWrap.find('.swiper-navigation > button').last().focusout(function(){//focus out
              $(this).parent().css({'opacity':'0', 'z-index':'-1'});
          });
      },
      _setPaging: function(el, swiperId){
          //paging
          var cardslide_paging,
              this_swiper = $(el),
              swiperId = swiperId;
          if (this_swiper.next('.swiper-pagination-bullets').length > 0) {
              cardslide_paging = this_swiper.next('.swiper-pagination-bullets');
          }else if(this_swiper.find('.swiper-pagination-bullets').length > 0){
              cardslide_paging = this_swiper.find('.swiper-pagination-bullets');
          }
          cardslide_paging.attr('aria-controls', swiperId);
          cardslide_paging.find('a').attr({'href':'javascript:void(0)', 'title':''});
          cardslide_paging.find('a.swiper-pagination-bullet-active').attr({'title':'선택됨'});
      }
  }

  lc.init();
  return lc;
}(window.LOCA2_UI || {}, jQuery));