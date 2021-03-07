const {calculateTip,celsiusToFahrenheit,fahrenheitToCelsius,sum} = require("../src/math")

test("should calculate total with tip", () => {
    const total = calculateTip(10, .3)    
    expect(total).toBe(13)
    // if (total !== 13){
    //     throw new Error("total should be not", total)
    // }
})
test("should calculat toal with default tip", () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})
test("Should convert 32 F to 0 C", () => {
    const celsius = fahrenheitToCelsius(32)
    expect(celsius).toBe(0)
})
test("Should convert 0 C to 32 F", () => {
    const farenheit = celsiusToFahrenheit(0)
    expect(farenheit).toBe(32)
})
// test("async test", () => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//     }, 2000)
// })
// test("async test", (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done() // this will make the function asynchronous
//     }, 2000)
// })
test("should calculate sum of two numbers", (done) => {
    sum(2, 4).then((value) => {
        expect(value).toBe(6)
        done()
    })
})

test("should calculate sum of two numbers async/await", async () => {
    let value = await sum(10, 22)
    expect(value).toBe(32)
})


