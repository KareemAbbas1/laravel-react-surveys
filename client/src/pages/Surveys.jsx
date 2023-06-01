import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../components/PageComponent"
import SurveysListItem from "../components/SurveysListItem";
import { UseStateContext } from "../contexts/ContextProvider"
import Button from "../components/generalUseComponetes/Button";

const Surveys = () => {

  const { surveys } = UseStateContext();
  console.log(surveys);

  const onDelete = () => {
    console.log("onClick");
  };

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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {
          surveys.map(survey => (
            <SurveysListItem survey={survey} key={survey.id} onDelete={onDelete} />
          ))
        }
      </div>
    </PageComponent>
  )
}

export default Surveys