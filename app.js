const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false,executablePath: 'Chrome'});
  const page = await browser.newPage();
  await page.goto('https://pf.fondimpresa.it/fpf/index.jsp?parameter=weak');

   await page.waitFor('input[name=userName]');
   await page.$eval('input[name=userName]', el => el.value = 'gcherubino');
   await page.waitFor('input[name=password]');
   await page.$eval('input[name=password]', el => el.value = '000075610');

	let selector = 'input';
	await page.$$eval(selector, anchors => {
		anchors.map(anchor => {
			console.log(anchor.value );
			if(anchor.value == 'LOGIN') {
				anchor.click();
				return
			}
		})
	});
  
   
//  await browser.close();
})();