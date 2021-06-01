# data-hub-entity-generator

With Node.js instasll, run from root directory:
```
node generate [optional config file reference]
```

config.json:
```
{
	"source": "template.entity.json", // Use this template file
	"target": "Test.entity.json", // Save to here
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
	"types": [
    // Cycle through these data types when generating properties
		{ "datatype": "string", "collation": "http://marklogic.com/collation/codepoint"},
		{ "datatype": "integer" }
	]
}
```

template.entity.json: Representation of entity to populate
