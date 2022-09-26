    import http from 'k6/http';
const baseUrl = 'http://localhost:3000/api/v1/booksApp/'

const goToMainPage = () => {
    const url = baseUrl + '/books'
    const res = http.get(url)
    // console.log(res.status)
    // console.log(res.body)
    return res
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

const loop = (options) => {
    let resp;
    [...Array(options.times)].forEach((item, i) => {
        resp = options.callback(i)
    });
    return resp;
};

const filterRandomBook = (books) => {
    const randomBook = books[Math.floor(Math.random()*books.length)];
    return randomBook["_id"]
};

const pickRandomBook = function() {
    const resp = goToMainPage();
    if (resp) {
        const randomBookId = filterRandomBook(resp.json());
        goToBooksDetails(randomBookId);
        return randomBookId
    }
};

const randomExecutor = (funcs) => {
    const randomNumber = Math.floor(Math.random() * funcs.length)
    const func = funcs[randomNumber].func
    const args = funcs[randomNumber].args
    return func(args)
};

export default function() {
    const funcsToExecute = [
        {
            func: loop, args: {times: 3, callback: pickRandomBook}
        },
        {
            func: pickRandomBook, args: {}
        }
    ]
    const randomBookId = randomExecutor(funcsToExecute)
    if (randomBookId) {
        addBookToBasket(randomBookId);
        const res = goToBasket()
        if (res) {
            const basketId = res._id
            submitOrder(basketId);
        }
    }
}