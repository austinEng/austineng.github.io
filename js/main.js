$(document).ready(function() {
    $('#project-toggles a').click(function(){
        var toggles = $('#project-toggles a');
        $(this).toggleClass('active');
        if ($(this).attr('id')=='all') {
            if ($(this).hasClass('active')) {
                toggles.addClass('active');
            } else {
                toggles.removeClass('active');
            }
        }
        if ((!$(this).hasClass('active'))) {
            $('#all').removeClass('active');
        }
        var all = true;
        for (var i=1; i<toggles.length; i++) {
            if(!($(toggles[i]).hasClass('active'))) {
                all = false;
                break;
            }
        }
        if (all==true) {
            $('#all').addClass('active');
        }
        var actives = $('#project-toggles .active');
        var hiddens = $('#project-toggles a:not(.active)');
        for (var i=0; i< actives.length; i++) {
            var showElem = '.'+$(actives[i]).attr('id');
            pckry.unignore(container.querySelector(showElem));
            $(showElem).each(function(){
                $(this).fadeIn(300, function(){pckry.layout()});
            });
            pckry.layout();
        }
        for (var i=0; i< hiddens.length; i++) {
            var hideElem = '.'+$(hiddens[i]).attr('id');
            pckry.ignore(container.querySelector(hideElem));
            $(hideElem).each(function(){
                $(this).fadeOut(300, function(){pckry.layout()});
            });
        }
        //pckry.layout();
        /*$('.project').each(function(){
            var hide = true;
            for (var i=0; i< actives.length; i++) {
                if ($(this).hasClass($(actives[i]).attr('id'))) {
                    hide = false;
                    break;
                }
            }
            if (hide == false) {
                pckry.unignore($(this));
                pckry.layout();
                $(this).fadeIn(300);
            } else {
                pckry.ignore($(this));
                pckry.layout();
                $(this).fadeOut(300)
            }
        });*/
    });
    $('.project').click(function(event){
        var projects = $('.project');
        if (!($(this).hasClass('active'))) {
            projects.removeClass('active', 300);
            $(this).toggleClass('active', 0, function(){
                pckry.layout();
            });
            var width = $(this).width();
            $(this).toggleClass('active');
            var desc = $(this).find('.description');
            var descBgCon = $(this).find('.desc-bg-container');
            var descBg = $(this).find('.desc-bg');
            desc.animate({width: width*0.3},300, function(){
                desc.addClass('active-desc');
            });
            descBgCon.css('transition','0').animate({marginRight: width*0.7, width: width*0.3},300, function(){
                descBgCon.addClass('active-desc-bg-container');
            });
            descBg.animate({width: width},300);

            $(this).toggleClass('active', 300, function(){
                pckry.layout();
            });
        } else {
            $(this).removeClass('active');
            var width = $(this).width();
            $(this).addClass('active');
            var desc = $(this).find('.description');
            var descBgCon = $(this).find('.desc-bg-container');
            var descBg = $(this).find('.desc-bg');
            if($(this).hasClass('item2')) {
                desc.removeClass('active-desc').animate({width: width*0.4},300, function(){
                    desc.css('width','');
                });
                descBgCon.removeClass('active-desc-bg-container').animate({marginRight: width*0.6, width: width*0.4},300, function(){
                    descBgCon.css('marginRight','').css('width','').css('transition','');
                });
                descBg.animate({width: width},300);
            }
            if($(this).hasClass('item1')) {
                desc.removeClass('active-desc').animate({width: width*0.6},300, function(){
                    desc.css('width','');
                });
                descBgCon.removeClass('active-desc-bg-container').animate({marginRight: width*0.4, width: width*0.6},300, function(){
                    descBgCon.css('marginRight','').css('width','').css('transition','');
                });
                descBg.animate({width: width},300);
            }


            //desc.removeClass('active-desc', 300);
            //descBgCon.removeClass('active-desc-bg-container', 300);
            //deskBg.css('width','');
            //$(this).find('.description').removeClass('active-desc', 300);
            //$(this).find('.desc-bg-container').removeClass('active-desc-bg-container', 300);
            projects.removeClass('active', 300, function(){
                pckry.layout();
            });
            $(this).find('.description').removeClass('active-desc', 300);
            $(this).find('.desc-bg-container').removeClass('active-desc-bg-container', 300);
        }

    });

    var container = document.querySelector('#project-wrapper');
    var pckry = new Packery( container, {
        itemSelector: '.project'
    });
    pckry.layout();

    $('.desc-bg').each(function(){
        $(this).css('backgroundImage',$(this).parent().parent().css('backgroundImage'));
    });
    $('.project-content').hover(function(){
        var count=0;
        var elem=$(this);
        var a = window.setInterval(function(){
            var bg = elem.find('.desc-bg');
            bg.css('width',bg.parent().parent().width());
            count++;
            if (count>6) {
                clearInterval(a);
            }
        },50);
    }, function(){
        var count=0;
        var elem=$(this);
        var a = window.setInterval(function(){
            var bg = elem.find('.desc-bg');
            bg.css('width',bg.parent().parent().width());
            count++;
            if (count>6) {
                clearInterval(a);
            }
        },50);
    });
});

$(window).load(function(){
    /*$('.description').each(function(event){
        var bg = $(this).parent();
        console.log(bg);
        $(this).blurjs({
            source: bg,
        });
    });*/
});