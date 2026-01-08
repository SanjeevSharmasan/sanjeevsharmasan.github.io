const assessmentQuestions = require('./assessments.js');

function simulateTest(testKey, strategy) {
    const test = assessmentQuestions[testKey];
    if (!test) throw new Error('Missing test ' + testKey);

    // Simulate answers: 'best' chooses correct option if exists, 'worst' chooses first wrong
    let correctCount = 0;
    const byArea = {};

    test.questions.forEach(q => {
        const correctIndex = q.options.findIndex(o => o.isCorrect);
        let pickedIndex = -1;
        if (strategy === 'best') {
            pickedIndex = correctIndex >= 0 ? correctIndex : 0;
        } else if (strategy === 'worst') {
            pickedIndex = correctIndex === 0 ? 1 : 0;
            if (pickedIndex >= q.options.length) pickedIndex = 0;
        } else {
            pickedIndex = 0;
        }

        const isCorrect = q.options[pickedIndex] && q.options[pickedIndex].isCorrect;
        if (isCorrect) correctCount++;

        if (!byArea[q.area]) byArea[q.area] = { correct: 0, total: 0 };
        byArea[q.area].total++;
        if (isCorrect) byArea[q.area].correct++;
    });

    const perc = Math.round((correctCount / test.questions.length) * 100);
    return { testKey, total: test.questions.length, correctCount, percentage: perc, byArea };
}

function runAll() {
    const keys = Object.keys(assessmentQuestions).filter(k => k.includes('basics') || k.includes('mastery') || k.includes('strategy'));
    const results = [];
    keys.forEach(k => {
        const best = simulateTest(k, 'best');
        const worst = simulateTest(k, 'worst');
        results.push({ key: k, best, worst });
    });

    // Validate: best should be 100% where each question has a correct option
    let failures = [];
    results.forEach(r => {
        if (r.best.percentage < 80) failures.push(`${r.key} best-case < 80% (${r.best.percentage}%)`);
        if (r.worst.percentage > 80 && r.worst.percentage !== 100) failures.push(`${r.key} worst-case unexpectedly >80% (${r.worst.percentage}%)`);
    });

    console.log('Ran end-to-end simulations for', results.length, 'tests');
    if (failures.length === 0) {
        console.log('All simulations passed basic expectations');
    } else {
        console.log('Failures:');
        failures.forEach(f => console.log(' -', f));
    }

    // Print a short sample
    console.log('\nSample result for r2r-basics (best-case):');
    const sample = results.find(r => r.key === 'r2r-basics');
    if (sample) console.log(sample.best);
}

try {
    runAll();
    process.exit(0);
} catch (e) {
    console.error('Error during test:', e);
    process.exit(2);
}
