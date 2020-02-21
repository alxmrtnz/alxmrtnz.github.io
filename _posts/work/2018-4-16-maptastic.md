---
layout: case-study
title:  "Maptastic"
date:   2018-4-16 19:46:27
comments: false
category: work
permalink: /:categories/:title.html
work-type: React, Redux, Front-End Development
work-summary:  A web application that makes U.S. demographic data retrieval and display simple and efficient.
external-link: https://maptastic.us/
thumbnail-image: maptastic/maptastic-thumbnail.jpg
---

<div class="grid grid--featured-image">
  <div class="grid__item grid__item--full">
      <img src="{{ site.url }}/assets/work/maptastic/featured-image-maptastic-2.jpg" alt="Maptastic Title Card">
  </div>
</div>

## Project Overview
<a href="https://maptastic.us/" target="_blank" class="link--text-in-p">Maptastic</a> is a React web application that makes U.S. demographic data, such as population, housing characteristics, and related socioeconomic characteristics easily obtainable to local governments, nonprofits, and regional planning agencies.

Organizations can use the app to search demographic data for regions throughout the U.S. and save their searches for future reference.

### My Role
As part of a small team at <a href="https://whitelabelco.com/" target="_blank" class="link--text-in-p">Whitelabel</a>, I served as the lead front-end developer and worked with a designer and several backend developers to bring the project to life.

Maptastic gave me the opportunity try out new libraries like <a href="https://gionkunz.github.io/chartist-js/" target="_blank" class="link--text-in-p">Chartist</a>, used to display data obtained through <a href="https://www.census.gov/data/developers/data-sets.html" target="_blank" class="link--text-in-p">U.S. Census APIs</a>, and explore the Google Maps API and Geosuggest (through libraries like <a href="https://github.com/ubilabs/react-geosuggest" target="_blank" class="link--text-in-p">React Geosuggest</a>) for geolocation searches.

## Making Data Beautiful
### Chartist Graphs
In order to make large amounts of demographic data easy to understand, we used <a href="https://gionkunz.github.io/chartist-js/" target="_blank" class="link--text-in-p">Chartist</a> to create a variety of charts, from comparison bar charts to pie charts, to visualize the data.

Chartist proved to be a handy library that allowed for easy customization and let me build a set of restackable, collapsible cards for the end user.

<div class="grid grid-mt grid-mb">
  <div class="grid__item grid__item--full no-shadow">
    <img src="{{ site.url }}/assets/work/maptastic/maptastic-charts.png" alt="Maptastic Chart Data">
  </div>
</div>

### A Flexible, Responsive Layout
Using Flexbox, I created a responsive masonry-style layout to accomodate a range of device sizes. It was important to give the map and chart cards room to breath in order keep data digestible, but the layout also had to be flexible enough to re-stack on smaller devices.

<div class="grid grid-mt grid-mb">
  <div class="grid__item grid__item--full">
    <img  src="{{ site.url }}/assets/work/maptastic/responsive-maptastic-2.gif" class="image-medium" alt="Maptastic in Browser Window Responsive Animation">
  </div>
  <span class="img-caption">
    A responsive layout lets users take Maptastic with them on their phones and tablets
  </span>
</div>

### Fixed Positioning
Additionally, on desktop, we wanted to keep several elements, such as the map and main navigation, in a fixed position so that users could scroll through the cards of data, but always have easy access to these primary elements in order to refine their search location and radius.

<div class="grid grid-mt grid-mb">
  <div class="grid__item grid__item--full">
    <img  src="{{ site.url }}/assets/work/maptastic/maptastic-fixed-positioning.gif" class="image-medium" alt="Maptastic in Browser Window Showing Scroll Animation">
  </div>
  <span class="img-caption">
    Collapsible cards and a masonry-style layout makes viewing demographic data easy
  </span>
</div>



## Maps Integration
As the name "Maptastic" implies, maps (and location search) were a critical part of the project. Our goal was to allow users to easily search for a location, visualize it via Google Maps, and modify their search radius to hone in on their targets.

### Searching on Maptastic
The search experience is comprised of three primary elements:
- A geosuggest search input
- A Google Map to display the search
- A slider to refine the range of the search area

By using <a href="https://tomchentw.github.io/react-google-maps/" target="_blank" class="link--text-in-p">React Google Maps</a> to tie into the Google Maps Javascript API, <a href="https://github.com/ubilabs/react-geosuggest" target="_blank" class="link--text-in-p">React Geosuggest</a> to create a suggestive search input, and Redux to allow the components access to a shared state, I was able to create a search experience that makes accessing demographic data a breeze.

<div class="grid grid-mt grid-mb">
  <div class="grid__item grid__item--full">
    <div class="video-container">
      <div class='embed-container'><iframe src='https://player.vimeo.com/video/392963178?autoplay=1&loop=1&loop=1&title=0&byline=0&portrait=0&muted=1' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>
    </div>
  </div>
</div>
<h2 class="text-center">
  Conclusion &amp; Lessons Learned
</h2>

While concise in scope, Maptastic helped me explore new terrain. From learning how interact with and customize map elements with Google Maps to styling large chunks of data using Chartist, this project exposed me to new front-end features. Front-end development continues to excite me as I discover how much more there is to learn every day.

<div class="grid grid-mt">
  <div class="grid__item grid__item--full no-shadow">
    <img src="{{ site.url }}/assets/work/maptastic/maptastic-screenshots.jpg" alt="Maptastic App Screenshots">
  </div>
</div>
