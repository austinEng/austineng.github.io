$(document).ready(function() {
    var toggleClickCount=0;

    function manageToggles() {
        var toggles = $('#floater a');
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
        var actives = $('#floater .active');
        var hiddens = $('#floater a:not(.active)');
        hiddens.each(function(){
            $('.'+$(this).attr('id')).fadeOut(300);
        });
        actives.each(function(){
            $('.'+$(this).attr('id')).fadeIn(300);
        });

        /*for (var i=0; i< actives.length; i++) {
            var showElem = '.'+$(actives[i]).attr('id');
            //pckry.unignore(container.querySelector(showElem));
            var selector='';
            $(showElem).each(function(){
                $(this).fadeIn(300, function(){
                    //pckry.isotope('reLayout', {filter: selector});
                });
            });
            //pckry.isotope('reLayout', {filter: selector});
        }
        for (var i=0; i< hiddens.length; i++) {
            var hideElem = '.'+$(hiddens[i]).attr('id');
            //pckry.ignore(container.querySelector(hideElem));
            $(hideElem).each(function(){
                $(this).fadeOut(300, function(){
                    //pckry.isotope('reLayout')
                });
            });
        }*/
        var selector=[];
        for (var i=0; i< actives.length; i++) {
            selector[i]= '.'+$(actives[i]).attr('id');
        }
        if(toggleClickCount<3) {
            selector.push('.noproject');
        }
        visibles=selector.join(', ');
        if (visibles=="") {
            visibles=".noproject";
        }
        pckry.isotope({filter: visibles});
        return actives;
    }

    $('#floater a').click(function(){
        toggleClickCount++;
        var toggles = $('#floater a');
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
        var actives = manageToggles();

        if (actives.length==0) {
            $('.noproject').delay(400).fadeIn(300);
        }else {
            if (toggleClickCount >= 3) {
                $('.noproject').fadeOut(100);
            }
        }
        if (toggleClickCount == 3) {
            $('.noproject').fadeOut(300);
        }
        pckry.isotope({filter: visibles});
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
                pckry.isotope('reLayout');
                $(this).fadeIn(300);
            } else {
                pckry.ignore($(this));
                pckry.isotope('reLayout');
                $(this).fadeOut(300)
            }
        });*/
        var t = $('#floater a.active');
        var ts=[];
        for (var i=0; i<t.length; i++) {
            ts[i]=$(t[i]).attr('id');
        }
        var ts= ts.join('+');
        if (ts=="") {
            ts="none"
        }
        setGetParameter('toggles', ts)

    });

    function setGetParameter(paramName, paramValue)
    {
        var url = window.location.href;
        if (url.indexOf(paramName + "=") >= 0)
        {
            var prefix = url.substring(0, url.indexOf(paramName));
            var suffix = url.substring(url.indexOf(paramName)).substring(url.indexOf("=") + 1);
            suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
            url = prefix + paramName + "=" + paramValue + suffix;
        }
        else
        {
            if (url.indexOf("?") < 0)
                url += "?" + paramName + "=" + paramValue;
            else
                url += "&" + paramName + "=" + paramValue;
        }
        var stateObj = { foo: "bar" };
        history.pushState(stateObj, url, url);
    }

    $('#project-outer-container').click(function(e){
        var projects = $('.project');
        projects.removeClass('active', 300, function() {
            pckry.isotope({filter: visibles});
        });
        var descs = projects.find('.active-desc');
        for (var i=0; i< descs.length; ++i) {
            $(descs[i]).css('width','').removeClass('active-desc');
        }
        var descBgs = projects.find('.active-desc-bg-container');
        for (var i=0; i< descBgs.length; ++i) {
            $(descBgs[i]).css('transition','').css('marginRight','').css('width','').removeClass('active-desc-bg-container');
        }
    })
    $('.project.clickable').click(function(event){
        event.stopPropagation();
        var projects = $('.project');
        if (!($(this).hasClass('active'))) {
            projects.removeClass('active', 300);
            var descs = projects.find('.active-desc');
            for (var i=0; i< descs.length; ++i) {
                $(descs[i]).css('width','').removeClass('active-desc');
            }
            var descBgs = projects.find('.active-desc-bg-container');
            for (var i=0; i< descBgs.length; ++i) {
                $(descBgs[i]).css('transition','').css('marginRight','').css('width','').removeClass('active-desc-bg-container');
            }
            //projects.find('.active-desc-bg-container').css('transition','').css('marginRight','').css('width','').removeClass('.active-desc-bg-container');

            $(this).toggleClass('active', 0, function(){
                //var elem=$(this)[0];
                //pckry.fit(elem);
                pckry.isotope({filter: visibles});
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

            manageGalBtns($(this).find('.gallery'));

            var vid = $(this).find('.video');
            if (!(vid.attr('src'))) {
                vid.attr('src',vid.attr('data-src'));
            }

            $(this).toggleClass('active', 300, function(){
                pckry.isotope({filter: visibles});
                var item = $(this);
                setTimeout(function(){
                    $('body,html').animate({
                        scrollTop: item.offset().top-100
                    }, 400, function() {
                        $('body,html').animate({
                            scrollTop: item.offset().top-100
                        }, 200);
                    });
                },300);

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
                desc.removeClass('active-desc').animate({width: width*0.9},300, function(){
                    desc.css('width','');
                });
                descBgCon.removeClass('active-desc-bg-container').animate({marginRight: width*0.1, width: width*0.9},300, function(){
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
                pckry.isotope('reLayout');
            });
            $(this).find('.description').removeClass('active-desc', 300);
            $(this).find('.desc-bg-container').removeClass('active-desc-bg-container', 300);
        }
    });
    /*$.Isotope.prototype._positionAbs = function( x, y ) {
        return { right: x, top: y };
    };*/

    var container = document.querySelector('#project-wrapper');
    /*var pckry = new Packery( container, {
        itemSelector: '.project'
    });*/
    visibles="";
    pckry=$('#project-wrapper');
    pckry.isotope({
        itemSelector: '.project',
        masonry: { columnWidth: pckry.width() / 3}
        //transformsEnabled: false

    });
    pckry.isotope('reLayout');

    $(window).smartresize(function(){
        pckry.isotope({
            // update columnWidth to a percentage of container width
            masonry: { columnWidth: pckry.width() / 3 }
        });
    });

    if (QueryString.toggles) {
        $('.project').css('display','none');
        visibles="";
        $('.noproject').css('display','block');
        var toggles = QueryString.toggles.split("+");
        $('#floater').find('a').removeClass('active');
        for (var i=0; i<toggles.length; i++) {
            $('#'+toggles[i]).addClass('active');
            if (toggles[i]=="all") {
                $('#floater').find('a').addClass('active');
            }
        }
        manageToggles();
        pckry.isotope('reLayout');
    }

    /*$('.desc-bg').each(function(){
        $(this).css('backgroundImage','url("'+$(this).parent().parent().css('backgroundImage').slice(4,-5)+'_blur.jpg")');
    });*/
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
    $('.gal-btn').click(function(e){
        e.stopPropagation();
        var pic = $($(this).parent().find('.galPic:visible')[0]);
        pic.css('display','none');
        if ($(this).hasClass('left-button')) {
            pic.prev().css('display','block');
        }
        if ($(this).hasClass('right-button')) {
            pic.next().css('display','block');
        }

        manageGalBtns($(this).parent());
    });
    setInterval(function() {
        $(visibles).css('opacity',1);
    },100);

    function placeFloater() {
        var dist2=$('#project-toggles').offset().top-$(document).scrollTop()-31;
        var dist=$('#project-toggles').offset().top-31;
        if (dist2 < 0) {
            dist=0;
            $('#floater').css('position','fixed');
        } else {
            $('#floater').css('position','');
        }
        $('#floater').css('top', dist);
    }

    $(document).scroll(function(){
        placeFloater();
    });
    placeFloater();
});

function manageGalBtns(gal) {
    var pic = $(gal.find('.galPic:visible')[0]);
    if (typeof(pic.prev('.galPic')[0])=="undefined") {
        $(gal.find('.left-button')[0]).css('display','none');
    } else {
        $(gal.find('.left-button')[0]).css('display','block');
    }
    if (typeof(pic.next('.galPic')[0])=="undefined") {
        $(gal.find('.right-button')[0]).css('display','none');
    } else {
        $(gal.find('.right-button')[0]).css('display','block');
    }
}
/*function reloadIframe(frame) {
    setTimeout(function(){
        frame.attr('src', frame.attr('src'))
    }, 200);
}*/
var QueryString = function () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]], pair[1] ];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
} ();

$(window).load(function(){

});