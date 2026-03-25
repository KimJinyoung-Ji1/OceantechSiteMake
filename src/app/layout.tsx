import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '(주)오션테크 — 건강한바다 행복한어민',
    template: '%s | (주)오션테크',
  },
  description:
    '친환경 아연 어장추 전문기업 (주)오션테크. 납 어장추를 대체하는 녹색기술인증 특허 제품으로 해양생태계를 보호합니다.',
  keywords: ['친환경 어장추', '아연 어장추', '오션테크', '녹색기술인증', '수협 단가계약', '어망추'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
