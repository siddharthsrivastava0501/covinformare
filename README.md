# COVinformare - Reliable Information Saves Lives

!["Image of a coronavirus"](imgs/readmeimage.jpg)

This chrome extension is an attempt to curb the spread of COVID-related online misinformation. Inspired by the words "COVID" and "informare" — "to inform" in Romanian — the extension works in the background to detect if any given website is principally concerned with the pandemic. If found to be the case, the extension sends a notification linking to an article from the local health authorities of the user as determined by a basic text processing algorithm that attempts to determine the broad theme of the website in question in order to show  the most relevant information.

By doing this, our team hopes that people who are somewhat on the fence when it comes to this topic have a better chance of making informed decisions in the interest of public health and to stop them from falling into conspiracy theories, contributing to the global effort to tackel the Covid-19 pandemic.

## Track: 
Health

## Inspiration:
As the recent Facebook leaks reveal, misinformation and divisive content is not only often ignored, but it even seems to be good for business.
Inspired by this, our team wanted to create a tool to counter the rampant misinformation, to perhaps sway some of those remaining on the fence to stay on the correct side of history, and perhaps even pull some people out of the conspiracy theory vortex.

## What it does:
While browsing the web, the Chrome extension analyses the body of any website visited, and determines if its contents are COVID-related. If this is found to be the case, a text processing algorithm tries to determine whether the contents are about COVID in a general sense, or if they concern themselves with themes of vaccines, masks, or quarantine and self-isolation.

With this information, a call is made to a custom API that returns link to the website of the user's local health authority, determined by the location of the user and the broad theme of the website as described above.

A system notification is then generated, which, when clicked, opens a new tab to the link retrieved from the API.

Apart from this, when the the extension gets opened directly in the extensions bar, the user will be provided with links to the local health authority's sites providing information about vaccination, face covering and the virus in general.

## How we built it:
We began by conducting a search about the feasibility of our idea. After concluding that the task is doable, we divided the project into four main areas: frontend, backend, text processing and keyword search & categorisation. 

###Frontend
This part consists of HTML, CSS, and JavaScript, and dynamically updates link URLs based on user location. The popup.html also provides a central hub for locally sourced information on a selection of topics in a way that is less invasive than the notifications.

###Backend
The backend API written in Flask and deployed via Heroku takes topics and country codes as input, and returns a relevant URL. This means that the sources of information can be updated without the user having to update anything, and makes the process of changing and adding new countries and URLs easier and more flexible.

## Challenges we ran into:
One of the most difficult parts of the project was navigating the permissions constraints of Google Chrome extensions, as the browser is quite limiting in what it allows its extensions to do.

This improves security of course, but it also makes creation significantly more difficult, especially because a majority of the team has little to no experience with making browser extensions.

## Accomplishments we're proud of:
Our team is quite proud of the fact that we were able to make a custom Flask API in 24 hours, for which team members had to quickly learn and understand a technology that was almost entirely new to them.

## What we learned:
As mentioned in the previous section, members of the team had to become acquainted with Flask in order to create an API.

Furthermore, a majority of the team had very little or no experience with hackathons, and gained a great deal of experience when it comes to working as a team and applying the fairly theoretical knowledge gained at university, that we usually only get to do individually of each other, and in what could be described as "clinical conditions".

## Whats next:
The extension only works for the US, the UK, Canada, Australia, and New Zealand — users from other countries get directed to the WHO website instead of their local government. Potential next steps could include expanding into more countries, or potentially adding compatibility for more languages, as it is only designed to work on websites in English for now.

### Bianca Sandu, Julius Weisser, Benedek Der, Siddharth Srivastava
##### (Images provided by the CDC and Fusion Medical Animation via Unsplash)
