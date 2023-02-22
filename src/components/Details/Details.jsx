import React, { useEffect, useState } from 'react';

/*
  1. useEffect(() => {
    window.addEventListener('keydown', someFunc);

    console.log('Компонент було відрендерено(вмонтовано)');

    return () => { - componentWillUnmount
      window.removeEventListener('keydown', someFunc);

      console.log('Компонент було видалено з розмітки');
    } 
  }, []) - componentDidMount(пустий массив залежностей)

  2. useEffect(() => {
      if(dep1 === dep1InitialVal && dep2 === dep2InitialVal && dep3 === dep3InitialVal) return;
      
      console.log("Лічильник було збільшено!");
     }, [dep1, dep2, dep3, ...]) - componentDidUpdate + componentDidMount (обов'язково робити перевірку на початкове значення)

*/

function Details(props) {
  // const state = {
  //   pressedKey: null,
  //   count: {
  //   increment: 0,
  //   decrement: 0,
  //  },
  // };
  //       geter        seter
  const [pressedKey, setPressedKey] = useState(null);
  const [count, setCount] = useState(null);

  const onClick = (id) => { // 3
    
  };

  const onKeyDown = event => {
    // this.setState({
    //   pressedKey: event.key,
    // });

    setPressedKey(event.key);
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    console.log('Деталі було відрендерено(вмонтовано)');

    return () => {
      window.removeEventListener('keydown', onKeyDown);

      console.log('Деталі було видалено з розмітки');
    };
  }, []);

  useEffect(() => {
    if (count === null) return;

    console.log('Лічильник було збільшено!');
  }, [count]);

  useEffect(() => {
    if (pressedKey === null) return;

    console.log('Користувач натиснув кнопку на клавіатурі!');
  }, [pressedKey]);

  // componentDidMount() {
  //   window.addEventListener('keydown', this.onKeyDown);

  //   console.log('Деталі було відрендерено(вмонтовано)');
  // }

  // componentDidUpdate(_, prevState) {
  //   if(prevState.count !== this.state.count) {
  //       console.log("Лічильник було збільшено!");
  //   }

  //   if(prevState.pressedKey !== this.state.pressedKey) {
  //       console.log("Користувач натиснув кнопку на клавіатурі!");
  //   }
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.onKeyDown);

  //   console.log('Деталі було видалено з розмітки');
  // }

  return (
    <div>
      <h2>Some detail title</h2>
      <h3>You`ve just clicked on "{pressedKey}" button</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
        molestias, alias corporis tempore id commodi reprehenderit quibusdam est
        cupiditate aspernatur minima? Sapiente quos beatae est? Debitis at
        facilis culpa sit?
      </p>
      <p>Counter: {count ?? 0}</p>
      <button onClick={() => onClick(3)}>Click to increment</button>
    </div>
  );
}

export default Details;
