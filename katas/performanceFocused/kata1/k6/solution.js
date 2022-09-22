import http from 'k6/http';

const baseUrl = 'http://localhost:3000/api/booksApp/'

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