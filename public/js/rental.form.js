const selectCar = document.getElementById('car-options');
const selectSinceDate = document.getElementById('since-date-input');
const selectUntilDate = document.getElementById('until-date-input');

selectSinceDate.addEventListener('change', calculateTotalPrice);
selectUntilDate.addEventListener('change', calculateTotalPrice);

let selectedCarPrice = 0;

selectCar.addEventListener('change', (event) => {
    const unitPriceInput = document.getElementById('unit-price-input');
    const unitPrice = Number(event.target.selectedOptions[0].dataset.carValue);

    if (!isNaN(unitPrice)) {
        selectedCarPrice = unitPrice;
        unitPriceInput.value = unitPrice;
        calculateTotalPrice();
    } else {
        unitPriceInput.value = "";
    }
});

function calculateTotalPrice (event) {
    const totalPriceInput = document.getElementById('total-price-input');
    const sinceDate = moment(document.getElementById('since-date-input').value);
    const untilDate = moment(document.getElementById('until-date-input').value);

    if (sinceDate._isValid && untilDate._isValid) {
        const daysDifference = untilDate.diff(sinceDate, 'days');
        const totalPrice = daysDifference * selectedCarPrice;

        if (totalPrice > 0) {
            totalPriceInput.value = totalPrice;
        } else {
            totalPriceInput.value = "";
        }
    } else {
        totalPriceInput.value = "";
    }
}
