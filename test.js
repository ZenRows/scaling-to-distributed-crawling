// npm install axios cheerio playwright

// docs
// https://nodejs.org/fa/docs/guides/event-loop-timers-and-nexttick/
// https://node.green/

// const axios = require('axios');
// const cheerio = require('cheerio');

const url = 'https://scrapeme.live/shop/page/1/';
// const url = 'http://quotes.toscrape.com/page/1/'

// // /* SNIPPET 1 */

// const axios = require('axios');
// const cheerio = require('cheerio');

// const extractLinks = $ => [
//   ...new Set(
//     $('.page-numbers a') // Select pagination links
//       .map((_, a) => $(a).attr('href')) // Extract the href (url) from each link
//       .toArray() // Convert cheerio object to array
//   ),
// ];

// const extractContent = $ =>
//   $('.product')
//     .map((_, product) => {
//       const $product = $(product);

//       return {
//         id: $product.find('a[data-product_id]').attr('data-product_id'),
//         title: $product.find('h2').text(),
//         price: $product.find('.price').text(),
//       };
//     })
//     .toArray();

// axios.get('https://scrapeme.live/shop/').then(({ data }) => {
//   const $ = cheerio.load(data); // Initialize cheerio
//   const links = extractLinks($);
//   const content = extractContent($);

//   console.log(links);
//   // ['https://scrapeme.live/shop/page/2/', 'https://scrapeme.live/shop/page/3/', ... ]
//   console.log(content);
//   // [{ id: '759', title: 'Bulbasaur', price: '£63.00' }, ...]
// });

// // /* SNIPPET 2 */

// const axios = require('axios');
// const cheerio = require('cheerio');

// const maxVisits = 5;
// const visited = new Set();
// const toVisit = new Set();
// toVisit.add('https://scrapeme.live/shop/page/1/'); // Add initial URL

// const extractLinks = $ => [
//   ...new Set(
//     $('.page-numbers a') // Select pagination links
//       .map((_, a) => $(a).attr('href')) // Extract the href (url) from each link
//       .toArray() // Convert cheerio object to array
//   ),
// ];

// const extractContent = $ =>
//   $('.product')
//     .map((_, product) => {
//       const $product = $(product);

//       return {
//         id: $product.find('a[data-product_id]').attr('data-product_id'),
//         title: $product.find('h2').text(),
//         price: $product.find('.price').text(),
//       };
//     })
//     .toArray();

// const crawl = async url => {
//   console.log('Crawl:', url);
//   visited.add(url);
//   const { data } = await axios.get(url);
//   const $ = cheerio.load(data);
//   const content = extractContent($);
//   const links = extractLinks($);
//   links
//     .filter(link => !visited.has(link) && !toVisit.has(link))
//     .forEach(link => toVisit.add(link));
// };

// (async () => {
//   // loop over a set's values
//   for (const next of toVisit.values()) {
//     if (visited.size >= maxVisits) {
//       break;
//     }

//     toVisit.delete(next);
//     await crawl(next);
//   }

//   console.log(visited);
//   // Set { 'https://scrapeme.live/shop/page/1/', '.../2/', ... }
//   console.log(toVisit);
//   // Set { 'https://scrapeme.live/shop/page/47/', '.../48/', ... }
// })();

/* *************** */

// /* SNIPPET 3 */

// const axios = require('axios');

// // helper functions to get a random item from an array
// const sample = array => array[Math.floor(Math.random() * array.length)];

// const headers = [
//   {
//     Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//     'Accept-Encoding': 'gzip, deflate, br',
//     'Accept-Language': 'en-US,en;q=0.9',
//     'Sec-Ch-Ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
//     'Sec-Ch-Ua-Mobile': '?0',
//     'Sec-Fetch-Dest': 'document',
//     'Sec-Fetch-Mode': 'navigate',
//     'Sec-Fetch-Site': 'none',
//     'Sec-Fetch-User': '?1',
//     'Upgrade-Insecure-Requests': '1',
//     'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
//   },
//   {
//     Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//     'Accept-Encoding': 'gzip, deflate, br',
//     'Accept-Language': 'en-US,en;q=0.5',
//     'Sec-Fetch-Dest': 'document',
//     'Sec-Fetch-Mode': 'navigate',
//     'Sec-Fetch-Site': 'none',
//     'Sec-Fetch-User': '?1',
//     'Upgrade-Insecure-Requests': '1',
//     'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0',
//   },
// ];

