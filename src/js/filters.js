// datepicker
$('.input-daterange').datepicker({
    orientation: 'bottom'
});

// filter presets
$('#filter-buttons').on('click', '.btn', function(e){
    var $me = $(this),
        preset = $me.data('preset');

    usePreset(preset);
});

var usePreset = function(preset) {
    var config = presets[preset],
        param,
        $input;

    for (param in config) {
        var value = config[param],
            $input = $('[name="' + param + '"]');

        // select
        if ($input.is('select')) {
            $input.val(value);

        // checkbox
        } else if ($input.is('[type="checkbox"]')) {
            $input.prop('checked', false);

            if (value) {
                for (var i=0; i<value.length; i++) {
                    $input.filter('[value="' + value[i] + '"]').prop('checked', true);
                }
            }

        // radio
        } else if ($input.is('[type="radio"]')) {
            $input.prop('checked', false)
                .filter('[value="' + value + '"]').prop('checked', true);

        // text
        } else if ($input.is('input')) {
            $input.val(value);

        }
    }
}

// fill table
var clients = clients.Clients.clients;
for (var i=0; i<clients.length; i++) {
    var client = clients[i];

    $('#clients tbody').append([
        '<tr>',
            '<td>' + client.clientId + '</td>',
            '<td>' + [client.firstName, client.middleName, client.lastName, client.nameSuffix].join(' ') + '</td>',
        '</tr>'
    ].join(''))
}