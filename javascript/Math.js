/*  
*  DATE CREATED : 9 APRIL 2019 01:01 GMT
*  CREATED BY   : HARMONY MOYO 
*  MODULE NAME  : Geometry [Linear]
*/


function autorun()
{

    // 1 + 4 + 3 = 
    let canvas = document.getElementById("canvas");
    let canvas_control = document.getElementById("canvas-control");
    let canvas_info = document.getElementById("canvas-info");
    let dimension_selection = document.getElementById("dimension");
    let dimension_value = 0;

    

    canvas.style.width =  750;
    canvas.style.height = 500;
    let W = canvas.style.width.split("px")[0];
    let H = canvas.style.height.split("px")[0]
    canvas_info.innerHTML = "Canvas Dimension : "+ W +" x " +
     H;
    let c1 = new Circle(new Point(50,50), 40);
    let pc = new Point(150,150);
    let pointCircle = pc.Draw("black");
    let circle1 = c1.Draw("black", "transparent", "3");
    PointCursor();
    canvas.appendChild(pointCircle);
    canvas.appendChild(circle1);+
    PointCursor();
    //let circle = document.getElementsByTagNameNS("http://www.w3.org/2000/svg","circle");  
    let changedSize = ChangeSize(canvas, canvas_control, dimension_selection);
    let fillColor = RandomColor();
    ChangeFill(circle1, fillColor);
    DrawGrid(canvas, W, H, 20);
    
}

function DrawGrid(canvas,width, height, unit)
{
    for(let i = unit; i < width - unit; i+= unit) 
    {
        for(let j = unit; j < height; j+= unit)
        {
            let point = new Point(i,j).Draw(RandomColor());
            canvas.appendChild(point);
        }
    }
}

function PointCursor()
{
    let dragElements = document.querySelectorAll(".draggable");
    for(let i = 0; i < dragElements.Length; ++i)
    {
        dragElements[i].style.cursor = "move";
        dragElements[i].style.fill = "orange";
    }
}
function RandomColor()
{
    let R = Math.floor(Math.random() * 255).toString();
    let G = Math.floor(Math.random() * 255).toString();
    let B = Math.floor(Math.random() * 255).toString();
    let alpha = Math.random().toString();
    let RGBA = "rgba("+ R + ", " + G + "," + B + "," + alpha + ")";
    return RGBA
}

function UpdateCanvasInfo(svgCanvas)
{
    let updatedInfo = {width: svgCanvas.style.width.split("px")[0], 
    height: svgCanvas.style.height.split("px")[0]}
    svgCanvas.innerHTML = "Canvas Dimension: "+ updatedInfo.width + " x " + updatedInfo.height;
}
function ChangeSize(htmlElement,control, selected)
{
    let H = htmlElement.style.height;
    let W = htmlElement.style.width;
    console.log(htmlElement);
    control.oninput = function ()
    {
        switch (selectedInput(selected)) {
            case "height":
                H = control.value;
                htmlElement.style.height = H;
                break;
                case "width":
                W = control.value;
                htmlElement.style.width = W;
                break;
        }
        UpdateCanvasInfo(htmlElement);
    }
    return true;
}

function selectedInput(select)
{
    return select.value;
}

function ChangeFill(svgElement, fillColor)
{
    svgElement.onclick = function ()
    {
        console.log("circle clicked");
        svgElement.classList.toggle("filled");
        if(SearchList(svgElement.className.baseVal.split(" "), "filled"))
        {
            svgElement.style.fill = "transparent";
        }
        else
        {
            console.log("changed fill to "+ fillColor);
            svgElement.style.fill = fillColor;
        }
    }
}


function SearchList(list, searchString) 
{
    for (let i = 0; i < list.length; ++i) 
    {
        console.log(list[i]);
        if (list[i] == searchString) 
        {
            return true;
        }
    }
    return false;
}

function DrawLine(ctx, line)
{
    
}

