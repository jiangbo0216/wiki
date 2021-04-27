# Globals

* test: 别名(alias) it(name, fn, timeout = 5000) 5s 之后abort

In your test files, Jest puts each of these methods and objects into the global environment. You don't have to require or import anything to use them. However, if you prefer explicit imports, you can do `import {describe, expect, test} from '@jest/globals'`.

## Methods[#](https://jestjs.io/docs/api#methods)

* [`afterAll(fn, timeout)`](https://jestjs.io/docs/api#afterallfn-timeout)
* [`afterEach(fn, timeout)`](https://jestjs.io/docs/api#aftereachfn-timeout)
* [`beforeAll(fn, timeout)`](https://jestjs.io/docs/api#beforeallfn-timeout)
* [`beforeEach(fn, timeout)`](https://jestjs.io/docs/api#beforeeachfn-timeout)
* [`describe(name, fn)`](https://jestjs.io/docs/api#describename-fn)
* [`describe.each(table)(name, fn, timeout)`](https://jestjs.io/docs/api#describeeachtablename-fn-timeout)
* [`describe.only(name, fn)`](https://jestjs.io/docs/api#describeonlyname-fn)
* [`describe.only.each(table)(name, fn)`](https://jestjs.io/docs/api#describeonlyeachtablename-fn)
* [`describe.skip(name, fn)`](https://jestjs.io/docs/api#describeskipname-fn)
* [`describe.skip.each(table)(name, fn)`](https://jestjs.io/docs/api#describeskipeachtablename-fn)
* [`test(name, fn, timeout)`](https://jestjs.io/docs/api#testname-fn-timeout)
* [`test.concurrent(name, fn, timeout)`](https://jestjs.io/docs/api#testconcurrentname-fn-timeout)
* [`test.concurrent.each(table)(name, fn, timeout)`](https://jestjs.io/docs/api#testconcurrenteachtablename-fn-timeout)
* [`test.concurrent.only.each(table)(name, fn)`](https://jestjs.io/docs/api#testconcurrentonlyeachtablename-fn)
* [`test.concurrent.skip.each(table)(name, fn)`](https://jestjs.io/docs/api#testconcurrentskipeachtablename-fn)
* [`test.each(table)(name, fn, timeout)`](https://jestjs.io/docs/api#testeachtablename-fn-timeout)
* [`test.only(name, fn, timeout)`](https://jestjs.io/docs/api#testonlyname-fn-timeout)
* [`test.only.each(table)(name, fn)`](https://jestjs.io/docs/api#testonlyeachtablename-fn-1)
* [`test.skip(name, fn)`](https://jestjs.io/docs/api#testskipname-fn)
* [`test.skip.each(table)(name, fn)`](https://jestjs.io/docs/api#testskipeachtablename-fn)
* [`test.todo(name)`](https://jestjs.io/docs/api#testtodoname)

------

## Reference[#](https://jestjs.io/docs/api#reference)

### `afterAll(fn, timeout)`[#](https://jestjs.io/docs/api#afterallfn-timeout)

Runs a function after all the tests in this file have completed. If the function returns a promise or is a generator, Jest waits for that promise to resolve before continuing.

Optionally, you can provide a `timeout` (in milliseconds) for specifying how long to wait before aborting. *Note: The default timeout is 5 seconds.*

This is often useful if you want to clean up some global setup state that is shared across tests.

For example:

```js
const globalDatabase = makeGlobalDatabase();

function cleanUpDatabase(db) {
  db.cleanUp();
}

afterAll(() => {
  cleanUpDatabase(globalDatabase);
});

test('can find things', () => {
  return globalDatabase.find('thing', {}, results => {
    expect(results.length).toBeGreaterThan(0);
  });
});

test('can insert a thing', () => {
  return globalDatabase.insert('thing', makeThing(), response => {
    expect(response.success).toBeTruthy();
  });
});
```

Here the `afterAll` ensures that `cleanUpDatabase` is called after all tests run.

If `afterAll` is inside a `describe` block, it runs at the end of the describe block.

If you want to run some cleanup after every test instead of after all tests, use `afterEach` instead.

### `afterEach(fn, timeout)`[#](https://jestjs.io/docs/api#aftereachfn-timeout)

Runs a function after each one of the tests in this file completes. If the function returns a promise or is a generator, Jest waits for that promise to resolve before continuing.

Optionally, you can provide a `timeout` (in milliseconds) for specifying how long to wait before aborting. *Note: The default timeout is 5 seconds.*

This is often useful if you want to clean up some temporary state that is created by each test.

For example:

const globalDatabase = makeGlobalDatabase();

function cleanUpDatabase(db) {

  db.cleanUp();

}

afterEach(() => {

  cleanUpDatabase(globalDatabase);

});

test('can find things', () => {

  return globalDatabase.find('thing', {}, results => {

​    expect(results.length).toBeGreaterThan(0);

  });

});

test('can insert a thing', () => {

  return globalDatabase.insert('thing', makeThing(), response => {

​    expect(response.success).toBeTruthy();

  });

});

Copy

Here the `afterEach` ensures that `cleanUpDatabase` is called after each test runs.

If `afterEach` is inside a `describe` block, it only runs after the tests that are inside this describe block.

If you want to run some cleanup just once, after all of the tests run, use `afterAll` instead.

### `beforeAll(fn, timeout)`[#](https://jestjs.io/docs/api#beforeallfn-timeout)

Runs a function before any of the tests in this file run. If the function returns a promise or is a generator, Jest waits for that promise to resolve before running tests.

Optionally, you can provide a `timeout` (in milliseconds) for specifying how long to wait before aborting. *Note: The default timeout is 5 seconds.*

This is often useful if you want to set up some global state that will be used by many tests.

For example:

const globalDatabase = makeGlobalDatabase();

beforeAll(() => {

  // Clears the database and adds some testing data.

  // Jest will wait for this promise to resolve before running tests.

  return globalDatabase.clear().then(() => {

​    return globalDatabase.insert({testData: 'foo'});

  });

});

// Since we only set up the database once in this example, it's important

// that our tests don't modify it.

test('can find things', () => {

  return globalDatabase.find('thing', {}, results => {

​    expect(results.length).toBeGreaterThan(0);

  });

});

Copy

Here the `beforeAll` ensures that the database is set up before tests run. If setup was synchronous, you could do this without `beforeAll`. The key is that Jest will wait for a promise to resolve, so you can have asynchronous setup as well.

If `beforeAll` is inside a `describe` block, it runs at the beginning of the describe block.

If you want to run something before every test instead of before any test runs, use `beforeEach` instead.

### `beforeEach(fn, timeout)`[#](https://jestjs.io/docs/api#beforeeachfn-timeout)

Runs a function before each of the tests in this file runs. If the function returns a promise or is a generator, Jest waits for that promise to resolve before running the test.

Optionally, you can provide a `timeout` (in milliseconds) for specifying how long to wait before aborting. *Note: The default timeout is 5 seconds.*

This is often useful if you want to reset some global state that will be used by many tests.

For example:

const globalDatabase = makeGlobalDatabase();

beforeEach(() => {

  // Clears the database and adds some testing data.

  // Jest will wait for this promise to resolve before running tests.

  return globalDatabase.clear().then(() => {

​    return globalDatabase.insert({testData: 'foo'});

  });

});

test('can find things', () => {

  return globalDatabase.find('thing', {}, results => {

​    expect(results.length).toBeGreaterThan(0);

  });

});

test('can insert a thing', () => {

  return globalDatabase.insert('thing', makeThing(), response => {

​    expect(response.success).toBeTruthy();

  });

});

Copy

Here the `beforeEach` ensures that the database is reset for each test.

If `beforeEach` is inside a `describe` block, it runs for each test in the describe block.

If you only need to run some setup code once, before any tests run, use `beforeAll` instead.

### `describe(name, fn)`[#](https://jestjs.io/docs/api#describename-fn)

`describe(name, fn)` creates a block that groups together several related tests. For example, if you have a `myBeverage` object that is supposed to be delicious but not sour, you could test it with:

const myBeverage = {

  delicious: true,

  sour: false,

};

describe('my beverage', () => {

  test('is delicious', () => {

​    expect(myBeverage.delicious).toBeTruthy();

  });

  test('is not sour', () => {

​    expect(myBeverage.sour).toBeFalsy();

  });

});

Copy

This isn't required - you can write the `test` blocks directly at the top level. But this can be handy if you prefer your tests to be organized into groups.

You can also nest `describe` blocks if you have a hierarchy of tests:

const binaryStringToNumber = binString => {

  if (!/^[01]+$/.test(binString)) {

​    throw new CustomError('Not a binary number.');

  }

  return parseInt(binString, 2);

};

describe('binaryStringToNumber', () => {

  describe('given an invalid binary string', () => {

​    test('composed of non-numbers throws CustomError', () => {

​      expect(() => binaryStringToNumber('abc')).toThrowError(CustomError);

​    });

​    test('with extra whitespace throws CustomError', () => {

​      expect(() => binaryStringToNumber('  100')).toThrowError(CustomError);

​    });

  });

  describe('given a valid binary string', () => {

​    test('returns the correct number', () => {

​      expect(binaryStringToNumber('100')).toBe(4);

​    });

  });

});

Copy

### `describe.each(table)(name, fn, timeout)`[#](https://jestjs.io/docs/api#describeeachtablename-fn-timeout)

Use `describe.each` if you keep duplicating the same test suites with different data. `describe.each` allows you to write the test suite once and pass data in.

`describe.each` is available with two APIs:

#### 1. `describe.each(table)(name, fn, timeout)`[#](https://jestjs.io/docs/api#1-describeeachtablename-fn-timeout)

* ```
  table
  ```

  :

  ```
  Array
  ```

  of Arrays with the arguments that are passed into the

  ```
  fn
  ```

  for each row.

  * *Note* If you pass in a 1D array of primitives, internally it will be mapped to a table i.e. `[1, 2, 3] -> [[1], [2], [3]]`

* ```
  name
  ```

  :

  ```
  String
  ```

  the title of the test suite.

  * Generate unique test titles by positionally injecting parameters with

    `printf` formatting

    :

    * `%p` - [pretty-format](https://www.npmjs.com/package/pretty-format).
    * `%s`- String.
    * `%d`- Number.
    * `%i` - Integer.
    * `%f` - Floating point value.
    * `%j` - JSON.
    * `%o` - Object.
    * `%#` - Index of the test case.
    * `%%` - single percent sign ('%'). This does not consume an argument.

* `fn`: `Function` the suite of tests to be ran, this is the function that will receive the parameters in each row as function arguments.

* Optionally, you can provide a `timeout` (in milliseconds) for specifying how long to wait for each row before aborting. *Note: The default timeout is 5 seconds.*

Example:

describe.each([

  [1, 1, 2],

  [1, 2, 3],

  [2, 1, 3],

])('.add(%i, %i)', (a, b, expected) => {

  test(`returns ${expected}`, () => {

​    expect(a + b).toBe(expected);

  });

  test(`returned value not be greater than ${expected}`, () => {

​    expect(a + b).not.toBeGreaterThan(expected);

  });

  test(`returned value not be less than ${expected}`, () => {

​    expect(a + b).not.toBeLessThan(expected);

  });

});

Copy

#### 2. `describe.each`table`(name, fn, timeout)`[#](https://jestjs.io/docs/api#2-describeeachtablename-fn-timeout)

* ```
  table
  ```

  :

  ```
  Tagged Template Literal
  ```

  * First row of variable name column headings separated with `|`
  * One or more subsequent rows of data supplied as template literal expressions using `${value}` syntax.

* ```
  name
  ```

  :

  ```
  String
  ```

  the title of the test suite, use

  ```
  $variable
  ```

  to inject test data into the suite title from the tagged template expressions.

  * To inject nested object values use you can supply a keyPath i.e. `$variable.path.to.value`

* `fn`: `Function` the suite of tests to be ran, this is the function that will receive the test data object.

* Optionally, you can provide a `timeout` (in milliseconds) for specifying how long to wait for each row before aborting. *Note: The default timeout is 5 seconds.*

Example:

describe.each`

  a    | b    | expected

  ${1} | ${1} | ${2}

  ${1} | ${2} | ${3}

  ${2} | ${1} | ${3}

`('$a + $b', ({a, b, expected}) => {

  test(`returns ${expected}`, () => {

​    expect(a + b).toBe(expected);

  });

  test(`returned value not be greater than ${expected}`, () => {

​    expect(a + b).not.toBeGreaterThan(expected);

  });

  test(`returned value not be less than ${expected}`, () => {

​    expect(a + b).not.toBeLessThan(expected);

  });

});

Copy

### `describe.only(name, fn)`[#](https://jestjs.io/docs/api#describeonlyname-fn)

Also under the alias: `fdescribe(name, fn)`

You can use `describe.only` if you want to run only one describe block:

describe.only('my beverage', () => {

  test('is delicious', () => {

​    expect(myBeverage.delicious).toBeTruthy();

  });

  test('is not sour', () => {

​    expect(myBeverage.sour).toBeFalsy();

  });

});

describe('my other beverage', () => {

  // ... will be skipped

});

Copy

### `describe.only.each(table)(name, fn)`[#](https://jestjs.io/docs/api#describeonlyeachtablename-fn)

Also under the aliases: `fdescribe.each(table)(name, fn)` and `fdescribe.each`table`(name, fn)`

Use `describe.only.each` if you want to only run specific tests suites of data driven tests.

`describe.only.each` is available with two APIs:

#### `describe.only.each(table)(name, fn)`[#](https://jestjs.io/docs/api#describeonlyeachtablename-fn-1)

describe.only.each([

  [1, 1, 2],

  [1, 2, 3],

  [2, 1, 3],

])('.add(%i, %i)', (a, b, expected) => {

  test(`returns ${expected}`, () => {

​    expect(a + b).toBe(expected);

  });

});

test('will not be ran', () => {

  expect(1 / 0).toBe(Infinity);

});

Copy

#### `describe.only.each`table`(name, fn)`[#](https://jestjs.io/docs/api#describeonlyeachtablename-fn-2)

describe.only.each`

  a    | b    | expected

  ${1} | ${1} | ${2}

  ${1} | ${2} | ${3}

  ${2} | ${1} | ${3}

`('returns $expected when $a is added $b', ({a, b, expected}) => {

  test('passes', () => {

​    expect(a + b).toBe(expected);

  });

});

test('will not be ran', () => {

  expect(1 / 0).toBe(Infinity);

});

Copy

### `describe.skip(name, fn)`[#](https://jestjs.io/docs/api#describeskipname-fn)

Also under the alias: `xdescribe(name, fn)`

You can use `describe.skip` if you do not want to run a particular describe block:

describe('my beverage', () => {

  test('is delicious', () => {

​    expect(myBeverage.delicious).toBeTruthy();

  });

  test('is not sour', () => {

​    expect(myBeverage.sour).toBeFalsy();

  });

});

describe.skip('my other beverage', () => {

  // ... will be skipped

});

Copy

Using `describe.skip` is often a cleaner alternative to temporarily commenting out a chunk of tests.

### `describe.skip.each(table)(name, fn)`[#](https://jestjs.io/docs/api#describeskipeachtablename-fn)

Also under the aliases: `xdescribe.each(table)(name, fn)` and `xdescribe.each`table`(name, fn)`

Use `describe.skip.each` if you want to stop running a suite of data driven tests.

`describe.skip.each` is available with two APIs:

#### `describe.skip.each(table)(name, fn)`[#](https://jestjs.io/docs/api#describeskipeachtablename-fn-1)

describe.skip.each([

  [1, 1, 2],

  [1, 2, 3],

  [2, 1, 3],

])('.add(%i, %i)', (a, b, expected) => {

  test(`returns ${expected}`, () => {

​    expect(a + b).toBe(expected); // will not be ran

  });

});

test('will be ran', () => {

  expect(1 / 0).toBe(Infinity);

});

Copy

#### `describe.skip.each`table`(name, fn)`[#](https://jestjs.io/docs/api#describeskipeachtablename-fn-2)

describe.skip.each`

  a    | b    | expected

  ${1} | ${1} | ${2}

  ${1} | ${2} | ${3}

  ${2} | ${1} | ${3}

`('returns $expected when $a is added $b', ({a, b, expected}) => {

  test('will not be ran', () => {

​    expect(a + b).toBe(expected); // will not be ran

  });

});

test('will be ran', () => {

  expect(1 / 0).toBe(Infinity);

});

Copy

### `test(name, fn, timeout)`[#](https://jestjs.io/docs/api#testname-fn-timeout)

Also under the alias: `it(name, fn, timeout)`

All you need in a test file is the `test` method which runs a test. For example, let's say there's a function `inchesOfRain()` that should be zero. Your whole test could be:

test('did not rain', () => {

  expect(inchesOfRain()).toBe(0);

});

Copy

The first argument is the test name; the second argument is a function that contains the expectations to test. The third argument (optional) is `timeout` (in milliseconds) for specifying how long to wait before aborting. *Note: The default timeout is 5 seconds.*

> Note: If a **promise is returned** from `test`, Jest will wait for the promise to resolve before letting the test complete. Jest will also wait if you **provide an argument to the test function**, usually called `done`. This could be handy when you want to test callbacks. See how to test async code [here](https://jestjs.io/docs/asynchronous#callbacks).

For example, let's say `fetchBeverageList()` returns a promise that is supposed to resolve to a list that has `lemon` in it. You can test this with:

test('has lemon in it', () => {

  return fetchBeverageList().then(list => {

​    expect(list).toContain('lemon');

  });

});

Copy

Even though the call to `test` will return right away, the test doesn't complete until the promise resolves as well.

### `test.concurrent(name, fn, timeout)`[#](https://jestjs.io/docs/api#testconcurrentname-fn-timeout)

Also under the alias: `it.concurrent(name, fn, timeout)`

Use `test.concurrent` if you want the test to run concurrently.

> Note: `test.concurrent` is considered experimental - see [here](<https://github.com/facebook/jest/labels/Area%3A> Concurrent) for details on missing features and other issues

The first argument is the test name; the second argument is an asynchronous function that contains the expectations to test. The third argument (optional) is `timeout` (in milliseconds) for specifying how long to wait before aborting. *Note: The default timeout is 5 seconds.*

test.concurrent('addition of 2 numbers', async () => {

  expect(5 + 3).toBe(8);

});

test.concurrent('subtraction 2 numbers', async () => {

  expect(5 - 3).toBe(2);

});

Copy

> Note: Use `maxConcurrency` in configuration to prevents Jest from executing more than the specified amount of tests at the same time

### `test.concurrent.each(table)(name, fn, timeout)`[#](https://jestjs.io/docs/api#testconcurrenteachtablename-fn-timeout)

Also under the alias: `it.concurrent.each(table)(name, fn, timeout)`

Use `test.concurrent.each` if you keep duplicating the same test with different data. `test.each` allows you to write the test once and pass data in, the tests are all run asynchronously.

`test.concurrent.each` is available with two APIs:

#### 1. `test.concurrent.each(table)(name, fn, timeout)`[#](https://jestjs.io/docs/api#1-testconcurrenteachtablename-fn-timeout)

* ```
  table
  ```

  :

  ```
  Array
  ```

  of Arrays with the arguments that are passed into the test

  ```
  fn
  ```

  for each row.

  * *Note* If you pass in a 1D array of primitives, internally it will be mapped to a table i.e. `[1, 2, 3] -> [[1], [2], [3]]`

* ```
  name
  ```

  :

  ```
  String
  ```

  the title of the test block.

  * Generate unique test titles by positionally injecting parameters with

    `printf` formatting

    :

    * `%p` - [pretty-format](https://www.npmjs.com/package/pretty-format).
    * `%s`- String.
    * `%d`- Number.
    * `%i` - Integer.
    * `%f` - Floating point value.
    * `%j` - JSON.
    * `%o` - Object.
    * `%#` - Index of the test case.
    * `%%` - single percent sign ('%'). This does not consume an argument.

* `fn`: `Function` the test to be ran, this is the function that will receive the parameters in each row as function arguments, **this will have to be an asynchronous function**.

* Optionally, you can provide a `timeout` (in milliseconds) for specifying how long to wait for each row before aborting. *Note: The default timeout is 5 seconds.*

Example:

test.concurrent.each([

  [1, 1, 2],

  [1, 2, 3],

  [2, 1, 3],

])('.add(%i, %i)', (a, b, expected) => {

  expect(a + b).toBe(expected);

});

Copy

#### 2. `test.concurrent.each`table`(name, fn, timeout)`[#](https://jestjs.io/docs/api#2-testconcurrenteachtablename-fn-timeout)

* ```
  table
  ```

  :

  ```
  Tagged Template Literal
  ```

  * First row of variable name column headings separated with `|`
  * One or more subsequent rows of data supplied as template literal expressions using `${value}` syntax.

* ```
  name
  ```

  :

  ```
  String
  ```

  the title of the test, use

  ```
  $variable
  ```

  to inject test data into the test title from the tagged template expressions.

  * To inject nested object values use you can supply a keyPath i.e. `$variable.path.to.value`

* `fn`: `Function` the test to be ran, this is the function that will receive the test data object, **this will have to be an asynchronous function**.

* Optionally, you can provide a `timeout` (in milliseconds) for specifying how long to wait for each row before aborting. *Note: The default timeout is 5 seconds.*

Example:

test.concurrent.each`

  a    | b    | expected

  ${1} | ${1} | ${2}

  ${1} | ${2} | ${3}

  ${2} | ${1} | ${3}

`('returns $expected when $a is added $b', ({a, b, expected}) => {

  expect(a + b).toBe(expected);

});

Copy

### `test.concurrent.only.each(table)(name, fn)`[#](https://jestjs.io/docs/api#testconcurrentonlyeachtablename-fn)

Also under the alias: `it.concurrent.only.each(table)(name, fn)`

Use `test.concurrent.only.each` if you want to only run specific tests with different test data concurrently.

`test.concurrent.only.each` is available with two APIs:

#### `test.concurrent.only.each(table)(name, fn)`[#](https://jestjs.io/docs/api#testconcurrentonlyeachtablename-fn-1)

test.concurrent.only.each([

  [1, 1, 2],

  [1, 2, 3],

  [2, 1, 3],

])('.add(%i, %i)', async (a, b, expected) => {

  expect(a + b).toBe(expected);

});

test('will not be ran', () => {

  expect(1 / 0).toBe(Infinity);

});

Copy

#### `test.only.each`table`(name, fn)`[#](https://jestjs.io/docs/api#testonlyeachtablename-fn)

test.concurrent.only.each`

  a    | b    | expected

  ${1} | ${1} | ${2}

  ${1} | ${2} | ${3}

  ${2} | ${1} | ${3}

`('returns $expected when $a is added $b', async ({a, b, expected}) => {

  expect(a + b).toBe(expected);

});

test('will not be ran', () => {

  expect(1 / 0).toBe(Infinity);

});

Copy

### `test.concurrent.skip.each(table)(name, fn)`[#](https://jestjs.io/docs/api#testconcurrentskipeachtablename-fn)

Also under the alias: `it.concurrent.skip.each(table)(name, fn)`

Use `test.concurrent.skip.each` if you want to stop running a collection of asynchronous data driven tests.

`test.concurrent.skip.each` is available with two APIs:

#### `test.concurrent.skip.each(table)(name, fn)`[#](https://jestjs.io/docs/api#testconcurrentskipeachtablename-fn-1)

test.concurrent.skip.each([

  [1, 1, 2],

  [1, 2, 3],

  [2, 1, 3],

])('.add(%i, %i)', async (a, b, expected) => {

  expect(a + b).toBe(expected); // will not be ran

});

test('will be ran', () => {

  expect(1 / 0).toBe(Infinity);

});

Copy

#### `test.concurrent.skip.each`table`(name, fn)`[#](https://jestjs.io/docs/api#testconcurrentskipeachtablename-fn-2)

test.concurrent.skip.each`

  a    | b    | expected

  ${1} | ${1} | ${2}

  ${1} | ${2} | ${3}

  ${2} | ${1} | ${3}

`('returns $expected when $a is added $b', async ({a, b, expected}) => {

  expect(a + b).toBe(expected); // will not be ran

});

test('will be ran', () => {

  expect(1 / 0).toBe(Infinity);

});

Copy

### `test.each(table)(name, fn, timeout)`[#](https://jestjs.io/docs/api#testeachtablename-fn-timeout)

Also under the alias: `it.each(table)(name, fn)` and `it.each`table`(name, fn)`

Use `test.each` if you keep duplicating the same test with different data. `test.each` allows you to write the test once and pass data in.

`test.each` is available with two APIs:

#### 1. `test.each(table)(name, fn, timeout)`[#](https://jestjs.io/docs/api#1-testeachtablename-fn-timeout)

* ```
  table
  ```

  :

  ```
  Array
  ```

  of Arrays with the arguments that are passed into the test

  ```
  fn
  ```

  for each row.

  * *Note* If you pass in a 1D array of primitives, internally it will be mapped to a table i.e. `[1, 2, 3] -> [[1], [2], [3]]`

* ```
  name
  ```

  :

  ```
  String
  ```

  the title of the test block.

  * Generate unique test titles by positionally injecting parameters with

    `printf` formatting

    :

    * `%p` - [pretty-format](https://www.npmjs.com/package/pretty-format).
    * `%s`- String.
    * `%d`- Number.
    * `%i` - Integer.
    * `%f` - Floating point value.
    * `%j` - JSON.
    * `%o` - Object.
    * `%#` - Index of the test case.
    * `%%` - single percent sign ('%'). This does not consume an argument.

* `fn`: `Function` the test to be ran, this is the function that will receive the parameters in each row as function arguments.

* Optionally, you can provide a `timeout` (in milliseconds) for specifying how long to wait for each row before aborting. *Note: The default timeout is 5 seconds.*

Example:

test.each([

  [1, 1, 2],

  [1, 2, 3],

  [2, 1, 3],

])('.add(%i, %i)', (a, b, expected) => {

  expect(a + b).toBe(expected);

});

Copy

#### 2. `test.each`table`(name, fn, timeout)`[#](https://jestjs.io/docs/api#2-testeachtablename-fn-timeout)

* ```
  table
  ```

  :

  ```
  Tagged Template Literal
  ```

  * First row of variable name column headings separated with `|`
  * One or more subsequent rows of data supplied as template literal expressions using `${value}` syntax.

* ```
  name
  ```

  :

  ```
  String
  ```

  the title of the test, use

  ```
  $variable
  ```

  to inject test data into the test title from the tagged template expressions.

  * To inject nested object values use you can supply a keyPath i.e. `$variable.path.to.value`

* `fn`: `Function` the test to be ran, this is the function that will receive the test data object.

* Optionally, you can provide a `timeout` (in milliseconds) for specifying how long to wait for each row before aborting. *Note: The default timeout is 5 seconds.*

Example:

test.each`

  a    | b    | expected

  ${1} | ${1} | ${2}

  ${1} | ${2} | ${3}

  ${2} | ${1} | ${3}

`('returns $expected when $a is added $b', ({a, b, expected}) => {

  expect(a + b).toBe(expected);

});

Copy

### `test.only(name, fn, timeout)`[#](https://jestjs.io/docs/api#testonlyname-fn-timeout)

Also under the aliases: `it.only(name, fn, timeout)`, and `fit(name, fn, timeout)`

When you are debugging a large test file, you will often only want to run a subset of tests. You can use `.only` to specify which tests are the only ones you want to run in that test file.

Optionally, you can provide a `timeout` (in milliseconds) for specifying how long to wait before aborting. *Note: The default timeout is 5 seconds.*

For example, let's say you had these tests:

test.only('it is raining', () => {

  expect(inchesOfRain()).toBeGreaterThan(0);

});

test('it is not snowing', () => {

  expect(inchesOfSnow()).toBe(0);

});

Copy

Only the "it is raining" test will run in that test file, since it is run with `test.only`.

Usually you wouldn't check code using `test.only` into source control - you would use it for debugging, and remove it once you have fixed the broken tests.

### `test.only.each(table)(name, fn)`[#](https://jestjs.io/docs/api#testonlyeachtablename-fn-1)

Also under the aliases: `it.only.each(table)(name, fn)`, `fit.each(table)(name, fn)`, `it.only.each`table`(name, fn)` and `fit.each`table`(name, fn)`

Use `test.only.each` if you want to only run specific tests with different test data.

`test.only.each` is available with two APIs:

#### `test.only.each(table)(name, fn)`[#](https://jestjs.io/docs/api#testonlyeachtablename-fn-2)

test.only.each([

  [1, 1, 2],

  [1, 2, 3],

  [2, 1, 3],

])('.add(%i, %i)', (a, b, expected) => {

  expect(a + b).toBe(expected);

});

test('will not be ran', () => {

  expect(1 / 0).toBe(Infinity);

});

Copy

#### `test.only.each`table`(name, fn)`[#](https://jestjs.io/docs/api#testonlyeachtablename-fn-3)

test.only.each`

  a    | b    | expected

  ${1} | ${1} | ${2}

  ${1} | ${2} | ${3}

  ${2} | ${1} | ${3}

`('returns $expected when $a is added $b', ({a, b, expected}) => {

  expect(a + b).toBe(expected);

});

test('will not be ran', () => {

  expect(1 / 0).toBe(Infinity);

});

Copy

### `test.skip(name, fn)`[#](https://jestjs.io/docs/api#testskipname-fn)

Also under the aliases: `it.skip(name, fn)`, `xit(name, fn)`, and `xtest(name, fn)`

When you are maintaining a large codebase, you may sometimes find a test that is temporarily broken for some reason. If you want to skip running this test, but you don't want to delete this code, you can use `test.skip` to specify some tests to skip.

For example, let's say you had these tests:

test('it is raining', () => {

  expect(inchesOfRain()).toBeGreaterThan(0);

});

test.skip('it is not snowing', () => {

  expect(inchesOfSnow()).toBe(0);

});

Copy

Only the "it is raining" test will run, since the other test is run with `test.skip`.

You could comment the test out, but it's often a bit nicer to use `test.skip` because it will maintain indentation and syntax highlighting.

### `test.skip.each(table)(name, fn)`[#](https://jestjs.io/docs/api#testskipeachtablename-fn)

Also under the aliases: `it.skip.each(table)(name, fn)`, `xit.each(table)(name, fn)`, `xtest.each(table)(name, fn)`, `it.skip.each`table`(name, fn)`, `xit.each`table`(name, fn)` and `xtest.each`table`(name, fn)`

Use `test.skip.each` if you want to stop running a collection of data driven tests.

`test.skip.each` is available with two APIs:

#### `test.skip.each(table)(name, fn)`[#](https://jestjs.io/docs/api#testskipeachtablename-fn-1)

test.skip.each([

  [1, 1, 2],

  [1, 2, 3],

  [2, 1, 3],

])('.add(%i, %i)', (a, b, expected) => {

  expect(a + b).toBe(expected); // will not be ran

});

test('will be ran', () => {

  expect(1 / 0).toBe(Infinity);

});

Copy

#### `test.skip.each`table`(name, fn)`[#](https://jestjs.io/docs/api#testskipeachtablename-fn-2)

test.skip.each`

  a    | b    | expected

  ${1} | ${1} | ${2}

  ${1} | ${2} | ${3}

  ${2} | ${1} | ${3}

`('returns $expected when $a is added $b', ({a, b, expected}) => {

  expect(a + b).toBe(expected); // will not be ran

});

test('will be ran', () => {

  expect(1 / 0).toBe(Infinity);

});

Copy

### `test.todo(name)`[#](https://jestjs.io/docs/api#testtodoname)

Also under the alias: `it.todo(name)`

Use `test.todo` when you are planning on writing tests. These tests will be highlighted in the summary output at the end so you know how many tests you still need todo.

*Note*: If you supply a test callback function then the `test.todo` will throw an error. If you have already implemented the test and it is broken and you do not want it to run, then use `test.skip` instead.

#### API[#](https://jestjs.io/docs/api#api)

* `name`: `String` the title of the test plan.

Example:

const add = (a, b) => a + b;

test.todo('add should be associative');
