import React, { useCallback, useEffect, useRef, useState } from 'react';

function Select(props) {
  const { data, onChange, placeholder, value, defaultValue, name } = props;

  const [dropdown, setDropdown] = useState(false);
  const [selected, setSelected] = useState(false);

  const refSelect = useRef(null);

  useEffect(() => {
    if (defaultValue) {
      onChange({ name, value: defaultValue })
      setSelected(defaultValue)
    }
  }, []);

  useEffect(() => {
    if (selected !== value) {
      setSelected(value)
    }
  }, [value]);

  const handleClickBody = useCallback(e => {
    if (!refSelect?.current?.contains(e.target)) {
      setDropdown(false);
      document.documentElement.removeEventListener("click", handleClickBody);
    }
  }, []);

  useEffect(() => {
    return () => {
      document.documentElement.removeEventListener("click", handleClickBody);
    };
  }, [handleClickBody]);

  const handleDropdown = (e) => {
    setDropdown(!dropdown);
    document.documentElement.addEventListener("click", handleClickBody);
  }
  const handleChange = (value) => {
    onChange({ name, value });
    setDropdown(false);
  }
  const current = data.find(item => item.value === selected);
  return (
    <div ref={refSelect} className={"select-container" + (dropdown ? " active" : "")}  >
      <div className="select-holder" onClick={handleDropdown}  >
        <div className="select-holder-text">
          <div className="one-line-text">{current?.label || placeholder}</div>
        </div>
        <i className="icon dropdown-icon" />
      </div>
      <ul className="select-dropdown">
        {data.map(item => {
          return (
            <li
              key={item.value}
              className={"select-item" + (item.value === value ? " active" : "")}
              onClick={e => handleChange(item.value)}
            >
              <div className="select-item-text  one-line-text">
                {item.label}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default React.memo(Select)