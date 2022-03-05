//all documentation 
//boxess---------------
var flash_area = document.getElementById('flash-area');
var login_area = document.getElementById('login-area');
var main_area = document.getElementById('main-area');
var db = firebase.firestore();
var storage = firebase.storage();
var loader = document.getElementById('loader');
var product = document.getElementById('product-area');

var txt = document.getElementById('addmeal-people');
txt.innerHTML = 'Selected 0';
//all elements---------------------
var Alert = document.getElementById('alert');
var AlertHead = document.getElementById('alert-head');
var AlertText = document.getElementById('alert-text');
//all buttons-----------------
var login = document.getElementById('submit');
var signup = document.getElementById('submit1');
var forget = document.getElementById('submit11');
//all inputs---------------------
var email = document.getElementById('email');
var password = document.getElementById('password');
var cost;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        login_area.style.display = 'none';
        main_area.style.display = 'flex';
        flash_area.style.display = 'none';
        product.style.display = 'none';
        document.getElementById('signup-area').style.display = 'none';
        document.getElementById('regester-area').style.display = 'none';

        //get user ip and location---------------------
        // jQuery.get('https://ipinfo.io',function(e){

        // },'jsonp')
        main(user.email);
    } else {
        // No user is signed in.
        login_area.style.display = 'none';
        product.style.display = 'flex';
        main_area.style.display = 'none';
        flash_area.style.display = 'none';
        Product();
    }
});

login.addEventListener('click', function() {
    loader.style.display = 'initial';
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((user) => {
            login_area.style.display = 'none';
            main_area.style.display = 'flex';
            flash_area.style.display = 'none';
            //window.location.reload();
            //main(user.email);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            loader.style.display = 'none';
            AlertHead.innerHTML = 'Login Faild!';
            AlertText.innerHTML = errorMessage;
            Alert.style.display = 'flex';
        });

});
forget.addEventListener('click', function() {
    loader.style.display = 'initial';
    let email = document.getElementById('forget-email').value;
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            loader.style.display = 'none';
            AlertHead.innerHTML = 'Success!';
            AlertText.innerHTML = 'Please check your email address';
            Alert.style.display = 'flex';
        }).catch(err => {
            loader.style.display = 'none';
            AlertHead.innerHTML = err.code;
            AlertText.innerHTML = err.message;
            Alert.style.display = 'flex';
        })
})
signup.addEventListener('click', function() {
    loader.style.display = 'initial';
    var Name = document.getElementById('name1');
    var Email = document.getElementById('email1');
    var Phone = document.getElementById('phone1');
    var Date = document.getElementById('date1');
    var Code = document.getElementById('code1');
    var NewPassword = document.getElementById('password1');
    var ConfirmPassword = document.getElementById('password2');

    if (Name.value == '') {
        Name.placeholder = "Type name here..";
        Name.classList.add('x1');
        loader.style.display = 'none';
        return;
    }
    if (Email.value == '') {
        Email.placeholder = "Type email here..";
        Email.classList.add('x1');
        loader.style.display = 'none';
        return;
    }
    if (Phone.value == '') {
        Phone.placeholder = "Type phone here..";
        Phone.classList.add('x1');
        loader.style.display = 'none';
        return;
    }
    if (Date.value == '') {
        Date.style.color = 'red';
        loader.style.display = 'none';
        return;
    }
    if (NewPassword.value != ConfirmPassword.value) {
        AlertText.innerHTML = 'Password not mached.';
        AlertHead.innerHTML = 'Wrong!';
        Alert.style.display = 'flex';
        loader.style.display = 'none';
        return;
    }
    if (Code.value == '') {
        Code.placeholder = "Type messcode here..";
        Code.classList.add('x1');
        loader.style.display = 'none';
        return;
    } else {
        var n = 0;
        db.collection("mess").where("code", "==", Code.value)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    n++;
                });
                if (n <= 0) {
                    loader.style.display = 'none';
                    AlertText.innerHTML = 'Messcode is not correct.';
                    AlertHead.innerHTML = 'Wrong!';
                    Alert.style.display = 'flex';
                    return;
                } else {
                    // Add a new document in collection "cities"

                    firebase.auth().createUserWithEmailAndPassword(Email.value, NewPassword.value)
                        .then((user) => {
                            var db = firebase.firestore();
                            db.collection(Code.value).doc(Email.value)
                                .set({
                                    cook: 0,
                                    date: Date.value,
                                    elec: 0,
                                    email: Email.value,
                                    extra: 0,
                                    fine: 0,
                                    gass: 0,
                                    hc: 0,
                                    home: 0,
                                    image: "https://firebasestorage.googleapis.com/v0/b/my-meal-279205.appspot.com/o/profile%2Favt.jpg?alt=media&token=f85331ce-4b50-4681-9c24-c9b9b68e02c9",
                                    mc: 0,
                                    messcode: Code.value,
                                    name: Name.value,
                                    phome: 0,
                                    phone: Phone.value,
                                    pmeal: 0,
                                    totalmeal: 0,
                                    wifi: 0,
                                    boolean: true
                                });
                            db.collection("user").doc().set({
                                    code: Code.value,
                                    email: Email.value
                                })
                                .then(function() {
                                    console.log("Document successfully written!");
                                    //window.location.reload();
                                })
                                .catch(function(error) {
                                    console.error("Error writing document: ", error);
                                });
                            // Signed in 
                            // ...
                        })
                        .catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            // ..
                            loader.style.display = 'none';
                            AlertText.innerHTML = errorMessage;
                            AlertHead.innerHTML = errorCode;
                            Alert.style.display = 'flex';
                        });
                }
            })
            .catch(function(error) {
                Code.placeholder = error;
                Code.classList.add('x1');
                loader.style.display = 'none';
            });
    }

});

