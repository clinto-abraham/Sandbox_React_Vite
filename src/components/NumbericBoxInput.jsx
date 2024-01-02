import axiosCMS from "../api"
import React, { useEffect, useRef, useReducer } from "react";
import "../styles/TwoFactor.css"; 

// for checking if input type is text or number - it only allows number
    // if (/\D/.test(e.key) || !!e.target.value) {
    //     e.preventDefault();
    //   }



function doSubmit(submittedValues) {
  console.log(`Submitted: ${submittedValues.join("")}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
}

function clampIndex(index) {
  if (index > 6) {
    return 6;
  } else if (index < 0) {
    return 0;
  } else {
    return index;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "INPUT":
      return {
        ...state,
        inputValues: [
          ...state.inputValues.slice(0, action.payload.index),
          action.payload.value,
          ...state.inputValues.slice(action.payload.index + 1)
        ],
        focusedIndex: clampIndex(state.focusedIndex + 1)
      };

    case "BACK":
      return {
        ...state,
        focusedIndex: clampIndex(state.focusedIndex - 1)
      };

    case "PASTE":
      return {
        ...state,
        inputValues: state.inputValues.map(
          (_, index) => action.payload.pastedValue[index] || ""
        )
      };

    case "FOCUS":
      return {
        ...state,
        focusedIndex: action.payload.focusedIndex
      };

    case "VERIFY":
      return {
        ...state,
        status: "pending"
      };

    case "VERIFY_SUCCESS":
      return {
        ...state,
        status: "idle"
      };

    default:
      throw new Error("unknown action");
  }
}

const initialState = {
  inputValues: Array(6).fill(""),
  focusedIndex: 0,
  status: "idle"
};

function App() {
  const [{ inputValues, focusedIndex, status }, dispatch] = useReducer(
    reducer,
    initialState
  );
  console.log(focusedIndex, 'focusedIndex');

  function handleInput(index, value) {
    console.log('input handle is hit')
    dispatch({ type: "INPUT", payload: { index, value } });
  }

  function handleBack() {
    if(focusedIndex > 0) dispatch({ type: "BACK" });
  }

  function handlePaste(pastedValue) {
    dispatch({ type: "PASTE", payload: { pastedValue } });

    if (pastedValue.length === 6) {
      dispatch({ type: "VERIFY" });
      doSubmit(pastedValue.split("")).then(() =>
        dispatch({ type: "VERIFY_SUCCESS" })
      );
    }
  }

  function handleFocus(focusedIndex) {
    dispatch({ type: "FOCUS", payload: { focusedIndex } });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axiosCMS('verify2FACode', {
        "perisable_6s_token": "756908"
    })
    console.log(result, 'component result')

    dispatch({ type: "VERIFY" });
    doSubmit(inputValues).then(() => dispatch({ type: "VERIFY_SUCCESS" }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="inputs">
        {inputValues.map((value, index) => {
          return (
            <NumericInput
              key={index}
              index={index}
              value={value}
              onChange={handleInput}
              onBackspace={handleBack}
              onPaste={handlePaste}
              isFocused={index === focusedIndex}
              onFocus={handleFocus}
              isDisabled={status === "pending"}
            />
          );
        })}
      </div>
      <button disabled={status === "pending"}>
        {status === "pending" ? "Verifying..." : "Verify"}
      </button>
    </form>
  );
}

export default App

function NumericInput({
  index,
  value,
  onChange,
  onPaste,
  onBackspace,
  isFocused,
  onFocus,
  isDisabled
}) {
  const ref = useRef();
  useEffect(() => {
    requestAnimationFrame(() => {
      // console.log(
      //   ref.current,
      //   document.activeElement,
      //   ref.current !== document.activeElement
      // );
      if (ref.current !== document.activeElement && isFocused) {
        ref.current.focus();
      }
    });
  }, [isFocused]);

  function handleChange(e) {
    onChange(index, e.target.value);
  }

  function handlePaste(e) {
    onPaste(e.clipboardData.getData("text"));
  }

  function handleKeyDown(e) {
    if (e.key === "Backspace") {
        onBackspace();
      }
      else if (/\D/.test(e.key) || !!e.target.value) {
        e.preventDefault();
      }
  }

  function handleFocus(e) {
    e.target.setSelectionRange(0, 1);
    onFocus(index);
  }

  return (
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={handleChange}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      maxLength="1"
      onFocus={handleFocus}
      disabled={isDisabled}
    />
  );
}

// 123456
// 654321

// const TwoFactorAuth = () => {
//     const handleSubmit = async () => {
//         const result = await axiosCMS('verify2FACode', {
//             "perisable_6s_token": "756908"
//         })
//         console.log(result, 'component result')
//     }
//     return (<>
//         <label>2FA Code</label>
        
//         <input type="text" id="twoFactorAuth" name="twoFactorAuth"></input>
//         <br />
//         <button onClick={handleSubmit}>Submit</button>
//         <input type="submit" value="Submit"></input>
//     </>)
// }

// export default TwoFactorAuth