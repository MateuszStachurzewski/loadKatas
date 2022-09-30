import http from 'k6/http';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

const baseUrl = 'http://localhost:3000/api/v1/booksApp'
const name = `${uuidv4()}`
const email = `${uuidv4()}@gmail.com`
const password = 'TestPassword'

const createAccount = () => {
    const url = baseUrl + '/register'
    const payload = JSON.stringify(
        {
            "name": name,
            "email": email,
            "password": password,
            "language": "English",
            "country": "Poland",
            "currency": "USD"
        }
    )
    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const res = http.post(url, payload, params)
    // console.log(res.status)
    // console.log(res.body)
    try {
        return res.json()
    } catch (err) {
        return null
    }
};

const login = () => {
    const url = baseUrl + '/login'
    const payload = JSON.stringify(
        {
            "email": email,
            "password": password
        }
    )
    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const res = http.post(url, payload, params)
    // console.log(res.status)
    // console.log(res.body)
    try {
        return res.json()
    } catch (err) {
        return null
    }
};

const goToMainPage = () => {
    const url = baseUrl + '/books'
    const res = http.get(url)
    // console.log(res.status)
    // console.log(res.body)
    return res
};

const searchForBookByName = () => {
    const url = baseUrl + '/books'
    const payload = JSON.stringify({
        "name": "It Ends with Us: A Novel"
    })
    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const res = http.post(url, payload, params)
    // console.log(res.status)
    // console.log(res.body)
    try {
        return res.json()
    } catch (err) {
        return null
    }
};

const goToBooksDetails = (bookId) => {
    const url = baseUrl + `/books/${bookId}`
    const res = http.get(url)
    // console.log(res.status)
    // console.log(res.body)
    return res
};

const addBookToBasket = (bookId) => {
    const url = baseUrl + '/basket'
    const payload = JSON.stringify({
        "id": `${bookId}`
    })
    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const res = http.post(url, payload, params)
    // console.log(res.status)
    // console.log(res.body)
    return res
};

const goToBasket = () => {
    const url = baseUrl + '/basket'
    const res = http.get(url)
    // console.log(res.status)
    // console.log(res.body)
    try {
        return res.json()
    } catch (err) {
        return null
    }
};

const submitOrder = (basketId) => {
    const url = baseUrl + '/orders'
    const payload = JSON.stringify({
        "basketID": `${basketId}`
    })
    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const res = http.post(url, payload, params)
    // console.log(res.status)
    // console.log(res.body)
    return res
};

const executeOnceUtil = (_function) => {
    if ( __ITER === 0) {
        _function()
    }
}

export default function() {

    // === Workaround for running once per VU ===
    const oncePerVUFunction = () => {
        goToMainPage();
        createAccount();
    };

    executeOnceUtil(oncePerVUFunction);
    // === Workaround for running once per VU ===

    let bookId;

    goToMainPage();

    login();
    goToMainPage();
    const res = searchForBookByName()
    if (res) {
        bookId = res._id;
    }
    if (bookId) {
        goToBooksDetails(bookId);
        addBookToBasket(bookId);
    }
    if (bookId) {
        const res = goToBasket()
        if (res) {
            const basketId = res._id
            submitOrder(basketId);
        }
    }
}