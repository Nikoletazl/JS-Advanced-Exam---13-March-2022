const {expect, util} = require('chai')
const { rentCar} = require('./rentCar.js')

describe('Test', () => {
    describe('searchCar', () => {
        it('happy case', () => {
            expect(rentCar.searchCar(["BMW", "AUDI"], "BMW")).to.equal(`There is 1 car of model BMW in the catalog!`)
            expect(rentCar.searchCar(["BMW", "BMW", "AUDI"], "BMW")).to.equal(`There is 2 car of model BMW in the catalog!`)
        });

        it('invalid input', () => {
            expect(() => rentCar.searchCar({}, 'A')).to.throw()
            expect(() => rentCar.searchCar(["A"], 5)).to.throw()
            expect(() => rentCar.searchCar({}, 5)).to.throw()
        })

        it('no matches', () => {
            expect(() => rentCar.searchCar([], "A")).to.throw()
            expect(() => rentCar.searchCar(["A", "B"], "C")).to.throw()
        })
    });

    describe('calculatePriceOfCar', () => {
        it('happy case', () => {
            expect(rentCar.calculatePriceOfCar("BMW", 1)).to.equal(`You choose BMW and it will cost $45!`)
            expect(rentCar.calculatePriceOfCar("Toyota", 2)).to.equal(`You choose Toyota and it will cost $80!`)
        })

        it('invalid input', () => {
            expect(() => rentCar.calculatePriceOfCar(1, 1)).to.throw('Invalid input!')
            expect(() => rentCar.calculatePriceOfCar(1, "1")).to.throw('Invalid input!')
            expect(() => rentCar.calculatePriceOfCar([], 1)).to.throw('Invalid input!')
            expect(() => rentCar.calculatePriceOfCar([], {})).to.throw('Invalid input!')
        })

        it("invalid model", () => {
            expect(() => rentCar.calculatePriceOfCar('a', 1)).to.throw('No such model in the catalog!')
            expect(() => rentCar.calculatePriceOfCar('bb', 1)).to.throw('No such model in the catalog!')
        })
    });

    describe('checkBudget', () => {
        it('happy case', () => {
            expect(rentCar.checkBudget(1, 1, 10)).to.equal(`You rent a car!`)
            expect(rentCar.checkBudget(1, 1, 1)).to.equal(`You rent a car!`)
        })

        it('invalid input', () => {
            expect(() => rentCar.checkBudget('1', 1, 1)).to.throw()
            expect(() => rentCar.checkBudget('1', '1', 1)).to.throw()
            expect(() => rentCar.checkBudget(1, '1', 1)).to.throw()
            expect(() => rentCar.checkBudget(1, 1, '1')).to.throw()
            expect(() => rentCar.checkBudget('1', '1', '1')).to.throw()
        })

        it('not enough budget', () => {
            expect(rentCar.checkBudget(2, 1, 1)).to.equal('You need a bigger budget!')
            expect(rentCar.checkBudget(1, 2, 1)).to.equal('You need a bigger budget!')
        })
    });
    
})