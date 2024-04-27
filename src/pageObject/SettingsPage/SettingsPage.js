import BasePage from "../BasePage.js";
import {RemoveAccountPopup} from "./components/removeAccountPopup";


export default class SettingsPage extends BasePage{
    constructor(page) {
        super(page, "/panel/settings")
        this.removeAccountBtn = page.locator('button', {hasText: 'Remove my account'})
    }

async openRemoveAccPopUp() {
    await this.removeAccountBtn.click()
    return new RemoveAccountPopup(this._page)
 }
}
