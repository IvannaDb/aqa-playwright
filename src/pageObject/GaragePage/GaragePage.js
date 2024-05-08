import BasePage from "../BasePage";
import { CreateCarPopup } from "./components/createCarPopup";

export default class GaragePage extends BasePage{
    constructor (page) {
        super(page, '/panel/garage')
        this.addCarrButton = page.getByRole('button', { name: 'Add car' })
    }
     async openCreateCarPopUp(){
        await this.addCarrButton.click()
        return new CreateCarPopup(this._page)
     }
}