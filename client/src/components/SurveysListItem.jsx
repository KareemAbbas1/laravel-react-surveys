/* eslint-disable react/prop-types */

import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "./generalUseComponetes/Button";


const SurveysListItem = ({ survey, onDelete }) => {
    return (
        <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[585px]" style={{ position: 'relative' }}>
            <img
                src={survey.image_url}
                alt={survey.title}
                className="w-full h-48 object-cover"
            />
            <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
            <div
                style={{height: '35%', overflowY: 'hidden' }}
                dangerouslySetInnerHTML={{ __html: survey.description }}
            ></div>

            <div
                className="flex justify-between items-center mt-3"
                style={{ position: 'absolute', bottom: '15px', width: 'calc(100% - 3rem)' }}
            >
                <Button to={`surveys/${survey.id}`}>
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Edit
                </Button>

                <div
                    className="flex items-center justify-between"
                    style={{ width: "70px" }}
                >
                    <Button href={`/view/survey/${survey.slug}`} circle link>
                        <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                    </Button>

                    {
                        survey.id && (
                            <Button onDelete={onDelete} circle link color="red">
                                <TrashIcon className="w-5 h-5" />
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default SurveysListItem;