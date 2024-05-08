export default class BasePage {
    constructor(page, url) {
        this._page = page
        this._url = url
    }

    get page (){
        return this._page
    }

    async navigate(){
        await this._page.goto(this._url)
    }
}
