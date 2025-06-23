---
layout: case-study
title: "Locker Linked"
date: 2018-4-17 19:46:27
comments: false
category: work
permalink: /:categories/:title.html
work-type: React, Redux, Front-End Development
work-summary: A recruiting system to help guide high school student athletes and their parents through the college athletic recruiting process.
thumbnail-image: lockerlinked/locker-linked-thumbnail.jpg
---

<div class="grid grid--featured-image">
  <div class="grid__item grid__item--full">
      <img src="{{ site.url }}/assets/work/lockerlinked/featured-image-locker-linked.jpg" alt="Locker Linked Title Card">
  </div>
</div>

## Project Overview

Every year, thousands of high school athletes try to pursue their passion at the next level by searching for the perfect athletic and academic fit. Having never gone through the college athletic recruiting process, these students, and their parents, are often in uncharted waters.

Which coaches should they talk to? How do they gain the right exposure? Which program should they choose... and why? Even with the best work ethic and determination, every athlete could use a little help.

As part of the team at <a href="https://whitelabelco.com/" target="_blank" class="link--text-in-p">Whitelabel</a>, I helped build the digital platform for Locker Linked, a startup that aims to provide student athletes with first-rate recruitment network services and tools to prepare them for upcoming college athletic opportunities.

Locker Linked simplifies the recruitment process, allowing student athletes to set up a player profile to showcase skills, connect directly with coaches and recruiters, and get exclusive access to essential resources to maximize potential recruitment.

### My Role

While my team at Whitelabel worked closely with Locker Linked to design and build their entire platform, from design to development, I worked specifically on the development team focusing on building the front-end of the platform in React.

On the frontend, Locker Linked is built with React and Redux, integrates with <a href="https://stripe.com/" target="_blank" class="link--text-in-p">Stripe</a> for user payment, and connects to a Rails backend. I worked closely with our lead backend developer, <a href="https://twitter.com/toreyhickman/" target="_blank" class="link--text-in-p">Torey Hickman</a>, to build a component-based UI that hooked up seamlessly with our backend database and architecture.

<div class="grid grid-mt grid-mb">
  <div class="grid__item grid__item--full no-shadow">
    <img src="{{ site.url }}/assets/work/lockerlinked/locker-linked-profile-devices.jpg" alt="Locker Linked Profile shown on MacBook and iPhone">
  </div>
</div>

## Creating a Showcase for Athletes

### Building a Flexible Profile

The athlete profile turned out to be one of my favorite parts of the app due to the variety of components needed to accomodate such a wide range of sports played by student athletes. In addition, the profile serves as the entry point for college recruiters' evaluations of student athletes, making it a focal point of the platform.

Locker Linked wanted to allow athletes to post photos, videos, statistics, awards, camps, and reference contact information in addition to the ability to add multiple sports. Whether it was making sure the stats table component resized and responded fluidly or creating a slider component that accomodated arrays of photos or videos, I enjoyed the creative coding challenge that the screen presented.

<div class="grid grid-mt grid-mb">
  <div class="grid__item grid__item--full no-shadow">
    <img src="{{ site.url }}/assets/work/lockerlinked/locker-linked-profile-responsive.jpg" alt="Locker Linked Athlete Profile Screenshot">
  </div>
</div>

### Focusing on Reusable Components

The component-based nature of the athlete profile allowed us to focus on creating reusable elements. We were able to build the profile component by component and think about how to reuse several components in forms where users would manage the actual profile.

Components like our `TabSelect.js` were used both on the public profile and in the user's profile management dashboard. Thanks to some simple styling and media queries, the structure and functionality remained the same while the visual appearance were altered.

<div class="grid grid-mt grid-mb">
  <div class="grid__item grid__item--half no-shadow ">
     <img  src="{{ site.url }}/assets/work/lockerlinked/tab-select-1.gif" alt="Tab Select Component Video Gif">
  </div>
  <div class="grid__item grid__item--half no-shadow end">
      <img  src="{{ site.url }}/assets/work/lockerlinked/tab-select-2.gif" alt="Tab Select Component Video Gif">
  </div>
  <span class="img-caption">
    I built responsive components that could be repurposed in different contexts (left: athelte profile, right: user dashboard)
  </span>
</div>

## The Intricacies of Profile Management

