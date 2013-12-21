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

    var container = document.querySelector('#project-wrapper');
    var pckry = new Packery( container, {
        itemSelector: '.project'
    });
    pckry.layout();
});