// const proxy = {
//   protocol: 'http',
//     host: '202.212.123.44', // free proxy from the list
//     port: 80,
// };

// (async () => {
//   const config = {
//     headers: sample(headers), // select headers randomly
//     proxy,
//   }

//   const { data } = await axios.get('https://httpbin.org/anything', config);
//   console.log(data);
//   // { 'User-Agent': '...Chrome/92...', origin: '202.212.123.44', ... }
// })();

/* *************** */

// /* SNIPPET 4 */

// const playwright = require('playwright');

// (async () => {
//   for (const browserType of ['chromium', 'firefox']) { // 'webkit' is also supported, but there is a problem on Linux
//     const browser = await playwright[browserType].launch();
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto('https://httpbin.org/headers');
//     console.log(await page.locator('pre').textContent());
//     await browser.close();
//   }
// })();

// "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/94.0.4595.0 Safari/537.36",
// "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0",

// /* SNIPPET 4.5 */

// const playwright = require('playwright');

// (async () => {
//   const browser = await playwright.firefox.launch({
//     proxy: { server: 'http://91.216.164.251:80' },
//   });
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   page.setExtraHTTPHeaders({ referrer: 'https://news.ycombinator.com/' });
//   await page.goto('http://httpbin.org/anything');
//   console.log(await page.locator('pre').textContent());
//   await browser.close();
// })();

// /* SNIPPET 5 */

// const playwright = require('playwright');
// const axios = require('axios');
// const cheerio = require('cheerio');

// const getHtmlPlaywright = async url => {
//   const browser = await playwright.firefox.launch();
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   await page.goto(url);
//   const html = await page.content();
//   await browser.close();

//   return html;
// };

// const getHtmlAxios = async url => {
//   const { data } = await axios.get(url);

//   return data;
// };

// (async () => {
//   const html = await getHtmlPlaywright('https://scrapeme.live/shop/page/1/');
//   const $ = cheerio.load(html);
//   const content = extractContent($);
//   console.log('getHtmlPlaywright', content);
// })();

// (async () => {
//   const html = await getHtmlAxios('https://scrapeme.live/shop/page/1/');
//   const $ = cheerio.load(html);
//   const content = extractContent($);
//   console.log('getHtmlAxios', content);
// })();

/* *************** */

// /* SNIPPET 6 */

