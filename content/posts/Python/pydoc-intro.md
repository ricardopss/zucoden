---
title: "PyDoc Intro"
date: 2020-01-17T21:20:38+01:00
series: ['pydoc']
tags: ['documentation', 'help']
categories: ['Python']
---

PyDoc is a documentation generator and online help system. It automatically generates documentation from Python modules. The documentation can be presented as pages of text on the console, served to a Web browser, or saved to HTML files.

## run pydoc module (basic script code):

`python - m pydoc`		

```
pydoc - the Python documentation tool

pydoc <name> ...
    Show text documentation on something.  <name> may be the name of a
    Python keyword, topic, function, module, or package, or a dotted
    reference to a class or function within a module or module in a
    package.  If <name> contains a '\', it is used as the path to a
    Python source file to document. If name is 'keywords', 'topics',
    or 'modules', a listing of these things is displayed.

pydoc -k <keyword>
    Search for a keyword in the synopsis lines of all available modules.

pydoc -p <port>
    Start an HTTP server on the given port on the local machine.  Port
    number 0 can be used to get an arbitrary unused port.

pydoc -b
    Start an HTTP server on an arbitrary unused port and open a Web browser
    to interactively browse documentation.  The -p option can be used with
    the -b option to explicitly specify the server port.

pydoc -w <name> ...
    Write out the HTML documentation for a module to a file in the current
    directory.  If <name> contains a '\', it is treated as a filename; if
    it names a directory, documentation is written for all the contents.

```
{{< betonen gold >}}
Note that pydoc is for looking the documentation for a module, class or function, z.B.:

`python -m pydoc math`  (module)     
`python -m pydoc tuple`  (class)  
`python -m pydoc pow`   (tuple)  
{{< /betonen >}}

The pydoc is equivalent of a help() function, but with the advantage that it is not necessary to import the module to make consultation.

## run pydoc module to search for a specific keyword in all available modules:

`python - m pydoc -k keyword`

z.B. `python - m pydoc -k sql`

## run pydoc module start an HTTP server on the given port on the local machine:

`python - m pydoc -p 314`

```
Server ready at http://localhost:314/
Server commands: [b]rowser, [q]uit
```	
**Obs:** if you are running multiple services, use `python - m pydoc -b` to start an HTTP server on an arbitrary unused port.

## run pydoc module write out a HTML documentation for a module:

open a specific folder and type:

`python - m pydoc -w ModuleName`

z.B. `python - m pydoc -w json` for write a json.html with the documentation of the module json.