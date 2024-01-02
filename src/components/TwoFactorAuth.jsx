import axiosCMS from "../api";
import React, { useEffect, useRef, useReducer, useState } from "react";
import "../styles/TwoFactor.css";

function delaySubmit(submittedValues) {
    console.log(`Submitted: ${submittedValues}`);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1500);
    });
}

function TwoFactorAuth() {
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [status, setStatus] = useState("Verify");
    const [inputValues, setInputValues] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const ref = useRef();

    useEffect(() => {
        requestAnimationFrame(() => {
            if (ref.current !== document.activeElement && focusedIndex == 0) {
                ref.current.focus();
            }
        });
    }, [focusedIndex]);

    useEffect(() => {
        if (inputValues.length >= 6) {
            setIsDisabled(true);
            handleSubmit();
        } else {
            setStatus("Verify");
        }
    }, [inputValues]);

    console.log(status, isDisabled);
    useEffect(() => {
        if (status == "Not Verified") {
            ref.current.focus();
        }
    }, [status]);

    function handleChange(event) {
        const val = event.target.value;
        setInputValues(val);
    }

    function handlePaste(pastedValue) {
        console.log(pastedValue, 70);
        if (pastedValue.length === 6) {
            //   dispatch({ type: "VERIFY" });
            delaySubmit(pastedValue.split("")).then(() => {
                // dispatch({ type: "VERIFY_SUCCESS" })
            });
        }
    }

    const handleSubmit = (e) => {
        // e.preventDefault();
        setStatus("Verifying");

        // dispatch({ type: "VERIFY" });
        delaySubmit(inputValues).then(async () => {
            const result = await axiosCMS("verify2FACode", {
                perisable_6s_token: "756908",
            });
            const message = result?.data?.data?.message;
            if (message == "Not Verified") {
                setStatus(message);
                setIsDisabled(false);
            } else {
                setStatus(message);
                setIsDisabled(true);
            }
            console.log(result, "component result");
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                ref={ref}
                className="TwoFactorInput"
                type="number"
                value={inputValues}
                onChange={handleChange}
                onPaste={handlePaste}
                //   onFocus={handleFocus}
                //   onKeyDown={handleKeyDown}
                //   disabled={status === "pending"}
                disabled={isDisabled}
            />

            <button disabled={isDisabled}>{status}</button>
        </form>
    );
}

export default TwoFactorAuth;


// const initialState = {
//   inputValues: Array(6).fill(""),
//   focusedIndex: 0,
//   status: "idle"
// };

// {/* {status === "pending" ? "Verifying..." : "Verify"} */}
// console.log(focusedIndex, 'focusedIndex');

// const handleKeyDown = (event) => {
//   // if (/\D/.test(event.key) || !!event.target.value) {
//   //     event.preventDefault();
//   //   }

// }

// function NumericInput({
//   index,
//   value,
//   onChange,
//   onPaste,
//   onBackspace,
//   isFocused,
//   onFocus,
//   isDisabled
// }) {
//   const ref = useRef();
//   useEffect(() => {
//     requestAnimationFrame(() => {
//       if (ref.current !== document.activeElement && isFocused) {
//         ref.current.focus();
//       }
//     });
//   }, [isFocused]);

//   function handleChange(e) {
//     onChange(index, e.target.value);
//   }

//   function handlePaste(e) {
//     onPaste(e.clipboardData.getData("text"));
//   }

//   function handleKeyDown(e) {
//     if (e.key === "Backspace") {
//         onBackspace();
//       }
//       else if (/\D/.test(e.key) || !!e.target.value) {
//         e.preventDefault();
//       }
//   }

//   function handleFocus(e) {
//     e.target.setSelectionRange(0, 1);
//     onFocus(index);
//   }

//   return (
//     <input
//       ref={ref}
//       type="text"
//       value={value}
//       onChange={handleChange}
//       onPaste={handlePaste}
//       onKeyDown={handleKeyDown}
//       maxLength="1"
//       onFocus={handleFocus}
//       disabled={isDisabled}
//     />
//   );
// }

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

// function clampIndex(index) {
//   if (index > 6) {
//     return 6;
//   } else if (index < 0) {
//     return 0;
//   } else {
//     return index;
//   }
// }

// function reducer(state, action) {
//   switch (action.type) {
//     case "INPUT":
//       return {
//         ...state,
//         inputValues: [
//           ...state.inputValues.slice(0, action.payload.index),
//           action.payload.value,
//           ...state.inputValues.slice(action.payload.index + 1)
//         ],
//         focusedIndex: clampIndex(state.focusedIndex + 1)
//       };

//     case "BACK":
//       return {
//         ...state,
//         focusedIndex: clampIndex(state.focusedIndex - 1)
//       };

//     case "PASTE":
//       return {
//         ...state,
//         inputValues: state.inputValues.map(
//           (_, index) => action.payload.pastedValue[index] || ""
//         )
//       };

//     case "FOCUS":
//       return {
//         ...state,
//         focusedIndex: action.payload.focusedIndex
//       };

//     case "VERIFY":
//       return {
//         ...state,
//         status: "pending"
//       };

//     case "VERIFY_SUCCESS":
//       return {
//         ...state,
//         status: "idle"
//       };

//     default:
//       throw new Error("unknown action");
//   }
// }
