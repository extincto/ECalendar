import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import puppeteer from 'puppeteer';

Meteor.methods({
	'Data.getAllData'() {
        InstanceBrowser();
    },
});

let page;
let browser;
let calendar;
let url;
const width = 1200;
const height = 850;
const ecampus = 'http://calendrier.montpellier.epsi.fr/';

async function InstanceBrowser() {
	try {
		browser = await puppeteer.launch({
			headless: true,
			slowMo: 10,
			args: [`--window-size=${width},${height}`, '--no-sandbox']
		});
		page = await browser.newPage();
		await page.setViewport({ width, height });
        await page.goto(ecampus);
        console.log('Start Scraping Calendar Ecampus');
	} catch (e) {
		console.log('Error Creation Chromium', e);
    }
    console.log('Your credential ' + Meteor.settings.private.login, Meteor.settings.private.password);
    await page.type('[name="login"]', Meteor.settings.private.login);
    await page.type('[name="pass"]', Meteor.settings.private.password);
    // console.log('login+password ERROR => ', login + password);
    await page.waitFor(200);
    await page.click('#submitIndex');
    await page.waitFor(200);
    await page.waitForSelector('#envoyerPortail');
    await page.click('#envoyerPortail');
    await page.waitFor('#contentCalendar div', { visible: true, timeout: 60000 });

    let cron = await page.$eval('body div div:nth-of-type(0n+3)', el => el.innerHTML);
    if(cron === 'Le cron est actuellement desactive'){
        console.log('We starting your Ecampus Cron, wait a moment please!');
        await page.click('[name="tacheScheduled"]');
        await page.waitFor(10000);
    }
    url = await page.$eval('h3 b', el => el.innerHTML); 
    console.log('The URL of your Calendar is :'+url);
    await HTTP.call('GET', url, Meteor.bindEnvironment((error, result) => {
        if (!error) {
            calendar = result.content;
            console.log(calendar);
            Calendar.insert({
                calendar
            })
        }
    }));
    console.log('Finish !');
    try {
        await page.waitFor(200);
        await browser.close();
    } catch (e) {
        console.log('Error when Closing Chromium', e);
    }
}


/*--settings=settings.json*/