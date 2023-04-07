import http from 'k6/http';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';


/*
Note that adding options with specific exec, you are forced to run k6 without any additional params.
Otherwise, k6 will automatically start looking for a default function and this script will not work.
 */

export const options = {
  scenarios: {
    firstTimeShopper: {
      executor: 'per-vu-iterations',
      exec: 'firstTimeShopper',
      vus: 2,
      iterations: 5
    },
    loyalShopper: {
      executor: 'per-vu-iterations',
      exec: 'loyalShopper',
      vus: 2,
      iterations: 5
    },
  },
};

class User {
    constructor(name, email) {
        this.name = name
        this.email = email
        this.password = 'TestPassword'
        this.language = "English"
        this.country = "Poland"
        this.currency = "USD"
    }
}

const baseUrl = 'http://localhost:3000/api/v1/booksApp'
let loyalUser;
let tempUser;

const createAccount = (user) => {
    const url = baseUrl + '/register'
    const payload = JSON.stringify(
        {
            "name": user.name,
            "email": user.email,
            "password": user.password,
            "language": user.language,
            "country": user.country,
            "currency": user.currency
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

const login = (user) => {
    const url = baseUrl + '/login'
    const payload = JSON.stringify(
        {
            "email": user.email,
            "password": user.password
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
    // // console.log(res.body)
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
        const json = res.json()
        return json._id
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
        const json = res.json()
        return json._id
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

export function firstTimeShopper () {
    let bookId;
    let basketId;

    goToMainPage();
    bookId = searchForBookByName()

    if (!bookId) {
        throw Error('bookId is not defined')
    }

    goToBooksDetails(bookId);
    addBookToBasket(bookId);
    basketId = goToBasket();

    if (!basketId) {
        throw Error ('basketId is not defined')
    }

    const name = `${uuidv4()}`
    const email = `${name}@gmail.com`
    tempUser = new User(name, email)

    createAccount(tempUser);
    login(tempUser);
    goToBasket()
    submitOrder(basketId);
}

export function loyalShopper() {
    let bookId;
    let basketId;

    goToMainPage();

    // === Workaround for running once per VU ===
    const oncePerVUFunction = () => {
        const name = `${uuidv4()}`
        const email = `${name}@gmail.com`
        loyalUser = new User(name, email)
        createAccount(loyalUser);
    };

    executeOnceUtil(oncePerVUFunction);
    // === Workaround for running once per VU ===
    
    login(loyalUser);
    goToMainPage();
    bookId = searchForBookByName()

    if (!bookId) {
        throw Error('bookId is not defined')
    }

    goToBooksDetails(bookId);
    addBookToBasket(bookId);
    basketId = goToBasket();

    if (!basketId) {
        throw Error ('basketId is not defined')
    }

    submitOrder(basketId);
}