const {Builder, By, Key, until} = require('selenium-webdriver');

async function g1Scrap(){
    let driver = await new Builder().forBrowser('firefox').build();
    try{
        await driver.get("https://g1.globo.com");

        let titles = await driver.findElements(By.css('a.gui-color-primary'));
        for(let e of titles){
            console.log(await e.getText()+" || || || "+ await e.getAttribute('href'))
        }
    }
    finally{
        driver.quit();
    }
}

async function searchGoogle(query){
    let driver = new Builder().forBrowser('firefox').build();
    try {
        // Navigate to Url
        await driver.get('https://www.google.com');

        let input = await driver.findElement(By.name('q'));

        await input.sendKeys(query, Key.ENTER);

        await driver.wait(until.elementLocated(By.id("hdtb-msb")),30000);

        let results = await driver.findElements(By.css('.g .r a'));
        for(let r of results){
            console.log(await r.getText()+" -> "+ await r.getAttribute('href'))
        }
    }
    finally{
        driver.quit();
    }
}
async function main(){
    await g1Scrap();
    console.log("\n\n\n");
    await searchGoogle("QueryString");
}
main();