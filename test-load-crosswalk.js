var fs = require('fs');
var parse = require('csv-parse/lib/sync');

const crosswalkCSV = fs.readFileSync(__dirname+'/crosswalk.csv').toString();
const crosswalkData = parse(crosswalkCSV, {auto_parse: true, columns: true});

// const filteredData = crosswalkData.filter()

console.log(crosswalkData);
