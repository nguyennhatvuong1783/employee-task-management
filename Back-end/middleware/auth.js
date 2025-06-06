const jwt = require('jsonwebtoken');
const { db } = require('../config/firebase');
const { doc, getDoc } = require('firebase/firestore');
const { JWT_SECRET } = process.env;

exports.authenticate = async (req, res, next) => {
	try {
		const authHeader = req.header('Authorization');
		if (!authHeader) {
			return res.status(401).json({ message: 'No token, authorization denied' });
		}
		const token = authHeader.replace('Bearer ', '');
		if (!token) {
			return res.status(401).json({ message: 'No token, authorization denied' });
		}
		const decoded = jwt.verify(token, JWT_SECRET);
		const userRef = doc(db, 'users', decoded.id);
		const userSnap = await getDoc(userRef);
		if (!userSnap.exists()) {
			return res.status(404).json({ message: 'User not found' });
		}
		req.user = { ...userSnap.data(), id: userSnap.id };
		req.token = token;
		next();
	} catch (err) {
		console.error('Authentication error:', err);
		res.status(401).json({ message: 'Token is not valid' });
	}
};