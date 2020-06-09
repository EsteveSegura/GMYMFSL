const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const url = "https://www.channelcrawler.com/eng/results/161106/page:";
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //await browser.close();

  const getProfiles = async (url, page) => {
    let maxPage = 50;
    let channels = [];
    for (let index = 1; index < maxPage; index++) {
      console.log("try to go page: " + index);
      const uri = url + index;
      await page.goto(uri);
      await page.waitForSelector("#main-content");
      console.log("success load page: " + index);
      const channelsPerPage = await page.evaluate(async () => {
        return await new Promise(async (resolve) => {
          let chs = document.querySelectorAll("#main-content .channel");
          let list = [];
          for await (c of chs) {
            list.push(c.querySelector("h4 > a").getAttribute("href"));
          }
          resolve(list);
        });
      });
      console.log("get data page: " + index);
      channels = channels.concat(channelsPerPage);
      console.log("save data page: " + index);
      console.log("///////////////////");
    }
    return channels;
  };

  const list = await getProfiles(url, page);

  await fs.writeFile(`./channels.json`, JSON.stringify(list, null, 2));
  console.log(`saved ${list.length} channels`);
  await browser.close();
})();
