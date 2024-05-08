import {test, expect} from '../../src/fixtures/myFixtures'
// import WelcomePage from '../../src/pageObject/WelcomePage/WelcomePage'
// import GaragePage from '../../src/pageObject/GaragePage/GaragePage'

test.describe('Garage (fixtures)', ()=> {
    let popup
    test('"Add Car" button should be active', async ({ userGaragePage }) => {
        await expect(userGaragePage.addCarrButton).toBeVisible();
    })
    test ('Create new Car', async ({userGaragePage}) => {
        await expect(userGaragePage.addCarrButton).toBeVisible()

        popup = await userGaragePage.openCreateCarPopUp()
        const brand = 'Ford'
        const model = 'Mondeo'

        await popup.dropdownBrand.selectOption(brand)
        await popup.dropdownModel.selectOption(model)
        await popup.inputMileage.fill('222')
        await popup.submitBtn.click()
})
})

// test.describe('Garage (without fixture)', ()=> {
//     let welcomePage
//     let garagePage
//     test.beforeEach(async ({page})=> {
//         welcomePage = new WelcomePage(page)
//         await welcomePage.navigate()
//         const signInPopup = await welcomePage.openSignInPopUp()
//         await signInPopup.inputEmail.fill('aqa-testing.idub@gmail.com')
//         await signInPopup.inputPassword.fill('12345qwerrtyY!')
//         await signInPopup.rememberMeCheckbox.check()
//         await signInPopup.submitBtn.click()

//         await expect(page).toHaveURL(/garage/)
//         garagePage = new GaragePage(page)
//     })
// test('The user with VALID data shuold be able to go to the Garage page', async ({ page }) => {
//     await expect(garagePage.addCarrButton).toBeVisible();
// })
// })