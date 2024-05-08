import BaseComponent from "../../../components/BaseComponent";

export class SignInPopUp extends BaseComponent{
    _emailInputSelector = '#signinEmail'
    _passwordInputSelector = '#signinPassword'
    _rememberMeCheckbox = '#remember'

    constructor(page) {
        super(page, page.locator('app-signin-modal'))
        this.inputEmail = this.container.locator(this._emailInputSelector)
        this.inputPassword = this.container.locator(this._passwordInputSelector)
        this.rememberMeCheckbox = this.container.locator(this._rememberMeCheckbox)

        this.submitBtn = this.container.locator('button', {hasText: 'Login'})
    }
}