class Matrix {
	//[ [..] [..] [..] ] - 3 row
	constructor(array, makeCopy)
	{
		if (makeCopy == false)
			this.data = array;
		else
		{
			this.data = [];
			for (let i = 0; i < array.length; ++i)
				this.data[i] = array[i].slice();
		}

		this.rows = array.length;
		this.cols = array[0].length;
	}

	static mul(m1, m2)
	{
		if (m1.cols != m2.rows)
			throw new Error("Matrix mul error!");

		function mulRowCol(r)
		{
			let row = [];
			for (let c = 0; c < m2.cols; ++c)
			{
				let s = 0;
				for (let i = 0; i < m1.cols; ++i)
					s += m1.data[r][i] * m2.data[i][c];
				row[c] = s;
			}
			return row;
		}
		let m3 = [];
		for (let r = 0; r < m1.rows; ++r)
			m3[r] = mulRowCol(r);
		return new Matrix(m3, false);
	}
}
class Point extends Matrix {
	constructor(x,y)
	{
		super([[x],[y],[1]]);
	}
	get x()
	{
		return this.data[0][0];
	}
	get y()
	{
		return this.data[1][0];
	}
	apply(m)
	{
		let newP = Matrix.mul(m, this);
		this.data = newP.data;
	}
}
class MoveMatrix extends Matrix {
	constructor(dx, dy)
	{
		super([[1, 0, dx],[0, 1, dy],[0, 0, 1]]);
	}
}
class ScaleMatrix extends Matrix {
	constructor(sx, sy)
	{
		super([[sx, 0, 0],[0, sy, 0],[0,0,1]]);
	}
}
class RotateMatrix extends Matrix {
	constructor(a)
	{
		super([[Math.cos(a), -Math.sin(a), 0],[Math.sin(a),Math.cos(a), 0],[0,0,1]]);
	}
}
