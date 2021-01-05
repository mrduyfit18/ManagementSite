$('#block-user').on('click', function ()
{
    const userID = window.location.pathname.replace('/users', '');
    const status = $("#block-user").text();
    let url;
    if (status === 'Block')
    {
        url = "/users/block" + userID;
    }
    else
    {
        url= "/users/unblock" + userID;
    }
    $.ajax({
        url: url,
        type: 'POST',
        method: 'POST',
        success: function(result){
            if (result === '1')
            {
                $("#block-user").text('Unblock');
                $("#block-user").removeClass('btn-danger').addClass('btn-success');

            }
            else
            {
                $("#block-user").text('Block');
                $("#block-user").removeClass('btn-success').addClass('btn-danger');
            }

        }});
});