import connectMongoDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import models from "@/app/lib/models/models";

export async function POST(request: Request) {
    try {
        const { name, email, company, message } = await request.json();
        if (!name || !email || !company) {
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

        await models.Contact.create({ name, email, company, message });
        return NextResponse.json(
            { success: true, message: 'Send Message! 🎉' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}