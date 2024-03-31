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

        // Negative: check required Name
        await inputName.click()
        await inputName.blur()
        const errorMessageRequiredName = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageRequiredName).toContain("Name required")
        await expect 

        // Negative: check Min length
        await inputName.fill('I')
        await inputName.blur()
        const errorMessageMinLengthName = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageMinLengthName).toContain("Name has to be from 2 to 20 characters long")

        // Negative: check Max Length
        await inputName.fill('IvannaDubenskaAqaEngineer')
        await inputName.blur()
        const errorMessageMaxLengthName = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageMaxLengthName).toContain("Name has to be from 2 to 20 characters long")

        // Negative: check Spaces
        await inputName.fill('Ivanna D')
        await inputName.blur()
        const errorMessageSpacesName = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageSpacesName).toContain("Name is invalid")

        // Negative: check Latin letters
        await inputName.fill('Іванна')
        await inputName.blur()
        const errorMessageLatinLettersName = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageLatinLettersName).toContain("Name is invalid")

        // Negative: check Special Symbols
        await inputName.fill('!@#$%^&*()_')
        await inputName.blur()
        const errorMessageSpecialSymbolsName = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageSpecialSymbolsName).toContain("Name is invalid")

        // Positive: check trim BUG HERE
        // await inputName.fill(' Ivanna ', 'For this input should be implemented trim')
    })

    test ('Sign Up with INVALID data for Last Name input', async ({page})=>{
        const popup = page.locator('app-signup-modal')
        const inputLastName = popup.locator('#signupLastName')

        // Negative: check required Last Name
        await inputLastName.click()
        await inputLastName.blur()
        const errorMessageRequiredinputLastName = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageRequiredinputLastName).toContain("Last name required")

        // Negative: check Min length Last Name
        await inputLastName.fill('D')
        await inputLastName.blur()
        const errorMessageMinLengthInputLastName = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageMinLengthInputLastName).toContain("Last name has to be from 2 to 20 characters long")

        // Negative: check Max Length Last Name
        await inputLastName.fill('IvannaDubenskaAqaEngineer')
        await inputLastName.blur()
        const errorMessageMaxLengthInputLastName = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageMaxLengthInputLastName).toContain("Last name has to be from 2 to 20 characters long")

        // Negative: check Spaces Last Name
        await inputLastName.fill('Ivanna D')
        await inputLastName.blur()
        const errorMessageSpacesInputLastName = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageSpacesInputLastName).toContain("Last name is invalid")

        // Negative: check Latin letters Last Name
        await inputLastName.fill('Дубенська')
        await inputLastName.blur()
        const errorMessageLatinLettersInputLastName = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageLatinLettersInputLastName).toContain("Last name is invalid")

        // Negative: check Special Symbols Last Name
        await inputLastName.fill('!@#$%^&*()_')
        await inputLastName.blur()
        const errorMessageSpecialSymbolsInputLastName = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageSpecialSymbolsInputLastName).toContain("Last name is invalid")

        // Positive: check trim Last Name BUG HERE
        // await inputLastName.fill(' Dubenska ', 'For this input should be implemented trim')
    })
    test ('Sign Up with INVALID data for Email input', async ({page})=>{
        const popup = page.locator('app-signup-modal')
        const inputEmail = popup.locator('#signupEmail')     

        // Negative: check required Email 
        await inputEmail.click()
        await inputEmail.blur()
        const errorMessageRequiredInputEmail = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageRequiredInputEmail).toContain("Email required")

        // Negative: check invalid type, without @
        await inputEmail.fill('testing.idubgmail.com')
        await inputEmail.blur()
        const errorMessageSpacesInputEmail = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageSpacesInputEmail).toContain("Email is incorrect")

        // Negative: check invalid type, without .com
        await inputEmail.fill('testing.idub@gmail')
        await inputEmail.blur()
        const errorMessageLatinLettersInputEmail = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageLatinLettersInputEmail).toContain("Email is incorrect")

        // Negative: check Special Symbols
        await inputEmail.fill('!@#$%^&*()_')
        await inputEmail.blur()
        const errorMessageSpecialSymbolsInputEmail = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageSpecialSymbolsInputEmail).toContain("Email is incorrect")
    })
    test ('Sign Up with INVALID data for Password input', async ({page})=>{
        const popup = page.locator('app-signup-modal') 
        const inputPassword = popup.locator('#signupPassword')     

        // Negative: check required Password
        await inputPassword.click()
        await inputPassword.blur()
        const errorMessageRequiredInputPassword = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageRequiredInputPassword).toContain("Password required")

        // Negative: check Min length 
        await inputPassword.fill('123wW!')
        await inputPassword.blur()
        const errorMessageMinLengthInputPassword = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageMinLengthInputPassword).toContain("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")

        // Negative: check Max length 
        await inputPassword.fill('12345678901122wW!')
        await inputPassword.blur()
        const errorMessageMaxLengthInputPassword = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageMaxLengthInputPassword).toContain("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
        
        // Negative: check without integer
        await inputPassword.fill('Qqwerty!!')
        await inputPassword.blur()
        const errorMessageIntegerInputPassword = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageIntegerInputPassword).toContain("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
 
        // Negative: check without uppercase letter
        await inputPassword.fill('qqwerty1!')
        await inputPassword.blur()
        const errorMessageUppercaseInputPassword = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageUppercaseInputPassword).toContain("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")

        // Negative: check without lowercase letter
        await inputPassword.fill('QWERTYY2!')
        await inputPassword.blur()
        const errorMessageLowercaseInputPassword = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageLowercaseInputPassword).toContain("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")

        // Negative: check Special Symbols only
        await inputPassword.fill('!@#$%^&*()_')
        await inputPassword.blur()
        const errorMessageSpecialSymbolsInputPassword = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageSpecialSymbolsInputPassword).toContain("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
    })
    test ('Sign Up with INVALID data for Repeat Password input', async ({page})=>{
        const popup = page.locator('app-signup-modal')    
        const inputPassword = popup.locator('#signupPassword')     
        const inputRepeatPassword = popup.locator('#signupRepeatPassword')

        await inputPassword.fill('12345qwerrtyY!')
        await inputPassword.blur()

        // Negative: check required Repeat Password
        await inputRepeatPassword.click()
        await inputRepeatPassword.blur()
        const errorMessageRequiredInputRepeatPassword = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageRequiredInputRepeatPassword).toContain("Re-enter password required")

        // Negative: check Min length 
        await inputRepeatPassword.fill('123wW!')
        await inputRepeatPassword.blur()
        const errorMessageMinLengthInputRepeatPassword = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageMinLengthInputRepeatPassword).toContain("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")

        // Negative: check Max length 
        await inputRepeatPassword.fill('12345678901122wW!')
        await inputRepeatPassword.blur()
        const errorMessageMaxLengthInputRepeatPassword = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageMaxLengthInputRepeatPassword).toContain("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
        
        // Negative: check without integer
        await inputRepeatPassword.fill('Qqwerty!!')
        await inputRepeatPassword.blur()
        const errorMessageIntegerInputRepeatPassword = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageIntegerInputRepeatPassword).toContain("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
 
        // Negative: check without uppercase letter
        await inputRepeatPassword.fill('qqwerty1!')
        await inputRepeatPassword.blur()
        const errorMessageUppercaseInputRepeatPassword = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageUppercaseInputRepeatPassword).toContain("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")

        // Negative: check without lowercase letter
        await inputRepeatPassword.fill('QWERTYY2!')
        await inputRepeatPassword.blur()
        const errorMessageLowercaseInputRepeatPassword = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageLowercaseInputRepeatPassword).toContain("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")

        // Negative: check Special Symbols only
        await inputRepeatPassword.fill('!@#$%^&*()_')
        await inputRepeatPassword.blur()
        const errorMessageSpecialSymbolsInputRepeatPassword = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageSpecialSymbolsInputRepeatPassword).toContain("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
        
        // Negative: check not matched passwords
        await inputRepeatPassword.fill('12345qwerrtyY!2')
        await inputRepeatPassword.blur()
        const errorMessageNotMachInputRepeatPassword = await popup.locator(".invalid-feedback").textContent()
        await expect(errorMessageNotMachInputRepeatPassword).toContain("Passwords do not match")

    })

})