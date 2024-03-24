const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function postAnswer(req,res){
    const {userid,questionid,answer}=req.body;
    if(!questionid || !userid || !answer){
        return res.status(400).json({msg:"please provide all required fields"})
    
    }
    try {
    await dbConnection.query(
    "INSERT INTO answertable (userid,questionid,answer) VALUES (?,?,?)",[userid,questionid,answer])
    return res.status(201).json({msg:"Answer posted successfully"})
    
} catch (error) {
    console.log(error.message)
    return res.status(500).json({msg:"something went wrong, try again later"})
 }

}

async function allAnswer (req, res) {
     const questionid = req.headers['questionid'];
   
    try {
      
  
        const [allanswer] = await dbConnection.query(`SELECT users.username, answertable.answer
        FROM answertable
        JOIN users ON answertable.userid = users.userid
        WHERE answertable.questionid = ?
        `,[questionid])
        return res.status(200).json({msg:"all answer posted succesfully",allanswer})
     

     
    } catch (error) {
     console.log(error.message)
     return res.status(500).json({msg:"something went wrong"})
    }
  
  }
  module.exports = {postAnswer,allAnswer}




// async function postAnswer (req, res) {

//     const userid = req.user.userid;
//     const questionid = req.params.questionid;
//     const { answer, answerCodeBlock } = req.body;

//     if (!answer) {
//         return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Missing required field" });
//     }

//     try {
//         await dbConnection.query(
//             `INSERT INTO answertable ( answer, answerCodeBlock, userid, questionid) VALUES (?,?,?,?)`,
//             [answer, answerCodeBlock, userid, questionid ]
//         );
        
//         return res.status(StatusCodes.CREATED).json({ msg: "Answer posted successfully" });
//     } catch (err) {
//         console.log(err.message);
//         return res
//             .status(StatusCodes.INTERNAL_SERVER_ERROR)
//             .json({ msg: "Something went wrong" });
//     }
// };
//     const questionid = req.params;
    
//     try {
//         const answersAndQuestion = await dbConnection.query(`SELECT answer,answerCodeBlock,answerid,firstname, lastname, email,question FROM answer
//             JOIN questions ON questions.questionid = answer.questionid 
//             JOIN users ON users.userid = answer.userid
//             WHERE answer.questionid = '${questionid}' 
//             ORDER BY answerid DESC`);

//         if (questionAndAnswers[0].length === 0) {
//             console.log("No answers found for question ID:", questionid);
//         }

//         res.status(200).json({
//             status: true,
//             total: answersAndQuestion[0].length,
//             answers: answersAndQuestion[0],
//         });
//     } catch (err) {
//         console.log(err.message);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR)
//         .json({ msg: "Something went wrong" });
//     }
// }
