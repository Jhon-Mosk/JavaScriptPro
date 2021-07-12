const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());

stats = (action, name, time) => {
    fs.readFile('./json/stats.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(`Статистика не ведёться. Ошибка: ${err}`);
        } else {
            const stats = JSON.parse(data);

            let statsItem = {
                action: action,
                product: name,
                time: time,
            };

            stats.push(statsItem);

            fs.writeFile('./json/stats.json', JSON.stringify(stats), (err) => {
                if (err) {
                    console.log(`Статистика не ведёться. Ошибка: ${err}`);
                } else {
                    console.log("Статистика записана");
                }
            });
        }
    });
};

app.get('/clearStats', (req, res) => {
    fs.readFile('./json/stats.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(`Статистика не очищена. Ошибка: ${err}`);
        } else {
            const stats = [];

            fs.writeFile('./json/stats.json', JSON.stringify(stats), (err) => {
                if (err) {
                    console.log(`Статистика не очищена. Ошибка: ${err}`);
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    });
});

app.get('/catalogData', (req, res) => {
    fs.readFile('./json/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            res.send(data);
        }
    });
});

app.post('/addToCart', (req, res) => {
    fs.readFile('./json/cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            const item = req.body;
            
            fs.readFile('./json/total.json', 'utf-8', (err, data) => {
                if (err) {
                    console.log(`Цена не записана. Ошибка: ${err}`)
                } else {
                    let currentTotal = JSON.parse(data);
                    currentTotal.total += req.body.price;

                    fs.writeFile('./json/total.json', JSON.stringify(currentTotal), (err) => {
                        if (err) {
                            console.log(`Цена не записана. Ошибка: ${err}`)
                        } else {
                            console.log("Цена записана.")
                        }
                    });
                }
            });

            cart.push(item);

            fs.writeFile('./json/cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    stats("addToCart", req.body.product_name, new Date());
                    res.send('{"result": 1}');
                }
            });
        }
    });
});

app.get('/cartData', (req, res) => {
    fs.readFile('./json/cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            res.send(data);
        }
    });
});

app.get('/totalValue', (req, res) => {
    fs.readFile('./json/total.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            res.send(data);
        }
    });
});

app.post('/delFromCart', (req, res) => {
    fs.readFile('./json/cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            let productName = cart[req.body.index].product_name;
            let productPrice = cart[req.body.index].price

            fs.readFile('./json/total.json', 'utf-8', (err, data) => {
                if (err) {
                    console.log(`Цена не записана. Ошибка: ${err}`)
                } else {
                    let currentTotal = JSON.parse(data);
                    currentTotal.total -= productPrice;

                    fs.writeFile('./json/total.json', JSON.stringify(currentTotal), (err) => {
                        if (err) {
                            console.log(`Цена не записана. Ошибка: ${err}`)
                        } else {
                            console.log("Цена записана.")
                        }
                    });
                }
            });

            cart.splice(req.body.index, 1);

            fs.writeFile('./json/cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    stats("delFromCart", productName, new Date());
                    res.send('{"result": 1}');
                }
            });
        }
    });
});

app.get('/clearCart', (req, res) => {
    fs.readFile('./json/cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = [];

            fs.readFile('./json/total.json', 'utf-8', (err, data) => {
                if (err) {
                    console.log(`Цена не записана. Ошибка: ${err}`)
                } else {
                    let currentTotal = JSON.parse(data);
                    currentTotal.total = 0;

                    fs.writeFile('./json/total.json', JSON.stringify(currentTotal), (err) => {
                        if (err) {
                            console.log(`Цена не записана. Ошибка: ${err}`)
                        } else {
                            console.log("Цена сброшена.")
                        }
                    });
                }
            });

            fs.writeFile('./json/cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    stats("clearCart", "all", new Date());
                    res.send('{"result": 1}');
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log('server is running on port 3000!');
})