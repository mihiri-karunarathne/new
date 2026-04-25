'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import styles from './page.module.css';

/* ── Inline SVG Icon Components ────────── */

function IconDashboard() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="11" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="1" y="11" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="11" y="11" width="6" height="6" rx="1.5" fill="currentColor" />
    </svg>
  );
}

function IconStaff() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
      <circle cx="8" cy="5" r="4" fill="currentColor" />
      <path d="M0 15c0-3.314 3.582-6 8-6s8 2.686 8 6" fill="currentColor" />
      <circle cx="17" cy="5.5" r="2.5" fill="currentColor" opacity="0.5" />
      <path
        d="M15 15c0-2.5 1.8-4.5 4-4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

function IconPatients() {
  return (
    <svg width="19" height="16" viewBox="0 0 19 16" fill="none">
      <circle cx="9.5" cy="4.5" r="3.5" fill="currentColor" />
      <path d="M2 15c0-3.866 3.358-7 7.5-7s7.5 3.134 7.5 7" fill="currentColor" />
    </svg>
  );
}

function IconMeals() {
  return (
    <svg width="15" height="20" viewBox="0 0 15 20" fill="none">
      <path d="M1 4h2v12c0 1.1-.9 2-2 2V4zm12 0h-2v14c1.1 0 2-.9 2-2V4z" fill="currentColor" />
      <rect x="4" y="0" width="7" height="16" rx="1" fill="currentColor" />
      <rect x="0" y="16" width="15" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

function IconReports() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="10" width="4" height="7" rx="1" fill="currentColor" />
      <rect x="7" y="5" width="4" height="12" rx="1" fill="currentColor" />
      <rect x="13" y="1" width="4" height="16" rx="1" fill="currentColor" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 13a3 3 0 100-6 3 3 0 000 6zm0-1.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.22 1.17a2 2 0 013.56 0l.37.74a1 1 0 001.13.5l.82-.18a2 2 0 012.52 2.52l-.18.82a1 1 0 00.5 1.13l.74.37a2 2 0 010 3.56l-.74.37a1 1 0 00-.5 1.13l.18.82a2 2 0 01-2.52 2.52l-.82-.18a1 1 0 00-1.13.5l-.37.74a2 2 0 01-3.56 0l-.37-.74a1 1 0 00-1.13-.5l-.82.18a2 2 0 01-2.52-2.52l.18-.82a1 1 0 00-.5-1.13l-.74-.37a2 2 0 010-3.56l.74-.37a1 1 0 00.5-1.13l-.18-.82A2 2 0 015.48 2.23l.82.18a1 1 0 001.13-.5l.37-.74zM10 14.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
      <path
        d="M8 2C4.69 2 2 4.69 2 8v4l-2 2h16l-2-2V8c0-3.31-2.69-6-6-6z"
        fill="currentColor"
      />
      <path d="M6 18a2 2 0 004 0" fill="currentColor" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
      <path
        d="M5.5 0L0 2.5v4c0 3.5 2.35 6.75 5.5 7.5 3.15-.75 5.5-4 5.5-7.5v-4L5.5 0z"
        fill="#13696A"
      />
    </svg>
  );
}

function IconCopy() {
  return (
    <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
      <rect x="4" y="4" width="7" height="10" rx="1.5" stroke="#6E7978" strokeWidth="1.2" fill="none" />
      <path d="M2 12V2.5A1.5 1.5 0 013.5 1H8" stroke="#6E7978" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 3C4.5 3 1.5 8 1.5 8s3 5 6.5 5 6.5-5 6.5-5-3-5-6.5-5z"
        stroke="#6E7978"
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="8" cy="8" r="2" stroke="#6E7978" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
      <path
        d="M1 6h12M8 1l5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPen() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M11.5 1.5l3 3-9 9H2.5v-3l9-9z"
        stroke="#006766"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ── Sidebar Component ─────────────────── */

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logoText}>DigitalEase</div>
        <div className={styles.logoSubtext}>Health System</div>
      </div>

      <nav className={styles.sidebarNav}>
        <Link href="/dashboard" className={styles.navItem}>
          <IconDashboard />
          Dashboard
        </Link>
        <div className={styles.navItemActive}>
          <IconStaff />
          Staff Management
        </div>
        <Link href="/patients" className={styles.navItem}>
          <IconPatients />
          Patients
        </Link>
        <Link href="/meals" className={styles.navItem}>
          <IconMeals />
          Meal Management
        </Link>
        <Link href="/reports" className={styles.navItem}>
          <IconReports />
          Reports
        </Link>
      </nav>

      <div className={styles.sidebarFooter}>
        <Link href="/settings" className={styles.navItem}>
          <IconSettings />
          Settings
        </Link>
      </div>
    </aside>
  );
}

