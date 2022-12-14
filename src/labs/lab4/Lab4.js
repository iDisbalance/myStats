import React, { useState, useEffect } from "react";
import Template from "../Template/Template";
import generated from '../../generated.json'
import { generateArrayOfNumbers, makeTableData, determinant, getLaplasValue } from "../../utils/utils";
import CustomChart from "../../utils/customChart";

const a0 = 49
const a1 = 48

const Lab4 = ({generatedArr, setGeneratedArr}) => {

    const [result, setResult] = useState(null)
    const task1 = () => {
        const ft = 0.95
        const gama = 1.96
        const xV = Math.round((generatedArr.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        ) / 100) * 100) / 100
        const subS = generatedArr.map(num => Math.round(Math.pow((num - xV), 2) * 100) / 100)
        const S = Math.round((subS.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        ) / 100) * 100) / 100
        const sigma = Math.round(Math.sqrt(S/100) * 100) / 100
        const delta = Math.round((gama * sigma) * 100) / 100

        /*****************************************/

        const left = (1 - ft) / 2
        const right = (1 + ft) / 2
        const k = 99
        const x1 = 0.5 * Math.pow((Math.sqrt(2 * k - 1) - gama), 2)
        const x2 = 0.5 * Math.pow((Math.sqrt(2 * k - 1) + gama), 2)
        const finalLeft = Math.round((100 / x2 * S) * 10) / 10
        const finalRight = Math.round((100 / x1 * S) * 10) / 10

        const conclusion = `Таким чином, з надійністю ${ft} середній вік людей знаходиться в межах від ${Math.round((xV - delta) * 100) / 100} до ${Math.round((xV + delta) * 100) / 100} років`
        const conclusion2 = `Отже, з надійністю ${ft} дисперсія знаходиться в межах від ${finalLeft} до ${finalRight}`
        const interval = `${Math.round((xV - delta) * 100) / 100} <= X₀ <= ${Math.round((xV + delta) * 100) / 100}
${conclusion}
${finalLeft} <= σ² <= ${finalRight}
${conclusion2}
`
        const data = {
            types: ['string'],
            data: interval
        }
        setResult(data)
    }

    const task2 = () => {
        const text = 
`Сформуємо нульову та альтернативну гіпотези:
H₀: а = а₀ = ${a0}
H₁: а = а₁ = ${a1}.`
        const data = {
            types: ['string'],
            data: text
        }
        setResult(data)
    }

    const task3 = () => {
        const xV = generatedArr.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        ) / 100
        const subS = generatedArr.map(num => Math.round(Math.pow((num - xV), 2) * 100) / 100)
        const S = Math.round((subS.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        ) / 100) * 100) / 100
        const sigma = Math.round(Math.sqrt(S/100) * 100) / 100
        const vidhilennia = Math.round(Math.sqrt(S) * 100) / 100
        const text = 
`Так як а₀ > а₁, то критична область буде лівосторонньою.
Критичне значення: Ф(u) = (1 - 2 * α) / 2 = (1 - 2 * 0.05) / 2 = ${(1 - 2 * 0.05) / 2}
Знаходимо аргумент u: u = 1.64,
отже критична область буде наступною:
`
    const uSpost = Math.round(((xV - a0) * 10) / vidhilennia * 100) / 100
    
    let checking = ''
    if(uSpost < -1.64){
        checking = `На рівні значущості 0.05 нульову гіпотезу не приймаємо`
    }
    else {
        checking = `На рівні значущості 0.05 нульову гіпотезу приймаємо`
    }
    const powerLaplas = Math.abs(a1 - a0) / vidhilennia * 10 - 1.64
    const criteriaPower = getLaplasValue(powerLaplas) + 0.5
        const additionalText = 
`Знайдемо спостережуване значення критерію: 
u = (Xв - а₀)√n / σ = (${xV} - ${a0}) √100 / ${vidhilennia} = ${uSpost}
${checking}
Потужність критерію: 1 - β = ${criteriaPower}
Отже, ймовірність не допустити помилку другого роду дорівнює ${criteriaPower}
`
        const data = {
            types: ['string', 'custom', 'additionalString'],
            data: text,
            additionalData: additionalText,
            customComponent: <CustomChart />
        }
        setResult(data)
    }

    const task4 = () => {
        const xV = generatedArr.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        ) / 100
        const subS = generatedArr.map(num => Math.round(Math.pow((num - xV), 2) * 100) / 100)
        const S = Math.round((subS.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        ) / 100) * 100) / 100
        const vidhilennia = Math.round(Math.sqrt(S) * 100) / 100
        const powerLaplas = Math.abs(a1 - a0) / vidhilennia * 10 - 1.64
        const criteriaPower = getLaplasValue(powerLaplas) + 0.5
        const value = (Math.pow((1.64 + getLaplasValue((1 - 2 * criteriaPower) / 2)), 2) * S) / (Math.pow((a1 - a0), 2))
        const text = 
`n = (t1-2α + t1-2β)^2 * σ² / (а₁ - а₀)^2
n = (1.64 + ${getLaplasValue((1 - 2 * criteriaPower) / 2)})^2 * ${S} / (${a1 - a0})^2 = ${Math.round(value)}
`
        const data = {
            types: ['string'],
            data: text,
        }
        setResult(data)
    }

    const labDescription = {
        number: 4,
        name: 'Побудова довірчих інтервалів. Перевірка статистичих гіпотез',
        goal: `Навчитися: будувати довірчі інтервали для генерального середнього та
        генеральної дисперсії за даними вибірки; перевірка гіпотези про значення
        параметрів розподілу на рівні значущості α = 0.05 ,, обчислити потужність
        критерія. Знайти мінімальний обсяг вибірки, який забезпечує заданий рівень
        значущості α і потужність критерію (1–β).`,
        tasks: [
            {
                text: 'Побудувати довірчі інтервали для генерального середнього і генеральної дисперсії для довірчої ймовірності 0,95. Зробити висновки.',
                func: task1
            },
            {
                text: `Висунути гіпотезу про значення параметрів розподілу. Сформулювати
                альтернативну гіпотезу.`,
                func: task2
            },
            {
                text: `На рівні значущості α = 0.05,
                перевірити нульову гіпотезу, побудувати
                критичну область, знайти потужність критерію. Зробити висновки.`,
                func: task3
            },
            {
                text: `Обчислити мінімальний обсяг вибірки, який забезпечує заданий рівень
                значущості α і потужність критерію (1–β).`,
                func: task4
            }
        ]
    }
    return (
        <Template labDescription={labDescription} result={result}/>
    )
}

export default Lab4