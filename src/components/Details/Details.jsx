import React from 'react';

class Details extends React.Component {
  state = {
    pressedKey: null,
    count: 0,
  };

  handleIncrement = () => {
    this.setState((state) => {
        return {
            count: state.count + 1
        }
    });
  }

  onKeyDown = event => {
    this.setState({
      pressedKey: event.key,
    });
  };

  // 1 | 2 | 3
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);

    console.log('Деталі було відрендерено(вмонтовано)');
  }

  componentDidUpdate(_, prevState) {
    if(prevState.count !== this.state.count) {
        console.log("Лічильник було збільшено!");
    }

    if(prevState.pressedKey !== this.state.pressedKey) {
        console.log("Користувач натиснув кнопку на клавіатурі!");
    }

    // console.log('Компонент оновився, бо змінилися пропси, або стейт');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);

    console.log('Деталі було видалено з розмітки');
  }

  render() {
    return (
      <div>
        <h2>Some detail title</h2>
        <h3>You`ve just clicked on "{this.state.pressedKey}" button</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          molestias, alias corporis tempore id commodi reprehenderit quibusdam
          est cupiditate aspernatur minima? Sapiente quos beatae est? Debitis at
          facilis culpa sit?
        </p>
        <p>Counter: {this.state.count}</p>
        <button onClick={this.handleIncrement}>Click to increment</button>
      </div>
    );
  }
}

export default Details;
