import 'whatwg-fetch'

var positionAdd = function (values) {
    fetch('http://homepage/api/add_rechnung.php', {
        method: 'post',
        body: JSON.stringify(values)
    });
}

export default positionAdd;