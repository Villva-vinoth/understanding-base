const puppeteer = require('puppeteer')

const generatePDF = async (params) => {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    const html = await page.setContent(params.html)
    const pdf = await page.pdf(params.options)
    await browser.close()
    return pdf
}

module.exports = { generatePDF }