import { NextRequest, NextResponse } from 'next/server';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getResend() {
  const { Resend } = require('resend') as typeof import('resend');
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, type, message } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 });
    }

    // 1. Save to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      await fetch(`${supabaseUrl}/rest/v1/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          name,
          email,
          phone: phone || null,
          inquiry_type: type || null,
          content: message,
        }),
      });
    }

    // 2. Send email notification
    const notifyEmail = process.env.NOTIFY_EMAIL;
    if (process.env.RESEND_API_KEY && notifyEmail) {
      const resend = getResend();
      const inquiryType = escapeHtml(type || '일반 문의');

      const phoneRow = phone
        ? `<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:16px 20px;font-weight:700;color:#475569;background:#f8fafc;">\uc804\ud654\ubc88\ud638</td><td style="padding:16px 20px;">${escapeHtml(phone)}</td></tr>`
        : '';
      const msgHtml = escapeHtml(message).replace(/\n/g, '<br>');

      const htmlContent = [
        '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#f0f4f8;">',
        '<div style="max-width:600px;margin:0 auto;padding:32px;">',
        '<div style="background:#021097;color:#fff;padding:28px 24px;border-radius:16px 16px 0 0;">',
        '<h2 style="margin:0;font-size:22px;">\ud83c\udf0a \uc624\uc158\ud14c\ud06c \ud648\ud398\uc774\uc9c0 \ubb38\uc758</h2>',
        '<p style="margin:8px 0 0;opacity:0.75;font-size:14px;">oceantechinc.com \uc5d0\uc11c \uc0c8\ub85c\uc6b4 \ubb38\uc758\uac00 \uc811\uc218\ub418\uc5c8\uc2b5\ub2c8\ub2e4.</p>',
        '</div>',
        '<div style="background:#ffffff;padding:0;border-radius:0 0 16px 16px;box-shadow:0 4px 24px rgba(0,0,0,0.06);">',
        '<table style="width:100%;border-collapse:collapse;">',
        `<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:16px 20px;font-weight:700;color:#475569;width:110px;background:#f8fafc;">\uc774\ub984</td><td style="padding:16px 20px;">${escapeHtml(name)}</td></tr>`,
        `<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:16px 20px;font-weight:700;color:#475569;background:#f8fafc;">\uc774\uba54\uc77c</td><td style="padding:16px 20px;"><a href="mailto:${encodeURIComponent(email)}" style="color:#0168EF;">${escapeHtml(email)}</a></td></tr>`,
        phoneRow,
        `<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:16px 20px;font-weight:700;color:#475569;background:#f8fafc;">\ubb38\uc758\uc720\ud615</td><td style="padding:16px 20px;">${inquiryType}</td></tr>`,
        `<tr><td style="padding:16px 20px;font-weight:700;color:#475569;background:#f8fafc;vertical-align:top;">\ubb38\uc758\ub0b4\uc6a9</td><td style="padding:16px 20px;line-height:1.7;">${msgHtml}</td></tr>`,
        '</table></div>',
        '<p style="margin-top:24px;font-size:12px;color:#94a3b8;text-align:center;">\uc774 \uba54\uc77c\uc740 \uc624\uc158\ud14c\ud06c \ud648\ud398\uc774\uc9c0 \ubb38\uc758\ud3fc\uc5d0\uc11c \uc790\ub3d9 \ubc1c\uc1a1\ub418\uc5c8\uc2b5\ub2c8\ub2e4.</p>',
        '</div></body></html>',
      ].join('');

      await resend.emails.send({
        from: 'OceanTech <noreply@oceantechinc.com>',
        to: [notifyEmail],
        subject: `[OceanTech] \uc0c8 \ubb38\uc758 - ${inquiryType} (${name})`,
        html: htmlContent,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: '문의 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
