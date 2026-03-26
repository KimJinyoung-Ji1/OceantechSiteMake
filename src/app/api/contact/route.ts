import { NextRequest, NextResponse } from 'next/server';

const NOTIFY_EMAIL = 'oceantee@naver.com';

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
    if (process.env.RESEND_API_KEY) {
      const resend = getResend();
      const inquiryType = type || '일반 문의';

      const htmlContent = [
        '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>',
        '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f8fafc;border-radius:16px;">',
        '<div style="background:#021097;color:#fff;padding:24px;border-radius:12px;margin-bottom:24px;">',
        '<h2 style="margin:0;font-size:20px;">OceanTech Homepage Inquiry</h2>',
        '<p style="margin:8px 0 0;opacity:0.8;font-size:14px;">oceantechinc.com new inquiry received</p>',
        '</div>',
        '<table style="width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;">',
        `<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:14px 16px;font-weight:700;color:#475569;width:100px;">Name</td><td style="padding:14px 16px;">${name}</td></tr>`,
        `<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:14px 16px;font-weight:700;color:#475569;">Email</td><td style="padding:14px 16px;"><a href="mailto:${email}">${email}</a></td></tr>`,
        phone ? `<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:14px 16px;font-weight:700;color:#475569;">Phone</td><td style="padding:14px 16px;">${phone}</td></tr>` : '',
        `<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:14px 16px;font-weight:700;color:#475569;">Type</td><td style="padding:14px 16px;">${inquiryType}</td></tr>`,
        `<tr><td style="padding:14px 16px;font-weight:700;color:#475569;vertical-align:top;">Message</td><td style="padding:14px 16px;line-height:1.6;white-space:pre-wrap;">${message}</td></tr>`,
        '</table>',
        '<p style="margin-top:20px;font-size:12px;color:#94a3b8;text-align:center;">Auto-sent from OceanTech website contact form</p>',
        '</div></body></html>',
      ].join('');

      await resend.emails.send({
        from: 'OceanTech Website <noreply@oceantechinc.com>',
        to: [NOTIFY_EMAIL],
        subject: `[OceanTech] New Inquiry - ${inquiryType} (${name})`,
        html: htmlContent,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: '문의 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
