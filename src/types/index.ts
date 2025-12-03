export type UserRole = 'admin' | 'client' | 'user';

export interface Profile {
    id: string;
    email: string;
    full_name: string | null;
    role: UserRole;
    phone: string | null;
    company: string | null;
    preferences: Record<string, any>;
    created_at: string;
}
