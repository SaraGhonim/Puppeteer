const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

(async () => {
    console.log('heeereee')
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: './'
    })
    const page = await browser.newPage();
    const recorder = new PuppeteerScreenRecorder(page);

    await page.goto('https://app.storkyapp.com/login');
    await recorder.start('./report/video/simple.mp4'); // supports extension - mp4, avi, webm and mov

    await page.waitForSelector('input[name=email]');
    const emailField = await page.$eval('input[name=email]', el => el.value = 'abdulrahman91kh@gmail.com');

    await page.waitForSelector('input[name=email]');
    const passwordField = await page.$eval('input[name=password]', el => el.value = '123456');

    console.log(emailField, passwordField)
    await page.click('input[type="submit"]').then(async () => {

        console.log('sara')
        setTimeout(async () => {
            await page.goto('https://app.storkyapp.com/cms/view-course/34')

            setTimeout(async () => {
                const divCount = await page.$$eval('div', divs => divs);
                const val = await page.$$eval('div[class="SessionList_SessionItem__1-zNw sessionItem"]', elements => {
                    console.log(elements)
                    return elements
                })
                const options = await page.$$eval('div > h2', options => {
                    return options.map((option, i) => option.setAttribute("id", `${i}docssssssssss`));
                });
                console.log(divCount, val, options, "second")

                await page.click('h2[id="48docssssssssss"]').then(async () => {
                    setTimeout(async () => {

                        const btnCount = await page.$$eval('button', buttons => {
                            return buttons.map((button, i) => button.setAttribute("id", `${i}`));
                        });

                        await page.click('button[id="4"]')

                        console.log(divCount, val, options, btnCount, "third")

                        await recorder.stop();
                        await browser.close();

                    }, 3000)
                })
            }, 4000)
            const values = await page.$$eval('#itSpine', elements => elements)

            console.log(values, 'first')

        }, 5000)
    })


    await page.screenshot({ path: 'ex.png' });

})();