const queue = (concurrency = 4) => {
  let running = 0;
  const tasks = [];

  return {
    enqueue: async (task, ...params) => {
      tasks.push({ task, params });
      if (running >= concurrency) {
        return;
      }

      ++running;
      while (tasks.length) {
        const { task, params } = tasks.shift();
        await task(...params);
      }
      --running;
    },
  };
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function printer(num) {
  await sleep(1500);
  console.log(num, Date.now());
}

const q = queue();
for (let num = 0; num < 8; num++) {
  q.enqueue(printer, num);
}

/* *************** */

// TODO add all the data to a common array????

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// const getHTML = async url => {
//   //   const { data } = await axios.get(url);

//   //   return data;

//   const fs = require('fs');

//   const page = url.match(/\d+/)[0];
//   const fakeHTML = fs.readFileSync(`./data/${page}.html`);

//   await sleep(1000 + Math.random() * 2000);
//   //   await sleep(2000);

//   return fakeHTML;
// };

// const extractContent = $ =>
//   $('.product')
//     .map((_, product) => {
//       const $product = $(product);

//       return {
//         id: $product.find('a[data-product_id]').attr('data-product_id'),
//         title: $product.find('h2').text(),
//         price: $product.find('.price').text(),
//       };
//     })
//     .toArray();

// const extractLinks = $ => [
//   ...new Set(
//     $('.page-numbers a')
//       .map((_, a) => $(a).attr('href'))
//       .toArray()
//   ),
// ];
// // .filter((_, href) => !!href && href.includes('/shop/page/') && !href.startsWith('/'))

// const maxVisits = 50;
// const visited = new Set();
// // const toVisit = new Set([url]);

// const crawl = async url => {
//   visited.add(url);
//   console.log('Crawl: ', url);
//   const html = await getHTML(url);
//   const $ = cheerio.load(html);
//   const content = extractContent($);
//   const links = extractLinks($);
//   links
//     .filter(link => !visited.has(link)) //  && !toVisit.has(link)
//     .forEach(link => {
//       //   toVisit.add(link);
//       q.enqueue(createCrawlTask(link));
//     });
// };

// const queue = (concurrency = 4) => {
//   let running = 0;
//   const tasks = [];

//   return {
//     enqueue: async task => {
//       tasks.push(task);
//       console.log('**** enqueue', running, tasks.length);
//       if (running >= concurrency) {
//         return;
//       }

//       ++running;
//       while (tasks.length) {
//         await tasks.shift()();
//       }
//       --running;
//     },
//   };
// };

// const createCrawlTask = url => async () => {
//   if (visited.size >= maxVisits) {
//     console.log('****** OVER LIMIT');
//     return;
//   }

//   if (visited.has(url)) {
//     console.log('****** ALREADY VISITED');
//     return;
//   }

//   await crawl(url);
// };

// const q = queue();
// q.enqueue(createCrawlTask(url));

/* *************************** */

// (async () => {

//   //   for (const next of toVisit.values()) {
//   //     if (visited.size >= maxVisits) {
//   //       break;
//   //     }

//   //     toVisit.delete(next);
//   //     await crawl(next);
//   //   }

//   console.log(visited, visited.size);
//   console.log(toVisit, toVisit.size);
// })();

/* ***************************** */

/* ***************************** */

// const sample = array => array[Math.floor(Math.random() * array.length)];

// const headers = [
//   {
//     Accept:
//       'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//     'Accept-Encoding': 'gzip, deflate, br',
//     'Accept-Language': 'en-US,en;q=0.9',
//     'Sec-Ch-Ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
//     'Sec-Ch-Ua-Mobile': '?0',
//     'Sec-Fetch-Dest': 'document',
//     'Sec-Fetch-Mode': 'navigate',
//     'Sec-Fetch-Site': 'none',
//     'Sec-Fetch-User': '?1',
//     'Upgrade-Insecure-Requests': '1',
//     'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
//   },
//   {
//     Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//     'Accept-Encoding': 'gzip, deflate, br',
//     'Accept-Language': 'en-US,en;q=0.5',
//     'Sec-Fetch-Dest': 'document',
//     'Sec-Fetch-Mode': 'navigate',
//     'Sec-Fetch-Site': 'none',
//     'Sec-Fetch-User': '?1',
//     'Upgrade-Insecure-Requests': '1',
//     'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0',
//   },
// ];

// const proxy = {
//   protocol: 'http',
//   //   host: '31.172.177.149',
//   //   port: 83,
//   host: 'megaproxy.rotating.proxyrack.net',
//   port: 222,
//   auth: {
//     username: 'maltzurra-country-ES',
//     password: '0f6d83-8eb4d9-ed63ab-d62add-86dff2',
//   },
// };

// const instance = axios.create({
//   headers: sample(headers),
//   proxy,
// });

// instance
//   .get('https://httpbin.org/anything')
//   .then(({ data }) => console.log(data))
//   .catch(error => console.error(error));

// https://httpbin.org/anything

// console.log('******** AXIOS!!!!!');

// axios
// //   .get(url, { proxy })
//   .get(url)
//   .then(({ data }) => {
//     console.log('******** AXIOS response!!!!!', data);

//     const products = extractProducts(data);

//     console.log(products);
//   })
//   .catch(error => console.error(error));

// const playwright = require('playwright');

// (async () => {
//   for (const browserType of ['chromium', 'firefox']) { // 'webkit'
//     const browser = await playwright[browserType].launch();
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto('http://whatsmyuseragent.org/');
//     await page.screenshot({ path: `example-${browserType}.png` });
//     await browser.close();
//   }
// })();
