import axios from "axios";
import { toast } from "react-toastify";

const SubmitAnswer = ({ status, quesId, ansId }) => {
  const id = localStorage.getItem("id");

  if (ansId === undefined) {
    toast.error("Select an option.");
    return; // Exit the function
  }

  const submitData = {
    quesId: quesId,
    status: status,
    ansId: ansId,
  };
  // console.log(submitData);
  return axios
    .get(
      `${import.meta.env.VITE_APP_NODE_URL}/handle-response/${id}?ansId=${
        submitData.ansId
      }&quesId=${submitData.quesId}&status=${status}`,
    )
    .then((res) => {
      return res.data.userResponses;
    })
    .catch((err) => {
      console.error(err);
      throw err; // Rethrow the error to handle it in the calling function if needed
    });
};

export default SubmitAnswer;
