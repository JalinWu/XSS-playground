$(document).ready(() => {

    $.ajax({
        type: 'GET',
        url: '/db/getMsg',
        error: function (xhr) {
            console.log('Oops, something went wrong.');
        },
        success: function (res) {
            console.log(res[0].msg);

            $('body').append(res[0].msg);

        }
    });

})

$('#click-me').click(() => {
    // $('body').append('<script>alert(1)</script>');

    $.ajax({
        type: 'GET',
        url: '/db/getMsg',
        error: function (xhr) {
            console.log('Oops, something went wrong.');
        },
        success: function (res) {
            console.log(res[0].msg);

            $('body').append(res[0].msg);

        }
    });

})