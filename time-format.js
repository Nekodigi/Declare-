$(function(){$('.pure-num').keypress(function(e){
    if(!(48 <= e.which && e.which <= 57))return false;
});});

$(function(){$('.time').change(function(e){
    $(this).val(Math.min(Math.max($(this).val(), 0), 59));
    time_format($(this).val());
});});

function time_format(num){
    if(num<10){
        return "0"+num;
    }
    return num;
}

//based on this site https://stackoverflow.com/questions/16129157/countdown-timer-using-moment-js
setInterval(function calcDuration() {
    updateTime();
}, 1000);

function setupTime(){
    updateTime();
    var targets = $('.time.display:not(using)');
    targets.each(function(index, target){
        var duration = moment.duration($(target).text(), 'seconds');
        $(target).text(duration.hours()+":"+time_format(duration.minutes())+":"+time_format(duration.seconds()));
    });
}

function updateTime(){
    var targets = $('.time.display.using');
    targets.each(function(index, target){
        var diff = moment(moment($(target).attr("time")).utc()-moment(moment().utc().format('YYYY-MM-DD HH:mm:ss')));
        if(diff>=0){
            var duration = moment.duration(diff, 'milliseconds');
            var bar = $($('.progress.child').get(index));
            var baseDuration = $(target).attr("duration");
            bar.width(Math.floor(diff/1000)/baseDuration*100+'%');
            $(target).text(duration.hours()+":"+time_format(duration.minutes())+":"+time_format(duration.seconds()));
        }else{// if($('div.declare-item:not(.review)').length>0) 
            $(target).text("Finished");
            if($($('div.declare-item').get(index)).hasClass("review")==false){
                var dtarget = $('div.declare-item').get(index);
                $(dtarget).append("<textarea class='review' id='"+$(dtarget).attr('ids')+"'></textarea><button class='review' onclick='onReview("+$(dtarget).attr('ids')+");'>Review!</button><p class='declare-margin'></p>");
                $(dtarget).addClass("review");
            }
        }
    });
}