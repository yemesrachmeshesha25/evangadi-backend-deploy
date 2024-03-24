const express = require('express');
const {postQuestion, getAllQuestions, singleQuestion} = require("../controller/questionController")

const router = express.Router();
router.route("/questions")
.post(postQuestion)
.get(getAllQuestions)

router.route("/questions/:questionid").get(singleQuestion)


module.exports = router;