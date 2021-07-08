// Recursively build hierarchical entity model (a tree)
const CONFIG = "config.json"; // default config
const fs  = require("fs");
const myArgs = process.argv.slice(2);

let start = 0;
const levels = 3;
const size = 4;
let tree = {};

// Resursively build tree object
const buildTree = function (curr, currId, ind) {
	addNode(currId, size);
	if (curr < levels) {
		curr++;
		for (let i = 0; i < size; i++) {
			buildTree(curr, `${currId}-${i}`, i);
		}
	}
}

// Build node data structure
const addNode = function (parentId, size) {
	children = [];
	for (let i = 0; i < size; i++) {
		children.push(`${parentId}-${i}`);
	}
	tree[parentId] = children;
}

// Make model based on tree object
const makeModel = function (tree) {
	let keys = Object.keys(tree);
	let result = [];

	keys.forEach(k => {
		let ent = {
	    	entityName: k,
	    	entityTypeId: "http://marklogic.com/example/"+k+"-0.0.1/"+k,
	    	entityInstanceCount: 2,
	    	model: {
	      		info: {
	        		title: k,
	        		version: "0.0.1",
	        		baseUri: "http://marklogic.com/example/"
	      		},
	      		definitions: {}
	    	}
		}

		// Add primary key and first prop
		ent.model.definitions[k] = { primaryKey: k, properties: {}};
		ent.model.definitions[k]["properties"][k] = { datatype: "integer" };

		tree[k].forEach(r => {
			ent.model.definitions[k]["properties"][r] = {
				datatype: "integer",
              	relatedEntityType: "http://example.org/"+r+"-0.0.1/"+r,
              	joinPropertyName: r
			}
		})

		result.push(ent);
	})
	//console.log(result);
	return result;
}

buildTree(start, "root", 0);
let model = makeModel(tree);
model = JSON.stringify(model, null, ' ');
fs.writeFileSync('./model.json', model);