import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.WAITLIST_TO_EMAIL || "delivered@resend.dev";

    if (!apiKey) {
      console.warn("WARNING: RESEND_API_KEY is not defined in environment variables. Simulating success in development mode.");
      return NextResponse.json({
        success: true,
        message: "Demo mode: Email validated, but RESEND_API_KEY environment variable is missing."
      });
    }

    // Send email using Resend REST API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "debateX Waitlist <onboarding@resend.dev>",
        to: toEmail,
        subject: "New debateX Waitlist Signup",
        html: `<p>A new user has signed up for the debateX cloud waitlist:</p><p><strong>Email:</strong> ${email}</p>`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API error response:", data);
      return NextResponse.json(
        { error: data.message || "Failed to submit waitlist registration." },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist API handler error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
