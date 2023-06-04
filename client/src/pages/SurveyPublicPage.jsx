import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import PublicQuestionView from "../components/PublicQuestionView";



const SurveyPublicPage = () => {

    const answers = {};
    const [surveyFinished, setSurveyFinished] = useState(false);
    const [survey, setSurvey] = useState({
        questions: [],
    });
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();


    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`survey/get-by-slug/${slug}`)
            .then(({ data }) => {
                setLoading(false);
                setSurvey(data.data);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const onSubmit = (e) => {
        e.preventDefault();

        console.log(answers);
        axiosClient
            .post(`/survey/${survey.id}/answer`, {
                answers,
            })
            .then(() => {
                setSurveyFinished(true);
            });
    };

    const answerChanged = (question, value) => {
        answers[question.id] = value;
        // console.log(question, value);
    }


    return (
        <div className="flex justify-center items-center py-10">
            {loading && <div className="flex justify-center text-lg font-bold">Loading..</div>}

            {
                !loading && (
                    <form onSubmit={(e) => onSubmit(e)} className="container mx-auto p-4 xl:w-1/2">
                        <div className="flex flex-col justify-center items-center h-50 border rounded-md py-4 mb-4">
                            <div className="flex items-center justify-center h-60 w-60">
                                <img className="h-48" src={survey.image_url} alt="" />
                            </div>

                            <div className="col-span-5 text-center">
                                <h1 className="text-3xl my-3">{survey.title}</h1>
                                <p className="text-gray-500 text-sm mb-3">
                                    Expire Date: {survey.expire_date}
                                </p>
                                <p className="text-gray-500 text-md mb-3 px-5 text-left">{survey.description}</p>
                            </div>
                        </div>

                        {surveyFinished && (
                            <div className="py-8 px-6 bg-emerald-500 text-white w-[600px] mx-auto">
                                Thank you for participating in the survey
                            </div>
                        )}

                        {!surveyFinished && (
                            <>
                                <div className="flex flex-col items-center justify-center">
                                    {survey.questions.map((question, index) => (
                                        <PublicQuestionView
                                            key={question.id}
                                            question={question}
                                            index={index}
                                            answerChanged={(val) => answerChanged(question, val)}
                                        />
                                    ))}
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </>
                        )}

                    </form>
                )
            }
        </div>
    )
}

export default SurveyPublicPage