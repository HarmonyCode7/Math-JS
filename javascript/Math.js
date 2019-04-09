/*  
*  DATE CREATED : 9 APRIL 2019 01:01 GMT
*  CREATED BY   : HARMONY MOYO 
*  MODULE NAME  : Geometry [Linear]
*/


function autorun()
{

}

function Point(x,y)
{
    this.X = x;
    this.Y = y;
}

function Circle(centre, radius)
{
    this.radius = radius;
    this.centre = centre;
}

function Line(point, gradient)
{

}

function Y-Intercept(pointA, pointB)
{
    //General equation of line y - y1 = m(x - x1) for known points
    // x1, y1 anx gradient m
    // Y intercept occurs when x = 0, so only rearrange 
    // for y
    let m = Gradient(pointA, pointB);
    let y = m*(0 - pointA.X) + pointA.Y;
    return y;
}

function LineAB(pointA, pointB)
{
    this.Start = new Point(pointA.X, pointA.Y);
    this.End   = new Point(pointB.X, pointB.Y);
    this.Y-intercept =  Y-Intercept(pointA, pointB);
}

function Gradient(pointA, pointB)
{
   let line  = new LineAB(pointA,pointB);
   let diffX = line.End.X - line.Start.X;
   let diffY = line.End.Y - line.Start.Y;
   return Math.sqrt( (diffX * diffX) + (diffY * diffY) );
}

function PointOfIntersection(lineA, lineB)
{
   // y = m1x + c1 , y = m2x + c2 or y where c1 , c2 , m1 and m2 are known
   // m1x + c1 = m2x + c2
   // m1x - m2x = c2 - c1
   
   let m1 = Gradient(lineA.Start,lineA.End);
   let m2 = Gradient(lineB.Start, lineB.End);
   let x = (c2 - c1) / (m1 - m2);
   let y = m1*x - c1;   
   return new Point(x,y);
}

function EquationOfACircle(centre, radius)
{

}

functions Quadratic()
{
    // ax^2 + bx + c = 0
    // (x - b)^2 + c = 0
    // (x-a)^2 = x^2 - 2ax + a^2
    

}

   if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
   else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
   else window.onload = autorun;


