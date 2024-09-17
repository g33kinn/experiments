const cardWrapper = document.querySelector('.card-wrapper'),
    choosePanel = document.querySelector('.choose-panel');
const stepCapacity = 30;
let step = -1;
let result = [0, 0, 0, 0];
let stage = 0;
let chooseItems = [];
let keyboardCheck = false;

cardWrapper.innerHTML = `<div class = "description">Приветствуем! <br> 
    Запоминайте пиктограммы и слова появляющиеся в этой рамке и попробуйте восстановить их порядок. На запоминание вам дается 1.5 секунды. <br>
    1 этап: Словесные формы чисел большого размера <br>
    2 этап: Пиктограммы маленького размера <br>
    3 этап: Словесные формы чисел разного размера <br>
    4 этап: Пиктограммы разного размера <br>
    Выбрать пиктограмму или слово можно кликнув на элемент в панели сверху или нажатием клавиш 0-9. <br>
    Перед началом теста запомните как выглядят пиктограммы<br><br>
    <img src = "pict.png"></img>   
    </div>`;

document.addEventListener('keydown', function (event) {
    if (!choosePanel.classList.contains('hide') || keyboardCheck) {
        switch (event.key) {
            case '0':
                chooseItems[0].click();
                break;
            case '1':
                chooseItems[1].click();
                break;
            case '2':
                chooseItems[2].click();
                break;
            case '3':
                chooseItems[3].click();
                break;
            case '4':
                chooseItems[4].click();
                break;
            case '5':
                chooseItems[5].click();
                break;
            case '6':
                chooseItems[6].click();
                break;
            case '7':
                chooseItems[7].click();
                break;
            case '8':
                chooseItems[8].click();
                break;
            case '9':
                chooseItems[9].click();
                break;
            case 'Enter':
                document.querySelector('button.next').click();
                break;
        }
    }
});

class Card {
    constructor(code, content, type, size = '4em') {
        this.code = code;
        this.content = content;
        this.type = type;
        this.size = size;        
    }

    createCard() {
        const element = document.createElement('div');
        element.style = this.type === 'word' ? `font-size: ${this.size};` : 'min-width: 150px; min-height: 150px';
        element.classList.add('card');
        element.setAttribute('data-code', `${this.code}`);
        element.innerHTML += this.content;
        return element;
    }

    drawCard(card, parent) {
        parent.append(card);
    }
}

const wordsBig = [
    new Card(0, 'ноль', 'word', '4.5em'),
    new Card(1, 'один', 'word', '4.5em'),
    new Card(2, 'два', 'word', '4.5em'),
    new Card(3, 'три', 'word', '4.5em'),
    new Card(4, 'четыре', 'word', '4.5em'),
    new Card(5, 'пять', 'word', '4.5em'),
    new Card(6, 'шесть', 'word', '4.5em'),
    new Card(7, 'семь', 'word', '4.5em'),
    new Card(8, 'восемь', 'word', '4.5em'),
    new Card(9, 'девять', 'word', '4.5em'),
];

let images = ['assets/zero.png', 'assets/one.png', 'assets/two.png', 'assets/three.png', 'assets/four.png', 'assets/five.png',
    'assets/six.png', 'assets/seven.png', 'assets/eight.png', 'assets/nine.png'];

const iconsSmall = images.map((imagePath, index) => {
    return new Card(index, `<img src="${imagePath}" alt="Image ${index}" style="width: 75px; height: 75px">`, 'img', '75');
});

const wordsRandomSize = [
    new Card(0, 'ноль', 'word', '4em'),
    new Card(1, 'один', 'word', '2em'),
    new Card(2, 'два', 'word', '4.5em'),
    new Card(3, 'три', 'word', '3em'),
    new Card(4, 'четыре', 'word', '3em'),
    new Card(5, 'пять', 'word', '4em'),
    new Card(6, 'шесть', 'word', '4.5em'),
    new Card(7, 'семь', 'word', '2em'),
    new Card(8, 'восемь', 'word', '3em'),
    new Card(9, 'девять', 'word', '2em'),
];

