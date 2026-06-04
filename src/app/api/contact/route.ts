import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Himtatwa Contact <onboarding@resend.dev>',
      to: ['himtatwa@gmail.com'],
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; padding: 40px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-block; width: 48px; height: 48px; background: linear-gradient(135deg, #facc15, #b8860b); border-radius: 50%; line-height: 48px; color: black; font-weight: bold; font-size: 18px;">HT</div>
            <h1 style="color: #f5f5f5; margin: 16px 0 4px; font-size: 22px;">New Contact Message</h1>
            <p style="color: #a3a3a3; font-size: 13px; margin: 0;">Via Himtatwa website</p>
          </div>

          <div style="background: #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #d4a017; font-size: 12px; text-transform: uppercase; font-weight: 600; width: 100px;">Name</td>
                <td style="padding: 10px 0; color: #e5e5e5; font-size: 15px;">${name}</td>
              </tr>
              <tr style="border-top: 1px solid #2a2a2a;">
                <td style="padding: 10px 0; color: #d4a017; font-size: 12px; text-transform: uppercase; font-weight: 600;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #facc15; font-size: 15px;">${email}</a></td>
              </tr>
              <tr style="border-top: 1px solid #2a2a2a;">
                <td style="padding: 10px 0; color: #d4a017; font-size: 12px; text-transform: uppercase; font-weight: 600; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #e5e5e5; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>

          <p style="color: #666; font-size: 12px; text-align: center; margin: 0;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact email error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
