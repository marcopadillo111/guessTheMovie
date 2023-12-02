const letters = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N'
    ,'O','P','Q','R','S','T','U','V','W','X','Y','Z'
];
const movies = {
    'Action': ['taken', 'extraction', 'batman begins'],
    'Comedy': ['dumb and dumber', 'Kung Fu Hustle', 'Paddington'],
    'Animation': ['frozen', 'finding nemo', 'ratatouille'],
    'Horror': ['I.T', 'getout', 'the conjuring'],
    'Sci-Fi': ['interstellar', 'transformers', 'ready player one']
}

let genre ;
let movie = '';
let currentText = '';
let attempt = 7;


for (const genre in movies) {
    if (movies.hasOwnProperty(genre)) {
        const span = document.createElement('span');
        span.className = 'gbStyle';
        span.textContent = genre;
        document.getElementById('genreButtons').appendChild(span);

        span.addEventListener('click', function() {
            clickGenre(this);
        })
    }

}


for (let i = 0; i < letters.length; i++) {
    const letterButton = document.createElement('div');
    letterButton.className = 'letter';
    const span = document.createElement('span');
    span.textContent = letters[i];
    letterButton.appendChild(span);

    letterButton.addEventListener('click', function() {
        clickLetter(this);
    });

    document.getElementById('buttons').appendChild(letterButton);
}

if (genre == undefined) {
    const letterButtons = document.querySelectorAll('.letter');
    letterButtons.forEach(button => button.classList.add('picked'));
}


function pickRandomMovie(gen) {
    const movieArray = movies[gen];
    let index = Math.floor(Math.random() * movieArray.length);
    return movieArray[index];
}

function addSpace(str) {
    return str.split('').join(' ');
}


function clickGenre(element) {
    genre = element.textContent;
    movie = pickRandomMovie(genre);
    currentText = movie.replace(/[a-zA-Z]/g, '_');
    document.querySelector('#attempts').innerText = attempt;
    document.querySelector('#genreContainer').style.display = 'none';
    document.querySelector('#blankWord').style.display = 'flex';
    document.querySelector('#blank').innerHTML = addSpace(currentText).replace(/ /g, '&nbsp;');
    document.querySelectorAll('.letter').forEach(button => button.classList.remove('picked'));
    document.querySelector('#gen').innerText = genre.toUpperCase();

}

function updateCharAt(str, index, newChar) {
    if (index < 0 || index >= str.length) {
        return str;
    }

    const strArray = str.split('');
    strArray[index] = newChar;
    return strArray.join('');
}


function clickLetter(element) {
    element.classList.add('picked');

    if (movie.toUpperCase().includes(element.innerText)) {
        console.log('yes');
        element.classList.add('colorGreen')
    } else {
        element.classList.add('colorRed')
        attempt -= 1;
        if (attempt == 0) {
            document.querySelector('#blankWord').style.display = 'none';
            document.querySelector('#resContainer').style.display = 'flex';
            document.querySelector('#result').innerText = `You Lose! The right answer is: ${movie.toUpperCase()}`;
        }
        document.querySelector('#attempts').innerText = attempt;


    }
    for (let i = 0; i < movie.length; i++) {
        if (movie[i].toUpperCase() == element.innerText) {
            currentText = updateCharAt(currentText, i, element.innerText);
        }
    }
        document.querySelector('#blank').innerHTML = addSpace(currentText).replace(/ /g, '&nbsp;');

    if (currentText.toUpperCase() == movie.toUpperCase()) {
        document.querySelector('#blankWord').style.display = 'none';
        document.querySelector('#resContainer').style.display = 'flex';
        document.querySelector('#result').innerText = `You Won!`;
        
    }


}

function restart() {
    location.reload();
}




