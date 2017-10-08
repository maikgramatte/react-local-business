import 'whatwg-fetch';

export const getEntries = (values) => {
    let f = fetch('http://homepage/api/add_rechnung.php?get=1&offset=' + values.offset, {
        method: 'get',
    });

    return f;    
}


export const removeEntry = (id) => {
    let f = fetch('http://homepage/api/add_rechnung.php?remove=1&value=' + id, {
        method: 'get',
    });

    return f;    
}

export const getSummary = (values) => {
    let f = fetch('http://homepage/api/add_rechnung.php?summary=1', {
        method: 'get',
    });

    return f;    
}
