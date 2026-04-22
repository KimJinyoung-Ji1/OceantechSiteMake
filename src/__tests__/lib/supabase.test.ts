import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('getSupabaseClient', () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  });

  it('returns null when env vars are missing', async () => {
    const { getSupabaseClient } = await import('@/lib/supabase');
    const client = getSupabaseClient();
    expect(client).toBeNull();
  });

  it('returns null when only URL is set', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    const { getSupabaseClient } = await import('@/lib/supabase');
    const client = getSupabaseClient();
    expect(client).toBeNull();
  });

  it('returns null when only anon key is set', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
    const { getSupabaseClient } = await import('@/lib/supabase');
    const client = getSupabaseClient();
    expect(client).toBeNull();
  });

  it('returns a client when both env vars are set', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
    const { getSupabaseClient } = await import('@/lib/supabase');
    const client = getSupabaseClient();
    expect(client).not.toBeNull();
  });

  it('returns the same cached instance on repeated calls', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
    const { getSupabaseClient } = await import('@/lib/supabase');
    const client1 = getSupabaseClient();
    const client2 = getSupabaseClient();
    expect(client1).toBe(client2);
  });
});
