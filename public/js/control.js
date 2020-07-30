$(document).ready(() => {
    // $('body').append('<script>alert(1)</script>');
    console.log('hello');
    

    $.ajax({
        type: 'GET',
        url: '/getData',
        error: function (xhr) {
            console.log('Oops, something went wrong.');
        },
        success: function (res) {
            console.log(res);

            // $('body').append(res.msg[0].msg);
            $('body').append('789');

        }
    });

})

$('#click-me').click(() => {
    // $('body').append('<script>alert(1)</script>');

    $.ajax({
        type: 'GET',
        url: '/getData',
        error: function (xhr) {
            console.log('Oops, something went wrong.');
        },
        success: function (res) {
            console.log(res);

            $('body').append(res.msg[0].msg);

        }
    });

})