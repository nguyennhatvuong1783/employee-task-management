const { collection, getDocs, doc, getDoc, setDoc, addDoc, deleteDoc } = require('firebase/firestore')
const { db } = require('../../config/firebase.js')

exports.getAllEmployees = async (req, res) => {
	try {
		const querySnapshot = await getDocs(collection(db, "users"))
		const employees = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
		res.json(employees)
	} catch (error) {
		console.error("Error fetching users:", error)
		res.status(500).json({ error: "Internal server error" })
	}
}

exports.getEmployee = async (req, res) => {
	const { employeeId } = req.params;
	if (!employeeId) {
		return res.status(400).json({ error: 'employeeId is required' });
	}
	try {
		const employeeRef = doc(db, 'users', employeeId);
		const employeeSnap = await getDoc(employeeRef);
		if (!employeeSnap.exists()) {
			return res.status(404).json({ error: 'Employee not found' });
		}
		res.json({ id: employeeSnap.id, ...employeeSnap.data() });
	} catch (error) {
		console.error('Error fetching employee:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

exports.createEmployee = async (req, res) => {
	const { name, phone, email, role, address, isActive } = req.body;
	if (!name || !email || !phone) {
		return res.status(400).json({ error: 'name, email, and phone are required' });
	}
	try {
		const docRef = await addDoc(collection(db, 'users'), { name, phone, email, role, address, isActive });
		res.json({ success: true, employeeId: docRef.id });
	} catch (error) {
		console.error('Error creating employee:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

exports.deleteEmployee = async (req, res) => {
	const { employeeId } = req.params;
	if (!employeeId) {
		return res.status(400).json({ error: 'employeeId is required' });
	}
	try {
		const employeeRef = doc(db, 'users', employeeId);
		await deleteDoc(employeeRef);
		res.json({ success: true });
	} catch (error) {
		console.error('Error deleting employee:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

