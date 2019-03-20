import { HARD_CODED_VINS } from './constants/hard-coded-vins'
import { ALPHA_TO_NUMERICAL_MAP } from './constants/transliteration-maps/alpha-to-numerical.map'
import { VIN_CHARACTER_WEIGHTS } from './constants/vin-character-weights.map'
import { CD_VAL_TO_VIN_CHAR_MAP } from './constants/transliteration-maps/check-digit-value-to-vin-char.map'

// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
export default class LazyVin {
  private vinList: string[]

  constructor() {
    this.vinList = [...HARD_CODED_VINS]
  }

  /**
   * Returns a random VIN with: a random final six numerical digits, and a valid Check Digit.
   */
  public getRandomValidVin(): string {
    const vin = this.getRandomCleanVin()
    return this.fixCheckDigit(vin)
  }

  /**
   * Returns a random VIN from the library's list of VINs.
   */
  public getRandomDirtyVin(): string {
    return this.vinList[Math.floor(Math.random() * this.vinList.length)]
  }

  /**
   * Returns a random VIN with: a random final six numerical digits.
   */
  public getRandomCleanVin(): string {
    const dirtyVin = this.getRandomDirtyVin()
    let cleanVin = dirtyVin.substring(0, dirtyVin.length - 6)
    for (let i = 0; i < 6; i++) {
      cleanVin += Math.floor(Math.random() * 10)
    }
    return cleanVin
  }

  /**
   * Given a North American VIN number, returns a VIN number with a valid check digit.
   * @param vin North American VIN number.
   */
  public fixCheckDigit(vin: string) {
    const checkDigitModuloDivisor = 11
    const checkDigitIndex = 8 // NOTE: The 9th character in the VIN.
    // Split into array of characters
    const charArray: any[] = vin.split('')
    // Set checkDigitIndex value to 0 // NOTE: We set to zero to make the summation easier later on.
    charArray[checkDigitIndex] = 0
    // Begin transliteration using alpha => number map
    const numericalValuesArray = this._getNumericalValuesAsArray(charArray)
    // Begin weightedMultiplication
    const weightedProductsArray = this._getWeightedProductsArray(numericalValuesArray)
    // Sum the products array
    const sum = weightedProductsArray.reduce((total, num) => total + num)
    // Get the value of sum % 11
    const modulo = sum % checkDigitModuloDivisor
    // Transliterate that value using checkDigitValue => vinCharacter map
    const checkDigitCharacter = CD_VAL_TO_VIN_CHAR_MAP[modulo]
    charArray[checkDigitIndex] = checkDigitCharacter
    return charArray.join('')
  }

  private _getWeightedProductsArray(arr: number[]): number[] {
    const returnArray = []

    for (let i = 0; i < arr.length; i++) {
      const characterValue = arr[i]
      const weightedMultiplier = VIN_CHARACTER_WEIGHTS[i + 1]
      // Multiply using the map of weights
      returnArray.push(characterValue * weightedMultiplier)
    }
    // Return array of products
    return returnArray
  }

  private _getNumericalValuesAsArray(arr: string[]): number[] {
    const numericalArray: number[] = []

    for (let character of arr) {
      // numerical values remain untouched
      if (this._charIsNumber(character)) {
        numericalArray.push(Number(character))
      } else {
        // alpha characters are replaced using the map
        numericalArray.push(ALPHA_TO_NUMERICAL_MAP[character.toLowerCase()]) // Map expects lower case;
      }
    }

    return numericalArray
  }

  private _charIsNumber(char: string): boolean {
    // NOTE: isNaN('a'); /* returns true */ isNaN('1'); /* returns false */
    return !isNaN(Number(char))
  }
}
