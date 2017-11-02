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
            $input.prop('checked', false);
            $input.filter('[value="' + value + '"]').prop('checked', true);

        // text
        } else if ($input.is('input')) {
            $input.val(value);

        }
    }

    checkConfig($('form'));
}

$('input').on('change', function() {
    checkConfig($(this).closest('form'));
});

var checkConfig = function(form) {
    var values = $(form).serializeArray(),
        newConfig = {},
        dt = clientsDataTable.DataTable();

    values.map(function(item, i) {
        newConfig[item.name] = item.value;
    });

    dt.columns().search('');

    for (field in newConfig) {
        dt.column(field + ':name').search(newConfig[field]);
    }

    dt.draw();
};

// DataTables

var booleanIcon = function(data, type, full, meta) {
    if (data === true || data === false) {
        output = '<i class="fa boolean-icon text-muted fa-' + (data ? 'check' : 'circle-thin') + '"></i>';
    } else {
        output = '<span class="boolean-icon">&mdash;</span>'
    }

    return '<div class="text-center">' + output + '</div>';
}

var guidRenderer = function(data, type, full, meta) {
    if (type === 'display') {
        return '<span class="text-nowrap" data-toggle="tooltip" title="' + data + '">&hellip;' + data.substr(-8) + '</span>';
    }
}

var typeGauge = function(data, type, full, meta) {
    if (data >= 1 && data <= 3) {
        var diff = (3 - data),
            string = '';

        for (var i=0; i<data; i++) {
            string += '<span class="type-gauge-pip-filled"></span>';
        }
        for (var i=0; i<diff; i++) {
            string += '<span class="type-gauge-pip-empty"></span>';
        }

        return '<span class="type-gauge" data-toggle="tooltip" title="' + enums['userType'][data] + '">' + string + '</span><span class="sr-only">' + data + '</span>';
    }

    else {
        return '<span class="type-gauge-empty">&mdash;</span>';
    }
}

var clientsDataTable = $('#clients').one('draw.dt', function() {
    $('[data-toggle="tooltip"]').tooltip();
});

// asc and desc sort functions to make sure non-integers are always ordered last

$.fn.dataTable.ext.type.order['integer-asc'] = function(a, b) {
    var nanA = isNaN(a),
        nanB = isNaN(b);

    if (nanA && nanB) {
        return 0;
    } else if (nanA) {
        return 1;
    } else if (nanB) {
        return -1;
    } else {
        return a - b;
    }
}

$.fn.dataTable.ext.type.order['integer-desc'] = function(a, b) {
    var nanA = isNaN(a),
        nanB = isNaN(b);

    if (nanA && nanB) {
        return 0;
    } else if (nanA) {
        return 1;
    } else if (nanB) {
        return -1;
    } else {
        return b - a;
    }
}

clientsDataTable.DataTable({
    autoWidth: false,
    data: clients,
    buttons: [ 'csv' ],
    dom: [
        "<'row text-muted'<'col-sm-6'i><'col-sm-6 text-right'l>>",
        "<'row'<'col-sm-12'tr>>",
        "<'row'<'col-sm-5'B><'col-sm-7'p>>"
    ].join(''),
    columnDefs: [
        {
            targets: '_all',
            defaultContent: '&mdash;',
            name: 'foo'
        },
        {
            targets: [0, 1],
            render: guidRenderer
        },
        {
            targets: [4, 6],
            type: 'integer',
            render: {
                "display": typeGauge
            }
        },
        {
            targets: [ 3, 5, 8, 9, 10, 11, 12, 13 ],
            orderable: false,
            className: 'text-center',
            render: {
                "display": booleanIcon,
            }
        }
    ],
    columns: [
        {
            data: 'hmis_id',
            name: 'hmis_id',
            title: 'HMIS'
        },
        {
            data: 'cjmis_id',
            name: 'cjmis_id',
            title: 'CJMIS'
        },
        {
            data: 'name',
            name: 'name',
            title: 'Name'
        },
        {
            data: 'currently_homeless_shelter',
            name: 'currently_homeless_shelter',
            title: 'Homeless'
        },
        {
            data: 'user_type_hmis',
            name: 'user_type_hmis',
            title: 'Type'
        },
        {
            data: 'currently_incarcerated',
            name: 'currently_incarcerated',
            title: 'In&nbsp;Jail',
            className: 'text-nowrap'
        },
        {
            data: 'user_type_cj',
            name: 'user_type_cj',
            title: 'Type'
        },
        {
            data: 'jail_release_date',
            name: 'jail_release_date',
            title: 'Release',
            className: 'text-nowrap text-center',
            type: 'date'
        },
        {
            data: 'history_unsheltered',
            name: 'history_unsheltered',
            title: '<span data-toggle="tooltip" title="History of Homelessness">History</span>'
        },
        {
            data: 'chronic_status',
            name: 'chronic_status',
            title: '<span data-toggle="tooltip" title="Chronically Homeless">Chronic</span>'
        },
        {
            data: 'household_status',
            name: 'household_status',
            title: 'Family'
        },
        {
            data: 'veteran_status',
            name: 'veteran_status',
            title: 'Veteran'
        },
        {
            data: 'housing_assessment_completed',
            name: 'housing_assessment_completed',
            title: '<span data-toggle="tooltip" title="Assessment Completed">Assessed</span>'
        },
        {
            data: 'disabled_status',
            name: 'disabled_status',
            title: 'Disabled'
        },
        {
            data: 'vi_spdat',
            name: 'vi_spdat',
            title: 'VI-SPDAT',
            className: 'text-nowrap',
            type: 'integer'
        }
    ]
});

// wire up search field (since not using DataTables built-in)

$('#q').on('input', function() {
    clientsDataTable.DataTable().search($(this).val()).draw();
});