import BaseComponent from "../../../components/BaseComponent";

export class CreateCarPopup extends BaseComponent{
    _brandDropdownSelector = '#addCarBrand'
    _modelDropdownSelector = '#addCarModel'
    _mileageInputSelector = '#addCarMileage'

    constructor(page) {
        super(page, page.locator('app-add-car-modal'))
        this.dropdownBrand = this.container.locator(this._brandDropdownSelector)
        this.dropdownModel = this.container.locator(this._modelDropdownSelector)
        this.inputMileage = this.container.locator(this._mileageInputSelector)

        this.submitBtn = this.container.locator('button', {hasText: 'Add'})
    }
}