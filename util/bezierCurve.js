function bezierCurve(ctx, points)
{
	function getPointOnLine(t, x0, y0, x1, y1)
	{
		var newX = (x1 - x0)*t + x0;
		var newY = (y1 - y0)*t + y0;
		return {x: newX, y: newY};
	}
	function getPointOnCurve(t, points)
	{
		if (points.length == 2)
			return getPointOnLine(t, points[0].x, points[0].y, points[1].x, points[1].y);

		var newPoints = [];
		for (var i = 1; i < points.length; ++i)
			newPoints.push(getPointOnLine(t, points[i-1].x, points[i-1].y, points[i].x, points[i].y));

		return getPointOnCurve(t, newPoints);
	}

	var dt = 0.01;
	var point = getPointOnCurve(0, points);
	for (var t = dt; t <= 1; t += dt)
	{
		var newPoint = getPointOnCurve(t, points);
		bresLine(ctx, point.x, point.y, newPoint.x, newPoint.y);
		point = newPoint;
	}
}
