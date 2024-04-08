import BaseComponent from "../../../components/BaseComponent";

export class RemoveAccountPopup extends BaseComponent {

    constructor (page) {
        super(page, page.locator('app-remove-account-modal'))

        this.confirmRemovingBtn = this.container.locator('.btn-danger')
    }
    
    async removeAccount() {
        await this.confirmRemovingBtn.click();
    }
}