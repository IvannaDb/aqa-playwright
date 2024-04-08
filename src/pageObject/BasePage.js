import SideBar from "../components/SideBar"

export default class BasePage {
    constructor(page, url) {
        this._page = page
        this._url = url
        this.sidebar = new SideBar(page)
    }

    async navigate(){
        await this._page.goto(this._url)
    }
}