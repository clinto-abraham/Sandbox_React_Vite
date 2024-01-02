import Table from "./components/Table.jsx";
import TwoFactorAuth from "./components/TwoFactorAuth.jsx";
import "./styles/App.css";

const rowDatas = [
  {
    firstName: "clinto abraham Ayamkudiyil",
    age: '31',
    developer: 9,
  },
  {
    firstName: "Daughing Bacchus Winecellars",
    age: 42,
    developer: 10,
  },
  {
    firstName: "Zaughing Bacchus Winecellars",
    age: 42,
    developer: 10,
  },
  {
    firstName: "Laughing Bacchus Winecellars",
    age: 42,
    developer: 10,
  },
  {
    firstName: "abraham",
    age: 52,
    developer: 12,
  },
];

const rowHeadings = ["First Name", "Email", "Contact No."];

function App() {
  return (
    <>
      <TwoFactorAuth />
      <Table heading={'Clinto Table'} rowSize='xlarge' rowDatas={rowDatas} rowHeadings={rowHeadings} />
    </>
  );
}

export default App;
