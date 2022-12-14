import React, { useState, useEffect } from "react";
import Template from "../Template/Template";
import generated from '../../generated.json'
import { generateArrayOfNumbers, makeTableData, determinant, getLaplasValue, getBaseLog, getRundomNumber } from "../../utils/utils";
import CustomChart from "../../utils/customChart";

let xn = 0,
x2n = 0,
yn = 0,
y2n = 0,
xyn = 0,
Хmid = 0,
Ymid = 0,
S2x = 0,
S2y = 0,
miu = 0,
byx = 0,
bxy = 0,
deltaY = 0,
deltaX = 0,
koef = 0

const Lab5 = ({generatedArr, setGeneratedArr}) => {

    const [result, setResult] = useState(null)
    const [secondArray, setSecondArray] = useState(null)
    const [backupData, setBackupData] = useState([])

    const sortData = (data) => {
        return [...data].sort((a, b) => {
            if(a?.age){
                if(a.age < b.age)
                return -1
                if(a.age > b.age)
                    return 1
                return 0
            }
            else{
                if(a < b)
                return -1
                if(a > b)
                    return 1
                return 0
            }   
        })
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
        const tableData = makeTableData(sortData(secondArray))
        tableData.u = []
        tableData.nu = []
        tableData.nu2 = []
        tableData.nu12 = []
        const mediana = getFakeZero(tableData.intervalMiddles)
        const h = tableData.intervalMiddles[1] - tableData.intervalMiddles[0]
        tableData.intervalMiddles.forEach((middle, id) => {
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

    const task1 = () => {
        const arr = generateArrayOfNumbers(100, false, 10, 100)
        setSecondArray(arr)
        const data = {
            types: ['array'],
            data: arr
        }
        setResult(data)
    }

    const task2 = () => {
        if(secondArray){
            const data = {
                types: ['array'],
                data: sortData(secondArray)
            }
            setResult(data)
        }
    }

    const task3 = () => {
        if(secondArray){
            const sortedData = sortData(secondArray)
            const maxAge = sortedData[sortedData.length - 1]?.age || sortedData[sortedData.length - 1]
            const minAge = sortedData[0]?.age || sortedData[0]
            const data = {
                types: ['string'],
                data: `Розмах вибірки по віку: ${maxAge - minAge}`
            }
            setResult(data)
        }
    }

    const task4 = () => {
        if(secondArray){
            const sortedNumbers = sortData(secondArray)
            const xMax = sortedNumbers[sortedNumbers.length - 1]
            const xMin = sortedNumbers[0]
            const r = xMax - xMin
            const m = 1 + 3.3221 * getBaseLog(10, 100)
            const result = {
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
    }

    const task5 = () => {
        if(secondArray){
            const data = {
                types: ['table'],
                data: makeTableData(sortData(secondArray))
            }
            setResult(data)    
        }
    }

    const task6 = () => {
        if(secondArray){
            const tableData = makeTableData(sortData(secondArray))
            tableData.chart = true
            tableData.line = {
                data: {
                    labels: tableData.intervalMiddles,
                    datasets: [
                        {
                            label: 'Полігон',
                            data: tableData.subFrequency,
                            borderColor: 'rgb(255, 255, 255)',
                            backgroundColor: 'rgb(0, 0, 0)'
                        }
                    ]
                },
                options: {
                    scales: {
                        xAxis: {
                            grid: { borderColor: 'rgb(121, 121, 121)' },
                            title: {
                                display: true,
                                text: 'Xi'
                            },
                        },
                        yAxis: {
                            grid: { borderColor: 'rgb(121, 121, 121)' },
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
                            backgroundColor: 'rgba(255, 255, 255,  0.5)',
                            borderColor: 'rgb(255, 255, 255)',
                            borderWidth: 1,
                            categoryPercentage: 0.9,
                            barPercentage: 0.9
                        }
                    ]
                },
                options: {
                    scales: {
                        xAxis: {
                            grid: { borderColor: 'rgb(255, 255, 255)' },
                            title: {
                                display: true,
                                text: 'Xi'
                            },
                        },
                        yAxis: {
                            grid: { borderColor: 'rgb(255, 255, 255)' },
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
                            borderColor: 'rgb(255, 255, 255)',
                            backgroundColor: 'rgb(0, 0, 0)'
                        }
                    ]
                },
                options: {
                    scales: {
                        xAxis: {
                            grid: { borderColor: 'rgb(121, 121, 121)' },
                            title: {
                                display: true,
                                text: 'Xi'
                            },
                        },
                        yAxis: {
                            grid: { borderColor: 'rgb(121, 121, 121)' },
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
    }

    const task7 = () => {
        const tableData = makeTableData(sortData(secondArray))
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

    const task8 = () => {
        if(secondArray){
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
    }

    const task9 = () => {
        const {s, xV} = uselessCalculations()
        const v = (s / xV) * 100
        const result = `Коефіцієнт варіації = ${Math.round(v * 100) / 100}%`
        const data = {
            types: ['string'],
            data: result
        }
        setResult(data)
    }

    const task10 = () => {
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

    const devideFrequency = (frequency, limit) => {
        let frequencyCopy = frequency
        const result = []
        const devidedNumber = getRundomNumber(1, limit)
        while(result.length !== devidedNumber - 1){
            let tmp = getRundomNumber(1, frequencyCopy)
            if(tmp === 0)
                continue
            result.push(tmp);
            frequencyCopy -= tmp;
            if(frequencyCopy <= 0)
                break
        }
        if(frequencyCopy > 0){
            result.push(frequencyCopy)
        }
        return result
    }

    const formArrRow = (number, arr) => {
        let helpArr = []
        for(let i = 0; i < number - 1; i++){
            helpArr.push(null)
        }
        helpArr.push(...arr)
        for(let i = helpArr.length; i < 8; i++){
            helpArr.push(null)
        }
        return helpArr
    }

    const task11 = () => {
        const tableData = {}
        const firstArr = makeTableData(sortData(generatedArr))
        const secondArr = makeTableData(sortData(secondArray))
        tableData.xIntervals = firstArr.intervals
        tableData.xMiddles = firstArr.intervalMiddles
        tableData.yIntervals = secondArr.intervals.slice(0, 8)
        tableData.yMiddles = secondArr.intervalMiddles.slice(0, 8)
        const frequencies = []
        firstArr.frequency.forEach((fr, id) => {
            const frequencyCol = devideFrequency(fr, 8 - id)
            frequencies.push(frequencyCol)
        })
        const yValues = [...tableData.yMiddles]
        const xGroupMiddles = [...tableData.yMiddles]
        yValues.fill(0) 
        xGroupMiddles.fill(0) 
        const groupMiddles = []
        for(let i = 0; i < frequencies.length; i++){
            let middle = 0
            frequencies[i] = formArrRow(i, frequencies[i])
            for(let j = 0; j < frequencies[i].length; j++){
                if(frequencies[i][j]){
                    middle += frequencies[i][j] * tableData.yMiddles[j]
                }
            }
            groupMiddles.push(middle)
        }
        const rows = []
        tableData.xIntervals.forEach((interval, id) => {
            for(let j = 0; j < frequencies[id].length; j++){
                if(frequencies[id][j]){
                    yValues[j] += frequencies[id][j]
                    xGroupMiddles[j] += frequencies[id][j] * tableData.xMiddles[id]
                }
            }
            rows.push({
                interval,
                middle: tableData.xMiddles[id],
                values: frequencies[id],
                sum: firstArr.frequency[id],
                groupMiddles: Math.round((groupMiddles[id] / firstArr.frequency[id]) * 100) / 100
            })
        })
        tableData.yValues = yValues
        tableData.xGroupMiddles = xGroupMiddles.map((el, id) => {
            if(yValues[id])
                return Math.round((el / yValues[id]) * 100) / 100
            return '-'
        })
        //console.log(xGroupMiddles)
        tableData.rows = rows
        const data = {
            types: ['advancedTable'],
            data: tableData
        }
        setBackupData(data)
        setResult(data)
    }

    const task12 = () => {
        xn = result.data.rows.map(el => {
            return el.middle * el.sum
        }).reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        x2n = result.data.rows.map(el => {
            return el.middle ** 2 * el.sum
        }).reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        yn = result.data.yMiddles.map((el, id) => {
            return el * result.data.yValues[id]
        }).reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        y2n = result.data.yMiddles.map((el, id) => {
            return el ** 2 * result.data.yValues[id]
        }).reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        xyn = result.data.rows.map(row => {
            return row.values.map((value, id) => {
                return value ? value * result.data.yMiddles[id] * row.middle : 0
            }).reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                0
            );
        }).reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );

        Хmid = xn / 100
        Ymid = yn / 100
        S2x = Math.round((x2n / 100 - Хmid ** 2) * 100) / 100
        S2y = Math.round((y2n / 100 - Ymid ** 2) * 100) / 100
        miu = Math.round((xyn / 100 - Хmid * Ymid) * 100) / 100
        byx = Math.round((miu / S2x) * 100) / 100
        bxy = Math.round((miu / S2y) * 100) / 100

        deltaY = Math.round((Ymid - byx * Хmid) * 100) / 100
        deltaX = Math.round((Хmid - bxy * Ymid) * 100) / 100

        koef = Math.round((Math.sqrt(Math.abs(byx) * Math.abs(bxy))) * 100) / 100

        const answer = `Обчислимо всі необхідні суми:

Sum(Xi * Ni) = ${xn};
Sum(Xi^2 * Ni) = ${x2n};
Sum(Yj * Nj) = ${yn};
Sum(Yj^2 * Nj) = ${y2n};
Sum(Xi * Yj * Nij) = ${xyn};

Знаходимо вибіркові характеристики і параметри рівняння регресії:

Хсер = ${Хmid} (тис. грн);
Yсер = ${Ymid} (років);
S^2x = ${S2x};
S^2y = ${S2y};
μ = ${miu};
byx = ${byx};
bxy = ${bxy};

Рівняння регресії:

Yx - ${Ymid} = ${byx}(x - ${Хmid});
Yx = ${byx}x ${deltaY > 0 ? `+ ${deltaY}` : `${deltaY}`};

Xy - ${Хmid} = ${bxy}(x - ${Ymid});
Xy = ${bxy}x ${deltaX > 0 ? `+ ${deltaX}` : `${deltaX}`};

Коефіцієнт кореляції:

r = ${koef}
`
        const data = {
            types: ['string'],
            data: answer
        }
        setResult(data)
    }

    const task13 = () => {
        const t = Math.round((koef * Math.sqrt(98)/Math.sqrt(1 - koef ** 2)) * 100) / 100
        const answer = `Перевірка значущості на рівні α = 0,05
t = ${t}

Знайдемо критичне значення 
t0.95, 98 = 1.99

Так як t > t0.95, 98, то коефіцієнт кореляції між X, Y значно відмінний від нуля.
`
        const data = {
            types: ['string'],
            data: answer
        }
        setResult(data)
    }

    const task14 = () => {
        const z = Math.round((0.5 * Math.log((1 + koef) / (1 - koef))) * 100) / 100
        const mLeft = Math.round((z - 1.96/Math.sqrt(98)) * 100) / 100
        const mRight = Math.round((z + 1.96/Math.sqrt(98)) * 100) / 100
        const pLeft = Math.round((Math.tanh(mLeft)) * 100) / 100
        const pRight = Math.round((Math.tanh(mRight)) * 100) / 100
        const Sx = Math.round((Math.sqrt(S2x)) * 100) / 100
        const Sy = Math.round((Math.sqrt(S2y)) * 100) / 100
        const byxLeft = Math.round((byx - 1.99 * Sy * Math.sqrt(1 - koef ** 2) / (Sx * Math.sqrt(98))) * 100) / 100
        const byxRight = Math.round((byx + 1.99 * Sy * Math.sqrt(1 - koef ** 2) / (Sx * Math.sqrt(98))) * 100) / 100
        const bxyLeft = Math.round((bxy - 1.99 * Sx * Math.sqrt(1 - koef ** 2) / (Sy * Math.sqrt(98))) * 100) / 100
        const bxyRight = Math.round((bxy + 1.99 * Sx * Math.sqrt(1 - koef ** 2) / (Sy * Math.sqrt(98))) * 100) / 100
        const answer = `Знайдемо інтервальні оцінки
z = 0.5 * ln((1 + ${koef}) / (1 - ${koef})) = ${z}

При Ф(t1-α) = 0.95
t0.05 = 1.96
${mLeft} <= M(z) <= ${mRight}

Границі довірчого інтервалу для р
${pLeft} <= p <= ${pRight}

Довірчий інтервал для генеральних коефіцієнтів регресії byx і bxy:

Sx = ${Sx}
Sy = ${Sy}

${byxLeft} <= byx <= ${byxRight}
${bxyLeft} <= bxy <= ${bxyRight}
`
        const data = {
            types: ['string'],
            data: answer
        }
        setResult(data)
    }

    const task15 = () => {
        const lastTableData = {
            xi: backupData.data.rows.map(el => el.middle),
            ni: backupData.data.rows.map(el => el.sum),
            yi: backupData.data.rows.map(el => el.groupMiddles),
        }
        lastTableData.delta1 = lastTableData.yi.map((el, id) => {
            return Math.round(((el - Ymid) ** 2 * lastTableData.ni[id]) * 100) / 100
        })
        lastTableData.yxi = lastTableData.xi.map((el, id) => {
            return  Math.round((byx * el + deltaY) * 100) / 100
        })
        lastTableData.delta2 = lastTableData.yxi.map((el, id) => {
            return  Math.round(((el - Ymid) ** 2 * lastTableData.ni[id]) * 100) / 100
        })
        const sumDelta1 = lastTableData.delta1.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        const sumDelta2 = lastTableData.delta2.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        const sigma = Math.round((sumDelta1 / 100) * 100) / 100
        const nyx = Math.round((Math.sqrt(sigma/S2y)) * 100) / 100
        const sigma2 = Math.round((sumDelta2 / 100) * 100) / 100
        const ryx = Math.round((Math.sqrt(sigma2/S2y)) * 100) / 100
        const answer = `
σ^2 = ${sigma}
η = ${nyx}

Значення μ близьке до значення r = ${koef}. Тому припущення про лінійний зв'язок є обгрунтованим

R = ${ryx}

Бачимо, що R = r (розбіжності викликані правилами округлення при обчисленнях).
Величина коефіцієнта детермінації: R^2 = ${Math.round((ryx ** 2) * 100) / 100}

Для перевірки значущості η знайдемо F
F = ${Math.round((nyx ** 2 * 98 / ((1 - nyx ** 2) * 4)) * 100) / 100}

Так як F > F 0.05; 1; 98 = 3.94, то індекс кореляції є значущим
`
        const data = {
            types: ['string'],
            data: answer
        }
        setResult(data)
    }

    const task16 = () => {

    }

    
    const labDescription = {
        number: 5,
        name: 'Кореляційний аналіз',
        goal: `Навчитися досліджувати системи двох випадкових величин: будувати лінії
        регресії, обчислювати коефіцієнт кореляції, у разі нелінійної залежності,
        знаходити кореляційні відношення та індекс кореляції.`,
        tasks:[
            {
                text: 'Згенерувати 100 випадкових, нормально розподілених (N(0,1)) випадкових величин.',
                func: task1
            },
            {
                text: 'Ранжувати вибірку.',
                func: task2
            },
            {
                text: 'Знайти розмах вибірки.',
                func: task3
            },
            {
                text: 'Для вибірки знайти розмах (R = Xmax - Xmin) кількість інтервалів (m = 1 + 3.3221 * lgn) та ширину інтервалів k = (Xmax - Xmin) / (1 + 3.3221 * lgn).',
                func: task4
            },
            {
                text: 'Створити таблицю для інтервального статистичного розподілу вибірки.',
                func: task5
            },
            {
                text: `За даними таблиці і використовуючи стандартні бібліотеки створити
                графічні зображення (полігон, гістограму, кумуляту) для інтервального
                статистичного розподілу.`,
                func: task6
            },
            {
                text: 'За гістограмою знайти моду (або моди для полімодального розподілу).',
                func: task7
            },
            {
                text: 'За кумулятою визначити медіану.',
                func: task8
            },
            {
                text: `Обчислити середнє вибіркове, вибіркову дисперсію; за потреби
                обчислити асиметрію та ексцес.`,
                func: task9
            },
            {
                text: 'Обчислити коефіцієнт варіації.',
                func: task10
            },
            {
                text: 'Створити кореляційну таблицю',
                func: task11
            },
            {
                text: 'Знайти рівняння лінії регресії і тісноту зв’язку.',
                func: task12
            },
            {
                text: 'Перевірити на рівні α=0,05 значущість коефіцієнта кореляції між змінними Х та Y',
                func: task13
            },
            {
                text: 'З надійністю 0,95 знайти інтервальні оцінки (довірчі інтервали) параметрів зв’язку.',
                func: task14
            },
            {
                text: 'Обчислити кореляційне відношення і індекс кореляції і перевірити їх значущість на рівні α 0 05.',
                func: task15
            }
        ]
    }
    return (
        <Template labDescription={labDescription} result={result}/>
    )
}

export default Lab5