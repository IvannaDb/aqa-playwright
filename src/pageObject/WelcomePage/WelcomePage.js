import BasePage from "../BasePage";
import { SignUpPopup } from "./components/signUpPopup";


export default class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/')
        this.signUpButton = page.locator('button', {hasText: 'Sign Up'})
        // this.signUpButton = this.page.locator('button', { hasText: 'Sign Up' })
    }

async openSignUpPopUp() {
    await this.signUpButton.click()
    return new SignUpPopup(this._page)
 }
}