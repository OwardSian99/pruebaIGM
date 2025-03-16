import React from "react";

function Table({ columns, data, actions }) {
    return (
        <div className="p-8">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            {columns.map((col, index) => (
                                <th key={index} className="border border-gray-300 px-4 py-2">{col.header}</th>
                            ))}
                            {actions.length > 0 && <th className="border border-gray-300 px-4 py-2">Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="text-center">
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="border border-gray-300 px-4 py-2">
                                        {row[col.field]}
                                    </td>
                                ))}
                                {actions.length > 0 && (
                                    <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                                        {actions.map((action, actionIndex) => (
                                            <button
                                                key={actionIndex}
                                                onClick={() => action.onClick(row)}
                                                className={`py-1 px-3 rounded ${action.className}`}
                                            >
                                                {action.label}
                                            </button>
                                        ))}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
