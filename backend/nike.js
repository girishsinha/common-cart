const { default: puppeteer } = require("puppeteer");

// import puppeteer from 'puppeteer';

const nike = async (url) => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: 'new',

        // `headless: true` (default) enables old Headless;
        // `headless: 'new'` enables new Headless;
        // `headless: false` enables “headful” mode.
    });
    const page = await browser.newPage();
    // const url = 'https://www.nike.com/in/t/air-force-1-07-shoes-kv14Mh/FB8251-100'
    // Navigate the page to a URL
    // await page.goto('https://www.amazon.in/Redmi-Aqua-Blue-64GB-Storage/dp/B0C74LZSQB/ref=sr_1_1?_encoding=UTF8&content-id=amzn1.sym.e26741cf-ae6a-44d3-b2cb-99b3c6e33b2c&pd_rd_r=c0255a5b-9838-448c-9303-f14aabc0f4ee&pd_rd_w=PLIzX&pd_rd_wg=iVNaM&pf_rd_p=e26741cf-ae6a-44d3-b2cb-99b3c6e33b2c&pf_rd_r=DJXQDW6SP8937K85JA7Y&qid=1698329077&refinements=p_36%3A1318505031%2Cp_n_condition-type%3A8609960031&s=electronics&sr=1-1&th=1');


    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Wait for the elements to be rendered
    // await page.waitForSelector('#pdp_product_title', { timeout: 30000 }); // Class for title
    // await page.waitForSelector('.product-price', { timeout: 30000 }); // Class for price
    // await page.waitForSelector('.css-1pd7ls7', { timeout: 30000 }); // Class for image

    // Extract the product title
    const titleElement = await page.$('#pdp_product_title');
    const productTitle = await titleElement.evaluate((el) => el.innerText.trim());
    console.log('Product Title:', productTitle);

    // Extract the product price
    const priceElement = await page.$('.product-price');
    const productPrice = await priceElement.evaluate((el) => el.innerText.trim());
    console.log('Product Price:', productPrice);

    // Extract the image URL


    await browser.close();
    return {
        productName: productTitle,
        price: productPrice,
        img: "null"
    };
}
// myntra();
module.exports = { nike };