function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.reload();
    }).catch(function(error) {
        // An error happened.
    });
}

function addmeal() {
    document.getElementById('b').style.background = 'chartreuse';
}

function main(email) {
    loader.style.display = 'block';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('dash').style.color = 'yellow';
    document.getElementById('details-btn').style.borderBottom = '1px solid yellow';
    db.collection("user").where("email", "==", email)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                Profiles(doc.get('code'), email);
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    /*db.collection('location').add({
        information:ip,
        date:new Date(),
    })*/
}
var member = 0;
var selected = 0;
var people = [];

function Profiles(code, email) {
    var x = 1000;
    db.collection(code).where("boolean", "==", true)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {

                document.getElementById('addmeal-people').insertAdjacentHTML('afterend', "<div class='p-img'><input type='checkbox' onclick='c()' value='" + doc.get('email') + "' id='" + x + "'><img src='" + doc.get('image') + "' alt='img111'><p>" + doc.get('name') + "</p></div>");
                x++;
                document.getElementById('option').insertAdjacentHTML('afterend', "<option value='" + doc.get('email') + "'>" + doc.get('name') + "</option>");

                document.getElementById('option-credit').insertAdjacentHTML('afterend', "<option value='" + doc.get('email') + "'>" + doc.get('name') + "</option>");

                document.getElementById('option-guest').insertAdjacentHTML('afterend', "<option value='" + doc.get('email') + "'>" + doc.get('name') + "</option>");
                document.getElementById('option-admin').insertAdjacentHTML('afterend', "<option value='" + doc.get('email') + "'>" + doc.get('name') + "</option>");
                document.getElementById('option-delete').insertAdjacentHTML('afterend', "<option value='" + doc.get('email') + "'>" + doc.get('name') + "</option>");

                member++;

            });
        })
        .catch(function(error) {

        });
    db
        .collection(code).doc(email).collection('activities')
        .orderBy("date", "asc")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var date = doc.get('date').toDate();
                var d = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                document.getElementById('after-activity').insertAdjacentHTML('afterend', "<p>" + doc.get('message') + "</p><p>" + d + "</p><p>-------------------------------</P>");
            });
        });

    //
    var notice = document.getElementById('fragment-notice');
    var message = document.getElementById('notice-message');
    var NoticeButton = document.getElementById('save-notice');
    db.collection("notice").orderBy('date', 'desc').limit(1).get().then(function(docs) {
            docs.forEach(function(doc) {
                //console.log(doc.id,'red');
                var boolean = false;
                db.collection('notice').doc(doc.id).collection('seen').get()
                    .then(newDocs => {
                        newDocs.forEach(docc => {
                            if (docc.get('email') === email) {
                                boolean = true;
                            }
                        })
                    }).then(() => {
                        if (!boolean) {
                            notice.style.display = 'flex';
                            message.innerHTML = doc.get('body');
                            NoticeButton.addEventListener('click', e => {
                                notice.style.display = 'none';
                                db.collection('notice').doc(doc.id).collection('seen').add({
                                    email: email,
                                })
                            })
                        }
                    })
            })
        })
        //manager 
    var key;
    db.collection("mess").where("code", "==", code)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                key = doc.id;
                document.getElementById('mess-address').innerHTML = doc.get('address');
                if (doc.get('rate') > 0) {
                    document.getElementById('system').innerHTML = 'Fixed Meal System';
                    document.getElementById('system-btn').checked = 'true';
                    document.getElementById('todays-cost').style.display = 'none';
                } else {
                    document.getElementById('system').innerHTML = 'Avarage Meal System';
                }

                if (email == doc.get('manager') || email == 'sazzad15-2521@diu.edu.bd') {
                    document.getElementById('meal-btn').style.display = 'initial';
                    document.getElementById('bill-btn').style.display = 'initial';
                    document.getElementById('settings-btn').style.display = 'initial';
                    document.getElementById('addevent').style.display = 'flex';
                    document.getElementById('new-item').style.display = 'flex';

                } else {
                    var p = 100;
                    for (var i = 1; i <= j; i++) {
                        document.getElementById(i).style.display = 'none';
                        document.getElementById(p).style.display = 'none';
                        p++;
                    }
                }
                main_area.style.display = 'flex';
                flash_area.style.display = 'none';
                //item------------------------
                var lock = [];
                var item = 200;
                db.collection('items')
                    .orderBy("like", "desc")
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            document.getElementById('pd2').insertAdjacentHTML('afterend', "<div class='card'><img src='" + doc.get('img') + "' id='" + item + "' value='" + doc.id + "'><h4>" + doc.get('head') + "</h4><div class='font'><p>" + doc.get('text') + "</p></div><p style='margin: 0% 5%; font-size: 13px; font-family: cursive; height: 8%;'>FavorBy " + doc.get('like') + " people <i class='fas fa-plus-circle' id='click'> Add Card</i></p></div>");
                            lock[item] = doc.id;
                            item++;
                        });
                        document.getElementById('click').addEventListener('click', e => {
                            alert('Working on it!');
                        });

                    }).then(function() {
                        //loader.style.display = 'none';
                    })
                    .catch(function(error) {

                    });
                document.getElementById('new-item').addEventListener('click', e => {
                    document.getElementById('fragment-additem').style.display = 'flex';
                    document.getElementById('img11').addEventListener('change', function(e) {
                        var file = e.target.files[0];
                        var storageRef = firebase.storage().ref('post/' + file.name);
                        var task = storageRef.put(file);
                        task.on('state_changed', function progress(snapshot) {
                            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            AlertHead.innerHTML = 'Uploading....';
                            AlertText.innerHTML = 'Your image is uploading ' + percentage + ' % done.';
                            Alert.style.display = 'flex';

                        }, function error(err) {
                            console.log(err);

                        }, function complete() {
                            Alert.style.display = 'none';
                            document.getElementById('item-save').addEventListener('click', e => {
                                var head = document.getElementById('item-name').value;
                                var text = document.getElementById('item-text').value;
                                loader.style.display = 'initial';
                                storage.ref().child('post/' + file.name).getDownloadURL()
                                    .then((url) => {
                                        db.collection('items').doc().set({
                                            img: url,
                                            head: head,
                                            text: text,
                                            like: 0
                                        }).then(function() {
                                            AlertHead.innerHTML = 'Success!';
                                            AlertText.innerHTML = 'Item added Successfull.';
                                            Alert.style.display = 'flex';
                                            setTimeout(function() {
                                                window.location.reload();
                                            }, 2000);
                                        });
                                    });

                            });
                        });

                    });

                });
                //event----------------------
                var j = 0;
                var m = 501;
                var mk = [];
                var cost = [];
                var em = email;
                db.collection("mess").doc(key).collection('event').orderBy("date", "asc").limit(10)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            j = j + 1;
                            mk[j] = doc.id;
                            cost[j] = doc.get('cost');
                            var date = doc.get('date').toDate();
                            var d = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
                            document.getElementById('event-st').insertAdjacentHTML('afterend', "<div class='event-box'><h4>" + doc.get('title') + "</h4><p>" + doc.get('text') + "</p><p>Cost: " + doc.get('cost') + "</p><h6>" + d + "</h6><button id='eventButton' value='" + doc.id + "' onclick='BuyTicket(" + doc.data() + "," + email + "," + code + ")'>Buy Ticket</button><label class='switch' id='100'><input id='eventCheckbox' type='checkbox'><span class='slider round'></span></label></div>");
                            var x = document.getElementById('eventButton');
                            if (doc.get('open') == false) {
                                x.style.display = 'none';
                            }
                            m++;
                            x.onclick = function BuyTicket() {
                                loader.style.display = 'block';
                                db.collection(code).doc(email).get().then(function(documents) {
                                    db.collection(code).doc(email).update({
                                        extra: parseInt(documents.get('extra') + doc.get('cost'))
                                    }).then(function() {
                                        db.collection(code).doc(email).collection('activities').add({
                                            date: new Date(),
                                            message: 'Buy Ticket for : ' + doc.get('title') + ' Cost: ' + doc.get('cost')
                                        }).then(function() {
                                            loader.style.display = 'none';
                                            alert('Successfully ticket has bought. Check Activities for information.');
                                        }).error(function(err) {
                                            loader.style.display = 'none';
                                            alert(err.message);
                                        })
                                    })
                                })
                            }
                        });

                        //functions--------------------------------

                    })
                    .catch(function(error) {

                    });

                document.getElementById('event-st').value = key;
                Dynamic(code, email, member, key, doc.get('rate'), j);
            });
        });

}

