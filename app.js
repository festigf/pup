const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://pf.fondimpresa.it/fpf/index.jsp?parameter=weak');
  //await page.screenshot({path: 'example.png'});

   ////page.click("username"); //Focus on input element
   //page.type("gigi");
   await page.type('username', 'test');

//  await browser.close();
})();



/*
    ie.Document.getElementsByName("userName")(0).Value = userName
    ie.Document.getElementsByName("password")(0).Value = Password
    Set HTMLDoc = ie.Document
    For Each oHTML_Element In HTMLDoc.querySelectorAll("input")
        If oHTML_Element.Value = "LOGIN" Then
            oHTML_Element.Click

*/

/**
 * Set value on a select element
 * @param {string} value
 * @returns {Promise<Undefined>}

ElementHandle.prototype.select = async function( value ) {
  await this._page.evaluateHandle( ( el, value ) => {
      const event = new Event( "change", { bubbles: true });
      event.simulated = true;
      el.querySelector( `option[value="${ value }"]` ).selected = true;
      el.dispatchEvent( event );
  }, this, value );
};
*/