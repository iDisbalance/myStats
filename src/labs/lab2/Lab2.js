import React, { useState, useEffect } from "react";
import Template from "../Template/Template";
import generated from '../../generated.json'
import { generateArrayOfNumbers, getBaseLog, makeTableData } from "../../utils/utils";

const Lab2 = ({generatedArr, setGeneratedArr}) => {
    const [result, setResult] = useState(null)

    const task1 = () => {
        const numbers = generateArrayOfNumbers(100, false, 18, 80)
        const sortedNumbers = [...numbers].sort((a, b) => {
            if(a > b)
                return 1
            if(a < b)
                return -1
            return 0
        })
        setGeneratedArr(sortedNumbers)
        const xMax = sortedNumbers[sortedNumbers.length - 1]
        const xMin = sortedNumbers[0]
        const r = xMax - xMin
        const m = 1 + 3.3221 * getBaseLog(10, 100)
        const result = {
            "Вибірка": numbers,
            "Ранжована вибірка": sortedNumbers,
            "Xmin": xMin,
            "Xmax": xMax,
            "R = Xmax - Xmin": `${xMax} - ${xMin} = ${Math.round(r * 100) / 100}`,
            "m = 1 + 3.3221 * lgn": `n = 100, m = ${Math.round(m * 100) / 100}`,
            "k = (Xmax - Xmin) / (1 + 3.3221 * lgn)": Math.round(( r / m) * 100) / 100
        }
        const data = {
            types: ['array'],
            data: result
        }
        setResult(data)
    }

    const task2 = () => {
        const data = {
            types: ['table'],
            data: makeTableData(generatedArr)
        }
        setResult(data)
    }

    const task3 = () => {
        const tableData = makeTableData(generatedArr)
        tableData.chart = true
        tableData.line = {
            data: {
                labels: tableData.intervalMiddles,
                datasets: [
                    {
                        label: 'Полігон',
                        data: tableData.subFrequency,
                        borderColor: 'rgb(0, 128, 0)',
                        backgroundColor: 'rgb(0, 0, 0)'
                    }
                ]
            },
            options: {
                scales: {
                    xAxis: {
                        grid: { borderColor: 'rgb(0, 128, 0)' },
                        title: {
                            display: true,
                            text: 'Xi'
                        },
                    },
                    yAxis: {
                        grid: { borderColor: 'rgb(0, 128, 0)' },
                        title: {
                            display: true,
                            text: 'W'
                        },
                    }
                }
            }
        }
        tableData.bar = {
            data: {
                labels: tableData.intervals.map(el => {
                    const splitedValue = el.split(' - ')
                    return `${splitedValue[0]}                   `
                }),
                datasets: [
                    {
                        label: 'Гістограма',
                        data: tableData.frequency,
                        backgroundColor: 'rgba(0, 128, 0,  0.5)',
                        borderColor: 'rgb(0, 128, 0)',
                        borderWidth: 1,
                        categoryPercentage: 0.9,
                        barPercentage: 0.9
                    }
                ]
            },
            options: {
                scales: {
                    xAxis: {
                        grid: { borderColor: 'rgb(0, 128, 0)' },
                        title: {
                            display: true,
                            text: 'Xi'
                        },
                    },
                    yAxis: {
                        grid: { borderColor: 'rgb(0, 128, 0)' },
                        title: {
                            display: true,
                            text: 'W'
                        },
                    }
                }
            }
        }
        tableData.line2 = {
            data: {
                labels: [tableData.intervals[0].split(' - ')[0], ...tableData.intervals.map((el, id) => {
                    const splitedValue = el.split(' - ')
                    return splitedValue[1]
                })],
                datasets: [
                    {
                        label: 'Полігон',
                        data: [0, ...tableData.collectedSubFrequency],
                        borderColor: 'rgb(0, 128, 0)',
                        backgroundColor: 'rgb(0, 0, 0)'
                    }
                ]
            },
            options: {
                scales: {
                    xAxis: {
                        grid: { borderColor: 'rgb(0, 128, 0)' },
                        title: {
                            display: true,
                            text: 'Xi'
                        },
                    },
                    yAxis: {
                        grid: { borderColor: 'rgb(0, 128, 0)' },
                        title: {
                            display: true,
                            text: 'W'
                        },
                    }
                }
            }
        }
        const data = {
            types: ['charts'],
            data: tableData
        }
        setResult(data)
    }

    const task4 = () => {
        const tableData = makeTableData(generatedArr)
        const sortedFrequensy = [...tableData.frequency].sort((a, b) => {
            if(a > b)
                return 1
            if(a < b)
                return -1
            if(a === b)
                return 0
        })
        const maxValue = sortedFrequensy[sortedFrequensy.length - 1]
        let yzValue = [], searchedIntervals = [], modas = [];
        tableData.frequency.forEach((el, id) => {
            if(tableData.frequency[id + 1] === maxValue) {
                searchedIntervals.push(tableData.intervals[id + 1])
                yzValue.push({
                    yValue: tableData.frequency[id],
                    zValue: tableData.frequency[id + 2]
                })
            }
        })
        searchedIntervals.forEach((el, id) => {
            const width = parseFloat(el.split(' - ')[1]) - parseFloat(el.split(' - ')[0])
            const length = (width * yzValue[id].yValue) / (yzValue[id].zValue + yzValue[id].yValue)
            modas.push(parseFloat(el.split(' - ')[0]) + length)
        })
        let modasResult = ``
        modas.forEach((moda, id) => {
            if(modas.length === 1)
                modasResult = `Мода = ${Math.round(moda * 100) / 100}`
            else
                modasResult += `Мода номер ${id + 1} = ${Math.round(moda * 100) / 100}; `
        })
        const data = {
            types: ['string'],
            data: modasResult
        }
        setResult(data)
    }

    const getIntervalMiddle = (first, last) => {
        return (first + last) / 2
    }

    const getFakeZero = (arr) => {
        if(arr.length % 2 === 0){
            return getIntervalMiddle(arr[arr.length / 2 - 1], arr[arr.length / 2])
        }
        return Math.floor(arr[Math.round(arr.length / 2)])
    }

    const uselessCalculations = () => {
        const tableData = makeTableData(generatedArr)
        tableData.u = []
        tableData.nu = []
        tableData.nu2 = []
        tableData.nu12 = []
        const mediana = getFakeZero(tableData.intervalMiddles)
        const h = tableData.intervalMiddles[1] - tableData.intervalMiddles[0]
        tableData.intervalMiddles.forEach((middle, id) => {
            console.log(middle, mediana, h)
            const u = (middle - mediana) / h
            tableData.u.push(u)
            tableData.nu.push(u * tableData.frequency[id])
            tableData.nu2.push(Math.pow(u, 2) * tableData.frequency[id])
            tableData.nu12.push(Math.pow(u + 1, 2) * tableData.frequency[id])
        })
        const nuSum = tableData.nu.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        const nu2Sum = tableData.nu2.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        const M = nuSum / 100
        const M2 = nu2Sum / 100
        const xV = M * h + mediana
        const dV = (M2 - Math.pow(M, 2)) * Math.pow(h, 2)
        let bufArr = []
        tableData.intervalMiddles.forEach((middle, id) => {
            bufArr.push(Math.pow((middle - xV), 2) * tableData.frequency[id])
        })
        const preS2 = bufArr.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );

        bufArr = []
        const s2 = preS2 / 100
        const s = Math.pow(s2, 0.5)
        tableData.intervalMiddles.forEach((middle, id) => {
            bufArr.push(Math.pow((middle - xV), 3) * tableData.frequency[id])
        })
        const preA = bufArr.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        const A = preA / (100 * Math.pow(s, 3))

        bufArr = []
        tableData.intervalMiddles.forEach((middle, id) => {
            bufArr.push(Math.pow((middle - xV), 4) * tableData.frequency[id])
        })
        const preE = bufArr.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        const E = preE / (100 * Math.pow(s, 4)) - 3
        return {
            xV,
            dV,
            A,
            E,
            s
        }
    }

    const task5 = () => {
        const {xV, dV, A, E} = uselessCalculations()

        const finalResult = {
            'Середнє вибіркове': Math.round(xV * 100) / 100,
            'Вибіркова дисперсія': Math.round(dV * 100) / 100,
            'Асиметрія': Math.round(A * 100) / 100,
            'Ексцес': Math.round(E * 100) / 100,
        }
        const data = {
            types: ['array'],
            data: finalResult
        }
        setResult(data)
    }

    const task6 = () => {
        const {s, xV} = uselessCalculations()
        const v = (s / xV) * 100
        const result = `Коефіцієнт варіації = ${Math.round(v * 100) / 100}%`
        const data = {
            types: ['string'],
            data: result
        }
        setResult(data)
    }

    const task7 = () => {
        const {A, E, s, xV} = uselessCalculations()
        const v = (s / xV) * 100
        const koef = Math.round(v * 100) / 100
        let Aresult = '', Eresult = '', koefResult = ''
        if(A === 0) {
            Aresult = 'Розподіл має симетричну форму.'
        }
        else if(A > 0) {
            Aresult = 'Розподіл має позитивну (правосторонню) асиметрію.'
        }
        else {
            Aresult = 'Розподіл має негативну (лівосторонню) асиметрію.'
        }
        if(E > 0) {
            Eresult = 'Полігон варіаційного ряду має більш круту вершину в порівняння з нормальною кривою.'
        }
        else {
            Eresult = 'Полігон варіаційного ряду має більш пологу вершину в порівняння з нормальною кривою.'
        }
        if(koef > 100) {
            koefResult = 'Значення вибірки неоднорідні'
        }
        else {
            koefResult = 'Значення вибірки однорідні'
        }
        const result = {
            'Коефіцієнт асиметрії': Aresult,
            'Ексцес': Eresult,
            'Коефіцієнт варіації': koefResult
        }
        const data = {
            types: ['array'],
            data: result
        }
        setResult(data)
    }

    const task8 = () => {
        const tableData = makeTableData(generatedArr)
        const xs = [tableData.intervals[0].split(' - ')[0], ...tableData.intervals.map((el, id) => {
            const splitedValue = el.split(' - ')
            return splitedValue[1]
        })]
        const ys = [0, ...tableData.collectedSubFrequency]
        let p1, p2
        ys.forEach((y, id) => {
            if(ys[id + 1] >= 0.5 && ys[id] <= 0.5){
                p1 = {
                    y,
                    x: parseFloat(xs[id])
                }
                p2 = {
                    y: ys[id + 1],
                    x: parseFloat(xs[id + 1])
                }
                 
            }
        })
        const x = (0.5 - p1.y) * (p2.x - p1.x) / (p2.y - p1.y) + p1.x
        const finalResult = `Медіана = ${Math.round(x * 100) / 100}`
        const data = {
            types: ['string'],
            data: finalResult
        }
        setResult(data)
    }

    const labDescription = {
        number: 2,
        name: 'Створення інтервального статистичного розподілу вибірки, графічні зображення та числові характеристики вибірки',
        goal: `Навчитися: створювати інтервальний статистичний розподіл з варіант
        вибірки; зображати графічно інтервальний статистичний розподіл (побудова
        полігону, гістограми та кумуляти), знаходження моди та медіани за
        графічними зображеннями; обчислення числових характеристик ( середнього
        зваженого, дисперсії, асиметрії і ексцесу (за потреби)) вибірки.`,
        tasks: [
            {
                text: 'Для вибірки знайти розмах (R = Xmax - Xmin) кількість інтервалів (m = 1 + 3.3221 * lgn) та ширину інтервалів k = (Xmax - Xmin) / (1 + 3.3221 * lgn).',
                func: task1
            },
            {
                text: 'Створити таблицю для інтервального статистичного розподілу вибірки.',
                func: task2
            },
            {
                text: `За даними таблиці і використовуючи стандартні бібліотеки створити
                графічні зображення (полігон, гістограму, кумуляту) для інтервального
                статистичного розподілу.`,
                func: task3
            },
            {
                text: 'За гістограмою знайти моду (або моди для полімодального розподілу).',
                func: task4
            },
            {
                text: 'За кумулятою визначити медіану.',
                func: task8
            },
            {
                text: `Обчислити середнє вибіркове, вибіркову дисперсію; за потреби
                обчислити асиметрію та ексцес.`,
                func: task5
            },
            {
                text: 'Обчислити коефіцієнт варіації.',
                func: task6
            },
            {
                text: `Зробити висновки по роботі: а саме, яку інформацію про генеральну
                сукупність можна отримати із проведеного дослідження.`,
                func: task7
            }
        ]
    }
    return (
        <Template labDescription={labDescription} result={result}/>
    )
}

export default Lab2