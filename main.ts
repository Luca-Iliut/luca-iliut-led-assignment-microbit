// initialize variables
function initvar () {
    // array of leds to be used when turning them on ( pressign B button)
    offlights = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    // empty array of leds to be used when turning them off ( pressign B button)
    onlights = []
    OnOff = true
}
// turn on one led at the time when pressing the A button
input.onButtonPressed(Button.A, function () {
    Turnonlight()
})
// turn on the lights randomly one by one
function Turnonlight () {
    // get the value of the element
    picked = randint(0, offlights.length - 1)
    // remove the element from the offlights array
    picked = offlights.removeAt(picked)
    // turn on the led using plot
    led.plot(picked % 5, picked / 5)
    onlights.push(picked)
    // if all leds have been turned on, just do a blink
    if (offlights.length == 0) {
        basic.pause(200)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.pause(100)
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        OnOff = false
    }
}
// reset by clearing the screen , print the reset string and initialize the variables
input.onButtonPressed(Button.AB, function () {
    basic.clearScreen()
    basic.showString("RESET")
    initvar()
})
// turn off one led at the time in the order they were turned on when pressing the B button
input.onButtonPressed(Button.B, function () {
    Turnofflight()
})
// turn off the lights in the order they were turned on  one by one
function Turnofflight () {
    picked = onlights.shift()
    led.unplot(picked % 5, picked / 5)
    // add to the offlights array
    offlights.push(picked)
    // if all leds have been turned off, do a blink
    if (onlights.length == 0) {
        basic.pause(200)
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        basic.pause(100)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        OnOff = true
    }
}
let picked = 0
let OnOff = false
let onlights: number[] = []
let offlights: number[] = []
initvar()
