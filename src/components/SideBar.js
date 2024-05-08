import BaseComponent from "./BaseComponent";


export default class SideBar extends BaseComponent {
    constructor(page) {
        super(page, page.locator('.sidebar-wrapper'));
        this.settingsButton = page.getByRole('link', { name: 'Settings' })
    }
//    async openSettings (){
//         await this.settingsButton.click()
//         return new SettingsPage(this._page)
//     }
}

