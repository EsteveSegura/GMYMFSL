const puppeteer = require("puppeteer");
const extractLinks = require('./utils/extractLinks');

const fs = require("fs").promises;
(async () => {
  const channels = JSON.parse(await fs.readFile(`./data/channels.json`));
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const getContactData = async (url, page) => {
    await page.goto(url + "/about");
    await page.waitForSelector("#links-container");
    const link = 1;
    let bodyHTML = await page.evaluate(() => document.body.innerHTML);
    let dataObj = bodyHTML.split('window["ytInitialData"] = ')[1].split('window["ytInitialPlayerResponse"] =')[0]
    return JSON.parse(dataObj.substring(0, dataObj.length - 6));
  };

  let insta = [];
  for (let index = 1; index < 43; index++) {
    console.log("try to go page: " + index);
    await page.waitFor(1000);
    let url = channels[index];
    const objContact = await getContactData(url, page);
    let actualSM = extractLinks.extractLinks(objContact)
    if(actualSM.length != 0){
      insta.push(actualSM)
    }

  }
  await fs.writeFile(`./data/instalinks.json`, JSON.stringify(insta, null, 2));
  console.log(`saved ${insta.length + 1} instagram links`);
  await browser.close();
})();
