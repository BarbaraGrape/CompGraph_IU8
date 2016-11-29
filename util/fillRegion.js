function fillRegion(ctx, x, y, w, h)
{
	function isWhite(x, y)
	{
		pixel = ctx.getImageData(x, y, 1, 1).data;
		if (pixel[3] == 0)
			return true;
		return false;
	}
	function isValidPos(x,y)
	{
		if (x < 0 || x > w || y < 0 || y > h)
			return false;
		return true;
	}

	var stack = [ [x, y] ];
	while (stack.length != 0)
	{
		point = stack.pop();
		var x = point[0], y = point[1];

		if (!isValidPos(x,y))
			continue;
		if (!isWhite(x,y))
			continue;;

		ctx.fillRect(x, y, 1, 1);
		stack.push([x+1, y]);
		stack.push([x-1, y]);
		stack.push([x, y+1]);
		stack.push([x, y-1]);
	}
}
