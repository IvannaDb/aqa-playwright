import {test, expect} from '../../src/fixtures/myFixtures.js'
import { PROFILE_MOCK_RESPONSE } from './fixtures/profile'
import ProfilePage from '../../src/pageObject/ProfilePage/ProfilePage.js'

test.describe('Profile data', ()=> {
    test('Mock Profile Data using API and check on WEB', async ({ userGaragePage, page }) => {
        await expect(userGaragePage.addCarrButton).toBeVisible()
        
        await page.route('/api/users/profile', async (route)=> {
            await route.fulfill({
                status: 200,
                body: JSON.stringify(PROFILE_MOCK_RESPONSE),
            }) 
        })
        const profilePage = new ProfilePage(page)
        profilePage.navigate()
        const fullName = profilePage.profileFullName
        await expect(fullName).toHaveText("Mocked Data")

    })

})