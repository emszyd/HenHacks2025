import './App.css';
import React, {useState} from "react";


function App() {

  const [showInput, setShowInput] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [itemCount, setItemCount] = useState('');
  const [category, setCategory] = useState('');

  const handleClickFood = () => {
    setCategory('Food')
    setShowInput(true);
  };

  const handleClickClothing = () => {
    setCategory('Clothing')
    setShowInput(true);
  };

  const handleClickGames = () => {
    setCategory('Games')
    setShowInput(true);
  };


  const handleClickBathroomProducts = () => {
    setCategory('Bathroom Products')
    setShowInput(true);
  };

  const handleClickBuildingSupplies = () => {
    setCategory('Building Supplies')
    setShowInput(true);
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleItemCountChange = (e) => {
    setItemCount(e.target.value);
  }
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowInput(false);
    setUserInput('');
    setItemCount('');
  };

  return (
    <div className = "container">
      <div className = "title"> Emergency Pals </div>
      <div className='button-container'>
      <button onClick={handleClickFood}>Food</button>
      <button onClick={handleClickClothing}>Clothing</button>
        <button onClick={handleClickGames}>Games</button>
        <button onClick={handleClickBathroomProducts}>Bathroom Products</button>
        <button onClick={handleClickBuildingSupplies}>Building Supplies</button>
      </div>
      {showInput && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={handleChange}
            placeholder={`Enter Your ${category}`} />
            <input
              type="text"
              value={itemCount}
              onChange={handleItemCountChange}
              placeholder={`How many do you have?`} />
            <button type="submit">Submit</button>
        </form>
        )}
      </div>
);
}

export default App;
