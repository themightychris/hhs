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
        output = '<i class="fa text-muted fa-' + (data ? 'check' : 'circle-thin') + '"></i>';
    } else {
        output = '&mdash;'
    }

    return '<div class="text-center">' + output + '</div>';
}

var guidRenderer = function(data, type, full, meta) {
    if (type === 'display') {
        return '<span class="text-nowrap" data-toggle="tooltip" title="' + data + '">&hellip;' + data.substr(-8) + '</span>';
    }
}

var clientsDataTable = $('#clients').one('draw.dt', function() {
    $('[data-toggle="tooltip"]').tooltip();
});

clientsDataTable.DataTable({
    data: clients,
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
            targets: [ 3, 4, 6, 7, 8, 10, 11, 12 ],
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
            data: 'currently_incarcerated',
            name: 'currently_incarcerated',
            title: 'In&nbsp;Jail',
            className: 'text-nowrap'
        },
        {
            data: 'jail_release_date',
            name: 'jail_release_date',
            title: 'Release Date',
            className: 'text-nowrap'
        },
        {
            data: 'history_unsheltered',
            name: 'history_unsheltered',
            title: 'History'
        },
        {
            data: 'chronic_status',
            name: 'chronic_status',
            title: 'Chronic'
        },
        {
            data: 'disabled_status',
            name: 'disabled_status',
            title: 'Disabled'
        },
        {
            data: 'disabling_condition',
            name: 'disabling_condition',
            title: 'Disabling&nbsp;Condition'
        },
        {
            data: 'household_status',
            name: 'household_status',
            title: 'Household'
        },
        {
            data: 'veteran_status',
            name: 'veteran_status',
            title: 'Veteran'
        },
        {
            data: 'housing_assessment_completed',
            name: 'housing_assessment_completed',
            title: 'Assessment'
        },
    ]
});