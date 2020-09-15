Readme for js-p5-example
Time-stamp: <2020-09-14 Luc Dang>
------------------------------------------------------------

Intro

  This example draws a grid and runs an invisible bot from cell to cell
  on the grid changing its colors.  You can stop/restart the bot with
  any keypress.  You can move the bot to any cell with a mouse-click.

  This is an example project using HTML, Javascript (JS), and P5.js
  which is a JS-adapted version of the Processing Language.  CF HTML and
  JS on the web (eg, Wikipedia).  More on P5 is at
  p5js.org/reference.and at github.com/processing/p5.js/wiki.

  P5 provides sutomated animation (via a user-built "draw" function),
  and GUI manipulation functions that are simpler than JS.

Zip Contents

  File readme.txt.  This file.

  File CellaAnt_1000.JPG.  A snapshot of program after 1000 moves of the Ant.

  File CellaAntPorject.html. Drag and drop this into a browser to run the example.
    Click anywhere to set new location for Ant (via mousePressed).
    Hit (almost) any key to toggle bot on or off (via keyPressed).

  File p5.js. This is the P5 package.  It is loaded inside the html.

  File cs-sketch.js. This contains several P5 user-defined linkage functions.
    Contains many project-oriented functions defined by Luc Dang.
    P5's setup() is run once before page display.
    P5's draw() is run once per display frame, so you can do animation.

  File assets/styles.css.  This is an extra-small example of controlling
    webpage styling.  // Loaded inside the html.

  File assets/draw-stuff.js. File includes the utility draw_grid function
    written in P5+JS, as well as utility draw_triangle function 
    that draws Ant as triangle facing cardinal direction. // Loaded inside the html.

Installation & Running

  1. Extract the .zip file into a folder.

  2. Drag the index HTML file, iCellaAntPorject.html., into a browser
    window.  The example P5 program should start immediately.  You
    should see a 820x820 grid (gray lines on black background) with
    row/column headers and some of the grid cells colored.  See the
    picture CellaAnt_1000.JPG.

Known Bugs

  o- Bot ignores the 41st boundry lines

  o- Clicking on a cell is sometimes inaccurate. Sometimes lands on adjacent cell

Warnings

  o- Clicking outside the grid wraps the mouse x.y back into the grid --
     maybe at a weird-looking spot.  Enjoy.

  o- Testing was light.  Didn't try all key or mouse combos.

Testing

  o- Traced and followed the first ~50 moves for accuracy. Everything seems good.

Credits

  Some code was borrowed and modified from Stuart's book.  
    Introducing JavaScript Game Development: Build a 2D Game from the
    Ground Up, by Graeme Stuart, 2018, 209 pages.
  Skeleton code provided by Professor Siska (CSUF)

  And, of course, thanks to the HTML and P5.js developers.
