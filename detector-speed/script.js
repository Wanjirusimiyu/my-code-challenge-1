function checkSpeed() {
    let speed = parseFloat(document.getElementById("speed").value);
    let points = (speed - 70) / 5;
    let result = document.getElementById("result");

    if (speed <= 70) {
        result.innerHTML = "Ok";
    } else if (points > 12) {
        result.innerHTML = "License suspended";
    } else {
        result.innerHTML = `Points: ${Math.floor(points)}`;
    }
}
