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

        this.availableCars.push({model, horsepower, price, mileage})

        return `New car added: ${model} - ${horsepower} HP - ${mileage.toFixed(2)} km - ${price.toFixed(2)}$`
    }

    sellCar (model, desiredMileage) {
        let car = this.availableCars.find(c => c.model == model)

        if(!car) {
            throw new Error(`${model} was not found!`)
        }

        if(car.mileage - desiredMileage <= 40000 && car.mileage - desiredMileage > 0){
            car.price -= car.price / 20
        }else if(car.mileage - desiredMileage > 40000){
            car.price -= car.price / 10
        }

        this.soldCars.push({
            model: car.model,
            horsepower: car.horsepower,
            soldPrice: car.price
        })

        this.totalIncome += car.price
        this.availableCars.filter(c => c.model != model)

        return `${model} was sold for ${car.price.toFixed(2)}$`
    }

    currentCar () {
        if(this.availableCars.length > 0){
            let firstLine = '-Available cars:' + '\n'
            let secondLine = this.availableCars.map(c => `---${c.model} - ${c.horsepower} HP - ${c.mileage.toFixed(2)} km - ${c.price.toFixed(2)}$`).join('\n')
            let result = firstLine + secondLine
            return result
        }else{
            return "There are no available cars"
        }
    }

    salesReport (criteria) {
        let result = [];

        result.push(`-${this.name} has a total income of ${this.totalIncome.toFixed(2)}$`);
        result.push(`-${this.soldCars.length} cars sold:`);

        if (criteria == 'horsepower') {
            this.soldCars.sort((a, b) => b.horsepower - a.horsepower)
        }else if (criteria == 'model'){
            this.soldCars.sort((a, b) => a.model.localeCompare(b.model))
        }else {
            throw new Error("Invalid criteria!")
        }

        this.soldCars.forEach(car => result.push(`---${car.model} - ${car.horsepower} HP - ${car.soldPrice.toFixed(2)}$`))
        
        return result.join('\n')

    }
}
let dealership = new CarDealership('SoftAuto');
console.log(dealership.addCar('Toyota Corolla', 100, 3500, 190000));
console.log(dealership.addCar('Mercedes C63', 300, 29000, 187000));
console.log(dealership.addCar('', 120, 4900, 240000));







