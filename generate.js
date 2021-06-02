const CONFIG = "config.json";
const fs  = require("fs");
const myArgs = process.argv.slice(2);

// Get config values
let config = myArgs[0] !== undefined ? myArgs[0] : CONFIG;
config = fs.readFileSync('./' + config).toString();
config = JSON.parse(config, null, " ");

// Read source template
source = fs.readFileSync('./' + config.source).toString();
result = JSON.parse(source);

// Generate object of properties
const getPropsObj = function (total) {
	let obj = {};
	let count = 0;
	for (let i = 1; i <= total; i++) {
		obj["prop-" + i] = config.types[i % config.types.length];
		count++;
	}
	return obj;
}

// Handle each entity definition that needs properties generated
config.props.forEach((p, i) => {
	let propsObj = getPropsObj(p.total);
	let newProps = Object.assign(result.definitions[p.title].properties, propsObj);
	result.definitions[p.title].properties = newProps;
})

// Write result
result = JSON.stringify(result, null, ' ');
fs.writeFileSync('./' + config.target, result);
