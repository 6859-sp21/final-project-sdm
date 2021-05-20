# tradespace-universe
---

## Project Inspiration
This project was inspired by the core curriculum of [Massachusett Institute of Technology](https://web.mit.edu/)'s [System Design & Management (SDM)](https://sdm.mit.edu/) program that the author was affilliated to during the academic year 2019-20. Various projects & activities performed around the tradespace analysis were insightful, though painful to develop on traditional tools. Hence, the urge to bring-your-own-code led to the development of the [TRADESPACE UNIVERSE](6859-sp21.github.io/final-project-sdm/). The hope is to support future students on their  (SDM core) journey.

## Project Planning
Initially, a project scoping activity was performed to identify & then prioritize features based on (self-defined) [high-level requirements](https://docs.google.com/presentation/d/1B0D2Feb0dvZxbxSgtC0P5ENkHkj_VHo5fl7ZVuMfgFI/edit?usp=sharing). Followed by the requirements, a [mockup](https://docs.google.com/presentation/d/1wtdTds_O2-4FBaipg1F2oP3085XSUMoRAiCrqSMd1A0/edit#slide=id.gd60937d636_0_0) was  designed to materialize the user-needs in visual form. This was then used to develop a [tentative architecture](https://docs.google.com/presentation/d/1B0D2Feb0dvZxbxSgtC0P5ENkHkj_VHo5fl7ZVuMfgFI/edit?usp=sharing) to break the components into smaller chunks of work that are relatively implementable in shorter times. Finally, a [project plan](https://docs.google.com/spreadsheets/d/1JzRmCgq1eZ1TxeXkxjMs9VOnZfUoNv-cMp9GRKBr1nM/edit?usp=sharing) was developed to keep track of all deliverables & their deadlines as expected by the course. Here are the links to corresponding items discussed above:

*This step may seem to be an overkill for a class project, however it is important to note that the need for time & work management in a __single-member team__ (spending approximately 9 man-h/wk for 4 weeks) is high.*

## Project Setup
Once the scope & schedule were clearer, the author set up necessary tools & platforms required for development as well as deployment of the project. Luckily, the author already had a computer-science background (undergraduate degree from [PEC University of Technology, Chandigarh, India](https://pec.ac.in)) which saved time to setup the development environment ([Microsoft Visual Code](https://code.visualstudio.com/) & [git](https://git-scm.com/)). The course expectations of code-versioning with github-classroom were then tackled. A [github repository](https://github.com/6859-sp21/final-project-sdm) was created, [github-pages](https://pages.github.com/) were enabled on the same, and a clone was created in author's local machine to track & upload new (code) versions to [GitHub](https://github.com/).

## Project Implementation
With all those logistics out of the way, the actual development activity was started - starting with the development of `home page`, then `tradespace-view` & then the `build-view`. Note that although an early mockup was designed, the emphasis of that mockup was more towards ensuring coverage of functionality. The actual design decisions to make a highly engaging and user-friendly visualization tool were made during this implementation phase.

The home-page was kept simple to NOT overwhelm the user at first glance. A simple title, a quick description & 2 buttons (1 to explore a sample tradespace and another to build-your-own) is all that comprises of the home page.

Assuming that some trust should have been established with the user based on their `home-page` experience, the next step (as also anticipated in the user journey) was to develop the `tradespace view`. This is really the core of the tool, as it not only visualizes a tradespace but also allows for in-depth analysis with its dynamic interactions. A significant time was spent in ensuring the right set of components were made available in this page, while balancing the (anticiapted) user-need of simplicity & minimalism. Beyond the overall tradespace, a lot of minute details like hover functionality were implemented during this phase.

Once that was developed, a hard-coded version of the `build view` was implemented. This was mostly rushed to be able to showcase a bare-bones version of the section & gather peer feedback from the course's mid-term milestone. 

Post the mid-term, peer-feedbacks were exchanged across teams. This was quite useful (especially for a single-member team) and a lot of valuable feedback shaped the project to how it was finally submitted at semester end. Besides these bug/feature updates, it was then that the rest of the implementation of build section was completed enabling it to be completely dynamic. This was also time consuming, and a lot of user-centered design-thinking practices were leveraged - e.g. relevant user messaging through instructions & titles, disabling buttons to avoid misclicking, etc.

Post the completion of these functional features, the aesthetics of the complete visualization tool were enhanced using better [color-palette](https://coolors.co/palettes/trending), [fonts](https://www.hostinger.com/tutorials/best-html-web-fonts) & CSS animations. Regardless of how complicated the implementation of core functionality is, a user primarily judges a tool by its user-experience! Therefore, special considerations of the user persona led to corresponding design choices that went into this section of implementation.

Finally, a few incremental changes were made to further enhance the user-experience. Also, it is worth noting that a few features were withdawan since their implementation wasn't complete. The author believes that NOT delivering a feature is better than delivering an incomplete feature.

Few other course-deliverables and an overview of the project have been published [here](https://mit-sdm.github.io/6859-sp21/).