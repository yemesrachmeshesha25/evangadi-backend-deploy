const { StatusCodes } = require("http-status-codes");
const dbConnection  = require("../db/dbConfig")


async function postQuestion (req, res)  {

    const { question,questiondescription,questionid } = req.body

    const userid = req.user.userid

    if (!question){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Missing required field"}); 
    }
    
try { 
    await dbConnection.query
    ("INSERT INTO questions (question,questiondescription,questionid,userid) VALUES (?, ?, ?, ?)", [question,questiondescription,questionid,userid]);
        return res.status(StatusCodes.CREATED).json({msg: "Question posted successfully"});
} catch (err) {
    console.log(err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "something went wrong"});
    }
};

async function getAllQuestions(req, res)  {
    try {
        const questions = await dbConnection.query("SELECT q.questionid, q.userid, q.question, q.questiondescription, u.username FROM questions q JOIN users u ON q.userid = u.userid ORDER BY questionid DESC");
        res.status(StatusCodes.OK).json({total:questions[0].length,
        questions:questions[0],
    })
    } catch (err) {
console.log(err.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong4545" });
};
}
const singleQuestion = async(req, res)=>{
    let questionid = req.params.questionid;

    try {
        let question = await dbConnection.query
            (`SELECT * FROM questions WHERE questionid = '${questionid}'`);
        
        res.status(StatusCodes.OK).json(question[0][0]); 
        } catch (err) {
        console.log(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
}
}
module.exports = {postQuestion,getAllQuestions, singleQuestion};





// (`SELECT questionid, question, questiondescription, questionCodeBlock,tags,firstname, lastname,email FROM question JOIN user ON question.
//         userID=user.userID ORDER BY questionid DESC`)