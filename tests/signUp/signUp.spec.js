import {test, expect} from "@playwright/test";

test.describe("Positive flow", ()=>{
    test.beforeEach(async ({page})=>{
        await page.goto("")
        const signUpButton = page.locator('button', {hasText: 'Sign Up'})
        await signUpButton.click()
    })
    test ('Sign Up with VALID data', async ({page})=>{
        const popup = page.locator('app-signup-modal')

        const inputName = popup.locator('#signupName')
        await expect(inputName).toBeVisible()
        await expect(inputName).toBeEnabled()
        await expect(inputName).toBeEditable()

        const inputLastName = popup.locator('#signupLastName')
        await expect(inputLastName).toBeVisible()
        await expect(inputLastName).toBeEnabled()
        await expect(inputLastName).toBeEditable()

        const inputEmail = popup.locator('#signupEmail')
        await expect(inputEmail).toBeVisible()
        await expect(inputEmail).toBeEnabled()
        await expect(inputEmail).toBeEditable()

        const inputPassword = popup.locator('#signupPassword')
        await expect(inputPassword).toBeVisible()
        await expect(inputPassword).toBeEnabled()
        await expect(inputPassword).toBeEditable()

        const inputRepeatPassword = popup.locator('#signupRepeatPassword')
        await expect(inputRepeatPassword).toBeVisible()
        await expect(inputRepeatPassword).toBeEnabled()
        await expect(inputRepeatPassword).toBeEditable()

        const submitBtn = popup.locator('button', {hasText: 'Register'})
        await expect(submitBtn).toBeVisible()
        await expect(submitBtn).toBeDisabled()

        await inputName.fill('Ivanna')
        await inputLastName.fill('Dub')
        await inputEmail.fill('aqa-testing.idub@gmail.com')
        await inputPassword.fill('12345qwerrtyY!')
        await inputRepeatPassword.fill('12345qwerrtyY!')
        await submitBtn.click()
        await expect(page, "User should be redirected to garage page").toHaveURL('/panel/garage')
    })
    test.afterEach(async ({page})=>{
        const settingsBtn = page.getByRole('link', { name: 'Settings' })
        await settingsBtn.click()
        const removeAccountBtn = page.locator('button', {hasText: 'Remove my account'})
        await removeAccountBtn.click()
        const popupRemoveAccount = page.locator('app-remove-account-modal')
        const confirmRemovingBtn = popupRemoveAccount.locator('.btn-danger')
        await confirmRemovingBtn.click()
    })
})

