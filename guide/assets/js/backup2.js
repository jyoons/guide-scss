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
  guideUi.anchorMove = {
    init : function(){
      this.settings();
      this.event();
    },
    settings : function(){
      this.headerH = Math.ceil($('.g_header').outerHeight());
      this.pdT = parseInt($('.g_conts').css('padding-top'));
      this.anchorTrr = $('.anchor-trriger');
      this.anchorTar = $('.anchor-target');
      this.setDefaultAttr =  {'aria-selected':'false','tabindex':-1};
      this.setActiveAttr = {'aria-selected':'true','tabindex': 0};
      this.anchorTarArr = [];
      let anchorTarArr = this.anchorTarArr;
      $('.anchor-wrap').each(function(i){
        let anchorTrr = $('.anchor-wrap').eq(i).find('.anchor-trriger');
        let anchorTar = $('.anchor-wrap').eq(i).find('.anchor-target'); 
        let setActive = $('.anchor-wrap').eq(i).find('.anchor-trriger.active');
        $('.anchor-wrap').eq(i).attr({'anchor-dep1': i });
        anchorTrr.each(function(j){
          anchorTrr.eq(j).attr({'id': 'gAnchor' + i + ''+ j, 'aria-selected':'false', 'tabindex':-1, 'anchor-dep2':j});
          anchorTar.eq(j).attr({'aria-labelledby':'gAnchor' + i + ''+ j, 'aria-selected':'false', 'tabindex':-1});
          setActive.attr({'aria-selected':'true', 'tabindex':0});
          if(setActive.length <= 0){
            anchorTrr.eq(0).addClass('active').attr({'aria-selected':'true', 'tabindex':0});
          }
        });
        anchorTarArr.push([]);
        setTimeout(function(){
          anchorTar.each(function(t){
            anchorTarArr[i].push([Math.ceil(anchorTar.eq(t).offset().top), Math.ceil(anchorTar.eq(t).outerHeight())]);
          });
        }, 10);
      });
    },
    event : function(){
      $('.anchor-trriger>a').on('click', function(){
        let target = $(this);
        anchorMove.action(target);
      });

      // $(window).scroll(function(){
      //   let target = $(this);
      //   anchorMove.scroll(target);
      // });
      // this.scroll();
    },
    action : function(target){
      console.log(this.anchorTarArr);
      let idx1 = target.closest('.anchor-wrap').attr('anchor-dep1');
      let idx2 = target.closest('.anchor-trriger').attr('anchor-dep2');
      let anchorTrr = target.closest('.anchor-wrap').find('.anchor-trriger');
      let anchorTar = target.closest('.anchor-wrap').find('.anchor-target'); 
      let posT = this.anchorTarArr[idx1][idx2][0];
      anchorTrr.removeClass('active').attr(this.setDefaultAttr);
      anchorTrr.eq(idx2).addClass('active').attr(this.setActiveAttr);
      anchorTar.attr(this.setDefaultAttr);
      anchorTar.eq(idx2).attr(this.setActiveAttr);
      _clickMove('html, body', (this.pdT + this.headerH));
      function _clickMove(elem, term){
        $(elem).animate({
          scrollTop : posT - term
        }, 200);
      }
    },
    scroll : function(target){
      let anchorTarArr = this.anchorTarArr;
      let idx1 = target.closest('.anchor-wrap').attr('anchor-dep1');
      let idx2 = target.closest('.anchor-trriger').attr('anchor-dep2');
      _scroll(window);
      function _scroll(elem){
        $(elem).scroll(function(){
          let thisT = $(this).scrollTop();
  
          console.log(anchorTarArr);
          
        })
      }
      // let thisT = target.scrollTop();
      // let arr = this.anchorTarTH;
      // let term = (this.headerH + this.pdT);
      this.anchorTar.each(function(i){
        // if(thisT >= (arr[i][0] - term) && thisT < ((arr[i][0] + arr[i][1]) - term)){
        //   $(elem1).removeClass('active').attr({'aira-selected':'false', 'tabindex':-1});
        //   $(elem1).eq(i).addClass('active').attr({'aira-selected':'true', 'tabindex':0});
        //   $(elem2).attr({'aira-selected':'false', 'tabindex':-1});
        //   $(elem2).eq(i).attr({'aira-selected':'true', 'tabindex':0});
        // }


      })
    }
  }
  guideUi.init();
  return guideUi;
}(window, jQuery);