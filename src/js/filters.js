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

var headingClasses = $('th').map(function(i, el) {
    return el.textContent.replace(/\s/g, '-').toLowerCase();
}).get();

var getHeading = function(i) {
    return
}

var makeCells = function(dataArray) {
    var cellsString = '';

    for (var i=0; i<dataArray.length; i++) {
        cellsString += '<td class="cell-' + headingClasses[i] + '">' + (dataArray[i] || '&mdash;') + '</td>';
    }

    return cellsString;
}

var makeTrueFalseIcon = function(boolean) {
    return '<i class="fa fa-lg fa-' + (boolean ? 'check-circle' : 'circle-thin text-muted') + '"></i>';
}

// fill table
var clients = clients.Clients.clients;
for (var i=0; i<clients.length; i++) {
    var client = clients[i];

    $('#clients tbody').append([
        '<tr>',
            makeCells([
                client.clientId,
                [client.firstName, client.middleName, client.lastName, client.nameSuffix].join(' '),
                client.dob, // TODO what format is this? and use correct field
                enums['userType'][client.userTypeJail],
                enums['userType'][client.userTypeHomeless],
                client.viSpdat,
                makeTrueFalseIcon(client.chronicHomeless),
                makeTrueFalseIcon(client.unshelteredHistory),
                makeTrueFalseIcon(client.familyStatus),
                makeTrueFalseIcon(client.veteran),
                makeTrueFalseIcon(client.disabled),
                client.disablingCondition
            ]),
        '</tr>'
    ].join(''))
}

// enable sorting
var options = {
    valueNames: headingClasses
};
var clientList = new List('clients');