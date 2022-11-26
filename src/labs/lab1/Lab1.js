import React, { useState } from "react";
import Template from "../Template/Template";
import generated from '../../generated.json'
import { generateArrayOfNumbers } from "../../utils/utils";

const Lab1 = ({isReal}) => {

    const [result, setResult] = useState(null)

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

    const task1 = () => {
        const formatedData = isReal ? generated.slice(0, 100) : generated.slice(0, 100).map(el => el.age)
        const data = {
            types: ['array'],
            data: formatedData
        }
        setResult(data)
    }

    const task2 = () => {
        if(result){
            const data = {
                types: ['array'],
                data: sortData(result.data)
            }
            setResult(data)
        }
    }

    const task3 = () => {
        if(result){
            const sortedData = sortData(result.data)
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
        const numbers = generateArrayOfNumbers(100, true)
        const sortedNumbers = [...numbers].sort()
        const uniqueNumbers = new Set(sortedNumbers)
        const friquency = []
        uniqueNumbers.forEach(number => {
            friquency.push(sortedNumbers.filter(num => num === number).length)
        })
        const bar = {
            data: {
                labels: [...uniqueNumbers],
                datasets: [
                    {
                        label: 'Гістограма',
                        data: friquency,
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
        const data = {
            types: ['array', 'bar'],
            data: generateArrayOfNumbers(100, true),
            chart: bar
        }
        setResult(data)
    }

    const task5 = () => {
        if(result){
            const data = {
                types: ['array'],
                data: result.data.map(val => val * 4)
            }
            setResult(data)
        }
    }

    const task6 = () => {
        if(result){
            const data = {
                types: ['array'],
                data: [...result.data].sort()
            }
            setResult(data)
        }
    }

    const task7 = () => {
        if(result){
            const sortedNumbers = [...result.data].sort()
            const maxVal = sortedNumbers[sortedNumbers.length - 1]
            const minVal = sortedNumbers[0]
            const data = {
                types: ['string'],
                data: `Розмах вибірки випадкових чисел: ${Math.round((maxVal - minVal) * 10) / 10}`
            }
            setResult(data)
        }
    }

    const labDescription = {
        number: 1,
        name: 'ВИБІРКОВИЙ МЕТОД, ЙОГО ХАРАКТЕРИСТИКИ',
        goal: 'вивчити методи утворення репрезентативної вибірки.',
        tasks: [
            {
                text: 'Використання реальних статистичних даних з інтернету.',
                tasks: [
                    {
                        text: 'Із вибраних даних,обсягом не менше 1000, будь-яким чином обрати 100.',
                        func: task1
                    },
                    {
                        text: 'Ранжувати вибірку (розташувати данні в порядку зростання).',
                        func: task2
                    },
                    {
                        text: 'Знайти розмах вибірки.',
                        func: task3
                    }
                ]
            },
            {
                text: 'Використання генератора випадкових чисел.',
                tasks: [
                    {
                        text: 'Згенерувати 100 випадкових, нормально розподілених (N(0,1)) випадкових величин.',
                        func: task4
                    },
                    {
                        text: 'Помножити отримані данні на свій номер по списку.',
                        func: task5
                    },
                    {
                        text: 'Ранжувати вибірку.',
                        func: task6
                    },
                    {
                        text: 'Знайти розмах вибірки.',
                        func: task7
                    }
                ]
            }
        ]
    }
    return (
        <Template labDescription={labDescription} result={result}/>
    )
}

export default Lab1