const fs = require('fs');
const csv = require('csv-parser');

const results = {};

fs.createReadStream('js-ipl-data-project/src/data/matches.csv')
  .pipe(csv())
  .on('data', (data) => {
    const year = data.season;
    results[year] = (results[year] || 0) + 1;
  })
  .on('end', () => {
    fs.writeFileSync('js-ipl-data-project/src/public/output/matchesPerYear.json', JSON.stringify(results, null, 4));
    console.log('Matches per year data saved.');
    console.log('Number of Matches Per Year:', results);
  });