$(document).ready(() => {
    console.log(window.location.pathname);
    if (window.location.pathname == '/gameStart') {
        $.ajax({
            type: 'GET',
            url: '/db/getMsg',
            error: function (xhr) {
                console.log('Oops, something went wrong.');
            },
            success: function (res) {
                var msgTable = new Array();
                msgTable = res;
                console.log(msgTable);

                msgTable.forEach((item) => {
                    $("#msg").append(`
                        <div class="msg-board">
                            <h3>${item.name} <span style="float: right; font-size: 0.875rem;">${item.created_at}</span></h3>
                            <p>${item.msg}</p>
                        </div>
                    `);
                    $('#msg-input').val('');

                });

            }
        });

    }

})

function sendMsg(name, msg) {

    var pattern = /[<>]/g;
    var result = pattern.test(msg);
    console.log("result: " + result);
    

    $.ajax({
        type: 'POST',
        url: '/db/setMsg',
        data: {
            name,
            msg
        },
        error: function (xhr) {
            console.log('Oops, something went wrong.');
        },
        success: function (res) {
            console.log(res);

            var date = new Date();
            date.setHours(date.getHours() + 8);

            $("#msg").prepend(`
                <div class="msg-board">
                    <h3>${name} <span style="float: right; font-size: 0.875rem;">${date.toUTCString()}</span></h3>
                    <p>${msg}</p>
                </div>
            `);
            $('#msg-input').val('');

        }
    });
}

$('#msg-input').keypress((event) => {
    var msg = $('#msg-input').val();
    if (event.keyCode == 13 && msg) {
        sendMsg('Andy', msg);
    }
})

$('#send').click(() => {
    var msg = $('#msg-input').val();
    if (msg) {
        sendMsg('Andy', msg);
    }
})

$('#reset-btn').click(() => {
    $.ajax({
        type: 'GET',
        url: '/db/reset',
        error: function (xhr) {
            console.log('Oops, something went wrong.');
        },
        success: function (res) {
            console.log('success');
            location.reload();
        }
    });
})