const iconsRandomSize = [
    new Card(0, `<img src="${images[0]}" alt="Image ${0}" style="width: 175px; height: 175px">`, '175'),
    new Card(1, `<img src="${images[1]}" alt="Image ${0}" style="width: 125px; height: 125px">`, '125'),
    new Card(2, `<img src="${images[2]}" alt="Image ${0}" style="width: 200px; height: 200px">`, '200'),
    new Card(3, `<img src="${images[3]}" alt="Image ${0}" style="width: 100px; height: 100px">`, '100'),
    new Card(4, `<img src="${images[4]}" alt="Image ${0}" style="width: 150px; height: 150px">`, '150'),
    new Card(5, `<img src="${images[5]}" alt="Image ${0}" style="width: 175px; height: 175px">`, '175'),
    new Card(6, `<img src="${images[6]}" alt="Image ${0}" style="width: 75px; height: 75px">`, '75'),
    new Card(7, `<img src="${images[7]}" alt="Image ${0}" style="width: 200px; height: 200px">`, '200'),
    new Card(8, `<img src="${images[8]}" alt="Image ${0}" style="width: 125px; height: 125px">`, '125'),
    new Card(9, `<img src="${images[9]}" alt="Image ${0}" style="width: 150px; height: 150px">`, '150'),
];

const cardPool = [
    wordsBig,
    iconsSmall,
    wordsRandomSize,
    iconsRandomSize
];

function setChoosePanel() {
    cardPool[stage].forEach(item => {
        const card = item.createCard();
        choosePanel.append(card);
        chooseItems.push(card);
        card.addEventListener('click', () => {
            if (card.classList.contains('active')) {
                item.drawCard(card, choosePanel);
                card.classList.remove('active');
            } else if (cardWrapper.childNodes.length < 5) {
                card.classList.add('active');
                item.drawCard(card, cardWrapper);
            }
            if (cardWrapper.childNodes.length == 5) {
                document.querySelector('button.next').removeAttribute('disabled');
                choosePanel.classList.add('hide');
                keyboardCheck = true;
            } else {
                document.querySelector('button.next').setAttribute('disabled', '');
                choosePanel.classList.remove('hide');
                keyboardCheck = false;
            }
        });
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.querySelector('button.next').addEventListener('click', async (e) => {
    keyboardCheck = false;
    e.target.setAttribute('disabled', '');
    step++;
    cardWrapper.childNodes.forEach((card, i) => {
        if (card && step > 0 && (card.getAttribute('data-code')) == steps[step - 1][i]) {
            result[stage] += 1;
            Array.from(cardWrapper.childNodes)[i].classList.add('correct');
        } else if (card && step) {
            Array.from(cardWrapper.childNodes)[i].classList.add('wrong');
        }
    });
    await sleep(2000);

    if (step < steps.length / 4) {
        chooseItems = [];
        choosePanel.innerHTML = '';
        setChoosePanel();
        cardWrapper.innerHTML = '';
        choosePanel.classList.add('hide');
        e.target.textContent = 'Next';
        e.target.setAttribute('disabled', '');
        steps[step].forEach((iter) => {
            cardPool[stage][iter].drawCard(cardPool[stage][iter].createCard(), cardWrapper);
        });
        setTimeout(() => {
            cardWrapper.innerHTML = '';
            choosePanel.classList.remove('hide');
        }, 1500);
    } else {
        if (stage < 3) {
            console.log(result);
            stage++;
            step = -1;
            cardWrapper.innerHTML = `<div class = "description" style="font-size: 2em">Этап завершен!</div>`;
        } else {
            document.querySelector('body').innerHTML = `Поздравляем! Ваш результат: <br> 
            Большие слова - ${(result[0] / stepCapacity) * 100}% <br>
            Маленькие пиктограммы - ${(result[1] / stepCapacity) * 100}% <br>
            Разного размера слова - ${(result[2] / stepCapacity) * 100}% <br>
            Разного размера пиктограммы - ${(result[3] / stepCapacity) * 100}%`;
        }
    }
    if (step == -1) e.target.removeAttribute('disabled');
});

const steps = [
    [7, 9, 2, 4, 6],
    // [3, 1, 8, 2, 7],
    // [4, 8, 0, 5, 7],
    // [2, 6, 8, 3, 5],

    [6, 3, 5, 7, 0],
    // [9, 1, 3, 8, 2],
    // [5, 9, 2, 4, 6],
    // [3, 6, 4, 1, 0],

    [6, 3, 0, 9, 8],
    // [4, 7, 5, 0, 1],
    // [2, 6, 8, 9, 4],
    // [3, 0, 1, 8, 5],
    
    [0, 4, 9, 6, 2],
    // [7, 5, 4, 1, 9],
    // [1, 7, 9, 8, 5],
    // [6, 4, 2, 0, 9],
];