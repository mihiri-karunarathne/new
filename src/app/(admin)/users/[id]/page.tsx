'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

/* ── Inline SVG Icon Components ────────── */

function IconArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M10 3L5 8l5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
      <rect x="1" y="2" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M1 4l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M3.5 1.5h3l1.5 4-2 1.5c1.2 2.4 3.1 4.3 5.5 5.5l1.5-2 4 1.5v3a1.5 1.5 0 01-1.5 1.5C8.5 16.5 1.5 9.5 1.5 3A1.5 1.5 0 013 1.5h.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg width="22" height="19" viewBox="0 0 22 19" fill="none">
      <path
        d="M2 4.5h18M8 4.5V3a2 2 0 012-2h2a2 2 0 012 2v1.5M5 4.5l.8 12.4a2 2 0 002 1.6h6.4a2 2 0 002-1.6L17 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M9 9v5M13 9v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconWarningTriangle() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path
        d="M18 5L2 31h32L18 5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M18 15v7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="18" cy="26" r="1.2" fill="currentColor" />
    </svg>
  );
}

function IconAlertSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1L1 12h12L7 1z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M7 5v3M7 10v.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Sidebar Component ─────────────────── */

/* ── Delete Modal Component ────────────── */

function DeleteModal({
  staffName,
  staffId,
  onCancel,
  onConfirm,
}: {
  staffName: string;
  staffId: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalIconRing}>
          <span className={styles.modalWarningIcon}>
            <IconWarningTriangle />
          </span>
        </div>

        <h2 className={styles.modalTitle}>
          Are you sure you want to delete this record?
        </h2>

        <div className={styles.modalBody}>
          <p className={styles.modalDescription}>
            You are about to permanently delete{' '}
            <span className={styles.modalStaffHighlight}>
              {staffName}
            </span>{' '}
            ({staffId}) and all associated records from the DigitalEase Health
            System.
          </p>

          <div className={styles.modalWarning}>
            <IconAlertSmall />
            <span className={styles.modalWarningText}>
              This action cannot be undone
            </span>
          </div>
        </div>

        <div className={styles.modalButtons}>
          <button
            className={styles.modalCancelButton}
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className={styles.modalConfirmButton}
            onClick={onConfirm}
            type="button"
          >
            Yes, Delete Staff Member
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page Component ───────────────── */

export default function StaffDetailPage() {
  const params = useParams<{ id: string }>();
  const userId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [staff, setStaff] = useState<{
    id: string;
    name: string;
    initials: string;
    role: string;
    badge: string;
    email: string;
    phone: string;
    staffId: string;
    nic: string;
    designation: string;
    ward: string;
    address: string;
    registeredOn: string;
  } | null>(null);

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
            createdAt: string;
          };
          error?: string;
        };

        if (!response.ok) {
          throw new Error(payload.error ?? 'Failed to fetch staff member');
        }

        if (!payload.user) {
          throw new Error('Staff member not found');
        }

        const roleLabelMap: Record<'ADMIN' | 'NURSE' | 'DOCTOR' | 'OFFICE_CLERK' | 'KITCHEN_CLERK', string> = {
          ADMIN: 'Administrator',
          NURSE: 'Nurse',
          DOCTOR: 'Doctor',
          OFFICE_CLERK: 'Office Clerk',
          KITCHEN_CLERK: 'Kitchen Staff',
        };

        const localPart = payload.user.email.split('@')[0] ?? '';
        const staffPrefix = localPart.split('.')[0]?.trim();
        const mappedStaffId = staffPrefix
          ? staffPrefix.toUpperCase()
          : `STF-${String(payload.user.id).padStart(4, '0')}`;

        const roleLabel = roleLabelMap[payload.user.role];
        const createdAt = new Date(payload.user.createdAt);
        const registeredOn = Number.isNaN(createdAt.getTime())
          ? 'Not Available'
          : createdAt.toLocaleString('en-US', {
              month: 'long',
              day: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

        const mappedStaff = {
          id: String(payload.user.id),
          name: payload.user.name,
          initials: payload.user.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2),
          role: roleLabel,
          badge: roleLabel,
          email: payload.user.email,
          phone: 'Not Available',
          staffId: mappedStaffId,
          nic: payload.user.NIC,
          designation: roleLabel,
          ward: payload.user.ward ?? 'Not Assigned',
          address: 'Not Available',
          registeredOn,
        };

        if (!cancelled) {
          setStaff(mappedStaff);
        }
      } catch (error: unknown) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : 'Failed to fetch staff member';
          setLoadError(message);
          setStaff(null);
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

  const handleDelete = () => {
    // TODO: Call delete API
    setShowDeleteModal(false);
  };

  return (
    <main className={styles.page}>
      <div className={styles.pageActionBar}>
        <div className={styles.topBarLeft}>
          <Link href="/users" className={styles.backButton}>
            <IconArrowLeft />
          </Link>
          <div className={styles.topBarTitleGroup}>
            <span className={styles.topBarTitle}>Staff Details</span>
            <span className={styles.topBarSubtitle}>ID: {staff?.staffId ?? 'Loading...'}</span>
          </div>
        </div>

        <div className={styles.topBarRight}>
          <Link href={`/users/${userId}/edit`} className={styles.editButton}>
            <IconPlus />
            Edit Details
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {loadingStaff && (
          <div className={styles.profileSection}>
            <span className={styles.fieldValue}>Loading staff details...</span>
          </div>
        )}

        {!loadingStaff && loadError && (
          <div className={styles.profileSection}>
            <span className={styles.fieldValue}>{loadError}</span>
          </div>
        )}

        {!loadingStaff && !loadError && staff && <div className={styles.cards}>
          {/* Profile Card */}
          <div className={styles.profileCard}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>
                <span className={styles.avatarInitials}>{staff.initials}</span>
                <span className={styles.onlineIndicator} />
              </div>
            </div>

            <span className={styles.staffName}>{staff.name}</span>
            <span className={styles.staffRole}>{staff.role}</span>
            <span className={styles.roleBadge}>{staff.badge}</span>

            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.iconTeal}>
                  <IconEmail />
                </span>
                <span>{staff.email}</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.iconTeal}>
                  <IconPhone />
                </span>
                <span>{staff.phone}</span>
              </div>
            </div>
          </div>

          {/* Professional Profile */}
          <div className={styles.profileSection}>
            <span className={styles.sectionLabel}>Professional Profile</span>

            <div className={styles.fieldsList}>
              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Staff ID</span>
                <span className={styles.fieldValueMono}>{staff.staffId}</span>
              </div>
              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>NIC Number</span>
                <span className={styles.fieldValueMono}>{staff.nic}</span>
              </div>
              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Designation</span>
                <span className={styles.fieldValue}>{staff.designation}</span>
              </div>
              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Assigned Ward</span>
                <span className={styles.fieldValue}>{staff.ward}</span>
              </div>
            </div>

            <div className={styles.metadataDivider}>
              <span className={styles.sectionLabel}>System Metadata</span>

              <div className={styles.metadataFields}>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>Home Address</span>
                  <span className={styles.fieldValueAddress}>
                    {staff.address.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < staff.address.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </div>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>Registered On</span>
                  <span className={styles.fieldValueSmall}>{staff.registeredOn}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className={styles.dangerZone}>
            <div className={styles.dangerLeft}>
              <div className={styles.dangerIconWrapper}>
                <span className={styles.iconDanger}>
                  <IconTrash />
                </span>
              </div>
              <div className={styles.dangerTextGroup}>
                <span className={styles.dangerTitle}>Danger Zone</span>
                <span className={styles.dangerDescription}>
                  Permanently remove this staff member and all associated records
                  from the DigitalEase Health System.
                </span>
              </div>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => setShowDeleteModal(true)}
              type="button"
            >
              Delete Staff Member
            </button>
          </div>
        </div>}

        <footer className={styles.auditFooter}>
          Authorized Access Only • DigitalEase Healthcare Audit Log Active
        </footer>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && staff && (
        <DeleteModal
          staffName={staff.name}
          staffId={staff.staffId}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </main>
  );
}