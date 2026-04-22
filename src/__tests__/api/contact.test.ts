import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock resend before importing the route
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null }),
    },
  })),
}));

// Mock fetch globally for supabase calls
const mockFetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
vi.stubGlobal('fetch', mockFetch);

function makeRequest(body: unknown): Request {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    delete process.env.RESEND_API_KEY;
    delete process.env.NOTIFY_EMAIL;
  });

  it('returns 400 when name is missing', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(makeRequest({ email: 'test@test.com', message: 'hello' }) as any);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBeDefined();
  });

  it('returns 400 when email is missing', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(makeRequest({ name: 'Test', message: 'hello' }) as any);
    expect(res.status).toBe(400);
  });

  it('returns 400 when message is missing', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(makeRequest({ name: 'Test', email: 'test@test.com' }) as any);
    expect(res.status).toBe(400);
  });

  it('returns 400 when name is empty string', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(makeRequest({ name: '   ', email: 'test@test.com', message: 'hello' }) as any);
    expect(res.status).toBe(400);
  });

  it('returns 400 when email is empty string', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(makeRequest({ name: 'Test', email: '  ', message: 'hello' }) as any);
    expect(res.status).toBe(400);
  });

  it('returns 400 when message is whitespace', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(makeRequest({ name: 'Test', email: 'test@test.com', message: '   ' }) as any);
    expect(res.status).toBe(400);
  });

  it('returns 200 with valid data and no env vars', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(
      makeRequest({ name: 'Test User', email: 'test@test.com', message: 'Hello there' }) as any,
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it('saves to supabase when env vars are set', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key';
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(
      makeRequest({ name: 'Test User', email: 'test@test.com', message: 'Hello there' }) as any,
    );
    expect(res.status).toBe(200);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('inquiries'),
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('sends email when RESEND_API_KEY and NOTIFY_EMAIL are set', async () => {
    process.env.RESEND_API_KEY = 'test-resend-key';
    process.env.NOTIFY_EMAIL = 'admin@test.com';
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(
      makeRequest({ name: 'Test User', email: 'test@test.com', message: 'Hello', phone: '010-1234-5678', type: '제품문의' }) as any,
    );
    expect(res.status).toBe(200);
  });

  it('sends email without phone row when phone is absent', async () => {
    process.env.RESEND_API_KEY = 'test-resend-key';
    process.env.NOTIFY_EMAIL = 'admin@test.com';
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(
      makeRequest({ name: 'Test User', email: 'test@test.com', message: 'Hello' }) as any,
    );
    expect(res.status).toBe(200);
  });

  it('uses anon key when service role key is absent', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(
      makeRequest({ name: 'Test', email: 'a@b.com', message: 'msg' }) as any,
    );
    expect(res.status).toBe(200);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ headers: expect.objectContaining({ apikey: 'test-anon-key' }) }),
    );
  });

  it('returns 500 on unexpected error', async () => {
    const { POST } = await import('@/app/api/contact/route');
    // Pass a request that throws on json()
    const badReq = {
      json: async () => { throw new Error('parse error'); },
    };
    const res = await POST(badReq as any);
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBeDefined();
  });
});