function Dynamic(code, email, member, key, rate, j) {
    console.log(member);
    var docRef = db.collection(code).doc(email);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            document.getElementById('name').innerHTML = 'Welcome ' + doc.get('name') + '!';
            document.getElementById('names').value = doc.get('name');
            document.getElementById('emaill').innerHTML = email;
            document.getElementById('phone').value = doc.get('phone');
            document.getElementById('code').innerHTML = code;

            //
            var d = doc.get('cook') + doc.get('elec') + doc.get('extra') + doc.get('fine') + doc.get('gass') + doc.get('home') + doc.get('wifi') + doc.get('phome') - doc.get('hc');
            if (rate > 0) {
                document.getElementById('mealdue').innerHTML = ((rate * doc.get('totalmeal')) - doc.get('mc')).toFixed(2);
            } else {
                document.getElementById('mealdue').innerHTML = (doc.get('pmeal') - doc.get('mc')).toFixed(2);
            }
            document.getElementById('mealcredit').innerHTML = doc.get('mc').toFixed(2);
            document.getElementById('homedue').innerHTML = d.toFixed(2);
            console.log(d);
            document.getElementById('homecredit').innerHTML = doc.get('hc');
            document.getElementById('totalmeal').innerHTML = doc.get('totalmeal');
            //
            document.getElementById('home').innerHTML = 'Home Rents: ' + doc.get('home') + ' tk';
            document.getElementById('wifi').innerHTML = 'Wifi Bills: ' + doc.get('wifi') + ' tk';
            document.getElementById('electricity').innerHTML = 'Electricity Bills: ' + doc.get('elec') + ' tk';
            document.getElementById('gass').innerHTML = 'Gass Bills: ' + doc.get('gass') + ' tk';
            document.getElementById('extra').innerHTML = 'Extra Costs: ' + doc.get('extra') + ' tk';
            document.getElementById('fine').innerHTML = 'Fine Fee: ' + doc.get('fine') + ' tk';
            document.getElementById('prev').innerHTML = 'Previous Due: ' + doc.get('phome') + ' tk';
            //console.log("Document data:", doc.data());

            //profile pic-------------------------
            // Or inserted into an <img> element:
            document.getElementById('img-p').src = doc.get('image');

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    //
    console.log(key);
    var totalExpense = 0;
    db
        .collection('mess').doc(key).collection('meal')
        .orderBy("date", "asc")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                totalExpense = totalExpense + doc.get('cost');
                var date = doc.get('date').toDate();
                var d = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                document.getElementById('z').insertAdjacentHTML('afterend', "<div class='z'><div style='width: 30%; margin: 2px 2px;'><p style='text-align: center;'>" + d + "</p></div><div style='width: 30%; margin: 2px 2px;'><p style='text-align: center;'>" + doc.get('cost') + "</p></div><div style='width: 30%; margin: 2px 2px;'><p style='text-align: center;'>" + doc.get('totalmeal') + "</p></div></div>");

                if (rate > 0) {
                    document.getElementById('mealrate').innerHTML = rate.toFixed(2);
                } else {
                    if (doc.get('cost') != 0) {
                        document.getElementById('mealrate').innerHTML = (doc.get('cost') / doc.get('totalmeal')).toFixed(2);
                    } else {
                        document.getElementById('mealrate').innerHTML = '0.00';
                    }
                }

            });
            console.log(totalExpense);


            // new function---------
            var totalmeal = 0;
            var totalTaka = 0;
            db
                .collection(code)
                .orderBy("name", "desc")
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(docs) {
                        //totalTaka = totalTaka + docs.get('mc');
                        totalmeal = totalmeal + docs.get('totalmeal');
                        db
                            .collection(code).doc(docs.get('email')).collection('activities')
                            .orderBy("date", "asc")
                            .get()
                            .then(function(querySnapshot) {
                                querySnapshot.forEach(function(doc) {
                                    if (doc.get('mc') != null) {
                                        totalTaka = totalTaka + doc.get('mc');
                                    }
                                });
                                console.log(totalTaka);
                                if (rate > 0) {
                                    totalExpense = totalmeal * rate;
                                }
                                document.getElementById('handcash').innerHTML = 'Meal Hand Cash: ' + (totalTaka - totalExpense).toFixed(2) + ' tk';
                                document.getElementById('mealexpenses').innerHTML = 'Meal Expenses: ' + totalExpense.toFixed(2) + ' tk';
                            });
                    });
                    Functions(code, email, member, j, rate, key);
                });
        });
}

