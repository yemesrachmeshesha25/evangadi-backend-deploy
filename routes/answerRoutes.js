
const express = require("express");
const router = express.Router();

const{postAnswer, allAnswer} = require ("../controller/answerController")

router.post("/postanswers", postAnswer);
router.get("/all-answers",allAnswer)


module.exports = router;

// router.route("/questions/:questionid/answers")
// .post(authMiddleware,postAnswer)
// .get(getAllAnswersAllongWithTheirQuestions)
