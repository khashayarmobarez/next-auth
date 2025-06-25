import User from "@/models/User";
import { hashPasswords } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        await connectDB()
    } catch (error) {
        console.error("Database connection error:", error);
        return res.status(500).json({ message: 'Internal Server Error on connecting to DB' });
    }

    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });

    if(existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPasswords(password);

    const newUser = new User.create({
        email,
        password: hashedPassword,
    });

    console.log("New user created:", newUser);
    return res.status(201).json({ message: 'User created successfully', user: newUser });

}