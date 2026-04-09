# Mariliam Website Automated Tests

Comprehensive automated test suite for the Mariliam Clinical Research Consulting website using Playwright.

## 📋 What's Tested

### ✅ Homepage Tests
- Page loads correctly
- Navigation elements display
- Stats cards (13+ years, 90+ sites, etc.)
- 6 value proposition cards
- "Schedule a Consultation" button

### ✅ About Page Tests
- Profile section with Andria's headshot
- Credential badges
- 4 core competency cards
- Career highlights
- Awards section

### ✅ Services Page Tests
- All 6 service cards display correctly
- Service descriptions are visible

### ✅ Expertise Page Tests
- Therapeutic area cards
- "By the Numbers" section (without checkmarks!)
- Global footprint information

### ✅ Contact Form Tests (Multi-Step)
- Form progression (Organization → Services → Details)
- Step 1 validation
- Step 2 service selection
- Step 3 program details
- Back button functionality
- Complete form flow

### ✅ Mobile Responsiveness Tests
- Homepage on mobile devices
- Progress indicators stay on one line
- Form buttons sized appropriately
- Navigation works on small screens

### ✅ Cross-Browser Tests
- Desktop: Chrome, Firefox, Safari
- Mobile: iPhone 13, Pixel 5
- Tablet: iPad Pro

### ✅ SEO & Accessibility
- Meta tags present on all pages
- Open Graph images configured
- Images load correctly

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd test-scripts
npm install
```

This will install Playwright and all required browsers.

### 2. Run All Tests

```bash
npm test
```

### 3. View Results

After tests complete, view the HTML report:

```bash
npm run report
```

## 🎯 Test Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests in headless mode |
| `npm run test:headed` | Run tests with browser visible |
| `npm run test:debug` | Run tests in debug mode (step through) |
| `npm run test:mobile` | Run only mobile tests |
| `npm run test:ui` | Open Playwright UI for interactive testing |
| `npm run report` | View last test report |

## 📱 Device Testing

Tests automatically run on:

- **Desktop Chrome** (1920x1080)
- **Desktop Firefox** (1920x1080)
- **Desktop Safari** (1920x1080)
- **iPhone 13** (390x844)
- **Pixel 5** (393x851)
- **iPad Pro** (1024x1366)

## 🔍 Running Specific Tests

### Run only homepage tests:
```bash
npx playwright test --grep "Homepage"
```

### Run only contact form tests:
```bash
npx playwright test --grep "Contact form"
```

### Run only mobile tests:
```bash
npx playwright test --grep "Mobile"
```

### Run tests on specific browser:
```bash
npx playwright test --project="Desktop Chrome"
npx playwright test --project="Mobile Safari"
```

## 📊 Test Results

Test results are saved in:
- **HTML Report**: `test-results/html/index.html`
- **Screenshots**: `test-results/` (on failure)
- **Videos**: `test-results/` (on failure)
- **Traces**: `test-results/` (for debugging)

## 🐛 Debugging Failed Tests

### Method 1: Headed Mode
See the browser while tests run:
```bash
npm run test:headed
```

### Method 2: Debug Mode
Step through tests line-by-line:
```bash
npm run test:debug
```

### Method 3: UI Mode
Interactive testing interface:
```bash
npm run test:ui
```

### Method 4: View Trace
If a test fails, view the trace:
```bash
npx playwright show-trace test-results/trace.zip
```

## 📝 Test Coverage

### Current Tests: **132 test cases** (22 test scenarios × 6 browsers/devices)

**22 Unique Test Scenarios:**
- ✅ 5 Homepage tests
- ✅ 3 About page tests
- ✅ 1 Services page test
- ✅ 2 Expertise page tests
- ✅ 7 Contact form tests
- ✅ 3 Mobile responsiveness tests
- ✅ 2 Footer & navigation tests
- ✅ 2 SEO & accessibility tests

**Tested Across 6 Browsers/Devices:**
- Desktop Chrome, Firefox, Safari
- Mobile Chrome (Pixel 5), Mobile Safari (iPhone 13)
- iPad Pro

**Total:** 22 tests × 6 devices = **132 comprehensive test runs**

## 🔧 Troubleshooting

### Issue: Tests fail on first run
**Solution**: Run `npx playwright install` to ensure all browsers are installed.

### Issue: Tests timeout
**Solution**: Increase timeout in `playwright.config.js`:
```javascript
timeout: 60 * 1000, // 60 seconds
```

### Issue: Can't connect to https://mariliam.co
**Solution**: Check your internet connection and verify the site is accessible.

### Issue: Tests pass locally but fail in CI
**Solution**: Check the CI environment has the latest browsers installed:
```bash
npx playwright install --with-deps
```

## 📦 Files in This Directory

- **mariliam-tests.spec.js** - Main test suite (all test cases)
- **playwright.config.js** - Playwright configuration
- **package.json** - Dependencies and scripts
- **README.md** - This file

## 🎓 Learning Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Playwright Selectors](https://playwright.dev/docs/selectors)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

## ⚙️ CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: |
          cd test-scripts
          npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run tests
        run: npm test
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: test-scripts/test-results/
```

## 🚨 Important Notes

### Contact Form Submission
The test suite **does NOT actually submit the contact form** to avoid sending test emails to andria@mariliam.co. It validates the form flow and fields but stops before the final submission.

To test actual form submission manually:
1. Open https://mariliam.co/contact.html
2. Fill out the form with real data
3. Click "SUBMIT INTAKE FORM"
4. Verify email arrives at andria@mariliam.co
5. Check redirect to thank-you page

### Web3Forms Access Key
Tests validate the form exists and works, but actual email delivery requires the Web3Forms access key to be properly configured in production.

## 📞 Support

For questions or issues with the test suite, refer to:
- Playwright documentation: https://playwright.dev
- Test suite comments in `mariliam-tests.spec.js`

---

**Happy Testing! 🎉**

Last Updated: March 25, 2026
