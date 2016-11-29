function bresLine(ctx, x0, y0, x1, y1)
{
	function dot(x, y) {ctx.fillRect(x, y, 1, 1);}

	var deltaX = Math.abs(x1 - x0);
	var deltaY = Math.abs(y1 - y0);
	var error = 0;
	if (deltaX >= deltaY) //
	{
		if (x0 > x1)
		{
			[x0, x1] = [x1, x0];
			[y0, y1] = [y1, y0];
		}
		var deltaErr = deltaY;
		if (y0 >= y1) 
			for (;x0 <= x1; ++x0)
			{
				dot(x0, y0);
				error += deltaErr;
				if ((error<<2) > deltaX)
				{
					--y0;
					error -= deltaX;
				}
			}
		else 
			for (;x0 <= x1; ++x0)
			{
				dot(x0, y0);
				error += deltaErr;
				if ((error<<2) > deltaX)
				{
					++y0;
					error -= deltaX;
				}
			}
	}
	else //deltaX < deltaY
	{
		if (y0 > y1)
		{
			[x0, x1] = [x1, x0];
			[y0, y1] = [y1, y0];
		}
		var deltaErr = deltaX;
		if (x0 >= x1)
			for (;y0 <= y1; ++y0)
			{
				dot(x0, y0);
				error += deltaErr;
				if ((error<<2) > deltaY)
				{
					--x0;
					error -= deltaY;
				}
			}
		else
			for (;y0 <= y1; ++y0)
			{
				dot(x0, y0);
				error += deltaErr;
				if ((error<<2) > deltaY)
				{
					++x0;
					error -= deltaY;
				}
			}
	}
}
