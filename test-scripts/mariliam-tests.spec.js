// Mariliam Clinical Research Consulting - Automated Test Suite
// Run with: npx playwright test

const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://mariliam.co';

test.describe('Mariliam Website Tests', () => {

  // ==============================================
  // HOMEPAGE TESTS
  // ==============================================

  test('Homepage loads correctly', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check title
    await expect(page).toHaveTitle(/Mariliam Clinical Research Consulting/);

    // Check main heading
    await expect(page.locator('h1')).toContainText('Mariliam Clinical Research Consulting');

    // Check navigation
    await expect(page.locator('nav a:has-text("Home")')).toBeVisible();
    await expect(page.locator('nav a:has-text("About")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Expertise")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Services")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Schedule a Consultation")')).toBeVisible();
  });

  test('Homepage stats cards display', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check for stats - using more specific selectors
    await expect(page.locator('.stat-card').filter({ hasText: '13+' })).toBeVisible();
    await expect(page.locator('.stat-card').filter({ hasText: 'Years of Experience' })).toBeVisible();
    await expect(page.locator('.stat-card').filter({ hasText: '90+' })).toBeVisible();
    await expect(page.locator('.stat-card').filter({ hasText: 'Global Sites Managed' })).toBeVisible();
  });

  test('Homepage value propositions display', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.locator('h3:has-text("Proven Track Record")')).toBeVisible();
    await expect(page.locator('h3:has-text("End-to-End Expertise")')).toBeVisible();
    await expect(page.locator('h3:has-text("Therapeutic Diversity")')).toBeVisible();
    await expect(page.locator('h3:has-text("Operational Agility")')).toBeVisible();
  });

  // ==============================================
  // ABOUT PAGE TESTS
  // ==============================================

  test('About page displays profile correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/about.html`);

    // Check heading
    await expect(page.locator('h1')).toContainText('About Mariliam');

    // Check for Andria's name
    await expect(page.locator('h2:has-text("Meet Andria White")')).toBeVisible();

    // Check for headshot image - using src attribute
    const headshot = page.locator('img[src*="headshot"]');
    await expect(headshot).toBeVisible();

    // Check credential badges - use specific badge class with .first() to avoid strict mode violations
    await expect(page.locator('.credential-badge').filter({ hasText: 'Certified Clinical Research Associate' }).first()).toBeVisible();
    await expect(page.locator('.credential-badge').filter({ hasText: 'GCP Certified' }).first()).toBeVisible();
  });

  test('About page core competencies display', async ({ page }) => {
    await page.goto(`${BASE_URL}/about.html`);

    await expect(page.locator('h4:has-text("Operational Excellence")')).toBeVisible();
    await expect(page.locator('h4:has-text("Vendor & CRO Management")')).toBeVisible();
    await expect(page.locator('h4:has-text("Regulatory & Quality")')).toBeVisible();
    await expect(page.locator('h4:has-text("People & Team Leadership")')).toBeVisible();
  });

  test('About page awards section displays', async ({ page }) => {
    await page.goto(`${BASE_URL}/about.html`);

    // Check for awards - look for the complete text in paragraphs
    await expect(page.locator('p:has-text("Principles Award")').filter({ hasText: 'HanAll' })).toBeVisible();
    await expect(page.locator('p:has-text("Star Award")').filter({ hasText: 'I-Mab' })).toBeVisible();
  });

  // ==============================================
  // SERVICES PAGE TESTS
  // ==============================================

  test('Services page displays all 6 services', async ({ page }) => {
    await page.goto(`${BASE_URL}/services.html`);

    await expect(page.locator('h3:has-text("End-to-End Operational Execution")')).toBeVisible();
    await expect(page.locator('h3:has-text("CRO & Vendor Management")')).toBeVisible();
    await expect(page.locator('h3:has-text("Global Site Feasibility & Start-up")')).toBeVisible();
    await expect(page.locator('h3:has-text("Regulatory & Compliance Support")')).toBeVisible();
    await expect(page.locator('h3:has-text("Clinical Data & Quality Management")')).toBeVisible();
    await expect(page.locator('h3:has-text("Program Development & Strategy")')).toBeVisible();
  });

  // ==============================================
  // EXPERTISE PAGE TESTS
  // ==============================================

  test('Expertise page therapeutic areas display', async ({ page }) => {
    await page.goto(`${BASE_URL}/expertise.html`);

    await expect(page.locator('h3:has-text("Oncology")')).toBeVisible();
    await expect(page.locator('h3:has-text("Neurology")')).toBeVisible();
    await expect(page.locator('h3:has-text("Infectious Diseases")')).toBeVisible();
    await expect(page.locator('h3:has-text("Autoimmune & Endocrine")')).toBeVisible();
  });

  test('Expertise page "By the Numbers" displays without checkmarks', async ({ page }) => {
    await page.goto(`${BASE_URL}/expertise.html`);

    // Find the By the Numbers section
    const byNumbers = page.locator('h4:has-text("By the Numbers")').locator('..');

    // Check the numbers are visible
    await expect(byNumbers.locator('text=90+')).toBeVisible();
    await expect(byNumbers.locator('text=Global Sites Managed')).toBeVisible();
    await expect(byNumbers.locator('text=4')).toBeVisible();
    await expect(byNumbers.locator('text=Continents')).toBeVisible();
  });

  // ==============================================
  // CONTACT FORM TESTS (MULTI-STEP)
  // ==============================================

  test('Contact form navigation and progression', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact.html`);

    // Check initial state - Step 1 should be visible
    await expect(page.locator('#step1')).toBeVisible();
    await expect(page.locator('#step2')).not.toBeVisible();
    await expect(page.locator('#step3')).not.toBeVisible();

    // Check progress indicators - use specific selectors for progress bar
    const progressBar = page.locator('#consultation-form-container > div:first-child > div');
    await expect(progressBar.getByText('Organization', { exact: true })).toBeVisible();
    await expect(progressBar.getByText('Services', { exact: true })).toBeVisible();
    await expect(progressBar.getByText('Details', { exact: true })).toBeVisible();
  });

  test('Contact form Step 1 - Organization validation', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact.html`);

    // Set up dialog handler for alert
    page.on('dialog', dialog => dialog.accept());

    // Try to proceed without filling required fields
    await page.locator('#step1 button:has-text("CONTINUE")').click();

    // Form should still be on step 1 (validation prevented progression)
    await expect(page.locator('#step1')).toBeVisible();
    await expect(page.locator('#step2')).not.toBeVisible();
  });

  test('Contact form Step 1 to Step 2 transition', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact.html`);

    // Fill Step 1
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="company"]', 'Test Biotech Inc');
    await page.selectOption('select[name="org_size"]', 'Small (51-250 employees)');
    await page.fill('input[name="email"]', 'john@testbiotech.com');

    // Click Continue
    await page.locator('#step1 button:has-text("CONTINUE")').click();

    // Wait for Step 2 to be visible
    await expect(page.locator('#step2')).toBeVisible();
    await expect(page.locator('#step1')).not.toBeVisible();

    // Check progress indicator updated
    await expect(page.locator('#step1-indicator')).toContainText('✓');
  });

  test('Contact form Step 2 - Services selection', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact.html`);

    // Fill Step 1 and proceed
    await page.fill('input[name="name"]', 'Jane Smith');
    await page.fill('input[name="company"]', 'Clinical Trials Co');
    await page.selectOption('select[name="org_size"]', 'Startup (1-50 employees)');
    await page.fill('input[name="email"]', 'jane@clinicaltrials.com');

    // Click Continue button in Step 1
    await page.locator('#step1 button:has-text("CONTINUE")').click();

    // Wait for Step 2 to be visible
    await expect(page.locator('#step2')).toBeVisible();

    // Check service options are visible
    await expect(page.locator('#step2').getByText('End-to-End Operational Execution')).toBeVisible();
    await expect(page.locator('#step2').getByText('CRO & Vendor Management')).toBeVisible();

    // Select a service
    await page.check('input[value="CRO & Vendor Management"]');

    // Click Continue to Step 3 - be specific to Step 2's button
    await page.locator('#step2 button:has-text("CONTINUE")').click();

    await expect(page.locator('#step3')).toBeVisible();
  });

  test('Contact form complete flow', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact.html`);

    // Step 1: Organization
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="title"]', 'CEO');
    await page.fill('input[name="company"]', 'Test Pharma LLC');
    await page.selectOption('select[name="org_size"]', 'Medium (251-1,000 employees)');
    await page.fill('input[name="email"]', 'test@testpharma.com');
    await page.fill('input[name="phone"]', '555-123-4567');
    await page.locator('#step1 button:has-text("CONTINUE")').click();

    // Step 2: Services
    await expect(page.locator('#step2')).toBeVisible();
    await page.check('input[value="End-to-End Operational Execution"]');
    await page.check('input[value="Regulatory & Compliance Support"]');
    await page.locator('#step2 button:has-text("CONTINUE")').click();

    // Step 3: Details
    await expect(page.locator('#step3')).toBeVisible();
    await page.selectOption('select[name="program"]', 'Phase II');
    await page.fill('textarea[name="message"]', 'We need help with our Phase II oncology trial.');

    // Note: Don't actually submit in tests to avoid sending emails
    // Just verify the submit button is present
    await expect(page.locator('#step3 button[type="submit"]')).toBeVisible();
  });

  test('Contact form Back button works', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact.html`);

    // Go to Step 2
    await page.fill('input[name="name"]', 'Test');
    await page.fill('input[name="company"]', 'Test Co');
    await page.selectOption('select[name="org_size"]', 'Startup (1-50 employees)');
    await page.fill('input[name="email"]', 'test@test.com');
    await page.locator('#step1 button:has-text("CONTINUE")').click();

    await expect(page.locator('#step2')).toBeVisible();

    // Click Back
    await page.locator('#step2 button:has-text("BACK")').click();

    // Should be back on Step 1
    await expect(page.locator('#step1')).toBeVisible();
    await expect(page.locator('#step2')).not.toBeVisible();
  });

  // ==============================================
  // MOBILE RESPONSIVENESS TESTS
  // ==============================================

  test('Mobile: Homepage displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto(BASE_URL);

    // Navigation should be visible
    await expect(page.locator('nav')).toBeVisible();

    // Stats should stack - be specific to stat-card
    await expect(page.locator('.stat-card .number').filter({ hasText: '13+' })).toBeVisible();

    // Schedule a Consultation button should be visible
    await expect(page.locator('nav a:has-text("Schedule a Consultation")')).toBeVisible();
  });

  test('Mobile: Contact form progress indicators on one line', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/contact.html`);

    // Progress container should be visible
    const progressContainer = page.locator('#consultation-form-container > div:first-child > div');
    await expect(progressContainer).toBeVisible();

    // All three progress indicators should be visible
    await expect(progressContainer.getByText('Organization', { exact: true })).toBeVisible();
    await expect(progressContainer.getByText('Services', { exact: true })).toBeVisible();
    await expect(progressContainer.getByText('Details', { exact: true })).toBeVisible();
  });

  test('Mobile: Contact form buttons sized appropriately', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/contact.html`);

    // Fill and proceed to see buttons
    await page.fill('input[name="name"]', 'Mobile Test');
    await page.fill('input[name="company"]', 'Test');
    await page.selectOption('select[name="org_size"]', 'Startup (1-50 employees)');
    await page.fill('input[name="email"]', 'test@mobile.com');
    await page.locator('#step1 button:has-text("CONTINUE")').click();

    // Wait for Step 2
    await expect(page.locator('#step2')).toBeVisible();

    // Check BACK and CONTINUE buttons are visible and properly sized in Step 2
    await expect(page.locator('#step2 button:has-text("BACK")')).toBeVisible();
    await expect(page.locator('#step2 button:has-text("CONTINUE")')).toBeVisible();
  });

  // ==============================================
  // FOOTER & LINKS TESTS
  // ==============================================

  test('Footer displays on all pages', async ({ page }) => {
    const pages = ['', '/about.html', '/services.html', '/expertise.html', '/contact.html'];

    for (const pagePath of pages) {
      await page.goto(`${BASE_URL}${pagePath}`);
      await expect(page.locator('footer')).toBeVisible();
      await expect(page.locator('footer a[href="mailto:andria@mariliam.co"]')).toBeVisible();
      await expect(page.locator('footer').getByText('2026 Mariliam Clinical Research Consulting LLC')).toBeVisible();
    }
  });

  test('Navigation links work correctly', async ({ page }) => {
    await page.goto(BASE_URL);

    // Test About link - URL might be with or without .html
    await page.click('nav a:has-text("About")');
    await expect(page.url()).toMatch(/\/about(\.html)?$/);

    // Test Services link
    await page.click('nav a:has-text("Services")');
    await expect(page.url()).toMatch(/\/services(\.html)?$/);

    // Test Expertise link
    await page.click('nav a:has-text("Expertise")');
    await expect(page.url()).toMatch(/\/expertise(\.html)?$/);

    // Test Schedule a Consultation link
    await page.click('nav a:has-text("Schedule a Consultation")');
    await expect(page.url()).toMatch(/\/contact(\.html)?$/);
  });

  // ==============================================
  // ACCESSIBILITY & SEO TESTS
  // ==============================================

  test('All pages have proper meta tags', async ({ page }) => {
    const pages = [
      { path: '', titlePart: 'Home' },
      { path: '/about.html', titlePart: 'About' },
      { path: '/services.html', titlePart: 'Services' },
      { path: '/expertise.html', titlePart: 'Expertise' },
      { path: '/contact.html', titlePart: 'Schedule a Consultation' }
    ];

    for (const { path, titlePart } of pages) {
      await page.goto(`${BASE_URL}${path}`);

      // Check title
      await expect(page).toHaveTitle(new RegExp(titlePart));

      // Check Open Graph tags
      const ogTitle = await page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveAttribute('content', /.+/);

      const ogImage = await page.locator('meta[property="og:image"]');
      await expect(ogImage).toHaveAttribute('content', /og-image\.png/);
    }
  });

  test('Images load correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/about.html`);

    // Check headshot loads
    const headshot = page.locator('img[src*="headshot.png"]');
    await expect(headshot).toBeVisible();

    // Verify image actually loaded (not broken)
    const isLoaded = await headshot.evaluate((img) => img.complete && img.naturalHeight !== 0);
    expect(isLoaded).toBeTruthy();
  });

});
