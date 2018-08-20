/*(function () {
    "use strict";

    var el = function (element) {
        if (element.charAt(0) === "#") { // If passed an ID...
            return document.querySelector(element); // ... returns single element
        }

        return document.querySelectorAll(element); // Otherwise, returns a nodelist
    };

    var nums = el(".num"), // List of numbers

    var displayValue = {
        fdisplayValue: "",
        get Value() {
            return this.fdisplayValue;
        },
        set Value(val) {
            this.fdisplayValue = val;
            $("#calc_display").text(this.fdisplayValue);
        }
    }

    function Delete_Click() {
        var result;
        var newDisplay = displayValue.Value;

        if (newDisplay.trim() != "") {
            newDisplay = newDisplay.substring(newDisplay.length - 1, 1);
            if (newDisplay === "")
                newDisplay = "0";
        }

        var result = parseFloat(newDisplay);
        if (!isNaN(result)) {
            displayValue.Value = newDisplay;
        }
    }

    function Clear_Click() {
        displayValue.Value = "0";
    }

    function Button_Click(id) {
        var val = $("#" + id).val();
        addDigit(val);
    }

    function addDigit(value) {

        if (value === "." && displayValue.Value === "0")
            displayValue.Value = "";

        var newDisplay = displayValue.Value + value;

        var result = parseFloat(newDisplay);
        if (!isNaN(result)) {
            if (newDisplay.indexOf(".") >= 0) {
                var strings = newDisplay.split(".");
                if (strings[1].length > 2) {
                    newDisplay = newDisplay.substring(newDisplay.length - 1, 1);
                    result = parseFloat(newDisplay);
                }
            }
            displayValue.Value = newDisplay;
        }
    }

    for (var i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = Button_Click;
    }
}());*/

(function () {
    "use strict";

    Number.prototype.formatMoney = function (c, d, t) {
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    
    // Shortcut to get elements
    var el = function (element) {
        if (element.charAt(0) === "#") { // If passed an ID...
            return document.querySelector(element); // ... returns single element
        }
        return document.querySelectorAll(element); // Otherwise, returns a nodelist
    };

    // Variables
    var viewer = el("#calc_display"), // Calculator screen where result is displayed
        result = el("#calc_result"), // Calculator screen where result is displayed
        nums = el(".num"), // List of numbers
        theNum = "", // Current number
        resultNum; // Result

    // When: Number is clicked. Get the current number selected
    var setNum = function () {
        var value = this.getAttribute("data-num");

        if (theNum.length >= 16)
            value = "";

        if (value === "." && theNum.indexOf(".") >= 0)
            value = "";

        theNum += value;

        var result = parseFloat(theNum);
        if (!isNaN(result)) {
            if (theNum.indexOf(".") >= 0) {
                var strings = theNum.split(".");
                if (strings[1].length > 2) {
                    theNum = theNum.slice(0, -1);
                    result = parseFloat(theNum);
                }
            }
        }

        viewer.innerHTML = theNum; // Display current number
        displayNum();
    };

    // When: Equals is clicked. Calculate result
    var displayNum = function () {

        // Convert string input to numbers
        resultNum = parseFloat(theNum);

        var url = window.location.href.split('/');
        var name = url[url.length - 1];

        // Perform operation
        if (name == "BsFPage.html") {
            resultNum = resultNum / 100000;
        }
        else {
            resultNum = resultNum * 100000;
        }

        //resultNum = $.formatNumber(resultNum, { format: "#,###.00", locale: "us" });

        // Display result, finally!
        //result.innerHTML = resultNum.toFixed(2);
        result.innerHTML = resultNum.formatMoney(2, '.', ',');
    };

    // When: Clear button is pressed. Clear everything
    var clearAll = function () {
        theNum = "";
        viewer.innerHTML = "0";
        result.innerHTML = "0";
    };

    // The click events

    // Add click event to numbers
    for (var i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = setNum;
    }

    // Add click event to clear button
    el("#Clear").onclick = clearAll;


}());