# alchemy-minesweeper

## Introduction
### The Team
- Sarah Mayfield
- Libby Hamlin
- Tess Lameyer
- Casey Martell
- Lisa Carpenter

### Project Description
The goal of this project is to create a game with logic similar to the classic minesweeper game with an alternate theme.  Rather than marking mines, our concept is to mark dog poop in a park for pickup.

### Problem Domain
- the original game logic
    - we have explored several freely available versions of this game to assess and capture game logic
- responsive design
    - one of our user stories relates to the need for responsive design, i.e. mobile phone use
- appropriate testing
    - we plan to mob test writing
- use of recursive logic
    - this will be a stretch goal since is hasn't been part of the instructional material thusfar
- modularity
    - we plan to have a highly modular structure to our code in order to enhance testing and declarative functions

## Instructions for use of this repository
This repo will be hosted on github pages upon completion.

# User stories
1. Robert is nostalgic for his memories of minesweeper.  He wants gameplay logic to be true to the original.
2. As a busy professional, Jagjit wants an easy app to play on the go so that he can entertain himself on the bus.
3. As a busy baby boomer, Martha appreciates games with a simple interface that she can play with her grandchildren and not lose the game if she needs to put it aside for a few minutes as a time.The game should have a simple interface that's easy to jump back into.
4. Marvin is a professional gamer. He wants to be challenged by a new version of minesweeper that is dynamic and keeps a log of all time high scores.
5. Grace is a novice gamer who wants a game that is approachable and visually appealing.

# Scope
## Target MVP:
- Homepage: explains rules of game, gets name of user.
- Game page: 8 x 8 board with 10 'mines'
- Game logic
    - show the number values around the mine
    - flag mines with a right click, user cannot click a mine on the first
    click! once the last flag is marked (number of flags is indicating of mines), user has to clear the board to win. Definition of losing is clicking on a mine after the first click, definition of winning is correctly flagging all mines and clearing the board, result will show on the same page
- Track games won/lost, track number of clicks
- About me page: photo of each one of us, etc.
- Results on a new page

## Stretch Goals
- multiple skins and/or color themes
    - black holes in outer space
    - lost souls in a graveyard
- list of high scores by user
- automate the revealing of empty cells adjacent to a empty cell that a user selects
- developing additional tests of functions as time permits

# Challenge
-one branch / computer --> branch name is the name of the feature!
-array of array of objects --> once the state is changed, iterating through to show the user the change
-we have a complicated state so using TDD is important
generateBoard() --> randomlyPlaceMines()
##Beyond MVP:
-all-time scores tracked
-really nice styling
-audio
-timer
-avatars for the user
-different size boards
-easter egg box (surprise!)
-animations!! gifs?!
# Wireframe
### Home
### Game Page
### About Me Page

# Communication
- slack for communication
- work in class as much as possible!
- after MVP we can all review code
- a couple check ins as a whole group / day
- you can work at home alone on something you've already committed to working on
-use a whiteboard to document the file scaffolding
-when naming functions/ parameters please use data types in the names!
-check-ins: how is your workload? are you on track to hit our MVP? do you need more assistance?
-conflict--> keep it between you and the person you feel conflict with. If you cannot resolve it one-on-one then let the group know that you're going to have a discussion with the instructor

### Change Log
#### Version 1.0.0

Copyright 2019 Team Mindsweeper

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.