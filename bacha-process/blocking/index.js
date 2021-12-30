const express = require('express');
const app = express();

app.get('/', (req, res) => {

    let number = parseInt(req.query.number);
    isPrime(number)
    .then(result => {
        res.send(result);
    }); 

});

app.listen(3000, () => {

    console.log('Server is running on port 3000');

});

const isPrime = (number) => { 
    
    return new Promise((resolve, reject) => {

        let startTime = new Date();
        let endTime = new Date();
        let isPrime = true;
        for (let i = 3; i < number; i ++)
        {   
            // console.log(i);
            //it is not a prime break the loop,
            // see how long it took
            if (number % i === 0) 
            {
                endTime = new Date();
                isPrime = false;
                break;
            }
        }

        if (isPrime) endTime = new Date();

        resolve({
            "number" : number,
            "isPrime": isPrime,
            "time": endTime.getTime() - startTime.getTime()
        });

    });

};

//29355126551