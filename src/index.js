import React from 'react';
import { render } from 'react-dom';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const win = {
  color: "green",
  fontWeight: "bold",
}

const Card = props => {
  const { key, id, cards, handleClick } = props;
  const { card, flipped } = cards[id];
  const side = flipped ? `https://raw.githubusercontent.com/C4Q/AC_4_Web/master/units/react/exercises/objects_and_arrays/cards/${card}.png`
                       : `https://raw.githubusercontent.com/C4Q/AC_4_Web/master/units/react/exercises/objects_and_arrays/cards/back.png`;

  return (
      <img 
        className="card"
        key={key}
        id={id}
        alt={card} 
        src={side} 
        onClick={handleClick}
      />
  );
};

class Game extends React.Component {
  constructor() {
    super();

    this.cards = {
      1: {card: "apple", flipped: false }, 2: {card: "apple", flipped: false },
      3: {card: "camera", flipped: false }, 4: {card: "camera", flipped: false },
      5: {card: "clover", flipped: false }, 6: {card: "clover", flipped: false },
      7: {card: "coffee", flipped: false }, 8: {card: "coffee", flipped: false },
      9: {card: "heart", flipped: false }, 10: {card: "heart", flipped: false },
      11: {card: "key", flipped: false }, 12: {card: "key", flipped: false },
      13: {card: "paw", flipped: false }, 14: {card: "paw", flipped: false },
      15: {card: "smiley", flipped: false }, 16: {card: "smiley", flipped: false },
      17: {card: "snowflake", flipped: false }, 18: {card: "snowflake", flipped: false },
      19: {card: "star", flipped: false }, 20: {card: "star", flipped: false },      
    };

    this.shuffle = (cardsObj) => {
      let deck = Object.keys(cardsObj);
      for(let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      return deck;
    };

    this.state = {
      deck: [],
      prevId: "",
      currId: "",
      count: 0,
      matches: 0,
    };
  };

  handleClick = (event) => {
    const cards = this.cards;
    let { currId, prevId, count, matches } = this.state;
    const id = event.target.id;
    let currCard = cards[id];
    if(count === 2 || matches > 9 || currCard === cards[prevId] || currCard === cards[currId]) return;

    currCard.flipped = true;

    if (prevId) {
      if (cards[prevId].card === currCard.card && cards[prevId] !== currCard) {
        this.cards[id] = currCard;
        this.setState({
          currId: id,
          prevId: "",
          count: 0,
          matches: matches + 1,
        });
      } else {
          this.setState({
            count: count + 1,
          });
          setTimeout(() => {
            this.cards[prevId].flipped = false;
            currCard.flipped = false; 
            this.cards[id] = currCard;
            this.setState({
              prevId: "",
              count: 0,
            })}, 1250);
      };
    } else {
        this.cards[id] = currCard;
        this.setState({
          count: count + 1,
          prevId: id,
        });
    };
  };

  handleReset = () => {
    const { deck } = this.state;
    const cards = this.cards;
    deck.forEach(id => cards[id].flipped = false);

    this.setState({
      deck: this.shuffle(cards),
      prevId: "",
      count: 0,
      matches: 0,
    });
  }

  componentDidMount() {
    this.setState({
      deck: this.shuffle(this.cards)
    });
  };

  render () {
    const { deck, matches } = this.state;
    return (
      <div className="container" style={styles}>
        <h2> Concentration </h2>
        {deck.map(id => (
            <Card 
              key={id}
              cards={this.cards}
              id={id}
              handleClick={this.handleClick}
            />
          )
        )}
        
        {matches === 10 ? <span style={win}> You won! </span> : <span> Matches: {matches} </span>} {" "} <input type="button" value="reset" onClick={this.handleReset} />
      </div>
    ); 
  };
}

render(<Game />, document.getElementById('root'));