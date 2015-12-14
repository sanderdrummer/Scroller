
(function(d, w){
        'use strict';

        var self = {};

        // elements
        var nav;
        var opaqueElems;
        var navHeight;
        // helper vars
        var lastPosition = w.pageYOffset;
        var stop = false;

        // animationFrame
        var scroll = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.mozRequestAnimationFrame || w.msRequestAnimationFrame || w.oRequestAnimationFrame || function(callback){ w.setTimeout(callback, 1000 / 60); };



        function toggleNavOnScroll(currentPosition){
            if(lastPosition < currentPosition){
                nav.style.marginTop = '-' + (2*navHeight) + 'px';
            } else {
                nav.style.marginTop = '-0px';
            }
        }


        function isInViewport ( elem ) {
            var distance = elem.getBoundingClientRect();
            console.log(distance, w.innerHeight);
            return (
                distance.top >= 0 &&
                distance.bottom <= (w.innerHeight || d.documentElement.clientHeight)
            );
        }



        function revealElementsInViewport(elems){
            var i = elems.length;
            if(!stop){
                while(i--){
                    console.log(isInViewport(elems[i]));
                    if(isInViewport(elems[i])){
                        elems[i].classList.add('animated');
                        elems[i].classList.add('bounceInLeft');
                        elems[i].classList.add('reveal');
                        if((elems[i].classList.contains('last')) && elems.length === d.getElementsByClassName('animated').length){
                            stop = true;
                        }
                    }
                }
            }
        }


        function loop(){
            // avoid calculations if not needed
            if (lastPosition === w.pageYOffset) {
                scroll(loop);
                return false;
            } else {


                toggleNavOnScroll(w.pageYOffset);
                revealElementsInViewport(opaqueElems);

                lastPosition = w.pageYOffset;

                scroll(loop);
            }

        }

        function setNavStyle(elem) {
            elem.style.width = '100%';
            elem.style.top = '0';
            elem.style.left = '0';
            elem.style.position = 'fixed';
            elem.style.zIndex = '100';

        }


        self.start = function(config){

            config = config || {};

            nav = config.nav || d.getElementById('nav');
            setNavStyle(nav);
            navHeight = parseInt(getComputedStyle(nav).height);
            //nav.nextElementSibling.style.marginTop = navHeight + 'px';
            opaqueElems = config.opaqueElems || d.getElementsByClassName('opaque');
            loop();
        };


        w.scroller = self;


    })(document, window);
