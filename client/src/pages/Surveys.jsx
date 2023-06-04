import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../components/PageComponent"
import SurveysListItem from "../components/SurveysListItem";
import { UseStateContext } from "../contexts/ContextProvider"
import Button from "../components/generalUseComponetes/Button";
import { useEffect, useState } from "react";
import axiosClient from "../axios.js";
import PaginationLinks from "../components/PaginationLinks";

const Surveys = () => {

  const { showToast } = UseStateContext();
  const [surveys, setSurveys] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  // console.log(surveys);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this survey?")) {
      axiosClient.delete(`/survey/${id}`).then(() => {
        getSurveys();
        showToast('The survey was deleted');
      });
    }
  };

  const onPageClick = (link) => {
    getSurveys(link.url);
  };


  const getSurveys = (url) => {
    url = url || "/survey";
    setLoading(true);
    axiosClient.get(url).then(({ data }) => {
      setSurveys(data.data);
      setMeta(data.meta);
      setLoading(false);
    });
  };


  useEffect(() => {
    getSurveys();
  }, []);

  return (
    <PageComponent
      title="Surveys"
      buttons={(
        <Button color="green" to='/surveys/create'>
          <PlusCircleIcon h-6 w-6 mr-2 />
          Create New
        </Button>
      )}
    >

      {
        loading &&
        <div className="text-center text-lg">
          Loading...
        </div>
      }

      {
        !loading &&
        <div>
          {surveys.length === 0 && (
            <div className="py-8 text-center text-gray-700">
              You don&apos;t have surveys created
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {
              surveys && surveys.map(survey => (
                <SurveysListItem survey={survey} key={survey.id} onDelete={onDelete} />
              ))
            }
          </div>

          {surveys.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick} />}
        </div>
      }

    </PageComponent>
  )
}

export default Surveys