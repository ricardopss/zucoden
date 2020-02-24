---
title: "Accessing Data in Hugo"
date: 2020-01-27T15:29:03+01:00
tags: ['json', 'data', 'template']
categories: ["Hugo"]
---

The `data` folder is reserved to store all additional data contents (must be in `JSON`, `YAML` to `TOML` format) used when generating the website.

Simply store the file in the `data` folder and to access, type 

```
{{ range .Site.Data.NameOfFile }}
	{{ .VariableName }}
{{ end }}
```