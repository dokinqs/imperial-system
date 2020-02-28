function weightToImperial(inputNum) {
    document.getElementById("kilogram").value = (inputNum / 2.2046).toFixed(2);
}
function weightToMetric(inputNum) {
    document.getElementById("pound").value = (inputNum * 2.2046).toFixed(2);
}
function tempToImperial(inputNum) {
    document.getElementById("celsius").value = ((inputNum - 32) / 1.8).toFixed(2);
}
function tempToMetric(inputNum) {
    document.getElementById("fahrenheit").value = (inputNum * 1.8 + 32).toFixed(2);
}
function lengthConverter(inputId, inputNum) {
    inputNum = parseFloat(inputNum);
    let inputFeet = document.getElementById("inputFeet");
    let inputMeters = document.getElementById("inputMeters");
    let inputInches = document.getElementById("inputInches");
    let inputCentimeters = document.getElementById("inputCentimeters");
    let inputYards = document.getElementById("inputYards");
    let inputKilometers = document.getElementById("inputKilometers");
    let inputMiles = document.getElementById("inputMiles");
    if (inputId == "inputFeet") {
        inputMeters.value = (inputNum / 3.2808).toFixed(2);
        inputInches.value = (inputNum * 12).toFixed(2);
        inputCentimeters.value = (inputNum / 0.032808).toFixed(0);
        inputYards.value = (inputNum * 0.33333).toFixed(2);
        inputKilometers.value = (inputNum / 3280.8).toFixed(5);
        inputMiles.value = (inputNum * 0.00018939).toFixed(5);
    }
    if (inputId == "inputMeters") {
        inputFeet.value = (inputNum * 3.2808).toFixed(2);
        inputInches.value = (inputNum * 39.370).toFixed(2);
        inputCentimeters.value = (inputNum / 0.01).toFixed(0);
        inputYards.value = (inputNum * 1.0936).toFixed(2);
        inputKilometers.value = (inputNum / 1000).toFixed(5);
        inputMiles.value = (inputNum * 0.00062137).toFixed(5);
    }
    if (inputId == "inputInches") {
        inputFeet.value = (inputNum * 0.083333).toFixed(3);
        inputMeters.value = (inputNum / 39.370).toFixed(3);
        inputCentimeters.value = (inputNum / 0.39370).toFixed(2);
        inputYards.value = (inputNum * 0.027778).toFixed(3);
        inputKilometers.value = (inputNum / 39370).toFixed(6);
        inputMiles.value = (inputNum * 0.000015783).toFixed(6);
    }
    if (inputId == "inputCentimeters") {
        inputFeet.value = (inputNum * 0.032808).toFixed(3);
        inputMeters.value = (inputNum / 100).toFixed(3);
        inputInches.value = (inputNum * 0.39370).toFixed(2);
        inputYards.value = (inputNum * 0.010936).toFixed(3);
        inputKilometers.value = (inputNum / 100000).toFixed(6);
        inputMiles.value = (inputNum * 0.0000062137).toFixed(6);
    }
    if (inputId == "inputYards") {
        inputFeet.value = (inputNum * 3).toFixed(0);
        inputMeters.value = (inputNum / 1.0936).toFixed(2);
        inputInches.value = (inputNum * 36).toFixed(0);
        inputCentimeters.value = (inputNum / 0.010936).toFixed(0);
        inputKilometers.value = (inputNum / 1093.6).toFixed(5);
        inputMiles.value = (inputNum * 0.00056818).toFixed(5);
    }
    if (inputId == "inputKilometers") {
        inputFeet.value = (inputNum * 3280.8).toFixed();
        inputMeters.value = (inputNum * 1000).toFixed();
        inputInches.value = (inputNum * 39370).toFixed();
        inputCentimeters.value = (inputNum * 100000).toFixed();
        inputYards.value = (inputNum * 1093.6).toFixed();
        inputMiles.value = (inputNum * 0.62137).toFixed(2);
    }
    if (inputId == "inputMiles") {
        inputFeet.value = (inputNum * 5280).toFixed();
        inputMeters.value = (inputNum / 0.00062137).toFixed();
        inputInches.value = (inputNum * 63360).toFixed();
        inputCentimeters.value = (inputNum / 0.0000062137).toFixed();
        inputYards.value = (inputNum * 1760).toFixed();
        inputKilometers.value = (inputNum / 0.62137).toFixed(2);
    }
}

// VOLUME, TEMPERATURE

let property = new Array(), unit = new Array(), factor = new Array();

// [Primary unit Factor] [Second unit] = 
// [Second unit Factor] [Primary Unit]
//            1 fl oz = 0.125 cup
//            0.00422675 tbsp = 0.0625 mL
property[0] = "Volume (cup / mL)";
unit[0] = new Array("cup", "fl oz", "tbsp", "tsp", "mL");
factor[0] = new Array(1, 0.125, 0.0625, 0.020833, 0.00422675);

