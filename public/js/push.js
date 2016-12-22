//Push notification button
/*var fabPushElement = document.querySelector('.fab__push');
var fabPushImgElement = document.querySelector('.fab__image');*/
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const applicationServerPublicKey = 'BGTb4T7Kqg5pl-72D-jq737-LBHTCnSifQ8GD6i3EEHZFRwrPa3N22gql5AW_sbR2wgW3Kbu3k05owVtWK_yaPU';
const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey)
//To check `push notification` is supported or not
function isPushSupported() {
    //To check `push notification` permission is denied by user
    if (Notification.permission === 'denied') {
        console.warn('User has blocked push notification.');
        return;
    }

    //Check `push notification` is supported or not
    if (!('PushManager' in window)) {
        console.error('Push notification isn\'t supported in your browser.');
        return;
    }

    //Get `push notification` subscription
    //If `serviceWorker` is registered and ready
    navigator.serviceWorker.ready
        .then(function (registration) {
            registration.pushManager.getSubscription()
                .then(function (subscription) {
                    //If already access granted, enable push button status
                    if (subscription) {
                        // changePushStatus(true);
                    }
                    else {
                        // changePushStatus(false);
                    }
                })
                .catch(function (error) {
                    console.error('Error occurred while enabling push ', error);
                });
        });
}

//To subscribe `push notification`
function subscribePush() {
    navigator.serviceWorker.ready.then(function(registration) {
        if (!registration.pushManager) {
            console.error('Your browser doesn\'t support push notification.');
            return false;
        }

        registration.pushManager.getSubscription()
            .then(function(subscription){
                const isSubscribed = !(subscription === null)

                if (isSubscribed) {
                    console.log('Subcription already done', JSON.stringify(subscription));
                    return;
                }

                //To subscribe `push notification` from push manager
                registration.pushManager.subscribe({
                    userVisibleOnly: true, //Always show notification when received
                    applicationServerKey: applicationServerKey
                })
                    .then(function (subscription) {

                        toast('Subscribed successfully.');
                        console.info('Push notification subscribed.');
                        // changePushStatus(true);
                        // sendPushNotification();
                    })
                    .catch(function (error) {
                        // changePushStatus(false);
                        console.error('Push notification subscription error: ', error);
                    });
            });


    })
}

//To unsubscribe `push notification`
function unsubscribePush() {
    navigator.serviceWorker.ready
        .then(function(registration) {
            //Get `push subscription`
            registration.pushManager.getSubscription()
                .then(function (subscription) {
                    //If no `push subscription`, then return
                    if(!subscription) {
                        console.error('Unable to unregister push notification.');
                        return;
                    }

                    //Unsubscribe `push notification`
                    subscription.unsubscribe()
                        .then(function () {
                            toast('Unsubscribed successfully.');
                            console.info('Push notification unsubscribed.');
                            changePushStatus(false);
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                })
                .catch(function (error) {
                    console.error('Failed to unsubscribe push notification.');
                });
        })
}

//To change status
function changePushStatus(status) {
    fabPushElement.dataset.checked = status;
    fabPushElement.checked = status;
    if (status) {
        fabPushElement.classList.add('active');
        fabPushImgElement.src = '../images/push-on.png';
    }
    else {
        fabPushElement.classList.remove('active');
        fabPushImgElement.src = '../images/push-off.png';
    }
}

//Click event for subscribe push
/*
fabPushElement.addEventListener('click', function () {
    var isSubscribed = (fabPushElement.dataset.checked === 'true');
    if (isSubscribed) {
        unsubscribePush();
    }
    else {
        subscribePush();
    }
});
*/


subscribePush()

//Form data with info to send to server
function sendPushNotification() {
    navigator.serviceWorker.ready
        .then(function(registration) {
            //Get `push subscription`
            registration.pushManager.getSubscription().then(function (subscription) {
                //Send `push notification` - source for below url `server.js`
                fetch('https://progressive-web-application.herokuapp.com/send_notification', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(subscription)
                })
                    .then(function(response) {
                        return response.json();
                    })
            })
        })
}

isPushSupported();