import http from 'k6/http';
import {
    group
} from 'k6';

export const options = {
    vus: 1,
    iterations: 2
    // duration: '60s'
};

const baseUrl = 'http://localhost:3000/api/v1/booksApp/'

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

export default function() {
    let bookId;
    group('Find a book', () => {
        goToMainPage();
        const res = searchForBookByName()
        if (res) {
            bookId = res._id;
        }
    })
    group('Add to basket', () => {
        if (bookId) {
            goToBooksDetails(bookId);
            addBookToBasket(bookId);
        }
    })
    group('Buy a book', () => {
        if (bookId) {
            const res = goToBasket()
            if (res) {
                const basketId = res._id
                submitOrder(basketId);
            }
        }
    })
}