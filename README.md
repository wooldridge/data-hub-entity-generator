# data-hub-entity-generator

Script for adding a configurable number of properties to the definitions of a [MarkLogic Data Hub](https://github.com/marklogic/marklogic-data-hub) entity artifact.

## Running script

With [Node.js](https://nodejs.org/) installed, run from root directory:
```
node generate [myconfig.json]
```

## Setup

In no config file specified, `config.json` is used.

**[config.json](https://github.com/wooldridge/data-hub-entity-generator/blob/master/config.json):**
```
{
	"source": "template.entity.json", // Add properties to this template file
	"target": "Test.entity.json",     // Save enriched template data to this file
	"defs": [
		{
			"title": "Test",   // Add properties to this definition
			"props": 500       // Add this number of properties
		},
		{
			"title": "Test-5", // Also add properties to this definition
			"props": 50        // Add this number of properties
		}
	],
	// Cycle through these data types when generating properties
	"types": [
		{ "datatype": "string", "collation": "http://marklogic.com/collation/codepoint"},
		{ "datatype": "integer" }
	]
}
```

**[template.entity.json](https://github.com/wooldridge/data-hub-entity-generator/blob/master/template.entity.json):** Initial representation of entity to populate.
