function polygonFill(ctx, polygon)
{
	var rect = findFramingRect(polygon);
	function isInSegment(c, a, b)
	{
		if ((c < a && c < b) || (c > a && c > b))
			return false;
		return true;
	}
	function isInYBound(y, a, b)
	{
		if (a > b)
			[a, b] = [b, a];
		if (y < a || y > b)
			return false;
		if (y == b)
			return false;
		return true;
	}
	function getLines(polygon)
	{
		var lines = [];
		for (var i = 1; i < polygon.length; ++i)
		{
			var x0 = polygon[i-1].x, y0 = polygon[i-1].y, x1 = polygon[i].x; y1 = polygon[i].y;
			var k = (y1 - y0)/(x1 - x0);
			var b = null;
			var type = null;
			if (x1 - x0 != 0)
			{
				b = y1 - k*x1;
				if (k == 0)
					type = 'y';
			}
			else
				type = 'x';
			lines.push({type: type, x0: x0, x1: x1, y0: y0, y1: y1, k: k, b: b});
		}
		return lines;
	}
	function findIntersection(lines, y)
	{
		var list = [];
		for (var i = 0; i < lines.length; ++i)
		{
			var line = lines[i];
			switch(line.type)
			{
				case 'y':
					break;
				case 'x':
					if (!isInYBound(y, line.y0, line.y1))
						continue;
					list.push({x: line.x0, y: y});
					break;
				default:
					if (!isInYBound(y, line.y0, line.y1))
						continue;
					var x = Math.round((y - line.b)/line.k);
					if (!isInSegment(x, line.x0, line.x1))
						continue;
					list.push({x: x, y: y});
					break;
			}
		}
		list.sort(function(a,b) { if(a.x < b.x) return -1; else if (a.x > b.x) return 1; return 0; })
		return list;
	}
	function fillList(list)
	{
		if (list.length % 2 != 0)
		{
			alert("Wrong list!");
			return;
		}
		for (var i = 1; i < list.length; i+=2)
		{
			var l = list[i].x - list[i-1].x + 2;
			if (l <= 0)
				continue;
			ctx.fillRect(list[i-1].x-1, list[i-1].y, l, 1);
		}
	}
	
	var yMin = rect[1];
	var yMax = rect[3];
	var lines = getLines(polygon);
	for (var y = yMin; y <= yMax; ++y)
	{
		var list = findIntersection(lines, y);
		fillList(list);
	}
}
