"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import PageWrapper from "@/components/layout/PageWrapper";
import styles from "./RegisterForm.module.css";

const ROLE_OPTIONS = [
  { value: "doctor", label: "Doctor" },
  { value: "nurse", label: "Nurse" },
  { value: "kitchen", label: "Kitchen Staff" },
  { value: "office_clerk", label: "Office Clerk" },
  { value: "admin", label: "Administrator" },
];

const WARD_OPTIONS = [
  { value: "ward_a", label: "Ward A – General" },
  { value: "ward_b", label: "Ward B – Surgical" },
  { value: "ward_c", label: "Ward C – Pediatric" },
  { value: "ward_d", label: "Ward D – Maternity" },
  { value: "icu", label: "ICU" },
  { value: "none", label: "No Ward Assigned" },
];

function generateStaffId() {
  const prefix = "NS";
  const num = Math.floor(100 + Math.random() * 900);
  return `${prefix}${num}`;
}

export default function RegisterStaffPage() {
  const router = useRouter();
  const [staffId] = useState(generateStaffId);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    nicNumber: "",
    role: "",
    designation: "",
    ward: "",
    address: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSelectChange(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, staffId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      setToast({ type: "success", message: "Staff member registered successfully." });
      setTimeout(() => router.push("/users"), 1200);
    } catch (err) {
      setToast({ type: "error", message: err instanceof Error ? err.message : "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }

  function handleCopyId() {
    navigator.clipboard.writeText(staffId);
  }

  return (
    <PageWrapper>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className={styles.page}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <span className={styles.headerDot} />
          </div>
          <div className={styles.headerText}>
            <h1 className={styles.title}>Register New Staff Member</h1>
            <p className={styles.subtitle}>
              Create a secure profile for a new clinical or administrative staff member.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <form className={styles.card} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            {/* Full Name – full width */}
            <div className={styles.fieldFull}>
              <Input
                label="Full Name"
                name="fullName"
                placeholder="Dr. Jane Smith"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* NIC Number */}
            <div className={styles.fieldHalf}>
              <Input
                label="NIC Number"
                name="nicNumber"
                placeholder="199012345678"
                value={form.nicNumber}
                onChange={handleChange}
                required
              />
            </div>

            {/* Role */}
            <div className={styles.fieldHalf}>
              <Select
                label="Role"
                name="role"
                placeholder="Select staff role"
                options={ROLE_OPTIONS}
                value={form.role}
                onChange={(val: string) => handleSelectChange("role", val)}
                required
              />
            </div>

            {/* Designation */}
         {/*   <div className={styles.fieldHalf}>
              <Input
                label="Designation"
                name="designation"
                placeholder="Senior Registrar"
                value={form.designation}
                onChange={handleChange}
                required
              />
            </div>*/}

            {/* Ward / Unit */}
            <div className={styles.fieldHalf}>
              <Select
                label="Ward/Unit"
                name="ward"
                placeholder="Assign a ward"
                options={WARD_OPTIONS}
                value={form.ward}
                onChange={(val: string) => handleSelectChange("ward", val)}
                required
              />
            </div>

            {/* Address – full width */}
            <div className={styles.fieldFull}>
              <label className={styles.label}>Address</label>
              <textarea
                className={styles.textarea}
                name="address"
                placeholder="Residential address"
                rows={3}
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Staff ID – read-only */}
            <div className={styles.fieldHalf}>
              <label className={styles.label}>Staff ID</label>
              <div className={styles.readOnlyField}>
                <span className={styles.monoValue}>{staffId}</span>
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={handleCopyId}
                  title="Copy Staff ID"
                  aria-label="Copy Staff ID"
                >
                  <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.25 0H2.25C1.422 0 0.75 0.672 0.75 1.5V10.5H2.25V1.5H8.25V0ZM9.75 3H4.5C3.672 3 3 3.672 3 4.5V13.5C3 14.328 3.672 15 4.5 15H9.75C10.578 15 11.25 14.328 11.25 13.5V4.5C11.25 3.672 10.578 3 9.75 3ZM9.75 13.5H4.5V4.5H9.75V13.5Z" fill="#6E7978"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Password – read-only */}
            <div className={styles.fieldHalf}>
              <label className={styles.label}>Password</label>
              <div className={styles.readOnlyField}>
                <span className={styles.placeholderValue}>Generated on submit</span>
                <span className={styles.iconBtn} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5.5C6.62 5.5 5.5 6.62 5.5 8C5.5 9.38 6.62 10.5 8 10.5C9.38 10.5 10.5 9.38 10.5 8C10.5 6.62 9.38 5.5 8 5.5ZM8 9.5C7.17 9.5 6.5 8.83 6.5 8C6.5 7.17 7.17 6.5 8 6.5C8.83 6.5 9.5 7.17 9.5 8C9.5 8.83 8.83 9.5 8 9.5Z" fill="#6E7978"/>
                    <path d="M8 2C5.27 2 2.94 3.55 1.85 5.82L0.52 4.49L0 5.21L2.18 7.39L4.36 5.21L3.84 4.49L2.77 5.56C3.73 3.63 5.7 2.5 8 2.5C11.31 2.5 14 5.19 14 8.5H15C15 4.64 11.86 2 8 2Z" fill="#6E7978"/>
                    <path d="M8 14C10.73 14 13.06 12.45 14.15 10.18L15.48 11.51L16 10.79L13.82 8.61L11.64 10.79L12.16 11.51L13.23 10.44C12.27 12.37 10.3 13.5 8 13.5C4.69 13.5 2 10.81 2 7.5H1C1 11.36 4.14 14 8 14Z" fill="#6E7978"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Actions */}
          <div className={styles.actions}>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/users")}
            >
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Register Staff
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon}>
                <path d="M8.5 0.75L14.25 6L8.5 11.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M0.75 6H14.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.securityBadge}>
            <span className={styles.securityIcon}>
              <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 0L0.5 2.6V6C0.5 9.07 2.65 11.94 5.5 12.5C8.35 11.94 10.5 9.07 10.5 6V2.6L5.5 0ZM5.5 11.5C3.22 11.02 1.5 8.66 1.5 6V3.22L5.5 1.08L9.5 3.22V6C9.5 8.66 7.78 11.02 5.5 11.5Z" fill="#13696A"/>
                <path d="M5 6.5H6V8.5H5V6.5ZM5 4.5H6V5.5H5V4.5Z" fill="#13696A"/>
              </svg>
            </span>
            <span className={styles.securityText}>System security protocols enabled</span>
          </div>
          <span className={styles.version}>v2.4.1 Healthcare Enterprise Edition</span>
        </div>
      </div>
    </PageWrapper>
  );
}