//http://localhost:3000/openfi?username=gcherubino&password=000075610
const puppeteer = require('puppeteer');
const express=require("express");
//var bodyParser= require("body-parser");
var app=express();
//app.use(bodyParser.urlencoded({ extended: true }));

app.get("/openfi",function(req,res)
{
	var username=req.query.username;
	var pwd=req.query.password;
	console.log(username + " - " + pwd);
	openFI(username,pwd)
		.then((status) =>{
			res.status(status);
			res.end("fatto");
		})
})



app.listen(3000);

async function openFI(username,pwd){
		//console.log(username + " - " + pwd);
	
		const browser = await puppeteer.launch({headless: false,executablePath: 'Chrome'});
		const page = await browser.newPage();
		await page.goto('https://pf.fondimpresa.it/fpf/index.jsp?parameter=weak');
	  
		 await page.waitFor('input[name=userName]');
		 await page.$eval('input[name=userName]', (el,_username) => el.value = _username,username);
		 await page.waitFor('input[name=password]');
		 await page.$eval('input[name=password]', (el,_pwd) => el.value = _pwd,pwd);
	  
		  let selector = 'input';
		  await page.$$eval(selector, anchors => {
			  anchors.map(anchor => {
				  console.log(anchor.value );
				  if(anchor.value == 'LOGIN') {
					  anchor.click();
					  return 200
				  }
			  })
		  });
		  page.waitForNavigation({waitUntil: 'load'});		
		 /* //<i>Attenzione, si è verificato un errore</i>
		  await page.waitFor('input[name=userName]');
		  await page.$eval('input[name=userName]', (el,_username) => el.value = _username,username); */
		  console.log("fine")
		  return 201
 }


/*(async () => {
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
  
   

})();*/