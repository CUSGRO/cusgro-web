import connectMongoDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import models from "@/app/lib/models/models";

export async function POST(request: Request) {
    try {
        const { name, email } = await request.json();
        if (!name || !email) {
            return NextResponse.json(
                { success: false, message: 'All fields are required' },
                { status: 400 }
            );
        }
        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json(
            { success: false, message: 'Invalid email format' },
            { status: 400 }
        );
        }
        await connectMongoDB();       
        const existing = await models.WaitList.findOne({ email });
        if (existing) {
            return NextResponse.json(
                { success: false, message: 'Email already exists' },
                { status: 400 }
            );
        }

        await models.WaitList.create({ name, email });
        return NextResponse.json(
            { success: true, message: 'Joined waitlist successfully! 🎉' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
    }
}