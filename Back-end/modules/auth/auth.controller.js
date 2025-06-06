const { doc, setDoc } = require('firebase/firestore')
const twilio = require('twilio')
const { db } = require('../../config/firebase.js')

const {
	TWILIO_ACCOUNT_SID,
	TWILIO_AUTH_TOKEN
} = process.env

const client = twilio(
	TWILIO_ACCOUNT_SID,
	TWILIO_AUTH_TOKEN
);

exports.createNewAccessCode = async (req, res) => {
	const { phoneNumber } = req.body;
	if (!phoneNumber) {
		return res.status(400).json({ error: 'phoneNumber is required' });
	}
	const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
	const message = `Mã OTP của bạn là: ${accessCode}. Mã có hiệu lực trong 5 phút.`;
	try {
		// await setDoc(doc(db, 'accessCodes', phoneNumber), { accessCode, createdAt: new Date() });
		await client.messages.create({
			body: message,
			from: process.env.TWILIO_PHONE_NUMBER,
			to: phoneNumber
		});
		res.json({ accessCode });
	} catch (error) {
		console.error('Error saving access code:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
}
