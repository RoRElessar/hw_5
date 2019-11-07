(function () {

    function isPrime(number) {
        for (let i = 2; i < number; i++) {
            if (number % i === 0) {
                return false;
            }
        }

        return number > 1;
    }

    function factorial(number) {
        let result = 1;

        for (let i = number; i > 0; i--) {
            result *= i;
        }

        return result;
    }

    function fib(index) {
        let fibArray = [0, 1];

        for (let i = 1; i <= 1000000; i++) {
            fibArray.push(fibArray[i] + fibArray[i - 1]);
        }

        return fibArray[index];

    }

    function isSorted(array) {
        const unsortedArray = array.slice(0);
        const sortedArray = array.sort();

        return unsortedArray.toString() === sortedArray.toString();
    }

    function indexOf(array, element) {
        let index = 0;

        array.forEach(function (el, i) {
            el === element ? index += i : index += 0;
        });

        if (!array.includes(element)) {
            index = -1;
        }

        return index;
    }

    function reverse(string) {
        const splitString = string.split('');
        let reverseStringArray = [];

        for (let i = splitString.length; i >= 0; i--) {
            reverseStringArray.push(splitString[i]);
        }

        return reverseStringArray.join('');
    }

    function isPalindrome(string) {
        const stringInLowerCaseNoSpaces = string.toLowerCase().split('').filter(function (el) {
            return el !== ' ';
        }).join('');

        return stringInLowerCaseNoSpaces === reverse(stringInLowerCaseNoSpaces);
    }

    function missing(array) {
        let missingElements = [];

        function sort(numberArray) {
            numberArray.sort(function (a, b) {
                return a - b;
            });
        }

        sort(array);

        for (let i = 0; i < array.length; i++) {
            if (i !== array.length - 1 && array[i + 1] - array[i] > 1) {

                for (let j = array[i] + 1; j < array[i + 1]; j++) {
                    missingElements.push(j);
                }

            }

        }

        sort(missingElements);
        return missingElements;
    }

    function isBalanced(string) {
        const splitString = string.split('');
        const open = '{';
        const close = '}';
        let character;
        let stack = [];

        for (let i = 0; i < splitString.length; i++) {
            character = splitString[i];

            if (close === character) {

                if (stack.length === 0 || stack.pop() !== open) {
                    return false;
                }

            } else if (open === character) {
                stack.push(character);
            }
        }

        return stack.length === 0;

    }

    console.log(isPrime(199));
    console.log(factorial(5));
    console.log(fib(20));
    console.log(isSorted([1, 2, 3, -Infinity, -2]));
    console.log(indexOf([1, 2, 3], 3));
    console.log(reverse('hello here'));
    console.log(isPalindrome('A man a plan a canal Panama'));
    console.log(missing([2, 4, 1, 9, 5, 20]));
    console.log(isBalanced('foo { bar { baz } boo }'));
})();
