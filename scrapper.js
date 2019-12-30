const cheerio = require("cheerio");
const request = require("async-request");
const download = require("image-downloader");
const fs = require("fs");

let chapter = 1;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

fs.mkdir(`./manga/berserk/${chapter}`, { recursive: true }, err =>
  console.error(err)
);

const getPage = async episode => {
  try {
    let pages = [];

    const response = await request(
      `http://www.mangareader.net/berserk/${episode}/`
    );
    const $ = cheerio.load(response.body);

    $("option").each((i, e) => pages.push([i, e.attribs.value]));

      
    for (let page of pages){
      try {
              const response = await request(`http://www.mangareader.net${page[1]}`);
              let $ = cheerio.load(response.body);
              let img = $("img").attr("src");
      
              const options = {
                url: img,
                dest: `./manga/berserk/${chapter}/${page[0]}.jpg`
              };
      
              const dlImage = await download.image(options);
              console.log("Saved to ", dlImage.filename);
            } catch (e) {
              console.log(error);
            }
    }

    // hold{

    //   async page => {
    //     try {
    //       const response = await request(`http://www.mangareader.net${page[1]}`);
    //       let $ = cheerio.load(response.body);
    //       let img = $("img").attr("src");
  
    //       const options = {
    //         url: img,
    //         dest: `./manga/berserk/${chapter}/${page[0]}.jpg`
    //       };
  
    //       const dlImage = await download.image(options);
    //       console.log("Saved to ", dlImage.filename);
    //       sleep(3000);
    //     } catch (e) {
    //       console.log(error);
    //     }
    //   }

    // }
    
  } catch (e) {
    console.log(e);
  }
};

getPage(chapter);
