---
layout: case-study
title:  "Locker Linked"
date:   2018-4-14 19:46:27
comments: false
category: work
permalink: /:categories/:title.html
work-type: React+Redux, Front-End Development
work-summary:  A recruiting system to help guide high school student athletes and their parents through the college athletic recruiting process.
external-link: https://www.lockerlinked.com/
thumbnail-image: lockerlinked/locker-linked-thumbnail.jpg
---

<div class="grid grid--featured-image">
  <div class="grid__item grid__item--full">
      <img src="{{ site.url }}/assets/work/lockerlinked/featured-image-locker-linked.jpg" alt="Locker Linked Title Card">
  </div>
</div>

## Project Overview
Every year, thousands of high school athletes look to pursue their passion at the next level and begin a process of trying to find the perfect athletic and academic fit. Having never gone through the college athletic recruiting process, these students, and their parents, are often in uncharted waters.

Which coaches should they talk to? How do they gain the right exposure? Which program should they choose... and why? Even with the best work ethic and determination, every athlete could use a little help.

As part of the team at <a href="https://whitelabelco.com/" target="_blank" class="link--text-in-p">Whitelabel</a>, I helped build the digital platform for <a href="https://www.lockerlinked.com/" target="_blank" class="link--text-in-p">Locker Linked</a>, a startup that aims to provide student athletes with first-rate recruitment network services and tools to prepare them for upcoming college athletic opportunities.

Locker Linked simplifies the recruitment process, allowing student athletes to set up a player profile to showcase skills, connect directly with coaches and recruiters, and get exclusive access to essential resources to maximize potential recruitment.

### My Role
While my team at Whitelabel worked closely with Locker Linked to design and build their entire platform, from design to development, I worked specifically on the development team focusing on building the front-end of the platform in React.

The app is built with React and Redux on the front-end, integrates with <a href="https://stripe.com/" target="_blank" class="link--text-in-p">Stripe</a> for user payment, and connects to a Rails backend. I worked closely with our lead backend developer to build a component-based UI that hooked up seamlessly with our backend database and architecture.

<div class="grid grid-mt">
  <div class="grid__item grid__item--full no-shadow">
    <img src="{{ site.url }}/assets/work/lockerlinked/locker-linked-profile-devices.jpg" alt="Locker Linked Profile shown on MacBook and iPhone">
  </div>
</div>

## Creating a Showcase for Athletes
### Building a Flexible Profile
The athlete profile turned out to be one of my favorite parts of the app due to the variety of components needed to accomodate such a wide range of sports played by student athletes. In addition, the profile serves as the entry point for college recruiters' evaluations of student athletes, making it a focal point of the platform.

Locker Linked wanted to allow athletes to post photos, videos, statistics, awards, camps, and reference contact information in addition to the ability to add multiple sports they may play.

<div class="grid grid-mt grid-mb">
  <div class="grid__item grid__item--full no-shadow">
    <img src="{{ site.url }}/assets/work/lockerlinked/locker-linked-profile-responsive.jpg" alt="Locker Linked Athlete Profile Screenshot">
  </div>
</div>

### Reusable Components
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
    We built responsive components that could be repurposed in different contexts (left: athelte profile, right: user dashboard)
  </span>
</div>


## The Intricacies of Profile Management
Profile management was one of the biggest challenges in building Locker Linked. In addition to the actual student athlete, profiles can be managed by parents/guardians (and soon coaches, too!).

Not only that, but a single user can have admin access to manage and edit any number of athlete profiles. This many-to-one relationship of profile management necessitated careful consideration when it came to both onboarding and the user dashboard.

Profile Switcher
How forms needed updating based on active profile

## Learning to Love Forms
### Form Management with Redux-Forms
Link to <a href="/thoughts/2018/05/02/react-and-redux-form.html" class="link--text-in-p">blog post</a>

<div class="fin-tip">
</div>

<h2 class="text-center">
  Conclusion &amp; Lessons Learned
</h2>
<div class="grid">
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

