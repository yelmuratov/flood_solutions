import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_GROUP_CHAT_ID = process.env.TELEGRAM_GROUP_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_GROUP_CHAT_ID) {
    return NextResponse.json({ error: "Server configuration missing" }, { status: 500 });
  }

  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const text = `📞 *Yangi telefon raqami:* ${phone}`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_GROUP_CHAT_ID,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!telegramResponse.ok) {
      return NextResponse.json({ error: "Telegram API error" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Phone number sent successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send phone number" }, { status: 500 });
  }
}