Profile management was one of the biggest challenges in building Locker Linked. In addition to the actual student athlete, profiles can be managed by parents/guardians (and soon coaches, too!).

Not only that, but a single user can have admin access to manage and edit any number of athlete profiles. This many-to-one relationship of profile management necessitated careful consideration when it came to both onboarding and the user dashboard.

### Onboarding Different User Types

When onboarding, a user can select whether they're an athlete or a parent/guardian. In both cases, the user can create a new athlete profile, but if a user is a parent, they also have the option to request access to a pre-existing profile (their child's). This meant that our team had to carefully consider the user flow for multiple onboarding paths and build them accordingly.

### Managing Multiple Profiles

In order to accomodate parents/guardians with more than one child on the platform or coaches that are assisting multiple student athletes, we built Locker Link with the ability for users to manage one or more athlete profiles.

<div class="grid grid-mt grid-mb">
  <div class="grid__item grid__item--full">
    <img  src="{{ site.url }}/assets/work/lockerlinked/locker-linked-profile-switcher.gif" class="image-medium" alt="Service Year Style Guide Screenshot">
  </div>
  <span class="img-caption">
    Users can easily switch between editing multiple athletes profile.
  </span>
</div>

Once a user is given admin access to multiple profiles, they can use a simple dropdown to select the profile they want to edit. By integrating the user dashboard with Redux, we could easily populate the users' edit views with the selected profile's data and make editing a breeze.

## Learning to Love Forms

### Form Management with Redux-Form

I love React. But ever since I began building apps with React, I've had a gripe with managing forms. On top of managing the actualy values of inputs in component state, handling validation and error messaging made forms in React complex and clunky to set up and use. To make form development easier, we introduced the use of <a href="https://redux-form.com/" target="_blank" class="link--text-in-p">Redux Form</a>, a library that allows you to connect your forms to your Redux store in order to manage form state.

Redux Form let us create custom input components, decrease redundancy in terms of validation and error message handling, and build more robust, dynamic forms. For a deeper look at my experience with Redux Form (and how it convinced me to love forms again), <a href="/thoughts/2018/05/02/react-and-redux-form.html" class="link--text-in-p">check out this post I wrote</a>.

<div class="grid grid-mt grid-mb">
  <div class="grid__item grid__item--full">
    <div class="video-container">
      <div class='embed-container'><iframe src='https://player.vimeo.com/video/269091140?autoplay=1&loop=1&loop=1&title=0&byline=0&portrait=0&muted=1' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>
    </div>
    <span class="img-caption">
      Redux-Form made form management a breeze (and pretty magical). <a href="/thoughts/2018/05/02/react-and-redux-form.html">Read more about my thoughts on Redux-Form here</a>.
    </span>
  </div>
</div>

<h2 class="text-center">
  Conclusion &amp; Lessons Learned
</h2>

Locker Link was a big growing experience for me. I had used React several times to build out front-end interfaces before, but Locker Link was the first project where I used Redux for app state management and Redux Form for form management. Through Redux, I was able to create more complex interactions, such as managing modals and flash message state between screens.

In addition to using new technologies, working on Locker Linked also helped me refine how I build and manage React components. I spent a good amount of time trying to break screens down into smaller, manageable parts so that we could more easily maintain components and reuse components whenever possible.

<div class="grid grid-mt">
  <div class="grid__item grid__item--full">
    <img src="{{ site.url }}/assets/work/lockerlinked/locker-linked-homepage.jpg" alt="Locker Linked Homepage">
  </div>
  <div class="grid__item grid__item--full">
    <img src="{{ site.url }}/assets/work/lockerlinked/locker-linked-dashboard.jpg" alt="Locker Linked User Dashboard Screenshot">
  </div>
  <div class="grid__item grid__item--full">
    <img src="{{ site.url }}/assets/work/lockerlinked/locker-linked-coach-search.jpg" alt="Locker Linked Dashboard Search Screenshot">
  </div>
  <div class="grid__item grid__item--full no-shadow">
    <img src="{{ site.url }}/assets/work/lockerlinked/locker-linked-profile-stats.jpg" alt="Locker Linked Athlete Profile Screenshot">
  </div>
  <div class="grid__item grid__item--full">
    <img src="{{ site.url }}/assets/work/lockerlinked/locker-linked-locker-profile.jpg" alt="Locker Linked Profile Management Screenshot">
  </div>
</div>
