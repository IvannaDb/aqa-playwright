import {test as setup} from "@playwright/test";
import {expect} from '../../src/fixtures/myFixtures'
import WelcomePage from "../../src/pageObject/WelcomePage/WelcomePage";
import { USER_IVANNA_STORAGE_STATE_PATH } from "../../src/constants";

setup.describe('Setup', ()=> {
    setup('Login and save', async ({page})=>{
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate()
        const signInPopup = await welcomePage.openSignInPopUp()
        await signInPopup.inputEmail.fill('aqa-testing.idub@gmail.com')
        await signInPopup.inputPassword.fill('12345qwerrtyY!')
        await signInPopup.rememberMeCheckbox.check()
        await signInPopup.submitBtn.click()

        await expect(page).toHaveURL(/garage/)

        await page.context().storageState({
            path: USER_IVANNA_STORAGE_STATE_PATH
        })
    })
})
