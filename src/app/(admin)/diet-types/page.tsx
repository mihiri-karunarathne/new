'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

/* ══════════════════════════════════════════
   Types
   ══════════════════════════════════════════ */

interface Ingredient {
  id: string;
  serial: string;
  category: string;
  categoryBadge: 'vegetables' | 'proteins' | 'grains' | 'dairy' | 'other';
  name: string;
  specification: string;
  substituteNames: string[];
  substituteCount: number;
}

interface DietMealRow {
  ingredient: string;
  morning: string;
  day: string;
  night: string;
  unit: string;
}

interface DietSchedule {
  id: string;
  name: string;
  code: string;
  category: string;
  categoryBadge: 'adult' | 'pediatric' | 'special';
  summary: string;
  lastUpdated?: string;
  ageTabs: string[];
  meals: Record<string, DietMealRow[]>;
}

/* ══════════════════════════════════════════
   Inline SVG Icons
   ══════════════════════════════════════════ */

function IconSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconChevronDown({ size = 21 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none">
      <path d="M6.3 8.4L10.5 12.6L14.7 8.4" stroke="currentColor" strokeWidth="1.57" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPlus({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconPlusCircle({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconEdit({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <path
        d="M10 1.5l3 3-8.5 8.5H1.5v-3L10 1.5z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function IconTrash({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 15" fill="none">
      <path
        d="M1.5 3.75h11M4.5 3.75V2.25a1 1 0 011-1h3a1 1 0 011 1v1.5m1.5 0v9a1 1 0 01-1 1h-6a1 1 0 01-1-1v-9h7z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M5.5 6.75v4.5M8.5 6.75v4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconChevron({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 8" fill="none">
      <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ══════════════════════════════════════════
   Data
   ══════════════════════════════════════════ */

const ingredients: Ingredient[] = [
  {
    id: 'ing-1',
    serial: '01',
    category: 'Vegetables',
    categoryBadge: 'vegetables',
    name: 'Spinach (Organic)',
    specification: 'Fresh leafy greens, triple-washed...',
    substituteNames: ['Kale', 'Swiss Chard'],
    substituteCount: 2,
  },
  {
    id: 'ing-2',
    serial: '02',
    category: 'Proteins',
    categoryBadge: 'proteins',
    name: 'Chicken Breast',
    specification: 'Skinless, hormone-free, diced...',
    substituteNames: ['Turkey', 'Tofu'],
    substituteCount: 1,
  },
];

const dietSchedules: DietSchedule[] = [
  {
    id: 'ds-990',
    name: 'Adult General',
    code: 'DS-990',
    category: 'Adult',
    categoryBadge: 'adult',
    summary: 'Rice, Fish, Steamed Veg (+5 more)',
    ageTabs: [],
    meals: {},
  },
  {
    id: 'ds-442',
    name: 'Pediatric Diet',
    code: 'DS-442',
    category: 'Pediatric',
    categoryBadge: 'pediatric',
    summary: '',
    lastUpdated: 'Oct 24, 2023 at 09:40 AM',
    ageTabs: ['6-12 Years', '2-6 Years', '1-2 Years', '6-12 Months'],
    meals: {
      '6-12 Years': [
        { ingredient: 'Brown Rice', morning: '50.00', day: '100.00', night: '50.00', unit: 'g' },
        { ingredient: 'Mashed Potatoes', morning: '--', day: '150.00', night: '--', unit: 'g' },
        { ingredient: 'Fortified Milk', morning: '200.00', day: '--', night: '200.00', unit: 'ml' },
      ],
      '2-6 Years': [
        { ingredient: 'Brown Rice', morning: '30.00', day: '60.00', night: '30.00', unit: 'g' },
        { ingredient: 'Mashed Potatoes', morning: '--', day: '80.00', night: '--', unit: 'g' },
        { ingredient: 'Fortified Milk', morning: '150.00', day: '--', night: '150.00', unit: 'ml' },
      ],
      '1-2 Years': [
        { ingredient: 'Baby Rice Cereal', morning: '25.00', day: '40.00', night: '25.00', unit: 'g' },
        { ingredient: 'Mashed Pumpkin', morning: '--', day: '60.00', night: '--', unit: 'g' },
        { ingredient: 'Fortified Milk', morning: '120.00', day: '120.00', night: '120.00', unit: 'ml' },
      ],
      '6-12 Months': [
        { ingredient: 'Rice Cereal', morning: '15.00', day: '25.00', night: '15.00', unit: 'g' },
        { ingredient: 'Pureed Carrots', morning: '--', day: '40.00', night: '--', unit: 'g' },
        { ingredient: 'Formula Milk', morning: '100.00', day: '100.00', night: '100.00', unit: 'ml' },
      ],
    },
  },
  {
    id: 'ds-112',
    name: 'Diabetic Special',
    code: 'DS-112',
    category: 'Special',
    categoryBadge: 'special',
    summary: 'Low GI Grains, Lean Protein (+3 more)',
    ageTabs: [],
    meals: {},
  },
];

/* ══════════════════════════════════════════
   Helper
   ══════════════════════════════════════════ */

function getCategoryBadgeClass(badge: string): string {
  const map: Record<string, string> = {
    vegetables: styles.badgeVegetables,
    proteins: styles.badgeProteins,
    pediatric: styles.badgePediatric,
    special: styles.badgeSpecial,
    adult: styles.badgeAdult,
  };
  return map[badge] || styles.badgeAdult;
}

/* ══════════════════════════════════════════
   Page Component
   ══════════════════════════════════════════ */

export default function DietTypesPage() {
  /* ── State ──────────────────────────── */
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedDietId, setExpandedDietId] = useState<string | null>('ds-442');
  const [activeAgeTab, setActiveAgeTab] = useState('6-12 Years');

  /* ── Filtered Ingredients ──────────── */
  const filteredIngredients = ingredients.filter((ing) => {
    const matchesSearch =
      ing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ing.specification.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' ||
      ing.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  /* ── Toggle Diet Card ──────────────── */
  const toggleDiet = (id: string) => {
    setExpandedDietId((prev) => (prev === id ? null : id));
    if (id !== expandedDietId) {
      const diet = dietSchedules.find((d) => d.id === id);
      if (diet && diet.ageTabs.length > 0) {
        setActiveAgeTab(diet.ageTabs[0]);
      }
    }
  };

  /* ── Render ─────────────────────────── */
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        {/* ── Page Header ──────────────── */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Diet &amp; Ingredient Management</h1>
          <p className={styles.pageSubtitle}>
            Manage ingredient master data and diet schedules used for patient meal planning.
          </p>
        </div>

        {/* ════════════════════════════════
            Section 1: Ingredient Master
            ════════════════════════════════ */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleGroup}>
              <h2 className={styles.sectionTitle}>Ingredient Master</h2>
              <p className={styles.sectionSubtitle}>
                View and manage all ingredients and their substitutes
              </p>
            </div>
            <Link href="/ingredients/register" className={styles.addButton}>
              <IconPlus />
              Add Ingredient
            </Link>
          </div>

          {/* Filters */}
          <div className={styles.filtersRow}>
            <div className={styles.searchWrapper}>
              <span className={styles.searchIcon}>
                <IconSearch />
              </span>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.filterSelectWrapper}>
              <select
                className={styles.filterSelect}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                aria-label="Filter ingredients by category"
                title="Filter ingredients by category"
              >
                <option value="all">All Categories</option>
                <option value="vegetables">Vegetables</option>
                <option value="proteins">Proteins</option>
                <option value="grains">Grains &amp; Cereals</option>
                <option value="dairy">Dairy Products</option>
                <option value="other">Other</option>
              </select>
              <span className={styles.filterChevron}>
                <IconChevronDown size={21} />
              </span>
            </div>
          </div>

          {/* Table */}
          <div className={styles.ingredientTable}>
            {/* Header */}
            <div className={styles.tableHeaderRow}>
              <div className={`${styles.tableHeaderCell} ${styles.colSerial}`}>S.No</div>
              <div className={`${styles.tableHeaderCell} ${styles.colCategory}`}>Category</div>
              <div className={`${styles.tableHeaderCell} ${styles.colName}`}>Ingredient Name</div>
              <div className={`${styles.tableHeaderCell} ${styles.colSpec}`}>Specification</div>
              <div className={`${styles.tableHeaderCell} ${styles.colSubs}`}>Substitutes</div>
              <div className={`${styles.tableHeaderCell} ${styles.colActions}`}>Actions</div>
            </div>

            {/* Rows */}
            {filteredIngredients.length === 0 ? (
              <div className={styles.emptyState}>No ingredients found.</div>
            ) : (
              filteredIngredients.map((ing) => (
                <div key={ing.id} className={styles.tableRow}>
                  <div className={`${styles.tableCell} ${styles.colSerial} ${styles.cellSerial}`}>
                    {ing.serial}
                  </div>
                  <div className={`${styles.tableCell} ${styles.colCategory}`}>
                    <span className={`${styles.categoryBadge} ${getCategoryBadgeClass(ing.categoryBadge)}`}>
                      {ing.category.toUpperCase()}
                    </span>
                  </div>
                  <div className={`${styles.tableCell} ${styles.colName} ${styles.cellName}`}>
                    {ing.name}
                  </div>
                  <div className={`${styles.tableCell} ${styles.colSpec} ${styles.cellSpec}`} title={ing.specification}>
                    {ing.specification}
                  </div>
                  <div className={`${styles.tableCell} ${styles.colSubs}`}>
                    <div className={styles.subsCell}>
                      <span className={styles.subsText}>
                        {ing.substituteNames.join(', ')}
                      </span>
                      {ing.substituteCount > 0 && (
                        <span className={styles.subsMoreBadge}>
                          +{ing.substituteCount} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`${styles.tableCell} ${styles.colActions}`}>
                    <div className={styles.rowActions}>
                      <button type="button" className={styles.actionBtn} title="Edit ingredient">
                        <IconEdit />
                      </button>
                      <button type="button" className={`${styles.actionBtn} ${styles.actionBtnDanger}`} title="Delete ingredient">
                        <IconTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ════════════════════════════════
            Section 2: Diet Schedules
            ════════════════════════════════ */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleGroup}>
              <h2 className={styles.sectionTitle}>Diet Schedules</h2>
              <p className={styles.sectionSubtitle}>
                Manage diet types and their meal compositions
              </p>
            </div>
            <button type="button" className={styles.addButton}>
              <IconPlusCircle size={16} />
              Create Diet Schedule
            </button>
          </div>

          <div className={styles.dietList}>
            {dietSchedules.map((diet) => {
              const isExpanded = expandedDietId === diet.id;
              const hasAgeTabs = diet.ageTabs.length > 0;

              return (
                <div
                  key={diet.id}
                  className={`${styles.dietCard} ${
                    isExpanded ? styles.dietCardExpanded : styles.dietCardCollapsed
                  }`}
                >
                  {/* ── Card Header (always visible) ── */}
                  <div
                    className={isExpanded ? styles.dietExpandedHeader : styles.dietCardHeader}
                    onClick={() => toggleDiet(diet.id)}
                  >
                    <div className={styles.dietCardHeaderRow}>
                      <div className={styles.dietField}>
                        <span className={styles.dietFieldLabel}>Diet Type</span>
                        <span
                          className={`${styles.dietFieldValue} ${
                            isExpanded && diet.categoryBadge === 'pediatric'
                              ? styles.dietFieldValuePediatric
                              : ''
                          }`}
                        >
                          {diet.name}
                        </span>
                      </div>

                      <div className={styles.dietField}>
                        <span className={styles.dietFieldLabel}>No.</span>
                        <span className={`${styles.dietFieldValue} ${styles.dietFieldValueNormal}`}>
                          {diet.code}
                        </span>
                      </div>

                      <div className={styles.dietField}>
                        <span className={styles.dietFieldLabel}>Category</span>
                        <span
                          className={`${styles.categoryBadge} ${getCategoryBadgeClass(diet.categoryBadge)}`}
                        >
                          {diet.category.toUpperCase()}
                        </span>
                      </div>

                      {isExpanded && diet.lastUpdated && (
                        <div className={styles.dietField}>
                          <span className={styles.dietFieldLabel}>Last Updated</span>
                          <span className={`${styles.dietFieldValue} ${styles.dietFieldValueNormal}`}>
                            {diet.lastUpdated}
                          </span>
                        </div>
                      )}

                      {!isExpanded && diet.summary && (
                        <div className={styles.dietField}>
                          <span className={styles.dietFieldLabel}>Meals Summary</span>
                          <span className={styles.dietFieldValueSummary}>{diet.summary}</span>
                        </div>
                      )}
                    </div>

                    {/* Expand/Collapse Arrow */}
                    {isExpanded ? (
                      <button
                        type="button"
                        aria-label="Collapse diet details"
                        aria-expanded="true"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDiet(diet.id);
                        }}
                        className={`${styles.expandArrow} ${styles.expandArrowOpen}`}
                      >
                        <IconChevron />
                      </button>
                    ) : (
                      <button
                        type="button"
                        aria-label="Expand diet details"
                        aria-expanded="false"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDiet(diet.id);
                        }}
                        className={styles.expandArrow}
                      >
                        <IconChevron />
                      </button>
                    )}

                    {/* Hover Actions (collapsed only) */}
                    {!isExpanded && (
                      <div className={styles.dietCardActions}>
                        <button
                          type="button"
                          className={styles.actionBtn}
                          title="Edit diet"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <IconEdit />
                        </button>
                        <button
                          type="button"
                          className={styles.actionBtn}
                          title="View details"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <IconSearch />
                        </button>
                        <button
                          type="button"
                          className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                          title="Delete diet"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <IconTrash />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ── Expanded Body ── */}
                  {isExpanded && hasAgeTabs && (
                    <div className={styles.dietExpandedBody}>
                      {/* Age Tabs */}
                      <div className={styles.ageTabsWrapper}>
                        {diet.ageTabs.map((tab) => (
                          <button
                            key={tab}
                            type="button"
                            className={`${styles.ageTab} ${
                              activeAgeTab === tab ? styles.ageTabActive : ''
                            }`}
                            onClick={() => setActiveAgeTab(tab)}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      {/* Inner Meal Table */}
                      <div className={styles.innerTableWrapper}>
                        {/* Header */}
                        <div className={styles.innerTableHeader}>
                          <div className={styles.innerTableHeaderRow}>
                            <div className={`${styles.innerHeaderCell} ${styles.innerColIngredient}`}>
                              Ingredient
                            </div>
                            <div className={`${styles.innerHeaderCell} ${styles.innerColMeal}`}>
                              Morning
                            </div>
                            <div className={`${styles.innerHeaderCell} ${styles.innerColMeal}`}>
                              Day
                            </div>
                            <div className={`${styles.innerHeaderCell} ${styles.innerColMeal}`}>
                              Night
                            </div>
                            <div className={`${styles.innerHeaderCell} ${styles.innerColUnit}`}>
                              Unit
                            </div>
                          </div>
                        </div>

                        {/* Rows */}
                        {(diet.meals[activeAgeTab] || []).map((row, idx) => (
                          <div key={idx} className={styles.innerTableRow}>
                            <div className={`${styles.innerCell} ${styles.innerColIngredient} ${styles.innerCellName}`}>
                              {row.ingredient}
                            </div>
                            <div className={`${styles.innerCell} ${styles.innerColMeal} ${row.morning === '--' ? styles.innerCellDash : ''}`}>
                              {row.morning}
                            </div>
                            <div className={`${styles.innerCell} ${styles.innerColMeal} ${row.day === '--' ? styles.innerCellDash : ''}`}>
                              {row.day}
                            </div>
                            <div className={`${styles.innerCell} ${styles.innerColMeal} ${row.night === '--' ? styles.innerCellDash : ''}`}>
                              {row.night}
                            </div>
                            <div className={`${styles.innerCell} ${styles.innerColUnit} ${styles.innerCellUnit}`}>
                              {row.unit}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}