'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

/* ══════════════════════════════════════════
   Types
   ══════════════════════════════════════════ */

interface Substitute {
  id: string;
  name: string;
  priority: number;
}

type CategoryRule = {
  value: string;
  label: string;
  startSerial: number;
};

const CATEGORY_RULES: CategoryRule[] = [
  { value: '01-fresh-vegetables', label: '01 Fresh Vegetables', startSerial: 1001 },
  { value: '02-fresh-fruits', label: '02 Fresh Fruits', startSerial: 2001 },
  { value: '03-meat-eggs', label: '03 Meat and Eggs', startSerial: 3001 },
  { value: '04-dry-foods', label: '04 Dry Foods', startSerial: 4001 },
  { value: '05-bakery-products', label: '05 Bakery Products', startSerial: 5001 },
  { value: '60-packed-foods-tins-bottles', label: '60 Packed Foods, Tins & Bottles', startSerial: 6001 },
];

function getStartSerialForCategory(categoryValue: string): string {
  const matched = CATEGORY_RULES.find((item) => item.value === categoryValue);
  return String(matched?.startSerial ?? 1001);
}

/* ══════════════════════════════════════════
   Inline SVG Icons
   ══════════════════════════════════════════ */

function IconChevronDown() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7.2 9.6L12 14.4L16.8 9.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPlus({ size = 11.67 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M6 1v10M1 6h10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
    >
      <path
        d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.334h2.666a1.333 1.333 0 011.334 1.334V4m2 0v10.667a1.333 1.333 0 01-1.334 1.333H3.333A1.333 1.333 0 012 14.667V4h12z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M6.667 7.333v5.334M9.333 7.333v5.334"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconLock() {
  return (
    <svg
      width="10"
      height="13"
      viewBox="0 0 10 13"
      fill="none"
    >
      <path
        d="M1.667 5.5V3.833a3.333 3.333 0 016.666 0V5.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <rect
        x="0.5"
        y="5.5"
        width="9"
        height="6.5"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="5" cy="8.75" r="0.8" fill="currentColor" />
    </svg>
  );
}

function IconDatabase() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
    >
      <ellipse
        cx="5.5"
        cy="2"
        rx="4.5"
        ry="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M1 2v7c0 .83 2.015 1.5 4.5 1.5S10 9.83 10 9V2"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M1 5.5c0 .83 2.015 1.5 4.5 1.5S10 6.33 10 5.5"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg
      width="11"
      height="13"
      viewBox="0 0 11 13"
      fill="none"
    >
      <path
        d="M1.5 6.5a4.25 4.25 0 017.77-2.4M9.5 6.5a4.25 4.25 0 01-7.77 2.4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M9.27 2.6V5h-2.4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M1.73 10.4V8h2.4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ══════════════════════════════════════════
   Page Component
   ══════════════════════════════════════════ */

export default function RegisterIngredientPage() {
  /* ── State ──────────────────────────── */
  const [serial, setSerial] = useState('1001');
  const [category, setCategory] = useState('01-fresh-vegetables');
  const [name, setName] = useState('');
  const [specification, setSpecification] = useState('');
  const [substitutes, setSubstitutes] = useState<Substitute[]>([
    { id: 'init-1', name: 'Dextrose Hydrate', priority: 1 },
  ]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  /* ── Substitute Handlers ────────────── */
  const addSubstitute = () => {
    const newId = `sub-${Date.now()}`;
    setSubstitutes((prev) => [
      ...prev,
      { id: newId, name: '', priority: 0 },
    ]);
  };

  const removeSubstitute = (id: string) => {
    setSubstitutes((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSubstituteName = (id: string, value: string) => {
    setSubstitutes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name: value } : s))
    );
  };

  const updateSubstitutePriority = (id: string, value: string) => {
    const num = parseInt(value, 10);
    setSubstitutes((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, priority: isNaN(num) ? 0 : num } : s
      )
    );
  };

  /* ── Submit ─────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitMessage(null);

    const payload = {
      serial,
      category,
      name: name.trim(),
      specification: specification.trim(),
      substitutes: substitutes.filter((s) => s.name.trim() !== ''),
      notes: notes.trim(),
    };

    try {
      const response = await fetch('/api/admin/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error ?? 'Failed to register ingredient');
      }

      setSubmitMessage('Ingredient registered successfully.');
      setName('');
      setSpecification('');
      setSubstitutes([{ id: `sub-${Date.now()}`, name: '', priority: 0 }]);
      setNotes('');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to register ingredient';
      setSubmitMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Render ─────────────────────────── */
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        {/* ── Page Header ───────────────── */}
        <div className={styles.pageHeader}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>Register Ingredient</h1>
            <p className={styles.pageSubtitle}>
              Add a new medical-grade ingredient to the clinical inventory.
            </p>
            {submitMessage && <p className={styles.pageSubtitle}>{submitMessage}</p>}
          </div>
          <div className={styles.lastUpdated}>
            <span className={styles.lastUpdatedDot} />
            <span className={styles.lastUpdatedText}>
              Last Updated: Today
            </span>
          </div>
        </div>

        {/* ── Form Card ─────────────────── */}
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <div className={styles.formFields}>
            {/* Serial Number (readonly) */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="serial">
                Serial Number
              </label>
              <input
                id="serial"
                type="text"
                className={styles.readonlyInput}
                value={serial}
                readOnly
                tabIndex={-1}
              />
            </div>

            {/* Category Type */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="category">
                Category Type
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="category"
                  className={styles.formSelect}
                  value={category}
                  onChange={(e) => {
                    const selectedCategory = e.target.value;
                    setCategory(selectedCategory);
                    setSerial(getStartSerialForCategory(selectedCategory));
                  }}
                >
                  {CATEGORY_RULES.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <span className={styles.selectChevron}>
                  <IconChevronDown />
                </span>
              </div>
            </div>

            {/* Ingredient Name */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="name">
                Ingredient Name
              </label>
              <input
                id="name"
                type="text"
                className={styles.formInput}
                placeholder="e.g. Purified Glucose Powder"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Specification */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="specification">
                Specification
              </label>
              <textarea
                id="specification"
                className={styles.formTextarea}
                rows={3}
                placeholder="Enter technical specifications, nutritional profile, or chemical properties..."
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
              />
            </div>

            {/* ── Substitutes ──────────── */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Substitutes</label>

              <div className={styles.substitutesSection}>
                {/* Table Header */}
                <div className={styles.substitutesHeader}>
                  <div className={styles.substitutesHeaderName}>
                    <span className={styles.substitutesHeaderLabel}>
                      Substitute Name
                    </span>
                  </div>
                  <div className={styles.substitutesHeaderPriority}>
                    <span className={styles.substitutesHeaderLabel}>
                      Priority
                    </span>
                  </div>
                  <div className={styles.substitutesHeaderAction}>
                    <span className={styles.substitutesHeaderLabel}>
                      Action
                    </span>
                  </div>
                </div>

                {/* Table Body */}
                <div className={styles.substitutesBody}>
                  {substitutes.map((sub, index) => (
                    <div key={sub.id} className={styles.substituteRow}>
                      <input
                        type="text"
                        className={styles.substituteNameCell}
                        value={sub.name}
                        onChange={(e) =>
                          updateSubstituteName(sub.id, e.target.value)
                        }
                        placeholder="Substitute name..."
                        title="Substitute name"
                        aria-label={`Substitute name ${index + 1}`}
                      />
                      <input
                        type="number"
                        className={styles.substitutePriorityCell}
                        value={sub.priority}
                        onChange={(e) =>
                          updateSubstitutePriority(sub.id, e.target.value)
                        }
                        min={0}
                        max={99}
                        title="Substitute priority"
                        aria-label={`Substitute priority ${index + 1}`}
                      />
                      <div className={styles.substituteActionCell}>
                        <button
                          type="button"
                          className={styles.deleteSubBtn}
                          onClick={() => removeSubstitute(sub.id)}
                          title="Remove substitute"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Ghost Row — always visible as add hint */}
                  <div className={styles.ghostRow}>
                    <div
                      className={styles.ghostNameCell}
                      onClick={addSubstitute}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          addSubstitute();
                        }
                      }}
                    >
                      Add name...
                    </div>
                    <div className={styles.ghostPriorityCell}>0</div>
                    <div className={styles.ghostActionCell}>
                      <button
                        type="button"
                        className={styles.addGhostBtn}
                        onClick={addSubstitute}
                        title="Add substitute"
                      >
                        <IconPlus size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Add Substitute Button */}
                <button
                  type="button"
                  className={styles.addSubstituteButton}
                  onClick={addSubstitute}
                >
                  <span className={styles.addSubIcon}>
                    <IconPlus />
                  </span>
                  Add Substitute
                </button>
              </div>
            </div>

            {/* Notes */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="notes">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                className={styles.formTextarea}
                rows={2}
                placeholder="Internal clinical notes or handling warnings..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* ── Actions ────────────────── */}
            <div className={styles.formActions}>
              <Link href=".." className={styles.cancelBtn}>
                Cancel
              </Link>
              <button type="submit" className={styles.saveBtn}>
                <span className={styles.saveBtnShadow} />
                {isSubmitting ? 'Saving...' : 'Save Ingredient'}
              </button>
            </div>
          </div>
        </form>

        {/* ── Footer Badges ─────────────── */}
        <div className={styles.footerBadges}>
          <div className={styles.footerBadge}>
            <span className={styles.footerBadgeIcon}>
              <IconLock />
            </span>
            <span className={styles.footerBadgeText}>Encrypted Form</span>
          </div>
          <div className={styles.footerBadge}>
            <span className={styles.footerBadgeIcon}>
              <IconDatabase />
            </span>
            <span className={styles.footerBadgeText}>Central Lab DB</span>
          </div>
          <div className={styles.footerBadge}>
            <span className={styles.footerBadgeIcon}>
              <IconRefresh />
            </span>
            <span className={styles.footerBadgeText}>Auto-Save Active</span>
          </div>
        </div>
      </div>
    </main>
  );
}