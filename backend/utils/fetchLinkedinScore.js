const puppeteer = require('puppeteer');

async function fetchLinkedinScore({ email, password, profileUrl }) {
  try {
    const browser = await puppeteer.launch({ headless: true }); // run in headless mode
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/login', { waitUntil: 'networkidle2' });

    await page.type('#username', email);
    await page.type('#password', password);
    await page.click('[type="submit"]');

    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    await page.goto(profileUrl, { waitUntil: 'networkidle2' });
    await page.waitForTimeout(3000);

    // Followers
    let followers = 0;
    try {
      const followersText = await page.$eval("span.text-body-small", el => el.innerText);
      const match = followersText.match(/([\d,]+)\s+followers/i);
      if (match) followers = parseInt(match[1].replace(/,/g, ''));
    } catch {
      console.log("Followers not found");
    }

    // Endorsements (simple approximation based on skill section counts)
    let endorsements = 0;
    try {
      await page.evaluate(() => {
        const showMore = document.querySelector('button[aria-label*="Show all skills"]');
        if (showMore) showMore.click();
      });

      await page.waitForTimeout(2000);

      endorsements = await page.$$eval('.pv-skill-category-entity__endorsement-count', nodes =>
        nodes.reduce((acc, node) => acc + parseInt(node.innerText || '0'), 0)
      );
    } catch {
      console.log("Endorsements not found");
    }

    await browser.close();

    const score = Math.min(100, followers * 0.2 + endorsements * 3);

    return {
      followers,
      endorsements,
      score: Math.round(score)
    };

  } catch (error) {
    console.error("Error in LinkedIn Scraper:", error);
    return {
      followers: 0,
      endorsements: 0,
      score: 50
    };
  }
}

module.exports = fetchLinkedinScore;
