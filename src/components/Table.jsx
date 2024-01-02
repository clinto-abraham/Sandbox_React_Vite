import { FaSort } from "react-icons/fa";
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";
import { GrCaretPrevious } from "react-icons/gr";
import { GrCaretNext } from "react-icons/gr";
import { useEffect, useState } from "react";

const arrayRange = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );

const Table = ({ heading, striped, rowDatas, rowHeadings, rowSize }) => {
    const [rowsFilter, setRowsFilter] = useState(rowDatas);
    const [sortOrder, setSortOrder] = useState(null);
    const [columnIndex, setColumnIndex] = useState(0);
    const fieldVal = rowDatas.map((ele) => Object.values(ele));
    const objectKeys = Object.keys(rowDatas[0]);
    let rows = rowDatas.length;
    const columns = arrayRange(1, rows, 1);
    const handleSort = (columnNo) => {
        const selectedSortField = objectKeys[columnNo]
        let typeCheck;
        const selectVal = Object.values(rowDatas[0])[columnIndex]

        const dataForSort = rowDatas
        setColumnIndex(columnNo);
        const sortAscString = () => dataForSort.sort((p1, p2) => (p1[selectedSortField].toLowerCase() > p2[selectedSortField].toLowerCase()) ? 1 : (p1[selectedSortField].toLowerCase() < p2[selectedSortField].toLowerCase()) ? -1 : 0);
        const sortDescString = () => dataForSort.sort((p1, p2) => (p1[selectedSortField].toLowerCase() < p2[selectedSortField].toLowerCase()) ? 1 : (p1[selectedSortField].toLowerCase() > p2[selectedSortField].toLowerCase()) ? -1 : 0);
        if (sortOrder == null) {
            sortAscString()
            setRowsFilter(dataForSort.sort((a, b) => parseFloat(a[selectedSortField]) - parseFloat(b[selectedSortField])));
            setSortOrder("ascending");
        } else if (sortOrder == "ascending") {
            sortDescString()
            setSortOrder("descending");
            setRowsFilter(dataForSort.sort((a, b) => parseFloat(b[selectedSortField]) - parseFloat(a[selectedSortField])));
        } else {
            sortAscString()
            setRowsFilter(dataForSort.sort((a, b) => parseFloat(a[selectedSortField]) - parseFloat(b[selectedSortField])));
            setSortOrder("ascending");
        }
    };

    return (
        <>
            {heading && <h2>{heading}</h2>}
            <table className={`custom-table ${striped}`}>
                <thead className={"table-head"}>
                    <tr>
                        {rowHeadings.map((headData, columnNo) => (
                            <th key={headData + columnNo}>
                                {headData}
                                <span className="sort-table">
                                    <FaSort onClick={() => handleSort(columnNo)} />
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rowsFilter?.length &&
                        rowsFilter.map((row, index) => (
                            <tr
                                key={index}
                                className={"table-rows"}
                                onClick={() => console.log(`I am clicked on the row ${index}`)}
                            >
                                {columns.map((num) => (
                                    <td
                                        className={`${rowSize ? rowSize : "small"}-row-text`}
                                        key={num}
                                    >
                                        {row[objectKeys[num - 1]]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <button>
                                <MdFirstPage />
                            </button>
                        </td>
                        <td>
                            <GrCaretPrevious /> 1 2 3 ...
                            <GrCaretNext />
                        </td>
                        <td>
                            <button>
                                <MdLastPage />
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default Table;



//   useEffect(() => {
//     let typeCheck;
//     const selectVal = Object.values(rowDatas[0])[columnIndex]
//     console.log(Number(selectVal), 16)
//     if(typeof Number(selectVal) === NaN){
//         const temp = Number(selectVal)
//         console.log(temp, 18, typeof Number(selectVal), typeCheck, String(selectVal), typeof selectVal)

//     }
//     if(Number(selectVal) !== NaN){
//         console.log(Number(selectVal), typeof selectVal, 22)
//         typeCheck = typeof selectVal
//     }

//     console.log(typeCheck)
//   }, [columnIndex])


//   const printSome = rowDatas.map((row, index) =>
//     columns.map((num) => {
//       console.log(row[objectKeys[num - 1]], "row[objectKeys[num-1]]");
//       return row[objectKeys[num - 1]];
//     })
//   );



// useEffect(() => {
//     setRowsFilter(rowDatas);
// }, [sortOrder]);

// import { FaSort } from "react-icons/fa";
// import { MdFirstPage } from "react-icons/md";
// import { MdLastPage } from "react-icons/md";
// import { GrCaretPrevious } from "react-icons/gr";
// import { GrCaretNext } from "react-icons/gr";
// import { useState } from "react";

// const Table = ({ heading, striped, rowDatas, rowHeadings, rowSize }) => {
//   const [columnIndex, setColumnIndex] = useState(0);
//   const fieldVal = rowDatas.map((ele) => Object.values(ele));
//   console.log(fieldVal[0], fieldVal[1]);

//   return (
//     <>
//       {heading && <h2>{heading}</h2>}
//       <table className={`custom-table ${striped}`}>
//         <thead className={"table-head"}>
//           <tr>
//             {rowHeadings.map((headData, columnNo) => (
//               <th key={headData + columnNo}>
//                 {headData}{" "}
//                 <span className="sort-table">
//                   <FaSort onClick={() => setColumnIndex(columnNo)} />
//                 </span>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {fieldVal.map((val, index) => (
//             <tr
//               key={index}
//               className={"table-rows"}
//               onClick={() => console.log(`I am clicked on the row ${index}`)}
//             >
//               {val.map((el, eleIndex) => (
//                 <td
//                   className={`${rowSize ? rowSize : "small"}-row-text`}
//                   key={eleIndex}
//                 >
//                   {" "}
//                   {val[eleIndex]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td>
//               <button>
//                 <MdFirstPage />
//               </button>
//             </td>
//             <td>
//               <GrCaretPrevious /> 1 2 3 ...
//               <GrCaretNext />
//             </td>
//             <td>
//               <button>
//                 <MdLastPage />
//               </button>
//             </td>
//           </tr>
//         </tfoot>
//       </table>
//     </>
//   );
// };

// export default Table;
