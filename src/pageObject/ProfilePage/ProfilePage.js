import BasePage from "../BasePage.js";

export default class SettingsPage extends BasePage{
    constructor(page) {
        super(page, "/panel/profile")
        this.profileFullName = page.locator('.profile_name')
    }
}