// Simple test to verify assessmentQuestions
try {
    const assessmentQuestions = require('./assessments.js');
    
    console.log('✓ assessments.js loaded successfully');
    console.log('Total tests defined:', Object.keys(assessmentQuestions).length);
    
    // Check required tests
    const required = ['r2r-basics', 'o2c-basics', 'fpa-basics', 'ops-basics', 'q2o-basics', 'om-basics',
                     'r2r-mastery', 'o2c-mastery', 'fpa-mastery', 'ops-mastery', 'q2o-mastery', 'om-mastery',
                     'r2r-strategy', 'o2c-strategy', 'fpa-strategy', 'ops-strategy', 'q2o-strategy', 'om-strategy'];
    
    let missing = [];
    required.forEach(test => {
        if (!assessmentQuestions[test]) {
            missing.push(test);
        } else {
            const qCount = assessmentQuestions[test].questions?.length || 0;
            console.log(`✓ ${test}: ${qCount} questions`);
        }
    });
    
    if (missing.length > 0) {
        console.log('\n✗ Missing tests:');
        missing.forEach(t => console.log('  -', t));
    } else {
        console.log('\n✓ All required tests are defined!');
    }
    
    // Check for issues
    let issueCount = 0;
    for (let testKey in assessmentQuestions) {
        const test = assessmentQuestions[testKey];
        if (!test.name || !test.level || !test.description || !test.questions || !test.areas) {
            console.log(`✗ ${testKey}: Missing properties`);
            issueCount++;
        }
    }
    
    if (issueCount === 0) {
        console.log('✓ All tests have required properties');
    }
    
} catch (e) {
    console.log('✗ Error:', e.message);
}