// sourceForm.unit_input.value = ((targetForm.unit_input.value - tempIncrement[targetIndex]) * targetFactor / sourceFactor) + tempIncrement[sourceIndex]

property[1] = "Temperature (Kelvin)";
unit[1] = new Array("Celsius", "Fahrenheit", "Kelvin");
factor[1] = new Array(1, 0.55555, 1);
tempIncrement = new Array(0, 32, 273.15);

window.onload = () => {
    FillMenuWithArray(document.property_form.main_menu, property);
    UpdateUnitMenu(document.property_form.main_menu, document.form_A.unit_menu);
    UpdateUnitMenu(document.property_form.main_menu, document.form_B.unit_menu);
}

// document.property_form.main_menu = myMenu
// ["Volume (cup / mL)", "Temperature (Kelvin)"] = property = myArray = myMenu
function FillMenuWithArray(myMenu, myArray) {
    myMenu.length = myArray.length;
    let i;
    for (i = 0; i < myArray.length; i++) {
        myMenu.options[i].text = myArray[i];
    }
}

// this = propMenu 
// document.form_A.unit_menu = unitMenu = myMenu ^
// unit[propMenu.selectedIndex] = myArray ^
function UpdateUnitMenu(propMenu, unitMenu) {
    let ind;
    ind = propMenu.selectedIndex;
    FillMenuWithArray(unitMenu, unit[ind]);
}

// form_A : 
    // unit_input:
     // sourceForm = document.form_A
     // targetForm = document.form_B
    // unit_menu:
     // sourceForm = document.form_B
     // targetForm = document.form_A
//  form_B: opposite A B
function ConvertFromTo(sourceForm, targetForm) {
    // sourceForm input box to targetForm unit menu
    let propIndex, sourceIndex, sourceFactor, targetIndex, targetFactor, result;

    propIndex = document.property_form.main_menu.selectedIndex;
    if (propIndex == 1) {
        // temp
        console.log(`%cpropIndex: ${propIndex}`, 'background: #fe7373; color: black');
    } else {
        // volume
        console.log(`%cpropIndex: ${propIndex}`, 'background: lightblue; color: black');
    }
    // source- unit converting FROM:
    sourceIndex = sourceForm.unit_menu.selectedIndex;
     console.log(`sourceIndex: ${sourceIndex}`);
    sourceFactor = factor[propIndex][sourceIndex];
    // ex: from C to F, factor[1][1] = 5/9
     console.log(`sourceFactor: ${sourceFactor}`);

    // target- unit converting TO:
    targetIndex = targetForm.unit_menu.selectedIndex;
     console.log(`targetIndex: ${targetIndex}`);
    targetFactor = factor[propIndex][targetIndex];
    // ex: factor[1][0] = 1
     console.log(`targetFactor: ${targetFactor}`);

    // see bottom for calculations
    // a) sourceFactor to convert source TO BASE unit
        result = sourceForm.unit_input.value;
        // ex: input 1°C
        console.log(`input source: ${result}`);

        // if temperature, not volume
        if (property[propIndex] == "Temperature (Kelvin)") {
            result = parseFloat(result) - tempIncrement[sourceIndex];
            console.log(`start temp source result: ${result}`);
        }

        result = result * sourceFactor;
        console.log(`end source result: ${result}`);

    // b) targetFactor to convert BASE To target unit
        result = result / targetFactor;
        console.log(`start target result: ${result}`);

        if (property[propIndex] == "Temperature (Kelvin)") {
            result = parseFloat(result) + tempIncrement[targetIndex];
            console.log(`TEMP TARGET RESULT: ${result}`);
        }

        console.log(`TARGET RESULT: ${result}`);
        targetForm.unit_input.value = result.toFixed(2);

    // targetForm.unit_input.value = ((sourceForm.unit_input.value - tempIncrement[sourceIndex]) * sourceFactor / targetFactor) + tempIncrement[targetIndex]

    // property[1]       Temp
    // unit[1]           ["°C", "°F", "K"]
    // factor[1]         [1, 5/9, 1]
    // tempIncrement     [0, 32, 273.15]

    // sourceForm.unit_input.value 
     // - tempIncrement[sourceIndex]
     // * sourceFactor
     // / targetFactor 
     // + tempIncrement[targetIndex]
    // = targetForm.unit_input.value

    // ((1°C - 0) * 1 / 5/9)    + 32       = 33.8°F
    // ((1°C - 0) * 1 / 1)      + 273.15   = 274.15K 

    // ((1°F − 32) * 5/9 / 1)   + 0       = -17.22°C
    // ((1°F − 32) * 5/9 / 1)   + 273.15  = 255.928K

    // ((1K − 273.15) * 1 / 1)   + 0      = -272.1°C
    // ((1K − 273.15) * 1 / 5/9) + 32     = -457.9°F
}