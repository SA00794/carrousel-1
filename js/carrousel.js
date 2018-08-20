
var carrousel= {
    nbSlide : 0,
    //nombre de slide
    nbCurrent : 1,
    // premier element avec le quel le slide  debutera
    elemCurrent : null,
    // Permet de stocker l'element afiche sur html

    elem : null,
    // permet de chosir le slide dans le quel le slide debutera
    timer : null,

    init : function(elem){ 
        carrousel.nbSlide = elem.find(".slide").length;
       // creer la pagination
       elem.append('<div class="navigation"></div>');
       for(var i=1;i<=carrousel.nbSlide;i++){
           elem.find(".navigation").append
           ("<span>"+i+"</span>");
       }
       // pouvoir acceder au image juste en cliquant sur le numero predefini -- mins 20 video
       elem.find(".navigation span").click
       (function() 
       {carrousel.gotoSlide($(this).text());
         })
    //    Initiation du carrousel
    carrousel.elem=elem;
    elem.find(".slide").hide();
    elem.find(".slide:first").show();
    carrousel.elemCurrent = elem.find(".slide:first");
    carrousel.elem.find(".navigation span:first").addClass("active")
    // on cré une function play qui elle contien le timer de defilement defilement
    
    carrousel.play();

    // stop quand on passe dessus
    elem.mouseover(carrousel.stop);
    elem.mouseout(carrousel.play);
    },
    gotoSlide : function(num){
        console.log("hello");
       if (num == carrousel.nbCurrent){ return false;  }
    //    if .... est pour que le bug blanc quand en click sur l'image de fois n'apparese plus
    carrousel.elemCurrent.fadeOut();
    carrousel.elem.find("#slide"+ num).fadeIn();  //fadein afficher 
    carrousel.elem.find(".navigation span").removeClass("active")
    carrousel.elem.find(".navigation span:eq("+(num-1)+")").addClass("active");
    //    eq : l'index
    carrousel.nbCurrent = num;
    carrousel.elemCurrent = carrousel.elem.find("#slide"+num);
    },
    next : function(){
         var num = carrousel.nbCurrent+1;
        if( num >carrousel.nbSlide){
            num = 0;
        }
        carrousel.gotoSlide(num);

    },
    // next--- suite du timer réinitialisation tout les x temps
    prev : function(){
        var num = carrousel.nbCurrent-1;
       if( num < 1){
           num = carrousel.nbSlide;
       }
       carrousel.gotoSlide(num);
},

stop : function(){
 window.clearInterval(carrousel.timer);
},
play : function(){
    window.clearInterval(carrousel.timer);
    carrousel.timer = window.setInterval("carrousel.next()",3000);
},

};

$(function() {
    carrousel.init($("#carrousel"));
});