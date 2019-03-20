import LazyVin from '../src/lazy-vin-lib'
import { ALPHA_TO_NUMERICAL_MAP } from '../src/constants/transliteration-maps/alpha-to-numerical.map'

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

    it('#getRandomValidVin()', () => {
      spyOn(instance, 'getRandomCleanVin').and.returnValue(true)
      spyOn(instance, 'fixCheckDigit').and.returnValue(true)
      instance.getRandomValidVin()
      expect(instance.getRandomCleanVin).toHaveBeenCalled()
      expect(instance.fixCheckDigit).toHaveBeenLastCalledWith(true)
    })

    it('#getRandomDirtyVin', () => {
      const testEval = instance.getRandomDirtyVin()
      expect(mockVins).toContain(testEval)
    })

    it('#getRandomCleanVin', () => {
      const testEval = instance.getRandomCleanVin()
      expect(mockVins).not.toContain(testEval)
    })

    it('#_charIsNumber', () => {
      const testEval1 = instance['_charIsNumber']('1')
      const testEval2 = instance['_charIsNumber']('a')
      expect(testEval1).toBe(true)
      expect(testEval2).toBe(false)
    })

    describe('#_getNumericalValuesAsArray', () => {
      it('should push strings that are probably numbers', () => {
        const mockArr = ['1']
        const testEval = instance['_getNumericalValuesAsArray'](mockArr)
        expect(testEval).toContain(1)
      })

      it('should use alpha -> numerical map for non-numbers', () => {
        const mockArr = ['a']
        const testEval = instance['_getNumericalValuesAsArray'](mockArr)
        expect(testEval).toContain(1)
      })
    })

    it('#_getWeightedProductsArray', () => {
      const mockArr = [1]
      const testEval = instance['_getWeightedProductsArray'](mockArr)
      expect(testEval).toContain(8)
    })

    it('#fixCheckDigit', () => {
      const mockVin = '2HNYD2H65AH443950'
      const testEval = instance.fixCheckDigit(mockVin)
      expect(testEval).toBe('2HNYD2H62AH443950')
    })
  })
})

function spyOnPrivate(target: any, method: string): jasmine.Spy {
  return spyOn<any>(target, method)
}