function Functions(code, email, member, j, rate, key) {
    loader.style.display = 'none';
    //add meal credit------
    document.getElementById('save-credit')
        .addEventListener('click', e => {
            loader.style.display = 'block';
            var amount = document.getElementById('credit-amount');
            var person = document.getElementById('credit-person');
            if (amount.value == '' || person.value == 'none') {
                loader.style.display = 'none';
                document.getElementById('fragment-meal').style.display = 'none';
                AlertHead.innerHTML = 'Wrong!';
                AlertText.innerHTML = 'You can not empty those box';
                Alert.style.display = 'flex';
                return;
            }
            db.collection(code).doc(person.value).collection('activities')
                .add({
                    message: 'Add meal Credit ' + amount.value,
                    date: new Date(),
                    mc: parseInt(amount.value)
                }).then(function() {
                    var a = amount.value;
                    var add = firebase.firestore.FieldValue.increment(parseInt(a));
                    db.collection('mess').doc(key).update({
                        mc: add
                    })
                    db.collection(code).doc(person.value).update({
                            mc: add
                        })
                        .then(function() {
                            console.log("Transaction successfully committed!");
                            document.getElementById('fragment-meal').style.display = 'none';
                            loader.style.display = 'none';
                            AlertHead.innerHTML = 'Successfull!';
                            AlertText.innerHTML = 'Meal Credit is successfully added in the server.';
                            Alert.style.display = 'flex';
                            amount.value = 0;
                            person.value = '';
                            setTimeout(function() {
                                window.location.reload();
                            }, 1000);
                        }).catch(function(error) {
                            console.log("Transaction failed: ", error);
                            document.getElementById('fragment-meal').style.display = 'none';
                            loader.style.display = 'none';
                            AlertHead.innerHTML = 'Faild!';
                            AlertText.innerHTML = 'Please try again letter.';
                            Alert.style.display = 'flex';
                        });
                });


        });
    //add home credit------
    document.getElementById('save-home-credit')
        .addEventListener('click', e => {
            loader.style.display = 'block';
            var amount = document.getElementById('credit-amount');
            var person = document.getElementById('credit-person');
            if (amount.value == '' || person.value == 'none') {
                loader.style.display = 'none';
                document.getElementById('fragment-meal').style.display = 'none';
                AlertHead.innerHTML = 'Wrong!';
                AlertText.innerHTML = 'You can not empty those box';
                Alert.style.display = 'flex';
                return;
            }
            db.collection(code).doc(person.value).collection('activities')
                .add({
                    message: 'Add home Credit ' + amount.value,
                    date: new Date(),
                    hc: parseInt(amount.value)
                }).then(function() {
                    var a = amount.value;
                    var add = firebase.firestore.FieldValue.increment(parseInt(a));
                    db.collection('mess').doc(key).update({
                        hc: add
                    })
                    db.collection(code).doc(person.value).update({
                            hc: add
                        })
                        .then(function() {
                            console.log("Transaction successfully committed!");
                            document.getElementById('fragment-meal').style.display = 'none';
                            loader.style.display = 'none';
                            AlertHead.innerHTML = 'Successfull!';
                            AlertText.innerHTML = 'Home Credit is successfully added in the server.';
                            Alert.style.display = 'flex';
                            amount.value = 0;
                            person.value = '';
                            setTimeout(function() {
                                window.location.reload();
                            }, 1000);
                        }).catch(function(error) {
                            console.log("Transaction failed: ", error);
                            document.getElementById('fragment-meal').style.display = 'none';
                            loader.style.display = 'none';
                            AlertHead.innerHTML = 'Faild!';
                            AlertText.innerHTML = 'Please try again letter.';
                            Alert.style.display = 'flex';
                        });
                });


        });
    //save daily meal
    document.getElementById('save-guest')
        .addEventListener('click', e => {
            var amounts = document.getElementById('guest-amount');
            var person = document.getElementById('guest-person');
            if (amounts.value != '' && person.value != 'none') {
                for (var k = 1000; k < 1000 + member; k++) {
                    var s = document.getElementById(k);
                    if (s.value == person.value) {
                        people[k] = people[k] + parseInt(amounts.value);
                        selected = selected + parseInt(amounts.value);
                        txt.innerHTML = 'Selected: ' + selected;
                        document.getElementById('fragment-guest').style.display = 'none';
                    }
                }
            } else {
                document.getElementById('fragment-guest').style.display = 'none';
                AlertHead.innerHTML = 'Wrong!';
                AlertText.innerHTML = 'Please use valid input';
                Alert.style.display = 'flex';
            }

        });
    document.getElementById('add-meal-btn')
        .addEventListener('click', e => {
            loader.style.display = 'initial';
            var date = document.getElementById('select-date');
            var cost = document.getElementById('todays-cost');

            if (rate > 0) {
                //a problem find here----------------
                for (var k = 1000; k < 1000 + member; k++) {
                    var dc = document.getElementById(k);
                    var meal = firebase.firestore.FieldValue.increment(parseInt(people[k]));
                    db.collection(code).doc(dc.value)
                        .update({
                            totalmeal: meal
                        });
                    people[k] = 0;
                    dc.checked = false;
                }
                loader.style.display = 'none';
                AlertHead.innerHTML = 'Successfull!';
                AlertText.innerHTML = 'Meal is successfully added in the server.';
                Alert.style.display = 'flex';
                setTimeout(function() {
                    window.location.reload();
                }, 3000);
            } else {
                if (cost.value == '' || date.value == '' || selected == 0) {
                    loader.style.display = 'none';
                    AlertHead.innerHTML = 'Worng!';
                    AlertText.innerHTML = 'Wrong input. Please fill all gap';
                    Alert.style.display = 'flex';
                    return;
                }
                var costs = cost.value / selected;
                var ts = new Date(date.value);
                var ds = ts.getDate() + '-' + ts.getMonth() + '-' + ts.getFullYear();
                var x = 0;
                db.collection('mess').doc(key).collection('meal')
                    .orderBy("date", "desc")
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            var dts = doc.get('date').toDate();
                            var s = dts.getDate() + '-' + dts.getMonth() + '-' + dts.getFullYear();
                            if (ds == s) {
                                x++;
                            }
                        });
                        if (x == 0) {
                            for (var k = 1000; k < 1000 + member; k++) {
                                var dc = document.getElementById(k);
                                var v = costs * people[k];
                                var meal = firebase.firestore.FieldValue.increment(parseInt(people[k]));
                                var pmeal = firebase.firestore.FieldValue.increment(parseInt(v));
                                db.collection(code).doc(dc.value)
                                    .update({
                                        totalmeal: meal,
                                        pmeal: pmeal
                                    });
                                people[k] = 0;
                                dc.checked = false;
                            }
                            db.collection('mess').doc(key).collection('meal')
                                .add({
                                    cost: parseInt(cost.value),
                                    date: ts,
                                    totalmeal: selected
                                }).then(function() {
                                    cost.innerHTML = '';
                                    date.valueAsDate = null;
                                    loader.style.display = 'none';
                                    AlertHead.innerHTML = 'Successfull!';
                                    AlertText.innerHTML = 'Meal is successfully added in the server.';
                                    Alert.style.display = 'flex';
                                    setTimeout(function() {
                                        window.location.reload();
                                    }, 1000);
                                });
                        } else {
                            loader.style.display = 'none';
                            AlertHead.innerHTML = 'Faild!';
                            AlertText.innerHTML = 'The date is already entered.';
                            Alert.style.display = 'flex';
                        }
                    });

            }

        });
    document.getElementById('all-meals').addEventListener('click', e => {
        document.getElementById('fragment-allmeals').style.display = 'flex';
    });
    //settings--------------
    document.getElementById('system-btn')
        .addEventListener('click', e => {
            var dc = document.getElementById('system-btn');
            if (dc.checked == true) {
                document.getElementById('rate-save').addEventListener('click', e => {
                    document.getElementById('fragment-addfixed').style.display = 'none';
                    var z = document.getElementById('fixed-ratee');
                    db.collection('mess').doc(key)
                        .update({
                            rate: parseInt(z.value)
                        }).then(function() {
                            z.value = '';
                            setTimeout(Manager, 1000, code, j, email, member);
                        })
                });

            } else {
                db.collection('mess').doc(key)
                    .update({
                        rate: 0
                    }).then(function() {
                        setTimeout(Manager, 1000, code, j, email, member);
                    });
            }

        });


    document.getElementById('details-btns')
        .addEventListener('click', e => {
            loader.style.display = 'initial';
            var v = document.getElementById('details-select');
            console.log(v.value);
            db.collection(code).where("email", "==", v.value)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        document.getElementById('dt-name').innerHTML = doc.get('name') + ' ';
                        document.getElementById('dt-date').innerHTML = doc.get('date') + ' ';
                        document.getElementById('dt-phone').innerHTML = doc.get('phone') + ' ';
                        document.getElementById('dt-totalmeal').innerHTML = doc.get('totalmeal') + ' day ';
                        document.getElementById('dt-mealcredit').innerHTML = doc.get('mc') + ' tk ';
                        document.getElementById('dt-homecredit').innerHTML = doc.get('hc') + ' tk ';
                        if (rate > 0) {
                            document.getElementById('dt-mealdue').innerHTML = (doc.get('totalmeal') * rate) - doc.get('mc') + ' tk ';
                        } else {
                            document.getElementById('dt-mealdue').innerHTML = doc.get('pmeal') - doc.get('mc') + ' tk ';
                        }
                        var du = doc.get('wifi') + doc.get('gass') + doc.get('elec') + doc.get('home') + doc.get('cook') + doc.get('extra') + doc.get('fine') + doc.get('phome') - doc.get('hc');
                        document.getElementById('dt-homedue').innerHTML = du + ' tk ';
                    });
                    loader.style.display = 'none';
                    document.getElementById('fragment-details')
                        .style.display = 'flex';
                })
                .catch(function(error) {

                });
        });

    document.getElementById('cng-admin1').addEventListener('click', e => {
        var value = document.getElementById('value-admin').value;
        db.collection('mess').doc(key).update({
            manager: value
        }).then(function() {
            window.location.reload();
        });
    });
    //reset-------
    document.getElementById('reset').addEventListener('click', e => {
        document.getElementById('fragment-reset').style.display = 'none';
        loader.style.display = 'initial';
        db.collection(code)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var due = doc.get('pmeal') - doc.get('mc');
                    db.collection(code).doc(doc.id).update({
                        pmeal: parseInt(due),
                        totalmeal: 0,
                        mc: 0
                    });
                });
                //db.collection(code).doc()
            })
            .then(function() {
                loader.style.display = 'none';
                AlertHead.innerHTML = 'Success!';
                AlertText.innerHTML = 'Meal counting started from first.';
                Alert.style.display = 'flex';
            });
    });
    //profile-------------
    document.getElementById('save-name').addEventListener('click', e => {
        var name = document.getElementById('names');
        db.collection(code).doc(email)
            .update({
                name: name.value
            });
        Dynamic(code, email, member, key, rate, j);
    });
    document.getElementById('save-phone').addEventListener('click', e => {
        var phone = document.getElementById('phone');
        db.collection(code).doc(email)
            .update({
                phone: phone.value
            });
        Dynamic(code, email, member, key, rate, j);
    });
    document.getElementById('logo').addEventListener('change', function(e) {
        var file = e.target.files[0];
        var storageRef = firebase.storage().ref('profile/' + file.name);
        var task = storageRef.put(file);
        task.on('state_changed', function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            AlertHead.innerHTML = 'Uploading....';
            AlertText.innerHTML = 'Your image is uploading ' + percentage + ' % done.';
            Alert.style.display = 'flex';

        }, function error(err) {
            console.log(err);

        }, function complete() {
            console.log('complete');
            storage.ref('profile/' + file.name).getDownloadURL().then(function(url) {
                // `url` is the download URL for 'images/stars.jpg'
                db.collection(code).doc(email)
                    .update({
                        image: url
                    }).then(function() {
                        AlertHead.innerHTML = 'Uploaded';
                        AlertText.innerHTML = 'Your image is uploaded successfull.';
                        Alert.style.display = 'flex';
                        Dynamic(code, email, member, key, rate, j);
                    });
            }).catch(function(error) {
                // Handle any errors
                AlertHead.innerHTML = 'Error';
                AlertText.innerHTML = error;
                Alert.style.display = 'flex';
            });

        });

    });
    //delete user...........................
    document.getElementById('cng-delete').addEventListener('click', e => {
        var em = document.getElementById('value-delete').value;
        db.collection(code).doc(em).update({
            boolean: false
        }).then(function() {
            window.location.reload();
        })
    });
    //event-------------------
    document.getElementById('addevent').addEventListener('click', e => {
        document.getElementById('eventss').style.display = 'flex';
    });
    document.getElementById('save-event').addEventListener('click', e => {
        loader.style.display = 'initial';
        var Title = document.getElementById('addevent-title');
        var Cost = document.getElementById('addevent-amount');
        var Details = document.getElementById('addevent-details');
        db.collection('mess').doc(key).collection('event').doc().set({
            title: Title.value,
            cost: parseInt(Cost.value),
            text: Details.value,
            date: new Date(),
            open: true
        }).then(function() {
            loader.style.display = 'none';
            document.getElementById('eventss').style.display = 'none';
            AlertHead.innerHTML = 'Successfull!';
            AlertText.innerHTML = 'The new event is created successfull.';
            Alert.style.display = 'flex';
            setTimeout(function() { window.location.reload() }, 1000);
        });
    });

    //buy ticket----------------------------
    //console.log(cost);

}


