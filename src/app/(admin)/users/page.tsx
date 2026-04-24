"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Toast from "@/components/ui/Toast";
import styles from "./StaffDirectory.module.css";

interface StaffMember {
  id: string;
  name: string;
  staffId: string;
  nic: string;
  role: "doctor" | "nurse" | "clerk" | "kitchen" | "admin";
  designation: string;
  ward: string;
  avatar?: string;
}

type ApiStaffRole = "ADMIN" | "NURSE" | "DOCTOR" | "OFFICE_CLERK" | "KITCHEN_CLERK";

type ApiStaff = {
  id: number;
  name: string;
  email: string;
  NIC: string;
  role: ApiStaffRole;
  ward: string | null;
  createdAt: string;
};

function mapRoleForTable(role: ApiStaffRole): StaffMember["role"] {
  if (role === "DOCTOR") return "doctor";
  if (role === "NURSE") return "nurse";
  if (role === "KITCHEN_CLERK") return "kitchen";
  if (role === "OFFICE_CLERK") return "clerk";
  return "admin";
}

function getStaffIdFromEmail(email: string, id: number) {
  const local = email.split("@")[0] ?? "";
  const prefix = local.split(".")[0]?.trim();
  if (prefix) return prefix.toUpperCase();
  return `STF-${String(id).padStart(4, "0")}`;
}

function getDesignationFromRole(role: StaffMember["role"]) {
  if (role === "doctor") return "Doctor";
  if (role === "nurse") return "Nurse";
  if (role === "kitchen") return "Kitchen Staff";
  if (role === "clerk") return "Office Clerk";
  return "Administrator";
}

function mapApiStaffToMember(item: ApiStaff): StaffMember {
  const mappedRole = mapRoleForTable(item.role);
  return {
    id: String(item.id),
    name: item.name,
    staffId: getStaffIdFromEmail(item.email, item.id),
    nic: item.NIC,
    role: mappedRole,
    designation: getDesignationFromRole(mappedRole),
    ward: item.ward ?? "Not Assigned",
  };
}

const ROLE_OPTIONS = [
  { value: "", label: "All Roles" },
  { value: "doctor", label: "Doctor" },
  { value: "nurse", label: "Nurse" },
  { value: "clerk", label: "Clerk" },
  { value: "kitchen", label: "Kitchen Staff" },
  { value: "admin", label: "Administrator" },
];

const WARD_OPTIONS = [
  { value: "", label: "All Wards" },
  { value: "cardiology", label: "Cardiology" },
  { value: "emergency", label: "Emergency" },
  { value: "opd", label: "OPD" },
  { value: "surgery", label: "Surgery" },
  { value: "pediatric", label: "Pediatric" },
  { value: "maternity", label: "Maternity" },
  { value: "medicine", label: "Medicine" },
  { value: "icu", label: "ICU" },
  { value: "kitchen", label: "Kitchen" },
  { value: "admin", label: "Admin" },
];

const ROLE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  doctor: { bg: "#A5EFF0", text: "#1A6D6E", label: "Doctor" },
  nurse: { bg: "#EBF8FF", text: "#2B6CB0", label: "Nurse" },
  clerk: { bg: "#FFDAD6", text: "#93000A", label: "Clerk" },
  kitchen: { bg: "#FEF3C7", text: "#92400E", label: "Kitchen" },
  admin: { bg: "#EDE9FE", text: "#5B21B6", label: "Admin" },
};

const ROLE_BADGE_CLASS: Record<string, string> = {
  doctor: styles.roleDoctor,
  nurse: styles.roleNurse,
  clerk: styles.roleClerk,
  kitchen: styles.roleKitchen,
  admin: styles.roleAdmin,
};

