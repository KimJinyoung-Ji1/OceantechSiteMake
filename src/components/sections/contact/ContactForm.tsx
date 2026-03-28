'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';
interface ContactFormProps {
  locale: Locale;
  onSuccess: () => void;
  compact?: boolean;
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

    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      setError(isEn ? 'Please fill in all required fields.' : '필수 항목을 모두 입력해주세요.');
      setLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setError(isEn ? 'Please enter a valid email address.' : '올바른 이메일 주소를 입력해주세요.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error('fail');
    } catch {
      setError(isEn ? 'Failed to send. Please try again.' : '전송에 실패했습니다. 다시 시도해 주세요.');
      setLoading(false);
      return;
    }

    setLoading(false);

    setValues({ name: '', email: '', phone: '', type: '', message: '' });
    onSuccess();
  };

  const inputClass = 'w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-200 outline-none border bg-[#f8fafc] border-[#e2e8f0] focus:border-[#0168EF] focus:bg-white focus:shadow-[0_0_0_3px_rgba(1,104,239,0.08)]';

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2.5 sm:space-y-4"
      aria-label={isEn ? 'Contact Form' : '문의 폼'}
    >
      {error && (
        <div
          className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium"
          style={{ background: '#FEF2F2', color: '#B91C1C', border: '1px solid #FECACA' }}
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <input
          id="name"
          name="name"
          type="text"
          required
          value={values.name}
          onChange={handleChange}
          placeholder={`${isEn ? 'Name' : '이름'} *`}
          className={inputClass}
        />
        <input
          id="phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          placeholder={isEn ? 'Phone' : '전화번호'}
          className={inputClass}
        />
      </div>

      <input
        id="email"
        name="email"
        type="email"
        required
        value={values.email}
        onChange={handleChange}
        placeholder={`${isEn ? 'Email' : '이메일'} *`}
        className={inputClass}
      />

      <select
        id="type"
        name="type"
        value={values.type}
        onChange={handleChange}
        className={inputClass}
        style={{ color: values.type ? 'var(--text-body)' : '#64748b' }}
        aria-label={isEn ? 'Inquiry type' : '문의 유형 선택'}
      >
        <option value="">{isEn ? 'Inquiry type' : '문의 유형 선택'}</option>
        {inquiryTypes.map((opt) => (
          <option key={opt.valueKo} value={opt.valueKo}>
            {isEn ? opt.valueEn : opt.valueKo}
          </option>
        ))}
      </select>

      <textarea
        id="message"
        name="message"
        required
        rows={4}
        value={values.message}
        onChange={handleChange}
        placeholder={`${isEn ? 'Message' : '문의 내용'} *`}
        className={`${inputClass} resize-none`}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold text-white transition-all duration-200 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(135deg, var(--primary-500) 0%, #0350C0 100%)' }}
      >
        {loading ? t.common.loading : t.contact.submit}
      </button>
    </form>
  );
}
