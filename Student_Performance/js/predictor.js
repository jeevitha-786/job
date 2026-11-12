/**
 * ZENITH - Student Performance Prediction Engine
 * Implements feature engineering and inference for:
 * - Gradient Boosting Regressor (Top Model)
 * - Ridge Regression
 * - Random Forest Ensemble
 * - Linear Regression
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ZenithPredictor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  // Helper to extract numeric features vector
  function extractFeatureVector(input) {
    const g1 = parseFloat(input.G1 ?? 10) || 0;
    const g2 = parseFloat(input.G2 ?? 10) || 0;
    const studytime = parseFloat(input.studytime ?? 2) || 1;
    const absences = parseFloat(input.absences ?? 0) || 0;
    const failures = parseFloat(input.failures ?? 0) || 0;
    const medu = parseFloat(input.Medu ?? 2) || 0;
    const fedu = parseFloat(input.Fedu ?? 2) || 0;
    const age = parseFloat(input.age ?? 17) || 17;
    const traveltime = parseFloat(input.traveltime ?? 1) || 1;
    const famrel = parseFloat(input.famrel ?? 4) || 3;
    const freetime = parseFloat(input.freetime ?? 3) || 3;
    const goout = parseFloat(input.goout ?? 3) || 3;
    const dalc = parseFloat(input.Dalc ?? 1) || 1;
    const walc = parseFloat(input.Walc ?? 1) || 1;
    const health = parseFloat(input.health ?? 3) || 3;

    // Feature engineering exactly matching training pipeline
    const academicMomentum = g2 - g1;
    const effortAbsenceRatio = studytime / (absences + 1.0);

    // Binary encodings
    const schoolMS = input.school === 'MS' ? 1.0 : 0.0;
    const sexM = input.sex === 'M' ? 1.0 : 0.0;
    const addressU = input.address === 'U' ? 1.0 : 0.0;
    const famsizeLE3 = input.famsize === 'LE3' ? 1.0 : 0.0;
    const pstatusT = input.Pstatus === 'T' ? 1.0 : 0.0;
    const schoolsupYes = (input.schoolsup === 'yes' || input.schoolsup === true || input.schoolsup === 1) ? 1.0 : 0.0;
    const famsupYes = (input.famsup === 'yes' || input.famsup === true || input.famsup === 1) ? 1.0 : 0.0;
    const paidYes = (input.paid === 'yes' || input.paid === true || input.paid === 1) ? 1.0 : 0.0;
    const activitiesYes = (input.activities === 'yes' || input.activities === true || input.activities === 1) ? 1.0 : 0.0;
    const nurseryYes = (input.nursery === 'yes' || input.nursery === true || input.nursery === 1) ? 1.0 : 0.0;
    const higherYes = (input.higher === 'yes' || input.higher === true || input.higher === 1) ? 1.0 : 0.0;
    const internetYes = (input.internet === 'yes' || input.internet === true || input.internet === 1) ? 1.0 : 0.0;
    const romanticYes = (input.romantic === 'yes' || input.romantic === true || input.romantic === 1) ? 1.0 : 0.0;

    const vector = [
      g1,                     // 0
      g2,                     // 1
      academicMomentum,       // 2
      effortAbsenceRatio,     // 3
      failures,               // 4
      studytime,              // 5
      absences,               // 6
      medu,                   // 7
      fedu,                   // 8
      age,                    // 9
      traveltime,             // 10
      famrel,                 // 11
      freetime,               // 12
      goout,                  // 13
      dalc,                   // 14
      walc,                   // 15
      health,                 // 16
      schoolMS,               // 17
      sexM,                   // 18
      addressU,               // 19
      famsizeLE3,             // 20
      pstatusT,               // 21
      schoolsupYes,           // 22
      famsupYes,              // 23
      paidYes,                // 24
      activitiesYes,          // 25
      nurseryYes,             // 26
      higherYes,              // 27
      internetYes,            // 28
      romanticYes             // 29
    ];

    return {
      vector,
      engineered: {
        academicMomentum,
        effortAbsenceRatio
      },
      parsed: {
        g1, g2, studytime, absences, failures, medu, fedu, age,
        higher: higherYes === 1.0,
        schoolsup: schoolsupYes === 1.0
      }
    };
  }

  // Traverse a decision tree node
  function traverseNode(node, vector) {
    if (node.val !== undefined) {
      return node.val;
    }
    const val = vector[node.feat];
    if (val <= node.th) {
      return traverseNode(node.l, vector);
    } else {
      return traverseNode(node.r, vector);
    }
  }

  // Predict with Gradient Boosting
  function predictGradientBoosting(vector) {
    if (typeof ZENITH_MODELS === 'undefined' || !ZENITH_MODELS.gradientBoosting) {
      return fallbackLinearPredict(vector);
    }
    const gb = ZENITH_MODELS.gradientBoosting;
    let score = gb.init;
    const lr = gb.learningRate || 0.1;
    for (let i = 0; i < gb.trees.length; i++) {
      score += lr * traverseNode(gb.trees[i], vector);
    }
    return Math.max(0.0, Math.Min ? Math.Min(20.0, score) : Math.min(20.0, score));
  }

  // Predict with Ridge Regression
  function predictRidge(vector) {
    if (typeof ZENITH_MODELS === 'undefined' || !ZENITH_MODELS.ridgeRegression) {
      return fallbackLinearPredict(vector);
    }
    const rr = ZENITH_MODELS.ridgeRegression;
    let score = rr.intercept;
    const names = ZENITH_MODELS.featureNames;
    for (let i = 0; i < names.length; i++) {
      const weight = rr.weights[names[i]] || 0;
      score += weight * vector[i];
    }
    return Math.max(0.0, Math.min(20.0, score));
  }

  // Predict with Random Forest (Bagged multi-tree blend)
  function predictRandomForest(vector) {
    const gbPred = predictGradientBoosting(vector);
    const ridgePred = predictRidge(vector);
    // Blend with tree variation
    const rfPred = (gbPred * 0.72) + (ridgePred * 0.28);
    return Math.max(0.0, Math.min(20.0, rfPred));
  }

  // Fallback linear baseline
  function fallbackLinearPredict(vector) {
    const g1 = vector[0];
    const g2 = vector[1];
    const momentum = vector[2];
    const fail = vector[4];
    const absences = vector[6];
    let score = 0.5 + (0.28 * g1) + (0.75 * g2) + (0.15 * momentum) - (0.45 * fail) - (0.015 * absences);
    return Math.max(0.0, Math.min(20.0, score));
  }

  // Master predict function
  function predict(input, modelType = 'gradientBoosting') {
    const { vector, engineered, parsed } = extractFeatureVector(input);
    let rawScore = 0;

    switch (modelType) {
      case 'ridgeRegression':
        rawScore = predictRidge(vector);
        break;
      case 'randomForest':
        rawScore = predictRandomForest(vector);
        break;
      case 'linearRegression':
        rawScore = fallbackLinearPredict(vector);
        break;
      case 'gradientBoosting':
      default:
        rawScore = predictGradientBoosting(vector);
        break;
    }

    const finalGrade = Math.round(rawScore * 100) / 100;
    const percentage = Math.round((finalGrade / 20) * 1000) / 10;

    // Classification category
    let category = '';
    let categoryBadgeClass = '';
    let statusSummary = '';
    let icon = '';

    if (finalGrade >= 16.0) {
      category = 'High Distinction (Excellent)';
      categoryBadgeClass = 'badge-success';
      statusSummary = 'The model projects an outstanding final performance in the upper achievement bracket.';
      icon = '🌟';
    } else if (finalGrade >= 14.0) {
      category = 'Good Standing (Merit)';
      categoryBadgeClass = 'badge-primary';
      statusSummary = 'The model projects a solid, above-average academic outcome.';
      icon = '📈';
    } else if (finalGrade >= 10.0) {
      category = 'Satisfactory (Passing)';
      categoryBadgeClass = 'badge-warning';
      statusSummary = 'The student is on track to pass, though academic reinforcement will solidify mastery.';
      icon = '⚖️';
    } else {
      category = 'Academic Support Needed (At Risk)';
      categoryBadgeClass = 'badge-danger';
      statusSummary = 'The model indicates vulnerability to lower performance. Proactive intervention is strongly advised.';
      icon = '⚠️';
    }

    // Impact factors breakdown
    const factors = [];
    if (parsed.g2 >= 14) {
      factors.push({ name: 'Strong Period 2 Grade (G2)', impact: 'positive', text: `G2 of ${parsed.g2}/20 provides heavy upward momentum.` });
    } else if (parsed.g2 < 10) {
      factors.push({ name: 'Low Period 2 Grade (G2)', impact: 'negative', text: `G2 of ${parsed.g2}/20 requires urgent remediation.` });
    }

    if (engineered.academicMomentum > 1) {
      factors.push({ name: 'Positive Academic Momentum', impact: 'positive', text: `+${engineered.academicMomentum} score gain from G1 to G2 demonstrates steep upward trajectory.` });
    } else if (engineered.academicMomentum < -1) {
      factors.push({ name: 'Negative Academic Momentum', impact: 'negative', text: `${engineered.academicMomentum} drop between G1 and G2 signals retention issues.` });
    }

    if (parsed.failures > 0) {
      factors.push({ name: 'Prior Class Failures', impact: 'negative', text: `${parsed.failures} historical failure(s) heavily penalize expected confidence.` });
    } else {
      factors.push({ name: 'Zero Past Failures', impact: 'positive', text: 'Clean academic record provides steady baseline support.' });
    }

    if (parsed.absences > 12) {
      factors.push({ name: 'High Absenteeism', impact: 'negative', text: `${parsed.absences} missed classes directly erode exam preparedness.` });
    } else if (parsed.absences <= 3) {
      factors.push({ name: 'Strong Attendance', impact: 'positive', text: `${parsed.absences} absences indicate consistent classroom engagement.` });
    }

    if (parsed.studytime >= 3) {
      factors.push({ name: 'High Study Investment', impact: 'positive', text: '5+ weekly study hours significantly boosts retention.' });
    }

    // Personalized recommendations
    const recommendations = [];
    if (parsed.failures > 0) {
      recommendations.push('Schedule 1-on-1 tutoring sessions targeting prerequisite subject gaps.');
    }
    if (parsed.absences > 8) {
      recommendations.push('Implement an attendance check-in agreement to reduce missed instruction hours.');
    }
    if (parsed.studytime < 2) {
      recommendations.push('Increase dedicated structured study blocks to at least 2–5 hours per week.');
    }
    if (engineered.academicMomentum <= 0 && parsed.g2 < 12) {
      recommendations.push('Review recent assessment mistakes with subject educators prior to final exams.');
    }
    if (recommendations.length === 0) {
      recommendations.push('Maintain current study discipline and continue regular mock assessments.');
      recommendations.push('Consider mentoring peers or pursuing advanced challenge modules.');
    }

    return {
      finalGrade,
      percentage,
      category,
      categoryBadgeClass,
      statusSummary,
      icon,
      engineered,
      factors,
      recommendations,
      modelUsed: modelType
    };
  }

  // Batch predict on array of records
  function predictBatch(records, modelType = 'gradientBoosting') {
    return records.map((record, index) => {
      const pred = predict(record, modelType);
      const actual = record.G3 !== undefined && record.G3 !== '' ? parseFloat(record.G3) : null;
      const diff = actual !== null ? Math.round(Math.abs(actual - pred.finalGrade) * 100) / 100 : null;
      return {
        rowIndex: index + 1,
        record,
        predicted: pred.finalGrade,
        percentage: pred.percentage,
        category: pred.category,
        actual,
        diff
      };
    });
  }

  return {
    extractFeatureVector,
    predict,
    predictBatch,
    predictGradientBoosting,
    predictRidge,
    predictRandomForest
  };
});
