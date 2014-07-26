$(document).ready(function(){
    //On search in the input field
    $('.searchText').off('keyup');
    $('.searchText').on('keyup', function() {
        if($(this).val().length < 2) {
            $('#searchResults').html("");
            return false;
        }
        var value = $(this).val();
        $.ajax({
            url: "/getMatch",
            type: 'POST',
            data: {'word': value},
            success: function(data) {
                //Adding data to div container
                /*$('#searchResults').html("");
                $('#searchResults').append("<ul></ul>");
                $.each(data.result, function(index, word) {
                    $('#searchResults').find('ul').append('<li>' + word + '</li>');
                });*/
                
                //Using jquery-ui autocomplete
                $( ".searchText" ).autocomplete({
                    source: data.result,
                    minLength: 2
                });
            }
        });
    });
});