const jwt = require('jsonwebtoken')
const { doc, setDoc, getDocs, collection, getDoc } = require('firebase/firestore')
const twilio = require('twilio')
const { db } = require('../../config/firebase.js')

const {
	JWT_SECRET,
	JWT_EXPIRES_IN,
	TWILIO_ACCOUNT_SID,
	TWILIO_AUTH_TOKEN
} = process.env

const client = twilio(
	TWILIO_ACCOUNT_SID,
	TWILIO_AUTH_TOKEN
);

exports.createNewAccessCode = async (req, res) => {
	const { phone } = req.body;
	if (!phone) {
		return res.status(400).json({ error: 'phoneNumber is required' });
	}
	try {
		// Lấy user theo phone giống employee.controller.js
		const usersRef = collection(db, 'users');
		const querySnapshot = await getDocs(usersRef);
		const user = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).find(u => u.phone === phone);
		if (!user) {
			return res.status(400).json({ error: 'Phone number not registered' });
		}
		const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
		const message = `Your access code is: ${accessCode}.`;
		await setDoc(doc(db, 'accessCodes', phone), { accessCode, createdAt: new Date() });
		await client.messages.create({
			body: message,
			from: process.env.TWILIO_PHONE_NUMBER,
			to: phone
		});
		res.json({ accessCode });
	} catch (error) {
		console.error('Error saving access code:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

exports.validateAccessCode = async (req, res) => {
	const { accessCode, phone } = req.body;
	if (!accessCode || !phone) {
		return res.status(400).json({ error: 'accessCode and phoneNumber are required' });
	}
	try {
		const usersRef = collection(db, 'users');
		const querySnapshot = await getDocs(usersRef);
		const user = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).find(u => u.phone === phone);
		if (!user) {
			return res.status(400).json({ error: 'Phone number not registered' });
		}
		const accessCodeRef = doc(db, 'accessCodes', phone);
		const accessCodeSnap = await getDoc(accessCodeRef);
		if (!accessCodeSnap.exists()) {
			return res.status(400).json({ error: 'No access code found for this phone number' });
		}
		const data = accessCodeSnap.data();
		if (data.accessCode === accessCode) {
			await setDoc(accessCodeRef, { accessCode: '', createdAt: data.createdAt });
			const token = jwt.sign({ id: user.id }, JWT_SECRET, {
				expiresIn: JWT_EXPIRES_IN
			});
			return res.json({ success: true, token });
		} else {
			return res.status(400).json({ error: 'Invalid access code' });
		}
	} catch (error) {
		console.error('Error validating access code:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};
