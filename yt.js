/*



*/


const puppeteer = require("puppeteer");
const fs = require("fs").promises;
(async () => {
  const channels = JSON.parse(await fs.readFile(`./channels.json`));
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const getContactData = async (url, page) => {
    await page.goto(url + "/about");
    await page.waitForSelector("#links-container");
    const link = 1;
    const links = await page.evaluate(async () => {
      return await new Promise(async (resolve) => {
        let lnks = document.querySelectorAll(
          "#link-list-container > .yt-simple-endpoint"
        );
        let link = "";
        for await (c of lnks) {
          let href = c.getAttribute("href");
          if (!href || href.length == 0 || !href.includes("instagram.com"))
            continue;

          link =
            href && href.length > 0 && href.includes("instagram.com")
              ? href
              : null;
        }
        resolve(link);
      });
    });

    return links.length > 0 ? links : null;
  };
  const getSocialLink = async (url, page) => {
    const response = await page.goto(url);
    await page.waitForNavigation();

    const chain = response.request().redirectChain();

    console.log(chain.length);
    console.log(chain[0].url());

    return chain[0].url();
  };

  const cleanLink = async (link) => {
    let l = link.split("&q=")[1] || link.split("?q=")[1];

    l = l.includes("&") ? link.split("&")[0] : l;

    return decodeURIComponent(l);
  };

  let insta = [];
  for (let index = 1; index < 43; index++) {
    console.log("try to go page: " + index);
    await page.waitFor(1000);
    let url = channels[index];
    const link = await getContactData(url, page);
    if (!link || typeof link == null || typeof link == "undefined") continue;
    //const socialLink = await getSocialLink(link, page);
    const cLink = await cleanLink(link);

    insta = insta.concat(cLink);
  }
  await fs.writeFile(`./instalinks.json`, JSON.stringify(insta, null, 2));
  console.log(`saved ${insta.length + 1} instagram links`);
  await browser.close();
})();
