let game = {
    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function(id) {
        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        card.flipped = true;

        if (!this.firstCard) {
            this.firstCard = card;
            return true;
        } else {
            this.secondCard = card;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function() {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    checkGameOver: function() {
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    techs: [
        'bootstrap', 'electron', 'css', 'firebase', 
        'html', 'javascript', 'jquery', 'mongo', 
        'node', 'react',
    ],

    cards: null,

    createCardsFromTechs: function() {
        this.cards = [];

        this.techs.forEach(tech => {
            this.cards.push(this.createPairFromTech(tech));
        });

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();  
        return this.cards;
    },

    createPairFromTech: function(tech) {
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }];
    },

    createIdWithTech: function(tech) {
        return tech + Math.floor(Math.random() * 1000);
    },

    shuffleCards: function() {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
        }
    }
};