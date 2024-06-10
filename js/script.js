// izolace jQuery
// -----------------
// (function ($) {})(jQuery);
// $(function () {});
// -----------------

$(function () {
    const letters =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"#$%&()*+,-./:;<=>?@[]^_`{|}~';

    // Global scope
    let home = $('.home'),
        copy = $('#copy'),
        slider = $('#slider'),
        sliderVal = slider.val(),
        progressBar = $('#progressBar'),
        count = $('#count'),
        result = $('#result'),
        checkbox = $('#checkbox'),
        generate = $('#generate'),
        mainArray = [],
        mainResult = '',
        // password strength
        evaluation = $('#evaluation'),
        box1 = $('#box--1'),
        box2 = $('#box--2'),
        box3 = $('#box--3'),
        box4 = $('#box--4'),
        strong = 4,
        medium = 3,
        weak = 2,
        tooweak = 1;
    let rmv = function () {
        for (let i = 1; i <= 4; i++) {
            eval('box' + i).removeClass();
        }
    };

    let add = function (type, n) {
        for (let i = 1; i <= n; i++) {
            eval('box' + i).addClass(type);
        }
    };

    let strength = function (type) {
        if (type === strong) {
            rmv();
            add('strong', strong);
            evaluation.text('STRONG');
        } else if (type === medium) {
            rmv();
            add('medium', medium);
            evaluation.text('MEDIUM');
        } else if (type === weak) {
            rmv();
            add('weak', weak);
            evaluation.text('WEAK');
        } else if (type === tooweak) {
            rmv();
            add('tooweak', tooweak);
            evaluation.text('TOO WEAK!');
        } else {
            rmv();
        }
    };

    let categorizeString = function (str) {
        const lowercase = (str.match(/[a-z]/g) || []).join('');
        const uppercase = (str.match(/[A-Z]/g) || []).join('');
        const numbers = (str.match(/[0-9]/g) || []).join('');
        const symbols = (str.match(/[^a-zA-Z0-9]/g) || []).join('');

        return {
            lowercase: lowercase,
            uppercase: uppercase,
            numbers: numbers,
            symbols: symbols,
        };
    };

    let outputLetters = categorizeString(letters),
        uppersArray = outputLetters.uppercase.split(''),
        lowersArray = outputLetters.lowercase.split(''),
        numbersArray = outputLetters.numbers.split(''),
        symbolsArray = outputLetters.symbols.split('');

    //rng function
    let rng = function (n) {
        return Math.floor(Math.random() * n);
    };

    let roll = function () {
        let vystup = [];
        for (let i = 0; i < sliderVal; i++) {
            vystup.push(mainArray[rng(mainArray.length - 1)]);
        }
        mainResult = vystup.join('');
        result.text(mainResult);
        result.removeClass('opacity');
    };

    // slider
    count.text(sliderVal);
    progressBar.val(sliderVal);

    slider.on('input', function () {
        sliderVal = $(this).val();
        count.text(sliderVal);
        progressBar.val(sliderVal);
    });

    progressBar.on('click', function (e) {
        let x = e.pageX - $(this).offset().left;
        sliderVal = Math.ceil((x * this.max) / this.offsetWidth);
        progressBar.val(sliderVal);
        slider.val(sliderVal);
        count.text(sliderVal);
        console.log(sliderVal);
    });

    let uppers = $('#uppers').prop('checked'),
        lowers = $('#lowers').prop('checked'),
        numbers = $('#numbers').prop('checked'),
        symbols = $('#symbols').prop('checked');
    if (!uppers && !lowers && !numbers && !symbols) {
        generate.addClass('default');
    } else {
        generate.removeClass('default');
    }

    checkbox.on('input', function () {
        let uppers = $('#uppers').prop('checked'),
            lowers = $('#lowers').prop('checked'),
            numbers = $('#numbers').prop('checked'),
            symbols = $('#symbols').prop('checked');
        if (!uppers && !lowers && !numbers && !symbols) {
            generate.addClass('default');
        } else {
            generate.removeClass('default');
        }
    });

    //  generate event
    generate.on('click', function () {
        rmv();

        // checkboxes boolean
        let uppers = $('#uppers').prop('checked'),
            lowers = $('#lowers').prop('checked'),
            numbers = $('#numbers').prop('checked'),
            symbols = $('#symbols').prop('checked'),
            //
            //  1x checkbox
            up = uppers && !lowers && !numbers && !symbols,
            low = !uppers && lowers && !numbers && !symbols,
            num = !uppers && !lowers && numbers && !symbols,
            sym = !uppers && !lowers && !numbers && symbols,
            //
            //  2x checkbox
            up_low = uppers && lowers && !numbers && !symbols,
            up_num = uppers && !lowers && numbers && !symbols,
            up_sym = uppers && !lowers && !numbers && symbols,
            //
            low_num = !uppers && lowers && numbers && !symbols,
            low_sym = !uppers && lowers && !numbers && symbols,
            //
            num_sym = !uppers && !lowers && numbers && symbols,
            //
            //  3x checkbox
            up_low_num = uppers && lowers && numbers && !symbols,
            up_low_sym = uppers && lowers && !numbers && symbols,
            up_num_sym = uppers && !lowers && numbers && symbols,
            low_num_sym = !uppers && lowers && numbers && symbols,
            //
            //  4x checkbox
            up_low_num_sym = uppers && lowers && numbers && symbols;
        console.log(uppers, lowers, numbers, symbols);

        function checkStrength(sliderVal) {
            let strengthLevel;

            if (sliderVal <= 10) {
                strengthLevel = tooweak;
            } else if (sliderVal > 10 && sliderVal <= 14) {
                strengthLevel = weak;
            } else if (sliderVal > 14 && sliderVal <= 17) {
                strengthLevel = medium;
            } else if (sliderVal > 17 && sliderVal <= 20) {
                strengthLevel = strong;
            }
            return strengthLevel;
        }
        let rollLogic = function () {
            roll();
            strength(checkStrength(sliderVal));
        };

        if (up) {
            mainArray = uppersArray;
            rollLogic();
        } else if (low) {
            mainArray = lowersArray;
            rollLogic();
        } else if (num) {
            mainArray = numbersArray;
            rollLogic();
        } else if (sym) {
            mainArray = symbolsArray;
            rollLogic();
        } else if (up_low) {
            mainArray = uppersArray.concat(lowersArray);
            rollLogic();
        } else if (up_num) {
            mainArray = uppersArray.concat(numbersArray);
            rollLogic();
        } else if (up_sym) {
            mainArray = uppersArray.concat(symbolsArray);
            rollLogic();
        } else if (low_num) {
            mainArray = lowersArray.concat(numbersArray);
            rollLogic();
        } else if (low_sym) {
            mainArray = lowersArray.concat(symbolsArray);
            rollLogic();
        } else if (num_sym) {
            mainArray = numbersArray.concat(symbolsArray);
            rollLogic();
        } else if (up_low_num) {
            mainArray = uppersArray.concat(lowersArray, numbersArray);
            rollLogic();
        } else if (up_low_sym) {
            mainArray = uppersArray.concat(lowersArray, symbolsArray);
            rollLogic();
        } else if (up_num_sym) {
            mainArray = uppersArray.concat(numbersArray, symbolsArray);
            rollLogic();
        } else if (low_num_sym) {
            mainArray = lowersArray.concat(numbersArray, symbolsArray);
            rollLogic();
        } else if (up_low_num_sym) {
            mainArray = uppersArray.concat(
                lowersArray,
                numbersArray,
                symbolsArray
            );
            rollLogic();
        } else {
            result.removeClass('opacity');
            result.addClass('opacity');
            result.text('P4$5W0rD!');
            evaluation.text('');
        }
    });

    // copy to memory
    copy.on('click', function () {
        let textCopy = result.text(),
            tempCopy = $('<textarea>');

        home.append(tempCopy);
        tempCopy.val(textCopy).select();

        document.execCommand('copy');
        tempCopy.remove();
    });
});
