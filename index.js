const JsonRefs=require('json-refs');
const fs = require('fs');

const model=(m='activity',t='SummaryActivity')=>{
	const source=`https://developers.strava.com/swagger/${m}.json`;
	let properties={};
	return JsonRefs.resolveRefsAt(source)
  .then(function (res) {
		res.resolved[t].allOf.map(x=>properties={...properties,...x.properties});
		fs.writeFileSync(`${__dirname}/dist/${t}.json`, JSON.stringify(properties, null, 2));
  }, function (err) {
    console.log(err.stack);
  });
}

const build = async() => {
	let models=[{m:'activity',t:'SummaryActivity'},{m:'activity',t:'DetailedActivity'},{m:'athlete',t:'SummaryAthlete'},{m:'athlete',t:'DetailedAthlete'}];
	models.forEach(async(item, i) => {
		await model(...Object.values(item)).then(r=>console.log(`Built ${item.t}`));
	});
}

module.exports={
	Model:model,
	Build:build
}