/* ── Main Page Component ───────────────── */

export default function EditStaffPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const userId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [staffIdDisplay, setStaffIdDisplay] = useState('---');
  const [form, setForm] = useState({
    fullName: '',
    nic: '',
    role: '',
    designation: '',
    ward: '',
    address: '',
  });

  useEffect(() => {
    let cancelled = false;

    async function loadStaffById() {
      if (!userId) {
        setLoadError('Missing user id in route.');
        setLoadingStaff(false);
        return;
      }

      setLoadingStaff(true);
      setLoadError(null);

      try {
        const response = await fetch(`/api/admin/users?id=${encodeURIComponent(userId)}`, {
          cache: 'no-store',
        });
        const payload = (await response.json()) as {
          user?: {
            id: number;
            name: string;
            email: string;
            NIC: string;
            role: 'ADMIN' | 'NURSE' | 'DOCTOR' | 'OFFICE_CLERK' | 'KITCHEN_CLERK';
            ward: string | null;
          };
          error?: string;
        };

        if (!response.ok) {
          throw new Error(payload.error ?? 'Failed to fetch staff member');
        }

        if (!payload.user) {
          throw new Error('Staff member not found');
        }

        const roleToForm: Record<'ADMIN' | 'NURSE' | 'DOCTOR' | 'OFFICE_CLERK' | 'KITCHEN_CLERK', string> = {
          ADMIN: 'admin',
          NURSE: 'nurse',
          DOCTOR: 'doctor',
          OFFICE_CLERK: 'office_clerk',
          KITCHEN_CLERK: 'kitchen',
        };

        const roleToDesignation: Record<string, string> = {
          admin: 'Administrator',
          nurse: 'Nurse',
          doctor: 'Doctor',
          office_clerk: 'Office Clerk',
          kitchen: 'Kitchen Staff',
        };

        const localPart = payload.user.email.split('@')[0] ?? '';
        const staffPrefix = localPart.split('.')[0]?.trim();
        const mappedStaffId = staffPrefix
          ? staffPrefix.toUpperCase()
          : `STF-${String(payload.user.id).padStart(4, '0')}`;

        const mappedRole = roleToForm[payload.user.role];

        if (!cancelled) {
          setStaffIdDisplay(mappedStaffId);
          setForm({
            fullName: payload.user.name,
            nic: payload.user.NIC,
            role: mappedRole,
            designation: roleToDesignation[mappedRole] ?? 'Not Available',
            ward: payload.user.ward ?? '',
            address: 'Not Available',
          });
        }
      } catch (error: unknown) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : 'Failed to fetch staff member';
          setLoadError(message);
        }
      } finally {
        if (!cancelled) {
          setLoadingStaff(false);
        }
      }
    }

    void loadStaffById();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name !== 'role') {
        return { ...prev, [name]: value };
      }

      const roleToDesignation: Record<string, string> = {
        admin: 'Administrator',
        nurse: 'Nurse',
        doctor: 'Doctor',
        office_clerk: 'Office Clerk',
        kitchen: 'Kitchen Staff',
      };

      return {
        ...prev,
        role: value,
        designation: roleToDesignation[value] ?? prev.designation,
      };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setSaving(true);

    try {
      const response = await fetch(`/api/admin/users?id=${encodeURIComponent(userId)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: form.fullName,
          nicNumber: form.nic,
          role: form.role,
          ward: form.ward,
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? 'Failed to update staff member');
      }

      router.push(`/users/${userId}`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update staff member';
      setLoadError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className={styles.page}>
      {/* Decorative BG */}
      <div className={styles.decorSquare}>
        <div className={styles.decorSquareInner} />
      </div>

      <Sidebar />

      {/* Top Bar */}
      <header className={styles.topBar}>
        <span className={styles.topBarBrand}>DigitalEase Health</span>

        <div className={styles.topBarRight}>
          <button
            className={styles.notificationBtn}
            type="button"
            title="Open notifications"
            aria-label="Open notifications"
          >
            <IconBell />
          </button>

          <div className={styles.topBarUser}>
            <div className={styles.topBarUserInfo}>
              <span className={styles.topBarUserName}>Admin User</span>
              <span className={styles.topBarUserRole}>Administrator</span>
            </div>
            <div className={styles.topBarAvatar}>AD</div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className={styles.content}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div className={styles.pageHeaderIcon}>
            <IconPen />
          </div>
          <div className={styles.pageHeaderText}>
            <h1 className={styles.pageHeaderTitle}>Edit Staff Member</h1>
            <p className={styles.pageHeaderSubtitle}>
              Update profile information for an existing clinical or administrative
              staff member.
            </p>
            {loadError && <p className={styles.pageHeaderSubtitle}>{loadError}</p>}
          </div>
        </div>

        {/* Form Card */}
        <form className={styles.formCard} onSubmit={handleSave}>
          <div className={styles.formFields}>
            {/* Full Name */}
            <div className={`${styles.fieldGroup} ${styles.fieldFull}`}>
              <label className={styles.formLabel} htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className={styles.formInput}
                value={form.fullName}
                onChange={handleChange}
              />
            </div>

            {/* NIC + Role (half row) */}
            <div className={styles.halfRow}>
              <div className={`${styles.fieldGroup} ${styles.fieldHalf}`}>
                <label className={styles.formLabel} htmlFor="nic">
                  NIC Number
                </label>
                <input
                  id="nic"
                  name="nic"
                  type="text"
                  className={styles.formInput}
                  value={form.nic}
                  onChange={handleChange}
                />
              </div>

              <div className={`${styles.fieldGroup} ${styles.fieldHalf}`}>
                <label className={styles.formLabel} htmlFor="role">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  className={styles.formSelect}
                  value={form.role}
                  onChange={handleChange}
                  disabled={loadingStaff || saving}
                >
                  <option value="">Select staff role</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="kitchen">Kitchen Staff</option>
                  <option value="office_clerk">Office Clerk</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>

            {/* Designation + Ward (half row) */}
            <div className={styles.halfRow}>
              <div className={`${styles.fieldGroup} ${styles.fieldHalf}`}>
                <label className={styles.formLabel} htmlFor="designation">
                  Designation
                </label>
                <input
                  id="designation"
                  name="designation"
                  type="text"
                  className={styles.formInput}
                  value={form.designation}
                  onChange={handleChange}
                  disabled
                />
              </div>

              <div className={`${styles.fieldGroup} ${styles.fieldHalf}`}>
                <label className={styles.formLabel} htmlFor="ward">
                  Ward/Unit
                </label>
                <select
                  id="ward"
                  name="ward"
                  className={styles.formSelect}
                  value={form.ward}
                  onChange={handleChange}
                  disabled={loadingStaff || saving}
                >
                  <option value="">Assign a ward</option>
                  <option value="cardiology-04">Cardiology - Ward 04</option>
                  <option value="neurology-02">Neurology - Ward 02</option>
                  <option value="orthopedics-06">Orthopedics - Ward 06</option>
                  <option value="pediatrics-03">Pediatrics - Ward 03</option>
                  <option value="icu-01">Intensive Care - Ward 01</option>
                  <option value="general-05">General - Ward 05</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div className={`${styles.fieldGroup} ${styles.fieldFull}`}>
              <label className={styles.formLabel} htmlFor="address">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                className={styles.formTextarea}
                rows={3}
                value={form.address}
                onChange={handleChange}
                disabled
              />
            </div>

            {/* Staff ID + Password (readonly) */}
            <div className={styles.readonlyRow}>
              <div className={styles.readonlyField}>
                <span className={styles.readonlyLabel}>Staff ID</span>
                <div className={styles.readonlyInput}>
                  <span className={styles.readonlyInputMono}>{staffIdDisplay}</span>
                  <button type="button" className={styles.readonlyIconBtn} title="Copy ID">
                    <IconCopy />
                  </button>
                </div>
              </div>

              <div className={styles.readonlyField}>
                <span className={styles.readonlyLabel}>Password</span>
                <div className={styles.readonlyInput}>
                  <span className={styles.readonlyInputPlaceholder}>
                    Generated on submit
                  </span>
                  <button type="button" className={styles.readonlyIconBtn} title="Show password">
                    <IconEye />
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className={styles.formDivider} />

            {/* Actions */}
            <div className={styles.formActions}>
              <Link href=".." className={styles.cancelButton}>
                Cancel
              </Link>
              <button type="submit" className={styles.saveButton} disabled={loadingStaff || saving}>
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                <IconArrowRight />
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <footer className={styles.formFooter}>
          <div className={styles.formFooterLeft}>
            <div className={styles.securityBadge}>
              <IconShield />
            </div>
            <span className={styles.securityText}>
              System security protocols enabled
            </span>
          </div>
          <span className={styles.formFooterVersion}>
            v2.4.1 Healthcare Enterprise Edition
          </span>
        </footer>
      </div>
    </main>
  );
}