test.describe("Check validation for fields", ()=>{
    test.beforeEach(async ({page})=>{
        await page.goto("")
        const signUpButton = page.locator('button', {hasText: 'Sign Up'})
        await signUpButton.click()
    })
    test ('Sign Up with INVALID data for Name input', async ({page})=>{
        const popup = page.locator('app-signup-modal')
        const inputName = popup.locator('#signupName')
        const submitBtn = popup.locator('button', {hasText: 'Register'})

        await test.step('Negative: check required Name', async () => {
            await inputName.focus()
            await inputName.blur()
            const errorMessageRequiredName = popup.locator(".invalid-feedback")
            await expect(errorMessageRequiredName).toHaveText("Name required")
            await expect(inputName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        

        await test.step('Negative: check Min length', async () => { 
            await inputName.fill('I')
            await inputName.blur()
            const errorMessageMinLengthName = popup.locator(".invalid-feedback")
            await expect(errorMessageMinLengthName).toHaveText("Name has to be from 2 to 20 characters long")
            await expect(inputName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check Max Length', async () => { 
            await inputName.fill('IvannaDubenskaAqaEngineer')
            await inputName.blur()
            const errorMessageMaxLengthName = popup.locator(".invalid-feedback")
            await expect(errorMessageMaxLengthName).toHaveText("Name has to be from 2 to 20 characters long")
            await expect(inputName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check Spaces', async () => {  
            await inputName.fill('Ivanna D')
            await inputName.blur()
            const errorMessageSpacesName = popup.locator(".invalid-feedback")
            await expect(errorMessageSpacesName).toHaveText("Name is invalid")
            await expect(inputName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check Latin letters', async () => {
            await inputName.fill('Іванна')
            await inputName.blur()
            const errorMessageLatinLettersName = popup.locator(".invalid-feedback")
            await expect(errorMessageLatinLettersName).toHaveText("Name is invalid")
            await expect(inputName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check Special Symbols', async () => {
            await inputName.fill('!@#$%^&*()_')
            await inputName.blur()
            const errorMessageSpecialSymbolsName = popup.locator(".invalid-feedback")
            await expect(errorMessageSpecialSymbolsName).toHaveText("Name is invalid")
            await expect(inputName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        // await test.step('Positive: check trim', async () => {
        //     await inputName.fill(' Ivanna ', 'For this input should be implemented trim');
        // })
    })

    test ('Sign Up with INVALID data for Last Name input', async ({page})=>{
        const popup = page.locator('app-signup-modal')
        const inputLastName = popup.locator('#signupLastName')

        await test.step('Negative: check required Last Name', async () => {
            await inputLastName.focus()
            await inputLastName.blur()
            const errorMessageRequiredinputLastName = popup.locator(".invalid-feedback")
            await expect(errorMessageRequiredinputLastName).toHaveText("Last name required")
            await expect(inputLastName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check Min length Last Name', async () => { 
            await inputLastName.fill('D')
            await inputLastName.blur()
            const errorMessageMinLengthInputLastName = popup.locator(".invalid-feedback")
            await expect(errorMessageMinLengthInputLastName).toHaveText("Last name has to be from 2 to 20 characters long")
            await expect(inputLastName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step(' Negative: check Max Length Last Name', async () => {
            await inputLastName.fill('IvannaDubenskaAqaEngineer')
            await inputLastName.blur()
            const errorMessageMaxLengthInputLastName = popup.locator(".invalid-feedback")
            await expect(errorMessageMaxLengthInputLastName).toHaveText("Last name has to be from 2 to 20 characters long")
            await expect(inputLastName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check Spaces Last Name', async () => {
            await inputLastName.fill('Ivanna D')
            await inputLastName.blur()
            const errorMessageSpacesInputLastName = popup.locator(".invalid-feedback")
            await expect(errorMessageSpacesInputLastName).toHaveText("Last name is invalid")
            await expect(inputLastName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check Latin letters Last Name', async () => {
            await inputLastName.fill('Дубенська')
            await inputLastName.blur()
            const errorMessageLatinLettersInputLastName = popup.locator(".invalid-feedback")
            await expect(errorMessageLatinLettersInputLastName).toHaveText("Last name is invalid")
            await expect(inputLastName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check Special Symbols Last Name', async () => {
            await inputLastName.fill('!@#$%^&*()_')
            await inputLastName.blur()
            const errorMessageSpecialSymbolsInputLastName = popup.locator(".invalid-feedback")
            await expect(errorMessageSpecialSymbolsInputLastName).toHaveText("Last name is invalid")
            await expect(inputLastName).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        // await test.step('Positive: check trim Last Name', async () => {
        // await inputLastName.fill(' Dubenska ', 'For this input should be implemented trim')
    })
    test ('Sign Up with INVALID data for Email input', async ({page})=>{
        const popup = page.locator('app-signup-modal')
        const inputEmail = popup.locator('#signupEmail')     

        await test.step('Negative: check required Email', async () => {  
            await inputEmail.focus()
            await inputEmail.blur()
            const errorMessageRequiredInputEmail = popup.locator(".invalid-feedback")
            await expect(errorMessageRequiredInputEmail).toHaveText("Email required")
            await expect(inputEmail).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check invalid type, without @', async () => {
            await inputEmail.fill('testing.idubgmail.com')
            await inputEmail.blur()
            const errorMessageSpacesInputEmail =  popup.locator(".invalid-feedback")
            await expect(errorMessageSpacesInputEmail).toHaveText("Email is incorrect")
            await expect(inputEmail).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check invalid type, without domen', async () => {
            await inputEmail.fill('testing.idub@gmail')
            await inputEmail.blur()
            const errorMessageLatinLettersInputEmail = popup.locator(".invalid-feedback")
            await expect(errorMessageLatinLettersInputEmail).toHaveText("Email is incorrect")
            await expect(inputEmail).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check Special Symbols', async () => {
            await inputEmail.fill('!@#$%^&*()_')
            await inputEmail.blur()
            const errorMessageSpecialSymbolsInputEmail = popup.locator(".invalid-feedback")
            await expect(errorMessageSpecialSymbolsInputEmail).toHaveText("Email is incorrect")
            await expect(inputEmail).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
    })
    test ('Sign Up with INVALID data for Password input', async ({page})=>{
        const popup = page.locator('app-signup-modal') 
        const inputPassword = popup.locator('#signupPassword')     

        await test.step('Negative: check required Password', async () => {
            await inputPassword.focus()
            await inputPassword.blur()
            const errorMessageRequiredInputPassword = popup.locator(".invalid-feedback")
            await expect(errorMessageRequiredInputPassword).toHaveText("Password required")
            await expect(inputPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check Min length ', async () => { 
            await inputPassword.fill('123wW!')
            await inputPassword.blur()
            const errorMessageMinLengthInputPassword = popup.locator(".invalid-feedback")
            await expect(errorMessageMinLengthInputPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(inputPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check Max length ', async () => { 
            await inputPassword.fill('12345678901122wW!')
            await inputPassword.blur()
            const errorMessageMaxLengthInputPassword = popup.locator(".invalid-feedback")
            await expect(errorMessageMaxLengthInputPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(inputPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check without integer', async () => { 
            await inputPassword.fill('Qqwerty!!')
            await inputPassword.blur()
            const errorMessageIntegerInputPassword = popup.locator(".invalid-feedback")
            await expect(errorMessageIntegerInputPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(inputPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        
        await test.step('Negative: check without uppercase letter', async () => {
            await inputPassword.fill('qqwerty1!')
            await inputPassword.blur()
            const errorMessageUppercaseInputPassword = popup.locator(".invalid-feedback")
            await expect(errorMessageUppercaseInputPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(inputPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check without lowercase letter', async () => {
            await inputPassword.fill('QWERTYY2!')
            await inputPassword.blur()
            const errorMessageLowercaseInputPassword = popup.locator(".invalid-feedback")
            await expect(errorMessageLowercaseInputPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(inputPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check Special Symbols only', async () => {
            await inputPassword.fill('!@#$%^&*()_')
            await inputPassword.blur()
            const errorMessageSpecialSymbolsInputPassword = popup.locator(".invalid-feedback")
            await expect(errorMessageSpecialSymbolsInputPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(inputPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")    
    })
    })
    test ('Sign Up with INVALID data for Repeat Password input', async ({page})=>{
        const popup = page.locator('app-signup-modal')    
        const inputPassword = popup.locator('#signupPassword')     
        const inputRepeatPassword = popup.locator('#signupRepeatPassword')

        await inputPassword.fill('12345qwerrtyY!')
        await inputPassword.blur()

        await test.step('Negative: check required Repeat Password', async () => { 
            await inputRepeatPassword.focus()
            await inputRepeatPassword.blur()
            const errorMessageRequiredInputRepeatPassword = await popup.locator(".invalid-feedback")
            await expect(errorMessageRequiredInputRepeatPassword).toHaveText("Re-enter password required")
            await expect(inputRepeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)") 
         })

        await test.step('Negative: check Min length ', async () => {
            await inputRepeatPassword.fill('123wW!')
            await inputRepeatPassword.blur()
            const errorMessageMinLengthInputRepeatPassword = popup.locator(".invalid-feedback")
            await expect(errorMessageMinLengthInputRepeatPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(inputRepeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check Max length ', async () => { 
            await inputRepeatPassword.fill('12345678901122wW!')
            await inputRepeatPassword.blur()
            const errorMessageMaxLengthInputRepeatPassword = popup.locator(".invalid-feedback")
            await expect(errorMessageMaxLengthInputRepeatPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(inputRepeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check without integer', async () => { 
            await inputRepeatPassword.fill('Qqwerty!!')
            await inputRepeatPassword.blur()
            const errorMessageIntegerInputRepeatPassword = popup.locator(".invalid-feedback")
            await expect(errorMessageIntegerInputRepeatPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(inputRepeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check without uppercase letter', async () =>{ 
            await inputRepeatPassword.fill('qqwerty1!')
            await inputRepeatPassword.blur()
            const errorMessageUppercaseInputRepeatPassword = popup.locator(".invalid-feedback")
            await expect(errorMessageUppercaseInputRepeatPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(inputRepeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })

        await test.step('Negative: check without lowercase letter', async () => { 
            await inputRepeatPassword.fill('QWERTYY2!')
            await inputRepeatPassword.blur()
            const errorMessageLowercaseInputRepeatPassword = popup.locator(".invalid-feedback")
            await expect(errorMessageLowercaseInputRepeatPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(inputRepeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
        await test.step('Negative: check Special Symbols only', async () => { 
            await inputRepeatPassword.fill('!@#$%^&*()_')
            await inputRepeatPassword.blur()
            const errorMessageSpecialSymbolsInputRepeatPassword = popup.locator(".invalid-feedback")
            await expect(errorMessageSpecialSymbolsInputRepeatPassword).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            await expect(inputRepeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")    
        })

        await test.step('Negative: check not matched passwords', async () => { 
            await inputRepeatPassword.fill('12345qwerrtyY!2')
            await inputRepeatPassword.blur()
            const errorMessageNotMachInputRepeatPassword = popup.locator(".invalid-feedback")
            await expect(errorMessageNotMachInputRepeatPassword).toHaveText("Passwords do not match")
            await expect(inputRepeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)")
        })
    })

})