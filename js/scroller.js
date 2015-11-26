
(function(d, w){
        "use strict";

        var self = {};

        // elements
        var nav;
        var opaqueElems;

        // helper vars
        var lastPosition = w.pageYOffset;
        var stop = false;

        // animationFrame
        var scroll = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.mozRequestAnimationFrame || w.msRequestAnimationFrame || w.oRequestAnimationFrame || function(callback){ w.setTimeout(callback, 1000 / 60); };



        function toggleNavOnScroll(currentPosition){
            if(lastPosition < currentPosition){
                nav.classList.add("hideNav");
            } else {
                nav.classList.remove("hideNav");
            }
        }



        function hasClass(elem, cls){
            return elem.className.indexOf(" " + cls + " ") !== -1;
        }



        function isInViewport ( elem ) {
            var distance = elem.getBoundingClientRect();
            return (
                distance.top >= 0 &&
                distance.bottom <= (w.innerHeight || d.documentElement.clientHeight)
            );
        }



        function revealElementsInViewport(elems){
            var i = elems.length;
            if(!stop){
                while(i--){
                    if(isInViewport(elems[i])){
                        elems[i].classList.add("reveal");
                        if(hasClass(elems[i], "last") && elems.length === d.getElementsByClassName("reveal").length){
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



        self.start = function(config){
            
            config = config || {};
            
            nav = config.nav || d.getElementById("nav");
            opaqueElems = config.opaqueElems || d.getElementsByClassName("opaque");
            console.log(nav, opaqueElems);
            loop();
        };


        w.scroller = self;


    })(document, window);
