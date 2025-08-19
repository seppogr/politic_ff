# politic_ff

About

This a fantasy football style of a game, but adapted into the world of Finnish parliamentary politics. Personal aim is to learn web-based techniques such as node.js, express, MongoDB and AJAX. This is my first adventure in the world of asynchronous programming and currently several features are a bit clumsy, but working.

Current version is an early demo, with following functionalities working:
-	a database in which there are all Finnish MPs, with pictures
-	tools to create, update and delete entries in the database
-	user database with same functionalities
-	user login/logout
-	for a logged in user there is a possibility to add MPs into your team
-	view your (and only your) own team of politicians when logged in


Motivation

This program started as a learning project in Dmola Summer Programme 2025 in Tampere, Finland. Our team was tasked to innovate solutions on gamifying politics. Ouri final solution was to raise interest in day-to-day politics in the age group of 15-22 by offering a fantasy football type game in which the users' teams don't consist of football players but Members of Parliament. We narrowed our focus on the Finnish parliament for the time being. This repository consists of both the programme I wrote for our "draft" database building on that a simple login system through which views consisting only the logged in users' teams of politicians is served.

It should be noted that I have completed thois project as a sister-project to the Capstone project in Jonathan Wexler's book "Get Programming with node.js" (Manning 2019). One browsing through the code may find clear similarities, but there is hopefully clear evidence of adaptation and individual thought. Anyway, the book alonside stackoverflow.com has been an enormaous help to me when figuring out how to try to program a fantasy parliament game.

One additional note, in no stage of development has AI tools been used. The code is my own adaptation of source material, and some original thoughts.

Build status

As of yet, the program is still in early development so no builds have been made, or planned.

Tech/Framework

    - node.js v22.18.0 LTS with the following dependencies (copy from package.json):
        "dependencies": {
            "bcrypt": "^6.0.0",
            "connect-flash": "^0.1.1",
            "cookie-parser": "^1.4.7",
            "ejs": "^3.1.10",
            "express": "^5.1.0",
            "express-ejs-layouts": "^2.5.1",
            "express-session": "^1.18.2",
            "express-validator": "^5.3.1",
            "http-status-codes": "^2.3.0",
            "method-override": "^3.0.0",
            "mongoose": "^8.17.0",
            "passport": "^0.7.0",
            "passport-local-mongoose": "^8.0.0"
        }

    - coding language distribution, according to GitHub:
        - JavaScript 59.9%
        - EJS 37.6%
        - CSS 2.5%

Credits

Jonathan Wexler: "Get Programming with node.js" (Manning 2019). I used the lessons and the capstone project, both of which I coded alongside the current project as a basis of learning on how to get started with a node.js project.

Also several contributors on stackoverflow.com community have been a huge help for a beginner coder like me.

License

Open Source

(c) Seppo Grubert 2025