// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

const secretKey =
	"4ab2fce7a6bd79e1c014396315ed322dd6edb1c5d975c6b74a2904135172c03c";

export const authenticateToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let token = req.header("Authorization");

	token = token?.split(" ")[1];
	console.log(token);
	if (!token) return res.status(401).send("Access denied");

	jwt.verify(token, secretKey, (err, user) => {
		if (err) {
			// console.error(err);
			if (err instanceof TokenExpiredError) {
				return res.status(401).send("Access token has expired");
			}
			return res.status(403).send("Invalid token");
		}
		console.log("Decoded token:", user);
		req.body.user = user;
		next();
	});
};

export const authenticateRefreshToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const refreshToken = req.header("Refresh-Token");

	if (!refreshToken) return res.status(401).send("Refresh token not provided");

	jwt.verify(refreshToken, "your-refresh-secret-key", (err, user) => {
		if (err) return res.status(403).send("Invalid refresh token");
		req.body.user = user;
		next();
	});
};
