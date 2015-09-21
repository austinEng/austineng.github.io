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
        toggles.removeClass('active');
        $(this).addClass('active');
        //$(this).toggleClass('active');
        if ($(this).attr('id')=='all') {
            toggles.addClass('active');
            //if ($(this).hasClass('active')) {
            //    toggles.addClass('active');
            //} else {
            //    toggles.removeClass('active');
            //}
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

        var t = $($('#floater a.active')[0]).attr('id');
        setGetParameter('q', t);

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
        window.location = $(this).attr('data-link');
    });

    var container = document.querySelector('#project-wrapper');

    visibles="";
    var isFirefox = typeof InstallTrigger !== 'undefined';
    pckry=$('#project-wrapper');
    if (isFirefox) {
        pckry.isotope({
            itemSelector: '.project',
            masonry: { columnWidth: pckry.width() / 3},
            transformsEnabled: false

        });
    } else {
        pckry.isotope({
            itemSelector: '.project',
            masonry: { columnWidth: pckry.width() / 3}
        });
    }

    pckry.isotope('reLayout');

    $(window).smartresize(function(){
        pckry.isotope({
            // update columnWidth to a percentage of container width
            masonry: { columnWidth: pckry.width() / 3 }
        });
    });

    if (QueryString.q) {
         $('.project').css('display','none');
        visibles="";
        $('.noproject').css('display','block');
        var toggle = QueryString.q;
        $('#floater').find('a').removeClass('active');
        $("#"+toggle).addClass('active');
        if (toggle=="all") {
            $('#floater').find('a').addClass('active');
        }
        manageToggles();
        pckry.isotope('reLayout');
    }

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

    setInterval(function() {
        $(visibles).css('opacity',1);
    },100);

    $(document).scroll(function(){
        placeFloater();
    });
    $(window).resize(function() {
        placeFloater();
    });
    placeFloater();

});
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
    placeFloater();
    var ie = (function(){

        var undef,
            v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');

        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                all[0]
            );

        return v > 4 ? v : undef;

    }());

    if (ie<-8){
        alert('Sorry, your browser is not currently supported. Please update to a newer version of Internet Explorer or use Chrome, Firefox, or Safari.\n\nIf you continue, this page may not display properly.');
    }
});