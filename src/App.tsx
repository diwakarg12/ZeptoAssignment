import React, { useState } from 'react';
import { data } from './data';

interface Item {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

function App() {
  const [items, setItems] = useState<Item[]>(data);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [backspacePressed, setBackspacePressed] = useState(false);
  const [isNamesListVisible, setIsNamesListVisible] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsNamesListVisible(true);
    if (event.target.value !== '') {
      setBackspacePressed(false);
    }
  };

  const handleItemClick = (item: Item) => {
    setSelectedItems([...selectedItems, item]);
    setItems(items.filter((i) => i.id !== item.id));
    setInputValue('');
    setBackspacePressed(false);
    setIsNamesListVisible(false);
  };

  const handleChipRemove = (item: Item) => {
    setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    setItems([...items, item]);
    setBackspacePressed(false);
  };

  const handleNameClick = (item: Item) => {
    if (!selectedItems.find((selected) => selected.id === item.id)) {
      handleItemClick(item);
    } else {
      handleChipRemove(item);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      if (inputValue === '') {
        const lastItem = selectedItems[selectedItems.length - 1];
        if (lastItem) {
          event.preventDefault();
          if (backspacePressed) {
            handleChipRemove(lastItem);
          } else {
            setBackspacePressed(true);
          }
        }
      }
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen ">
      <h1 className='text-slate-600 font-bold text-5xl m-auto mt-10 mb-10 font-serif underline'>Zepto Assignment</h1>
      {/* Top Section - Input Box and Added Names */}
      <div className="flex items-center border-b border-gray-300 p-4">
        {/* Left Section - Added Names */}
        <div className="flex flex-wrap space-x-2 w-3/4 h-full">
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center bg-green-500 text-white rounded-full px-3 py-1 ${
                backspacePressed && 'bg-yellow-200 text-black'
              } mb-2`}
            >
              <img
                src={item.avatar}
                alt={item.name}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className={`mr-2 ${
                backspacePressed && 'text-black'
              }`}>{item.name}</span>

              <button
                type="button"
                className=" text-orange-500 hover:text-black"
                onClick={() => handleChipRemove(item)}
              >
                <span className="sr-only">Remove {item.name}</span>
                <svg
                  className="h-5 w-5 stroke-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Right Section - Input Box */}
        <div className="relative w-1/4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsNamesListVisible(true)}
            className="w-full border-none focus:outline-none border-b border-gray-300 py-2 pl-3 text-md placeholder-gray-500 font-serif"
            placeholder="Search for Any Person..."
          />
          {isNamesListVisible && filteredItems.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
              {filteredItems.map((item) => (
                <li
                  key={item.id}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleNameClick(item)}
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span>{item.name}</span><br />
                  <span className='text-blue-500'>{item.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Bottom Section - Remaining Content (if any) */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Add your remaining content here */}
      </div>
    </div>
  );
}

export default App;
