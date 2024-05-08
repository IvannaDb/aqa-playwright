import BaseComponent from "./BaseComponent";
import ProfilePage from '../pageObject/ProfilePage/ProfilePage'


export default class SideBar extends BaseComponent {
    constructor(page) {
        super(page, page.locator('.sidebar-wrapper'));
        // this.settingsButton = page.getByRole('link', { name: 'Settings' })
        this.profileButton = page.getByRole('link', { name: 'Profile' })
    }
//    async openSettings (){
//         await this.settingsButton.click()
//         return new SettingsPage(this._page)
//     }
    async openProfile (){
        await this.profileButton.click()
        return new ProfilePage(this._page)
    }
}

