import './index.scss'

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

    // Slider
    const slider = document.getElementById('slider'),
          sliderItems = document.getElementById('slides'),
          prev = document.getElementById('prev'),
          next = document.getElementById('next');

    function slide(wrapper, items, prev, next) {
        let posX1 = 0,
            posX2 = 0,
            posInitial,
            posFinal,
            threshold = 100,
            slides = items.getElementsByClassName('slide'),
            slidesLength = slides.length,
            slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
            firstSlide = slides[0],
            lastSlide = slides[slidesLength - 1],
            cloneFirst = firstSlide.cloneNode(true),
            cloneLast = lastSlide.cloneNode(true),
            index = 0,
            allowShift = true;

        // Clone first and last slide
        items.appendChild(cloneFirst);
        items.insertBefore(cloneLast, firstSlide);
        wrapper.classList.add('loaded');

        // Mouse events
        items.onmousedown = dragStart;

        // Touch events
        items.addEventListener('touchstart', dragStart);
        items.addEventListener('touchend', dragEnd);
        items.addEventListener('touchmove', dragAction);

        // Click events
        prev.addEventListener('click', function () { shiftSlide(-1) });
        next.addEventListener('click', function () { shiftSlide(1) });

        // Transition events
        items.addEventListener('transitionend', checkIndex);

        function dragStart (e) {
            e = e || window.event;
            e.preventDefault();
            posInitial = items.offsetLeft;

            if (e.type === 'touchstart') {
                posX1 = e.touches[0].clientX;
            } else {
                posX1 = e.clientX;
                document.onmouseup = dragEnd;
                document.onmousemove = dragAction;
            }
        }

        function dragAction (e) {
            e = e || window.event;

            if (e.type === 'touchmove') {
                posX2 = posX1 - e.touches[0].clientX;
                posX1 = e.touches[0].clientX;
            } else {
                posX2 = posX1 - e.clientX;
                posX1 = e.clientX;
            }
            items.style.left = (items.offsetLeft - posX2) + 'px';
        }

        function dragEnd () {
            posFinal = items.offsetLeft;
            if (posFinal - posInitial < -threshold) {
                shiftSlide(1, 'drag');
            } else if (posFinal - posInitial > threshold) {
                shiftSlide(-1, 'drag');
            } else {
                items.style.left = (posInitial) + 'px';
            }

            document.onmouseup = null;
            document.onmousemove = null;
        }

        function shiftSlide(dir, action) {
            items.classList.add('shifting');

            if (allowShift) {
                if (!action) { posInitial = items.offsetLeft; }

                if (dir === 1) {
                    items.style.left = (posInitial - slideSize) + 'px';
                    index++;
                } else if (dir === -1) {
                    items.style.left = (posInitial + slideSize) + 'px';
                    index--;
                }
            }
            allowShift = false;
        }

        function checkIndex () {
            items.classList.remove('shifting');

            if (index === -1) {
                items.style.left = -(slidesLength * slideSize) + 'px';
                index = slidesLength - 1;
            }

            if (index === slidesLength) {
                items.style.left = -(slideSize) + 'px';
                index = 0;
            }

            allowShift = true;
        }
    }

    slide(slider, sliderItems, prev, next);

})();
