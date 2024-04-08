import {test, expect} from "@playwright/test";
import SideBar from "../../src/components/SideBar";
import { USERS } from "../../src/data/users"
import SettingsPage from "../../src/pageObject/SettingsPage/SettingsPage";
import { RemoveAccountPopup } from "../../src/pageObject/SettingsPage/components/removeAccountPopup";
import WelcomePage from "../../src/pageObject/WelcomePage/WelcomePage"

test.describe.only('SignUpPom', ()=> {
    let popup

    test.describe ('Positive flow', ()=>{
        test.beforeEach(async ({page})=>{
            const welcomePage = new WelcomePage(page)
            await welcomePage.navigate()
            popup = await welcomePage.openSignUpPopUp() 
    })
    test ("user should be able to signUp", async ({page})=>{
        await popup.inputName.fill(USERS.IVANNA_DUB.name)
        await popup.inputLastName.fill(USERS.IVANNA_DUB.lastName)
        await popup.inputEmail.fill(USERS.IVANNA_DUB.email)
        await popup.inputPassword.fill(USERS.IVANNA_DUB.password)
        await popup.inputRepeatPassword.fill(USERS.IVANNA_DUB.repeatPassword)
        await popup.submitBtn.click()

        await expect(page, "User should be redirected to garage page").toHaveURL(/garage/)
    })
    test.afterEach(async({page})=>{
            const sidebar = new SideBar(page);
            await sidebar.openSettings();
            const settingsPage = new SettingsPage(page);
            await settingsPage.navigate();
            popup = await settingsPage.openRemoveAccPopUp();
            const removeAccPopup = new RemoveAccountPopup(page);
            await removeAccPopup.removeAccount();
        })
})

    test.describe ('Negative flow', ()=> {
        test.beforeEach(async ({page})=>{
            const welcomePage = new WelcomePage(page)
            await welcomePage.navigate()
            popup = await welcomePage.openSignUpPopUp()
        })
        test('Negative: check required Name', async () => {
            await popup.inputName.focus()
            await popup.inputName.blur()
            await expect(popup.errorMessageInputName).toHaveText("Name required")
            await expect(popup.inputName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Min length for Name field', async () => {
            await popup.inputName.fill('I')
            await popup.inputName.blur()
            await expect(popup.errorMessageInputName).toHaveText("Name has to be from 2 to 20 characters long")
            await expect(popup.inputName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Max Length for Name field', async () => {
            await popup.inputName.fill('IvannaDubenskaAqaEngineer')
            await popup.inputName.blur()
            await expect(popup.errorMessageInputName).toHaveText("Name has to be from 2 to 20 characters long")
            await expect(popup.inputName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Spaces for Name field', async () => {
            await popup.inputName.fill('Ivanna D')
            await popup.inputName.blur()
            await expect(popup.errorMessageInputName).toHaveText("Name is invalid")
            await expect(popup.inputName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Latin letters for Name field', async () => {
            await popup.inputName.fill('Іванна')
            await popup.inputName.blur()
            await expect(popup.errorMessageInputName).toHaveText("Name is invalid")
            await expect(popup.inputName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Special Symbols for Name field', async () => {
            await popup.inputName.fill('!@#$%^&*()_')
            await popup.inputName.blur()
            await expect(popup.errorMessageInputName).toHaveText("Name is invalid")
            await expect(popup.inputName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test.fail('Check trim for field Name', async () => {
            await popup.inputName.fill(' Ivanna ')
        })
        test('Negative: check required Last Name', async () => {
            await popup.inputLastName.focus()
            await popup.inputLastName.blur()
            await expect(popup.errorMessageInputLastName).toHaveText("Last name required")
            await expect(popup.inputLastName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Min length Last Name', async () => {
            await popup.inputLastName.fill('D')
            await popup.inputLastName.blur()
            await expect(popup.errorMessageInputLastName).toHaveText("Last name has to be from 2 to 20 characters long")
            await expect(popup.inputLastName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Max Length Last Name', async () => {
            await popup.inputLastName.fill('IvannaDubenskaAqaEngineer')
            await popup.inputLastName.blur()
            await expect(popup.errorMessageInputLastName).toHaveText("Last name has to be from 2 to 20 characters long")
            await expect(popup.inputLastName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Spaces Last Name', async () => {
            await popup.inputLastName.fill('Ivanna D')
            await popup.inputLastName.blur()
            await expect(popup.errorMessageInputLastName).toHaveText("Last name is invalid")
            await expect(popup.inputLastName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Latin letters Last Name', async () => {
            await popup.inputLastName.fill('Дубенська')
            await popup.inputLastName.blur()
            await expect(popup.errorMessageInputLastName).toHaveText("Last name is invalid")
            await expect(popup.inputLastName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Special Symbols Last Name', async () => {
            await popup.inputLastName.fill('!@#$%^&*()_')
            await popup.inputLastName.blur()
            await expect(popup.errorMessageInputLastName).toHaveText("Last name is invalid")
            await expect(popup.inputLastName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test.fail('Check trim for field Last Name', async () => {
            await popup.inputLastName.fill(' Dubenska ')
        })
        test('Negative: check required Email', async () => {
            await popup.inputEmail.focus()
            await popup.inputEmail.blur()
            await expect(popup.errorMessageInputEmail).toHaveText("Email required")
            await expect(popup.inputEmail).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check invalid type, without @', async () => {
            await popup.inputEmail.fill('testing.idubgmail.com')
            await popup.inputEmail.blur()
            await expect(popup.errorMessageInputEmail).toHaveText("Email is incorrect")
            await expect(popup.inputEmail).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check invalid type, without domen', async () => {
            await popup.inputEmail.fill('testing.idub@')
            await popup.inputEmail.blur()
            await expect(popup.errorMessageInputEmail).toHaveText("Email is incorrect")
            await expect(popup.inputEmail).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Special Symbols for Email field', async () => {
            await popup.inputEmail.fill('!@#$%^&*()_')
            await popup.inputEmail.blur()
            await expect(popup.errorMessageInputEmail).toHaveText("Email is incorrect")
            await expect(popup.inputEmail).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check required Password', async () => {
            await popup.inputPassword.focus()
            await popup.inputPassword.blur()
            await expect(popup.errorMessageInputPassword).toHaveText("Password required")
            await expect(popup.inputPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Min length for Password', async () => {
            await popup.inputPassword.fill('123wW!')
            await popup.inputPassword.blur()
            await expect(popup.errorMessageInputPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(popup.inputPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Max length for Password', async () => {
            await popup.inputPassword.fill('12345678901122wW!')
            await popup.inputPassword.blur()
            await expect(popup.errorMessageInputPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(popup.inputPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check without integer for Password', async () => {
            await popup.inputPassword.fill('Qqwerty!!')
            await popup.inputPassword.blur()
            await expect(popup.errorMessageInputPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(popup.inputPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check without uppercase letter for Password', async () => {
            await popup.inputPassword.fill('qqwerty1!')
            await popup.inputPassword.blur()
            await expect(popup.errorMessageInputPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(popup.inputPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check without lowercase letter for Password', async () => {
            await popup.inputPassword.fill('QWERTYY2!')
            await popup.inputPassword.blur()
            await expect(popup.errorMessageInputPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(popup.inputPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Special Symbols only for Password', async () => {
            await popup.inputPassword.fill('!@#$%^&*()_')
            await popup.inputPassword.blur()
            await expect(popup.errorMessageInputPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(popup.inputPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check required Repeat Password', async () => {
            await popup.inputRepeatPassword.focus()
            await popup.inputRepeatPassword.blur()
            await expect(popup.errorMessageInputRepeatPassword).toHaveText("Re-enter password required")
            await expect(popup.inputRepeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Min length for Repeat Password', async () => {
            await popup.inputRepeatPassword.fill('123wW!')
            await popup.inputRepeatPassword.blur()
            await expect(popup.errorMessageInputRepeatPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(popup.inputRepeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Max length for Repeat Password ', async () => {
            await popup.inputRepeatPassword.fill('12345678901122wW!')
            await popup.inputRepeatPassword.blur()
            await expect(popup.errorMessageInputRepeatPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(popup.inputRepeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check without integer for Repeat Password', async () => {
            await popup.inputRepeatPassword.fill('Qqwerty!!')
            await popup.inputRepeatPassword.blur()
            await expect(popup.errorMessageInputRepeatPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(popup.inputRepeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check without uppercase letter for Repeat Password', async () => {
            await popup.inputRepeatPassword.fill('qqwerty1!')
            await popup.inputRepeatPassword.blur()
            await expect(popup.errorMessageInputRepeatPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(popup.inputRepeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check without lowercase letter for Repeat Password', async () => {
            await popup.inputRepeatPassword.fill('QWERTYY2!')
            await popup.inputRepeatPassword.blur()
            await expect(popup.errorMessageInputRepeatPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(popup.inputRepeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check Special Symbols only for Repeat Password', async () => {
            await popup.inputRepeatPassword.fill('!@#$%^&*()_')
            await popup.inputRepeatPassword.blur()
            await expect(popup.errorMessageInputRepeatPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(popup.inputRepeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        test('Negative: check not matched passwordsd', async () => {
            await popup.inputRepeatPassword.fill('12345qwerrtyY!2')
            await popup.inputRepeatPassword.blur()
            await expect(popup.errorMessageInputRepeatPassword).toHaveText("Passwords do not match")
            await expect(popup.inputRepeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        })
    })