const PAGE_SIZE = 3;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function StaffDirectoryPage() {
  const router = useRouter();
  const currentUserRole: ApiStaffRole = "ADMIN";
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [wardFilter, setWardFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<StaffMember | null>(null);
  const [permissionMessage, setPermissionMessage] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadStaff() {
      setLoadingStaff(true);
      setLoadError(null);

      try {
        const response = await fetch("/api/admin/users", { cache: "no-store" });
        const payload = (await response.json()) as { users?: ApiStaff[]; error?: string };

        if (!response.ok) {
          throw new Error(payload.error ?? "Failed to fetch staff members");
        }

        if (!cancelled) {
          const mapped = (payload.users ?? []).map(mapApiStaffToMember);
          setStaff(mapped);
        }
      } catch (error: unknown) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : "Failed to fetch staff members";
          setLoadError(message);
          setStaff([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingStaff(false);
        }
      }
    }

    void loadStaff();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ── Filtering ── */
  const filtered = useMemo(() => staff.filter((s) => {
    const q = search.toLowerCase();
    const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.staffId.toLowerCase().includes(q);
    const matchesRole = !roleFilter || s.role === roleFilter;
    const matchesWard = !wardFilter || s.ward.toLowerCase().replace(/\s/g, "") === wardFilter.toLowerCase();
    return matchesSearch && matchesRole && matchesWard;
  }), [staff, search, roleFilter, wardFilter]);

  /* ── Pagination ── */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const showingFrom = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const showingTo = Math.min(safePage * PAGE_SIZE, filtered.length);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setCurrentPage(1);
  }

  function handleRoleChange(val: string) {
    setRoleFilter(val);
    setCurrentPage(1);
  }

  function handleWardChange(val: string) {
    setWardFilter(val);
    setCurrentPage(1);
  }

  function handleDeleteClick(member: StaffMember) {
    if (currentUserRole !== "ADMIN") {
      setPermissionMessage("You do not have permission to delete staff members.");
      return;
    }

    if (member.role === "admin") {
      setPermissionMessage("Admin accounts cannot be deleted from this screen.");
      return;
    }

    setDeleteTarget(member);
  }

  async function handleDelete() {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      const response = await fetch(`/api/admin/users?id=${deleteTarget.id}`, {
        method: "DELETE",
        headers: {
          "x-user-role": currentUserRole,
        },
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to delete staff member");
      }

      setStaff((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to delete staff member";
      setToast({ type: "error", message });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <PageWrapper>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      {deleteTarget && (
        <ConfirmDialog
          open={!!deleteTarget}
          title="Remove Staff Member"
          message={`Are you sure you want to remove ${deleteTarget.name} (${deleteTarget.staffId})? This action cannot be undone.`}
          confirmLabel={deleting ? "Removing..." : "Remove"}
          variant="danger"
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      {permissionMessage && (
        <ConfirmDialog
          open={!!permissionMessage}
          title="Permission Required"
          message={permissionMessage}
          confirmLabel="OK"
          cancelLabel="Close"
          onConfirm={() => setPermissionMessage(null)}
          onCancel={() => setPermissionMessage(null)}
        />
      )}

      <div className={styles.page}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Staff Directory</h1>
            <p className={styles.subtitle}>{staff.length} total members</p>
          </div>
          <Button onClick={() => router.push("/users/register")}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 1V11M1 6H11" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Add Staff
          </Button>
        </div>

        {/* ── Filters ── */}
        <div className={styles.filterBar}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7.5" cy="7.5" r="6.5" stroke="#BDC9C8" strokeWidth="2" />
              <path d="M12.5 12.5L18 15" stroke="#BDC9C8" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search by name or staff ID..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className={styles.filterControls}>
            <Select
              name="role"
              options={ROLE_OPTIONS}
              value={roleFilter}
              onChange={handleRoleChange}
              compact
            />
            <Select
              name="ward"
              options={WARD_OPTIONS}
              value={wardFilter}
              onChange={handleWardChange}
              compact
            />
            <button type="button" className={styles.filterBtn}>
              <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 0.5H13.5L9.25 5.75V8.75L6.25 9.5V5.75L1 0.5Z" stroke="#006766" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              Filters
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        <div className={styles.tableWrap}>
          <div className={styles.tableScroll}>
            {/* Header row */}
            <div className={styles.tableHead}>
              <span className={`${styles.th} ${styles.colName}`}>Name/ID</span>
              <span className={`${styles.th} ${styles.colNic}`}>NIC</span>
              <span className={`${styles.th} ${styles.colRole}`}>Role</span>
              <span className={`${styles.th} ${styles.colDesig}`}>Designation</span>
              <span className={`${styles.th} ${styles.colWard}`}>Ward</span>
              <span className={`${styles.th} ${styles.colActions}`}>Actions</span>
            </div>

            {/* Body */}
            <div className={styles.tableBody}>
              {loadingStaff && (
                <div className={styles.emptyRow}>
                  <p>Loading staff members...</p>
                </div>
              )}
              {!loadingStaff && loadError && (
                <div className={styles.emptyRow}>
                  <p>{loadError}</p>
                </div>
              )}
              {!loadingStaff && paged.length === 0 && (
                <div className={styles.emptyRow}>
                  <p>{loadError ? "Could not load staff members." : "No staff members match your filters."}</p>
                </div>
              )}
              {!loadingStaff && !loadError && paged.map((member) => {
                const roleStyle = ROLE_STYLES[member.role] ?? ROLE_STYLES.clerk;
                return (
                  <div className={styles.tableRow} key={member.id}>
                    {/* Name / ID */}
                    <div className={`${styles.td} ${styles.colName}`}>
                      <div className={styles.nameCell}>
                        <div className={styles.avatar}>{getInitials(member.name)}</div>
                        <div className={styles.nameText}>
                          <span className={styles.nameValue}>{member.name}</span>
                          <span className={styles.idValue}>ID: {member.staffId}</span>
                        </div>
                      </div>
                    </div>

                    {/* NIC */}
                    <div className={`${styles.td} ${styles.colNic}`}>
                      <span className={styles.cellText}>{member.nic}</span>
                    </div>

                    {/* Role */}
                    <div className={`${styles.td} ${styles.colRole}`}>
                      <span
                        className={`${styles.roleBadge} ${ROLE_BADGE_CLASS[member.role] ?? styles.roleClerk}`}
                      >
                        {roleStyle.label}
                      </span>
                    </div>

                    {/* Designation */}
                    <div className={`${styles.td} ${styles.colDesig}`}>
                      <span className={`${styles.cellText} ${styles.cellTextMedium}`}>{member.designation}</span>
                    </div>

                    {/* Ward */}
                    <div className={`${styles.td} ${styles.colWard}`}>
                      <span className={styles.cellText}>{member.ward}</span>
                    </div>

                    {/* Actions */}
                    <div className={`${styles.td} ${styles.colActions}`}>
                      <button
                        type="button"
                        className={styles.actionBtn}
                        title="View"
                        aria-label={`View ${member.name}`}
                        onClick={() => {/* router.push(`/users/${member.id}`) */}}
                      >
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.5 8.5C1.5 8.5 3.833 3.5 8.5 3.5C13.167 3.5 15.5 8.5 15.5 8.5C15.5 8.5 13.167 13.5 8.5 13.5C3.833 13.5 1.5 8.5 1.5 8.5Z" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="8.5" cy="8.5" r="2" stroke="#94A3B8" strokeWidth="1.4"/>
                        </svg>
                      </button>
                      <button
                        type="button"
                        className={styles.actionBtn}
                        title="Edit"
                        aria-label={`Edit ${member.name}`}
                        onClick={() => {/* router.push(`/users/${member.id}/edit`) */}}
                      >
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.5 1.5L13.5 4.5L4.5 13.5H1.5V10.5L10.5 1.5Z" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8.5 3.5L11.5 6.5" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                      </button>
                      <button
                        type="button"
                        className={styles.actionBtn}
                        title="Delete"
                        aria-label={`Delete ${member.name}`}
                        onClick={() => handleDeleteClick(member)}
                      >
                        <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.5 3.5H11.5" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
                          <path d="M4.5 3.5V1.5C4.5 1.22386 4.72386 1 5 1H8C8.27614 1 8.5 1.22386 8.5 1.5V3.5" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2.5 3.5L3 13H10L10.5 3.5" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5.5 6V10.5" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round"/>
                          <path d="M7.5 6V10.5" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span className={styles.paginationInfo}>
              Showing {showingFrom} to {showingTo} of {filtered.length} members
            </span>
            <div className={styles.paginationBtns}>
              <button
                type="button"
                className={`${styles.pageBtn} ${safePage <= 1 ? styles.pageBtnDisabled : ""}`}
                disabled={safePage <= 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`${styles.pageBtn} ${num === safePage ? styles.pageBtnActive : ""}`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                className={`${styles.pageBtn} ${safePage >= totalPages ? styles.pageBtnDisabled : ""}`}
                disabled={safePage >= totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className={styles.statsRow}>
          {/* Nursing Shift Status */}
          <div className={styles.statCardShift}>
            <span className={styles.statLabel}>Nursing Shift Status</span>
            <div className={styles.statShiftBody}>
              <div>
                <span className={styles.statBig}>Active</span>
                <span className={styles.statSub}>Morning Shift ends in 2h</span>
              </div>
              <div className={styles.shiftDot} />
            </div>
          </div>

          {/* Efficiency Rate */}
          <div className={styles.statCardEfficiency}>
            <div className={styles.statEfficiencyTop}>
              <span className={styles.statLabelLight}>Efficiency Rate</span>
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12L4 4L8 8L12 0L16 6L20 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.statEfficiencyBody}>
              <span className={styles.statBigWhite}>94.2%</span>
              <div className={styles.progressBar}>
                <div className={`${styles.progressFill} ${styles.progressFill942}`} />
              </div>
            </div>
          </div>

          {/* On-Duty Doctors */}
          <div className={styles.statCardDoctors}>
            <div className={styles.doctorsDeco} />
            <div>
              <span className={styles.statLabelLight}>On-Duty Doctors</span>
              <span className={styles.statHuge}>04</span>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}