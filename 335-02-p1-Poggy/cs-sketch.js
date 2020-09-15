// cs-sketch.js; P5 key animation fcns.  // CF p5js.org/reference
// Time-stamp: <2020-09-14 Luc Dang>
// Author: Luc Dang
// Info: lddang1762@csu.fullerton.edu
// Discription: script creates 820x820 grid, moves and draws the "Ant" according to the prompt

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:20, wid:41, hgt:41 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 12; // Update ever 'mod' frames.
var g_stop = 0; // Go by default.

var move_num = 0; // number of moves made


var color_state = 0; // index of color in color_sqn, wrapping around
//               ['black',  'red',   'yellow',    'blue',     'green'];
var color_sqn = [[0,0,0], [255,0,0], [255,255,0], [0,0,255], [0,128,0]]

var g_bot = { dir:0, x:20, y:20, color:color_sqn[0] }; // Dir is 0..7 clock, w 0 up.
var g_box = { t:1, hgt:40, l:1, wid:40 }; // Box in which bot can move.

//================================================================================================

function setup() // P5 Setup Fcn
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
    draw_grid( 20, 0, 'gray', 'yellow' );
   
    draw_triangleNorth(sz, g_bot.x, g_bot.y)
}

// function returns the color index of current cell relative to the color sequence array
function check_color_state(){
    let sz = g_canvas.cell_size;
    let sz2 = sz / 2;
    let x = 1+ g_bot.x*sz; 
    let y = 1+ g_bot.y*sz;
    let big = sz -2; 
    let acolors = get( x + sz2, y + sz2 ); // Get cell interior pixel color [RGBA] array.

    let state = 0; 
    // compares cell color to colors in the sequence, ignoring Alpha component
    for(var i = 0; i <= 4; i++){
        if(acolors[0] == color_sqn[i][0] && acolors[1] == color_sqn[i][1] && acolors[2] == color_sqn[i][2]){
            state = i;
		}
	}
    return state;
}

// function changes the direction of the bot based on the color it sit on
function change_bot_dir(state){
    // turn right on red, blue
    if(state == 1 || state == 3) {
        g_bot.dir++;
        if(g_bot.dir > 3){
            g_bot.dir = 0;
		}
	}
    // else turn left
    else{
        g_bot.dir--;
        if(g_bot.dir < 0){
            g_bot.dir = 3;
		}
	}
}

// function colors the current cell with argument color
function color_cell(color){
    let sz = g_canvas.cell_size;
    let sz2 = sz / 2;
    let x = 1 + g_bot.x*sz; // Set x one pixel inside the sz-by-sz cell.
    let y = 1 + g_bot.y*sz;
    let big = sz - 2; 
    fill(color);
    strokeWeight(2);
    stroke( 'gray' ); 
    rect(x, y, big, big );
}

// function moves bot according to current direction, changing direction according to cell color
function move_bot()
{    
    let cell_state = check_color_state();
    change_bot_dir(cell_state);    

    let dir = g_bot.dir; // {N,E,S,W} : {0,1,2,3}
    let dx = 0;
    let dy = 0;
    switch (dir) { 
        case 0 : {         dy = -1; break; } //North
        case 1 : { dx = 1;          break; } //East
        case 2 : {         dy = 1;  break; } //South
        case 3 : { dx = -1;         break; } //West
    }    

    // increments current color to next in sequence, wrapping around
    let cell_color = check_color_state();
    cell_color++;
    if(cell_color > 4){
        cell_color = 0;
	}
    let color =  color_sqn[cell_color]; // Incr color to next in sequence
    color_cell(color);

    let x = (dx + g_bot.x + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
    let y = (dy + g_bot.y + g_box.hgt) % g_box.hgt; // Ditto y.

    // update bot position to move it
    g_bot.x = x;
    g_bot.y = y;
    g_bot.dir = dir;
    document.getElementById("movenum").innerHTML = "Move number: " + move_num; //update number shown in HTML
}

// function borders the visited cell and draws the bot as a directed white triangle 
function draw_bot() 
{
    let sz = g_canvas.cell_size;
    let x = 1+ g_bot.x*sz; // Set x one pixel inside the sz-by-sz cell.
    let y = 1+ g_bot.y*sz;
    let big = sz -2; // Stay inside cell walls.
    
    noFill();
    strokeWeight(2);
    stroke( 'gray' ); 

    // Paint the cell.
    rect( x, y, big, big );

    // draws bot as a triangle facing current direction
    let dir = g_bot.dir;
    switch(dir){
        case 0 : { draw_triangleNorth(sz, g_bot.x, g_bot.y); break; } //North
        case 1 : { draw_triangleEast(sz, g_bot.x, g_bot.y); break; } //East
        case 2 : { draw_triangleSouth(sz, g_bot.x, g_bot.y); break; } //South
        case 3 : { draw_triangleWest(sz, g_bot.x, g_bot.y); break; } //West
	}
}

function draw_update()  // Update our display.
{
    //console.log( "g_frame_cnt = " + g_frame_cnt );
    move_bot( );
    draw_bot( );
}

function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    if(move_num <= 1000){
        ++g_frame_cnt;
        if (0 == g_frame_cnt % g_frame_mod)
        {
            if (!g_stop){ 
                draw_update();
                move_num++;
            }
        }
	}    
}

function keyPressed( ) { g_stop = ! g_stop; }

function mousePressed( )
{
    let cell_color = check_color_state();
    let color =  color_sqn[cell_color]; 
    color_cell(color);

    let x = mouseX;
    let y = mouseY;
    //console.log( "mouse x,y = " + x + "," + y );
    let sz = g_canvas.cell_size;
    let gridx = round( (x-0.5) / sz );
    let gridy = round( (y-0.5) / sz );
    //console.log( "grid x,y = " + gridx + "," + gridy );
    //console.log( "box wid,hgt = " + g_box.wid + "," + g_box.hgt );
    g_bot.x = gridx + g_box.wid; // Ensure its positive.
    //console.log( "bot x = " + g_bot.x );
    g_bot.x %= g_box.wid; // Wrap to fit box.
    g_bot.y = gridy + g_box.hgt;
    //console.log( "bot y = " + g_bot.y );
    g_bot.y %= g_box.hgt;
    //console.log( "bot x,y = " + g_bot.x + "," + g_bot.y );

    g_bot.dir = 0; // when clicked to new cell automatically resets direction to North 
    draw_bot( );
}