function Manager(code, j, email, member) {
    loader.style.display = 'block';
    //manager 
    var key;
    db.collection("mess").where("code", "==", code)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                key = doc.id;
                document.getElementById('mess-address').innerHTML = doc.get('address');
                if (doc.get('rate') > 0) {
                    document.getElementById('system').innerHTML = 'Fixed Meal System';
                    document.getElementById('system-btn').checked = 'true';
                    document.getElementById('todays-cost').style.display = 'none';
                } else {
                    document.getElementById('system').innerHTML = 'Avarage Meal System';
                }

                if (email == doc.get('manager') || email == 'sazzad15-2521@diu.edu.bd') {
                    document.getElementById('meal-btn').style.display = 'initial';
                    document.getElementById('bill-btn').style.display = 'initial';
                    document.getElementById('settings-btn').style.display = 'initial';
                    document.getElementById('addevent').style.display = 'flex';

                } else {
                    var p = 100;
                    for (var i = 1; i <= j; i++) {
                        document.getElementById(i).style.display = 'none';
                        document.getElementById(p).style.display = 'none';
                        p++;
                    }
                }
                main_area.style.display = 'flex';
                flash_area.style.display = 'none';
                Dynamic(code, email, member, key, doc.get('rate'));
            });
        });
}

function c() {
    var dism = 0;
    for (var m = 1000; m < 1000 + member; m++) {
        var sp = document.getElementById(m);
        if (sp.checked == true) {
            people[m] = 1;
            dism++;
        } else {
            people[m] = 0;
        }
    }
    txt.innerHTML = 'Selected: ' + dism;
    selected = dism;
}

function Product() {
    loader.style.display = 'initial';
    db.collection('items')
        .orderBy("like", "desc")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                document.getElementById('pd1').insertAdjacentHTML('afterend', "<div class='card'><img src='" + doc.get('img') + "'><h4>" + doc.get('head') + "</h4><div class='font'><p>" + doc.get('text') + "</p></div><p style='margin: 0% 5%; font-size: 13px; font-family: cursive; height: 8%;'>FavorBy " + doc.get('like') + " people <i class='fas fa-plus-circle' id='clickk' onclick='notLogin()'> Add Card</i></p></div>");
            });
        }).then(function() {
            loader.style.display = 'none';
        })
        .catch(function(error) {

        });
}

function Click(x) {
    var m = firebase.firestore.FieldValue.increment(1);
    db.collection('items').doc(x).update({
        like: m
    });
}

function notLogin() {
    AlertHead.innerHTML = 'Faild!';
    AlertText.innerHTML = 'Sign In first..';
    Alert.style.display = 'flex';
}