"use strict";

const guideUi = function (guideUi, $) {
  guideUi.init = function () {
    guideUi.guideMenu.init();
    guideUi.anchorMove.init();
  };
  guideUi.pageTitle = document.title;
  guideUi.gMenu = [
    [['Form', 'form.html'], [['체크박스', 'checkbox.html'], ['라디오버튼', 'radio.html'], ['input', 'input.html']]], 
    [['팝업', 'popup.html'], ['layer팝업', 'toast팝업']], 
    [['버튼', 'button.html'], [0]], 
    [['menu4', ''], [0]],
    [['menu5', ''], [0]],
  ];

  guideUi.guideMenu = {
    init :function(){
      this.settings();
    },
    settings : function(){
      for(let i=0; i<gMenu.length; i++){
        let gm1 = '<li><a href="' + gMenu[i][0][1] + '" title="Form">' + gMenu[i][0][0] + '</a></li>';
        $('.g_headerList').append(gm1);
        $('.g_headerList>li').each(function(i){//active
          const menuTitle = $('.g_headerList>li').eq(i).children('a').text();
          if(pageTitle === menuTitle){
            $('.g_headerList>li').eq(i).addClass('active')
          }
        });
        if(gMenu[i][1][0] !== 0 && $('.g_lnbList').length > 0 && pageTitle === gMenu[i][0][0]){
          for(let j=0; j<gMenu[i][1].length; j++){//left menu
            let gm2 = '<li id="gAnchor' + j + '" class="anchor-trriger"><a href="javascript:void(0)" title="' + gMenu[i][1][j][0] + '">' + gMenu[i][1][j][0] + '</a></li>';
            let data = '<div class="anchor-target g_conts_items item' + j + '" aria-labelledby="gAnchor' + j + '">' + 
                        '<div class="tit">' + gMenu[i][1][j][0] + '</div>' + 
                        '<div class="code-viewWrap"></div>' + 
                        '</div>';
            $('.g_lnbList').append(gm2);
            // $('.g_lnbList>li').attr({'aria-selected':'false', 'tabindex':-1});
            // $('.g_lnbList>li').eq(0).addClass('active').attr({'aria-selected':'true', 'tabindex':0});
            $('.g_conts').append(data);
            $('.g_conts_items.item' + j + ' .code-viewWrap').load(gMenu[i][1][j][1]);
            // $('.g_conts_items').attr({'aria-selected':'false', 'tabindex':-1});
            // $('.g_conts_items[aria-labelledby="gAnchor0"]').attr({'aria-selected':'true', 'tabindex':0});
          }
        }else if(gMenu[i][1][0] === 0 && $('.g_lnbList').length > 0 && pageTitle === gMenu[i][0][0]){
          $('.g_contsArea .g_lnb').css({'display':'none'});
          $('.g_contsArea .g_conts').css({'left':0, 'width': '100%'});
        }
      }
    },
    event : {
      active: function(elem){
      }
    }
  }
  guideUi.anchorMove = {
    init : function(){
      this.settings();
      // this.event();
    },
    settings : function(){
      this.headerH = Math.ceil($('.g_header').outerHeight());
      this.pdT = parseInt($('.g_conts').css('padding-top'));
      this.anchorTrr = $('.anchor-trriger');
      this.anchorTar = $('.anchor-target');
      this.anchorTarTH = [];
      let anchorTarTH = this.anchorTarTH;
      let anhTrr = $('.anchor-trriger');
      let anhTar = $('.anchor-target');

      setTimeout(function(){
        anhTar.each(function(i){
          anchorTarTH.push([Math.ceil($('.anchor-target').eq(i).offset().top), Math.ceil($('.anchor-target').eq(i).outerHeight())]);
          anhTrr
        });
      }, 10);

      $('.anchor-wrap').each(function(i){
        let anchorTrr = $('.anchor-wrap').eq(i).find('')
      });



      /* active id labeldby*/
    

      // $('.anchor-list').each(function(i){
      //   let setActive = $(this).find('.anchor-trriger.active').length;
      //   $('.anchor-trriger').attr({'aira-selected':'false', 'tabindex':-1});
      //   if(setActive === 0){
      //     $('.anchor-list').eq(i).find('.anchor-trriger').eq(0).addClass('active');
      //   }
      // });
      
    },
    event : function(elem){
      $('.g_lnbList>li>a').on('click', function(){
        let target = $(this);
        anchorMove.action(target);
      });
      $(window).scroll(function(){
        anchorMove.scrollEvent('.anchor-trriger', '.anchor-target');
      });
    },
    action : function(target){
      let labelledby = target.parent().attr('id');
      let posT = Math.ceil($('.g_conts_items[aria-labelledby="' + labelledby + '"]').offset().top);
      // target.parents('ul.g_lnbList').find('li').removeClass('active').attr({'aira-selected':'false', 'tabindex':-1});
      // target.parent('li').addClass('active').attr({'aira-selected':'true', 'tabindex':0});
      // $('.g_conts_items').attr({'aria-selected':'false', 'tabindex':-1});
      // $('.g_conts_items[aria-labelledby="' + labelledby + '"]').attr({'aria-selected':'true', 'tabindex': 0});
      $('html, body').animate({
        scrollTop : posT - this.pdT - this.headerH
      }, 200);
    },
    scrollEvent : function(elem1, elem2){
      let winT = $(window).scrollTop();v
      let arr = this.anchorTarTH;
      let term = (this.headerH + this.pdT);
      this.anchorTar.each(function(i){
        if(winT >= (arr[i][0] - term) && winT < ((arr[i][0] + arr[i][1]) - term)){
          $(elem1).removeClass('active').attr({'aira-selected':'false', 'tabindex':-1});
          $(elem1).eq(i).addClass('active').attr({'aira-selected':'true', 'tabindex':0});
          $(elem2).attr({'aira-selected':'false', 'tabindex':-1});
          $(elem2).eq(i).attr({'aira-selected':'true', 'tabindex':0});
        }
      })
    }
  }
  guideUi.init();
  return guideUi;
}(window, jQuery);