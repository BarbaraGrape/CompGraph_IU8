function rectClip(rect, lines)
{
	var left 	= 1;
	var right 	= 1 << 1;
	var down	= 1 << 2;
	var up		= 1 << 3;
	
	function getPointBit(x, y)
	{
		var b = 0;
		if (x < rect[0])
			b |= left;
		else if (x > rect[2])
			b |= right;

		if (y > rect[3])
			b |= down;
		else if (y < rect[1])
			b |= up;
		return b;
	}
	function getLineBit(line)
	{
		return [getPointBit(line.x0, line.y0), getPointBit(line.x1, line.y1)];
	}
	function clipLine(oldLine)
	{
		var line = {x0: oldLine.x0, y0: oldLine.y0, x1: oldLine.x1, y1: oldLine.y1};
		var bits = getLineBit(line);
		while(bits[0] | bits[1])
		{
			if (bits[0] & bits[1])
				return null;

			var x = null, y = null;
			var c = null

			if (bits[0])
			{
				c = bits[0]
				x = line.x0, y = line.y0;
			}
			else
			{
				c = bits[1]
				x = line.x1, y = line.y1;
			}

			if (c & left)
			{
				y += (line.y0 - line.y1) * (rect[0] - x) / (line.x0 - line.x1);
				x = rect[0];
			}
			else if (c & right)
			{
				y += (line.y0 - line.y1) * (rect[2] - x) / (line.x0 - line.x1);
				x = rect[2];
			}
			else if (c & up)
			{
				x += (line.x0 - line.x1) * (rect[1] - y) / (line.y0 - line.y1);
				y = rect[1];
			}
			else if (c & down)
			{
				x += (line.x0 - line.x1) * (rect[3] - y) / (line.y0 - line.y1);
				y = rect[3];
			}

			if (c == bits[0])
			{
				line.x0 = x; line.y0 = y;
			}
			else
			{
				line.x1 = x; line.y1 = y;
			}
			bits = getLineBit(line);
		}
		return line;
	}

	var newLines = [];
	for (var i = 0; i < lines.length; ++i)
	{
		var newLine = clipLine(lines[i]);
		if (newLine != null)
			newLines.push(newLine);
	}

	return newLines;
}
