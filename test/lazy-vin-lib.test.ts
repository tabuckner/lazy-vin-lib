import LazyVin from '../src/lazy-vin-lib'

/**
 * LazyVin Tests
 */
describe('LazyVin', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('LazyVin is instantiable', () => {
    expect(new LazyVin()).toBeInstanceOf(LazyVin)
  })

  describe('LazyVin', () => {
    let instance: LazyVin
    let mockVins = [
      'JM1GJ1W50E1103389',
      '1HGCR2F36FA110796',
      '1GNFK130X8J232849',
      'JTHBK1GG7D2006639'
    ]

    beforeEach(() => {
      instance = new LazyVin()
      spyOnPrivate(instance, 'vinList').and.returnValue(mockVins)
    })

    it('#getRandomDirtyVin', () => {
      const testEval = instance.getRandomDirtyVin()
      expect(mockVins).toContain(testEval)
    })

    it('#getRandomCleanVin', () => {
      const testEval = instance.getRandomCleanVin()
      expect(mockVins).not.toContain(testEval)
    })
  })
})

function spyOnPrivate(target: any, method: string): jasmine.Spy {
  return spyOn<any>(target, method)
}
