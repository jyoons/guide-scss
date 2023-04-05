
        const myUi ={
            init :function(){
                this.settings();
            },
            settings() {
                this.winH = window.innerHeight;
                this.feedFT = document.querySelector('.feedPos').offsetTop;
                this.targetScroll =  document.querySelector('.my-content-wrap');
                this.targetFeed = document.querySelector('.main-feedlayer');
                this.feedTop = document.querySelector('.feedlayer-top');
                this.headerH = document.querySelector('.main-header').offsetHeight;
                this.dragWrapH = document.querySelector('.dragwrap').offsetHeight;
                this.feedBtnH = 70; // bottom button height
                document.body.classList.add('fix');
                gsap.set('html',  {css: {height : 'calc(100% + var(--safe-bottom) + var(--safe-top)'}});
                gsap.to('html, body, .my-content-wrap', 0, {scrollTo : 0});
                gsap.to('.main-feedlayer.fixed', 0.4, {y : this.feedFT});
                this.targetFeed.classList.add('firstView');
                gsap.set('.my-content-wrap', {height: 'calc(' + (this.dragWrapH - this.headerH - this.feedBtnH) + 'px + var(--safe-bottom)'});
                gsap.set('.dragwrap', {height:(this.dragWrapH - this.feedFT)});
            },
            go_bottom : function(){
                gsap.set('.dragwrap', {height:'calc(100% - '+ this.feedFT + 'px)'});
                this.targetFeed.classList.remove('firstView');
                gsap.to('.main-mydata', 0.2, {y : 100, opacity:0});            
                gsap.to('.navi-bar', 0.2, {y : 100, opacity:0});                                         
                gsap.to('.main-feedlayer.fixed', 0.4, {y:this.feedFT, top:(this.dragWrapH - this.feedBtnH - this.feedFT + (this.headerH - 56)), height:'calc(' + this.feedBtnH + 'px + var(--safe-bottom)', onComplete: () => {                                         
                    this.feedTop.classList.add('up');        
                    }
                });          
            },
            go_firstView : function(){
                gsap.set('.dragwrap', {height:'calc(100% - '+ this.feedFT + 'px)'});
                this.targetFeed.classList.remove('full');    
                this.targetFeed.classList.add('firstView');
                gsap.to('.main-mydata', 0.2, {y : 0, opacity:1, delay:0.6});
                gsap.to('.navi-bar', 0.2, {y : 0, opacity:1, delay:0.4});                        
                gsap.to('.main-feedlayer.fixed', 0.4, {y :0, top: this.feedFT, height:'auto', onComplete: () => {      
                    this.feedTop.classList.remove('up');                                                                 
                    }
                });
            },
            go_full : function(){
                gsap.set('.dragwrap', {height:'calc(100% - ' + this.headerH + 'px)'});
                this.targetFeed.classList.add('full');    
                this.targetFeed.classList.remove('firstView');                    
                gsap.to('.main-feedlayer.fixed', 0.4, {y :0, top: this.headerH, onComplete: () => {                                     
                        gsap.to('.main-mydata', 0.2, {y : 100, opacity:0, delay:0.2});
                        gsap.to('.navi-bar', 0.2, {y : 100, opacity:0, delay:0.4});
                    }
                });
                Draggable.get('.main-feedlayer.fixed').disable();
                let innerElem = document.querySelector('.feedlayer-inner');
                let nowElemT = innerElem.scrollTop;
                innerElem.addEventListener('scroll', function(e){
				    let thisElemT =  innerElem.scrollTop; 
                    if(nowElemT > thisElemT && thisElemT == 0 || thisElemT < 0){
                        Draggable.get('.main-feedlayer.fixed').enable();
                    }
                    nowElemT = thisElemT; 
                });                
            },
            drag_event : function(){
                /*setting*/
                this.targetFeed.addEventListener('touchstart', function(){ 
                    // gsap.set('.main-feedlayer.fixed', {css:{zIndex:20}});
                });
                this.targetFeed.addEventListener('click', function(){ 
                    // gsap.set('.main-feedlayer.fixed', {css:{zIndex:10}});
                });

                Draggable.create(".main-feedlayer.fixed", {
                    type : 'y',
                    bounds:{
                        target : ".dragwrap",
                        minY : "-=20"
                    },
                    // allowEventDefault:false,
                    onDrag : function(){
                        gsap.set('.main-feedlayer.fixed', {css:{zIndex:20, height:'auto'}});
                        // document.body.classList.add('fix');
                        gsap.to('html, body, .my-content-wrap, .main-feedlayer.fixed, .main-feedlayer.fixed .feedlayer-inner', 0, {scrollTo : 0});
                    },
                    onDragEnd:function(){
                        let targetFeed =  document.querySelector('.main-feedlayer');
                        let hasClass = targetFeed.className;
                        if(this.getDirection() == "up"){
                            if(hasClass.indexOf('firstView')>-1){// up : go top
                                myUi.go_full();                           
                                /*move top*/
                                document.querySelector('.move-top').addEventListener('click', function(){ 
                                    gsap.to('.feedlayer-inner', 0.4, {scrollTo : 0});    
                                });
                                /*head 터치시 drag enable*/
                                document.querySelector('.feedlayer-top').addEventListener('touchstart', function(){ 
                                    Draggable.get('.main-feedlayer.fixed').enable();
                                });                               
                            }else{// up : go first view
                                myUi.go_firstView();         
                            }                       
                        }else if(this.getDirection() == "down"){
                            if(hasClass.indexOf('firstView')>-1){ // down : go bottom                        
                                myUi.go_bottom();
                            }else{ // down : go first view
                                myUi.go_firstView();  
                            }
                        }
                    }
                });
            },
            layer_scroll : function(){
                this.targetScroll.addEventListener('scroll', function(e){                        
                    let thisTpos = e.target.scrollTop;
                    if(thisTpos == 0 ){
                        setTimeout(function(){
                            myUi.go_firstView();
                        }, 400);                                           
                    }else{
                        setTimeout(function(){
                            myUi.go_bottom();
                        }, 200);
                    }                          
                });
            },
            feedExtend : function(){
                const feedTargets = document.querySelectorAll('.my-banner');
                const feedTarget = document.querySelector('.my-banner');
                const feedWrap = document.querySelector('.feedlayer-inner');
                let dimmed = document.createElement('div');                   
                for(let i=0; i<feedTargets.length; i++){          
                    feedTargets[i].onclick = function(e){//extend open
                        let feedtype = e.currentTarget.className;
                        if(feedtype.indexOf('extendFeed-type1')>-1 || feedtype.indexOf('extendFeed-type2')>-1 || feedtype.indexOf('extendFeed-type3')>-1){
                            let _feedTop = e.currentTarget.getBoundingClientRect().top - 34;
                            let feedFlag = document.querySelectorAll('.main-feedlayer.fixed').length;
							let elemT;
							if(feedFlag > 0){
								let hasClass = document.querySelector('.main-feedlayer.fixed').className;								
								if(hasClass.indexOf('firstView')>-1){
									elemT = document.querySelector('.feedPos').offsetTop;
								}else{
									elemT = document.querySelector('.main-header').offsetHeight;
								}
								gsap.set('.main-feedlayer.fixed', {css: {'overflow':'initial', zIndex:102}});
								Draggable.get('.main-feedlayer.fixed').disable();
							}else{
								let wScroll = window.scrollY;
								document.body.classList.add('scrollOff');
								document.querySelector('.loca-wrapper').classList.add('scrollOff');
								gsap.to('.loca-wrapper', 0, {scrollTo : wScroll});
								elemT = 0;
							}
                            gsap.set('.my-content-wrap, .feedlayer-inner', {'-webkit-overflow-scrolling':'auto', 'overflow-y':'hidden'});
                            dimmed.style.display = 'block';
                            dimmed.classList.add('dimmed');
                            feedWrap.appendChild(dimmed);
                            feedTargets[i].classList.add('feedlayer-extend-active');
                            gsap.set('.dimmed', {y:-elemT, height:document.body.clientHeight});
                            if(feedtype.indexOf('extendFeed-type1')>-1){
                                gsap.fromTo('.feedlayer-extend-active', 0.3, {top : _feedTop}, {width:'calc(100% + 100px)', top:'calc(0px + var(--safe-top))', borderRadius:0, y:-elemT, onComplete: () => {
                                    gsap.set('.feedlayer-extend-active',  {transform:'translate3d(-50%, -'+ elemT + ', 0)'});
                                }});
                                document.querySelector('.test1').classList.add('extend-conts-type1');
                                gsap.set('.feedlayer-extend-conts.extend-conts-type1', {'display':'block', onComplete: () => {
                                    gsap.to('.feedlayer-extend-conts.extend-conts-type1', 0, {scrollTo : 0});
                                    gsap.fromTo('.feedlayer-extend-conts.extend-conts-type1', 0.2, {height:0}, {top:'calc(0px + var(--safe-top))', height:'100%', delay:0.1, onComplete: () => {
                                    gsap.fromTo('.feedlayer-extend-conts .detail-container-btn.fixedBtn', 0.4, {opacity:0}, {opacity:1});
                                        popupSwiper.swiper('.article-swiper-container');
                                        buttonPos('.extend-conts-type1');
                                        document.querySelector('.feedlayer-extend-conts.test1 .btn-close').tabIndex = 0;  
                                        document.querySelector('.feedlayer-extend-conts.test1 .btn-close').focus();      
                                            }                                
                                        });                                       
                                    }                                   
                                });
                                gsap.set('.feedlayer-extend-active .my-banner-cont', {opacity:0});
                            }else if(feedtype.indexOf('extendFeed-type2')>-1){
                                gsap.set('.feedlayer-extend-active .my-banner-cont', {'display':'none'});
                                gsap.fromTo('.feedlayer-extend-active', 0.3, {top : _feedTop}, {width:'calc(100% + 2px)', top:'calc(0px + var(--safe-top))', borderRadius:0, y:-elemT, onComplete: () => {}});
                                document.querySelector('.test2').classList.add('extend-conts-type2');
                                gsap.set('.feedlayer-extend-conts.extend-conts-type2', {'display':'block', onComplete: () => {
                                    gsap.to('.feedlayer-extend-conts.extend-conts-type2', 0, {scrollTo : 0});
                                    gsap.fromTo('.feedlayer-extend-conts.extend-conts-type2', 0.2, {top:'calc(0px + var(--safe-top))', height:0}, {top:'calc(0px + var(--safe-top))', height:'100%', delay:0.1});
                                    document.querySelector('.feedlayer-extend-conts.test2 .btn-close').tabIndex = 0;  
                                    document.querySelector('.feedlayer-extend-conts.test2 .btn-close').focus();      
                                    }
                                })
                            }else if(feedtype.indexOf('extendFeed-type3')>-1){
                                gsap.fromTo('.feedlayer-extend-active', 0.3, {top : _feedTop}, {width:'calc(100% + 1px)', height:234, top:'calc(40px + var(--safe-top))', borderRadius:'20px 20px 0 0', y:-elemT});/*21-07-09 height 추가*/
                                document.querySelector('.test3').classList.add('extend-conts-type3');
                                gsap.set('.feedlayer-extend-conts.extend-conts-type3', {'display':'block', onComplete: () => {
                                    gsap.to('.feedlayer-extend-conts.extend-conts-type3', 0, {scrollTo : 0});
                                    gsap.fromTo('.feedlayer-extend-conts.extend-conts-type3', 0.2, {top:'calc(40px + var(--safe-top))', height:0}, {top:'calc(40px + var(--safe-top))', height:'100%', delay:0.1, onComplete: () => {
                                        gsap.fromTo('.feedlayer-extend-conts .detail-container-btn.fixedBtn', 0.4, {opacity:1}, {opacity:1, delay:0.2}); opacity: 1 //21-09-27 PJ11-31389 수정
                                        buttonPos('.extend-conts-type3'); //21-09-27 PJ11-31389 수정
                                        document.querySelector('.feedlayer-extend-conts.test3 .btn-close').tabIndex = 0;  
                                        document.querySelector('.feedlayer-extend-conts.test3 .btn-close').focus();                        
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }                   
                }
            },
            feedExtendClose : function(){
                const feedCloses = document.querySelectorAll('.feedlayer-extend-conts .btn-close');  
                for(let i=0; i<feedCloses.length; i++){ 
                    feedCloses[i].onclick = function(e){
                        const btnhasClass = e.currentTarget.parentNode.className; 
                        const feedActive = document.querySelector('.my-banner.feedlayer-extend-active');
                        const feedActiveLen = document.querySelectorAll('.my-banner.feedlayer-extend-active').length;
                        document.querySelector('.dimmed').remove();
                        if(feedActiveLen > 0){ // feed 확장일 경우
							let feedFlag = document.querySelectorAll('.main-feedlayer.fixed').length;
							if(feedFlag > 0){
								gsap.to('.main-feedlayer.fixed',  0.1, {css: {'overflow':'hidden',  zIndex:20}});
							}else{
								var wScrollTop = document.querySelector('.loca-wrapper').scrollTop;
								document.body.classList.remove('scrollOff');
								document.querySelector('.loca-wrapper').classList.remove('scrollOff');
								gsap.to('body, html', 0, {scrollTo : wScrollTop});
							}                           
                            gsap.set('.my-content-wrap, .feedlayer-inner', {'-webkit-overflow-scrolling':'touch', 'overflow-y':'auto'});                           
                            feedActive.tabIndex=0;
                            feedActive.focus();
                            let hasClass = document.querySelector('.main-feedlayer').className;
                            if(hasClass.indexOf('firstView')>-1){
                                Draggable.get('.main-feedlayer.fixed').enable();
                            }
                            gsap.to('.feedlayer-extend-active', 0.2, {width:'100%', top:'20%', borderRadius:'10px', y: 0});                       
                            if(btnhasClass.indexOf('extend-conts-type1')>-1){                                      
                                gsap.to('.feedlayer-extend-conts', 0.1, {top:'50%', height:0, onComplete: () => {
                                    gsap.set('.feedlayer-extend-conts', {'display':'none'});
                                    document.querySelector('.feedlayer-extend-conts.test1').classList.remove('extend-conts-type1');
                                    document.querySelector('.feedlayer-extend-conts.test4').classList.remove('extend-conts-type1');}
                                });
                                gsap.fromTo('.feedlayer-extend-active .my-banner-cont', 0.2, {opacity:0}, {opacity:1,  onComplete: () => {                                 
                                    feedActive.classList.remove('feedlayer-extend-active');
                                    }
                                }); 
                            }else if(btnhasClass.indexOf('extend-conts-type2')>-1){                                                                                   
                                gsap.to('.feedlayer-extend-conts', 0.1, {top:'50%', height:0, onComplete: () => {
                                    gsap.set('.feedlayer-extend-conts', {'display':'none'});
                                    document.querySelector('.feedlayer-extend-conts.test2').classList.remove('extend-conts-type2');}
                                });                                    
                                gsap.set('.feedlayer-extend-active .my-banner-cont', {'display':'block', onComplete: () => {
                                    feedActive.classList.remove('feedlayer-extend-active');}
                                });
                            }else if(btnhasClass.indexOf('extend-conts-type3')>-1){                                                                                        
                                gsap.to('.feedlayer-extend-conts', 0.1, {top:'50%', height:0, onComplete: () => {
                                    gsap.set('.feedlayer-extend-conts', {'display':'none'});
                                    document.querySelector('.feedlayer-extend-conts.test3').classList.remove('extend-conts-type3');}
                                });                                    
                                gsap.set('.feedlayer-extend-active .my-banner-cont', {'display':'block', onComplete: () => {
                                    gsap.to('.feedlayer-extend-active', 0.2, {height:180});/*21-07-09 추가*/
                                    feedActive.classList.remove('feedlayer-extend-active');}
                                });                                       
                            }
                        }else{//아티클 전체보기 / 연관아티클
                            let thisPosT = document.querySelector('.article-swiper-conts.feedlayer-extend-active').offsetTop;
                            let feedWrap = document.querySelector('.article-tabconts-container .swiper-wrapper');
                            let feedActive = document.querySelector('.article-swiper-conts.feedlayer-extend-active');
                            let feedActiveElem = '.article-swiper-conts.feedlayer-extend-active .img-wrapper'; 
                            feedWrap.classList.remove('feedlayer-extend-activeWrap');
                            gsap.to(feedWrap,  0.1, {css: {zIndex:19}});                                                            
                            if(btnhasClass.indexOf('extend-conts-type1')>-1){    
                                gsap.to(feedActiveElem, 0.2, {width:'100px', top: thisPosT, borderRadius:'10px', onComplete: () => {
                                    feedActive.classList.remove('feedlayer-extend-active');
                                    }
                                });                                   
                                gsap.to('.feedlayer-extend-conts', 0.1, {top:'50%', height:0, onComplete: () => {
                                    gsap.set('.feedlayer-extend-conts', {'display':'none'});
                                    document.querySelector('.feedlayer-extend-conts.test1').classList.remove('extend-conts-type1');
                                    document.querySelector('.feedlayer-extend-conts.test4').classList.remove('extend-conts-type1');
                                    }
                                });
                            }
                            feedActive.tabIndex = 0;
                            feedActive.focus();
                        }                   
                    }
                }
            },
            feedExtendDetail : function(){
                let feedTargets = document.querySelectorAll('.article-swiper-conts');
                let feedTarget = document.querySelector('.article-swiper-conts');
                let feedWrap = document.querySelector('.article-tabconts-container .swiper-wrapper');
                let feedCloses = document.querySelectorAll('.feedlayer-extend-conts .btn-close'); 
                let feedActiveElem = '.article-swiper-conts.feedlayer-extend-active .img-wrapper'; 
                let dimmed = document.createElement('div');                   
                for(let i=0; i<feedTargets.length; i++){          
                    feedTargets[i].onclick = function(e){//extend open
                        let dimLen =  document.querySelectorAll('.dimmed').length;
                        // let activeHasClass = e.currentTarget.parentNode.className;                                          
                        if(dimLen == 0){
                        let thisPosT = feedTargets[i].offsetTop;   
                        dimmed.style.display =' block';
                        dimmed.classList.add('dimmed');
                        feedWrap.appendChild(dimmed);                   
                        feedWrap.classList.add('feedlayer-extend-activeWrap');   
                            feedTargets[i].classList.add('feedlayer-extend-active');
                            document.querySelector('.feedlayer-extend-conts.test1').classList.add('extend-conts-type1');						
                            gsap.set(feedWrap, {css: {zIndex:102}});
                            gsap.fromTo(feedActiveElem, 0.2, {top: thisPosT}, {width:'100%', left:0, top:'calc(0px + var(--safe-top))', borderRadius:0});
                            gsap.set('.feedlayer-extend-conts.extend-conts-type1', {'display':'block', onComplete: () => {
                                gsap.to('.feedlayer-extend-conts.extend-conts-type1', 0, {scrollTo : 0});
                                gsap.fromTo('.feedlayer-extend-conts.extend-conts-type1', 0.2, {height:0}, {top:'calc(0px + var(--safe-top))', height:'100%', delay:0.1, onComplete: () => {
                                gsap.fromTo('.feedlayer-extend-conts .detail-container-btn.fixedBtn', 0.4, {opacity:0}, {opacity:1});
                                    popupSwiper.swiper('.article-swiper-container');
                                    buttonPos('.extend-conts-type1');
                                    document.querySelector('.feedlayer-extend-conts.test1 .btn-close').tabIndex = 0;  
                                    document.querySelector('.feedlayer-extend-conts.test1 .btn-close').focus();      
                                }                                
                                    });                               
                                }
                            });
                        }else{ //연관아티클
                            document.querySelector('.feedlayer-extend-conts.test1').classList.remove('extend-conts-type1');
                            document.querySelector('.feedlayer-extend-conts.test4').classList.add('extend-conts-type1');
                            gsap.set('.feedlayer-extend-conts.test1', {'display' : 'none'});
                            gsap.set('.feedlayer-extend-conts.extend-conts-type1', {'display':'block', onComplete: () => {
                                gsap.fromTo('.feedlayer-extend-conts.extend-conts-type1', 0.2, {height:0}, {top:'calc(0px + var(--safe-top))', height:'100%', onComplete: () => {
                                gsap.fromTo('.feedlayer-extend-conts .detail-container-btn.fixedBtn', 0.2, {opacity:0}, {opacity:1});
                                    popupSwiper.swiper('.article-swiper-container');
                                    buttonPos('.extend-conts-type1');
                                    document.querySelector('.feedlayer-extend-conts.test4 .btn-close').tabIndex = 0;  
                                    document.querySelector('.feedlayer-extend-conts.test4 .btn-close').focus();      
                                        }                                
                                    });                            
                                }
                            });
                        }                    
                    }
                }
            }
        }
        if(document.querySelector('.main-feedlayer').className.indexOf('fixed')>-1){
            myUi.init();
            myUi.drag_event();
            myUi.layer_scroll();
            myUi.feedExtend();
            myUi.feedExtendClose(); 
            myUi.feedExtendDetail();
        }
        /*전체보기*/
        var popupSwiper = {
            swiper : function(obj){
                var swiper = new Swiper(obj,{
                    itialSlide:0,
                    nested :true,
                    slidesPerView:1.2,
                    on: {//21-08-27 PJ11-26728 추가
                        slideChange : function(e){
                            var w = e.slides.outerWidth();
                            if((e.slides.length - 1) == e.activeIndex){                                
                                gsap.to(e.slides.parent('.swiper-wrapper'), 0.2, {x : -((w * e.activeIndex))});                               
                            }                            
                        }   
                    }
                })
            }           
        }
        function buttonPos(target){
            let scrollElem = document.querySelector('.feedlayer-extend-conts' + target + '');
			let elem1 = document.querySelector(target + ' .detail-container');
			let elem2 = document.querySelector(target + ' .detail-container-btn');
			/*21-09-03 수정*/
			var t1 = Math.ceil(document.querySelector(target + ' .detail-container').offsetHeight);
            var t2 = $(window).height();
			let t3 = Math.ceil(document.querySelector(target + ' .detail-container').offsetTop);
			var h1 = document.querySelector(target + ' .detail-container-btn').offsetHeight;
            var gubun = ((t3 - t2) + (t1 - t3) - (h1 * 2));
            scrollElem.addEventListener('scroll', function(e){
				let thisTpos =  scrollElem.scrollTop;
                if(target == '.extend-conts-type3'){//header 노출
                    if(thisTpos > 150){
                        document.querySelector(target + ' .detail-container-header').style.display = 'block';
                    }else{
                        document.querySelector(target + ' .detail-container-header').style.display = 'none';
                    }
                }else{
                    if(thisTpos > gubun){/*21-09-03 수정*/
					elem1.classList.remove('fixedBtn');
					elem2.classList.remove('fixedBtn');
                    }else{
                        elem1.classList.add('fixedBtn');
                        elem2.classList.add('fixedBtn');
                    }			
                }
				
			});	
		}
        /*accordian*/
		var setButtonClick = function() {
			this.$accordion = $('.accordion');
			this.$accordion.each(function() {
				var _this = $(this);
				var $btnFold = _this.find('.btn-fold');
				var $foldBody = _this.find('.fold-body');

				$btnFold.on('click', function() {
					if (_this.hasClass('disabled')) return false;
					_this.hasClass('is-active') ? accordionClose() : accordionOpen();                    
				});
				function accordionOpen() {
					_this.addClass('is-active');
					_this.siblings().removeClass('is-active');
					$btnFold.text('펼치기').attr('aria-expanded', 'true');
					_this.siblings().find('.btn-fold').text('접기').attr('aria-expanded', 'false');

				}
				function accordionClose() {
					_this.removeClass('is-active');
					$btnFold.text('펼치기').attr('aria-expanded', 'false');
				}
				function siblingsClose() {
					_this.siblings().find('.fold-body').slideUp(200, function() {
						_this.siblings().removeClass('is-active');
						_this.siblings().find('.btn-fold').text('접기').attr('aria-expanded', 'false');
					});
					_this.siblings().find('.btn-fold').text('펼치기').attr('aria-expanded', 'true');
					return false;
				}
			});
		};
		setButtonClick();		
        /*swiper*/
		var bannerSlide = new Swiper(".report-slide", {
            nested :true,
			pagination: {
				el: ".custom-swiper-pagination",
                clickable:true             
			},
            on: {//21-07-30 counter 추가
                slideChange : function() {
                    startAnimation();
                }
            }
		});
        
        //21-07-30 counter 추가 
        startAnimation();
        function startAnimation() {
            $('span[data-money]').each(function(){
                var $el = $(this);

                if ($el.length) {
                    var DURATION = 1.5
                    var DELAY = 0
                    var value = $el.data('money').toString()

                    if (value) {
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
          //21-08-23 로티 이미지 적용
          const lottieAnimation = {
            naviLottie : function(){
                const naviLottie = document.querySelector('.navi-bar .custom-icon.on');
                let gubun = naviLottie.parentNode.innerText;
                let gubunclass;
                let gubunJson;
                if(gubun == 'MY'){
                    gubunclass = 'my';
                    gubunJson = 'MY';
                }else if(gubun == '혜택'){
                    gubunclass = 'benefit';
                    gubunJson = 'BS';
                }else if(gubun == '앱카드'){
                    gubunclass = 'appcard';
                    gubunJson = 'AC';
                }else if(gubun == '금융'){
                    gubunclass = 'finance';
                    gubunJson = 'FS';
                }else if(gubun == '라이프'){
                    gubunclass = 'life';
                    gubunJson = 'LF';
                }
                var naviAnimation = lottie.loadAnimation({
                    container: document.querySelector('.navi-bar .custom-icon.on.' + gubunclass),
                    path: '/webapp/v2/common/assets/lottie/main_menubar_'+ gubunJson + '.json',
                    renderer: 'svg',
                    loop: false,
                    autoplay: true,
                });
            },
            alarmLottie:function(){
                var loadingAnimation = lottie.loadAnimation({
                    container: document.querySelector('.btn-alarm'),
                    path: '/webapp/v2/common/assets/lottie/main_actionbar_allim.json',
                    renderer: 'svg',
                    loop: false,
                    autoplay: true,
                })
            }
        }
        lottieAnimation.naviLottie();
        lottieAnimation.alarmLottie();   