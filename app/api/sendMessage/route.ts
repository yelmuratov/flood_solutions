import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_GROUP_CHAT_ID = process.env.TELEGRAM_GROUP_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_GROUP_CHAT_ID) {
    return NextResponse.json({ error: "Server configuration missing" }, { status: 500 });
  }

  try {
    const { name, phone, message } = await req.json();

    if (!name || !phone || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const text = `📩 *Yangi Xabar!* \n\n👤 *Ism:* ${name} \n📞 *Telefon:* ${phone} \n💬 *Xabar:* ${message}`;

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

    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
