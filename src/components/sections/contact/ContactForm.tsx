'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';
import { getSupabaseClient } from '@/lib/supabase';

interface ContactFormProps {
  locale: Locale;
  onSuccess: () => void;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

const inquiryTypes = [
  { valueKo: '제품문의', valueEn: 'Product Inquiry' },
  { valueKo: '견적요청', valueEn: 'Quote Request' },
  { valueKo: '기술상담', valueEn: 'Technical Consultation' },
  { valueKo: '기타', valueEn: 'Other' },
];

export default function ContactForm({ locale, onSuccess }: ContactFormProps) {
  const t = getTranslation(locale);
  const isEn = locale === 'en';

  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const client = getSupabaseClient();
    if (!client) {
      setError('서비스 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
      setLoading(false);
      return;
    }
    const { error: sbError } = await client.from('inquiries').insert({
      name: values.name,
      email: values.email,
      phone: values.phone || null,
      inquiry_type: values.type || null,
      content: values.message,
    });

    setLoading(false);

    if (sbError) {
      setError(isEn ? 'Failed to send. Please try again.' : '전송에 실패했습니다. 다시 시도해 주세요.');
      return;
    }

    setValues({ name: '', email: '', phone: '', type: '', message: '' });
    onSuccess();
  };

  const fieldStyle = {
    base: 'w-full px-4 py-3 rounded-xl border text-base transition-colors outline-none',
    color: 'border-[#D0E4F5] focus:border-[#0168EF]',
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      aria-label={isEn ? 'Contact Form' : '문의 폼'}
      noValidate
    >
      <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
        {isEn ? 'Send an Inquiry' : '문의 보내기'}
      </h3>

      {error && (
        <div
          className="px-4 py-3 rounded-xl text-sm font-medium"
          style={{ background: '#FEF2F2', color: '#B91C1C', border: '1px solid #FECACA' }}
        >
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }} htmlFor="name">
            {isEn ? 'Name' : '이름'} <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={values.name}
            onChange={handleChange}
            placeholder={t.contact.namePlaceholder}
            className={`${fieldStyle.base} ${fieldStyle.color}`}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }} htmlFor="phone">
            {isEn ? 'Phone' : '전화번호'}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            placeholder={t.contact.phonePlaceholder}
            className={`${fieldStyle.base} ${fieldStyle.color}`}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }} htmlFor="email">
          {isEn ? 'Email' : '이메일'} <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={handleChange}
          placeholder={t.contact.emailPlaceholder}
          className={`${fieldStyle.base} ${fieldStyle.color}`}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }} htmlFor="type">
          {isEn ? 'Inquiry Type' : '문의 유형'}
        </label>
        <select
          id="type"
          name="type"
          value={values.type}
          onChange={handleChange}
          className={`${fieldStyle.base} ${fieldStyle.color}`}
          style={{ color: values.type ? 'var(--text-body)' : 'var(--gray-400)' }}
        >
          <option value="">{isEn ? 'Select type' : '유형 선택'}</option>
          {inquiryTypes.map((opt) => (
            <option key={opt.valueKo} value={opt.valueKo}>
              {isEn ? opt.valueEn : opt.valueKo}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }} htmlFor="message">
          {isEn ? 'Message' : '문의 내용'} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={values.message}
          onChange={handleChange}
          placeholder={t.contact.messagePlaceholder}
          className={`${fieldStyle.base} ${fieldStyle.color} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl text-base font-bold text-white transition-all duration-200 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: 'var(--primary-500)' }}
      >
        {loading ? t.common.loading : t.contact.submit}
      </button>
    </form>
  );
}
