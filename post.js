function onDeclare() {console.log("declare");
    var title = $('input#title').val();
    var details = $('textarea.details').val();
    //based on this site https://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
    var duration = parseInt($('input#hour').val()*3600)+parseInt($('input#minute').val()*60)+parseInt($('input#second').val());
    var due = moment().add($('input#hour').val(), 'h').add($('input#minute').val(), 'm').add($('input#second').val(), 's').utc();
    due = due.utc().format('YYYY-MM-DD HH:mm:ss');
    var form = new FormData();
    form.append('title', title);
    form.append('duration', duration);
    form.append('due', due);
    form.append('details', details);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/server.php', true);
    xhr.onload = function (e) {
        if (this.status == 200) {
            var result = this.response;
            $("#declare-items").html(result);
            setupTime();
        }
    }
    xhr.send(form);
}

function onReview(ids) {
    var review = $('textarea#'+ids).val();
    var form = new FormData();
    form.append('review', review);
    form.append('id', ids);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/server.php', true);
    xhr.onload = function (e) {
        if (this.status == 200) {
            var result = this.response;
            $("#declare-items").html(result);
            setupTime();console.log("posted");
        }
    }
    xhr.send(form);
}