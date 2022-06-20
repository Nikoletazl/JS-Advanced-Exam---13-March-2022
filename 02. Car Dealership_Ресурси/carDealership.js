class CarDealership {
    constructor(name){
        this.name = name
        this.availableCars = []
        this.soldCars = []
        this.totalIncome = 0
    }

    addCar (model, horsepower, price, mileage) {
        if(model == '' || horsepower < 0 || price < 0 || mileage < 0 ) {
            throw new Error('Invalid input!')
        }

        this.availableCars.push({model, horsepower, price, mileage
        })

        return `New car added: ${model} - ${horsepower} HP - ${mileage.toFixed(2)} km - ${price.toFixed(2)}$`
    }

    sellCar (model, desiredMileage) {
        let carIndex = this.availableCars.findIndex(c => c.model == model)
        let car = this.availableCars[carIndex]

        if(carIndex == -1) {
            throw new Error(`${model} was not found!`)
        }

        if(car.mileage > desiredMileage || desiredMileage <= 40000){
            this.totalIncome += this.availableCars[carIndex].price -= car.price * 0.05
        }else if(car.mileage > desiredMileage || desiredMileage > 40000){
            this.totalIncome += this.availableCars[carIndex].price -= car.price * 0.1
        }else{
            this.totalIncome += car.price
        }

        this.soldCars.push({
            model: car.model,
            horsepower: car.horsepower,
            soldPrice: car.price
        })
        this.availableCars.splice(carIndex, 1)

        return `${model} was sold for ${car.price.toFixed(2)}$`
    }

    currentCar () {
        let firstLine = '-Available cars:' + '\n'
        let secondLine = this.availableCars.map(c => `---${c.model} - ${c.horsepower} HP - ${c.mileage.toFixed(2)} km - ${c.price.toFixed(2)}$`).join('\n')
        let result = firstLine + secondLine
        return result
    }

    salesReport (criteria) {
        let result = [];

        result.push(`-${this.name} has a total income of ${this.totalIncome.toFixed(2)}$`);
        result.push(`-${this.soldCars.length} cars sold:`);

        if(!criteria == 'horsepower' || !criteria == 'model'){
            throw new Error("Invalid criteria!")
        }
        
        if (criteria == 'horsepower') {
            this.soldCars.sort((a, b) => b.horsepower - a.horsepower)
        }else{
            this.soldCars.sort((a, b) => a.model.localeCompare(b.model))
        }

        this.soldCars.forEach(car => result.push(`---${car.model} - ${car.horsepower} HP - ${car.soldPrice.toFixed(2)}$`))
        
        return result.join('\n')

    }
}
let dealership = new CarDealership('SoftAuto');
dealership.addCar('Toyota Corolla', 100, 3500, 190000);
dealership.addCar('Mercedes C63', 300, 29000, 187000);
dealership.addCar('Audi A3', 120, 4900, 240000);
dealership.sellCar('Toyota Corolla', 230000);
dealership.sellCar('Mercedes C63', 110000);
console.log(dealership.salesReport('horsepower'));




