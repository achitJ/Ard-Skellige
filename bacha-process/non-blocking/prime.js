process.on('message', (message) => {

    let result = isPrime(message);
    process.send(result);
    process.exit();

});

function isPrime(number) {
    let startTime = new Date();
    let endTime = new Date();
    let isPrime = true;
    for (let i = 3; i < number; i ++)
    {   

        console.log(i);
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

    return {
        "number" : number,
        "isPrime": isPrime,
        "time": endTime.getTime() - startTime.getTime()
    }

}