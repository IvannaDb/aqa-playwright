import { USER_IVANNA_STORAGE_STATE_PATH } from '../../../src/constants.js'
import { BRANDS } from '../../../src/data/brands.js'
import { MODELS } from '../../../src/data/models.js'
import {test, expect, request as apiRequest} from '../../../src/fixtures/myFixtures.js'

test.describe('Create Cars', ()=>{
    // test.afterAll(async ()=>{
    //     const request = await apiRequest.newContext({
    //         storageState: USER_IVANNA_STORAGE_STATE_PATH
    //     })

    //     const carsResponse = await request.get('/api/cars')
    //     const cars = await carsResponse.json()

    //     await Promise.all(
    //         cars.data.map((car) => request.delete(`/api/cars/${car.id}`))
    //     )
    // })
    test('Positive: Create Cars', async ({request})=>{
        for (const brand of Object.values(BRANDS)) {
            await test.step(`Create models for brand: ${brand.title}`, async () => {
                for (const model of Object.values(MODELS[brand.id])){
                    await test.step (`Create car with brand ${brand.title} and model ${model.title}`, async()=>{
                       const requestBody = {
                            "carBrandId": brand.id,
                             "carModelId": model.id,
                             "mileage": Math.floor(Math.random()*100)
                            }
                        const response = await request.post('api/cars', {
                        data: requestBody
                        })
                        const body = await response.json()
                        const expected = {
                        "id": expect.any(Number),
                         "carBrandId": requestBody.carBrandId,
                        "carModelId": requestBody.carModelId,
                        "initialMileage": requestBody.mileage,
                        "updatedMileageAt": expect.any(String),
                        "carCreatedAt": expect.any(String),
                        "mileage": requestBody.mileage,
                        "brand": brand.title,
                        "model": model.title,
                        "logo": brand.logoFilename
                    }
                        expect(body.status).toBe('ok')
                        expect(body.data).toEqual(expected)
                    });
                }
            })
        }
    })
    test('Negative: Create Cars', async ({request})=>{
        test.step('Create Audi without carModelId', async () => {
            const audiBrand = BRANDS.Audi;
            const requestBody = {
              carBrandId: audiBrand.id,
              mileage: Math.floor(Math.random() * 100),
            }
        
            const response = await request.post('api/cars', { data: requestBody })
            const body = await response.json()
        
            expect(response.status).toBe('error') 
            expect(body.error).toBeDefined() 
          })
          test.step('Create Audi with invalid carBrandId (string)', async () => {
            const requestBody = {
              carBrandId: 'invalid_brand_id', 
              carModelId: 2,
              mileage: Math.floor(Math.random() * 100),
            };
        
            const response = await request.post('api/cars', { data: requestBody })
            const body = await response.json()
        
            expect(response.status).toBe('error') 
            expect(body.error).toBeDefined() 
          })
          test.step('Create Audi with non-existent brand ID', async () => {
            const requestBody = {
              carBrandId: 9999, // Non-existent brand ID
              carModelId: 1,
              mileage: Math.floor(Math.random() * 100),
            }
        
            const response = await request.post('api/cars', { data: requestBody })
            const body = await response.json()
        
            expect(response.status).toBe('error')
            expect(body.error).toBeDefined()
          })
          test.step('Attempt to create a car with an unknown model', async () => {
            const requestBody = {
                "carBrandId": 1,
                "carModelId": 989898, // Non-existent model ID
                "mileage": Math.floor(Math.random() * 100)
            }
        
            const response = await request.post('api/cars', { data: requestBody })
            const body = await response.json()
        
            expect(body.status).toBe('error')
            expect(body.error).toBe('Invalid model ID')
        })
        test.step('Create Car without Brand', async () => {
            const requestBody = {
            carModelId: 2,
            mileage: Math.floor(Math.random() * 100),
            }
        
            const response = await request.post('api/cars', { data: requestBody })
            const body = await response.json()
        
            expect(response.status).toBe('error') 
            expect(body.error).toBeDefined() 
          })

    })
        
})