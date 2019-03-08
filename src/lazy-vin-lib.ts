import { HARD_CODED_VINS } from './constants/hard-coded-vins'

// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
export default class LazyVin {
  private vinList: string[]

  constructor() {
    this.vinList = [...HARD_CODED_VINS]
  }

  /**
   * getRandomDirtyVin
   */
  public getRandomDirtyVin(): string {
    return this.vinList[Math.floor(Math.random() * this.vinList.length)]
  }

  public getRandomCleanVin(): string {
    const dirtyVin = this.getRandomDirtyVin()
    let cleanVin = dirtyVin.substring(0, dirtyVin.length - 6)
    for (let i = 0; i < 6; i++) {
      cleanVin += Math.floor(Math.random() * 10)
    }
    return cleanVin
  }
}