function Circle(centre, radius)
{
    this.radius = radius;
    this.centre = centre;
    let cy = centre.Y;
    let cx = centre.X;
    let r = radius;
    this.Draw = function(strokeColor,fillColor, stroke_width)
    {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        let attributes = {
            "cx":cx, "cy": cy, "r": r,"stroke": strokeColor , "fill": fillColor, "stroke-width":3,
            "class":"circle"
        }
        for(var property in attributes)
        {
            circle.setAttributeNS(null, property, attributes[property]);
        }

        circle.setAttributeNS(null, "stroke",strokeColor);
        circle.setAttributeNS(null, "fill", fillColor);
        circle.setAttributeNS(null, "stroke-width", stroke_width);
        circle.setAttributeNS(null, "class", "draggable");
        console.log(circle);
        return circle;
    }
}

function ApplyAttributes(htmlElementNS, NS, attributes)
{
    for(var property in attributes)
    {
        console.log("Inside apply attributes : "+typeof(htmlElementNS));
        htmlElementNS.setAttributeNS(NS,htmlElementNS, property, attributes[property]);
    }
}

function Point(x,y)
{
    this.X = x;
    this.Y = y;
    let cx = x;
    let cy = y;
    let r = 0.1;

    this.Draw = function(fillColor)
    {
        let ns = "http://www.w3.org/2000/svg";
        let point = document.createElementNS(ns,"circle");
        console.log(point);
        let domString = point.toString();
        let attributes = {
            "cx":cx, "cy": cy, "r": r,"stroke": fillColor , "fill": fillColor, "stroke-width":3,
            "class":"point"
        }
        for(var property in attributes)
        {
            point.setAttributeNS(null, property, attributes[property]);
        }
        //ApplyAttributes(point,null,);
        return point;
    }
}


function Line(point, gradient)
{

}

function Y_Intercept(pointA, pointB)
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
    this.Y_intercept =  Y_Intercept(pointA, pointB);
}

function Gradient(pointA, pointB)
{
   let diffX = pointB.X - pointA.X;
   let diffY = pointB.Y - pointA.Y;
   return diffY / diffX;
}

function Length(pointA, pointB)
{
   let diffX = pointB.X - pointA.X;
   let diffY = pointB.Y - pointA.Y;
   return Math.sqrt( (diffX * diffX) + (diffY * diffY) );
}

function PointOfIntersection(lineA, lineB)
{
   // y = m1x + c1 , y = m2x + c2 or y where c1 , c2 , m1 and m2 are known
   // m1x + c1 = m2x + c2
   // m1x - m2x = c2 - c1
   
   let m1 = Gradient(lineA.Start,lineA.End);
   let m2 = Gradient(lineB.Start, lineB.End);
   let c2 = Y_Intercept(lineA.Start,lineA.End);
   let c1 = Y_Intercept(lineB.Start, lineB.End);
   let x = (c2 - c1) / (m1 - m2);
   let y = m1*x + c1;   
   return new Point(x,y);
}


function EquationOfACircle(centre, radius)
{
    //Equation of a circle x² + 2gx + y² + 2fy + g² + f² - r² = 0
    // Let c = g² + f² - r², then the equation becomes
    // x² + 2gx + y² + 2fy + c = 0
    // For a circle of center (-g, -f) and radius r  = Sqrt(g² + f² - c)
    let g = centre.X;
    let f = centre.Y;
    let c = ((g*g) + (f*f) )-  (radius * radius);
    return {g: g, f: f, c: c};
}

function PointLineOnCircle(circle, point)
{
    let C = EquationOfACircle(circle, circle.radius);
    let y = point.Y;
    let x = point.X;
    let Equation_C = (x*x) + (y*y) -1*(2 * C.g * x) + -1*(2 * C.f * y) + C.c;
    if(Equation_C == 0)
    {
        console.log("Point is on the circle");
        return true;
    }
    console.log("Point is not on the circle");
    return false;
}

function CircleTangentLine(circle, point)
{
    // chec if point lie on the circle
}
function Quadratic()
{

    

}

   if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
   else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
   else window.onload = autorun;


