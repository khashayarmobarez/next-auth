import User from "@/models/User";
import { hashPasswords } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export async function POST(request) {
    try {
        await connectDB();
    } catch (error) {
        console.error("Database connection error:", error);
        return new Response(JSON.stringify({ message: 'Internal Server Error on connecting to DB' }), { status: 500 });
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
        return new Response(JSON.stringify({ message: 'Email and password are required' }), { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 });
    }

    const hashedPassword = await hashPasswords(password);

    const newUser = await User.create({
        email,
        password: hashedPassword,
    });

    console.log("New user created:", newUser);
    return new Response(JSON.stringify({ message: 'User created successfully', user: newUser }), { status: 201 });
}