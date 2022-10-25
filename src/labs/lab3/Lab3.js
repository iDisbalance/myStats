import React, { useState, useEffect } from "react";
import Template from "../Template/Template";
import generated from '../../generated.json'
import { generateArrayOfNumbers, makeTableData, determinant } from "../../utils/utils";

const Lab3 = ({generatedArr, setGeneratedArr}) => {

    const [result, setResult] = useState(null)

    const task1 = () => {
        const sum = generatedArr.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        const a = Math.round((sum / generatedArr.length) * 100) / 100
        let presigmaValue = 0
        generatedArr.forEach(element => {
            presigmaValue += Math.pow((element - a), 2)
        });
        const sigma = Math.round((presigmaValue / generatedArr.length) * 100) / 100
        let intro = `Наша виборка була згенерована за нормальним розподілом,
отже необхідно знайти 2 параметри: а і сігму в квадраті.
Маємо наступні функції для оцінки параметрів:
а = 1/n * sum(xi)
сігма в квадраті = 1/n * sum((xi - xB)^2)

Знайдемо оцінки даних параметрів методом максимальної правдоподібності:
a = ${a}
сігма в квадраті = ${sigma}
`
        const data = {
            types: ['string'],
            data: intro
        }
        setResult(data)
    }

    const task2 = () => {
        let xi = 0
        let xi2 = 0
        let xi3 = 0
        let xi4 = 0
        let yi = 0
        let xy = 0
        let x2y = 0
        const tableData = makeTableData(generatedArr)
        tableData.intervalMiddles.forEach((middle, id) => {
            xi += middle
            xi2 += Math.round(Math.pow(middle, 2) * 100) / 100
            xi3 += Math.round(Math.pow(middle, 3) * 100) / 100
            xi4 += Math.round(Math.pow(middle, 4) * 100) / 100
            yi += Math.round(tableData.frequency[id] * 100) / 100
            xy += Math.round(middle * tableData.frequency[id] * 100) / 100
            x2y += Math.round(Math.pow(middle, 2) * tableData.frequency[id] * 100) / 100
        })
        xi = Math.round(xi * 10) / 10
        xi2 = Math.round(xi2 * 100) / 100
        xi3 = Math.round(xi3 * 100) / 100
        xi4 = Math.round(xi4 * 100) / 100
        yi = Math.round(yi * 100) / 100
        xy = Math.round(xy * 100) / 100
        x2y = Math.round(x2y * 100) / 100
        const dMain = determinant([[xi4,xi3,xi2],[xi3,xi2,Math.round(xi)],[xi2,Math.round(xi),tableData.intervalMiddles.length]])
        const da = determinant([[x2y,xy,yi],[xi3,xi2,Math.round(xi)],[xi2,Math.round(xi),tableData.intervalMiddles.length]])
        const db = determinant([[xi4,xi3,xi2],[x2y,xy,yi],[xi2,Math.round(xi),tableData.intervalMiddles.length]])
        const dc = determinant([[xi4,xi3,xi2],[xi3,xi2,Math.round(xi)],[x2y,xy,yi]])
        const a = Math.round(10000 * (da / dMain)) / 10000
        const b = Math.round(10000 * (db / dMain)) / 10000
        const c = Math.round(10000 * (dc / dMain)) / 10000
        let intro = `Маємо нормальний розподіл, отже залежність між
значеннями інтервального розподілу та частостями цих значень є параболічною.
Необхідно знайти параметри функції залежності
y = ax^2 + bx + c

Маємо наступне рівняння:
${xi4}a + ${xi3}b + ${xi2}c = ${x2y}
${xi3}a + ${xi2}b + ${Math.round(xi)}c = ${xy}
${xi2}a + ${Math.round(xi)}b + ${tableData.intervalMiddles.length}c = ${yi}

Отримаємо: а = ${a}, b = ${b}, c = ${c}
y = ${a}x^2 ${b > 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x ${c > 0 ? `+ ${c}` : `- ${Math.abs(c)}`}`
        const data = {
            types: ['string'],
            data: intro
        }
        console.log(determinant([[4676,784,140],[784,140,28],[140,28,7]]))
        setResult(data)
    }


    const labDescription = {
        number: 3,
        name: 'Статистичні оцінки параметрів розподілу. Точкові оцінки. Методи знаходження точкових оцінок. Метод найменших квадратів дослідження вибірки',
        goal: 'Навчитися: знаходити точкові оцінки за емпірічними даними вибірки; методом найменших квадратів знайти найкращю залежність між даними інтервального роподілу і частостями отриманих значень.',
        tasks: [
            {
                text: 'Для вибірки знайти будь-яким методом оцінки теоретичних параметрів розподілу.',
                func: task1
            },
            {
                text: `За полігоном (гістограмою) підібрати теоретичну залежність між
                значеннями інтервального розподілу та частостями цих значень. Знайти
                методом найменших квадратів параметри відповідних залежностей.`,
                func: task2
            }
        ]
    }
    return (
        <Template labDescription={labDescription} result={result}/>
    )
}

export default Lab3