function randn_bm() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
    return num
  }

export const getRundomNumber = (min, max) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min)
}

function randn_bm_limited(min, max, skew) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random()
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
    
    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0) 
      num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range
    
    else{
      num = Math.pow(num, skew) // Skew
      num *= max - min // Stretch to fill range
      num += min // offset to min
    }
    return num
  }

export const generateArrayOfNumbers = (number, isNormal, min, max) => {
    const numbers = []
    for(let i = 0; i < number; i++) {
        numbers.push(isNormal ? Math.round(randn_bm() * 10) / 10 : Math.round(randn_bm_limited(min, max, 1) * 10) / 10)
    }
    return numbers
}

export const getBaseLog = (x, y) => {
    return Math.log(y) / Math.log(x);
  }

  export const makeTableData = (generatedArr) => {
    const xMax = generatedArr[generatedArr.length - 1]
    const xMin = generatedArr[0]
    const r = xMax - xMin
    const m = 1 + 3.3221 * getBaseLog(10, 100)
    const k = r / m
    const roundedK = Math.round(k)
    const roundedM = Math.round(m)
    let Xstart = xMin - roundedK / 2
    const tableData = {
        colls: [
            'i',
            'Інтервали',
            'Середини інтервалів',
            'Частота',
            'Частість',
            'Накопичена частота',
            'Накопичена частість'
        ],
        i: [],
        intervals: [],
        intervalMiddles: [],
        frequency: [],
        subFrequency: [],
        collectedFrequency: [],
        collectedSubFrequency: [],
        sums: []
    }
    let buf = 0
    for(let i = 0; Xstart < xMax; i++) {
        tableData.i.push(i+1)
        tableData.intervals.push(`${Xstart} - ${Xstart + roundedK}`)
        tableData.intervalMiddles.push(Math.round(((Xstart + roundedK + Xstart) / 2) * 100) / 100)
        const ni = generatedArr.filter(el => el > Xstart && el <= Xstart + roundedK).length
        tableData.frequency.push(ni)
        tableData.subFrequency.push(ni / generatedArr.length)
        tableData.collectedFrequency.push(ni + buf)
        tableData.collectedSubFrequency.push((ni + buf) / generatedArr.length)
        buf = buf + ni
        Xstart += roundedK
    }
    tableData.sums = [Math.round(tableData.collectedFrequency[tableData.collectedFrequency.length - 1]), 
    Math.round(tableData.subFrequency.reduce((previousValue, currentValue) => previousValue + currentValue))]
    return tableData
}

export const determinant = m => 
m.length == 1 ?
m[0][0] :
m.length == 2 ? 
m[0][0]*m[1][1]-m[0][1]*m[1][0] :
m[0].reduce((r,e,i) => 
  r+(-1)**(i+2)*e*determinant(m.slice(1).map(c => 
    c.filter((_,j) => i != j))),0)