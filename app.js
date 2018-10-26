//http://localhost:3000/openfi?username=gcherubino&password=000075610
const puppeteer = require('puppeteer');
//var key = require('windows-registry').Key;
//var chromepath = key.getValue('chrome.exe');
var chromepath ="";
const express=require("express");
var bodyParser= require("body-parser");
const util = require('util')
var app=express();
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/SetPath",function(req,res)
{
	chromepath=req.query.chromepath;
	console.log(chromepath);
	res.end(200);
});

app.get("/openfi",function(req,res)
{
	var username=req.query.username;
	var pwd=req.query.password;
	console.log(chromepath);
	console.log(username + " - " + pwd);
	openFI(username,pwd)
		.then((ret) =>{
			console.log(ret) ;
			console.log(util.inspect(ret, false, null, true )) 
			//var jsonRes = JSON.parse(ret);
			res.status(200);
			res.end(ret);
		})
	
})



app.listen(3000);

async function openFI(username,pwd){
		//console.log(username + " - " + pwd);
		
		const browser = await puppeteer.launch({headless: false,executablePath: chromepath+"\\chrome"});
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
		  selector = 'i';

//		  const innerText = await page.evaluate(() => document.querySelector('i').innerText);
//		  console.log(innerText);
		  const textsArray = await  page.evaluate(
			() => [...document.querySelectorAll('i')].map(elem => {
				 if ( elem.innerText.indexOf("errore")!=-1) elem.innerText
				})
		  );
		  console.log(textsArray);

//		  console.log(textsArrayb);
		  //<i>Attenzione, si è verificato un errore</i>
		  if (textsArray.length>0 ){
			const textsArrayb =  await page.evaluate(
				() => [...document.querySelectorAll('b')].map(elem => elem.innerText)
			);
			return '{"Status":201,"msg":"'+textsArrayb[0]+'"}';
		  }
		  else
		  {
				console.log("fine")
				return '{"Status":200,"msg":"Ok"}';
		  }

 }

