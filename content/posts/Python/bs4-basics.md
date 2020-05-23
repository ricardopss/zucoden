---
title: "bs4 Basics"
date: 2020-05-05T12:43:01+02:00
series: ['bs4', 'requests']
tags: ['web scrapping', 'html', 'xml', 'beautiful soup', 'find', 'find_all', 'parents']
categories: ["Python"]
---
[Beautiful Soup (bs4)](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) is a library that makes it easy to scrape information from web pages, through HTML or XML parser, providing methods for iterating, searching, and modifying the parse tree.

## pulling data out of HTML url
The pull the data out of an URL requires additionally the `requests` library with the `.get().content` method:  

```python
from bs4 import BeautifulSoup
import requests

def webScrapping():
	sUrl = 'https://www.dnb.de/DE/Home/home_node.html'
	mainPage = BeautifulSoup(requests.get(sUrl).content, 'html.parser')

	print(mainPage.prettify())

webScrapping()	
``` 
{{< expand "output" >}}
```
<!DOCTYPE doctype html>
<html lang="de">
 <head>
  <base href="https://www.dnb.de/"/>
  <meta charset="utf-8"/>
  <title>
   DNB  -  Startseite
  </title>
  <meta content="Startseite" name="title"/>
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.5, user-scalable=1" name="viewport"/>
  <meta content="Government Site Builder" name="generator"/>
  <!-- Open Graph data -->
  <meta content="Deutsche Nationalbibliothek" property="og:site_name"/>
  <meta content="website" property="og:type"/>
  <meta content="Startseite" property="og:title"/>
  <meta content="Startseite" property="og:description"/>
  <meta content="" property="og:image"/>
  <meta content="https://www.dnb.de/DE/Home/home_node.html" property="og:url"/>
  <meta content="de_DE" property="og:locale"/>
  <meta content="&lt;FacebookAccount&gt;" property="fb:admins"/>
  <!-- Twitter Card data -->
  <meta content="summary_large_image" name="twitter:card"/>
  <meta content="Startseite" name="twitter:title"/>
  <meta content="Startseite" name="twitter:description"/>
  <meta content="" name="twitter:image"/>
  <meta content="&lt;TwitterAccount&gt;" name="twitter:site"/>
  <meta content="Deutsche Nationalbibliothek" name="keywords"/>
  <meta content="Die Deutsche Nationalbibliothek ist die zentrale Archivbibliothek Deutschlands." name="description"/>
  <script type="application/ld+json">
   {
  "@context": "http://schema.org",
  "@type": "Organization",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "http://www.dnb.de/DE/Home/home_node.html"
  },
  "image": {
    "@type": "ImageObject",
    "url": "http://www.dnb.de/SiteGlobals/Frontend/DNBWeb/Images/logo.png?__blob=poster&v=1",
    "width": 151,
    "height": 95
  },
  "name": "Deutsche Nationalbibliothek",
  "department": [
    {
      "@type": "Library",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Leipzig",
        "addressRegion": "Sachsen",
        "postalCode": "04103",
        "streetAddress": "Deutscher Platz 1"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
          ]
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-01-01",
          "validThrough": "2020-01-01"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-03-16",
          "validThrough": "2020-03-16"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-03-17",
          "validThrough": "2020-03-17"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-04-10",
          "validThrough": "2020-04-10"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-04-13",
          "validThrough": "2020-04-13"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-05-01",
          "validThrough": "2020-05-01"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-05-21",
          "validThrough": "2020-05-21"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-06-01",
          "validThrough": "2020-06-01"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-10-03",
          "validThrough": "2020-10-03"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-10-31",
          "validThrough": "2020-10-31"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-11-18",
          "validThrough": "2020-11-18"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-12-24",
          "validThrough": "2020-12-24"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-12-25",
          "validThrough": "2020-12-25"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-12-26",
          "validThrough": "2020-12-26"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-12-27",
          "validThrough": "2020-12-27"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-12-28",
          "validThrough": "2020-12-28"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-12-29",
          "validThrough": "2020-12-29"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-12-30",
          "validThrough": "2020-12-30"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-12-31",
          "validThrough": "2020-12-31"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Saturday"
          ]
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Sunday"
          ]
        }
      ],
      "telephone": "+ 49 341 2271-0",
      "image": {
        "@type": "ImageObject",
        "url": "http://www.dnb.de/SiteGlobals/Frontend/DNBWeb/Images/logo.png?__blob=poster&v=1",
        "width": 151,
        "height": 95
      },
      "name": "Deutsche Nationalbibliothek Leipzig"
    },
    {
      "@type": "Library",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Frankfurt am Main",
        "addressRegion": "Hessen",
        "postalCode": "60322",
        "streetAddress": "Adickesallee 1"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
          ]
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-01-01",
          "validThrough": "2020-01-01"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-03-16",
          "validThrough": "2020-03-16"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-03-17",
          "validThrough": "2020-03-17"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-04-10",
          "validThrough": "2020-04-10"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-04-11",
          "validThrough": "2020-04-11"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-04-13",
          "validThrough": "2020-04-13"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-05-01",
          "validThrough": "2020-05-01"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-05-21",
          "validThrough": "2020-05-21"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-06-01",
          "validThrough": "2020-06-01"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-06-11",
          "validThrough": "2020-06-11"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-10-03",
          "validThrough": "2020-10-03"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-12-24",
          "validThrough": "2020-12-24"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-12-25",
          "validThrough": "2020-12-25"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-12-26",
          "validThrough": "2020-12-26"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-12-28",
          "validThrough": "2020-12-28"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-12-29",
          "validThrough": "2020-12-29"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-12-30",
          "validThrough": "2020-12-30"
        },
        {
          "@type": "OpeningHoursSpecification",
          "validFrom": "2020-12-31",
          "validThrough": "2020-12-31"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Saturday"
          ]
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Sunday"
          ]
        }
      ],
      "telephone": "+ 49 69 1525-0",
      "image": {
        "@type": "ImageObject",
        "url": "http://www.dnb.de/SiteGlobals/Frontend/DNBWeb/Images/logo.png?__blob=poster&v=1",
        "width": 151,
        "height": 95
      },
      "name": "Deutsche Nationalbibliothek Frankfurt am Main"
    }
  ],
  "description": "Die Deutsche Nationalbibliothek ist die zentrale Archivbibliothek Deutschlands."
}
  </script>
  <!-- 
        Realisiert mit dem Government Site Builder.
        Die Content Management Lösung der Bundesverwaltung.
        www.government-site-builder.de
      -->
  <link href="https://www.dnb.de/DE/Home/home_node.html" rel="canonical"/>
  <link href="DE/Service/Impressum/impressum_node.html" rel="copyright" title="Impressum" type="text/html"/>
  <link href="DE/Service/Glossar/glossar_node.html" rel="glossary" title="Glossar" type="text/html"/>
  <link href="DE/Service/Hilfe/hilfe_node.html" rel="help" title="Hilfe" type="text/html"/>
  <link href="DE/Home/home_node.html" rel="start" title="Homepage" type="text/html"/>
  <link href="DE/Service/Sitemap/sitemap_node.html" rel="contents" title="Übersicht" type="text/html"/>
  <link href="DE/Service/Suche/suche_node.html" rel="search" title="Suche" type="text/html"/>
  <link href="/SiteGlobals/Frontend/DNBWeb/Images/favicon.png?__blob=normal&amp;v=4" rel="shortcut icon" type="image/ico"/>
  <link href="SiteGlobals/Frontend/DNBWeb/Styles/normalize.css?v=2" rel="stylesheet" type="text/css"/>
  <link href="SiteGlobals/Frontend/DNBWeb/Styles/_libs.css?v=2" rel="stylesheet" type="text/css"/>
  <link href="SiteGlobals/Frontend/DNBWeb/Styles/small.css?v=17" rel="stylesheet" type="text/css"/>
  <link href="SiteGlobals/Frontend/DNBWeb/Styles/medium.css?v=16" rel="stylesheet" type="text/css"/>
  <link href="SiteGlobals/Frontend/DNBWeb/Styles/large.css?v=16" rel="stylesheet" type="text/css"/>
  <link href="SiteGlobals/Frontend/DNBWeb/Styles/xlarge.css?v=9" rel="stylesheet" type="text/css"/>
  <link href="SiteGlobals/Frontend/DNBWeb/Styles/custom.css?v=9" rel="stylesheet" type="text/css"/>
  <!--[if IE 9]><link rel="stylesheet"  href="SiteGlobals/Frontend/DNBWeb/Styles/addon_iefix_9.css?v=2" type="text/css"/><![endif]-->
  <!--[if lte IE 8]><link rel="stylesheet" href="SiteGlobals/Frontend/DNBWeb/Styles/addon_iefix.css?v=1" type="text/css" /><![endif]-->
  <link href="SiteGlobals/Frontend/DNBWeb/Styles/addon_print.css?v=9" media="print" rel="stylesheet" type="text/css"/>
  <link href="SiteGlobals/Frontend/DNBWeb/Styles/addon_materna.css?v=27" rel="stylesheet" type="text/css"/>
  <!-- Matomo -->
  <script src="SiteGlobals/Frontend/DNBWeb/JavaScript/init/addon_matomo.js?v=5" type="text/javascript">
  </script>
  <!-- End Matomo Code -->
  <script src="https://script.ioam.de/iam.js?m=1" type="text/javascript">
  </script>
 </head>
 <body class="gsb startseite js-off lang-de fixed" data-matomo-site-id="62" data-nn="56936">
  <div id="wrapperOuter">
   <div id="wrapperInner">
    <a id="Start">
    </a>
    <h1 class="aural">
     GSB 7.1 Standardlösung
    </h1>
    <p class="navSkip">
     <em>
      Springe direkt zu:
     </em>
    </p>
    <ul class="navSkip">
     <li>
      <a href="DE/Home/home_node.html#content">
       Inhalt
      </a>
     </li>
     <li>
      <a href="DE/Home/home_node.html#navPrimary">
       Hauptmenü
      </a>
     </li>
     <li>
      <a href="DE/Home/home_node.html#search">
       Suche
      </a>
     </li>
    </ul>
    <div id="wrapperDivisions">
     <div class="header" id="header">
      <div class="wrapperBranding row">
       <div class="logo show-for-large" id="anfang">
        <img alt="Government Site Builder Standardlösung" src="/SiteGlobals/Frontend/DNBWeb/Images/logo.svg?__blob=normal&amp;v=1"/>
       </div>
       <div class="logo show-for-medium-only">
        <img alt="Government Site Builder Standardlösung" src="/SiteGlobals/Frontend/DNBWeb/Images/logo.svg?__blob=panorama&amp;v=1"/>
       </div>
       <div class="logo show-for-small-only">
        <img alt="Government Site Builder Standardlösung" src="/SiteGlobals/Frontend/DNBWeb/Images/logo.svg?__blob=square&amp;v=1"/>
       </div>
       <div class="navWrapper">
        <div class="navServiceMeta" id="navServiceMeta">
         <h2 class="aural">
          Servicemenü
         </h2>
         <ul>
          <li>
           <a class="languageLink lang_en" href="EN/Home/home_node.html" hreflang="en" lang="en" title="Home" xml:lang="en">
            English
           </a>
          </li>
          <li class="navServiceGS">
           <a class="" href="DE/Service/Gebaerdensprache/gebaerdensprache_node.html">
            <img alt="Ge­bär­den­spra­che" src="/DE/Service/Gebaerdensprache/gebaerdensprache_node.jpg?__blob=picture&amp;v=3"/>
            <span aria-hidden="true">
             Ge­bär­den­spra­che
            </span>
           </a>
          </li>
          <li class="navServiceLS">
           <a class="" href="DE/Service/LeichteSprache/leichtesprache_node.html">
            <img alt="Leich­te Spra­che" src="/DE/Service/LeichteSprache/leichtesprache_node.svg?__blob=picture&amp;v=7"/>
            <span aria-hidden="true">
             Leich­te Spra­che
            </span>
           </a>
          </li>
         </ul>
        </div>
        <div class="nav">
         <p class="navMobileMenu" id="navMobileMenu">
          <a href="DE/Service/Sitemap/sitemap_node.html">
           Menü
          </a>
         </p>
         <div class="navPrimary" id="navPrimary">
          <h2 class="aural">
           Servicenavigation
          </h2>
          <ul>
           <li class="hellgruen">
            <h3>
             <a class="" href="DE/Benutzung/benutzung_node.html" title="Benutzung">
              Be­nut­zung
             </a>
            </h3>
           </li>
           <li class="tuerkis">
            <h3>
             <a class="" href="DE/Professionell/professionell_node.html" title="DNB Professionell">
              DNB Pro­fes­sio­nell
             </a>
            </h3>
           </li>
           <li class="navServiceMeinKonto">
            <h3>
             <a class="external" href="https://portal.dnb.de/myAccount/info.htm" rel="noopener noreferrer" target="_blank" title="Externer Link Mein Konto (Öffnet neues Fenster)">
             </a>
            </h3>
           </li>
           <li class="navServiceSuche">
            <h3>
             <a class="js-search-opener" href="DE/Service/Suche/suche_node.html">
              <img alt="Su­che" src="/DE/Service/Suche/suche_node.svg?__blob=picture&amp;v=2" title="Su­che"/>
             </a>
            </h3>
           </li>
          </ul>
         </div>
        </div>
       </div>
      </div>
      <div class="c-search" id="header-search" style="display: none;">
       <div class="row">
        <div class="small-12 column">
         <div class="row">
          <div class="c-search__input columns small-12 large-8">
           <form action="SiteGlobals/Forms/DNBWeb/Suche/Expertensuche_Formular.html" enctype="application/x-www-form-urlencoded" method="get" name="searchExpert">
            <input name="nn" type="hidden" value="56936"/>
            <input name="resourceId" type="hidden" value="59560"/>
            <input name="input_" type="hidden" value="56936"/>
            <input name="pageLocale" type="hidden" value="de"/>
            <fieldset>
             <h2 class="aural">
              Suchbegriff eingeben
             </h2>
             <p>
              <span class="formLabel aural">
               <label for="f59560d59550">
                Suchbegriff eingeben
               </label>
              </span>
              <span class="formField">
               <input id="f59560d59550" maxlength="100" name="templateQueryString" placeholder="Suchbegriff eingeben" size="26" title="Suchbegriff eingeben" type="text" value=""/>
              </span>
              <input alt="Suchen" class="image" id="f59560d63528" name="submit" src="/SiteGlobals/Forms/DNBWeb/_components/Buttons/Servicesuche_Submit.svg?__blob=image&amp;v=1" title="Suchen" type="image"/>
             </p>
            </fieldset>
           </form>
          </div>
          <div class="columns small-12 large-4">
           <p class="editor-heading">
            Sie möchten in unseren Beständen recherchieren?
           </p>
           <p>
            <a class="c-link" href="https://portal.dnb.de/opac.htm" target="_blank" title="Externer Link Zum Katalog der Deutschen Nationalbibliothek (Öffnet neues Fenster)">
             <span class="c-link__text">
              Zur Katalog-Suche
             </span>
            </a>
           </p>
          </div>
         </div>
         <div class="c-search__suggestions">
          <small>
           Häufig gesucht
          </small>
          <ul class="c-search__list">
           <li>
            <a class="c-link c-link--download c-link--block" href="/SharedDocs/Downloads/DE/Professionell/Netzpublikationen/anleitungSucheDissertationen.pdf?__blob=publicationFile&amp;v=3">
             <span class="c-link__icon c-link__icon--download c-link__icon--block">
              <svg data-name="Ebene 1" height="22" viewbox="0 0 20 22" width="20" xmlns="http://www.w3.org/2000/svg">
               <defs>
                <style>
                 .st0{fill:#1d1d1b}
                </style>
               </defs>
               <path class="st0" d="M17.9 20v-2.79H20V22H0v-4.79h2.13V20z">
               </path>
               <path class="st0 icon-arrow" d="M16.15 8.87L10 15 3.88 8.87l1.51-1.51L9 10.91V0h2.13v10.91l3.56-3.55z">
               </path>
              </svg>
             </span>
             <span class="c-link__text">
              Anleitung zur Suche von Dissertationen und Habilitationen im Katalog der Deutschen Nationalbibliothek
             </span>
             <span class="c-link__meta">
              322kB, PDF -  Datei ist nicht barrierefrei
             </span>
            </a>
           </li>
           <li>
            <a class="c-link" href="DE/Benutzung/Bestellung/bestellung_node.html">
             <span class="c-link__text">
              Be­stel­lung und Be­reit­stel­lung von Me­di­en
             </span>
            </a>
           </li>
           <li>
            <a class="c-link" href="DE/Professionell/Standardisierung/GND/gnd_node.html">
             <span class="c-link__text">
              Ge­mein­sa­me Normdatei (GND)
             </span>
            </a>
           </li>
           <li>
            <a class="c-link" href="DE/Professionell/Sammeln/sammeln_node.html">
             <span class="c-link__text">
              Un­ser Sam­me­l­auf­trag
             </span>
            </a>
           </li>
          </ul>
         </div>
        </div>
       </div>
      </div>
     </div>
     <div class="c-bglines">
      <div class="row show-for-small-only">
       <div class="small-3 columns">
        <span class="c-bglines__span">
        </span>
       </div>
       <div class="small-3 columns">
        <span class="c-bglines__span">
        </span>
       </div>
       <div class="small-3 columns">
        <span class="c-bglines__span">
        </span>
       </div>
       <div class="small-3 columns">
        <span class="c-bglines__span">
        </span>
       </div>
      </div>
      <div class="row hide-for-small-only">
       <div class="large-2 columns">
        <span class="c-bglines__span">
        </span>
       </div>
       <div class="large-2 columns">
        <span class="c-bglines__span">
        </span>
       </div>
       <div class="large-2 columns">
        <span class="c-bglines__span">
        </span>
       </div>
       <div class="large-2 columns">
        <span class="c-bglines__span">
        </span>
       </div>
       <div class="large-2 columns">
        <span class="c-bglines__span">
        </span>
       </div>
       <div class="large-2 columns">
        <span class="c-bglines__span">
        </span>
        <span class="c-bglines__span c-bglines__span--last show-for-xlarge">
        </span>
       </div>
      </div>
     </div>
     <div class="main" id="main">
      <div class="row">
       <div class="content small-12 columns" id="content">
        <div class="stage" id="stage">
         <div class="stage-wrapper">
          <div class="row">
           <div class="columns small-12">
            <h1 class="isFirstInSlot">
             Deutsche Nationalbibliothek
            </h1>
           </div>
          </div>
          <div class="stage-container">
           <div class="imageContainer">
            <img alt="Fassade des Vierten Erweiterungsbaus der Deutschen Nationalbibliothek in Leipzig" src="/SharedDocs/Bilder/DE/Buehnen/Startseite/01_leipzigEb4Aussen_buehne.jpg?__blob=normal&amp;v=7" title="Fassade des Vierten Erweiterungsbaus der Deutschen Nationalbibliothek in Leipzig"/>
           </div>
          </div>
         </div>
         <div class="row">
          <div class="medium-offset-4 medium-8 small-12 columns">
           <div class="c-content-search c-content-search--hero">
            <div class="c-content-search__form">
             <h2 class="c-content-search__header">
              Katalog
             </h2>
             <div class="c-content-search__subheadline">
              <p>
               Suchen. Finden. Entdecken.
              </p>
             </div>
             <form action="SiteGlobals/Forms/DNBWeb/Suche/Katalogsuche_Formular.html" enctype="application/x-www-form-urlencoded" method="get" name="Suche" target="_blank">
              <input name="nn" type="hidden" value="56936"/>
              <input name="resourceId" type="hidden" value="63592"/>
              <input name="input_" type="hidden" value="56936"/>
              <input name="pageLocale" type="hidden" value="de"/>
              <fieldset>
               <p class="c-content-search__p">
                <span class="formLabel aural">
                 <label for="f63592d59550">
                  Suchbegriff eingeben
                 </label>
                </span>
                <span class="formField">
                 <input id="f63592d59550" maxlength="100" name="templateQueryString" placeholder="Suchbegriff eingeben" size="26" title="Suchbegriff eingeben" type="text" value=""/>
                </span>
                <input alt="Suchen" class="image" id="f63592d63528" name="submit" src="/SiteGlobals/Forms/DNBWeb/_components/Buttons/Servicesuche_Submit.svg?__blob=image&amp;v=1" title="Suchen" type="image"/>
               </p>
              </fieldset>
             </form>
            </div>
           </div>
          </div>
         </div>
        </div>
        <div class="wrapper-embedded" id="sprg609352">
         <div class="c-content-teaser">
          <div class="c-content-teaser__wrapper">
           <div class="c-content-teaser__text hellgruen">
            <h2 class="c-content-teaser__section-header">
             Lesesäle der Deutschen Nationalbibliothek seit dem 4. Mai 2020 wieder geöffnet
            </h2>
            <p class="c-content-teaser__h">
             Ab dem 4. Mai 2020 öffnen wir unter den geltenden Hygiene- und Abstandsregelungen unsere Lesesäle für einen eingeschränkten Benutzungsbetrieb. Für die Nutzung müssen Sie sich für den jeweiligen Tag über ein Reservierungssystem anmelden.
             <br/>
             Konferenzen und andere Veranstaltungen in den Liegenschaften der Deutschen Nationalbibliothek werden bis zum 31. Mai 2020 abgesagt. Unsere Ausstellungen sind bis auf Weiteres geschlossen.
            </p>
            <p class="c-content-teaser__button">
             <a class="c-button c-button--transparent" href="DE/Benutzung/benutzungLesesaalCorona.html">
              Anmeldung und Nutzung ab dem 4. Mai 2020
             </a>
            </p>
           </div>
          </div>
         </div>
        </div>
        <div class="l-teaser l-teaser--shift" id="sprg150398">
         <div class="l-teaser__wrapper">
          <div class="c-opening-hours">
           <h2 class="c-opening-hours__h c-opening-hours__h--section">
            Standorte
           </h2>
           <div class="row">
            <div class="small-6 medium-12 large-6 xlarge-4 columns c-opening-hours__block">
             <h3 class="c-opening-hours__subheader">
              Leipzig
             </h3>
             <div class="c-opening-hours__hint">
              <p>
               Lesesäle geöffnet
               <br/>
               (nur mit Reservierung)
              </p>
             </div>
             <div class="c-opening-hours__text">
              <p>
               9–22 Uhr
              </p>
              <p class="c-opening-hours__l">
               <a class="c-link" href="DE/Benutzung/benutzungLesesaalCorona.html?nn=56936">
                <span class="c-link__text">
                 Weitere Infos
                </span>
               </a>
              </p>
             </div>
            </div>
            <div class="small-6 medium-12 large-6 xlarge-4 columns c-opening-hours__block">
             <h3 class="c-opening-hours__subheader">
              Frankfurt am Main
             </h3>
             <div class="c-opening-hours__hint">
              <p>
               Lesesäle geöffnet
               <br/>
               (nur mit Reservierung)
              </p>
             </div>
             <div class="c-opening-hours__text">
              <p>
               9–22 Uhr
              </p>
              <p class="c-opening-hours__l">
               <a class="c-link" href="DE/Benutzung/benutzungLesesaalCorona.html?nn=56936">
                <span class="c-link__text">
                 Weitere Infos
                </span>
               </a>
              </p>
             </div>
            </div>
           </div>
          </div>
         </div>
         <div class="l-teaser__wrapper">
          <h2 class="l-teaser__h">
           DNB Ak­tu­ell
          </h2>
          <div class="c-content-teaser">
           <div class="c-content-teaser__wrapper">
            <div class="c-content-teaser__text gelb">
             <h2 class="c-content-teaser__section-header">
              Kurznachrichten
             </h2>
             <p class="c-content-teaser__h">
              Hier erfahren Sie alles Neue aus unseren Häusern wie geänderte Öffnungszeiten oder offene Stellen.
             </p>
             <p class="c-content-teaser__button">
              <a class="c-button c-button--transparent" href="DE/Home/Newsblog/newsblog_artikel.html?nn=56936">
               Ich will es wissen!
              </a>
             </p>
            </div>
           </div>
          </div>
         </div>
         <div class="l-teaser__wrapper">
          <div class="c-content-teaser">
           <div class="c-content-teaser__wrapper">
            <div class="c-content-teaser__text hellgruen">
             <h2 class="c-content-teaser__section-header">
              <abbr title="häufig gestellte Fragen">
               FAQ
              </abbr>
              zur Wiederaufnahme des Benutzungsbetriebs
             </h2>
             <p class="c-content-teaser__button">
              <a class="c-button c-button--transparent" href="DE/Benutzung/_content/AnkerFAQCorona.html?nn=56936">
               zu den FAQ
              </a>
             </p>
            </div>
           </div>
          </div>
         </div>
         <div class="l-teaser__wrapper">
          <div class="c-content-teaser">
           <div class="c-content-teaser__wrapper">
            <div class="c-content-teaser__text hellblau">
             <h2 class="c-content-teaser__section-header">
              EUROPA lesen
             </h2>
             <p class="c-content-teaser__h">
              Eine Filmserie anlässlich der deutschen EU-Ratspräsidentschaft 2020
             </p>
             <p class="c-content-teaser__button">
              <a class="c-button c-button--transparent" href="DE/Kulturell/EuropaLesen/europaLesen_node.html">
               Mehr
              </a>
             </p>
            </div>
            <div class="c-content-teaser__image">
             <p class="picture is-capsulated">
              <span class="wrapper">
               <img alt='Maria Hartmann liest im leeren Lesesaal „Geisteswissenschaften“ der Deutschen Nationalbibliothek in Leipzig aus "Maghrebinische Geschichten" von Gregor von Rezzori. ' src="/SharedDocs/Bilder/DE/Kulturell/Sonstige/europaLesen_ct.jpg?__blob=normal&amp;v=5" title='Maria Hartmann liest im leeren Lesesaal „Geisteswissenschaften“ der Deutschen Nationalbibliothek in Leipzig aus "Maghrebinische Geschichten" von Gregor von Rezzori. '/>
              </span>
              <span class="wrapper-text">
               <span class="source">
                <cite>
                 Foto: Dirk Böing
                </cite>
               </span>
              </span>
             </p>
            </div>
           </div>
          </div>
         </div>
         <div class="l-teaser__wrapper">
          <div class="c-content-teaser">
           <div class="c-content-teaser__wrapper">
            <div class="c-content-teaser__text hellblau">
             <h2 class="c-content-teaser__section-header">
              5.000 Jahre Mediengeschichte
             </h2>
             <p class="c-content-teaser__h">
              Virtuelle Ausstellung
             </p>
             <p class="c-content-teaser__button">
              <a class="c-button c-button--external c-button--transparent" href="http://mediengeschichte.dnb.de" target="_blank" title="Externer Link Zur virtuellen Ausstellung „5.000 Jahre Mediengeschichte online“ (Öffnet neues Fenster)">
               Mehr
              </a>
             </p>
            </div>
            <div class="c-content-teaser__image">
             <p class="picture is-capsulated">
              <span class="wrapper">
               <img alt="Die Startseite der virtuellen Ausstellung „Zeichen - Bücher - Netze“ der Deutschen Nationalbibliothek " src="/SharedDocs/Bilder/DE/Kulturell/Virtuell/va-mediengeschichte-cteaser_Bild.jpg?__blob=normal&amp;v=2" title="Die Startseite der virtuellen Ausstellung „Zeichen - Bücher - Netze“ der Deutschen Nationalbibliothek "/>
              </span>
             </p>
            </div>
           </div>
          </div>
         </div>
         <div class="l-teaser__wrapper">
          <div class="c-content-teaser">
           <div class="c-content-teaser__wrapper">
            <div class="c-content-teaser__text hellblau">
             <h2 class="c-content-teaser__section-header">
              Exil. Erfahrung und Zeugnis
             </h2>
             <p class="c-content-teaser__h">
              Virtuelle Ausstellung
              <br/>
              <br/>
             </p>
             <p class="c-content-teaser__button">
              <a class="c-button c-button--external c-button--transparent" href="http://exilarchiv.dnb.de/" target="_blank" title="Externer Link Zur virtuellen Ausstellung „Exil-Erfahrung und Zeugnis“ (Öffnet neues Fenster)">
               Zur Ausstellung
              </a>
             </p>
            </div>
            <div class="c-content-teaser__image">
             <p class="picture is-capsulated">
              <span class="wrapper">
               <img alt='Startseite der virtuellen Ausstellung "Exil. Erfahrung und Zeugnis"' src="/SharedDocs/Bilder/DE/Ueber-uns/DEA/exilVA_ct.jpg?__blob=normal&amp;v=2" title='Startseite der virtuellen Ausstellung "Exil. Erfahrung und Zeugnis"'/>
              </span>
             </p>
            </div>
           </div>
          </div>
         </div>
         <div class="l-teaser__wrapper">
          <div class="c-content-teaser">
           <div class="c-content-teaser__wrapper">
            <div class="c-content-teaser__text hellblau">
             <h2 class="c-content-teaser__section-header">
              Künste im Exil
             </h2>
             <p class="c-content-teaser__h">
              Virtuelle Ausstellung
              <br/>
              <br/>
             </p>
             <p class="c-content-teaser__button">
              <a class="c-button c-button--external c-button--transparent" href="http://kuenste-im-exil.de/KIE/Web/DE/Home/home.html" target="_blank" title='Externer Link Link zur Virtuellen Ausstellung "Künste im Exil" (Öffnet neues Fenster)'>
               Zur Ausstellung
              </a>
             </p>
            </div>
            <div class="c-content-teaser__image">
             <p class="picture is-capsulated">
              <span class="wrapper">
               <img alt='Startseite der virtuellen Ausstellung "Künste im Exil"' src="/SharedDocs/Bilder/DE/Ueber-uns/DEA/kieVA_ct.jpg?__blob=normal&amp;v=2" title='Startseite der virtuellen Ausstellung "Künste im Exil"'/>
              </span>
             </p>
            </div>
           </div>
          </div>
         </div>
         <div class="l-teaser__wrapper">
          <div class="c-content-teaser">
           <div class="c-content-teaser__wrapper">
            <div class="c-content-teaser__text hellblau">
             <h2 class="c-content-teaser__section-header">
              Veranstaltungskalender
             </h2>
             <p class="c-content-teaser__h">
              Ausstellungseröffnungen, Fachveranstaltungen, Führungen – hier finden Sie alle Termine.
             </p>
             <p class="c-content-teaser__button">
              <a class="c-button c-button--transparent" href="SiteGlobals/Forms/DNBWeb/Veranstaltungsuebersicht/Veranstaltungsuebersicht_Formular.html?nn=56936">
               Zum Kalender
              </a>
             </p>
            </div>
           </div>
          </div>
         </div>
         <div class="l-teaser__wrapper">
          <div class="c-content-teaser">
           <div class="c-content-teaser__wrapper">
            <div class="c-content-teaser__text tuerkis">
             <h2 class="c-content-teaser__section-header">
              DNB Professionell
             </h2>
             <p class="c-content-teaser__h">
              Sie haben neue E-Journals im Angebot? Wir erklären worauf Sie bei der Ablieferung achten müssen.
             </p>
             <p class="c-content-teaser__button">
              <a class="c-button c-button--transparent" href="DE/Professionell/Sammeln/Unkoerperliche_Medienwerke/unkoerperliche_medienwerke_node.html">
               Mehr
              </a>
             </p>
            </div>
           </div>
          </div>
         </div>
         <div class="l-teaser__wrapper">
          <div class="c-content-teaser">
           <div class="c-content-teaser__wrapper">
            <div class="c-content-teaser__text tuerkis">
             <h2 class="c-content-teaser__section-header">
              Deutsche Digitale Bibliothek – Kultur und Wissen online
             </h2>
             <p class="c-content-teaser__button">
              <a class="c-button c-button--transparent" href="DE/Professionell/ProjekteKooperationen/DDB/ddb_node.html">
               Mehr
              </a>
             </p>
            </div>
           </div>
          </div>
         </div>
         <div class="l-teaser__wrapper">
          <div class="c-teaser">
           <h2 class="c-social-media__h">
            Social Media
           </h2>
           <div class="c-social-media">
            <h3 class="c-social-media__heading c-social-media__heading--twitter">
             Twitter
            </h3>
            <p class="c-social-media__time">
             05. Mai, 10.00 Uhr
            </p>
            <p class="c-social-media__p">
             2020 feiert #Sachsen im Jahr der #Industriekultur seine facettenreiche Industriegeschichte. Darin jetzt die Spurens… https://t.co/MezREe95A8
            </p>
            <p class="c-social-media__link">
             <a class="c-social-media__l" href="https://twitter.com/DNB_Aktuelles/status/1257580831843012608" target="_blank">
              htt­ps://twit­ter.com/DNB_Ak­tu­el­les/sta­tus/1257580831843012608
             </a>
            </p>
           </div>
          </div>
         </div>
        </div>
        <div class="c-linklist-grid" id="sprg312542">
         <h2 class="c-linklist-grid__header">
          Angebote für unsere Zielgruppen
         </h2>
         <div class="c-linklist-grid__img medium-6">
          <p class="picture is-capsulated">
           <span class="wrapper">
            <img alt="Im Museumslesesaal der Deutschen Nationalbibliothek in Leipzig; Lesesessel mit Bücherregal im Hintergrund " src="/SharedDocs/Bilder/DE/Buehnen/Startseite/11_leipzigMuseumslesesaal_zielgruppenmodul.jpg?__blob=normal&amp;v=2" title="Im Museumslesesaal der Deutschen Nationalbibliothek in Leipzig; Lesesessel mit Bücherregal im Hintergrund "/>
           </span>
          </p>
         </div>
         <div class="c-linklist-grid__wrapper">
          <div class="c-linklist-grid__bg">
           <div class="row small-up-1 medium-up-2">
            <div class="column">
             <nav>
              <h3 class="c-linklist-grid__h">
               Abliefern
              </h3>
              <ul class="c-linklist-grid__ul">
               <li>
                <a class="c-link" href="DE/Ueber-uns/Portraet/portraet_node.html">
                 <span class="c-link__text">
                  Die Deut­sche National­bibliothek im Por­trät
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="DE/Professionell/Sammeln/sammeln_node.html">
                 <span class="c-link__text">
                  Un­ser Sam­me­l­auf­trag
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="DE/Professionell/Sammeln/Koerperliche_Medienwerke/koerperliche_medienwerke_node.html">
                 <span class="c-link__text">
                  Sammlung kör­per­li­cher Me­dien­wer­ke
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="DE/Professionell/Sammeln/Unkoerperliche_Medienwerke/unkoerperliche_medienwerke_node.html">
                 <span class="c-link__text">
                  Sammlung un­kör­per­li­cher Me­dien­wer­ke
                 </span>
                </a>
               </li>
              </ul>
             </nav>
            </div>
            <div class="column">
             <nav>
              <h3 class="c-linklist-grid__h">
               Erleben
              </h3>
              <ul class="c-linklist-grid__ul">
               <li>
                <a class="c-link" href="SiteGlobals/Forms/DNBWeb/Veranstaltungsuebersicht/Veranstaltungsuebersicht_Formular.html?nn=56936">
                 <span class="c-link__text">
                  Veranstaltungskalender
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="DE/Ueber-uns/Gebaeude/kongresszentrum_anker.html?nn=56936">
                 <span class="c-link__text">
                  Kongresszentrum Frankfurt am Main
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="DE/Kulturell/_content/bildungVermittlung_anker.html?nn=56936">
                 <span class="c-link__text">
                  Bildung und Vermittlung
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="DE/Ueber-uns/Beruf-Karriere/berufKarriere_node.html">
                 <span class="c-link__text">
                  Be­ruf und Kar­rie­re
                 </span>
                </a>
               </li>
              </ul>
             </nav>
            </div>
            <div class="column">
             <nav>
              <h3 class="c-linklist-grid__h">
               Benutzen
              </h3>
              <ul class="c-linklist-grid__ul">
               <li>
                <a class="c-link c-link--external c-link--block" href="https://portal.dnb.de/opac.htm" target="_blank" title="Externer Link Zum Katalog der Deutschen Nationalbibliothek (Öffnet neues Fenster)">
                 <span class="c-link__icon c-link__icon--external c-link__icon--block">
                  <svg height="26" viewbox="0 0 26 26" width="26" xmlns="http://www.w3.org/2000/svg">
                   <style>
                    .st0{fill:#1d1d1b}
                   </style>
                   <path class="st0" d="M0 12h2.1v11.9H14V26H0z">
                   </path>
                   <path class="st0 icon-arrow" d="M7.3 10H16v8.7h-2.1v-5l-7.1 7.1-1.5-1.5 7.1-7.1h-5V10z">
                   </path>
                  </svg>
                 </span>
                 <span class="c-link__text">
                  Katalog der Deutschen Nationalbibliothek
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="DE/Benutzung/Katalog/katalogDNB_node.html">
                 <span class="c-link__text">
                  Über den Katalog
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="SiteGlobals/Forms/DNBWeb/Veranstaltungsuebersicht/Veranstaltungsuebersicht_Formular.html?cl2Categories_Typ=benutzungseinfuehrung">
                 <span class="c-link__text">
                  Benutzungseinführungen
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="DE/Benutzung/Checkliste/checkliste_node.html">
                 <span class="c-link__text">
                  Check­lis­te ers­ter Be­such
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="DE/Benutzung/Services/services_node.html">
                 <span class="c-link__text">
                  Be­nut­zungs­ser­vices
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="DE/Service/Hilfe/hilfe_node.html">
                 <span class="c-link__text">
                  Hil­fe
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="DE/Service/AdresseAnfahrt/anfahrt_node.html">
                 <span class="c-link__text">
                  An­fahrt
                 </span>
                </a>
               </li>
              </ul>
             </nav>
            </div>
            <div class="column">
             <nav>
              <h3 class="c-linklist-grid__h">
               Kooperieren
              </h3>
              <ul class="c-linklist-grid__ul">
               <li>
                <a class="c-link" href="DE/Professionell/ProjekteKooperationen/DDB/ddb_node.html">
                 <span class="c-link__text">
                  Deut­sche Digitale Bibliothek
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="DE/Professionell/Standardisierung/GND/gnd_node.html">
                 <span class="c-link__text">
                  Ge­mein­sa­me Normdatei (GND)
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="DE/Professionell/ProjekteKooperationen/zdb/zdb_node.html">
                 <span class="c-link__text">
                  Zeitschriften­datenbank (ZDB)
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="DE/Professionell/ProjekteKooperationen/nestor/nestor_node.html">
                 <span class="c-link__text">
                  ne­stor - Kom­pe­tenz­netz­werk Langzeit­archivierung
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="DE/Professionell/ProjekteKooperationen/projekteKoop_node.html">
                 <span class="c-link__text">
                  Ko­ope­ra­tio­nen und Projekte
                 </span>
                </a>
               </li>
              </ul>
             </nav>
            </div>
           </div>
          </div>
         </div>
        </div>
        <div class="c-navigation-tableau" id="sprg308750">
         <div class="c-navigation-tableau__wrapper row">
          <div class="c-navigation-tableau__block small-12 medium-6 large-4 columns">
           <div class="c-navigation-tableau__item">
            <a class="c-navigation-tableau__l--icon-arrow" href="DE/Ueber-uns/DBSM/dbsm_node.html">
             <h3 class="c-navigation-tableau__item__headline">
              Deutsches Buch- und Schriftmuseum
              <span class="c-navigation-tableau__icon">
              </span>
             </h3>
             <div class="c-navigation-tableau__image">
              <p class="picture is-capsulated">
               <span class="wrapper">
                <img alt="Leporello mit Gebeten und Zauberformeln, Sumatra um 1800 Batak-Handschrift auf Rinde, Schließband aus geflochtenem Schilf" src="/SharedDocs/Bilder/DE/Ueber-uns/DBSM/DBSM_kachel.jpg?__blob=wide&amp;v=5" title="Leporello mit Gebeten und Zauberformeln, Sumatra um 1800 Batak-Handschrift auf Rinde, Schließband aus geflochtenem Schilf"/>
               </span>
               <span class="wrapper-text">
                <span class="source">
                 <cite>
                  Foto: Klaus-D. Sonntag
                 </cite>
                </span>
               </span>
              </p>
             </div>
            </a>
           </div>
          </div>
          <div class="c-navigation-tableau__block small-12 medium-6 large-4 columns">
           <div class="c-navigation-tableau__item">
            <a class="c-navigation-tableau__l--icon-arrow" href="DE/Ueber-uns/DEA/dea_node.html">
             <h3 class="c-navigation-tableau__item__headline">
              Deutsches Exilarchiv
              <br/>
              1933–1945
              <span class="c-navigation-tableau__icon">
              </span>
             </h3>
             <div class="c-navigation-tableau__image">
              <p class="picture is-capsulated">
               <span class="wrapper">
                <img alt='Der geöffnete "Koffer" des Schriftstellers Walter Meckauer - mit dessen Geschichten, Beobachtungen und Berichten. Ein Manuskript liegt aufgeschlagen auf dem Kofferinhalt' src="/SharedDocs/Bilder/DE/Ueber-uns/DEA/dea_kachel.jpg?__blob=wide&amp;v=5" title='Der geöffnete "Koffer" des Schriftstellers Walter Meckauer - mit dessen Geschichten, Beobachtungen und Berichten. Ein Manuskript liegt aufgeschlagen auf dem Kofferinhalt'/>
               </span>
              </p>
             </div>
            </a>
           </div>
          </div>
          <div class="c-navigation-tableau__block small-12 medium-6 large-4 columns">
           <div class="c-navigation-tableau__item">
            <a class="c-navigation-tableau__l--icon-arrow" href="DE/Ueber-uns/DMA/dma_node.html">
             <h3 class="c-navigation-tableau__item__headline">
              Deutsches Musikarchiv
              <span class="c-navigation-tableau__icon">
              </span>
             </h3>
             <div class="c-navigation-tableau__image">
              <p class="picture is-capsulated">
               <span class="wrapper">
                <img alt='Klaviatur eines Steck-"Duo-Art"-Reproduktions-Flügels' src="/SharedDocs/Bilder/DE/Ueber-uns/DMA/DMA-kachel.jpg?__blob=wide&amp;v=4" title='Klaviatur eines Steck-"Duo-Art"-Reproduktions-Flügels'/>
               </span>
              </p>
             </div>
            </a>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
      <div class="row">
       <div class="columns">
        <div class="c-nav-to-top js-nav-to-top">
         <p class="c-nav-to-top__text js-nav-to-top__text">
          <a class="c-nav-to-top__link" href="DE/Home/home_node.html#Start" title="Zum Seitenanfang">
           <img alt="nach oben" class="c-nav-to-top__image" src="/SiteGlobals/Frontend/DNBWeb/Images/icons/nav2top-b.svg?__blob=normal&amp;v=2"/>
          </a>
         </p>
        </div>
       </div>
      </div>
      <div class="row">
       <div class="small-12 column">
        <div class="c-newsletter">
         <div class="row">
          <div class="small-12 columns c-newsletter__title">
           <h2 class="c-newsletter__h">
            Unsere Newsletter
           </h2>
          </div>
          <div class="small-12 medium-8 column c-newsletter__lead">
           <p class="c-newsletter__p">
            Aktuell und informativ – jeden Monat für Sie von unseren Newsletter-Redaktionen
           </p>
          </div>
          <div class="small-12 medium-4">
           <a class="c-newsletter__button" href="DE/Service/Newsletter/newsletter_node.html">
            Mehr
           </a>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
     <div class="footer" id="footer">
      <div class="footer__wrapper">
       <div class="navFunctionsWrapper align-center row" id="navFunctionsWrapper">
        <ul class="navFunctions" id="navFunctions">
         <li class="navFunctionsRecommend" id="navFunctionsRecommend">
          <a class="" href="DE/Service/SeiteEmpfehlen/Functions/mailversand.html?cms_handOverParams=uriHash%253Dced5262196f4a90a7b04%2526uri%253Dhttps%25253A%25252F%25252Fwww.dnb.de%25252FDE%25252FHome%25252Fhome_node.html">
           empfehlen
          </a>
         </li>
        </ul>
       </div>
       <div class="generictable">
        <div class="siteInfo row" id="siteInfo">
         <div class="small-6 columns">
          <div class="row siteInfo__col--a small-collapse medium-uncollapse">
           <div class="siteInfo__col large-6 small-12 columns">
            <h2 class="heading">
            </h2>
            <div class="textContainer">
             <ul>
              <li>
               <a class="c-link" href="DE/Benutzung/Katalog/katalogDNB_node.html">
                <span class="c-link__text">
                 Über den Katalog
                </span>
               </a>
              </li>
              <li>
               <a class="c-link" href="https://portal.dnb.de/myAccount/info.htm" target="_blank" title="Externer Link Mein Konto (Öffnet neues Fenster)">
                <span class="c-link__text">
                 Mein Konto
                </span>
               </a>
              </li>
              <li>
               <a class="c-link" href="DE/Service/Hilfe/hilfe_node.html">
                <span class="c-link__text">
                 Hil­fe
                </span>
               </a>
              </li>
              <li>
               <a class="c-link" href="DE/Service/Sitemap/sitemap_node.html">
                <span class="c-link__text">
                 In­halt (Si­te­map)
                </span>
               </a>
              </li>
              <li>
               <a class="c-link" href="DE/Service/Impressum/impressum_node.html">
                <span class="c-link__text">
                 Im­pres­s­um
                </span>
               </a>
              </li>
              <li>
               <a class="c-link" href="DE/Service/Datenschutz/datenschutz_node.html">
                <span class="c-link__text">
                 Da­ten­schutz
                </span>
               </a>
              </li>
             </ul>
            </div>
           </div>
           <div class="siteInfo__col large-6 small-12 columns">
            <h2 class="heading">
            </h2>
            <div class="textContainer">
             <ul>
              <li>
               <a class="c-link" href="DE/Ueber-uns/Presse/presse_node.html">
                <span class="c-link__text">
                 Pres­se
                </span>
               </a>
              </li>
              <li>
               <a class="c-link" href="DE/Ueber-uns/Beruf-Karriere/berufKarriere_node.html">
                <span class="c-link__text">
                 Be­ruf und Kar­rie­re
                </span>
               </a>
              </li>
              <li>
               <a class="c-link" href="DE/Ueber-uns/Gebaeude/kongresszentrum_footer_url.html">
                <span class="c-link__text">
                 Kongresszentrum
                </span>
               </a>
              </li>
              <li>
               <a class="c-link" href="DE/Ueber-uns/Ausschreibungen/ausschreibungen_node.html">
                <span class="c-link__text">
                 Öf­fent­li­che Ausschreibungen
                </span>
               </a>
              </li>
              <li>
               <a class="c-link" href="DE/Service/Rechtliches/rechtliches_node.html">
                <span class="c-link__text">
                 Recht­li­ches und Grund­lagen
                </span>
               </a>
              </li>
              <li>
               <a class="c-link" href="DE/Ueber-uns/GfdB/gfdb_node.html">
                <span class="c-link__text">
                 Ge­sell­schaft für das Buch
                </span>
               </a>
              </li>
             </ul>
            </div>
           </div>
          </div>
         </div>
         <div class="small-6 columns">
          <div class="siteInfo__col">
           <div class="row siteInfo__col--b">
            <div class="large-6 small-12 columns">
             <h2 class="heading">
             </h2>
             <div class="textContainer">
              <div class="address">
               <h2>
                DNB Leipzig
               </h2>
               <p>
                Deutscher Platz 1
                <br/>
                04103 Leipzig
               </p>
              </div>
              <p class="icon-device-phone hide-for-large">
               <a class="c-link icon-phone" href="tel:+4934122710">
                <span class="c-link__text">
                 anrufen
                </span>
               </a>
              </p>
              <p class="icon-device-phone show-for-large">
               <span>
                + 49 341 2271-0
               </span>
              </p>
              <p>
               <a class="c-link icon-mail" href="mailto:info-l@dnb.de">
                <span class="c-link__text">
                 info-l@dnb.de
                </span>
               </a>
              </p>
             </div>
            </div>
            <div class="large-6 small-12 columns">
             <div class="textContainer">
              <div class="address">
               <h2>
                DNB Frankfurt
               </h2>
               <p>
                Adickesallee 1
                <br/>
                60322 Frankfurt am Main
               </p>
              </div>
              <p class="icon-device-phone hide-for-large">
               <a class="c-link icon-phone" href="tel:+496915250">
                <span class="c-link__text">
                 anrufen
                </span>
               </a>
              </p>
              <p class="icon-device-phone show-for-large">
               <span>
                + 49 69 1525-0
               </span>
              </p>
              <p>
               <a class="c-link icon-mail" href="mailto:info-f@dnb.de">
                <span class="c-link__text">
                 info-f@dnb.de
                </span>
               </a>
              </p>
             </div>
            </div>
            <div class="large-12 small-12 columns">
             <div class="textContainer">
              <ul>
               <li>
                <a class="c-link" href="DE/Service/AdresseAnfahrt/anfahrt_node.html">
                 <span class="c-link__text">
                  An­fahrt
                 </span>
                </a>
               </li>
               <li>
                <a class="c-link" href="DE/Service/Kontakt/KontakteFooter/kontakteFooter_node.html">
                 <span class="c-link__text">
                  Kon­tak­te
                 </span>
                </a>
               </li>
              </ul>
             </div>
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
      <div class="footer-section-2">
       <div class="footer-section-2__wrapper">
        <div class="row align-middle">
         <div class="copyright large-8 medium-6 small-12 columns">
          <p>
          </p>
         </div>
         <div class="banner large-4 medium-6 small-12 columns">
          <div class="row">
           <div class="small-6 columns">
            <span class="wrapper">
             <img alt="Logo der Deutschen Digitalen Bibliothek" src="/SharedDocs/Bilder/DE/Professionell/Projekte_Kooperationen/Kooperationen/ddb/ddbLogo_transparent.png?__blob=normal&amp;v=3" title="Logo der Deutschen Digitalen Bibliothek"/>
            </span>
           </div>
           <div class="small-6 columns">
            <span class="wrapper">
             <img alt="Logo von Die Beauftragte der Bundesregierung für Kultur und Medien " src="/SharedDocs/Bilder/DE/bkm_logo.gif?__blob=normal&amp;v=1" title="Logo von Die Beauftragte der Bundesregierung für Kultur und Medien "/>
            </span>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
     <div class="cookiebanner" data-animation="true" id="cookiebanner">
      <div class="row">
       <div class="column small-12">
        <div class="cookiebannerbox">
         <div class="cookiebanner__heading">
          <h2>
           Hinweis zur Verwendung von Cookies
          </h2>
         </div>
         <div class="row">
          <div class="large-12 small-12 medium-8 column">
           <p>
            Cookies erleichtern die Bereitstellung unserer Dienste. Mit der Nutzung unserer Dienste erklären Sie sich damit einverstanden, dass wir Cookies verwenden. Weitere Informationen zum Datenschutz erhalten Sie über den folgenden Link:
            <a class="RichTextIntLink NavNode" href="DE/Service/Datenschutz/datenschutz_node.html" title="Datenschutz">
             Datenschutz
            </a>
           </p>
           <p>
            <a class="c-button close" href="#">
             OK
            </a>
           </p>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
  <script src="SiteGlobals/Frontend/DNBWeb/JavaScript/init/global.js?v=11" type="text/javascript">
  </script>
  <!-- SZM VERSION="2.0" -->
  <script type="text/javascript">
   if (window.iom) {
             var iam_data = {
                 "st":"ag292",
                 "cp":"dbs", // code
                 "co":"kommentar", // comment
                 "ps": "lin",
                 "sc":"yes" // mcvd
                 };
             iom.c(iam_data,1);
       }
  </script>
  <!--/SZM -->
  <!-- Seite generiert am: Tue May 05 12:45:30 CEST 2020 -->
 </body>
</html>
```
{{< /expand >}}

The `.prettify()` method display the results in an identend-style

## pulling data out of string (or HTML document)

Requires that the string have HTML content: 

```python
from bs4 import BeautifulSoup

def webScrapping():

	htmlDoc = """
	<html><head><title>The Dormouse's story</title></head>
	<body>
	<p class="title"><b>The Dormouse's story</b></p>

	<p class="story">Once upon a time there were three little sisters; and their names were
	<a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>,
	<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
	<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
	and they lived at the bottom of a well.</p>

	<p class="story">...</p>
	"""
	mainPage = BeautifulSoup(htmlDoc, 'html.parser')

	print(mainPage.prettify())
```

## Accessing the content of an HTML document

The main methods to access the content of an HTML document are:

### `.find_all()` and `.find()`

###  siblings

### parents

TERMINAR