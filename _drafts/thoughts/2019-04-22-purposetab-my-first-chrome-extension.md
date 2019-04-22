---
layout: post
title:  "Building My First Chrome Extension"
date:   2019-04-22 14:04:27
categories: thoughts
featured-icon-url: /assets/posts/4-22-19/purposetab.png
featured-icon-alt: "PurposeTab Logo"
---

- Until recently, I had never considered what it took to build a browser extension
- Found it interesting that you could easily create a react app based extension
- As with all things, there were a few context-specific things you have to do
- Using local/chrome storage was interesting, as we have no BE
- Solely client-facing app that runs with local storage
- Idea: PurposeTab replaces your new tab page in Chrome with images of your goals on one side of the screen - and the actions/habits to achieve them on the other.

For years, I've used a variety of "new tab" Chrome Extensions, but I had never really considered how they function, what they were built with, or the fact that I could make my own – that was until I was contacted by Jared Gold of <a href='https://brevitydigital.com/' target="_blank" class="link--text-in-p">Brevity Digital</a> to build our own new tab extension, <a href='https://purposetab.com/' target="_blank" class="link--text-in-p">PurposeTab</a>.

## Diving into the Unknown
- as with many new types of projects, I definitely didn't know everything I needed to know, but I had a solid base of knowledge when it came to React and also knew how to solve problems as they arose
- This is what excites me about web development: not knowing how to do something, but putting in the time and energy to figure it out

## Why I Used React



## Extension-Specific Details
There were a variety of browser extension-specific details that I had never considered.
- `manifest.json`
  - `permissions`
  - `chrome_url_overrides`
  - setting up analytics
  - exit surveys using `background.js`
- local/chrome storage




<a href='https://levelup.gitconnected.com/how-to-use-react-js-to-create-chrome-extension-in-5-minutes-2ddb11899815' target="_blank" class="link--text-in-p">How to use React.js to create a cross-browser extension in 5 minutes</a>