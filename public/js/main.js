$(function () {
    $('body').click(function (e) {
        var el = $(e.target),
            list = App.outsideClick.list;

        for (var i = 0; i < list.length; i++) {
            if (el.closest(list[i].selector).length === 0) {
                if (list[i].dirty) {  // only call widgets which are not dirty (just added)
                    list[i].dirty = false;
                }
                else {
                    list[i].callback(e);
                }
            }
        }
    });
});

console.log(' ◢◤◥◤◥◣◥◤◣◤◥◢◣◤◢◥◤◣◤◥◣◤◥◤◣◥◤◣◣◤◢◣◥◤◢◥◢◢◥◤◣◥◣◣◥◢◥◣◥◤◣◤◤◢◣◥◣◥◢◤◥◢◣◢◥◤◥◣◣◥◣◥◤◢◣◤◤◤◢◥');
console.log('▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▇█▍▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ ');
console.log('▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▃▇███▆▕▁▁▃▇████▍▕▁██▍▕▁▃▇█████████▇▃▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ ');
console.log('▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▂██▕▁▁██▍▕██▍▕▁▁▁▁▁▁██▍▄██▕▁▁▅▃▕▁▁▁▁██▍▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ ');
console.log('▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▄██▕▁▁▁██▍▕██▂▕▁▁▁▁▁▂██▕▁██▍▕▁██▂▕▁▁▂██▍▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ ');
console.log('▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▂▄▆██▕▁▁▁▁▁██▍▕▁██████████▕▁▁▁██▍▕▁███████▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ ');
console.log('▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██▍▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁unconed▕▁▁▁▁▁▁ ');
console.log('◢◤◥◤◢◣◥◤◢◥◣◥◢◥◢◥◢◣◥◥◤◣◥◢◥◣◤◥◤◥◣◥◤◢◣◤◣◢◥◣◥◢◣◥◣◤◢◢◣◤◣◤◢◣◥◣◤◣◤◥◢◥◣◣◤◢◣◥◣◥◣◢◤◢◣◤◢◥◤◥');
