import http from 'k6/http';
const baseUrl = 'http://localhost:3000/api/v1/booksApp/'

export const options = {
  scenarios: {
    firstTimeShopper: {
      executor: 'per-vu-iterations',
      exec: 'userJourneyLookingForBook',
      vus: 2,
      iterations: 15
    },
    loyalShopper: {
      executor: 'per-vu-iterations',
      exec: 'userJourneyBuyingBook',
      vus: 2,
      iterations: 5
    },
  },
};

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


const filterRandomBook = (books) => {
    const randomBook = books[Math.floor(Math.random()*books.length)];
    return randomBook["_id"]
};


export function userJourneyLookingForBook() {
    const mainPageResp = goToMainPage();

    if (!mainPageResp) {
        throw Error('No response from main page')
    }

    const randomBookId = filterRandomBook(mainPageResp.json());

    goToBooksDetails(randomBookId);
}


export function userJourneyBuyingBook() {
    const mainPageResp = goToMainPage();

    if (!mainPageResp) {
        throw Error('No response from main page')
    }

    const randomBookId = filterRandomBook(mainPageResp.json());

    goToBooksDetails(randomBookId);
    addBookToBasket(randomBookId);

    const basketResp = goToBasket()

    if (!basketResp) {
        throw Error('No response from basket')
    }

    const basketId = basketResp._id
    submitOrder(basketId);
}