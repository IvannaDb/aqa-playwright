import BasePage from "../BasePage";
import { SignInPopUp } from "./components/signInPopup";
import { SignUpPopup } from "./components/signUpPopup";


export default class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/')
        this.signUpButton = page.locator('button', {hasText: 'Sign Up'})
        this.signInButton = page.locator('button', {hasText: 'Sign In'})
    }

async openSignUpPopUp() {
    await this.signUpButton.click()
    return new SignUpPopup(this._page)
 }
 async openSignInPopUp() {
    await this.signInButton.click()
    return new SignInPopUp(this._page)
 }
}