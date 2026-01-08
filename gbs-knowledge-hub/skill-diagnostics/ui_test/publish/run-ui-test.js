const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const base = 'http://127.0.0.1:8000/gbs-knowledge-hub/skill-diagnostics';
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const results = [];

  try {
    await page.goto(base + '/index.html', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'index.png', fullPage: true });
    results.push('Loaded index.html');

    const testLinks = [
      'assessment.html?test=r2r-basics',
      'assessment.html?test=o2c-basics',
      'assessment.html?test=fpa-basics'
    ];

    for (const link of testLinks) {
      const url = base + '/' + link;
      await page.goto(url, { waitUntil: 'networkidle2' });
      const title = await page.title();
      results.push(`Opened ${link} -> title: ${title}`);

      // Wait for questions container
      await page.waitForSelector('#questionsContainer', { timeout: 5000 });

      // Select first option for each question
      const questionRadios = await page.$$('[name^="q"]');
      for (const r of questionRadios) {
        try { await r.click(); } catch (e) {}
      }

      // Update progress (small delay)
      await page.waitForTimeout(300);
      await page.screenshot({ path: link.replace(/[\\/?=&]/g, '_') + '.png', fullPage: true });

      // Submit form
      await page.evaluate(() => {
        const form = document.getElementById('assessmentForm');
        if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
        // fallback: call submit handler by clicking submit button
        const btn = document.querySelector('#assessmentForm button[type="submit"]');
        if (btn) btn.click();
      });

      // Wait for report
      await page.waitForSelector('#reportContent', { timeout: 5000 });
      const reportText = await page.$eval('#reportContent', el => el.innerText || el.textContent);
      results.push(`${link} report length: ${reportText.length}`);
      await page.screenshot({ path: link.replace(/[\\/?=&]/g, '_') + '_report.png', fullPage: true });
    }

    // Save results
    fs.writeFileSync('ui_test_results.txt', results.join('\n'));
    console.log('UI test completed successfully. Results written to ui_test_results.txt');
  } catch (e) {
    console.error('UI test failed:', e);
  } finally {
    await browser.close();
  }
})();
