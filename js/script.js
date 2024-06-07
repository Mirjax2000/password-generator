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

    //  generate event
    generate.on('click', function () {
        rmv();

        // checkboxes boolean
        let uppers = $('#uppers').prop('checked'),
            lowers = $('#lowers').prop('checked'),
            numbers = $('#numbers').prop('checked'),
            symbols = $('#symbols').prop('checked'),
            // not checked
            none = !uppers && !lowers && !numbers && !symbols,
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

        // automagic
        let tooweakBool_I = sliderVal <= 10,
            weakBool_I = sliderVal > 10 && sliderVal <= 17,
            mediumBool_I = sliderVal > 17 && sliderVal <= 20,
            //
            weakBool_II = sliderVal > 10 && sliderVal <= 14,
            mediumBool_II = sliderVal > 14 && sliderVal <= 17,
            strongBool_II = sliderVal > 17 && sliderVal <= 20;

        if (up && tooweakBool_I) {
            mainArray = uppersArray;
            roll();
            strength(tooweak);
        } else if (up && weakBool_I) {
            mainArray = uppersArray;
            roll();
            strength(weak);
        } else if (up && mediumBool_I) {
            mainArray = uppersArray;
            roll();
            strength(medium);
            //
            //
        } else if (low && tooweakBool_I) {
            mainArray = lowersArray;
            roll();
            strength(tooweak);
        } else if (low && weakBool_I) {
            mainArray = lowersArray;
            roll();
            strength(weak);
        } else if (low && mediumBool_I) {
            mainArray = lowersArray;
            roll();
            strength(medium);
            //
            //
        } else if (num && tooweakBool_I) {
            mainArray = numbersArray;
            roll();
            strength(tooweak);
        } else if (num && weakBool_I) {
            mainArray = numbersArray;
            roll();
            strength(weak);
        } else if (num && mediumBool_I) {
            mainArray = numbersArray;
            roll();
            strength(medium);
        }
        //
        else if (sym && tooweakBool_I) {
            mainArray = symbolsArray;
            roll();
            strength(tooweak);
        } else if (sym && weakBool_II) {
            mainArray = symbolsArray;
            roll();
            strength(weak);
        } else if (sym && mediumBool_II) {
            mainArray = symbolsArray;
            roll();
            strength(medium);
        } else if (sym && strongBool_II) {
            mainArray = symbolsArray;
            roll();
            strength(strong);
        }
        //
        //
        //
        else if (up_low && tooweakBool_I) {
            mainArray = uppersArray.concat(lowersArray);
            roll();
            strength(tooweak);
            //
        } else if (up_low && weakBool_I) {
            mainArray = uppersArray.concat(lowersArray);
            roll();
            strength(weak);
            //
        } else if (up_low && mediumBool_I) {
            mainArray = uppersArray.concat(lowersArray);
            roll();
            strength(medium);
            //
            //
        } else if (up_num && tooweakBool_I) {
            mainArray = uppersArray.concat(numbersArray);
            roll();
            strength(tooweak);
            //
        } else if (up_num && weakBool_I) {
            mainArray = uppersArray.concat(numbersArray);
            roll();
            strength(weak);
            //
        } else if (up_num && mediumBool_I) {
            mainArray = uppersArray.concat(numbersArray);
            roll();
            strength(medium);
            //
            //
        } else if (up_sym && tooweakBool_I) {
            mainArray = uppersArray.concat(symbolsArray);
            roll();
            strength(tooweak);
            //
        } else if (up_sym && weakBool_II) {
            mainArray = uppersArray.concat(symbolsArray);
            roll();
            strength(weak);
            //
        } else if (up_sym && mediumBool_II) {
            mainArray = uppersArray.concat(symbolsArray);
            roll();
            strength(medium);
            //
        } else if (up_sym && strongBool_II) {
            mainArray = uppersArray.concat(symbolsArray);
            roll();
            strength(strong);
            //
            //
        } else if (low_num && tooweakBool_I) {
            mainArray = lowersArray.concat(numbersArray);
            roll();
            strength(tooweak);
            //
        } else if (low_num && weakBool_I) {
            mainArray = lowersArray.concat(numbersArray);
            roll();
            strength(weak);
            //
        } else if (low_num && mediumBool_I) {
            mainArray = lowersArray.concat(numbersArray);
            roll();
            strength(medium);
            //
            //
        } else if (low_sym && tooweakBool_I) {
            mainArray = lowersArray.concat(symbolsArray);
            roll();
            strength(tooweak);
            //
        } else if (low_sym && weakBool_II) {
            mainArray = lowersArray.concat(symbolsArray);
            roll();
            strength(weak);
            //
        } else if (low_sym && mediumBool_II) {
            mainArray = lowersArray.concat(symbolsArray);
            roll();
            strength(medium);
            //
        } else if (low_sym && strongBool_II) {
            mainArray = lowersArray.concat(symbolsArray);
            roll();
            strength(strong);
            //
            //
        } else if (num_sym && tooweakBool_I) {
            mainArray = numbersArray.concat(symbolsArray);
            roll();
            strength(tooweak);
            //
        } else if (num_sym && weakBool_II) {
            mainArray = numbersArray.concat(symbolsArray);
            roll();
            strength(weak);
            //
        } else if (num_sym && mediumBool_II) {
            mainArray = numbersArray.concat(symbolsArray);
            roll();
            strength(medium);
            //
        } else if (num_sym && strongBool_II) {
            mainArray = numbersArray.concat(symbolsArray);
            roll();
            strength(strong);
            //
            //
            //
        } else if (up_low_num && tooweakBool_I) {
            mainArray = uppersArray.concat(lowersArray, numbersArray);
            roll();
            strength(tooweak);
            //
        } else if (up_low_num && weakBool_II) {
            mainArray = uppersArray.concat(lowersArray, numbersArray);
            roll();
            strength(weak);
            //
        } else if (up_low_num && mediumBool_II) {
            mainArray = uppersArray.concat(lowersArray, numbersArray);
            roll();
            strength(medium);
            //
        } else if (up_low_num && strongBool_II) {
            mainArray = uppersArray.concat(lowersArray, numbersArray);
            roll();
            strength(strong);
            //
            //
        } else if (up_low_sym && tooweakBool_I) {
            mainArray = uppersArray.concat(lowersArray, symbolsArray);
            roll();
            strength(tooweak);
            //
        } else if (up_low_sym && weakBool_II) {
            mainArray = uppersArray.concat(lowersArray, symbolsArray);
            roll();
            strength(weak);
            //
        } else if (up_low_sym && mediumBool_II) {
            mainArray = uppersArray.concat(lowersArray, symbolsArray);
            roll();
            strength(medium);
            //
        } else if (up_low_sym && strongBool_II) {
            mainArray = uppersArray.concat(lowersArray, symbolsArray);
            roll();
            strength(strong);
            //
            //
        } else if (up_num_sym && tooweakBool_I) {
            mainArray = uppersArray.concat(numbersArray, symbolsArray);
            roll();
            strength(tooweak);
            //
        } else if (up_num_sym && weakBool_II) {
            mainArray = uppersArray.concat(numbersArray, symbolsArray);
            roll();
            strength(weak);
            //
        } else if (up_num_sym && mediumBool_II) {
            mainArray = uppersArray.concat(numbersArray, symbolsArray);
            roll();
            strength(medium);
            //
        } else if (up_num_sym && strongBool_II) {
            mainArray = uppersArray.concat(numbersArray, symbolsArray);
            roll();
            strength(strong);
            //
            //
        } else if (low_num_sym && tooweakBool_I) {
            mainArray = lowersArray.concat(numbersArray, symbolsArray);
            roll();
            strength(tooweak);
            //
        } else if (low_num_sym && weakBool_II) {
            mainArray = lowersArray.concat(numbersArray, symbolsArray);
            roll();
            strength(weak);
            //
        } else if (low_num_sym && mediumBool_II) {
            mainArray = lowersArray.concat(numbersArray, symbolsArray);
            roll();
            strength(medium);
            //
        } else if (low_num_sym && strongBool_II) {
            mainArray = lowersArray.concat(numbersArray, symbolsArray);
            roll();
            strength(strong);
            //
            //
            //
        } else if (up_low_num_sym && tooweakBool_I) {
            mainArray = uppersArray.concat(
                lowersArray,
                numbersArray,
                symbolsArray
            );
            roll();
            strength(tooweak);
            //
        } else if (up_low_num_sym && sliderVal > 10 && sliderVal <= 13) {
            mainArray = uppersArray.concat(
                lowersArray,
                numbersArray,
                symbolsArray
            );
            roll();
            strength(weak);
            //
        } else if (up_low_num_sym && sliderVal > 13 && sliderVal <= 16) {
            mainArray = uppersArray.concat(
                lowersArray,
                numbersArray,
                symbolsArray
            );
            roll();
            strength(medium);
            //
        } else if (up_low_num_sym && sliderVal > 16 && sliderVal <= 20) {
            mainArray = uppersArray.concat(
                lowersArray,
                numbersArray,
                symbolsArray
            );
            roll();
            strength(strong);
            //
            //
            //
        } else {
            result.removeClass('opacity');
            result.addClass('opacity');
            result.text('P4$5W0rD!');
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
