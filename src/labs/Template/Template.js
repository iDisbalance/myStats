import React from 'react'
import Button from '../../button/Button'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    BarController
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    BarElement,
    BarController,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const renderTable = (data) => {
    return (
        <table className="table">
            <tr className="tableRow">
                {
                    data.colls.map(collName => {
                        return (
                            <td className="tableCell">
                                {collName}
                            </td>
                        )
                    })
                }
            </tr>
            {
                (data.i).map((el, id) => {
                    return (
                        <tr className="tableRow">
                            {
                                Object.keys(data).map(key => {
                                    return key !== 'colls' && key !== 'sums' ? (
                                        <td className="tableCell">
                                            {data[key][id]}
                                        </td>
                                    ) : null
                                })
                            }
                        </tr>
                    )
                })
            }
            <tr className="tableRow">
                <td className="tableCell">
                    Сума
                </td>
                <td className="tableCell"/>
                <td className="tableCell"/>
                {
                    data.sums.map(sum => {
                        return (
                            <td className="tableCell">
                                {sum}
                            </td>
                        )
                    })
                }
                <td className="tableCell"/>
                <td className="tableCell"/>
            </tr>
        </table>
    )
}

const renderCharts = (lineOptions1, lineOptions2, lineData1, lineData2, barData ) => {
    return (
        <>
            <Line options={lineOptions1} data={lineData1}/>
            <Bar data={barData}/>
            <Line options={lineOptions2} data={lineData2}/>
        </>
    )
}

const renderBarChart = (data) => {
    return <Bar data={data}/>
}

const Template = ({ labDescription, result }) => {
    const { number, name, goal, tasks } = labDescription
    return (
        <div className="labWrapper">
            <div className="labHeader">
                <p className="labNumber">Lab {number}</p>
                <p className="labName">{name}</p>
            </div>
            <div className="labTaskWrapper">
                <div className="labGoal">
                    Мета роботи: {goal}
                </div>
                <div className="labTasks">
                    Хід роботи:<br/>
                    {tasks.map((task, id) => {
                        return (
                            <>
                                {`${id + 1} ${task.text}`}<br/>
                                {task.tasks && task.tasks.map((subtask, subId) => {
                                    return (
                                        <>
                                            {`${id + 1}.${subId + 1} ${subtask.text}`}<br/>
                                        </>
                                    )
                                })}
                            </>
                        )
                    })}
                </div>
            </div>
            <div className="labComplete">
                <div className="labGoal">
                    Панель запуску завдань
                </div>
                <div className="tasksAndResult">
                    <div className="tasks">
                        {
                            tasks.map((task, id) => {
                                return (
                                    <>
                                        {
                                            task?.tasks ? task.tasks.map(subtask => {
                                                return (
                                                    <div className="task">
                                                        <div className="taskDescription">
                                                            {subtask.text}
                                                        </div>
                                                        <div className="taskRun">
                                                            <Button onClick={subtask.func}/>
                                                        </div>
                                                    </div>
                                                )
                                            }) : 
                                            (
                                                <div className="task">
                                                    <div className="taskDescription">
                                                        {task.text}
                                                    </div>
                                                    <div className="taskRun">
                                                        <Button onClick={task.func}/>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="result">
                        <div className="console">
                            {
                                result && result?.types.map(type => {
                                    return (
                                        type === 'array' ?
                                        JSON.stringify(result?.data, null, 4) :
                                        type === 'string' ?
                                        result?.data :
                                        type === 'charts' ?
                                        renderCharts(result?.data.line.options,
                                            result?.data.line2.options,
                                            result?.data.line.data,
                                            result?.data.line2.data,
                                            result?.data.bar.data
                                        ) :
                                        type === 'bar' ?
                                        renderBarChart(result?.chart.data) :
                                        type === 'table' ?
                                        renderTable(result.data) :
                                        null
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Template;