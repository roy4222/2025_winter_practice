function getAverage(scores) {
    let sum = 0;
  
    for (const score of scores) {
      sum += score;
    }
  
    return sum / scores.length;
  }

  function getGrade(score) {
    if (score === 100) {
      return "A++";
    } else if (score >= 90) {
      return "A";
    } else if (score >= 80) {
      return "B";
    } else if (score >= 70) {
      return "C";
    } else if (score >= 60) {
      return "D";
    } else {
      return "F";
    }
  }
  
  function hasPassingGrade(score) {
    if (getGrade(score)!=="F"){
      return true
    }else{
      return false
    }
  }
  
  
  console.log(hasPassingGrade(100));
  console.log(hasPassingGrade(53));
  console.log(hasPassingGrade(87));
  

  function studentMsg(totalScores, studentScore) {
    let classAverage = getAverage(totalScores)
    let studentGrade=getGrade(studentScore)
  
    if (hasPassingGrade){
      return "Class average: "+ classAverage+"."+ " Your grade:"+studentGrade + "."+ " You failed the course."
    }else{
      return "Class average: "+ classAverage+"."+ " Your grade:"+studentGrade + "."+ " You passed the course."
    } 
  }
  console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
  console.log(studentMsg([56, 23, 89, 42, 75, 11, 68, 34, 91, 19], 100))
  
  