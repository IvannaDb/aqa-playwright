import {expect as baseExpect, test as base} from "@playwright/test";
import WelcomePage from '../../src/pageObject/WelcomePage/WelcomePage'
import GaragePage from '../../src/pageObject/GaragePage/GaragePage'
import { USER_IVANNA_STORAGE_STATE_PATH } from "../constants";

export const test = base.extend({
    welcomePage: async({page}, use)=>{
        const welcomePage = new WelcomePage(page)
        await use(welcomePage)
    },
    garagePage: async ({browser}, use)=>{
        // await welcomePage.navigate() // WITHOUT SETUP
        // const signInPopup = await welcomePage.openSignInPopUp()
        // await signInPopup.inputEmail.fill('aqa-testing.idub@gmail.com')
        // await signInPopup.inputPassword.fill('12345qwerrtyY!')
        // await signInPopup.rememberMeCheckbox.check()
        // await signInPopup.submitBtn.click()

        // await expect(page).toHaveURL(/garage/)

        const ctx = await browser.newContext({ // WITH SETUP
            storageState: USER_IVANNA_STORAGE_STATE_PATH
        })
        const page = await ctx.newPage()

        const garagePage = new GaragePage(page) // redirect to needed page
        await garagePage.navigate() // redirect to needed page
        await use(garagePage)
    }
})
export const expect = baseExpect