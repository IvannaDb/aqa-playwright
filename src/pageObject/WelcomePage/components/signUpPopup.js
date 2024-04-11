import BaseComponent from "../../../components/BaseComponent"

export class SignUpPopup extends BaseComponent {
    _nameInputSelector = '#signupName'
    _lastNameInputSelector = '#signupLastName'
    _emailInputSelector = '#signupEmail'
    _passwordInputSelector = '#signupPassword'
    _repeatPasswordInputSelector = '#signupRepeatPassword'

    
    constructor(page) {
        super(page, page.locator('app-signup-modal'))

        this.inputName = this.container.locator(this._nameInputSelector)
        this.errorMessageInputName = this.container.locator(`${this._nameInputSelector}+ .invalid-feedback`)
        
        this.inputLastName = this.container.locator(this._lastNameInputSelector)
        this.errorMessageInputLastName = this.container.locator(`${this._lastNameInputSelector}+ .invalid-feedback`)

        this.inputEmail = this.container.locator(this._emailInputSelector)
        this.errorMessageInputEmail = this.container.locator(`${this._emailInputSelector}+ .invalid-feedback`)

        this.inputPassword = this.container.locator(this._passwordInputSelector)
        this.errorMessageInputPassword = this.container.locator(`${this._passwordInputSelector}+ .invalid-feedback`)

        this.inputRepeatPassword = this.container.locator(this._repeatPasswordInputSelector)
        this.errorMessageInputRepeatPassword = this.container.locator(`${this._repeatPasswordInputSelector}+ .invalid-feedback`)

        this.submitBtn = this.container.locator('button', {hasText: 'Register'})
    }
}