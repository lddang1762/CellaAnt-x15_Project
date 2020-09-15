// Time-stamp: <2020-09-12 Luc Dang>
// Author: Luc Dang
// Info: lddang1762@csu.fullerton.edu
// Discription: script helps draw the grid and the "Ant"

// === draw_grid ===
// Draw a fancy grid with major & minor lines 
// & major row/col numbers.
function draw_grid( rminor, rmajor, rstroke, rfill  ) 
{
    stroke( rstroke );
    fill( rfill );
    let sz = g_canvas.cell_size;
    let width = g_canvas.wid*sz;
    let height = g_canvas.hgt*sz
    for ( var ix = 0; ix < width; ix += rminor )
    {
        let big_linep = (ix % rmajor == 0);
        let line_wgt = 1;
        if (big_linep) line_wgt = 2;
        strokeWeight( line_wgt );
        line( ix, 0, ix, height );
        strokeWeight( 1 );
        if ( ix % rmajor == 0 ) { text( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        let big_linep = (iy % rmajor == 0);
        let line_wgt = 1;
        if (big_linep) line_wgt = 2;
        strokeWeight( line_wgt );
        line( 0, iy, width, iy );
        strokeWeight( 1 );
        if ( iy % rmajor == 0 ) { text( iy, 0, iy + 10 ); }
    }
}

// === draw_traingle ===
// Draws a white triangle within current cell facing cardinal direction

function draw_triangleNorth(cell_size, gbot_x, gbot_y){
    //fill(color('white'));
    noFill();
	strokeWeight(2);
	stroke(color('white'));
    let x = gbot_x * cell_size;
    let y = gbot_y * cell_size;
    let x1 = x+cell_size/2;
    let y1 = y+3;
    let x2 = x+2;
    let y2 = y+cell_size-1;
    let x3 = x+cell_size-2; 
    let y3 = y+cell_size-1;
	triangle(x1, y1, x2, y2, x3, y3);
}

function draw_triangleSouth(cell_size, gbot_x, gbot_y){
    //fill(color('white'));
    noFill();
	strokeWeight(2); 
	stroke(color('white'));
    let x = gbot_x * cell_size;
    let y = gbot_y * cell_size;
    let x1 = x+cell_size/2;
    let y1 = y+cell_size-2;
    let x2 = x+2;
    let y2 = y+2;
    let x3 = x+cell_size-2; 
    let y3 = y+2;
	triangle(x1, y1, x2, y2, x3, y3);
} 

function draw_triangleWest(cell_size, gbot_x, gbot_y){
    //fill(color('white'));
    noFill();
	strokeWeight(2);
	stroke(color('white'));
    let x = gbot_x * cell_size;
    let y = gbot_y * cell_size;
    let x1 = x + 2;
    let y1 = y+cell_size/2;
    let x2 = x+cell_size-2;
    let y2 = y+2;
    let x3 = x+cell_size-2; 
    let y3 = y+cell_size-2;
	triangle(x1, y1, x2, y2, x3, y3);
}

function draw_triangleEast(cell_size, gbot_x, gbot_y){
    //fill(color('white'));
    noFill();
	strokeWeight(2);
	stroke(color('white'));
    let x = gbot_x * cell_size;
    let y = gbot_y * cell_size;
    let x1 = x+cell_size-2;
    let y1 = y+cell_size/2;
    let x2 = x+2;
    let y2 = y+2;
    let x3 = x+2; 
    let y3 = y+cell_size-2;
	triangle(x1, y1, x2, y2, x3, y3);
}