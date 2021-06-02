# data-hub-entity-generator

Script for adding a configurable number of properties to the definitions of a [MarkLogic Data Hub](https://github.com/marklogic/marklogic-data-hub) entity.

## Running script

With Node.js installed, run from root directory:
```
node generate [optional config file reference, config.json used by default]
```

## Setup

**config.json:**
```
{
	"source": "template.entity.json", // Use this template file
	"target": "Test.entity.json",     // Save to this file
	"props": [
		{
			"title": "Test",   // Add properties to this definition
			"total": 500       // Add this number of properties
		},
		{
			"title": "Test-5", // Add properties to this definition
			"total": 50        // Add this number of properties
		}
	],
	// Cycle through these data types when generating properties
	"types": [
		{ "datatype": "string", "collation": "http://marklogic.com/collation/codepoint"},
		{ "datatype": "integer" }
	]
}
```

**template.entity.json:** Initial representation of entity to populate.
