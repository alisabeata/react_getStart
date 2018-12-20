import {sum, pushToArray, promiseTimeout, multipl} from '../example';


describe('example.js', () => {
  it('sum is work', () => {
    expect(sum(1, 2)).toEqual(3);
  });
  
  it('pushToArray return new array' , () => {
    const ar = [1, 2, 3];
  
    expect(pushToArray(ar, 4)).toEqual([1, 2, 3, 4]);
  });

  it('promiseTimeout return promise after timeout' , done => {
    expect(
      promiseTimeout(() => {
        done();
      }, 1000)
    ).toBeInstanceOf(Promise);
  });

  it('multipl' , () => {
    expect(multipl(100, 100)).toMatchSnapshot();
  });
});

