function dist(x0,y0,x1,y1)
{
	return Math.sqrt(Math.pow(x1-x0,2) + Math.pow(y1-y0,2));
}

function findFramingRect(polygon)
{
	var xMax = null, xMin = null, yMax = null, yMin = null;
	xMax = xMin = polygon[0].x;
	yMax = yMin = polygon[0].y;

	for (var i = 1; i < polygon.length - 1; ++i)
	{
		if (polygon[i].x > xMax)
			xMax = polygon[i].x;
		else if (polygon[i].x < xMin)
			xMin = polygon[i].x;

		if (polygon[i].y > yMax)
			yMax = polygon[i].y;
		else if (polygon[i].y < yMin)
			yMin = polygon[i].y;
	}
	return [xMin, yMin, xMax, yMax];
}

function drawRect(ctx, Rect)
{
	bresLine(ctx, Rect[0],Rect[1],Rect[2],Rect[1]);
	bresLine(ctx, Rect[2],Rect[1],Rect[2],Rect[3]);
	bresLine(ctx, Rect[2],Rect[3],Rect[0],Rect[3]);
	bresLine(ctx, Rect[0],Rect[3],Rect[0],Rect[1]);
}
function polygonDraw(ctx, polygon)
{
	for (var i = 1; i < polygon.length; ++i)
		bresLine(ctx, polygon[i-1].x, polygon[i-1].y, polygon[i].x, polygon[i].y);
}
function addPoint2Polygon(polygon, x, y)
{
	polygon.push({x: x, y: y});
}
function pushPoint(arr, x, y)
{
	arr.push({x: x, y: y});
}
function isInInterval(c, a, b)
{
	if ((c <= a && c <= b) || (c >= a && c >= b))
		return false;
	return true;
}
function randInt(min, max) 
{
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}
