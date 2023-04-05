"use strict";

const guideUi = function (guideUi, $) {
  guideUi.init = function () {
    guideUi.guideMenu.init();
  };
  guideUi.pageTitle = document.title;
  guideUi.gMenu = [
    [['Form', 'form.html'], [['체크박스', '_checkbox.html'], ['라디오버튼', '_radio.html'], ['input', '_input.html']]], 
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
            $('.g_headerList>li').eq(i).addClass('active');
          }
        });
        if(gMenu[i][1][0] !== 0 && $('.g_lnbList').length > 0 && pageTitle === gMenu[i][0][0]){
          for(let j=0; j<gMenu[i][1].length; j++){//left menu
            let gm2 = '<li id="gAnchor' + j + '" class="anchor-trriger"><a href="javascript:void(0)" title="' + gMenu[i][1][j][0] + '">' + gMenu[i][1][j][0] + '</a></li>';
            let data = '<div class="anchor-target g_conts_items item' + j + '">' + 
                        '<div class="tit">' + gMenu[i][1][j][0] + '</div>' + 
                        '<div class="code-viewWrap"></div>' + 
                        '</div>';
            $('.g_lnbList').append(gm2);
            $('.g_conts').append(data);
            $('.g_conts_items.item' + j + ' .code-viewWrap').load(gMenu[i][1][j][1]);
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
  guideUi.init();
  return guideUi;
}(window, jQuery);

window.addEventListener('DOMContentLoaded', function(){
  guideUi.guideMenu.init();
});