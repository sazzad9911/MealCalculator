function closeAlert(a) {
    document.getElementById(a).style.display = 'none';
}
var Dashboard = document.getElementById('dashboard');
var Profile = document.getElementById('profile');
var Events = document.getElementById('event');
var Item = document.getElementById('item');
//buttons
var Dash = document.getElementById('dash');
var Prof = document.getElementById('prof');
var Even = document.getElementById('even');
var Itm = document.getElementById('items');
//enternal element
var DetailsBtn = document.getElementById('details-btn');
var ActivityBtn = document.getElementById('activity-btn');
var SettingsBtn = document.getElementById('settings-btn');
var BillBtn = document.getElementById('bill-btn');
var MealBtn = document.getElementById('meal-btn');

var Details = document.getElementById('details');
var Activity = document.getElementById('activity');
var Settings = document.getElementById('settings');
var Bills = document.getElementById('addbill');
var Meal = document.getElementById('addmeal');

function gotoSignUp() {
    document.getElementById('login-area').style.display = 'none';
    document.getElementById('signup-area').style.display = 'flex';
    document.getElementById('regester-area').style.display = 'none';
    document.getElementById('product-area').style.display = 'none';
}

function gotoCreateMess() {
    document.getElementById('login-area').style.display = 'none';
    document.getElementById('signup-area').style.display = 'none';
    document.getElementById('regester-area').style.display = 'flex';
    document.getElementById('product-area').style.display = 'none';
}

function Back1() {
    document.getElementById('login-area').style.display = 'flex';
    document.getElementById('signup-area').style.display = 'none';
    document.getElementById('regester-area').style.display = 'none';
    document.getElementById('product-area').style.display = 'none';
}

function Back2() {
    gotoSignUp();
}

function dashboard() {
    Dashboard.style.display = 'block';
    Dash.style.color = 'yellow';
    Profile.style.display = 'none';
    Prof.style.color = 'white';
    Events.style.display = 'none';
    Even.style.color = 'white';
    Item.style.display = 'none';
    Itm.style.color = 'white';

}

function profile() {
    Dashboard.style.display = 'none';
    Dash.style.color = 'white';
    Profile.style.display = 'block';
    Prof.style.color = 'yellow';
    Events.style.display = 'none';
    Even.style.color = 'white';
    Item.style.display = 'none';
    Itm.style.color = 'white';

}

function events() {
    Dashboard.style.display = 'none';
    Dash.style.color = 'white';
    Profile.style.display = 'none';
    Prof.style.color = 'white';
    Events.style.display = 'block';
    Even.style.color = 'yellow';
    Item.style.display = 'none';
    Itm.style.color = 'white';

}

function item() {
    Dashboard.style.display = 'none';
    Dash.style.color = 'white';
    Profile.style.display = 'none';
    Prof.style.color = 'white';
    Events.style.display = 'none';
    Even.style.color = 'white';
    Item.style.display = 'block';
    Itm.style.color = 'yellow';

}

function MyDetails() {
    Details.style.display = 'block';
    DetailsBtn.style.borderBottom = '1px solid yellow';
    Activity.style.display = 'none';
    ActivityBtn.style.borderBottom = 'none';
    Meal.style.display = 'none';
    MealBtn.style.borderBottom = 'none';
    Bills.style.display = 'none';
    BillBtn.style.borderBottom = 'none';
    Settings.style.display = 'none';
    SettingsBtn.style.borderBottom = 'none';
}

function MyActivity() {
    Details.style.display = 'none';
    DetailsBtn.style.borderBottom = 'none';
    Activity.style.display = 'block';
    ActivityBtn.style.borderBottom = '1px solid yellow';
    Meal.style.display = 'none';
    MealBtn.style.borderBottom = 'none';
    Bills.style.display = 'none';
    BillBtn.style.borderBottom = 'none';
    Settings.style.display = 'none';
    SettingsBtn.style.borderBottom = 'none';
}

function AddMeal() {
    Details.style.display = 'none';
    DetailsBtn.style.borderBottom = 'none';
    Activity.style.display = 'none';
    ActivityBtn.style.borderBottom = 'none';
    Meal.style.display = 'block';
    MealBtn.style.borderBottom = '1px solid yellow';
    Bills.style.display = 'none';
    BillBtn.style.borderBottom = 'none';
    Settings.style.display = 'none';
    SettingsBtn.style.borderBottom = 'none';
}

function AddBills() {
    Details.style.display = 'none';
    DetailsBtn.style.borderBottom = 'none';
    Activity.style.display = 'none';
    ActivityBtn.style.borderBottom = 'none';
    Meal.style.display = 'none';
    MealBtn.style.borderBottom = 'none';
    Bills.style.display = 'block';
    BillBtn.style.borderBottom = '1px solid yellow';
    Settings.style.display = 'none';
    SettingsBtn.style.borderBottom = 'none';
}

function Setting() {
    Details.style.display = 'none';
    DetailsBtn.style.borderBottom = 'none';
    Activity.style.display = 'none';
    ActivityBtn.style.borderBottom = 'none';
    Meal.style.display = 'none';
    MealBtn.style.borderBottom = 'none';
    Bills.style.display = 'none';
    BillBtn.style.borderBottom = 'none';
    Settings.style.display = 'block';
    SettingsBtn.style.borderBottom = '1px solid yellow';
}

function MealFragment() {
    document.getElementById('fragment-meal').style.display = 'flex';
}

function addGuest() {
    document.getElementById('fragment-guest').style.display = 'flex';
}

function portal() {
    document.getElementById('product-area').style.display = 'none';
    document.getElementById('login-area').style.display = 'flex';
}

function reset() {
    document.getElementById('fragment-reset').style.display = 'flex';
}

function systemBtn() {
    var s = document.getElementById('system-btn');
    if (s.checked == true) {
        document.getElementById('fragment-addfixed').style.display = 'flex';
    }
}