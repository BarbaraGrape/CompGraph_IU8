function bresCircle(ctx, x0, y0, R)
{
	function dot(x,y) { ctx.fillRect(x,y,1,1); }
	var x = 0;
	var y = R;
	var delta = 1 - 2*R;
	var error = 0;
	while (y >= 0)
	{
		dot(x0 + x, y0 + y);
		dot(x0 + x, y0 - y);
		dot(x0 - x, y0 + y);
		dot(x0 - x, y0 - y);
		error = 2 * (delta + y) - 1;
		if ((delta < 0) && (error <= 0))
		{
			delta += 2 * (++x) + 1;
			continue;
		}
		error = 2 * (delta - x) - 1;
		if ((delta > 0) && (error > 0))
		{
			delta += 1 - 2 * (--y);
			continue;
		}
		x++;
		delta += 2 * (x - y);
		y--;
	}
}
