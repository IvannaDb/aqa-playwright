import SettingsPage from "../pageObject/SettingsPage/SettingsPage.js";
import BaseComponent from "./BaseComponent.js";
export default class SideBar extends BaseComponent {
    constructor(page) {
        super(page, page.locator('.sidebar-wrapper'));
        this.settingsButton = page.getByRole('link', { name: 'Settings' })
    }
    async openSettings (){
        await this.settingsButton.click()
        return new SettingsPage(this._page)
    }
}

